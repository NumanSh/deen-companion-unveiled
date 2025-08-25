// Simple hadith API service for backward compatibility
export const SUNNAH_API_BASE = 'https://api.sunnah.com/v1';

export interface HadithApiResponse {
  id: string;
  text: string;
  arabic?: string;
  reference: string;
  collection: string;
  narrator: string;
  source: string;
  book: string;
  chapter: string;
  grade: 'صحيح' | 'حسن' | 'ضعيف';
  topic: string[];
}

export interface HadithCollection {
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

const mockHadiths: HadithApiResponse[] = [
  {
    id: '1',
    text: 'The best of people are those who benefit others.',
    arabic: 'خير الناس أنفعهم للناس',
    reference: 'Hadith 1',
    collection: 'Various',
    narrator: 'Various',
    source: 'sunnah.com',
    book: 'Book 1',
    chapter: 'Chapter 1',
    grade: 'صحيح',
    topic: ['General']
  },
  {
    id: '2',
    text: 'Actions are but by intention.',
    arabic: 'إنما الأعمال بالنيات',
    reference: 'Bukhari 1',
    collection: 'Bukhari',
    narrator: 'Umar ibn al-Khattab',
    source: 'sahih bukhari',
    book: 'Book of Faith',
    chapter: 'Chapter 1',
    grade: 'صحيح',
    topic: ['Faith', 'Intention']
  }
];

export const fetchHadiths = async (): Promise<HadithApiResponse[]> => {
  return mockHadiths;
};

export const fetchRandomHadiths = async (count: number = 10): Promise<HadithApiResponse[]> => {
  const shuffled = [...mockHadiths].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export const searchHadiths = async (query: string, source?: string, grade?: string): Promise<HadithApiResponse[]> => {
  let results = mockHadiths.filter(hadith => 
    hadith.text.toLowerCase().includes(query.toLowerCase()) ||
    hadith.arabic?.includes(query) ||
    hadith.narrator.toLowerCase().includes(query.toLowerCase())
  );
  
  if (source && source !== 'الكل') {
    results = results.filter(hadith => hadith.source.toLowerCase().includes(source.toLowerCase()));
  }
  
  if (grade && grade !== 'الكل') {
    results = results.filter(hadith => hadith.grade === grade);
  }
  
  return results;
};

export const fetchHadithCollections = async (): Promise<HadithCollection[]> => {
  return mockHadiths.map((hadith, index) => ({
    id: hadith.id,
    collection: hadith.collection,
    book: hadith.book,
    hadithNumber: (index + 1).toString(),
    arabic: hadith.arabic || hadith.text,
    english: hadith.text,
    narrator: hadith.narrator,
    reference: hadith.reference,
    category: hadith.topic[0] || 'General'
  }));
};

export default { fetchHadiths, fetchRandomHadiths, searchHadiths, fetchHadithCollections, SUNNAH_API_BASE };