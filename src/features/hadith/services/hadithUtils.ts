
import { HadithApiResponse } from '../types/hadith';
import { FALLBACK_HADITHS } from '../data/hadithData';

// Enhanced translation utility with more comprehensive mappings
export const translateToEnglish = (arabicText: string): string => {
  const translations: { [key: string]: string } = {
    'إنما الأعمال بالنيات وإنما لكل امرئ ما نوى': 'Actions are but by intention and every man shall have only that which he intended.',
    'من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت': 'Whoever believes in Allah and the Last Day should speak good or remain silent.',
    'لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه': 'None of you believes until he loves for his brother what he loves for himself.',
    'المسلم من سلم المسلمون من لسانه ويده': 'The Muslim is one from whose tongue and hand Muslims are safe.',
    'من لا يرحم الناس لا يرحمه الله': 'Whoever does not show mercy to people, Allah will not show mercy to him.',
    'الدين النصيحة': 'Religion is advice/sincerity.',
    'من حسن إسلام المرء تركه ما لا يعنيه': 'Part of the perfection of one\'s Islam is his leaving that which does not concern him.',
    'البر حسن الخلق': 'Righteousness is good character.'
  };
  
  // Check for exact matches first
  if (translations[arabicText]) {
    return translations[arabicText];
  }
  
  // Check for partial matches
  for (const [arabic, english] of Object.entries(translations)) {
    if (arabicText.includes(arabic.substring(0, 20))) {
      return english;
    }
  }
  
  return 'English translation available - full version coming soon';
};

// Enhanced collection display names
export const getCollectionDisplayName = (collection: string): string => {
  const names: { [key: string]: string } = {
    'bukhari': 'صحيح البخاري',
    'muslim': 'صحيح مسلم',
    'abu-dawud': 'سنن أبي داود',
    'abudawud': 'سنن أبي داود',
    'tirmidhi': 'جامع الترمذي',
    'nasai': 'سنن النسائي',
    'ibnu-majah': 'سنن ابن ماجه',
    'ibnmajah': 'سنن ابن ماجه',
    'malik': 'موطأ مالك',
    'ahmad': 'مسند أحمد',
    'darimi': 'سنن الدارمي',
    'riyadussalihin': 'رياض الصالحين',
    'adab': 'الأدب المفرد',
    'bulugh': 'بلوغ المرام'
  };
  return names[collection.toLowerCase()] || collection;
};

export const mapGradeToArabic = (grade: string): 'صحيح' | 'حسن' | 'ضعيف' => {
  const lowerGrade = grade?.toLowerCase() || '';
  
  if (lowerGrade.includes('sahih') || lowerGrade.includes('صحيح') || 
      lowerGrade.includes('authentic') || lowerGrade.includes('sound')) {
    return 'صحيح';
  }
  if (lowerGrade.includes('hasan') || lowerGrade.includes('حسن') || 
      lowerGrade.includes('good') || lowerGrade.includes('fair')) {
    return 'حسن';
  }
  if (lowerGrade.includes('daif') || lowerGrade.includes('ضعيف') || 
      lowerGrade.includes('weak') || lowerGrade.includes('da\'if')) {
    return 'ضعيف';
  }
  
  return 'صحيح'; // Default to sahih for unknown grades
};

