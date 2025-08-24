import { ApiErrorHandler } from '@/shared';

export interface HijriDate {
  day: number;
  month: number;
  year: number;
  weekday: {
    en: string;
    ar: string;
  };
  month_name: {
    en: string;
    ar: string;
  };
  formatted: string;
  gregorian_equivalent: string;
}

export interface IslamicEvent {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  date: HijriDate;
  type: 'religious' | 'historical' | 'astronomical' | 'cultural';
  description: {
    en: string;
    ar: string;
  };
  significance: string[];
  recommended_actions: string[];
  gregorian_dates: string[]; // Multiple possible dates due to moon sighting
}

export interface MoonPhase {
  phase: 'new' | 'waxing_crescent' | 'first_quarter' | 'waxing_gibbous' | 'full' | 'waning_gibbous' | 'last_quarter' | 'waning_crescent';
  illumination: number; // percentage
  age: number; // days since new moon
  distance: number; // km from Earth
  angular_diameter: number; // degrees
  next_new_moon: string; // ISO date
  next_full_moon: string; // ISO date
}

export interface IslamicMonth {
  number: number;
  name: {
    en: string;
    ar: string;
    transliteration: string;
  };
  days: number; // 29 or 30, varies by month and year
  significance: string;
  recommended_practices: string[];
}

// API endpoints for Islamic calendar data
const ISLAMIC_FINDER_CALENDAR = 'https://api.islamicfinder.us/v1';
const HIJRI_DATE_API = 'https://api.aladhan.com/v1';
const MOON_API = 'https://api.farmsense.net/v1/moonphases';

// Cache for calendar data
const hijriCache = new Map<string, { data: HijriDate; timestamp: number }>();
const eventsCache = new Map<string, { data: IslamicEvent[]; timestamp: number }>();
const moonCache = new Map<string, { data: MoonPhase; timestamp: number }>();

export class IslamicCalendarService {
  private static readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
  private static readonly MOON_CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

  // Hijri month names and data
  private static readonly HIJRI_MONTHS: IslamicMonth[] = [
    {
      number: 1,
      name: { en: 'Muharram', ar: 'محرم', transliteration: 'Muharram' },
      days: 30,
      significance: 'Sacred month, beginning of Islamic year',
      recommended_practices: ['Fasting on 9th and 10th (Ashura)', 'Extra prayers', 'Charity']
    },
    {
      number: 2,
      name: { en: 'Safar', ar: 'صفر', transliteration: 'Safar' },
      days: 29,
      significance: 'Month of journeys and migrations',
      recommended_practices: ['Continue good deeds from Muharram', 'Seek forgiveness']
    },
    {
      number: 3,
      name: { en: "Rabi' al-Awwal", ar: 'ربيع الأول', transliteration: 'Rabi\' al-Awwal' },
      days: 30,
      significance: 'Birth month of Prophet Muhammad (PBUH)',
      recommended_practices: ['Send blessings on Prophet', 'Study Seerah', 'Acts of kindness']
    },
    {
      number: 4,
      name: { en: "Rabi' al-Thani", ar: 'ربيع الثاني', transliteration: 'Rabi\' al-Thani' },
      days: 29,
      significance: 'Spring month, time of growth',
      recommended_practices: ['Spiritual development', 'Learning Islamic knowledge']
    },
    {
      number: 5,
      name: { en: 'Jumada al-Awwal', ar: 'جمادى الأولى', transliteration: 'Jumada al-Awwal' },
      days: 30,
      significance: 'Dry month, time for reflection',
      recommended_practices: ['Increased worship', 'Quran recitation']
    },
    {
      number: 6,
      name: { en: 'Jumada al-Thani', ar: 'جمادى الثانية', transliteration: 'Jumada al-Thani' },
      days: 29,
      significance: 'Second dry month',
      recommended_practices: ['Preparation for holy months', 'Self-improvement']
    },
    {
      number: 7,
      name: { en: 'Rajab', ar: 'رجب', transliteration: 'Rajab' },
      days: 30,
      significance: 'Sacred month, month of Isra and Mi\'raj',
      recommended_practices: ['Night prayers', 'Remembrance of Isra Mi\'raj', 'Preparation for Ramadan']
    },
    {
      number: 8,
      name: { en: "Sha'ban", ar: 'شعبان', transliteration: 'Sha\'ban' },
      days: 29,
      significance: 'Month of preparation for Ramadan',
      recommended_practices: ['Extra fasting', 'Night of Forgiveness (15th)', 'Quran study']
    },
    {
      number: 9,
      name: { en: 'Ramadan', ar: 'رمضان', transliteration: 'Ramadan' },
      days: 30,
      significance: 'Holy month of fasting',
      recommended_practices: ['Daily fasting', 'Tarawih prayers', 'Increased charity', 'Laylat al-Qadr']
    },
    {
      number: 10,
      name: { en: 'Shawwal', ar: 'شوال', transliteration: 'Shawwal' },
      days: 29,
      significance: 'Month of Eid al-Fitr',
      recommended_practices: ['Eid celebration', 'Six days of fasting', 'Visiting relatives']
    },
    {
      number: 11,
      name: { en: 'Dhu al-Qi\'dah', ar: 'ذو القعدة', transliteration: 'Dhu al-Qi\'dah' },
      days: 30,
      significance: 'Sacred month, pilgrimage preparation',
      recommended_practices: ['Hajj preparation', 'Extra worship', 'Avoiding conflicts']
    },
    {
      number: 12,
      name: { en: 'Dhu al-Hijjah', ar: 'ذو الحجة', transliteration: 'Dhu al-Hijjah' },
      days: 29,
      significance: 'Sacred month of Hajj and Eid al-Adha',
      recommended_practices: ['Hajj pilgrimage', '10 days of Dhul Hijjah', 'Eid al-Adha', 'Qurbani']
    }
  ];

