
interface HadithApiResponse {
  id: string;
  text: string;
  narrator: string;
  source: string;
  book: string;
  chapter: string;
  grade: 'صحيح' | 'حسن' | 'ضعيف';
  topic: string[];
}

interface HadithCollection {
  id: string;
  collection: string;
  book: string;
  hadithNumber: string;
  arabic: string;
  english: string;
  narrator: string;
  reference: string;
  category: string;
}

// Sunnah.com API interfaces
interface SunnahCollection {
  collection: {
    name: string;
    hasArabic: boolean;
    hasEnglish: boolean;
  }[];
}

interface SunnahBook {
  book: {
    name: string;
    arabicName: string;
    id: number;
    numberOfHadith: number;
  }[];
}

interface SunnahHadith {
  hadith: {
    hadithNumber: string;
    englishNarrator: string;
    hadithEnglish: string;
    hadithArabic: string;
    englishGrade: string;
    arabicGrade: string;
    reference: {
      book: string;
      hadith: string;
    };
  }[];
}

// Sunnah.com API base URL
const SUNNAH_API_BASE = 'https://api.sunnah.com/v1';

// Available collections on Sunnah.com
const SUNNAH_COLLECTIONS = [
  'bukhari', 'muslim', 'abudawud', 'tirmidhi', 'nasai', 'ibnmajah',
  'malik', 'riyadussalihin', 'adab', 'bulugh'
];

// Fallback data - minimal set for offline use
const FALLBACK_HADITHS: HadithApiResponse[] = [
  {
    id: 'fallback-1',
    text: 'Actions are but by intention and every man shall have only that which he intended.',
    narrator: 'Umar ibn al-Khattab (RA)',
    source: 'Sahih Bukhari',
    book: 'Book of Revelation',
    chapter: 'How the Divine Inspiration started',
    grade: 'صحيح',
    topic: ['Intention', 'Actions']
  },
  {
    id: 'fallback-2',
    text: 'Whoever believes in Allah and the Last Day should speak good or remain silent.',
    narrator: 'Abu Huraira (RA)',
    source: 'Sahih Muslim',
    book: 'Book of Faith',
    chapter: 'Honoring the neighbor',
    grade: 'صحيح',
    topic: ['Speech', 'Manners']
  }
];

export const fetchRandomHadiths = async (count: number = 10): Promise<HadithApiResponse[]> => {
  try {
    console.log(`Fetching ${count} hadiths from Sunnah.com API...`);
    
    // Get hadiths from multiple collections
    const results: HadithApiResponse[] = [];
    const collectionsToUse = SUNNAH_COLLECTIONS.slice(0, 3); // Use first 3 collections
    
    for (const collection of collectionsToUse) {
      try {
        const collectionHadiths = await fetchHadithsFromCollection(collection, Math.ceil(count / collectionsToUse.length));
        results.push(...collectionHadiths);
        
        if (results.length >= count) break;
      } catch (error) {
        console.log(`Failed to fetch from collection ${collection}:`, error);
        continue;
      }
    }
    
    if (results.length > 0) {
      console.log(`Successfully fetched ${results.length} hadiths from Sunnah.com`);
      return results.slice(0, count);
    }
    
    console.log('Sunnah.com API unavailable, using fallback data');
    return FALLBACK_HADITHS;
    
  } catch (error) {
    console.error('Error fetching hadiths:', error);
    return FALLBACK_HADITHS;
  }
};

export const fetchHadithCollections = async (): Promise<HadithCollection[]> => {
  try {
    console.log('Fetching hadith collections from Sunnah.com...');
    
    const hadiths = await fetchRandomHadiths(15);
    
    return hadiths.map((hadith, index) => ({
      id: `sunnah-${hadith.id}`,
      collection: hadith.source,
      book: hadith.book,
      hadithNumber: (index + 1).toString(),
      arabic: extractArabicText(hadith.text),
      english: hadith.text,
      narrator: hadith.narrator,
      reference: `${hadith.source} ${index + 1}`,
      category: hadith.topic[0] || 'General'
    }));
    
  } catch (error) {
    console.error('Error fetching collections:', error);
    
    // Return fallback collections
    return FALLBACK_HADITHS.map((hadith, index) => ({
      id: `fallback-${hadith.id}`,
      collection: hadith.source,
      book: hadith.book,
      hadithNumber: (index + 1).toString(),
      arabic: extractArabicText(hadith.text),
      english: hadith.text,
      narrator: hadith.narrator,
      reference: `${hadith.source} ${index + 1}`,
      category: hadith.topic[0]
    }));
  }
};

