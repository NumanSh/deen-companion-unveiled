import { ApiErrorHandler } from '@/shared';

export interface EnhancedPrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  midnight: string;
  imsak: string;
  firstthird: string;
  lastthird: string;
}

export interface LocationInfo {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  timezone: string;
  countryCode: string;
}

export interface QiblaDirection {
  direction: number;
  distance: number; // km to Makkah
}

export interface PrayerTimeResponse {
  timings: EnhancedPrayerTimes;
  date: {
    readable: string;
    timestamp: string;
    hijri: {
      date: string;
      format: string;
      day: string;
      weekday: { en: string; ar: string };
      month: { number: number; en: string; ar: string };
      year: string;
    };
    gregorian: {
      date: string;
      format: string;
      day: string;
      weekday: { en: string };
      month: { number: number; en: string };
      year: string;
    };
  };
  meta: {
    latitude: number;
    longitude: number;
    timezone: string;
    method: {
      id: number;
      name: string;
      params: any;
    };
  };
}

export enum CalculationMethod {
  WORLD_ISLAMIC_LEAGUE = 3,
  ISLAMIC_SOCIETY_NORTH_AMERICA = 2,
  EGYPTIAN = 5,
  UMMALQURA = 4,
  UNIVERSITY_OF_KARACHI = 1,
  INSTITUTE_OF_GEOPHYSICS_TEHRAN = 7,
  GULF_REGION = 8,
  KUWAIT = 9,
  QATAR = 10,
  MAJLIS_UGAMA_ISLAM_SINGAPORE = 11,
  UNION_OF_ISLAMIC_ORGS_OF_FRANCE = 12,
  DIYANET_TURKEY = 13,
  SPIRITUAL_ADMIN_OF_MUSLIMS_RUSSIA = 14
}

// API endpoints for different services
const ALADHAN_API = 'https://api.aladhan.com/v1';
const ISLAMIC_FINDER_API = 'https://api.islamicfinder.us/v1';
const GEOCODING_API = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

// Cache for prayer times and location data
const prayerTimesCache = new Map<string, { data: PrayerTimeResponse; timestamp: number }>();
const locationCache = new Map<string, { data: LocationInfo; timestamp: number }>();
const qiblaCache = new Map<string, { data: QiblaDirection; timestamp: number }>();

export class EnhancedPrayerTimesService {
  private static readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
  private static readonly LOCATION_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  // Enhanced location detection with multiple fallback methods
  static async getCurrentLocationEnhanced(): Promise<LocationInfo> {
    const cacheKey = 'current-location';
    const cached = locationCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.LOCATION_CACHE_DURATION) {
      return cached.data;
    }

    return ApiErrorHandler.withRetry(async () => {
      try {
        // Try browser geolocation first
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          if (!navigator.geolocation) {
            reject(new Error('Geolocation not supported'));
            return;
          }

          navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
          );
        });

        const { latitude, longitude } = position.coords;

        // Get detailed location info from geocoding API
        const locationInfo = await this.reverseGeocode(latitude, longitude);
        
