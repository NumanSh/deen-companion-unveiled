
import { useState } from 'react';
import { fetchSurahArabic, fetchSurahTranslation, QuranSurah } from '@/features/quran';
import { useToast } from '@/shared';

export const useSurahContent = (onSurahRead: (surah: any) => void) => {
  const { toast } = useToast();
  const [selectedSurah, setSelectedSurah] = useState<QuranSurah | null>(null);
  const [arabicSurah, setArabicSurah] = useState<QuranSurah | null>(null);
  const [translationSurah, setTranslationSurah] = useState<QuranSurah | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadSurahContent = async (surah: QuranSurah) => {
    try {
      setIsLoading(true);
      setSelectedSurah(surah);
      
      console.log(`Loading surah ${surah.number}: ${surah.englishName}`);
      
      // Record reading session start
      const sessionStart = Date.now();
      
      // Fetch both Arabic and translation concurrently
      const [arabicData, translationData] = await Promise.all([
        fetchSurahArabic(surah.number),
        fetchSurahTranslation(surah.number, 'en.asad')
      ]);
      
      setArabicSurah(arabicData);
      setTranslationSurah(translationData);
      onSurahRead(surah);
      
      // Record reading session
      const session = {
        surahNumber: surah.number,
        surahName: surah.englishName,
        versesRead: 0,
        totalVerses: surah.numberOfAyahs,
        date: new Date().toISOString().split('T')[0],
        duration: Math.round((Date.now() - sessionStart) / 1000 / 60),
        completed: false
      };
      
      const savedSessions = localStorage.getItem('quran-reading-sessions');
      const sessions = savedSessions ? JSON.parse(savedSessions) : [];
      sessions.push(session);
      localStorage.setItem('quran-reading-sessions', JSON.stringify(sessions));
      
      toast({
        title: 'Surah Loaded',
        description: `${surah.englishName} is ready to read`,
      });
    } catch (error) {
      console.error('Error loading surah:', error);
      toast({
        title: 'Error Loading Surah',
        description: 'Failed to load surah content. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetSurahContent = () => {
    setSelectedSurah(null);
    setArabicSurah(null);
    setTranslationSurah(null);
  };

  return {
    selectedSurah,
    arabicSurah,
    translationSurah,
    isLoading,
    loadSurahContent,
    resetSurahContent
  };
};
