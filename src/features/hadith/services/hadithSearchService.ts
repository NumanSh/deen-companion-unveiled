import { HadithApiResponse } from '../types/hadith';
import { performLocalSearch } from '../services/hadithUtils';
import { fetchFromHadithApi, AVAILABLE_COLLECTIONS } from './hadithApiClient';
import { processApiHadiths } from './hadithDataProcessor';

const COLLECTION_MAP: { [key: string]: string } = {
  'صحيح البخاري': 'bukhari',
  'صحيح مسلم': 'muslim',
  'سنن أبي داود': 'abu-dawud',
  'جامع الترمذي': 'tirmidhi',
  'سنن النسائي': 'nasai'
};

export const searchHadithsInApi = async (query: string, source?: string): Promise<HadithApiResponse[] | null> => {
  if (!source || source === 'الكل' || source === 'All') {
    return null;
  }
  
  const apiCollection = COLLECTION_MAP[source];
  if (!apiCollection || !AVAILABLE_COLLECTIONS.includes(apiCollection)) {
    return null;
  }
  
  try {
    const data = await fetchFromHadithApi(apiCollection, '1-50');
    
    if (data.hadiths) {
      // Filter hadiths that contain the search query
      const filteredHadiths = data.hadiths.filter(hadith => 
        hadith.arab.includes(query)
      );
      
      if (filteredHadiths.length > 0) {
        const processedData = { ...data, hadiths: filteredHadiths };
        return processApiHadiths(processedData, 'search');
      }
    }
  } catch (apiError) {
    console.log('API search failed, falling back to local search:', apiError);
  }
  
  return null;
};

export const performHadithSearch = (query: string, source?: string): HadithApiResponse[] => {
  return performLocalSearch(query, source);
};