
import { HadithApiResponse } from '../types/hadith';
import { FALLBACK_HADITHS } from '../data/hadithData';

// Utility function to provide basic English translation
export const translateToEnglish = (arabicText: string): string => {
  const translations: { [key: string]: string } = {
    'إنما الأعمال بالنيات وإنما لكل امرئ ما نوى': 'Actions are but by intention and every man shall have only that which he intended.',
    'من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت': 'Whoever believes in Allah and the Last Day should speak good or remain silent.',
    'لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه': 'None of you believes until he loves for his brother what he loves for himself.',
    'المسلم من سلم المسلمون من لسانه ويده': 'The Muslim is one from whose tongue and hand Muslims are safe.',
    'من لا يرحم الناس لا يرحمه الله': 'Whoever does not show mercy to people, Allah will not show mercy to him.'
  };
  
  return translations[arabicText] || 'English translation available in full version';
};

// Utility functions
export const getCollectionDisplayName = (collection: string): string => {
  const names: { [key: string]: string } = {
    'bukhari': 'صحيح البخاري',
    'muslim': 'صحيح مسلم',
    'abudawud': 'سنة أبي داود',
    'tirmidhi': 'جامع الترمذي',
    'nasai': 'سنة النسائي',
    'ibnmajah': 'سنة ابن ماجه',
    'malik': 'مروة مالك',
    'riyadussalihin': 'رائد الصالحين',
    'adab': 'الأخلاق',
    'bulugh': 'البلوغ'
  };
  return names[collection] || collection;
};

export const mapGradeToArabic = (grade: string): 'صحيح' | 'حسن' | 'ضعيف' => {
  const lowerGrade = grade?.toLowerCase() || '';
  
  if (lowerGrade.includes('sahih') || lowerGrade.includes('صحيح') || lowerGrade.includes('authentic')) {
    return 'صحيح';
  }
  if (lowerGrade.includes('hasan') || lowerGrade.includes('حسن') || lowerGrade.includes('good')) {
    return 'حسن';
  }
  if (lowerGrade.includes('daif') || lowerGrade.includes('ضعيف') || lowerGrade.includes('weak')) {
    return 'ضعيف';
  }
  
  return 'صحيح'; // Default to sahih
};

export const extractTopicsFromText = (text: string): string[] => {
  const topics = [];
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('prayer') || lowerText.includes('salah') || lowerText.includes('pray')) topics.push('Prayer');
  if (lowerText.includes('faith') || lowerText.includes('belief') || lowerText.includes('iman')) topics.push('Faith');
  if (lowerText.includes('charity') || lowerText.includes('zakat') || lowerText.includes('sadaqah')) topics.push('Charity');
  if (lowerText.includes('fast') || lowerText.includes('ramadan') || lowerText.includes('sawm')) topics.push('Fasting');
  if (lowerText.includes('hajj') || lowerText.includes('pilgrimage')) topics.push('Hajj');
  if (lowerText.includes('marriage') || lowerText.includes('family')) topics.push('Family');
  if (lowerText.includes('knowledge') || lowerText.includes('learn')) topics.push('Knowledge');
  if (lowerText.includes('manners') || lowerText.includes('behavior') || lowerText.includes('conduct')) topics.push('Manners');
  
  return topics.length > 0 ? topics : ['General'];
};

export const extractArabicText = (text: string): string => {
  // This is a simplified approach - in a real implementation, 
  // you'd want proper Arabic text from the API
  const arabicPatterns = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  
  if (arabicPatterns.test(text)) {
    return text;
  }
  
  // Return a placeholder if no Arabic text is found
  return 'النص العربي متوفر في المصدر الأصلي';
};

export const performLocalSearch = (query: string, source?: string, grade?: string): HadithApiResponse[] => {
  const searchTerm = query.toLowerCase().trim();
  
  let results = FALLBACK_HADITHS.filter(hadith => {
    const textMatch = hadith.text.toLowerCase().includes(searchTerm);
    const narratorMatch = hadith.narrator.toLowerCase().includes(searchTerm);
    const topicMatch = hadith.topic.some(topic => topic.toLowerCase().includes(searchTerm));
    
    return textMatch || narratorMatch || topicMatch;
  });

  if (source && source !== 'الكل' && source !== 'All') {
    results = results.filter(hadith => hadith.source.toLowerCase().includes(source.toLowerCase()));
  }
  
  if (grade && grade !== 'الكل' && grade !== 'All') {
    results = results.filter(hadith => hadith.grade === grade);
  }

  // If no results found, return all hadiths
  if (results.length === 0) {
    results = FALLBACK_HADITHS;
  }

  return results;
};
