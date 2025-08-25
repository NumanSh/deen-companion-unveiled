import ApiErrorHandler from '@/utils/apiErrorHandler';

export interface EnhancedHadith {
  id: string;
  hadithNumber: string;
  arabic: string;
  english: string;
  urdu?: string;
  narrator: {
    name: string;
    arabic?: string;
  };
  collection: {
    name: string;
    arabic?: string;
    shortName: string;
  };
  book: {
    name: string;
    arabic?: string;
    number: number;
  };
  chapter: {
    name: string;
    arabic?: string;
    number: number;
  };
  grade: {
    arabic: string;
    english: string;
    grade_value: 'sahih' | 'hasan' | 'daif' | 'mawdu';
  };
  reference: {
    collection: string;
    book: string;
    hadith: string;
  };
  themes: string[];
  keywords: string[];
  source_url?: string;
}

export interface HadithCollection {
  name: string;
  arabic_name: string;
  total_hadiths: number;
  books: HadithBook[];
  description: string;
  author: {
    name: string;
    arabic_name: string;
    death_year: number;
  };
}

export interface HadithBook {
  number: number;
  name: string;
  arabic_name: string;
  hadith_count: number;
  chapters: HadithChapter[];
}

export interface HadithChapter {
  number: number;
  name: string;
  arabic_name: string;
  hadith_range: {
    from: number;
    to: number;
  };
}

export interface HadithSearchResult {
  hadiths: EnhancedHadith[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_results: number;
    per_page: number;
  };
  search_info: {
    query: string;
    collection?: string;
    language: string;
    search_type: 'text' | 'narrator' | 'reference';
  };
}

// Enhanced API endpoints for comprehensive Hadith data
const SUNNAH_COM_API = 'https://api.sunnah.com/v1';
const HADITH_GADING_API = 'https://api.hadith.gading.dev';
const DORAR_HADITH_API = 'https://dorar.net/hadith/api'; // Hypothetical - replace with real API

// Available collections with metadata
const HADITH_COLLECTIONS: { [key: string]: HadithCollection } = {
  'bukhari': {
    name: 'Sahih al-Bukhari',
    arabic_name: 'صحيح البخاري',
    total_hadiths: 7563,
    books: [],
    description: 'Most authentic collection of Prophetic traditions',
    author: {
      name: 'Muhammad ibn Ismail al-Bukhari',
      arabic_name: 'محمد بن إسماعيل البخاري',
      death_year: 256
    }
  },
  'muslim': {
    name: 'Sahih Muslim',
    arabic_name: 'صحيح مسلم',
    total_hadiths: 7470,
    books: [],
    description: 'Second most authentic collection after Bukhari',
    author: {
      name: 'Muslim ibn al-Hajjaj',
      arabic_name: 'مسلم بن الحجاج',
      death_year: 261
    }
  },
  'abudawud': {
    name: 'Sunan Abi Dawud',
    arabic_name: 'سنن أبي داود',
    total_hadiths: 5274,
    books: [],
    description: 'Collection focusing on legal and practical matters',
    author: {
      name: 'Abu Dawud as-Sijistani',
      arabic_name: 'أبو داود السجستاني',
      death_year: 275
    }
  },
  'tirmidhi': {
    name: 'Jami\' at-Tirmidhi',
    arabic_name: 'جامع الترمذي',
    total_hadiths: 4341,
    books: [],
    description: 'Collection with detailed grading of narrations',
    author: {
      name: 'Muhammad at-Tirmidhi',
      arabic_name: 'محمد الترمذي',
      death_year: 279
    }
  },
  'nasai': {
    name: 'Sunan an-Nasa\'i',
    arabic_name: 'سنن النسائي',
    total_hadiths: 5761,
    books: [],
    description: 'Strict collection with authentic chains',
    author: {
      name: 'Ahmad an-Nasa\'i',
      arabic_name: 'أحمد النسائي',
      death_year: 303
    }
  },
  'ibnmajah': {
    name: 'Sunan Ibn Majah',
    arabic_name: 'سنن ابن ماجه',
    total_hadiths: 4341,
    books: [],
    description: 'Last of the six major Hadith collections',
    author: {
      name: 'Ibn Majah al-Qazwini',
      arabic_name: 'ابن ماجه القزويني',
      death_year: 273
    }
  }
};

