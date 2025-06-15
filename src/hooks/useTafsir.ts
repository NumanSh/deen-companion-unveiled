
import { useState, useEffect } from 'react';
import { fetchVerseTafsir } from '@/services/tafsirService';

export const useTafsir = (surahNumber: number, verseNumber: number, enabled: boolean = true) => {
  const [tafsir, setTafsir] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const loadTafsir = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const tafsirText = await fetchVerseTafsir(surahNumber, verseNumber);
        setTafsir(tafsirText);
      } catch (err) {
        console.error('Error loading tafsir:', err);
        setError('Failed to load tafsir');
      } finally {
        setIsLoading(false);
      }
    };

    loadTafsir();
  }, [surahNumber, verseNumber, enabled]);

  return { tafsir, isLoading, error };
};
