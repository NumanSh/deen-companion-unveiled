
import { useState, useEffect } from 'react';
import { fetchAllSurahs, searchSurahs, QuranSurah } from '@/features/quran';
import { useToast } from '@/shared';

export const useQuranData = () => {
  const { toast } = useToast();
  const [surahs, setSurahs] = useState<QuranSurah[]>([]);
  const [filteredSurahs, setFilteredSurahs] = useState<QuranSurah[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load all surahs on hook initialization
  useEffect(() => {
    const loadSurahs = async () => {
      try {
        setIsLoading(true);
        const surahsData = await fetchAllSurahs();
        setSurahs(surahsData);
        setFilteredSurahs(surahsData);
        console.log('Loaded surahs:', surahsData.length);
      } catch (error) {
        console.error('Failed to load surahs:', error);
        toast({
          title: 'Error Loading Surahs',
          description: 'Failed to load Quran data. Using offline content.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSurahs();
  }, [toast]);

  // Filter surahs based on search term
  useEffect(() => {
    setFilteredSurahs(searchSurahs(surahs, searchTerm));
  }, [searchTerm, surahs]);

  const clearSearch = () => {
    setSearchTerm('');
  };

  return {
    surahs,
    filteredSurahs,
    searchTerm,
    setSearchTerm,
    isLoading,
    clearSearch
  };
};