// Cache for different types of Hadith data
const hadithCache = new Map<string, { data: EnhancedHadith; timestamp: number }>();
const collectionCache = new Map<string, { data: HadithCollection; timestamp: number }>();
const searchCache = new Map<string, { data: HadithSearchResult; timestamp: number }>();

export class EnhancedHadithService {
  private static readonly CACHE_DURATION = 60 * 60 * 1000; // 1 hour
  private static readonly SEARCH_CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

  // Fetch comprehensive Hadith collections with metadata
  static async getAllCollections(): Promise<HadithCollection[]> {
    const cacheKey = 'all-collections';
    const cached = collectionCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return [cached.data];
    }

    return ApiErrorHandler.withRetry(async () => {
      try {
        const response = await fetch(`${SUNNAH_COM_API}/collections`, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Islamic-Companion-App/1.0'
          }
        });

        if (!response.ok) {
          throw new Error(`Sunnah.com API error: ${response.status}`);
        }

        const data = await response.json();
        
        // Process and enhance collection data
        const collections = data.collections?.map((collection: any) => 
          this.enhanceCollectionData(collection)
        ) || Object.values(HADITH_COLLECTIONS);

        return collections;

      } catch (error) {
        console.error('Sunnah.com API failed, using static data:', error);
        return Object.values(HADITH_COLLECTIONS);
      }
    });
  }

  // Advanced Hadith search with multiple criteria
  static async searchHadithsAdvanced(options: {
    query: string;
    collection?: string;
    book?: number;
    chapter?: number;
    narrator?: string;
    theme?: string;
    grade?: string;
    language?: 'arabic' | 'english' | 'both';
    page?: number;
    limit?: number;
  }): Promise<HadithSearchResult> {
    const cacheKey = `search-${JSON.stringify(options)}`;
    const cached = searchCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.SEARCH_CACHE_DURATION) {
      return cached.data;
    }

    return ApiErrorHandler.withRetry(async () => {
      try {
        // Try Sunnah.com API first for most comprehensive search
        const searchResult = await this.searchSunnahCom(options);
        
        searchCache.set(cacheKey, { data: searchResult, timestamp: Date.now() });
        return searchResult;

      } catch (error) {
        console.error('Advanced search failed, trying basic search:', error);
        return this.searchHadithBasic(options.query, options);
      }
    });
  }

  // Fetch specific Hadith by reference
  static async getHadithByReference(
    collection: string, 
    book: number | string, 
    hadith: number | string
  ): Promise<EnhancedHadith> {
    const cacheKey = `hadith-${collection}-${book}-${hadith}`;
    const cached = hadithCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    return ApiErrorHandler.withRetry(async () => {
      try {
        const response = await fetch(
          `${SUNNAH_COM_API}/collections/${collection}/books/${book}/hadiths/${hadith}`, {
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'Islamic-Companion-App/1.0'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`Hadith API error: ${response.status}`);
        }

        const data = await response.json();
        const hadith_data = data.hadith;

        const enhancedHadith: EnhancedHadith = {
          id: `${collection}-${book}-${hadith}`,
          hadithNumber: hadith_data.hadithNumber,
          arabic: hadith_data.hadithArabic,
          english: hadith_data.hadithEnglish,
          urdu: hadith_data.hadithUrdu,
          narrator: {
            name: hadith_data.englishNarrator,
            arabic: hadith_data.arabicNarrator
          },
          collection: {
            name: HADITH_COLLECTIONS[collection]?.name || collection,
            arabic: HADITH_COLLECTIONS[collection]?.arabic_name,
            shortName: collection
          },
          book: {
            name: hadith_data.reference?.book || 'Unknown',
            arabic: hadith_data.reference?.arabicBook,
            number: parseInt(book.toString())
          },
          chapter: {
            name: hadith_data.chapter?.englishName || 'Unknown',
            arabic: hadith_data.chapter?.arabicName,
            number: hadith_data.chapter?.number || 0
          },
          grade: {
            arabic: hadith_data.arabicGrade || 'غير محدد',
            english: hadith_data.englishGrade || 'Not specified',
            grade_value: this.parseGradeValue(hadith_data.englishGrade)
          },
          reference: {
            collection: collection,
            book: book.toString(),
            hadith: hadith.toString()
          },
          themes: this.extractThemes(hadith_data.hadithEnglish),
          keywords: this.extractKeywords(hadith_data.hadithEnglish),
          source_url: `https://sunnah.com/${collection}:${hadith}`
        };

        hadithCache.set(cacheKey, { data: enhancedHadith, timestamp: Date.now() });
        return enhancedHadith;

      } catch (error) {
        console.error('Sunnah.com API failed, trying Gading API:', error);
        return this.getHadithFromGadingAPI(collection, hadith);
      }
    });
  }

  // Get random authentic Hadiths
  static async getRandomHadiths(count: number = 10, collections?: string[]): Promise<EnhancedHadith[]> {
    const selectedCollections = collections || ['bukhari', 'muslim'];
    const hadiths: EnhancedHadith[] = [];

    return ApiErrorHandler.withRetry(async () => {
      for (let i = 0; i < count; i++) {
        const randomCollection = selectedCollections[Math.floor(Math.random() * selectedCollections.length)];
        const randomBook = Math.floor(Math.random() * 10) + 1; // Simplified
        const randomHadith = Math.floor(Math.random() * 100) + 1; // Simplified

        try {
          const hadith = await this.getHadithByReference(randomCollection, randomBook, randomHadith);
          hadiths.push(hadith);
        } catch (error) {
          console.error(`Failed to fetch random hadith ${i + 1}:`, error);
          // Continue with next random hadith
        }
      }

      return hadiths;
    });
  }

  // Get Hadiths by theme/topic
  static async getHadithsByTheme(theme: string, limit: number = 20): Promise<EnhancedHadith[]> {
    const searchOptions = {
      query: theme,
      theme: theme,
      limit: limit,
      language: 'both' as const
    };

    const searchResult = await this.searchHadithsAdvanced(searchOptions);
    return searchResult.hadiths;
  }

  // Private helper methods
  private static async searchSunnahCom(options: any): Promise<HadithSearchResult> {
    const params = new URLSearchParams({
      q: options.query,
      page: (options.page || 1).toString(),
      limit: (options.limit || 20).toString(),
      ...(options.collection && { collection: options.collection }),
      ...(options.book && { book: options.book.toString() }),
      ...(options.narrator && { narrator: options.narrator })
    });

    const response = await fetch(`${SUNNAH_COM_API}/hadiths/search?${params}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Islamic-Companion-App/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`Sunnah.com search error: ${response.status}`);
    }

    const data = await response.json();

    return {
      hadiths: data.hadiths?.map((h: any) => this.enhanceHadithData(h)) || [],
      pagination: {
        current_page: data.pagination?.current_page || 1,
        total_pages: data.pagination?.total_pages || 1,
        total_results: data.pagination?.total || 0,
        per_page: data.pagination?.per_page || 20
      },
      search_info: {
        query: options.query,
        collection: options.collection,
        language: options.language || 'english',
        search_type: 'text'
      }
    };
  }

  private static async searchHadithBasic(query: string, options: any): Promise<HadithSearchResult> {
    // Fallback search using Gading API
    const collection = options.collection || 'bukhari';
    
    try {
      const response = await fetch(`${HADITH_GADING_API}/books/${collection}?range=1-20`);
      const data = await response.json();

      const filteredHadiths = data.hadiths?.filter((h: any) => 
        h.arab?.includes(query) || 
        JSON.stringify(h).toLowerCase().includes(query.toLowerCase())
      ).map((h: any) => this.convertGadingToEnhanced(h, collection)) || [];

      return {
        hadiths: filteredHadiths.slice(0, options.limit || 20),
        pagination: {
          current_page: 1,
          total_pages: 1,
          total_results: filteredHadiths.length,
          per_page: options.limit || 20
        },
        search_info: {
          query,
          collection: options.collection,
          language: 'arabic',
          search_type: 'text'
        }
      };
    } catch (error) {
      return {
        hadiths: [],
        pagination: { current_page: 1, total_pages: 0, total_results: 0, per_page: 20 },
        search_info: { query, language: 'english', search_type: 'text' }
      };
    }
  }

  private static async getHadithFromGadingAPI(collection: string, hadith: string | number): Promise<EnhancedHadith> {
    const response = await fetch(`${HADITH_GADING_API}/books/${collection}?range=${hadith}-${hadith}`);
    const data = await response.json();

    if (!data.hadiths || data.hadiths.length === 0) {
      throw new Error('Hadith not found');
    }

    return this.convertGadingToEnhanced(data.hadiths[0], collection);
  }

  private static convertGadingToEnhanced(gadingHadith: any, collection: string): EnhancedHadith {
    return {
      id: `${collection}-${gadingHadith.number}`,
      hadithNumber: gadingHadith.number.toString(),
      arabic: gadingHadith.arab || 'Arabic text not available',
      english: 'English translation not available from this source',
      narrator: {
        name: 'Not specified'
      },
      collection: {
        name: HADITH_COLLECTIONS[collection]?.name || collection,
        arabic: HADITH_COLLECTIONS[collection]?.arabic_name,
        shortName: collection
      },
      book: {
        name: 'Unknown',
        number: 1
      },
      chapter: {
        name: 'Unknown',
        number: 1
      },
      grade: {
        arabic: 'غير محدد',
        english: 'Not specified',
        grade_value: 'sahih'
      },
      reference: {
        collection,
        book: '1',
        hadith: gadingHadith.number.toString()
      },
      themes: [],
      keywords: []
    };
  }

  private static enhanceHadithData(rawHadith: any): EnhancedHadith {
    // Implementation to enhance raw API data
    return rawHadith; // Placeholder
  }

  private static enhanceCollectionData(rawCollection: any): HadithCollection {
    // Implementation to enhance collection data
    return rawCollection; // Placeholder
  }

  private static parseGradeValue(gradeText: string): EnhancedHadith['grade']['grade_value'] {
    const text = gradeText?.toLowerCase() || '';
    if (text.includes('sahih') || text.includes('authentic')) return 'sahih';
    if (text.includes('hasan') || text.includes('good')) return 'hasan';
    if (text.includes('daif') || text.includes('weak')) return 'daif';
    if (text.includes('mawdu') || text.includes('fabricated')) return 'mawdu';
    return 'sahih'; // Default
  }

  private static extractThemes(text: string): string[] {
    // Extract Islamic themes from Hadith text
    const commonThemes = [
      'Prayer', 'Charity', 'Fasting', 'Pilgrimage', 'Faith', 'Worship', 
      'Character', 'Ethics', 'Family', 'Society', 'Knowledge', 'Patience'
    ];
    
    return commonThemes.filter(theme => 
      text.toLowerCase().includes(theme.toLowerCase())
    );
  }

  private static extractKeywords(text: string): string[] {
    // Extract relevant keywords
    const words = text.toLowerCase().split(/\W+/);
    const islamicTerms = [
      'allah', 'prophet', 'prayer', 'faith', 'islam', 'muslim', 'quran',
      'charity', 'zakat', 'hajj', 'fasting', 'ramadan', 'eid'
    ];
    
    return words.filter(word => 
      word.length > 3 && islamicTerms.includes(word)
    ).slice(0, 10);
  }

  // Clear all caches
  static clearAllCaches(): void {
    hadithCache.clear();
    collectionCache.clear();
    searchCache.clear();
  }
}

// Export enhanced functions for ease of use
export const getAllCollections = () => EnhancedHadithService.getAllCollections();
export const searchHadithsAdvanced = (options: any) => 
  EnhancedHadithService.searchHadithsAdvanced(options);
export const getHadithByReference = (collection: string, book: number | string, hadith: number | string) => 
  EnhancedHadithService.getHadithByReference(collection, book, hadith);
export const getRandomHadiths = (count?: number, collections?: string[]) => 
  EnhancedHadithService.getRandomHadiths(count, collections);
export const getHadithsByTheme = (theme: string, limit?: number) => 
  EnhancedHadithService.getHadithsByTheme(theme, limit);