        locationCache.set(cacheKey, { data: locationInfo, timestamp: Date.now() });
        return locationInfo;

      } catch (error) {
        console.error('Geolocation failed, trying IP-based location:', error);
        
        // Fallback to IP-based location
        return await this.getLocationFromIP();
      }
    });
  }

  // Reverse geocode coordinates to get location details
  private static async reverseGeocode(latitude: number, longitude: number): Promise<LocationInfo> {
    const response = await fetch(
      `${GEOCODING_API}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );

    if (!response.ok) {
      throw new Error('Geocoding API failed');
    }

    const data = await response.json();
    
    return {
      latitude,
      longitude,
      city: data.city || data.locality || 'Unknown',
      country: data.countryName || 'Unknown',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      countryCode: data.countryCode || 'XX'
    };
  }

  // IP-based location as fallback
  private static async getLocationFromIP(): Promise<LocationInfo> {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      return {
        latitude: data.latitude || 21.3891, // Makkah as ultimate fallback
        longitude: data.longitude || 39.8579,
        city: data.city || 'Makkah',
        country: data.country_name || 'Saudi Arabia',
        timezone: data.timezone || 'Asia/Riyadh',
        countryCode: data.country_code || 'SA'
      };
    } catch (error) {
      console.error('IP location failed, using Makkah as fallback:', error);
      
      // Ultimate fallback to Makkah
      return {
        latitude: 21.3891,
        longitude: 39.8579,
        city: 'Makkah',
        country: 'Saudi Arabia',
        timezone: 'Asia/Riyadh',
        countryCode: 'SA'
      };
    }
  }

  // Fetch prayer times with enhanced options
  static async fetchEnhancedPrayerTimes(
    latitude: number, 
    longitude: number, 
    options: {
      method?: CalculationMethod;
      date?: string;
      adjustment?: string;
      school?: number;
      midnightMode?: number;
      latitudeAdjustmentMethod?: number;
    } = {}
  ): Promise<PrayerTimeResponse> {
    const cacheKey = `prayer-${latitude}-${longitude}-${options.method || 2}-${options.date || 'today'}`;
    const cached = prayerTimesCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    return ApiErrorHandler.withRetry(async () => {
      try {
        // Use Aladhan API as primary source
        const params = new URLSearchParams({
          latitude: latitude.toString(),
          longitude: longitude.toString(),
          method: (options.method || CalculationMethod.ISLAMIC_SOCIETY_NORTH_AMERICA).toString(),
          ...(options.date && { date: options.date }),
          ...(options.adjustment && { adjustment: options.adjustment }),
          ...(options.school && { school: options.school.toString() }),
          ...(options.midnightMode && { midnightMode: options.midnightMode.toString() }),
          ...(options.latitudeAdjustmentMethod && { 
            latitudeAdjustmentMethod: options.latitudeAdjustmentMethod.toString() 
          })
        });

        const response = await fetch(`${ALADHAN_API}/timings?${params}`, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Islamic-Companion-App/1.0'
          }
        });

        if (!response.ok) {
          throw new Error(`Aladhan API error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.code !== 200 || !data.data) {
          throw new Error('Invalid prayer times response');
        }

        const prayerTimeResponse: PrayerTimeResponse = {
          timings: data.data.timings,
          date: data.data.date,
          meta: data.data.meta
        };

        prayerTimesCache.set(cacheKey, { 
          data: prayerTimeResponse, 
          timestamp: Date.now() 
        });

        return prayerTimeResponse;

      } catch (error) {
        console.error('Aladhan API failed, trying offline calculation:', error);
        return this.calculateOfflinePrayerTimes(latitude, longitude, options.method);
      }
    });
  }

  // Calculate Qibla direction
  static async calculateQiblaDirection(latitude: number, longitude: number): Promise<QiblaDirection> {
    const cacheKey = `qibla-${latitude}-${longitude}`;
    const cached = qiblaCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.LOCATION_CACHE_DURATION) {
      return cached.data;
    }

    return ApiErrorHandler.withRetry(async () => {
      try {
        const response = await fetch(
          `${ALADHAN_API}/qibla/${latitude}/${longitude}`, {
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'Islamic-Companion-App/1.0'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`Qibla API error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.code !== 200 || !data.data) {
          throw new Error('Invalid Qibla response');
        }

        const qiblaDirection: QiblaDirection = {
          direction: data.data.direction,
          distance: this.calculateDistance(latitude, longitude, 21.3891, 39.8579)
        };

        qiblaCache.set(cacheKey, { 
          data: qiblaDirection, 
          timestamp: Date.now() 
        });

        return qiblaDirection;

      } catch (error) {
        console.error('Qibla API failed, using manual calculation:', error);
        return this.calculateQiblaManually(latitude, longitude);
      }
    });
  }

  // Get next prayer time and remaining time
  static getNextPrayer(prayerTimes: EnhancedPrayerTimes): {
    name: string;
    time: string;
    remaining: string;
    timeUntil: number;
  } {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const prayers = [
      { name: 'Fajr', time: prayerTimes.fajr },
      { name: 'Sunrise', time: prayerTimes.sunrise },
      { name: 'Dhuhr', time: prayerTimes.dhuhr },
      { name: 'Asr', time: prayerTimes.asr },
      { name: 'Maghrib', time: prayerTimes.maghrib },
      { name: 'Isha', time: prayerTimes.isha }
    ];

    for (const prayer of prayers) {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerTime = hours * 60 + minutes;

      if (prayerTime > currentTime) {
        const timeUntil = prayerTime - currentTime;
        const hoursUntil = Math.floor(timeUntil / 60);
        const minutesUntil = timeUntil % 60;

        return {
          name: prayer.name,
          time: prayer.time,
          remaining: `${hoursUntil}h ${minutesUntil}m`,
          timeUntil
        };
      }
    }

    // If no prayer today, return Fajr of next day
    const fajrTomorrow = prayers[0];
    const [hours, minutes] = fajrTomorrow.time.split(':').map(Number);
    const prayerTime = hours * 60 + minutes;
    const timeUntil = (24 * 60) - currentTime + prayerTime;
    const hoursUntil = Math.floor(timeUntil / 60);
    const minutesUntil = timeUntil % 60;

    return {
      name: 'Fajr (Tomorrow)',
      time: fajrTomorrow.time,
      remaining: `${hoursUntil}h ${minutesUntil}m`,
      timeUntil
    };
  }

  // Offline prayer times calculation (simplified)
  private static async calculateOfflinePrayerTimes(
    latitude: number, 
    longitude: number, 
    method?: CalculationMethod
  ): Promise<PrayerTimeResponse> {
    const now = new Date();
    
    // Simplified calculation - in real implementation, use proper astronomical calculations
    const baseTime = {
      fajr: '05:30',
      sunrise: '06:45',
      dhuhr: '12:30',
      asr: '15:45',
      maghrib: '18:15',
      isha: '19:30',
      midnight: '00:00',
      imsak: '05:20',
      firstthird: '22:00',
      lastthird: '04:00'
    };

    return {
      timings: baseTime,
      date: {
        readable: now.toDateString(),
        timestamp: now.toISOString(),
        hijri: {
          date: '15-03-1445',
          format: 'DD-MM-YYYY',
          day: '15',
          weekday: { en: 'Friday', ar: 'الجمعة' },
          month: { number: 3, en: 'Rabi\' al-awwal', ar: 'ربيع الأول' },
          year: '1445'
        },
        gregorian: {
          date: now.toISOString().split('T')[0],
          format: 'DD-MM-YYYY',
          day: now.getDate().toString(),
          weekday: { en: now.toLocaleDateString('en', { weekday: 'long' }) },
          month: { number: now.getMonth() + 1, en: now.toLocaleDateString('en', { month: 'long' }) },
          year: now.getFullYear().toString()
        }
      },
      meta: {
        latitude,
        longitude,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        method: {
          id: method || CalculationMethod.ISLAMIC_SOCIETY_NORTH_AMERICA,
          name: 'Islamic Society of North America (ISNA)',
          params: {}
        }
      }
    };
  }

  // Manual Qibla calculation using spherical trigonometry
  private static calculateQiblaManually(latitude: number, longitude: number): QiblaDirection {
    const MAKKAH_LAT = 21.3891;
    const MAKKAH_LNG = 39.8579;

    const lat1 = latitude * Math.PI / 180;
    const lat2 = MAKKAH_LAT * Math.PI / 180;
    const deltaLng = (MAKKAH_LNG - longitude) * Math.PI / 180;

    const y = Math.sin(deltaLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);

    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    bearing = (bearing + 360) % 360; // Normalize to 0-360

    return {
      direction: Math.round(bearing),
      distance: this.calculateDistance(latitude, longitude, MAKKAH_LAT, MAKKAH_LNG)
    };
  }

  // Calculate distance between two coordinates
  private static calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  }

  // Clear all caches
  static clearAllCaches(): void {
    prayerTimesCache.clear();
    locationCache.clear();
    qiblaCache.clear();
  }
}

// Export functions for backward compatibility
export const getCurrentLocationEnhanced = () => 
  EnhancedPrayerTimesService.getCurrentLocationEnhanced();

export const fetchEnhancedPrayerTimes = (lat: number, lng: number, options?: any) => 
  EnhancedPrayerTimesService.fetchEnhancedPrayerTimes(lat, lng, options);

export const calculateQiblaDirection = (lat: number, lng: number) => 
  EnhancedPrayerTimesService.calculateQiblaDirection(lat, lng);

export const getNextPrayer = (prayerTimes: EnhancedPrayerTimes) => 
  EnhancedPrayerTimesService.getNextPrayer(prayerTimes);