
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
    throw error;
  }
};
