export interface QuranSurah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType?: 'Meccan' | 'Medinan';
  ayahs?: Array<{
    number: number;
    text: string;
    numberInSurah: number;
  }>;
}

export interface QuranVerse {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  arabic: string;
  translation: string;
  transliteration?: string;
}

class QuranService {
  async getSurahs(): Promise<QuranSurah[]> {
    // Mock implementation - replace with actual API calls
    return [
      {
        number: 1,
        name: "الفاتحة",
        englishName: "Al-Fatiha",
        englishNameTranslation: "The Opening",
        numberOfAyahs: 7,
        revelationType: "Meccan"
      }
    ];
  }

  async getSurahById(id: number): Promise<QuranSurah | null> {
    const surahs = await this.getSurahs();
    return surahs.find(s => s.number === id) || null;
  }

  async searchVerses(query: string): Promise<QuranVerse[]> {
    // Mock implementation
    return [];
  }

  async getRandomVerse(): Promise<QuranVerse | null> {
    // Mock implementation
    return {
      id: '1-1',
      surahNumber: 1,
      ayahNumber: 1,
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.'
    };
  }
}

export const quranService = new QuranService();
export default quranService;