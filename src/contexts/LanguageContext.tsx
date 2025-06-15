
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Dashboard and progress
    'progress-analytics': 'Progress Analytics',
    'day-streak': 'Day Streak',
    'minutes-read': 'Minutes Read',
    'surahs-read': 'Surahs Read',
    'total-dhikr': 'Total Dhikr',
    'weekly-activity': 'Weekly Activity',
    'week': 'Week',
    'month': 'Month',
    'year': 'Year',
    'dhikr-count': 'Dhikr Count',
    'reading-min': 'Reading (min)',
    'activity-distribution': 'Activity Distribution',
    'recent-achievements': 'Recent Achievements',
    '7-day-streak': '7-Day Streak!',
    'keep-up-consistency': 'Keep up the consistency!',
    'chapter-complete': 'Chapter Complete!',
    'finished-al-fatihah': 'Finished Al-Fatihah',
    'daily-goal-met': 'Daily Goal Met!',
    '100-dhikr-today': '100 Dhikr completed today',
    'dhikr': 'Dhikr',
    'quran-reading': 'Quran Reading',
    'duas': 'Duas',
    
    // Goals and challenges
    'daily-islamic-goals': 'Daily Islamic Goals',
    'progress-colon': 'Progress:',
    'points': 'points',
    'complete-5-daily-prayers': 'Complete 5 Daily Prayers',
    'perform-obligatory-prayers': 'Perform all obligatory prayers on time',
    'read-1-page-of-quran': 'Read 1 Page of Quran',
    'daily-quran-recitation': 'Daily Quran recitation for spiritual growth',
    'morning-evening-adhkar': 'Morning & Evening Adhkar',
    'recite-morning-evening': 'Recite morning and evening remembrances',
    'give-charity-sadaqah': 'Give Charity (Sadaqah)',
    'any-form-charity': 'Any form of charity, no matter how small',
    'seek-forgiveness-istighfar': 'Seek Forgiveness (Istighfar)',
    'say-astaghfirullah-100-times': 'Say "Astaghfirullah" 100 times',
    'all-goals-completed': 'All Goals Completed!',
    'may-allah-accept-efforts': 'May Allah accept your efforts',
    'add-custom-goal': 'Add Custom Goal'
  },
  ar: {
    // Dashboard and progress
    'progress-analytics': 'تحليلات التقدم',
    'day-streak': 'أيام متتالية',
    'minutes-read': 'دقائق القراءة',
    'surahs-read': 'السور المقروءة',
    'total-dhikr': 'إجمالي الذكر',
    'weekly-activity': 'النشاط الأسبوعي',
    'week': 'أسبوع',
    'month': 'شهر',
    'year': 'سنة',
    'dhikr-count': 'عدد الأذكار',
    'reading-min': 'القراءة (دقيقة)',
    'activity-distribution': 'توزيع النشاط',
    'recent-achievements': 'الإنجازات الأخيرة',
    '7-day-streak': 'سبعة أيام متتالية!',
    'keep-up-consistency': 'حافظ على الاستمرارية!',
    'chapter-complete': 'اكتمال السورة!',
    'finished-al-fatihah': 'انتهيت من الفاتحة',
    'daily-goal-met': 'تحقيق الهدف اليومي!',
    '100-dhikr-today': 'مائة ذكر اليوم',
    'dhikr': 'ذكر',
    'quran-reading': 'قراءة القرآن',
    'duas': 'أدعية',
    
    // Goals and challenges
    'daily-islamic-goals': 'الأهداف الإسلامية اليومية',
    'progress-colon': 'التقدم:',
    'points': 'نقاط',
    'complete-5-daily-prayers': 'أكمل الصلوات الخمس',
    'perform-obligatory-prayers': 'أدِّ جميع الصلوات المفروضة في وقتها',
    'read-1-page-of-quran': 'اقرأ صفحة من القرآن',
    'daily-quran-recitation': 'تلاوة القرآن اليومية للنمو الروحي',
    'morning-evening-adhkar': 'أذكار الصباح والمساء',
    'recite-morning-evening': 'اتل أذكار الصباح والمساء',
    'give-charity-sadaqah': 'تصدق (صدقة)',
    'any-form-charity': 'أي شكل من أشكال الصدقة مهما كان صغيراً',
    'seek-forgiveness-istighfar': 'استغفر (استغفار)',
    'say-astaghfirullah-100-times': 'قل "أستغفر الله" مائة مرة',
    'all-goals-completed': 'تم إنجاز جميع الأهداف!',
    'may-allah-accept-efforts': 'تقبل الله جهودكم',
    'add-custom-goal': 'أضف هدفاً مخصصاً'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
