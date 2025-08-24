
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

// API interfaces for Al-Quran API
interface AlQuranApiVerse {
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

interface AlQuranApiSurah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: AlQuranApiVerse[];
}

interface AlQuranApiResponse {
  code: number;
  status: string;
  data: AlQuranApiSurah;
}

// Minimal fallback data for critical surahs only
const criticalSurahs: { [key: number]: { arabic: SurahResponse; translation: SurahResponse } } = {
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

// Updated API endpoints - more reliable sources
const API_ENDPOINTS = [
  'https://api.alquran.cloud/v1/surah',
  'https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran'
];

export const fetchSurahWithAyahs = async (surahNumber: number): Promise<SurahResponse> => {
  console.log(`Fetching surah ${surahNumber} from API...`);

  // Try API endpoints first
  for (const baseUrl of API_ENDPOINTS) {
    try {
      console.log(`Trying API: ${baseUrl}/${surahNumber}`);
      const response = await fetch(`${baseUrl}/${surahNumber}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Islamic-App/1.0'
        },
        signal: AbortSignal.timeout(8000) // 8 second timeout
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: AlQuranApiResponse = await response.json();
      
      if (data.code === 200 && data.data) {
        console.log(`Successfully fetched surah ${surahNumber} from ${baseUrl}`);
        return data.data;
      }
    } catch (error) {
      console.log(`Failed to fetch from ${baseUrl}:`, error);
      continue;
    }
  }

  // Use critical fallback only for Al-Fatihah
  if (criticalSurahs[surahNumber]) {
    console.log(`Using critical fallback data for surah ${surahNumber}`);
    return criticalSurahs[surahNumber].arabic;
  }

  // For other surahs, throw error to be handled by components
  throw new Error(`Failed to fetch surah ${surahNumber} from all available sources`);
};

export const fetchSurahWithTranslation = async (surahNumber: number): Promise<{ arabic: SurahResponse; translation: SurahResponse }> => {
  console.log(`Fetching surah ${surahNumber} with translation...`);
  
  // Check critical fallback first for Al-Fatihah
  if (criticalSurahs[surahNumber]) {
    console.log(`Using critical fallback data for surah ${surahNumber}`);
    return criticalSurahs[surahNumber];
  }

  // Try API endpoints
  for (const baseUrl of API_ENDPOINTS) {
    try {
      console.log(`Trying to fetch from: ${baseUrl}`);
      
      // Fetch Arabic text
      const arabicResponse = await fetch(`${baseUrl}/${surahNumber}`, {
        method: 'GET',
        headers: { 
          'Accept': 'application/json',
          'User-Agent': 'Islamic-App/1.0'
        },
        signal: AbortSignal.timeout(8000)
      });
      
      if (!arabicResponse.ok) continue;
      
      const arabicData: AlQuranApiResponse = await arabicResponse.json();
      
      // Fetch English translation  
      const translationResponse = await fetch(`${baseUrl}/${surahNumber}/en.asad`, {
        method: 'GET',
        headers: { 
          'Accept': 'application/json',
          'User-Agent': 'Islamic-App/1.0'
        },
        signal: AbortSignal.timeout(8000)
      });
      
      if (!translationResponse.ok) continue;
      
      const translationData: AlQuranApiResponse = await translationResponse.json();
      
      if (arabicData.code === 200 && translationData.code === 200) {
        console.log(`Successfully fetched complete surah ${surahNumber} from ${baseUrl}`);
        return {
          arabic: arabicData.data,
          translation: translationData.data
        };
      }
    } catch (error) {
      console.log(`Failed to fetch from ${baseUrl}:`, error);
      continue;
    }
  }

  // If all APIs fail, throw error
  throw new Error(`Failed to fetch surah ${surahNumber} with translation from all available sources`);
};

// New function to fetch a random verse for verse of the day
export const fetchRandomVerse = async (): Promise<{ surah: number; verse: number; arabicText: string; translation: string; surahName: string }> => {
  console.log('Fetching random verse for verse of the day...');
  
  // List of popular surahs to randomly select from
  const popularSurahs = [2, 3, 4, 18, 36, 55, 67, 112, 113, 114];
  const randomSurahNumber = popularSurahs[Math.floor(Math.random() * popularSurahs.length)];
  
  try {
    const { arabic, translation } = await fetchSurahWithTranslation(randomSurahNumber);
    const randomVerseIndex = Math.floor(Math.random() * arabic.ayahs.length);
    const selectedVerse = arabic.ayahs[randomVerseIndex];
    const translatedVerse = translation.ayahs[randomVerseIndex];
    
    return {
      surah: randomSurahNumber,
      verse: selectedVerse.numberInSurah,
      arabicText: selectedVerse.text,
      translation: translatedVerse.text,
      surahName: arabic.englishName
    };
  } catch (error) {
    console.error('Failed to fetch random verse:', error);
    
    // Fallback to Al-Fatihah verse 2
    return {
      surah: 1,
      verse: 2,
      arabicText: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      translation: "All praise is due to Allah, Lord of the worlds.",
      surahName: "Al-Fatihah"
    };
  }
};
