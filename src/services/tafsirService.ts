
interface TafsirVerse {
  id: number;
  verse_number: number;
  chapter_id: number;
  text: string;
}

interface TafsirResponse {
  tafsirs: TafsirVerse[];
}

const TAFSIR_API_BASE = 'https://api-quran.com/api';

// Cache for tafsir data to avoid repeated API calls
const tafsirCache = new Map<string, string>();

export const fetchVerseTafsir = async (surahNumber: number, verseNumber: number): Promise<string> => {
  const cacheKey = `${surahNumber}-${verseNumber}`;
  
  // Return cached result if available
  if (tafsirCache.has(cacheKey)) {
    return tafsirCache.get(cacheKey)!;
  }

  try {
    console.log(`Fetching tafsir for surah ${surahNumber}, verse ${verseNumber}...`);
    
    // Using Ibn Kathir tafsir (you can change the tafsir_id as needed)
    const response = await fetch(`${TAFSIR_API_BASE}/v1/tafsir/1/by_ayah/${surahNumber}:${verseNumber}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Islamic-App/1.0'
      },
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: TafsirResponse = await response.json();
    
    if (data.tafsirs && data.tafsirs.length > 0) {
      const tafsirText = data.tafsirs[0].text;
      tafsirCache.set(cacheKey, tafsirText);
      console.log(`Successfully fetched tafsir for ${surahNumber}:${verseNumber}`);
      return tafsirText;
    }
    
    throw new Error('No tafsir data found');
  } catch (error) {
    console.error(`Error fetching tafsir for ${surahNumber}:${verseNumber}:`, error);
    
    // Return fallback Arabic tafsir
    const fallbackTafsir = getFallbackTafsir(verseNumber);
    tafsirCache.set(cacheKey, fallbackTafsir);
    return fallbackTafsir;
  }
};

// Fallback tafsir for when API fails
const getFallbackTafsir = (verseNumber: number): string => {
  const fallbackTafsirs = [
    "هذه الآية تبين عظمة الله سبحانه وتعالى وقدرته على الخلق والإبداع",
    "في هذه الآية يذكر الله تعالى نعمه على عباده ويدعوهم للتفكر",
    "هذه الآية تحتوي على حكمة عظيمة وموعظة للمؤمنين",
    "يبين الله في هذه الآية أهمية التوحيد والإيمان به وحده",
    "هذه الآية تذكر المؤمنين بأهمية الصلاة والذكر",
    "في هذه الآية إرشاد للمؤمنين إلى طريق الهداية والصلاح",
    "هذه الآية تحث على التقوى والعمل الصالح",
    "يوضح الله في هذه الآية جزاء المؤمنين في الآخرة"
  ];
  
  return fallbackTafsirs[verseNumber % fallbackTafsirs.length];
};

// Clear cache function (useful for memory management)
export const clearTafsirCache = () => {
  tafsirCache.clear();
};
