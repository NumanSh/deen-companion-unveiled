
import { translateToEnglish } from '../utils/hadithUtils';
import { AUTHENTIC_ATHKAR_DATA, CATEGORY_MAPPING } from '../data/authenticAthkarData';

export interface AthkarItem {
  id: string;
  arabic: string;
  transliteration?: string;
  translation?: string;
  repetitions?: number;
  reference?: string;
  category: 'morning' | 'evening' | 'sleeping' | 'after_prayer' | 'general' | 'waking' | 'tasbih' | 'quranic_duas' | 'prophetic_duas';
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

// Convert data to AthkarItem format
const convertToAthkarItems = (categoryData: any[], categoryName: string): AthkarItem[] => {
  const englishCategory = CATEGORY_MAPPING[categoryName as keyof typeof CATEGORY_MAPPING] || 'general';
  
  return categoryData.map((item, index) => ({
    id: `${englishCategory}-${index + 1}`,
    arabic: item.content,
    transliteration: '', // We can add transliterations later
    translation: translateToEnglish(item.content),
    repetitions: parseInt(item.count) || 1,
    reference: item.reference || '',
    category: englishCategory as AthkarItem['category'],
    benefit: item.description || ''
  }));
};

export const fetchAthkarByCategory = async (category: string): Promise<AthkarItem[]> => {
  try {
    console.log(`Fetching Athkar for category: ${category}`);
    
    // Use authentic Arabic data
    let categoryData: any[] = [];
    
    switch (category) {
      case 'morning':
        categoryData = AUTHENTIC_ATHKAR_DATA["أذكار الصباح"];
        break;
      case 'evening':
        categoryData = AUTHENTIC_ATHKAR_DATA["أذكار المساء"];
        break;
      case 'after_prayer':
        categoryData = AUTHENTIC_ATHKAR_DATA["أذكار بعد السلام من الصلاة المفروضة"];
        break;
      case 'sleeping':
        categoryData = AUTHENTIC_ATHKAR_DATA["أذكار النوم"];
        break;
      case 'waking':
        categoryData = AUTHENTIC_ATHKAR_DATA["أذكار الاستيقاظ"];
        break;
      case 'general':
        categoryData = AUTHENTIC_ATHKAR_DATA["تسابيح"];
        break;
      default:
        categoryData = AUTHENTIC_ATHKAR_DATA["أذكار الصباح"];
    }

    // Find the Arabic category name for this data
    const arabicCategoryName = Object.keys(CATEGORY_MAPPING).find(
      key => CATEGORY_MAPPING[key as keyof typeof CATEGORY_MAPPING] === category
    ) || "أذكار الصباح";

    return convertToAthkarItems(categoryData, arabicCategoryName);
    
  } catch (error) {
    console.error('Error processing authentic Athkar data:', error);
    
    // Fallback to basic athkar
    return [
      {
        id: `fallback-${category}-1`,
        arabic: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ',
        transliteration: 'Subhan Allahi wa bihamdihi',
        translation: 'Glory be to Allah and praise be to Him',
        repetitions: 100,
        reference: 'Sahih Bukhari',
        category: category as AthkarItem['category'],
        benefit: 'Spiritual purification and divine blessings'
      }
    ];
  }
};

export const fetchAllAthkar = async (): Promise<AthkarItem[]> => {
  try {
    const categories = ['morning', 'evening', 'after_prayer', 'sleeping', 'waking', 'general'];
    const allAthkar = await Promise.all(
      categories.map(category => fetchAthkarByCategory(category))
    );
    
    return allAthkar.flat();
    
  } catch (error) {
    console.error('Failed to fetch all Athkar:', error);
    return [];
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
