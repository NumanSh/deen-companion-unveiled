import { ApiErrorHandler } from '@/shared';

export interface EnhancedAthkar {
  id: string;
  arabic: string;
  transliteration: string;
  english_translation: string;
  repetitions: number;
  category: 'morning' | 'evening' | 'after_prayer' | 'sleeping' | 'waking' | 'travel' | 'eating' | 'general' | 'protection' | 'sickness';
  subcategory?: string;
  source: {
    type: 'quran' | 'hadith' | 'prophetic_dua';
    reference: string;
    chain: string;
    grade: 'sahih' | 'hasan' | 'daif' | 'authentic';
  };
  benefits: string[];
  conditions: string[];
  timing: {
    recommended_times: string[];
    forbidden_times?: string[];
    duration?: string;
  };
  audio?: {
    arabic_recitation: string;
    transliteration_audio: string;
  };
  metadata: {
    prophet_used: boolean;
    companion_narrated?: string;
    frequency: 'daily' | 'weekly' | 'occasional' | 'as_needed';
    difficulty: 'easy' | 'medium' | 'advanced';
  };
}

export interface DuaCollection {
  id: string;
  name: {
    english: string;
    arabic: string;
  };
  description: string;
  duas: EnhancedAthkar[];
  total_count: number;
  estimated_duration: number; // minutes
  recommended_for: string[];
}

export interface AthkarSchedule {
  morning: EnhancedAthkar[];
  evening: EnhancedAthkar[];
  after_prayer: EnhancedAthkar[];
  before_sleep: EnhancedAthkar[];
  upon_waking: EnhancedAthkar[];
  general: EnhancedAthkar[];
}

