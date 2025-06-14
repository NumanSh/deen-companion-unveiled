
import { translateToEnglish } from '../utils/hadithUtils';

export interface AthkarItem {
  id: string;
  arabic: string;
  transliteration?: string;
  translation?: string;
  repetitions?: number;
  reference?: string;
  category: 'morning' | 'evening' | 'sleeping' | 'after_prayer' | 'general';
  benefit?: string;
}

export interface AthkarApiResponse {
  category: string;
  count: number;
  array: {
    ID: number;
    TEXT: string;
    REPEAT: number;
    AUDIO?: string;
  }[];
}

const ATHKAR_API_BASE = 'https://www.hisnmuslim.com/api';

// Fallback Athkar data
const FALLBACK_ATHKAR: AthkarItem[] = [
  {
    id: 'morning-1',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    transliteration: 'Asbahna wa asbahal-mulku lillahi, walhamdu lillahi, la ilaha illa Allahu wahdahu la shareeka lah',
    translation: 'We have reached the morning and at this very time unto Allah belongs all sovereignty, and all praise is for Allah.',
    repetitions: 1,
    reference: 'Abu Dawud',
    category: 'morning',
    benefit: 'Protection and blessing for the day'
  },
  {
    id: 'evening-1',
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    transliteration: 'Amsayna wa amsal-mulku lillahi, walhamdu lillahi, la ilaha illa Allahu wahdahu la shareeka lah',
    translation: 'We have reached the evening and at this very time unto Allah belongs all sovereignty.',
    repetitions: 1,
    reference: 'Abu Dawud',
    category: 'evening',
    benefit: 'Evening protection and peace'
  },
  {
    id: 'after-prayer-1',
    arabic: 'سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَاللَّهُ أَكْبَرُ',
    transliteration: 'Subhan Allah wal hamdu lillahi wallahu akbar',
    translation: 'Glory be to Allah, and praise be to Allah, and Allah is the Greatest',
    repetitions: 33,
    reference: 'Bukhari & Muslim',
    category: 'after_prayer',
    benefit: 'Spiritual purification after prayer'
  },
  {
    id: 'sleeping-1',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: 'Bismika Allahumma amootu wa ahya',
    translation: 'In Your name, O Allah, I die and I live',
    repetitions: 1,
    reference: 'Bukhari',
    category: 'sleeping',
    benefit: 'Protection during sleep'
  }
];

export const fetchAthkarByCategory = async (category: string): Promise<AthkarItem[]> => {
  try {
    console.log(`Fetching Athkar for category: ${category}`);
    
    // Try to fetch from API
    const response = await fetch(`${ATHKAR_API_BASE}/${category}.json`);
    
    if (response.ok) {
      const data: AthkarApiResponse = await response.json();
      
      return data.array.map((item, index) => ({
        id: `api-${category}-${item.ID}-${index}`,
        arabic: item.TEXT,
        transliteration: '', // API doesn't provide transliteration
        translation: translateToEnglish(item.TEXT),
        repetitions: item.REPEAT || 1,
        reference: 'Hisnul Muslim',
        category: category as AthkarItem['category'],
        benefit: 'Spiritual benefit and protection'
      }));
    }
    
    throw new Error('API response not ok');
    
  } catch (error) {
    console.error('Failed to fetch Athkar from API, using fallback:', error);
    
    // Return fallback data filtered by category
    return FALLBACK_ATHKAR.filter(athkar => athkar.category === category);
  }
};

export const fetchAllAthkar = async (): Promise<AthkarItem[]> => {
  try {
    const categories = ['morning', 'evening', 'after_prayer', 'sleeping'];
    const allAthkar = await Promise.all(
      categories.map(category => fetchAthkarByCategory(category))
    );
    
    return allAthkar.flat();
    
  } catch (error) {
    console.error('Failed to fetch all Athkar:', error);
    return FALLBACK_ATHKAR;
  }
};

export const searchAthkar = (query: string, athkarList: AthkarItem[]): AthkarItem[] => {
  if (!query.trim()) return athkarList;
  
  const searchTerm = query.toLowerCase();
  
  return athkarList.filter(athkar => 
    athkar.arabic.includes(query) ||
    athkar.transliteration?.toLowerCase().includes(searchTerm) ||
    athkar.translation?.toLowerCase().includes(searchTerm) ||
    athkar.category.toLowerCase().includes(searchTerm) ||
    athkar.benefit?.toLowerCase().includes(searchTerm)
  );
};
