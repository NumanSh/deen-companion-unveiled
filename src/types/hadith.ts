
export interface HadithApiResponse {
  id: string;
  text: string;
  narrator: string;
  source: string;
  book: string;
  chapter: string;
  grade: 'صحيح' | 'حسن' | 'ضعيف';
  topic: string[];
}

export interface HadithCollection {
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

// Sunnah.com API interfaces
export interface SunnahCollection {
  collection: {
    name: string;
    hasArabic: boolean;
    hasEnglish: boolean;
  }[];
}

export interface SunnahBook {
  book: {
    name: string;
    arabicName: string;
    id: number;
    numberOfHadith: number;
  }[];
}

export interface SunnahHadith {
  hadith: {
    hadithNumber: string;
    englishNarrator: string;
    hadithEnglish: string;
    hadithArabic: string;
    englishGrade: string;
    arabicGrade: string;
    reference: {
      book: string;
      hadith: string;
    };
  }[];
}
