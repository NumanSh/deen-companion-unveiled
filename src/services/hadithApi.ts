
interface HadithApiResponse {
  id: string;
  text: string;
  narrator: string;
  source: string;
  book: string;
  chapter: string;
  grade: 'صحيح' | 'حسن' | 'ضعيف';
  topic: string[];
}

interface HadithCollection {
  id: string;
  collection: string;
  book: string;
  hadithNumber: string;
  arabic: string;
  english: string;
  narrator: string;
  reference: string;
  category: string;
}

interface DorarHadithResponse {
  ahadith: {
    id: number;
    htext: string;
    attribution: string;
    grade: string;
    explanation: string;
    hukm: string;
    book: string;
    chapter: string;
    rawi: string;
  }[];
  page: number;
  size: number;
  hasNext: boolean;
}

// Using Dorar.net Hadith API
export const fetchRandomHadiths = async (count: number = 10): Promise<HadithApiResponse[]> => {
  try {
    console.log('Fetching hadiths from Dorar.net API...');
    
    // Dorar.net API endpoint for hadiths
    const response = await fetch(`https://dorar.net/api/hadith?size=${count}&page=1`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Islamic-App/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: DorarHadithResponse = await response.json();
    console.log('Successfully fetched hadiths from Dorar.net API');

    // Transform Dorar API response to our format
    return data.ahadith?.map((hadith, index) => ({
      id: hadith.id?.toString() || `dorar-${index}`,
      text: hadith.htext || 'النص غير متوفر',
      narrator: hadith.rawi || 'راوٍ غير معروف',
      source: getSourceFromAttribution(hadith.attribution || ''),
      book: hadith.book || 'كتاب الأحاديث',
      chapter: hadith.chapter || 'باب عام',
      grade: mapDorarGrade(hadith.grade || hadith.hukm || ''),
      topic: generateTopicsFromText(hadith.htext || '')
    })) || [];

  } catch (error) {
    console.error('Failed to fetch from Dorar.net API, using fallback data:', error);
    return getFallbackHadiths();
  }
};

export const fetchHadithCollections = async (): Promise<HadithCollection[]> => {
  try {
    console.log('Fetching hadith collections from Dorar.net API...');
    
    // Fetch multiple pages to get variety
    const collections = await Promise.all([
      fetchDorarPage(1, 5),
      fetchDorarPage(2, 5),
      fetchDorarPage(3, 5)
    ]);

    return collections.flat();

  } catch (error) {
    console.error('Failed to fetch collections from Dorar.net, using fallback:', error);
    return getFallbackCollections();
  }
};

const fetchDorarPage = async (page: number, size: number): Promise<HadithCollection[]> => {
  try {
    const response = await fetch(`https://dorar.net/api/hadith?size=${size}&page=${page}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) return [];

    const data: DorarHadithResponse = await response.json();
    
    return data.ahadith?.map((hadith, index) => ({
      id: `dorar-p${page}-${hadith.id || index}`,
      collection: getCollectionFromAttribution(hadith.attribution || ''),
      book: hadith.book || `Book ${page}`,
      hadithNumber: hadith.id?.toString() || (index + 1).toString(),
      arabic: hadith.htext || 'النص العربي غير متوفر',
      english: generateEnglishTranslation(hadith.htext || ''),
      narrator: hadith.rawi || 'Unknown Narrator (RA)',
      reference: `${getCollectionFromAttribution(hadith.attribution || '')} ${hadith.id || index + 1}`,
      category: getCategoryFromText(hadith.htext || hadith.explanation || '')
    })) || [];

  } catch (error) {
    console.error(`Failed to fetch Dorar page ${page}:`, error);
    return [];
  }
};

export const searchHadiths = async (query: string, source?: string, grade?: string): Promise<HadithApiResponse[]> => {
  try {
    console.log('Searching hadiths on Dorar.net with query:', query);
    
    // Dorar.net search endpoint
    const searchUrl = `https://dorar.net/api/hadith/search?q=${encodeURIComponent(query)}&size=20`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      // If search fails, fall back to fetching general hadiths and filtering locally
      console.warn('Search API failed, using local filtering');
      const hadiths = await fetchRandomHadiths(30);
      return filterHadithsLocally(hadiths, query, source, grade);
    }

    const data: DorarHadithResponse = await response.json();
    
    let results = data.ahadith?.map((hadith, index) => ({
      id: hadith.id?.toString() || `search-${index}`,
      text: hadith.htext || 'النص غير متوفر',
      narrator: hadith.rawi || 'راوٍ غير معروف',
      source: getSourceFromAttribution(hadith.attribution || ''),
      book: hadith.book || 'كتاب الأحاديث',
      chapter: hadith.chapter || 'باب عام',
      grade: mapDorarGrade(hadith.grade || hadith.hukm || ''),
      topic: generateTopicsFromText(hadith.htext || '')
    })) || [];

    // Apply additional filters
    results = results.filter(hadith => {
      const matchesSource = !source || source === 'الكل' || hadith.source === source;
      const matchesGrade = !grade || grade === 'الكل' || hadith.grade === grade;
      return matchesSource && matchesGrade;
    });

    return results;
    
  } catch (error) {
    console.error('Search failed:', error);
    return getFallbackHadiths();
  }
};

// Helper functions
const getSourceFromAttribution = (attribution: string): string => {
  if (attribution.includes('البخاري') || attribution.includes('bukhari')) return 'صحيح البخاري';
  if (attribution.includes('مسلم') || attribution.includes('muslim')) return 'صحيح مسلم';
  if (attribution.includes('أبو داود') || attribution.includes('abu dawud')) return 'سنن أبي داود';
  if (attribution.includes('الترمذي') || attribution.includes('tirmidhi')) return 'جامع الترمذي';
  if (attribution.includes('النسائي') || attribution.includes('nasai')) return 'سنن النسائي';
  if (attribution.includes('ابن ماجه') || attribution.includes('ibn majah')) return 'سنن ابن ماجه';
  return 'مجموعة أحاديث';
};

const getCollectionFromAttribution = (attribution: string): string => {
  if (attribution.includes('البخاري') || attribution.includes('bukhari')) return 'Sahih Bukhari';
  if (attribution.includes('مسلم') || attribution.includes('muslim')) return 'Sahih Muslim';
  if (attribution.includes('أبو داود') || attribution.includes('abu dawud')) return 'Sunan Abu Dawud';
  if (attribution.includes('الترمذي') || attribution.includes('tirmidhi')) return 'Jami\' At-Tirmidhi';
  if (attribution.includes('النسائي') || attribution.includes('nasai')) return 'Sunan An-Nasa\'i';
  if (attribution.includes('ابن ماجه') || attribution.includes('ibn majah')) return 'Sunan Ibn Majah';
  return 'Hadith Collection';
};

const mapDorarGrade = (grade: string): 'صحيح' | 'حسن' | 'ضعيف' => {
  const lowerGrade = grade.toLowerCase();
  if (lowerGrade.includes('صحيح') || lowerGrade.includes('sahih')) return 'صحيح';
  if (lowerGrade.includes('حسن') || lowerGrade.includes('hasan')) return 'حسن';
  if (lowerGrade.includes('ضعيف') || lowerGrade.includes('weak')) return 'ضعيف';
  // Default to صحيح for unknown grades from reputable sources
  return 'صحيح';
};

const generateTopicsFromText = (text: string): string[] => {
  const topics = [];
  if (text.includes('صلاة') || text.includes('صلى')) topics.push('الصلاة');
  if (text.includes('إيمان') || text.includes('آمن')) topics.push('الإيمان');
  if (text.includes('زكاة') || text.includes('صدقة')) topics.push('الزكاة');
  if (text.includes('صوم') || text.includes('رمضان')) topics.push('الصوم');
  if (text.includes('حج') || text.includes('عمرة')) topics.push('الحج');
  if (text.includes('أخلاق') || text.includes('خلق')) topics.push('الأخلاق');
  if (text.includes('معاملة') || text.includes('بيع')) topics.push('المعاملات');
  if (text.includes('دعاء') || text.includes('ذكر')) topics.push('الأدعية والأذكار');
  
  return topics.length > 0 ? topics : ['عام'];
};

const generateEnglishTranslation = (arabicText: string): string => {
  // Basic mapping for common phrases - in a real app, this would use a translation API
  if (arabicText.includes('إنما الأعمال بالنيات')) {
    return 'Actions are (judged) by motives (niyyah), so each man will have what he intended.';
  }
  if (arabicText.includes('من كان يؤمن بالله واليوم الآخر')) {
    return 'Whoever believes in Allah and the Last Day should speak good or remain silent.';
  }
  if (arabicText.includes('المسلم من سلم المسلمون')) {
    return 'A Muslim is the one from whose hand and tongue other Muslims are safe.';
  }
  
  return 'English translation will be added soon - النص متوفر بالعربية';
};

const getCategoryFromText = (text: string): string => {
  if (text.includes('صلاة') || text.includes('صلى')) return 'Prayer';
  if (text.includes('إيمان') || text.includes('آمن')) return 'Faith';
  if (text.includes('زكاة') || text.includes('صدقة')) return 'Charity';
  if (text.includes('صوم') || text.includes('رمضان')) return 'Fasting';
  if (text.includes('حج') || text.includes('عمرة')) return 'Hajj';
  if (text.includes('أخلاق') || text.includes('خلق')) return 'Ethics';
  if (text.includes('معاملة') || text.includes('بيع')) return 'Transactions';
  return 'General';
};

const filterHadithsLocally = (hadiths: HadithApiResponse[], query: string, source?: string, grade?: string): HadithApiResponse[] => {
  return hadiths.filter(hadith => {
    const matchesQuery = !query || 
      hadith.text.includes(query) ||
      hadith.narrator.includes(query) ||
      hadith.topic.some(topic => topic.includes(query));
    
    const matchesSource = !source || source === 'الكل' || hadith.source === source;
    const matchesGrade = !grade || grade === 'الكل' || hadith.grade === grade;
    
    return matchesQuery && matchesSource && matchesGrade;
  });
};

// Fallback data when API fails
const getFallbackHadiths = (): HadithApiResponse[] => [
  {
    id: 'fallback-1',
    text: 'إنما الأعمال بالنيات وإنما لكل امرئ ما نوى',
    narrator: 'عمر بن الخطاب',
    source: 'صحيح البخاري',
    book: 'كتاب بدء الوحي',
    chapter: 'باب كيف كان بدء الوحي',
    grade: 'صحيح',
    topic: ['النية', 'الإخلاص']
  },
  {
    id: 'fallback-2',
    text: 'من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت',
    narrator: 'أبو هريرة',
    source: 'صحيح البخاري',
    book: 'كتاب الأدب',
    chapter: 'باب من كان يؤمن بالله واليوم الآخر',
    grade: 'صحيح',
    topic: ['الكلام', 'الآداب']
  },
  {
    id: 'fallback-3',
    text: 'المسلم من سلم المسلمون من لسانه ويده',
    narrator: 'عبد الله بن عمرو',
    source: 'صحيح البخاري',
    book: 'كتاب الإيمان',
    chapter: 'باب المسلم من سلم المسلمون',
    grade: 'صحيح',
    topic: ['الإيمان', 'الأخلاق']
  }
];

const getFallbackCollections = (): HadithCollection[] => [
  {
    id: 'fallback-col-1',
    collection: 'Sahih Bukhari',
    book: 'Book of Faith',
    hadithNumber: '1',
    arabic: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
    english: 'Actions are (judged) by motives (niyyah), so each man will have what he intended.',
    narrator: 'Umar ibn Al-Khattab (RA)',
    reference: 'Sahih Bukhari 1',
    category: 'Faith'
  },
  {
    id: 'fallback-col-2',
    collection: 'Sahih Bukhari',
    book: 'Book of Good Manners',
    hadithNumber: '2',
    arabic: 'مَن كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
    english: 'Whoever believes in Allah and the Last Day should speak good or remain silent.',
    narrator: 'Abu Huraira (RA)',
    reference: 'Sahih Bukhari 2',
    category: 'Ethics'
  }
];
