import { HADITH_COLLECTIONS } from '../data/hadithData';

export const SUNNAH_API_BASE = 'https://api.sunnah.com/v1';
export const SUNNAH_COLLECTIONS = ['bukhari', 'muslim', 'abudawud', 'tirmidhi'];

export const hadithUtils = {
  formatReference: (collection: string, book: string, hadith: string) => {
    return `${collection} ${book}:${hadith}`;
  },

  getCollectionInfo: (id: string) => {
    return HADITH_COLLECTIONS.find(c => c.id === id);
  },

  sanitizeText: (text: string) => {
    return text.replace(/<[^>]*>/g, '').trim();
  },

  translateToEnglish: (text: string) => text,
  getCollectionDisplayName: (id: string) => id,
  mapGradeToArabic: (grade: string) => grade,
  extractTopicsFromText: (text: string) => [],
  extractArabicText: (text: string) => text,
  performLocalSearch: (query: string, data: any[]) => []
};

export const { translateToEnglish, getCollectionDisplayName, mapGradeToArabic, extractTopicsFromText, extractArabicText, performLocalSearch } = hadithUtils;

export default hadithUtils;