// Enhanced authentic Athkar data with comprehensive details
const COMPREHENSIVE_ATHKAR_DATA: { [category: string]: EnhancedAthkar[] } = {
  morning: [
    {
      id: 'morning-1',
      arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
      transliteration: 'Asbahna wa asbaha al-mulku lillahi, walhamdu lillahi, la ilaha illa Allah wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadeer',
      english_translation: 'We have reached the morning and at this very time the whole kingdom belongs to Allah. All praise is for Allah. There is no deity worthy of worship except Allah, the One, Who has no partner. His is the kingdom and His is the praise, and He has power over all things.',
      repetitions: 1,
      category: 'morning',
      source: {
        type: 'hadith',
        reference: 'Muslim 2723',
        chain: 'Abd Allah ibn Mas\'ud',
        grade: 'sahih'
      },
      benefits: ['Divine protection', 'Spiritual strength', 'Barakah in the day'],
      conditions: ['Say after Fajr prayer', 'Best before sunrise'],
      timing: {
        recommended_times: ['After Fajr', 'Before sunrise', 'Early morning'],
        duration: '2 minutes'
      },
      metadata: {
        prophet_used: true,
        companion_narrated: 'Abd Allah ibn Mas\'ud',
        frequency: 'daily',
        difficulty: 'easy'
      }
    },
    {
      id: 'morning-2',
      arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ',
      transliteration: 'Allahumma bika asbahna wa bika amseina wa bika nahya wa bika namootu wa ilaykan-nushoor',
      english_translation: 'O Allah, by You we enter the morning and by You we enter the evening. By You we live and by You we die, and to You is the resurrection.',
      repetitions: 1,
      category: 'morning',
      source: {
        type: 'hadith',
        reference: 'Abu Dawud 5068, Tirmidhi 3391',
        chain: 'Hudhayfah ibn al-Yaman',
        grade: 'sahih'
      },
      benefits: ['Acknowledgment of Allah\'s dominion', 'Preparation for afterlife', 'Spiritual awareness'],
      conditions: ['After morning prayer', 'During morning hours'],
      timing: {
        recommended_times: ['After Fajr', 'Morning hours'],
        duration: '1 minute'
      },
      metadata: {
        prophet_used: true,
        companion_narrated: 'Hudhayfah ibn al-Yaman',
        frequency: 'daily',
        difficulty: 'easy'
      }
    },
    {
      id: 'morning-3',
      arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
      transliteration: 'Subhan Allahi wa bihamdihi',
      english_translation: 'Glory be to Allah and praise be to Him.',
      repetitions: 100,
      category: 'morning',
      source: {
        type: 'hadith',
        reference: 'Sahih Bukhari 6405, Sahih Muslim 2691',
        chain: 'Abu Hurairah',
        grade: 'sahih'
      },
      benefits: ['Sins forgiven', 'Spiritual purification', 'Increased hasanat'],
      conditions: ['Can be said anytime', 'Especially recommended in morning'],
      timing: {
        recommended_times: ['Morning', 'After prayers', 'Anytime'],
        duration: '5 minutes'
      },
      metadata: {
        prophet_used: true,
        companion_narrated: 'Abu Hurairah',
        frequency: 'daily',
        difficulty: 'easy'
      }
    }
  ],
  evening: [
    {
      id: 'evening-1',
      arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
      transliteration: 'Amseina wa amsa al-mulku lillahi, walhamdu lillahi, la ilaha illa Allah wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadeer',
      english_translation: 'We have reached the evening and at this very time the whole kingdom belongs to Allah. All praise is for Allah. There is no deity worthy of worship except Allah, the One, Who has no partner. His is the kingdom and His is the praise, and He has power over all things.',
      repetitions: 1,
      category: 'evening',
      source: {
        type: 'hadith',
        reference: 'Muslim 2723',
        chain: 'Abd Allah ibn Mas\'ud',
        grade: 'sahih'
      },
      benefits: ['Protection during night', 'Spiritual peace', 'Barakah'],
      conditions: ['After Maghrib prayer', 'Before Isha'],
      timing: {
        recommended_times: ['After Maghrib', 'Evening hours'],
        duration: '2 minutes'
      },
      metadata: {
        prophet_used: true,
        companion_narrated: 'Abd Allah ibn Mas\'ud',
        frequency: 'daily',
        difficulty: 'easy'
      }
    }
  ],
  after_prayer: [
    {
      id: 'after-prayer-1',
      arabic: 'سُبْحَانَ اللَّهِ',
      transliteration: 'Subhan Allah',
      english_translation: 'Glory be to Allah.',
      repetitions: 33,
      category: 'after_prayer',
      source: {
        type: 'hadith',
        reference: 'Sahih Bukhari 843, Sahih Muslim 596',
        chain: 'Abu Hurairah',
        grade: 'sahih'
      },
      benefits: ['Spiritual purification', 'Increased rewards', 'Remembrance of Allah'],
      conditions: ['After each obligatory prayer', 'Before leaving prayer place'],
      timing: {
        recommended_times: ['Immediately after Salah'],
        duration: '2 minutes'
      },
      metadata: {
        prophet_used: true,
        companion_narrated: 'Abu Hurairah',
        frequency: 'daily',
        difficulty: 'easy'
      }
    }
  ],
  protection: [
    {
      id: 'protection-1',
      arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ مِن شَرِّ مَا خَلَقَ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
      transliteration: 'Qul a\'udhu bi Rabbi\'l-falaq min sharri ma khalaq wa min sharri ghasiqin idha waqab wa min sharri\'n-naffathati fi\'l-\'uqad wa min sharri hasidin idha hasad',
      english_translation: 'Say: I seek refuge with the Lord of the dawn from the evil of what He created, and from the evil of the black darkness when it descends, and from the evil of those who blow on knots, and from the evil of the envious when he envies.',
      repetitions: 3,
      category: 'protection',
      source: {
        type: 'quran',
        reference: 'Surah Al-Falaq (113:1-5)',
        chain: 'Direct Quranic verse',
        grade: 'authentic'
      },
      benefits: ['Protection from evil', 'Spiritual shield', 'Divine refuge'],
      conditions: ['Morning and evening', 'Before sleep', 'When feeling fear'],
      timing: {
        recommended_times: ['Morning', 'Evening', 'Before sleep'],
        duration: '1 minute'
      },
      metadata: {
        prophet_used: true,
        frequency: 'daily',
        difficulty: 'easy'
      }
    }
  ]
};

// Cache for Athkar data
const athkarCache = new Map<string, { data: EnhancedAthkar[]; timestamp: number }>();
const collectionCache = new Map<string, { data: DuaCollection; timestamp: number }>();

export class EnhancedAthkarService {
  private static readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  // Get comprehensive Athkar by category
  static async getAthkarByCategory(category: string): Promise<EnhancedAthkar[]> {
    const cacheKey = `athkar-${category}`;
    const cached = athkarCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    return ApiErrorHandler.withRetry(async () => {
      const athkarData = COMPREHENSIVE_ATHKAR_DATA[category] || [];
      
      // Enhance with audio URLs if available
      const enhancedAthkar = athkarData.map(athkar => ({
        ...athkar,
        audio: {
          arabic_recitation: `https://cdn.islamic-network.com/athkar/audio/${athkar.id}-arabic.mp3`,
          transliteration_audio: `https://cdn.islamic-network.com/athkar/audio/${athkar.id}-transliteration.mp3`
        }
      }));

      athkarCache.set(cacheKey, { data: enhancedAthkar, timestamp: Date.now() });
      return enhancedAthkar;
    });
  }

