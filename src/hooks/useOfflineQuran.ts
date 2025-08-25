import { useState, useEffect } from 'react';
import { QuranSurah } from '@/services/quranService';

export const useOfflineQuran = () => {
  const [surahs, setSurahs] = useState<QuranSurah[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock implementation
    const mockSurahs: QuranSurah[] = [
      {
        number: 1,
        name: "الفاتحة",
        englishName: "Al-Fatiha",
        englishNameTranslation: "The Opening",
        numberOfAyahs: 7,
        revelationType: "Meccan"
      }
    ];
    
    setSurahs(mockSurahs);
    setLoading(false);
  }, []);

  return {
    surahs,
    loading,
    downloadSurah: async (id: number) => {},
    deleteSurah: async (id: number) => {}
  };
};

export default useOfflineQuran;