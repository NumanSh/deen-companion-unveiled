
import { HadithApiResponse } from '../types/hadith';
import { FALLBACK_HADITHS } from '../data/hadithData';

// API configuration based on the GitHub repo patterns
export const HADITH_API_BASE = 'https://api.hadith.gading.dev';
export const SUNNAH_API_BASE = 'https://api.sunnah.com/v1';

// Available collections from the API
export const AVAILABLE_COLLECTIONS = [
  'abu-dawud', 'ahmad', 'bukhari', 'darimi', 'ibnu-majah', 
  'malik', 'muslim', 'nasai', 'tirmidhi'
];

export interface ApiHadithResponse {
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

export interface SunnahApiResponse {
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

export const fetchFromHadithApi = async (collection: string, range: string): Promise<ApiHadithResponse> => {
  const response = await fetch(`${HADITH_API_BASE}/books/${collection}?range=${range}`);
  
  if (!response.ok) {
    throw new Error(`API response not ok: ${response.status}`);
  }
  
  return response.json();
};

export const fetchRandomCollection = (): string => {
  return AVAILABLE_COLLECTIONS[Math.floor(Math.random() * AVAILABLE_COLLECTIONS.length)];
};

export const isValidCollection = (collection: string): boolean => {
  return AVAILABLE_COLLECTIONS.includes(collection);
};