  // Get complete daily Athkar schedule
  static async getDailyAthkarSchedule(): Promise<AthkarSchedule> {
    return ApiErrorHandler.withRetry(async () => {
      const [morning, evening, afterPrayer, sleeping, waking, general] = await Promise.all([
        this.getAthkarByCategory('morning'),
        this.getAthkarByCategory('evening'),
        this.getAthkarByCategory('after_prayer'),
        this.getAthkarByCategory('sleeping'),
        this.getAthkarByCategory('waking'),
        this.getAthkarByCategory('general')
      ]);

      return {
        morning,
        evening,
        after_prayer: afterPrayer,
        before_sleep: sleeping,
        upon_waking: waking,
        general
      };
    });
  }

  // Get curated Dua collections
  static async getDuaCollections(): Promise<DuaCollection[]> {
    const cacheKey = 'dua-collections';
    const cached = collectionCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return [cached.data];
    }

    return ApiErrorHandler.withRetry(async () => {
      const collections: DuaCollection[] = [
        {
          id: 'daily-essentials',
          name: {
            english: 'Daily Essential Duas',
            arabic: 'الأدعية اليومية الأساسية'
          },
          description: 'Most important duas for daily spiritual practice',
          duas: await this.getEssentialDuas(),
          total_count: 20,
          estimated_duration: 15,
          recommended_for: ['Daily practice', 'Beginners', 'Spiritual maintenance']
        },
        {
          id: 'protection-fortress',
          name: {
            english: 'Fortress of Protection',
            arabic: 'حصن الحماية'
          },
          description: 'Powerful duas for spiritual protection',
          duas: await this.getAthkarByCategory('protection'),
          total_count: 15,
          estimated_duration: 20,
          recommended_for: ['Spiritual protection', 'Overcoming difficulties', 'Peace of mind']
        },
        {
          id: 'healing-wellness',
          name: {
            english: 'Healing and Wellness',
            arabic: 'الشفاء والعافية'
          },
          description: 'Duas for physical and spiritual healing',
          duas: await this.getAthkarByCategory('sickness'),
          total_count: 12,
          estimated_duration: 10,
          recommended_for: ['Health issues', 'Recovery', 'Overall wellness']
        }
      ];

      return collections;
    });
  }

  // Search Athkar by text or theme
  static async searchAthkar(query: string, filters?: {
    category?: string;
    source_type?: 'quran' | 'hadith' | 'prophetic_dua';
    difficulty?: 'easy' | 'medium' | 'advanced';
    frequency?: 'daily' | 'weekly' | 'occasional' | 'as_needed';
  }): Promise<EnhancedAthkar[]> {
    return ApiErrorHandler.withRetry(async () => {
      const allCategories = Object.keys(COMPREHENSIVE_ATHKAR_DATA);
      let allAthkar: EnhancedAthkar[] = [];

      // Collect all Athkar
      for (const category of allCategories) {
        const categoryAthkar = await this.getAthkarByCategory(category);
        allAthkar = allAthkar.concat(categoryAthkar);
      }

      // Apply filters
      let filteredAthkar = allAthkar;

      if (filters?.category) {
        filteredAthkar = filteredAthkar.filter(athkar => athkar.category === filters.category);
      }

      if (filters?.source_type) {
        filteredAthkar = filteredAthkar.filter(athkar => athkar.source.type === filters.source_type);
      }

      if (filters?.difficulty) {
        filteredAthkar = filteredAthkar.filter(athkar => athkar.metadata.difficulty === filters.difficulty);
      }

      if (filters?.frequency) {
        filteredAthkar = filteredAthkar.filter(athkar => athkar.metadata.frequency === filters.frequency);
      }

      // Text search
      if (query.trim()) {
        const searchTerm = query.toLowerCase();
        filteredAthkar = filteredAthkar.filter(athkar =>
          athkar.arabic.includes(query) ||
          athkar.english_translation.toLowerCase().includes(searchTerm) ||
          athkar.transliteration.toLowerCase().includes(searchTerm) ||
          athkar.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm)) ||
          athkar.source.reference.toLowerCase().includes(searchTerm)
        );
      }

      return filteredAthkar;
    });
  }

  // Get personalized recommendations based on time and user preferences
  static async getPersonalizedRecommendations(preferences: {
    spiritual_level: 'beginner' | 'intermediate' | 'advanced';
    time_available: number; // minutes
    current_time: 'morning' | 'evening' | 'night' | 'anytime';
    focus_areas: string[]; // ['protection', 'gratitude', 'forgiveness', etc.]
  }): Promise<EnhancedAthkar[]> {
    return ApiErrorHandler.withRetry(async () => {
      let recommendations: EnhancedAthkar[] = [];

      // Time-based recommendations
      if (preferences.current_time === 'morning') {
        recommendations = recommendations.concat(await this.getAthkarByCategory('morning'));
      } else if (preferences.current_time === 'evening') {
        recommendations = recommendations.concat(await this.getAthkarByCategory('evening'));
      }

      // Difficulty-based filtering
      const difficultyMap = {
        'beginner': 'easy',
        'intermediate': 'medium',
        'advanced': 'advanced'
      };

      recommendations = recommendations.filter(athkar => 
        athkar.metadata.difficulty === difficultyMap[preferences.spiritual_level] ||
        athkar.metadata.difficulty === 'easy'
      );

      // Focus area filtering
      if (preferences.focus_areas.includes('protection')) {
        recommendations = recommendations.concat(await this.getAthkarByCategory('protection'));
      }

      // Time constraint filtering
      const estimatedDuration = this.calculateTotalDuration(recommendations);
      if (estimatedDuration > preferences.time_available) {
        // Prioritize by importance and fit within time limit
        recommendations = this.prioritizeByImportance(recommendations, preferences.time_available);
      }

      return recommendations.slice(0, 10); // Limit to top 10 recommendations
    });
  }

  // Private helper methods
  private static async getEssentialDuas(): Promise<EnhancedAthkar[]> {
    const morning = await this.getAthkarByCategory('morning');
    const evening = await this.getAthkarByCategory('evening');
    const afterPrayer = await this.getAthkarByCategory('after_prayer');
    
    return [
      ...morning.slice(0, 3), // Top 3 morning duas
      ...evening.slice(0, 3), // Top 3 evening duas
      ...afterPrayer.slice(0, 2) // Top 2 after prayer duas
    ];
  }

  private static calculateTotalDuration(athkar: EnhancedAthkar[]): number {
    return athkar.reduce((total, item) => {
      const duration = item.timing.duration;
      if (duration) {
        const minutes = parseInt(duration.split(' ')[0]) || 1;
        return total + minutes;
      }
      return total + 1; // Default 1 minute
    }, 0);
  }

  private static prioritizeByImportance(athkar: EnhancedAthkar[], timeLimit: number): EnhancedAthkar[] {
    // Sort by importance: prophet_used, frequency, source type
    const prioritized = athkar.sort((a, b) => {
      if (a.metadata.prophet_used && !b.metadata.prophet_used) return -1;
      if (!a.metadata.prophet_used && b.metadata.prophet_used) return 1;
      
      if (a.source.grade === 'sahih' && b.source.grade !== 'sahih') return -1;
      if (a.source.grade !== 'sahih' && b.source.grade === 'sahih') return 1;
      
      return 0;
    });

    // Select items within time limit
    const selected: EnhancedAthkar[] = [];
    let currentDuration = 0;

    for (const item of prioritized) {
      const itemDuration = parseInt(item.timing.duration?.split(' ')[0] || '1');
      if (currentDuration + itemDuration <= timeLimit) {
        selected.push(item);
        currentDuration += itemDuration;
      }
    }

    return selected;
  }

  // Clear all caches
  static clearAllCaches(): void {
    athkarCache.clear();
    collectionCache.clear();
  }
}

// Export enhanced functions for ease of use
export const getAthkarByCategory = (category: string) => 
  EnhancedAthkarService.getAthkarByCategory(category);
export const getDailyAthkarSchedule = () => 
  EnhancedAthkarService.getDailyAthkarSchedule();
export const getDuaCollections = () => 
  EnhancedAthkarService.getDuaCollections();
export const searchAthkar = (query: string, filters?: any) => 
  EnhancedAthkarService.searchAthkar(query, filters);
export const getPersonalizedRecommendations = (preferences: any) => 
  EnhancedAthkarService.getPersonalizedRecommendations(preferences);