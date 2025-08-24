import { ApiErrorHandler } from '@/shared';

export interface EnhancedQuranVerse {
  number: number;
  text: string;
  numberInSurah: number;
  audio?: {
    primary: string;
    secondary: string[];
  };
}

export interface EnhancedQuranSurah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
  ayahs?: EnhancedQuranVerse[];
  metadata?: {
    period: string;
    bismillahPre: boolean;
    mainTopic: string;
    orderOfRevelation: number;
  };
}

export interface QuranTranslation {
  id: string;
  name: string;
  author_name: string;
  language_name: string;
  text: string;
}

export interface QuranRecitation {
  id: number;
  reciter_name: string;
  style: string;
  translated_name: {
    name: string;
    language_name: string;
  };
}

// Enhanced API endpoints for comprehensive Quran data
const QURAN_COM_API = 'https://api.quran.com/api/v4';
const ALQURAN_CLOUD_API = 'https://api.alquran.cloud/v1';
const QURAN_HADITH_API = 'https://api.quranapi.com/api/v1';

// Cache for different types of Quran data
const surahCache = new Map<string, EnhancedQuranSurah>();
const translationCache = new Map<string, QuranTranslation[]>();
const recitationCache = new Map<string, QuranRecitation[]>();

// Enhanced service class with comprehensive Quran data integration
export class EnhancedQuranService {
  
  // Fetch complete surah with enhanced metadata
  static async fetchSurahWithMetadata(surahNumber: number): Promise<EnhancedQuranSurah> {
    const cacheKey = `surah-${surahNumber}`;
    
    if (surahCache.has(cacheKey)) {
      return surahCache.get(cacheKey)!;
    }

    return ApiErrorHandler.withRetry(async () => {
      try {
        // Fetch from Quran.com API for most comprehensive data
        const response = await fetch(`${QURAN_COM_API}/chapters/${surahNumber}`, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Islamic-Companion-App/1.0'
          },
          signal: AbortSignal.timeout(15000)
        });

        if (!response.ok) {
          throw new Error(`Quran.com API error: ${response.status}`);
        }

        const data = await response.json();
        const chapter = data.chapter;

        // Fetch verses separately for better performance
        const versesResponse = await fetch(`${QURAN_COM_API}/verses/by_chapter/${surahNumber}?language=ar&words=true&translations=131`, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Islamic-Companion-App/1.0'
          }
        });

        const versesData = await versesResponse.json();