export const searchHadiths = async (query: string, source?: string, grade?: string): Promise<HadithApiResponse[]> => {
  try {
    console.log(`Searching hadiths for: "${query}"`);
    
    if (!query || query.trim() === '') {
      return await fetchRandomHadiths(20);
    }
    
    // Try to search in Sunnah.com collections
    const searchResults: HadithApiResponse[] = [];
    
    for (const collection of SUNNAH_COLLECTIONS.slice(0, 2)) {
      try {
        const results = await searchInCollection(collection, query);
        searchResults.push(...results);
        
        if (searchResults.length >= 20) break;
      } catch (error) {
        console.log(`Search failed in collection ${collection}`);
        continue;
      }
    }
    
    // Filter results based on source and grade
    let filteredResults = searchResults;
    
    if (source && source !== 'الكل' && source !== 'All') {
      filteredResults = filteredResults.filter(hadith => 
        hadith.source.toLowerCase().includes(source.toLowerCase())
      );
    }
    
    if (grade && grade !== 'الكل' && grade !== 'All') {
      filteredResults = filteredResults.filter(hadith => hadith.grade === grade);
    }
    
    if (filteredResults.length > 0) {
      return filteredResults.slice(0, 20);
    }
    
    // Fallback to local search
    return performLocalSearch(query, source, grade);
    
  } catch (error) {
    console.error('Search error:', error);
    return performLocalSearch(query, source, grade);
  }
};

// Helper functions
const fetchHadithsFromCollection = async (collection: string, limit: number): Promise<HadithApiResponse[]> => {
  try {
    // First get books for this collection
    const booksResponse = await fetch(`${SUNNAH_API_BASE}/collections/${collection}/books`);
    
    if (!booksResponse.ok) {
      throw new Error(`Failed to fetch books for ${collection}`);
    }
    
    const booksData: SunnahBook = await booksResponse.json();
    
    if (!booksData.book || booksData.book.length === 0) {
      throw new Error(`No books found for collection ${collection}`);
    }
    
    // Get hadiths from first book
    const firstBook = booksData.book[0];
    const hadithsResponse = await fetch(`${SUNNAH_API_BASE}/collections/${collection}/books/${firstBook.id}/hadiths`);
    
    if (!hadithsResponse.ok) {
      throw new Error(`Failed to fetch hadiths from ${collection}`);
    }
    
    const hadithsData: SunnahHadith = await hadithsResponse.json();
    
    if (!hadithsData.hadith || hadithsData.hadith.length === 0) {
      throw new Error(`No hadiths found in book ${firstBook.id}`);
    }
    
    return hadithsData.hadith.slice(0, limit).map(hadith => ({
      id: `${collection}-${hadith.hadithNumber}-${Date.now()}`,
      text: hadith.hadithEnglish || hadith.hadithArabic || 'Text not available',
      narrator: hadith.englishNarrator || 'Narrator not specified',
      source: getCollectionDisplayName(collection),
      book: firstBook.name || firstBook.arabicName || 'Book name not available',
      chapter: hadith.reference?.book || 'Chapter not specified',
      grade: mapGradeToArabic(hadith.englishGrade || hadith.arabicGrade),
      topic: extractTopicsFromText(hadith.hadithEnglish || hadith.hadithArabic || '')
    }));
    
  } catch (error) {
    console.error(`Error fetching from collection ${collection}:`, error);
    throw error;
  }
};

