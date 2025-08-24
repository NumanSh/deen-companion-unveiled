
import { QuranSurah } from '@/services/quranService';

export interface OfflineSurah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  arabicText: string;
  translation: string;
  downloadedAt: string;
  size: number;
}

export interface OfflineStorageStats {
  totalSurahs: number;
  totalSize: number;
  lastUpdated: string;
}

class OfflineQuranStorageService {
  private readonly STORAGE_KEY = 'offline-quran-surahs';
  private readonly STATS_KEY = 'offline-quran-stats';
  private readonly MAX_STORAGE_SIZE = 50 * 1024 * 1024; // 50MB limit

  // Get all offline stored surahs
  getOfflineSurahs(): OfflineSurah[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error retrieving offline surahs:', error);
      return [];
    }
  }

  // Get specific offline surah
  getOfflineSurah(surahNumber: number): OfflineSurah | null {
    const surahs = this.getOfflineSurahs();
    return surahs.find(surah => surah.number === surahNumber) || null;
  }

  // Check if surah is available offline
  isSurahAvailableOffline(surahNumber: number): boolean {
    const surah = this.getOfflineSurah(surahNumber);
    return surah !== null;
  }

  // Download and store surah for offline use
  async downloadSurah(surah: QuranSurah, arabicText: string, translationText: string): Promise<boolean> {
    try {
      const offlineSurah: OfflineSurah = {
        number: surah.number,
        name: surah.name,
        englishName: surah.englishName,
        englishNameTranslation: surah.englishNameTranslation,
        numberOfAyahs: surah.numberOfAyahs,
        revelationType: surah.revelationType,
        arabicText,
        translation: translationText,
        downloadedAt: new Date().toISOString(),
        size: new Blob([arabicText + translationText]).size
      };

      // Check storage size limit
      const currentStats = this.getStorageStats();
      if (currentStats.totalSize + offlineSurah.size > this.MAX_STORAGE_SIZE) {
        console.warn('Storage limit exceeded, cannot download surah');
        return false;
      }

      const existingSurahs = this.getOfflineSurahs();
      const updatedSurahs = existingSurahs.filter(s => s.number !== surah.number);
      updatedSurahs.push(offlineSurah);

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedSurahs));
      this.updateStorageStats();
      
      console.log(`Surah ${surah.englishName} downloaded for offline use`);
      return true;
    } catch (error) {
      console.error('Error downloading surah for offline use:', error);
      return false;
    }
  }

  // Remove surah from offline storage
  removeSurah(surahNumber: number): boolean {
    try {
      const surahs = this.getOfflineSurahs();
      const updatedSurahs = surahs.filter(surah => surah.number !== surahNumber);
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedSurahs));
      this.updateStorageStats();
      
      console.log(`Surah ${surahNumber} removed from offline storage`);
      return true;
    } catch (error) {
      console.error('Error removing surah from offline storage:', error);
      return false;
    }
  }

  // Clear all offline surahs
  clearAllSurahs(): boolean {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.STATS_KEY);
      console.log('All offline surahs cleared');
      return true;
    } catch (error) {
      console.error('Error clearing offline surahs:', error);
      return false;
    }
  }

  // Get storage statistics
  getStorageStats(): OfflineStorageStats {
    try {
      const surahs = this.getOfflineSurahs();
      const stats: OfflineStorageStats = {
        totalSurahs: surahs.length,
        totalSize: surahs.reduce((total, surah) => total + surah.size, 0),
        lastUpdated: new Date().toISOString()
      };
      return stats;
    } catch (error) {
      console.error('Error getting storage stats:', error);
      return { totalSurahs: 0, totalSize: 0, lastUpdated: '' };
    }
  }

  // Update storage statistics
  private updateStorageStats(): void {
    try {
      const stats = this.getStorageStats();
      localStorage.setItem(this.STATS_KEY, JSON.stringify(stats));
    } catch (error) {
      console.error('Error updating storage stats:', error);
    }
  }

  // Format storage size for display
  formatStorageSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Get available storage space
  getAvailableSpace(): number {
    const currentStats = this.getStorageStats();
    return this.MAX_STORAGE_SIZE - currentStats.totalSize;
  }

  // Check if storage is nearly full
  isStorageNearlyFull(): boolean {
    const currentStats = this.getStorageStats();
    return (currentStats.totalSize / this.MAX_STORAGE_SIZE) > 0.8; // 80% threshold
  }
}

export const offlineQuranStorage = new OfflineQuranStorageService();
