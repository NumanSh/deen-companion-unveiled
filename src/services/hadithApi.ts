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

// Enhanced fallback data with more examples
const FALLBACK_HADITHS: HadithApiResponse[] = [
  {
    id: 'fallback-1',
    text: 'إنما الأعمال بالنيات وإنما لكل امرئ ما نوى',
    narrator: 'عمر بن الخطاب رضي الله عنه',
    source: 'صحيح البخاري',
    book: 'كتاب بدء الوحي',
    chapter: 'كيف كان بدء الوحي',
    grade: 'صحيح',
    topic: ['النية', 'الأعمال']
  },
  {
    id: 'fallback-2',
    text: 'من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت',
    narrator: 'أبو هريرة رضي الله عنه',
    source: 'صحيح مسلم',
    book: 'كتاب الإيمان',
    chapter: 'إكرام الجار',
    grade: 'صحيح',
    topic: ['الكلام', 'الآداب']
  },
  {
    id: 'fallback-3',
    text: 'لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه',
    narrator: 'أنس بن مالك رضي الله عنه',
    source: 'صحيح البخاري',
    book: 'كتاب الإيمان',
    chapter: 'من الإيمان أن يحب لأخيه ما يحب لنفسه',
    grade: 'صحيح',
    topic: ['الإيمان', 'الأخوة']
  },
  {
    id: 'fallback-4',
    text: 'المسلم من سلم المسلمون من لسانه ويده',
    narrator: 'عبد الله بن عمرو رضي الله عنهما',
    source: 'صحيح البخاري',
    book: 'كتاب الإيمان',
    chapter: 'المسلم من سلم المسلمون من لسانه ويده',
    grade: 'صحيح',
    topic: ['الإسلام', 'الأخلاق']
  },
  {
    id: 'fallback-5',
    text: 'من لا يرحم الناس لا يرحمه الله',
    narrator: 'جرير بن عبد الله رضي الله عنه',
    source: 'صحيح مسلم',
    book: 'كتاب الفضائل',
    chapter: 'رحمة النبي صلى الله عليه وسلم الصبيان والعيال',
    grade: 'صحيح',
    topic: ['الرحمة', 'الأخلاق']
  }
];

export const fetchRandomHadiths = async (count: number = 10): Promise<HadithApiResponse[]> => {
  try {
    console.log(`Fetching ${count} hadiths from Sunnah.com API...`);
    
    // Always return fallback data for now since API integration needs CORS handling
    console.log('Using fallback hadith data for reliability');
    
    // Shuffle and return the requested number of hadiths
    const shuffled = [...FALLBACK_HADITHS].sort(() => Math.random() - 0.5);
    const result = [];
    
    // Duplicate data if needed to reach count
    while (result.length < count) {
      const remaining = count - result.length;
      const toAdd = shuffled.slice(0, Math.min(remaining, shuffled.length));
      result.push(...toAdd.map((hadith, index) => ({
        ...hadith,
        id: `${hadith.id}-${Date.now()}-${index}`
      })));
    }
    
    return result.slice(0, count);
    
  } catch (error) {
    console.error('Error fetching hadiths:', error);
    return FALLBACK_HADITHS.slice(0, count);
  }
};

export const fetchHadithCollections = async (): Promise<HadithCollection[]> => {
  try {
    console.log('Fetching hadith collections...');
    
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
    
    return performLocalSearch(query, source, grade);
    
  } catch (error) {
    console.error('Search error:', error);
    return performLocalSearch(query, source, grade);
  }
};

// Helper functions
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

  // If no results found, return all hadiths
  if (results.length === 0) {
    results = FALLBACK_HADITHS;
  }

  return results;
};

// Utility function to provide basic English translation
const translateToEnglish = (arabicText: string): string => {
  const translations: { [key: string]: string } = {
    'إنما الأعمال بالنيات وإنما لكل امرئ ما نوى': 'Actions are but by intention and every man shall have only that which he intended.',
    'من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت': 'Whoever believes in Allah and the Last Day should speak good or remain silent.',
    'لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه': 'None of you believes until he loves for his brother what he loves for himself.',
    'المسلم من سلم المسلمون من لسانه ويده': 'The Muslim is one from whose tongue and hand Muslims are safe.',
    'من لا يرحم الناس لا يرحمه الله': 'Whoever does not show mercy to people, Allah will not show mercy to him.'
  };
  
  return translations[arabicText] || 'English translation available in full version';
};

// Utility functions
const getCollectionDisplayName = (collection: string): string => {
  const names: { [key: string]: string } = {
    'bukhari': 'صحيح البخاري',
    'muslim': 'صحيح مسلم',
    'abudawud': 'سنة أبي داود',
    'tirmidhi': 'جامع الترمذي',
    'nasai': 'سنة النسائي',
    'ibnmajah': 'سنة ابن ماجه',
    'malik': 'مروة مالك',
    'riyadussalihin': 'رائد الصالحين',
    'adab': 'الأخلاق',
    'bulugh': 'البلوغ'
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