        const enhancedSurah: EnhancedQuranSurah = {
          number: chapter.id,
          name: chapter.name_arabic,
          englishName: chapter.name_simple,
          englishNameTranslation: chapter.translated_name.name,
          numberOfAyahs: chapter.verses_count,
          revelationType: chapter.revelation_place as 'Meccan' | 'Medinan',
          ayahs: versesData.verses?.map((verse: any) => ({
            number: verse.verse_number,
            text: verse.text_uthmani,
            numberInSurah: verse.verse_number,
            audio: {
              primary: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${verse.verse_key.replace(':', '')}.mp3`,
              secondary: [
                `https://cdn.islamic.network/quran/audio/128/ar.abdullahbasfar/${verse.verse_key.replace(':', '')}.mp3`,
                `https://cdn.islamic.network/quran/audio/128/ar.abdurrahmaansudais/${verse.verse_key.replace(':', '')}.mp3`
              ]
            }
          })) || [],
          metadata: {
            period: chapter.revelation_place,
            bismillahPre: chapter.bismillah_pre,
            mainTopic: this.getMainTopic(surahNumber),
            orderOfRevelation: chapter.revelation_order || 0
          }
        };

        surahCache.set(cacheKey, enhancedSurah);
        return enhancedSurah;

      } catch (error) {
        console.error('Quran.com API failed, trying AlQuran Cloud:', error);
        
        // Fallback to AlQuran Cloud API
        return this.fetchSurahFromAlQuranCloud(surahNumber);
      }
    });
  }

  // Fetch available translations
  static async fetchAvailableTranslations(language: string = 'en'): Promise<QuranTranslation[]> {
    const cacheKey = `translations-${language}`;
    
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey)!;
    }

    return ApiErrorHandler.withRetry(async () => {
      const response = await fetch(`${QURAN_COM_API}/resources/translations?language=${language}`, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Islamic-Companion-App/1.0'
        }
      });

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status}`);
      }

      const data = await response.json();
      const translations: QuranTranslation[] = data.translations.map((t: any) => ({
        id: t.id.toString(),
        name: t.name,
        author_name: t.author_name,
        language_name: t.language_name,
        text: t.translated_name?.name || t.name
      }));

      translationCache.set(cacheKey, translations);
      return translations;
    });
  }

  // Fetch available recitations
  static async fetchAvailableRecitations(): Promise<QuranRecitation[]> {
    const cacheKey = 'recitations';
    
    if (recitationCache.has(cacheKey)) {
      return recitationCache.get(cacheKey)!;
    }

    return ApiErrorHandler.withRetry(async () => {
      const response = await fetch(`${QURAN_COM_API}/resources/recitations`, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Islamic-Companion-App/1.0'
        }
      });

      if (!response.ok) {
        throw new Error(`Recitation API error: ${response.status}`);
      }

      const data = await response.json();
      const recitations: QuranRecitation[] = data.recitations.map((r: any) => ({
        id: r.id,
        reciter_name: r.reciter_name,
        style: r.style,
        translated_name: r.translated_name
      }));

      recitationCache.set(cacheKey, recitations);
      return recitations;
    });
  }

  // Search verses across Quran with advanced filtering
  static async searchVerses(query: string, options: {
    translation?: string;
    language?: string;
    surah?: number;
    size?: number;
    page?: number;
  } = {}): Promise<{
    verses: any[];
    pagination: { total_records: number; current_page: number; total_pages: number; };
  }> {
    const params = new URLSearchParams({
      q: query,
      size: (options.size || 20).toString(),
      page: (options.page || 1).toString(),
      language: options.language || 'en',
      ...(options.translation && { translation: options.translation }),
      ...(options.surah && { chapter: options.surah.toString() })
    });

    return ApiErrorHandler.withRetry(async () => {
      const response = await fetch(`${QURAN_COM_API}/search?${params}`, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Islamic-Companion-App/1.0'
        }
      });

      if (!response.ok) {
        throw new Error(`Search API error: ${response.status}`);
      }

      return response.json();
    });
  }

  // Fallback to AlQuran Cloud API
  private static async fetchSurahFromAlQuranCloud(surahNumber: number): Promise<EnhancedQuranSurah> {
    const response = await fetch(`${ALQURAN_CLOUD_API}/surah/${surahNumber}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Islamic-Companion-App/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`AlQuran Cloud API error: ${response.status}`);
    }

    const data = await response.json();
    const surah = data.data;

    return {
      number: surah.number,
      name: surah.name,
      englishName: surah.englishName,
      englishNameTranslation: surah.englishNameTranslation,
      numberOfAyahs: surah.numberOfAyahs,
      revelationType: surah.revelationType as 'Meccan' | 'Medinan',
      ayahs: surah.ayahs?.map((ayah: any) => ({
        number: ayah.number,
        text: ayah.text,
        numberInSurah: ayah.numberInSurah,
        audio: {
          primary: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${surahNumber.toString().padStart(3, '0')}${ayah.numberInSurah.toString().padStart(3, '0')}.mp3`,
          secondary: []
        }
      })) || []
    };
  }

  // Get main topic for surah
  private static getMainTopic(surahNumber: number): string {
    const topics: { [key: number]: string } = {
      1: 'Opening and Praise of Allah',
      2: 'Guidance and Law',
      3: 'Family of Imran and Unity',
      18: 'The Cave and Trials',
      36: 'Ya-Sin and Resurrection',
      67: 'Dominion and Divine Power',
      112: 'Divine Unity',
      113: 'Protection from Evil',
      114: 'Seeking Refuge in Allah'
    };
    
    return topics[surahNumber] || 'Divine Guidance';
  }

  // Clear all caches
  static clearAllCaches(): void {
    surahCache.clear();
    translationCache.clear();
    recitationCache.clear();
  }
}

// Export enhanced service functions for backward compatibility
export const fetchEnhancedSurahArabic = (surahNumber: number) => 
  EnhancedQuranService.fetchSurahWithMetadata(surahNumber);

export const fetchAvailableTranslations = (language?: string) => 
  EnhancedQuranService.fetchAvailableTranslations(language);

export const fetchAvailableRecitations = () => 
  EnhancedQuranService.fetchAvailableRecitations();

export const searchQuranVerses = (query: string, options?: any) => 
  EnhancedQuranService.searchVerses(query, options);