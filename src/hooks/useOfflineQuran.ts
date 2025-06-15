
import { useState, useEffect } from 'react';
import { offlineQuranStorage, OfflineSurah, OfflineStorageStats } from '@/services/offlineQuranStorage';
import { QuranSurah } from '@/services/quranService';
import { fetchSurahWithTranslation } from '@/services/quranApi';
import { useToast } from '@/hooks/use-toast';

export const useOfflineQuran = () => {
  const { toast } = useToast();
  const [offlineSurahs, setOfflineSurahs] = useState<OfflineSurah[]>([]);
  const [storageStats, setStorageStats] = useState<OfflineStorageStats>({
    totalSurahs: 0,
    totalSize: 0,
    lastUpdated: ''
  });
  const [downloadingIds, setDownloadingIds] = useState<Set<number>>(new Set());

  // Load offline surahs on mount
  useEffect(() => {
    refreshOfflineData();
  }, []);

  const refreshOfflineData = () => {
    const surahs = offlineQuranStorage.getOfflineSurahs();
    const stats = offlineQuranStorage.getStorageStats();
    setOfflineSurahs(surahs);
    setStorageStats(stats);
  };

  const downloadSurah = async (surah: QuranSurah): Promise<boolean> => {
    if (downloadingIds.has(surah.number)) {
      return false;
    }

    setDownloadingIds(prev => new Set(prev).add(surah.number));

    try {
      toast({
        title: 'Downloading Surah',
        description: `Downloading ${surah.englishName} for offline reading...`,
      });

      const { arabic, translation } = await fetchSurahWithTranslation(surah.number);
      
      // Convert ayahs to text format for storage
      const arabicText = arabic.ayahs.map(ayah => `${ayah.numberInSurah}|${ayah.text}`).join('\n');
      const translationText = translation.ayahs.map(ayah => `${ayah.numberInSurah}|${ayah.text}`).join('\n');

      const success = await offlineQuranStorage.downloadSurah(surah, arabicText, translationText);
      
      if (success) {
        toast({
          title: 'Download Complete',
          description: `${surah.englishName} is now available offline`,
        });
        refreshOfflineData();
        return true;
      } else {
        toast({
          title: 'Download Failed',
          description: 'Storage limit exceeded or error occurred',
          variant: 'destructive'
        });
        return false;
      }
    } catch (error) {
      console.error('Error downloading surah:', error);
      toast({
        title: 'Download Failed',
        description: 'Failed to download surah. Please check your connection.',
        variant: 'destructive'
      });
      return false;
    } finally {
      setDownloadingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(surah.number);
        return newSet;
      });
    }
  };

  const removeSurah = (surahNumber: number): boolean => {
    const success = offlineQuranStorage.removeSurah(surahNumber);
    if (success) {
      refreshOfflineData();
      toast({
        title: 'Surah Removed',
        description: 'Surah removed from offline storage',
      });
    }
    return success;
  };

  const clearAllSurahs = (): boolean => {
    const success = offlineQuranStorage.clearAllSurahs();
    if (success) {
      refreshOfflineData();
      toast({
        title: 'Storage Cleared',
        description: 'All offline surahs have been removed',
      });
    }
    return success;
  };

  const getOfflineSurah = (surahNumber: number): OfflineSurah | null => {
    return offlineQuranStorage.getOfflineSurah(surahNumber);
  };

  const isSurahAvailableOffline = (surahNumber: number): boolean => {
    return offlineQuranStorage.isSurahAvailableOffline(surahNumber);
  };

  const isDownloading = (surahNumber: number): boolean => {
    return downloadingIds.has(surahNumber);
  };

  return {
    offlineSurahs,
    storageStats,
    downloadSurah,
    removeSurah,
    clearAllSurahs,
    getOfflineSurah,
    isSurahAvailableOffline,
    isDownloading,
    refreshOfflineData,
    formatStorageSize: offlineQuranStorage.formatStorageSize.bind(offlineQuranStorage),
    getAvailableSpace: offlineQuranStorage.getAvailableSpace.bind(offlineQuranStorage),
    isStorageNearlyFull: offlineQuranStorage.isStorageNearlyFull.bind(offlineQuranStorage)
  };
};
