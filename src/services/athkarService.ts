
import { translateAthkarText } from '../utils/athkarTranslations';
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
  
  console.log(`Converting ${categoryData.length} items for category: ${categoryName} -> ${englishCategory}`);
  
  return categoryData.map((item, index) => ({
    id: `${englishCategory}-${index + 1}`,
    arabic: item.content,
    transliteration: '', // We can add transliterations later
    translation: translateAthkarText(item.content),
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
      case 'tasbih':
        categoryData = AUTHENTIC_ATHKAR_DATA["تسابيح"];
        break;
      case 'quranic_duas':
        categoryData = AUTHENTIC_ATHKAR_DATA["أدعية قرآنية"];
        break;
      case 'prophetic_duas':
        categoryData = AUTHENTIC_ATHKAR_DATA["أدعية الأنبياء"];
        break;
      default:
        console.warn(`Unknown category: ${category}, using morning athkar as fallback`);
        categoryData = AUTHENTIC_ATHKAR_DATA["أذكار الصباح"];
    }

    if (!categoryData || categoryData.length === 0) {
      console.warn(`No data found for category: ${category}`);
      return [];
    }

    // Find the Arabic category name for this data
    const arabicCategoryName = Object.keys(CATEGORY_MAPPING).find(
      key => CATEGORY_MAPPING[key as keyof typeof CATEGORY_MAPPING] === category
    ) || "أذكار الصباح";

    const athkarItems = convertToAthkarItems(categoryData, arabicCategoryName);
    console.log(`Successfully converted ${athkarItems.length} Athkar items for category: ${category}`);
    return athkarItems;
    
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
    // Get all available categories from the authentic data
    const allCategories = Object.keys(CATEGORY_MAPPING);
    const englishCategories = Object.values(CATEGORY_MAPPING);
    
    console.log('Fetching all Athkar categories:', englishCategories);
    console.log('Total Arabic categories available:', allCategories);
    console.log('Available data keys:', Object.keys(AUTHENTIC_ATHKAR_DATA));
    
    const allAthkar = await Promise.all(
      englishCategories.map(async (category) => {
        try {
          const categoryAthkar = await fetchAthkarByCategory(category);
          console.log(`Category ${category}: ${categoryAthkar.length} items loaded`);
          return categoryAthkar;
        } catch (error) {
          console.error(`Failed to load category ${category}:`, error);
          return [];
        }
      })
    );
    
    const flattened = allAthkar.flat();
    console.log(`Total Athkar loaded: ${flattened.length}`);
    console.log(`Categories processed: ${englishCategories.length}`);
    
    // Log summary of each category
    englishCategories.forEach(category => {
      const categoryItems = flattened.filter(item => item.category === category);
      console.log(`${category}: ${categoryItems.length} items`);
    });
    
    return flattened;
    
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
