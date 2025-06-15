
import { prayerTimesCacheService } from './prayerTimesCacheService';

interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface PrayerTimesResponse {
  data: {
    timings: PrayerTimes;
    date: {
      readable: string;
      hijri: {
        date: string;
        month: {
          en: string;
          ar: string;
        };
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
      };
    };
  };
  code: number;
  status: string;
}

interface QiblaResponse {
  data: {
    latitude: number;
    longitude: number;
    direction: number;
  };
  code: number;
  status: string;
}

class PrayerTimesApiService {
  private baseUrl = 'https://api.aladhan.com/v1';

  async getPrayerTimes(latitude: number, longitude: number, method: number = 2, date?: string): Promise<PrayerTimesResponse> {
    try {
      // Try to get from cache first
      const cachedData = prayerTimesCacheService.getCachedPrayerTimes(latitude, longitude, date);
      if (cachedData) {
        return cachedData;
      }

      // If not in cache, fetch from API
      const dateParam = date || new Date().toISOString().split('T')[0];
      const response = await fetch(
        `${this.baseUrl}/timings/${dateParam}?latitude=${latitude}&longitude=${longitude}&method=${method}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Cache the result
      prayerTimesCacheService.cachePrayerTimes(latitude, longitude, data, date);
      
      return data;
    } catch (error) {
      console.error('Error fetching prayer times:', error);
      
      // Try to return cached data even if expired as fallback
      const cachedData = prayerTimesCacheService.getCachedPrayerTimes(latitude, longitude, date);
      if (cachedData) {
        console.log('Using expired cache as fallback');
        return cachedData;
      }
      
      throw error;
    }
  }

  async getQiblaDirection(latitude: number, longitude: number): Promise<QiblaResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/qibla/${latitude}/${longitude}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Qibla direction:', error);
      throw error;
    }
  }

  async getPrayerTimesByCity(city: string, country: string, method: number = 2): Promise<PrayerTimesResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching prayer times by city:', error);
      throw error;
    }
  }

  getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async initializePrayerTimesCache(): Promise<void> {
    try {
      const coords = await this.getCurrentLocation();
      console.log('Initializing prayer times cache...');
      
      // Clear expired cache first
      prayerTimesCacheService.clearExpiredCache();
      
      // Preload prayer times for the next 30 days
      await prayerTimesCacheService.preloadPrayerTimes(coords.latitude, coords.longitude);
      
      const stats = prayerTimesCacheService.getCacheStats();
      console.log('Cache initialized:', stats);
    } catch (error) {
      console.error('Failed to initialize prayer times cache:', error);
    }
  }

  getCacheStats() {
    return prayerTimesCacheService.getCacheStats();
  }

  clearExpiredCache() {
    prayerTimesCacheService.clearExpiredCache();
  }
}

export const prayerTimesApi = new PrayerTimesApiService();
export type { PrayerTimes, PrayerTimesResponse, QiblaResponse };
