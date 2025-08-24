
import { HadithApiResponse, HadithCollection } from '../types/hadith';
import { translateToEnglish } from '../utils/hadithUtils';
import { ApiHadithResponse } from './hadithApiClient';

export const processApiHadiths = (data: ApiHadithResponse, idPrefix: string): HadithApiResponse[] => {
  return data.hadiths.map((hadith, index) => ({
    id: `${idPrefix}-${hadith.id}-${Date.now()}-${index}`,
    text: hadith.arab || 'النص العربي غير متوفر',
    narrator: 'متنوع', // Generic narrator since API doesn't provide specific narrator info
    source: data.name || 'مجموعة الأحاديث',
    book: `كتاب ${index + 1}`,
    chapter: 'باب الأحاديث',
    grade: 'صحيح' as const,
    topic: ['عام']
  }));
};

export const processHadithsToCollections = (hadiths: HadithApiResponse[]): HadithCollection[] => {
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
};

export const createFallbackResult = (count: number, shuffled: HadithApiResponse[]): HadithApiResponse[] => {
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
};
