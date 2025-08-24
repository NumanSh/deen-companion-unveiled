
interface CachedPrayerData {
  data: any;
  timestamp: number;
  location: {
    latitude: number;
    longitude: number;
  };
}

interface CacheKey {
  latitude: number;
  longitude: number;
  date: string;
}

class PrayerTimesCacheService {
  private readonly CACHE_KEY_PREFIX = 'prayer_times_cache_';
  private readonly CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
  private readonly LOCATION_TOLERANCE = 0.01; // ~1km tolerance for location matching

  private generateCacheKey(latitude: number, longitude: number, date?: string): string {
    const dateStr = date || new Date().toISOString().split('T')[0];
    return `${this.CACHE_KEY_PREFIX}${latitude.toFixed(4)}_${longitude.toFixed(4)}_${dateStr}`;
  }

  private isLocationMatch(cached: CachedPrayerData, latitude: number, longitude: number): boolean {
    const latDiff = Math.abs(cached.location.latitude - latitude);
    const lonDiff = Math.abs(cached.location.longitude - longitude);
    return latDiff <= this.LOCATION_TOLERANCE && lonDiff <= this.LOCATION_TOLERANCE;
  }

  private isCacheValid(cachedData: CachedPrayerData): boolean {
    const now = Date.now();
    return (now - cachedData.timestamp) < this.CACHE_DURATION;
  }

  getCachedPrayerTimes(latitude: number, longitude: number, date?: string): any | null {
    try {
      const cacheKey = this.generateCacheKey(latitude, longitude, date);
      const cachedString = localStorage.getItem(cacheKey);
      
      if (!cachedString) {
        return null;
      }

      const cachedData: CachedPrayerData = JSON.parse(cachedString);
      
      // Check if cache is valid and location matches
      if (this.isCacheValid(cachedData) && this.isLocationMatch(cachedData, latitude, longitude)) {
        console.log('Using cached prayer times for', { latitude, longitude, date });
        return cachedData.data;
      }

      // Remove expired cache
      localStorage.removeItem(cacheKey);
      return null;
    } catch (error) {
      console.error('Error reading prayer times cache:', error);
      return null;
    }
  }

  cachePrayerTimes(latitude: number, longitude: number, data: any, date?: string): void {
    try {
      const cacheKey = this.generateCacheKey(latitude, longitude, date);
      const cacheData: CachedPrayerData = {
        data,
        timestamp: Date.now(),
        location: { latitude, longitude }
      };

      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
      console.log('Cached prayer times for', { latitude, longitude, date });
    } catch (error) {
      console.error('Error caching prayer times:', error);
    }
  }

  preloadPrayerTimes(latitude: number, longitude: number): Promise<void> {
    return new Promise(async (resolve) => {
      try {
        // Preload next 30 days
        for (let i = 0; i < 30; i++) {
          const date = new Date();
          date.setDate(date.getDate() + i);
          const dateString = date.toISOString().split('T')[0];
          
          // Check if already cached
          if (!this.getCachedPrayerTimes(latitude, longitude, dateString)) {
            try {
              const response = await fetch(
                `https://api.aladhan.com/v1/timings/${dateString}?latitude=${latitude}&longitude=${longitude}&method=2`
              );
              
              if (response.ok) {
                const data = await response.json();
                this.cachePrayerTimes(latitude, longitude, data, dateString);
              }
            } catch (error) {
              console.warn(`Failed to preload prayer times for ${dateString}:`, error);
            }
          }
          
          // Small delay to avoid rate limiting
          if (i % 5 === 0) {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }
        
        console.log('Prayer times preloading completed');
        resolve();
      } catch (error) {
        console.error('Error preloading prayer times:', error);
        resolve();
      }
    });
  }

  clearExpiredCache(): void {
    try {
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.CACHE_KEY_PREFIX)) {
          const cachedString = localStorage.getItem(key);
          if (cachedString) {
            try {
              const cachedData: CachedPrayerData = JSON.parse(cachedString);
              if (!this.isCacheValid(cachedData)) {
                keysToRemove.push(key);
              }
            } catch {
              keysToRemove.push(key);
            }
          }
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
      console.log(`Cleared ${keysToRemove.length} expired prayer time cache entries`);
    } catch (error) {
      console.error('Error clearing expired cache:', error);
    }
  }

  getCacheStats(): { totalEntries: number; cacheSize: string } {
    let totalEntries = 0;
    let totalSize = 0;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.CACHE_KEY_PREFIX)) {
        totalEntries++;
        const value = localStorage.getItem(key);
        if (value) {
          totalSize += key.length + value.length;
        }
      }
    }
    
    return {
      totalEntries,
      cacheSize: `${(totalSize / 1024).toFixed(2)} KB`
    };
  }
}

export const prayerTimesCacheService = new PrayerTimesCacheService();
