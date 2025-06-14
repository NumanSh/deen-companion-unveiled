
interface VerseResponse {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

interface SurahResponse {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: VerseResponse[];
}

interface ApiResponse {
  code: number;
  status: string;
  data: SurahResponse;
}

// Fallback Quran data for when API is not available
const fallbackQuranData: { [key: number]: { arabic: SurahResponse; translation: SurahResponse } } = {
  1: {
    arabic: {
      number: 1,
      name: "الفاتحة",
      englishName: "Al-Fatihah",
      englishNameTranslation: "The Opening",
      numberOfAyahs: 7,
      revelationType: "Meccan",
      ayahs: [
        { number: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", numberInSurah: 1, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 2, text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", numberInSurah: 2, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 3, text: "الرَّحْمَٰنِ الرَّحِيمِ", numberInSurah: 3, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 4, text: "مَالِكِ يَوْمِ الدِّينِ", numberInSurah: 4, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 5, text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", numberInSurah: 5, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 6, text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", numberInSurah: 6, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 7, text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", numberInSurah: 7, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false }
      ]
    },
    translation: {
      number: 1,
      name: "Al-Fatihah",
      englishName: "Al-Fatihah",
      englishNameTranslation: "The Opening",
      numberOfAyahs: 7,
      revelationType: "Meccan",
      ayahs: [
        { number: 1, text: "In the name of Allah, the Entirely Merciful, the Especially Merciful.", numberInSurah: 1, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 2, text: "All praise is due to Allah, Lord of the worlds.", numberInSurah: 2, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 3, text: "The Entirely Merciful, the Especially Merciful,", numberInSurah: 3, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 4, text: "Sovereign of the Day of Recompense.", numberInSurah: 4, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 5, text: "It is You we worship and You we ask for help.", numberInSurah: 5, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 6, text: "Guide us to the straight path", numberInSurah: 6, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 7, text: "The path of those upon whom You have bestowed favor, not of those who have evoked Your anger or of those who are astray.", numberInSurah: 7, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false }
      ]
    }
  }
};

export const fetchSurahWithAyahs = async (surahNumber: number): Promise<SurahResponse> => {
  try {
    const response = await fetch(`https://alquran.cloud/api/v1/surah/${surahNumber}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching surah:', error);
    throw error;
  }
};

export const fetchSurahWithTranslation = async (surahNumber: number): Promise<{ arabic: SurahResponse; translation: SurahResponse }> => {
  console.log(`Attempting to fetch surah ${surahNumber}...`);
  
  // Try fallback data first for better reliability
  if (fallbackQuranData[surahNumber]) {
    console.log(`Using fallback data for surah ${surahNumber}`);
    return fallbackQuranData[surahNumber];
  }
  
  try {
    const [arabicResponse, translationResponse] = await Promise.all([
      fetch(`https://alquran.cloud/api/v1/surah/${surahNumber}`),
      fetch(`https://alquran.cloud/api/v1/surah/${surahNumber}/en.asad`)
    ]);

    if (!arabicResponse.ok || !translationResponse.ok) {
      throw new Error('Failed to fetch surah data');
    }

    const [arabicData, translationData] = await Promise.all([
      arabicResponse.json(),
      translationResponse.json()
    ]);

    return {
      arabic: arabicData.data,
      translation: translationData.data
    };
  } catch (error) {
    console.error('Error fetching surah with translation:', error);
    
    // Return mock data as fallback
    const mockSurah: SurahResponse = {
      number: surahNumber,
      name: `سورة ${surahNumber}`,
      englishName: `Surah ${surahNumber}`,
      englishNameTranslation: `Surah ${surahNumber}`,
      numberOfAyahs: 5,
      revelationType: "Meccan",
      ayahs: [
        { number: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", numberInSurah: 1, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 2, text: "Sample Arabic verse for demonstration", numberInSurah: 2, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 3, text: "This is fallback data when API is not available", numberInSurah: 3, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 4, text: "The actual API data will be loaded when available", numberInSurah: 4, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 5, text: "صدق الله العظيم", numberInSurah: 5, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false }
      ]
    };
    
    return {
      arabic: mockSurah,
      translation: {
        ...mockSurah,
        ayahs: mockSurah.ayahs.map(ayah => ({
          ...ayah,
          text: ayah.numberInSurah === 1 ? "In the name of Allah, the Entirely Merciful, the Especially Merciful." : `Translation for verse ${ayah.numberInSurah} (fallback data)`
        }))
      }
    };
  }
};
