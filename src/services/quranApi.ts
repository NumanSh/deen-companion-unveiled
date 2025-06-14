
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

// Expanded fallback Quran data with complete surahs
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
  },
  112: {
    arabic: {
      number: 112,
      name: "الإخلاص",
      englishName: "Al-Ikhlas",
      englishNameTranslation: "The Sincerity",
      numberOfAyahs: 4,
      revelationType: "Meccan",
      ayahs: [
        { number: 1, text: "قُلْ هُوَ اللَّهُ أَحَدٌ", numberInSurah: 1, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 239, sajda: false },
        { number: 2, text: "اللَّهُ الصَّمَدُ", numberInSurah: 2, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 239, sajda: false },
        { number: 3, text: "لَمْ يَلِدْ وَلَمْ يُولَدْ", numberInSurah: 3, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 239, sajda: false },
        { number: 4, text: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", numberInSurah: 4, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 239, sajda: false }
      ]
    },
    translation: {
      number: 112,
      name: "Al-Ikhlas",
      englishName: "Al-Ikhlas",
      englishNameTranslation: "The Sincerity",
      numberOfAyahs: 4,
      revelationType: "Meccan",
      ayahs: [
        { number: 1, text: "Say, \"He is Allah, [who is] One,", numberInSurah: 1, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 239, sajda: false },
        { number: 2, text: "Allah, the Eternal Refuge.", numberInSurah: 2, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 239, sajda: false },
        { number: 3, text: "He neither begets nor is born,", numberInSurah: 3, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 239, sajda: false },
        { number: 4, text: "Nor is there to Him any equivalent.\"", numberInSurah: 4, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 239, sajda: false }
      ]
    }
  },
  113: {
    arabic: {
      number: 113,
      name: "الفلق",
      englishName: "Al-Falaq",
      englishNameTranslation: "The Daybreak",
      numberOfAyahs: 5,
      revelationType: "Meccan",
      ayahs: [
        { number: 1, text: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", numberInSurah: 1, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 239, sajda: false },
        { number: 2, text: "مِن شَرِّ مَا خَلَقَ", numberInSurah: 2, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 239, sajda: false },
        { number: 3, text: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", numberInSurah: 3, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 239, sajda: false },
        { number: 4, text: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", numberInSurah: 4, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 239, sajda: false },
        { number: 5, text: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", numberInSurah: 5, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 239, sajda: false }
      ]
    },
    translation: {
      number: 113,
      name: "Al-Falaq",
      englishName: "Al-Falaq",
      englishNameTranslation: "The Daybreak",
      numberOfAyahs: 5,
      revelationType: "Meccan",
      ayahs: [
        { number: 1, text: "Say, \"I seek refuge in the Lord of daybreak", numberInSurah: 1, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 239, sajda: false },
        { number: 2, text: "From the evil of that which He created", numberInSurah: 2, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 239, sajda: false },
        { number: 3, text: "And from the evil of darkness when it settles", numberInSurah: 3, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 239, sajda: false },
        { number: 4, text: "And from the evil of the blowers in knots", numberInSurah: 4, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 239, sajda: false },
        { number: 5, text: "And from the evil of an envier when he envies.\"", numberInSurah: 5, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 239, sajda: false }
      ]
    }
  },
  114: {
    arabic: {
      number: 114,
      name: "الناس",
      englishName: "An-Nas",
      englishNameTranslation: "Mankind",
      numberOfAyahs: 6,
      revelationType: "Meccan",
      ayahs: [
        { number: 1, text: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", numberInSurah: 1, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 240, sajda: false },
        { number: 2, text: "مَلِكِ النَّاسِ", numberInSurah: 2, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 240, sajda: false },
        { number: 3, text: "إِلَٰهِ النَّاسِ", numberInSurah: 3, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 240, sajda: false },
        { number: 4, text: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", numberInSurah: 4, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 240, sajda: false },
        { number: 5, text: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", numberInSurah: 5, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 240, sajda: false },
        { number: 6, text: "مِنَ الْجِنَّةِ وَالنَّاسِ", numberInSurah: 6, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 240, sajda: false }
      ]
    },
    translation: {
      number: 114,
      name: "An-Nas",
      englishName: "An-Nas",
      englishNameTranslation: "Mankind",
      numberOfAyahs: 6,
      revelationType: "Meccan",
      ayahs: [
        { number: 1, text: "Say, \"I seek refuge in the Lord of mankind,", numberInSurah: 1, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 240, sajda: false },
        { number: 2, text: "The Sovereign of mankind.", numberInSurah: 2, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 240, sajda: false },
        { number: 3, text: "The God of mankind,", numberInSurah: 3, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 240, sajda: false },
        { number: 4, text: "From the evil of the retreating whisperer -", numberInSurah: 4, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 240, sajda: false },
        { number: 5, text: "Who whispers [evil] into the breasts of mankind -", numberInSurah: 5, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 240, sajda: false },
        { number: 6, text: "From among the jinn and mankind.\"", numberInSurah: 6, juz: 30, manzil: 7, page: 604, ruku: 1, hizbQuarter: 240, sajda: false }
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
  
  // Check fallback data first for better reliability
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
    
    // Return enhanced mock data as fallback with actual verses for common surahs
    const mockSurah: SurahResponse = {
      number: surahNumber,
      name: `سورة ${surahNumber}`,
      englishName: `Surah ${surahNumber}`,
      englishNameTranslation: `Surah ${surahNumber}`,
      numberOfAyahs: 5,
      revelationType: "Meccan",
      ayahs: [
        { number: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", numberInSurah: 1, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 2, text: "هذا نص تجريبي لعرض الآيات", numberInSurah: 2, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 3, text: "سيتم تحميل البيانات الفعلية عند توفر الاتصال", numberInSurah: 3, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 4, text: "هذا المحتوى مؤقت لأغراض العرض", numberInSurah: 4, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false },
        { number: 5, text: "صدق الله العظيم", numberInSurah: 5, juz: 1, manzil: 1, page: 1, ruku: 1, hizbQuarter: 1, sajda: false }
      ]
    };
    
    return {
      arabic: mockSurah,
      translation: {
        ...mockSurah,
        ayahs: mockSurah.ayahs.map(ayah => ({
          ...ayah,
          text: ayah.numberInSurah === 1 ? "In the name of Allah, the Entirely Merciful, the Especially Merciful." : `Translation for verse ${ayah.numberInSurah} (fallback data - API connection needed for complete content)`
        }))
      }
    };
  }
};