  // Get current Hijri date with full details
  static async getCurrentHijriDate(): Promise<HijriDate> {
    const cacheKey = 'current-hijri-date';
    const cached = hijriCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    return ApiErrorHandler.withRetry(async () => {
      try {
        const response = await fetch(`${HIJRI_DATE_API}/gToH`, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Islamic-Companion-App/1.0'
          }
        });

        if (!response.ok) {
          throw new Error(`Hijri API error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.code !== 200 || !data.data) {
          throw new Error('Invalid Hijri date response');
        }

        const hijri = data.data.hijri;
        const gregorian = data.data.gregorian;

        const hijriDate: HijriDate = {
          day: parseInt(hijri.day),
          month: parseInt(hijri.month.number),
          year: parseInt(hijri.year),
          weekday: {
            en: hijri.weekday.en,
            ar: hijri.weekday.ar || hijri.weekday.en
          },
          month_name: {
            en: hijri.month.en,
            ar: hijri.month.ar || hijri.month.en
          },
          formatted: `${hijri.day} ${hijri.month.en} ${hijri.year} AH`,
          gregorian_equivalent: `${gregorian.day} ${gregorian.month.en} ${gregorian.year} CE`
        };

        hijriCache.set(cacheKey, { data: hijriDate, timestamp: Date.now() });
        return hijriDate;

      } catch (error) {
        console.error('Hijri API failed, calculating manually:', error);
        return this.calculateHijriDateManually();
      }
    });
  }

  // Get Islamic events for a specific month/year
  static async getIslamicEvents(hijriMonth?: number, hijriYear?: number): Promise<IslamicEvent[]> {
    const currentDate = await this.getCurrentHijriDate();
    const month = hijriMonth || currentDate.month;
    const year = hijriYear || currentDate.year;
    
    const cacheKey = `events-${month}-${year}`;
    const cached = eventsCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    // Generate events based on known Islamic calendar events
    const events: IslamicEvent[] = this.generateIslamicEvents(month, year);
    
    eventsCache.set(cacheKey, { data: events, timestamp: Date.now() });
    return events;
  }

  // Get current moon phase for Islamic month determination
  static async getCurrentMoonPhase(): Promise<MoonPhase> {
    const cacheKey = 'current-moon-phase';
    const cached = moonCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.MOON_CACHE_DURATION) {
      return cached.data;
    }

    return ApiErrorHandler.withRetry(async () => {
      try {
        const now = new Date();
        const timestamp = Math.floor(now.getTime() / 1000);
        
        const response = await fetch(`${MOON_API}/?d=${timestamp}`, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Islamic-Companion-App/1.0'
          }
        });

        if (!response.ok) {
          throw new Error(`Moon API error: ${response.status}`);
        }

        const data = await response.json();
        
        const moonPhase: MoonPhase = {
          phase: this.determineMoonPhase(data.Phase),
          illumination: Math.round(data.Illumination * 100),
          age: Math.round(data.Age),
          distance: Math.round(data.Distance * 1000), // Convert to km
          angular_diameter: data.AngularDiameter,
          next_new_moon: new Date(data.NewMoon * 1000).toISOString(),
          next_full_moon: new Date(data.FullMoon * 1000).toISOString()
        };

        moonCache.set(cacheKey, { data: moonPhase, timestamp: Date.now() });
        return moonPhase;

      } catch (error) {
        console.error('Moon API failed, using approximate calculation:', error);
        return this.calculateMoonPhaseManually();
      }
    });
  }

  // Convert Gregorian date to Hijri
  static async gregorianToHijri(gregorianDate: Date): Promise<HijriDate> {
    const dateStr = gregorianDate.toISOString().split('T')[0];
    const cacheKey = `g-to-h-${dateStr}`;
    const cached = hijriCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    return ApiErrorHandler.withRetry(async () => {
      const response = await fetch(
        `${HIJRI_DATE_API}/gToH/${dateStr}`, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Islamic-Companion-App/1.0'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Hijri conversion API error: ${response.status}`);
      }

      const data = await response.json();
      const hijri = data.data.hijri;

      const hijriDate: HijriDate = {
        day: parseInt(hijri.day),
        month: parseInt(hijri.month.number),
        year: parseInt(hijri.year),
        weekday: {
          en: hijri.weekday.en,
          ar: hijri.weekday.ar || hijri.weekday.en
        },
        month_name: {
          en: hijri.month.en,
          ar: hijri.month.ar || hijri.month.en
        },
        formatted: `${hijri.day} ${hijri.month.en} ${hijri.year} AH`,
        gregorian_equivalent: dateStr
      };

      hijriCache.set(cacheKey, { data: hijriDate, timestamp: Date.now() });
      return hijriDate;
    });
  }

  // Get Islamic month information
  static getIslamicMonthInfo(monthNumber: number): IslamicMonth | null {
    return this.HIJRI_MONTHS.find(month => month.number === monthNumber) || null;
  }

  // Calculate Hijri date manually (approximation)
  private static calculateHijriDateManually(): HijriDate {
    const now = new Date();
    const HIJRI_EPOCH = new Date('622-07-16'); // Approximate start of Hijri calendar
    const daysSinceEpoch = Math.floor((now.getTime() - HIJRI_EPOCH.getTime()) / (1000 * 60 * 60 * 24));
    
    // Average Hijri year is approximately 354.37 days
    const hijriYear = Math.floor(daysSinceEpoch / 354.37) + 1;
    const dayOfYear = daysSinceEpoch % 354;
    
    // Simple month calculation (approximation)
    let month = 1;
    let remainingDays = dayOfYear;
    
    for (const monthInfo of this.HIJRI_MONTHS) {
      if (remainingDays <= monthInfo.days) {
        break;
      }
      remainingDays -= monthInfo.days;
      month++;
    }
    
    const day = Math.max(1, remainingDays);
    const monthInfo = this.getIslamicMonthInfo(month);
    
    return {
      day,
      month,
      year: Math.floor(hijriYear),
      weekday: {
        en: now.toLocaleDateString('en', { weekday: 'long' }),
        ar: this.getArabicWeekday(now.getDay())
      },
      month_name: {
        en: monthInfo?.name.en || 'Unknown',
        ar: monthInfo?.name.ar || 'غير معروف'
      },
      formatted: `${day} ${monthInfo?.name.en || 'Unknown'} ${Math.floor(hijriYear)} AH`,
      gregorian_equivalent: now.toDateString()
    };
  }

  // Generate Islamic events for a given month
  private static generateIslamicEvents(month: number, year: number): IslamicEvent[] {
    const events: IslamicEvent[] = [];

    // Major Islamic events by month
    const eventsByMonth: { [key: number]: Omit<IslamicEvent, 'id' | 'date'>[] } = {
      1: [ // Muharram
        {
          name: { en: 'Islamic New Year', ar: 'رأس السنة الهجرية' },
          type: 'religious',
          description: {
            en: 'Beginning of the Islamic calendar year',
            ar: 'بداية السنة الهجرية الجديدة'
          },
          significance: ['New beginnings', 'Reflection', 'Spiritual renewal'],
          recommended_actions: ['Make Islamic resolutions', 'Increased worship', 'Charity'],
          gregorian_dates: [this.approximateGregorianDate(1, 1, year)]
        },
        {
          name: { en: 'Day of Ashura', ar: 'يوم عاشوراء' },
          type: 'religious',
          description: {
            en: 'Day of fasting and remembrance',
            ar: 'يوم الصوم والذكرى'
          },
          significance: ['Fasting', 'Historical significance', 'Spiritual purification'],
          recommended_actions: ['Fast on 9th and 10th', 'Charity', 'Prayer'],
          gregorian_dates: [this.approximateGregorianDate(10, 1, year)]
        }
      ],
      3: [ // Rabi' al-Awwal
        {
          name: { en: 'Mawlid an-Nabi', ar: 'المولد النبوي' },
          type: 'religious',
          description: {
            en: 'Birth of Prophet Muhammad (PBUH)',
            ar: 'مولد النبي محمد صلى الله عليه وسلم'
          },
          significance: ['Prophet\'s birth', 'Love for Prophet', 'Islamic teachings'],
          recommended_actions: ['Send blessings on Prophet', 'Study Seerah', 'Acts of kindness'],
          gregorian_dates: [this.approximateGregorianDate(12, 3, year)]
        }
      ],
      7: [ // Rajab
        {
          name: { en: 'Isra and Mi\'raj', ar: 'الإسراء والمعراج' },
          type: 'religious',
          description: {
            en: 'Night Journey and Ascension of Prophet Muhammad',
            ar: 'رحلة الإسراء والمعراج للنبي محمد'
          },
          significance: ['Spiritual journey', 'Prayer importance', 'Divine connection'],
          recommended_actions: ['Night prayers', 'Reflection', 'Quran recitation'],
          gregorian_dates: [this.approximateGregorianDate(27, 7, year)]
        }
      ],
      9: [ // Ramadan
        {
          name: { en: 'Laylat al-Qadr', ar: 'ليلة القدر' },
          type: 'religious',
          description: {
            en: 'Night of Power and Decree',
            ar: 'ليلة القدر والقضاء'
          },
          significance: ['Most blessed night', 'Quran revelation', 'Spiritual power'],
          recommended_actions: ['Night prayers', 'Quran recitation', 'Seeking forgiveness'],
          gregorian_dates: [this.approximateGregorianDate(27, 9, year)]
        }
      ],
      10: [ // Shawwal
        {
          name: { en: 'Eid al-Fitr', ar: 'عيد الفطر' },
          type: 'religious',
          description: {
            en: 'Festival of Breaking the Fast',
            ar: 'عيد الفطر المبارك'
          },
          significance: ['End of Ramadan', 'Celebration', 'Community bonding'],
          recommended_actions: ['Eid prayer', 'Charity', 'Visiting family'],
          gregorian_dates: [this.approximateGregorianDate(1, 10, year)]
        }
      ],
      12: [ // Dhu al-Hijjah
        {
          name: { en: 'Day of Arafah', ar: 'يوم عرفة' },
          type: 'religious',
          description: {
            en: 'Most important day of Hajj pilgrimage',
            ar: 'أهم أيام الحج'
          },
          significance: ['Hajj pilgrimage', 'Forgiveness', 'Unity'],
          recommended_actions: ['Fasting (for non-pilgrims)', 'Prayer', 'Remembrance'],
          gregorian_dates: [this.approximateGregorianDate(9, 12, year)]
        },
        {
          name: { en: 'Eid al-Adha', ar: 'عيد الأضحى' },
          type: 'religious',
          description: {
            en: 'Festival of Sacrifice',
            ar: 'عيد الأضحى المبارك'
          },
          significance: ['Sacrifice', 'Abraham\'s submission', 'Charity'],
          recommended_actions: ['Eid prayer', 'Qurbani', 'Sharing with poor'],
          gregorian_dates: [this.approximateGregorianDate(10, 12, year)]
        }
      ]
    };

    const monthEvents = eventsByMonth[month] || [];
    
    return monthEvents.map((event, index) => ({
      ...event,
      id: `${month}-${year}-${index + 1}`,
      date: {
        day: month === 1 && index === 0 ? 1 : (month === 1 && index === 1 ? 10 : 12),
        month,
        year,
        weekday: { en: 'Unknown', ar: 'غير معروف' },
        month_name: {
          en: this.HIJRI_MONTHS[month - 1]?.name.en || 'Unknown',
          ar: this.HIJRI_MONTHS[month - 1]?.name.ar || 'غير معروف'
        },
        formatted: `${month === 1 && index === 0 ? 1 : (month === 1 && index === 1 ? 10 : 12)} ${this.HIJRI_MONTHS[month - 1]?.name.en} ${year} AH`,
        gregorian_equivalent: event.gregorian_dates[0]
      }
    }));
  }

  // Helper methods
  private static determineMoonPhase(phase: number): MoonPhase['phase'] {
    if (phase < 0.0625) return 'new';
    if (phase < 0.1875) return 'waxing_crescent';
    if (phase < 0.3125) return 'first_quarter';
    if (phase < 0.4375) return 'waxing_gibbous';
    if (phase < 0.5625) return 'full';
    if (phase < 0.6875) return 'waning_gibbous';
    if (phase < 0.8125) return 'last_quarter';
    return 'waning_crescent';
  }

  private static calculateMoonPhaseManually(): MoonPhase {
    const now = new Date();
    const age = (now.getTime() / 1000 - new Date('2000-01-06').getTime() / 1000) / (29.53 * 24 * 3600) % 1;
    
    return {
      phase: 'waxing_crescent',
      illumination: Math.round(Math.abs(Math.cos(age * 2 * Math.PI)) * 100),
      age: Math.round(age * 29.53),
      distance: 384400,
      angular_diameter: 0.52,
      next_new_moon: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      next_full_moon: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };
  }

  private static getArabicWeekday(dayOfWeek: number): string {
    const arabicDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    return arabicDays[dayOfWeek] || 'غير معروف';
  }

  private static approximateGregorianDate(day: number, month: number, hijriYear: number): string {
    // Very approximate conversion for demonstration
    const gregorianYear = Math.floor(hijriYear - 579);
    const approximateMonth = Math.max(1, Math.min(12, month - 1));
    return `${gregorianYear}-${approximateMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  // Clear all caches
  static clearAllCaches(): void {
    hijriCache.clear();
    eventsCache.clear();
    moonCache.clear();
  }
}

// Export functions for ease of use
export const getCurrentHijriDate = () => IslamicCalendarService.getCurrentHijriDate();
export const getIslamicEvents = (month?: number, year?: number) => 
  IslamicCalendarService.getIslamicEvents(month, year);
export const getCurrentMoonPhase = () => IslamicCalendarService.getCurrentMoonPhase();
export const gregorianToHijri = (date: Date) => IslamicCalendarService.gregorianToHijri(date);
export const getIslamicMonthInfo = (monthNumber: number) => 
  IslamicCalendarService.getIslamicMonthInfo(monthNumber);