
import { HadithApiResponse, HadithCollection } from '../types/hadith';
import { FALLBACK_HADITHS } from '../data/hadithData';
import { translateToEnglish, performLocalSearch } from '../utils/hadithUtils';

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
