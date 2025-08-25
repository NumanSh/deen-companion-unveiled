import { useState } from 'react';

export const useTafsir = () => {
  const [tafsir, setTafsir] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getTafsir = async (surahNumber: number, ayahNumber: number) => {
    setLoading(true);
    // Mock implementation
    setTafsir('This is a mock tafsir explanation...');
    setLoading(false);
  };

  return {
    tafsir,
    loading,
    getTafsir
  };
};

export default useTafsir;