const searchInCollection = async (collection: string, query: string): Promise<HadithApiResponse[]> => {
  try {
    // For now, we'll fetch from the collection and filter locally
    // Sunnah.com API doesn't seem to have a direct search endpoint
    const collectionHadiths = await fetchHadithsFromCollection(collection, 50);
    
    return collectionHadiths.filter(hadith => 
      hadith.text.toLowerCase().includes(query.toLowerCase()) ||
      hadith.narrator.toLowerCase().includes(query.toLowerCase()) ||
      hadith.topic.some(topic => topic.toLowerCase().includes(query.toLowerCase()))
    );
    
  } catch (error) {
    console.error(`Error searching in collection ${collection}:`, error);
    return [];
  }
};

const performLocalSearch = (query: string, source?: string, grade?: string): HadithApiResponse[] => {
  const searchTerm = query.toLowerCase().trim();
  
  let results = FALLBACK_HADITHS.filter(hadith => {
    const textMatch = hadith.text.toLowerCase().includes(searchTerm);
    const narratorMatch = hadith.narrator.toLowerCase().includes(searchTerm);
    const topicMatch = hadith.topic.some(topic => topic.toLowerCase().includes(searchTerm));
    
    return textMatch || narratorMatch || topicMatch;
  });

  if (source && source !== 'الكل' && source !== 'All') {
    results = results.filter(hadith => hadith.source.toLowerCase().includes(source.toLowerCase()));
  }
  
  if (grade && grade !== 'الكل' && grade !== 'All') {
    results = results.filter(hadith => hadith.grade === grade);
  }

  return results;
};

// Utility functions
const getCollectionDisplayName = (collection: string): string => {
  const names: { [key: string]: string } = {
    'bukhari': 'Sahih Bukhari',
    'muslim': 'Sahih Muslim',
    'abudawud': 'Sunan Abi Dawud',
    'tirmidhi': 'Jami\' at-Tirmidhi',
    'nasai': 'Sunan an-Nasa\'i',
    'ibnmajah': 'Sunan Ibn Majah',
    'malik': 'Muwatta Malik',
    'riyadussalihin': 'Riyad as-Salihin',
    'adab': 'Al-Adab Al-Mufrad',
    'bulugh': 'Bulugh al-Maram'
  };
  return names[collection] || collection;
};

const mapGradeToArabic = (grade: string): 'صحيح' | 'حسن' | 'ضعيف' => {
  const lowerGrade = grade?.toLowerCase() || '';
  
  if (lowerGrade.includes('sahih') || lowerGrade.includes('صحيح') || lowerGrade.includes('authentic')) {
    return 'صحيح';
  }
  if (lowerGrade.includes('hasan') || lowerGrade.includes('حسن') || lowerGrade.includes('good')) {
    return 'حسن';
  }
  if (lowerGrade.includes('daif') || lowerGrade.includes('ضعيف') || lowerGrade.includes('weak')) {
    return 'ضعيف';
  }
  
  return 'صحيح'; // Default to sahih
};

const extractTopicsFromText = (text: string): string[] => {
  const topics = [];
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('prayer') || lowerText.includes('salah') || lowerText.includes('pray')) topics.push('Prayer');
  if (lowerText.includes('faith') || lowerText.includes('belief') || lowerText.includes('iman')) topics.push('Faith');
  if (lowerText.includes('charity') || lowerText.includes('zakat') || lowerText.includes('sadaqah')) topics.push('Charity');
  if (lowerText.includes('fast') || lowerText.includes('ramadan') || lowerText.includes('sawm')) topics.push('Fasting');
  if (lowerText.includes('hajj') || lowerText.includes('pilgrimage')) topics.push('Hajj');
  if (lowerText.includes('marriage') || lowerText.includes('family')) topics.push('Family');
  if (lowerText.includes('knowledge') || lowerText.includes('learn')) topics.push('Knowledge');
  if (lowerText.includes('manners') || lowerText.includes('behavior') || lowerText.includes('conduct')) topics.push('Manners');
  
  return topics.length > 0 ? topics : ['General'];
};

const extractArabicText = (text: string): string => {
  // This is a simplified approach - in a real implementation, 
  // you'd want proper Arabic text from the API
  const arabicPatterns = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  
  if (arabicPatterns.test(text)) {
    return text;
  }
  
  // Return a placeholder if no Arabic text is found
  return 'النص العربي متوفر في المصدر الأصلي';
};
