
import { HadithApiResponse, HadithCollection } from '../types/hadith';
import { FALLBACK_HADITHS } from '../data/hadithData';
import { translateToEnglish } from '../utils/hadithUtils';
import { fetchFromHadithApi, fetchRandomCollection, isValidCollection } from './hadithApiClient';
import { processApiHadiths, processHadithsToCollections, createFallbackResult } from './hadithDataProcessor';
import { searchHadithsInApi, performHadithSearch } from './hadithSearchService';

export const fetchRandomHadiths = async (count: number = 10): Promise<HadithApiResponse[]> => {
  try {
    console.log(`Fetching ${count} hadiths from Hadith API...`);
    
    // Try to fetch from the main hadith API
    const randomCollection = fetchRandomCollection();
    const data = await fetchFromHadithApi(randomCollection, `1-${count}`);
    
    if (data.hadiths && data.hadiths.length > 0) {
      console.log('Successfully fetched hadiths from API:', data.hadiths.length);
      return processApiHadiths(data, 'api');
    }
    
    throw new Error('No hadiths in API response');
    
  } catch (error) {
    console.error('API fetch failed, using fallback data:', error);
    
    // Fallback to local data with some randomization
    const shuffled = [...FALLBACK_HADITHS].sort(() => Math.random() - 0.5);
    return createFallbackResult(count, shuffled);
  }
};

export const fetchHadithCollections = async (): Promise<HadithCollection[]> => {
  try {
    console.log('Fetching hadith collections from API...');
    
    const hadiths = await fetchRandomHadiths(15);
    return processHadithsToCollections(hadiths);
    
  } catch (error) {
    console.error('Error fetching collections:', error);
    
    // Return fallback collections
    return FALLBACK_HADITHS.map((hadith, index) => ({
      id: `fallback-collection-${hadith.id}`,
      collection: hadith.source,
      book: hadith.book,
      hadithNumber: (index + 1).toString(),
      arabic: hadith.arabic || hadith.text,
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
    const apiResults = await searchHadithsInApi(query, source);
    if (apiResults) {
      return apiResults;
    }
    
    // Fallback to local search
    return performHadithSearch(query, source, grade);
    
  } catch (error) {
    console.error('Search error:', error);
    return performHadithSearch(query, source, grade);
  }
};

export const fetchHadithByCollection = async (collection: string, limit: number = 10): Promise<HadithApiResponse[]> => {
  try {
    console.log(`Fetching hadiths from collection: ${collection}`);
    
    if (!isValidCollection(collection)) {
      throw new Error(`Collection ${collection} not available`);
    }
    
    const data = await fetchFromHadithApi(collection, `1-${limit}`);
    return processApiHadiths(data, collection);
    
  } catch (error) {
    console.error(`Error fetching from collection ${collection}:`, error);
    return FALLBACK_HADITHS.slice(0, limit);
  }
};
