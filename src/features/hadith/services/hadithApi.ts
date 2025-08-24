
// Main hadith API service - consolidated exports
export type { HadithApiResponse, HadithCollection, SunnahCollection, SunnahBook, SunnahHadith } from '../types/hadith';
export { SUNNAH_API_BASE, SUNNAH_COLLECTIONS, FALLBACK_HADITHS } from '../data/hadithData';
export { 
  translateToEnglish, 
  getCollectionDisplayName, 
  mapGradeToArabic, 
  extractTopicsFromText, 
  extractArabicText, 
  performLocalSearch 
} from '../utils/hadithUtils';
export { 
  fetchRandomHadiths, 
  fetchHadithCollections, 
  searchHadiths,
  fetchHadithByCollection
} from '../services/hadithService';
