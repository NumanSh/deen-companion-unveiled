import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  t: (key: string, params?: Record<string, string>) => string;
  isRTL: boolean;
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
    'add-custom-goal': 'Add Custom Goal',

    // Duas section translations
    'daily-duas': 'Daily Duas',
    'morning-dua': 'Morning Dua',
    'evening-dua': 'Evening Dua',
    'morning-dua-translation': 'We have entered the morning and the kingdom belongs to Allah, and all praise is due to Allah',
    'evening-dua-translation': 'We have entered the evening and the kingdom belongs to Allah, and all praise is due to Allah',
    'food-drink': 'Food & Drink',
    'before-eating': 'Before Eating',
    'after-eating': 'After Eating',
    'before-eating-translation': 'In the name of Allah',
    'after-eating-translation': 'Praise be to Allah who fed me this and provided it for me without any power or strength from me',
    'travel': 'Travel',
    'when-starting-journey': 'When Starting Journey',
    'travel-dua-translation': 'Glory be to Him who has subjected this to us, and we could never have it (by our efforts). And to our Lord, surely, must we return',
    'protection': 'Protection',
    'ayat-kursi': 'Ayat ul-Kursi',
    'ayat-kursi-translation': 'Allah - there is no deity except Him, the Ever-Living, the Self-Sustaining',
    'daily-duas-supplications': 'Daily Duas & Supplications',
    'search-duas-placeholder': 'Search duas...',
    'transliteration': 'Transliteration',
    'translation': 'Translation',
    'reference': 'Reference',
    'show-less': 'Show Less',
    'show-translation': 'Show Translation',
    'no-duas-found': 'No duas found matching your search',
    'added-to-bookmarks': 'Added to Bookmarks',
    'removed-from-bookmarks': 'Removed from Bookmarks',
    'dua-saved-bookmarks': 'Dua saved to bookmarks',
    'dua-removed-bookmarks': 'Dua removed from bookmarks',
    'copy-arabic-text': 'Copy Arabic Text',
    'click-to-copy': 'Click to copy',
    'dua-arabic-copied': 'Arabic text copied to clipboard',

    // Settings translations
    'settings': 'Settings',
    'location': 'Location',
    'current-location': 'Current Location',
    'update-location': 'Update Location',
    'notifications': 'Notifications',
    'prayer-notifications': 'Prayer Notifications',
    'prayer-notifications-desc': 'Get notified for prayer times',
    'adhan-sound': 'Adhan Sound',
    'adhan-sound-desc': 'Play adhan sound for prayers',
    'general-notifications': 'General Notifications',
    'general-notifications-desc': 'Receive app notifications',
    'appearance': 'Appearance',
    'dark-mode': 'Dark Mode',
    'dark-mode-desc': 'Switch to dark theme',
    'language': 'Language',
    'language-desc': 'Choose your preferred language',
    'arabic': 'العربية',
    'english': 'English',
    'about-app': 'About App',
    'version': 'Version',
    'app-description': 'Your comprehensive Islamic companion',
    'customize-journey': 'Customize your spiritual journey',

    // Quranic Word Learning translations
    'quranic-word-learning': 'Quranic Word Learning',
    'lord-master-sustainer': 'Lord, Master, Sustainer',
    'lord-of-all-worlds': 'Lord of all worlds',
    'most-gracious': 'Most Gracious',
    'most-gracious-merciful': 'Most Gracious, Most Merciful',
    'prayer': 'Prayer',
    'establish-prayer': 'Establish prayer',
    'obligatory-charity': 'Obligatory charity',
    'give-zakah': 'Give Zakah',
    'praise': 'Praise',
    'praise-be-allah': 'Praise be to Allah',
    'word-learned': 'Word Learned!',
    'youve-learned': "You've learned",
    'progress': 'Progress',
    'words': 'words',
    'example': 'Example',
    'reveal-meaning': 'Reveal Meaning',
    'learned': 'Learned',
    'mark-learned': 'Mark as Learned',
    'previous': 'Previous',
    'of': 'of',
    'next': 'Next',
    'remaining': 'Remaining',
    'complete': 'Complete',

    // Tab navigation
    'dashboard': 'Dashboard',
    'quran': 'Quran',
    'study-tools': 'Study Tools',
    'hadith': 'Hadith',
    'adhkar': 'Adhkar',
    'habits': 'Habits',
    'saved': 'Saved',
    'reminders': 'Reminders'
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
    'add-custom-goal': 'أضف هدفاً مخصصاً',

    // Duas section translations  
    'daily-duas': 'أدعية يومية',
    'morning-dua': 'دعاء الصباح',
    'evening-dua': 'دعاء المساء',
    'morning-dua-translation': 'أصبحنا وأصبح الملك لله والحمد لله',
    'evening-dua-translation': 'أمسينا وأمسى الملك لله والحمد لله',
    'food-drink': 'الطعام والشراب',
    'before-eating': 'قبل الأكل',
    'after-eating': 'بعد الأكل',
    'before-eating-translation': 'بسم الله',
    'after-eating-translation': 'الحمد لله الذي أطعمني هذا ورزقنيه من غير حول مني ولا قوة',
    'travel': 'السفر',
    'when-starting-journey': 'عند بدء الرحلة',
    'travel-dua-translation': 'سبحان الذي سخر لنا هذا وما كنا له مقرنين وإنا إلى ربنا لمنقلبون',
    'protection': 'الحماية',
    'ayat-kursi': 'آية الكرسي',
    'ayat-kursi-translation': 'الله لا إله إلا هو الحي القيوم',
    'daily-duas-supplications': 'الأدعية والأذكار اليومية',
    'search-duas-placeholder': 'البحث في الأدعية...',
    'transliteration': 'النقل الصوتي',
    'translation': 'الترجمة',
    'reference': 'المرجع',
    'show-less': 'إظهار أقل',
    'show-translation': 'إظهار الترجمة',
    'no-duas-found': 'لم يتم العثور على أدعية تطابق بحثك',
    'added-to-bookmarks': 'تمت الإضافة للمفضلة',
    'removed-from-bookmarks': 'تمت الإزالة من المفضلة',
    'dua-saved-bookmarks': 'تم حفظ الدعاء في المفضلة',
    'dua-removed-bookmarks': 'تم حذف الدعاء من المفضلة',
    'copy-arabic-text': 'نسخ النص العربي',
    'click-to-copy': 'اضغط للنسخ',
    'dua-arabic-copied': 'تم نسخ النص العربي',

    // Settings translations
    'settings': 'الإعدادات',
    'location': 'الموقع',
    'current-location': 'الموقع الحالي',
    'update-location': 'تحديث الموقع',
    'notifications': 'الإشعارات',
    'prayer-notifications': 'إشعارات الصلاة',
    'prayer-notifications-desc': 'احصل على إشعارات أوقات الصلاة',
    'adhan-sound': 'صوت الأذان',
    'adhan-sound-desc': 'تشغيل صوت الأذان للصلوات',
    'general-notifications': 'الإشعارات العامة',
    'general-notifications-desc': 'تلقي إشعارات التطبيق',
    'appearance': 'المظهر',
    'dark-mode': 'الوضع المظلم',
    'dark-mode-desc': 'التبديل إلى الثيم المظلم',
    'language': 'اللغة',
    'language-desc': 'اختر لغتك المفضلة',
    'arabic': 'العربية',
    'english': 'English',
    'about-app': 'حول التطبيق',
    'version': 'الإصدار',
    'app-description': 'رفيقك الإسلامي الشامل',
    'customize-journey': 'خصص رحلتك الروحية',

    // Quranic Word Learning translations
    'quranic-word-learning': 'تعلم الكلمات القرآنية',
    'lord-master-sustainer': 'رب، سيد، رازق',
    'lord-of-all-worlds': 'رب العالمين',
    'most-gracious': 'الرحمن',
    'most-gracious-merciful': 'الرحمن الرحيم',
    'prayer': 'صلاة',
    'establish-prayer': 'أقيموا الصلاة',
    'obligatory-charity': 'زكاة واجبة',
    'give-zakah': 'آتوا الزكاة',
    'praise': 'حمد',
    'praise-be-allah': 'الحمد لله',
    'word-learned': 'تم تعلم الكلمة!',
    'youve-learned': 'لقد تعلمت',
    'progress': 'التقدم',
    'words': 'كلمات',
    'example': 'مثال',
    'reveal-meaning': 'اكشف المعنى',
    'learned': 'تم التعلم',
    'mark-learned': 'علم كمتعلم',
    'previous': 'السابق',
    'of': 'من',
    'next': 'التالي',
    'remaining': 'المتبقي',
    'complete': 'مكتمل',

    // Tab navigation
    'dashboard': 'لوحة التحكم',
    'quran': 'القرآن',
    'study-tools': 'أدوات الدراسة',
    'hadith': 'حديث',
    'adhkar': 'أذكار',
    'habits': 'عادات',
    'saved': 'محفوظ',
    'reminders': 'تذكيرات'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const t = (key: string, params?: Record<string, string>): string => {
    let translation = translations[language][key as keyof typeof translations['en']] || key;
    
    // Handle parameter substitution if params are provided
    if (params && typeof translation === 'string') {
      Object.keys(params).forEach(paramKey => {
        translation = translation.replace(`{${paramKey}}`, params[paramKey]);
      });
    }
    
    return translation;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
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
