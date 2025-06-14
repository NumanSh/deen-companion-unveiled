
import { HadithApiResponse, HadithCollection } from '../types/hadith';
import { FALLBACK_HADITHS } from '../data/hadithData';
import { translateToEnglish, performLocalSearch, mapGradeToArabic } from '../utils/hadithUtils';

// API configuration based on the GitHub repo patterns
const HADITH_API_BASE = 'https://api.hadith.gading.dev';
const SUNNAH_API_BASE = 'https://api.sunnah.com/v1';

// Available collections from the API
const AVAILABLE_COLLECTIONS = [
  'abu-dawud', 'ahmad', 'bukhari', 'darimi', 'ibnu-majah', 
  'malik', 'muslim', 'nasai', 'tirmidhi'
];

interface ApiHadithResponse {
  name: string;
  id: string;
  available: number;
  requested: number;
  hadiths: {
    number: number;
    arab: string;
    id: string;
  }[];
}

interface SunnahApiResponse {
  collection: {
    name: string;
    arabicName: string;
  };
  bookNumber: number;
  hadithNumber: string;
  hadithEnglish: string;
  hadithArabic: string;
  hadithUrdu?: string;
  englishNarrator: string;
  hadithEnglishGrade: string;
  reference: {
    book: string;
    hadith: string;
  };
}

export const fetchRandomHadiths = async (count: number = 10): Promise<HadithApiResponse[]> => {
  try {
    console.log(`Fetching ${count} hadiths from Hadith API...`);
    
    // Try to fetch from the main hadith API
    const randomCollection = AVAILABLE_COLLECTIONS[Math.floor(Math.random() * AVAILABLE_COLLECTIONS.length)];
    const response = await fetch(`${HADITH_API_BASE}/books/${randomCollection}?range=1-${count}`);
    
    if (!response.ok) {
      throw new Error(`API response not ok: ${response.status}`);
    }
    
    const data: ApiHadithResponse = await response.json();
    
    if (data.hadiths && data.hadiths.length > 0) {
      console.log('Successfully fetched hadiths from API:', data.hadiths.length);
      
      return data.hadiths.map((hadith, index) => ({
        id: `api-${hadith.id}-${Date.now()}-${index}`,
        text: hadith.arab || 'النص العربي غير متوفر',
        narrator: 'متنوع', // Generic narrator since API doesn't provide specific narrator info
        source: data.name || 'مجموعة الأحاديث',
        book: `كتاب ${index + 1}`,
        chapter: 'باب الأحاديث',
        grade: 'صحيح' as const,
        topic: ['عام']
      }));
    }
    
    throw new Error('No hadiths in API response');
    
  } catch (error) {
    console.error('API fetch failed, using fallback data:', error);
    
    // Fallback to local data with some randomization
    const shuffled = [...FALLBACK_HADITHS].sort(() => Math.random() - 0.5);
    const result = [];
    
    while (result.length < count) {
      const remaining = count - result.length;
      const toAdd = shuffled.slice(0, Math.min(remaining, shuffled.length));
      result.push(...toAdd.map((hadith, index) => ({
        ...hadith,
        id: `fallback-${hadith.id}-${Date.now()}-${index}`
      })));
    }
    
    return result.slice(0, count);
  }
};

export const fetchHadithCollections = async (): Promise<HadithCollection[]> => {
  try {
    console.log('Fetching hadith collections from API...');
    
    const hadiths = await fetchRandomHadiths(15);
    
    return hadiths.map((hadith, index) => ({
      id: `collection-${hadith.id}`,
      collection: hadith.source,
      book: hadith.book,
      hadithNumber: (index + 1).toString(),
      arabic: hadith.text,
      english: translateToEnglish(hadith.text),
      narrator: hadith.narrator,
      reference: `${hadith.source} ${index + 1}`,
      category: hadith.topic[0] || 'General'
    }));
    
  } catch (error) {
    console.error('Error fetching collections:', error);
    
    // Return fallback collections
    return FALLBACK_HADITHS.map((hadith, index) => ({
      id: `fallback-collection-${hadith.id}`,
      collection: hadith.source,
      book: hadith.book,
      hadithNumber: (index + 1).toString(),
      arabic: hadith.text,
      english: translateToEnglish(hadith.text),
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
    
    // Try API search first with specific collection if specified
    if (source && source !== 'الكل' && source !== 'All') {
      const collectionMap: { [key: string]: string } = {
        'صحيح البخاري': 'bukhari',
        'صحيح مسلم': 'muslim',
        'سنن أبي داود': 'abu-dawud',
        'جامع الترمذي': 'tirmidhi',
        'سنن النسائي': 'nasai'
      };
      
      const apiCollection = collectionMap[source];
      if (apiCollection && AVAILABLE_COLLECTIONS.includes(apiCollection)) {
        try {
          const response = await fetch(`${HADITH_API_BASE}/books/${apiCollection}?range=1-50`);
          if (response.ok) {
            const data: ApiHadithResponse = await response.json();
            if (data.hadiths) {
              // Filter hadiths that contain the search query
              const filteredHadiths = data.hadiths.filter(hadith => 
                hadith.arab.includes(query)
              );
              
              if (filteredHadiths.length > 0) {
                return filteredHadiths.map((hadith, index) => ({
                  id: `search-${hadith.id}-${Date.now()}-${index}`,
                  text: hadith.arab,
                  narrator: 'متنوع',
                  source: data.name,
                  book: `كتاب البحث`,
                  chapter: 'نتائج البحث',
                  grade: 'صحيح' as const,
                  topic: ['بحث']
                }));
              }
            }
          }
        } catch (apiError) {
          console.log('API search failed, falling back to local search:', apiError);
        }
      }
    }
    
    // Fallback to local search
    return performLocalSearch(query, source, grade);
    
  } catch (error) {
    console.error('Search error:', error);
    return performLocalSearch(query, source, grade);
  }
};

export const fetchHadithByCollection = async (collection: string, limit: number = 10): Promise<HadithApiResponse[]> => {
  try {
    console.log(`Fetching hadiths from collection: ${collection}`);
    
    if (!AVAILABLE_COLLECTIONS.includes(collection)) {
      throw new Error(`Collection ${collection} not available`);
    }
    
    const response = await fetch(`${HADITH_API_BASE}/books/${collection}?range=1-${limit}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch from collection: ${response.status}`);
    }
    
    const data: ApiHadithResponse = await response.json();
    
    return data.hadiths.map((hadith, index) => ({
      id: `${collection}-${hadith.id}-${Date.now()}-${index}`,
      text: hadith.arab,
      narrator: 'متنوع',
      source: data.name,
      book: `كتاب ${collection}`,
      chapter: 'باب الأحاديث',
      grade: 'صحيح' as const,
      topic: [collection]
    }));
    
  } catch (error) {
    console.error(`Error fetching from collection ${collection}:`, error);
    return FALLBACK_HADITHS.slice(0, limit);
  }
};