export const extractTopicsFromText = (text: string): string[] => {
  const topics = [];
  const lowerText = text.toLowerCase();
  const arabicText = text;
  
  // Arabic topic detection
  if (arabicText.includes('صلاة') || arabicText.includes('الصلاة')) topics.push('الصلاة');
  if (arabicText.includes('إيمان') || arabicText.includes('الإيمان')) topics.push('الإيمان');
  if (arabicText.includes('زكاة') || arabicText.includes('الزكاة')) topics.push('الزكاة');
  if (arabicText.includes('صوم') || arabicText.includes('الصوم')) topics.push('الصوم');
  if (arabicText.includes('حج') || arabicText.includes('الحج')) topics.push('الحج');
  if (arabicText.includes('نكاح') || arabicText.includes('زواج')) topics.push('الأسرة');
  if (arabicText.includes('علم') || arabicText.includes('العلم')) topics.push('العلم');
  if (arabicText.includes('أخلاق') || arabicText.includes('الأخلاق')) topics.push('الأخلاق');
  if (arabicText.includes('نية') || arabicText.includes('النية')) topics.push('النية');
  if (arabicText.includes('رحمة') || arabicText.includes('الرحمة')) topics.push('الرحمة');
  
  // English topic detection
  if (lowerText.includes('prayer') || lowerText.includes('salah')) topics.push('Prayer');
  if (lowerText.includes('faith') || lowerText.includes('belief') || lowerText.includes('iman')) topics.push('Faith');
  if (lowerText.includes('charity') || lowerText.includes('zakat') || lowerText.includes('sadaqah')) topics.push('Charity');
  if (lowerText.includes('fast') || lowerText.includes('ramadan') || lowerText.includes('sawm')) topics.push('Fasting');
  if (lowerText.includes('hajj') || lowerText.includes('pilgrimage')) topics.push('Hajj');
  if (lowerText.includes('marriage') || lowerText.includes('family')) topics.push('Family');
  if (lowerText.includes('knowledge') || lowerText.includes('learn')) topics.push('Knowledge');
  if (lowerText.includes('manners') || lowerText.includes('behavior') || lowerText.includes('conduct')) topics.push('Manners');
  
  return topics.length > 0 ? [...new Set(topics)] : ['عام'];
};

export const extractArabicText = (text: string): string => {
  const arabicPatterns = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  
  if (arabicPatterns.test(text)) {
    return text;
  }
  
  return 'النص العربي متوفر في المصدر الأصلي';
};

export const performLocalSearch = (query: string, source?: string, grade?: string): HadithApiResponse[] => {
  const searchTerm = query.toLowerCase().trim();
  
  let results = FALLBACK_HADITHS.filter(hadith => {
    const textMatch = hadith.text.toLowerCase().includes(searchTerm) || hadith.text.includes(searchTerm);
    const narratorMatch = hadith.narrator.toLowerCase().includes(searchTerm);
    const topicMatch = hadith.topic.some(topic => 
      topic.toLowerCase().includes(searchTerm) || topic.includes(searchTerm)
    );
    const sourceMatch = hadith.source.includes(searchTerm);
    
    return textMatch || narratorMatch || topicMatch || sourceMatch;
  });

  if (source && source !== 'الكل' && source !== 'All') {
    results = results.filter(hadith => 
      hadith.source.toLowerCase().includes(source.toLowerCase()) ||
      hadith.source.includes(source)
    );
  }
  
  if (grade && grade !== 'الكل' && grade !== 'All') {
    results = results.filter(hadith => hadith.grade === grade);
  }

  // If no results found, return a broader search
  if (results.length === 0 && searchTerm.length > 0) {
    results = FALLBACK_HADITHS.filter(hadith => {
      // Try partial word matching
      const words = searchTerm.split(' ');
      return words.some(word => 
        word.length > 2 && (
          hadith.text.includes(word) || 
          hadith.narrator.includes(word) ||
          hadith.topic.some(topic => topic.includes(word))
        )
      );
    });
  }

  // Final fallback - return some hadiths
  if (results.length === 0) {
    results = FALLBACK_HADITHS.slice(0, 5);
  }

  return results;
};

// New utility for API error handling
export const handleApiError = (error: any, context: string): void => {
  console.error(`${context} - API Error:`, {
    message: error.message,
    status: error.status,
    timestamp: new Date().toISOString()
  });
};

// Utility to validate API response
export const validateApiResponse = (data: any, expectedFields: string[]): boolean => {
  if (!data) return false;
  
  return expectedFields.every(field => {
    const value = field.split('.').reduce((obj, key) => obj?.[key], data);
    return value !== undefined && value !== null;
  });
};
