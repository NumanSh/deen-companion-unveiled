
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ar: {
    // Navigation
    dashboard: 'لوحة التحكم',
    quran: 'القرآن',
    hadith: 'الحديث',
    duas: 'الأدعية',
    adhkar: 'الأذكار',
    dhikr: 'الذكر',
    habits: 'العادات',
    discover: 'اكتشف',
    saved: 'المحفوظات',
    progress: 'التقدم',
    reminders: 'التذكيرات',
    settings: 'الإعدادات',
    calendar: 'التقويم',
    books: 'الكتب',
    
    // Common
    save: 'حفظ',
    cancel: 'إلغاء',
    add: 'إضافة',
    edit: 'تعديل',
    delete: 'حذف',
    search: 'بحث',
    loading: 'جارٍ التحميل...',
    
    // Settings
    'app-name': 'رفيق الدين',
    'customize-journey': 'خصص رحلتك الروحية',
    location: 'الموقع',
    'current-location': 'الموقع الحالي',
    'update-location': 'تحديث الموقع',
    notifications: 'الإشعارات',
    'prayer-notifications': 'إشعارات الصلاة',
    'prayer-notifications-desc': 'احصل على إشعارات أوقات الصلاة',
    'adhan-sound': 'صوت الأذان',
    'adhan-sound-desc': 'تشغيل الأذان لأوقات الصلاة',
    'general-notifications': 'الإشعارات العامة',
    'general-notifications-desc': 'تحديثات التطبيق والتذكيرات',
    appearance: 'المظهر',
    'dark-mode': 'الوضع المظلم',
    'dark-mode-desc': 'تبديل المظهر المظلم',
    language: 'اللغة',
    'language-desc': 'تغيير لغة التطبيق',
    'about-app': 'حول رفيق الدين',
    version: 'الإصدار',
    'app-description': 'رفيقك للممارسات الإسلامية والنمو الروحي',
    
    // Languages
    arabic: 'العربية',
    english: 'English',
    
    // Dream Journal
    'islamic-dream-journal': 'يومية الأحلام الإسلامية',
    'add-dream': 'إضافة حلم',
    'describe-dream': 'صف حلمك:',
    'dream-placeholder': 'حلمت أن...',
    'save-dream': 'حفظ الحلم',
    'islamic-perspective': 'المنظور الإسلامي للأحلام',
    'dream-guidance': 'قال النبي (ص): "الرؤيا الصالحة من الله، والحلم من الشيطان." سجل أحلامك واطلب تفسيرها من خلال المعرفة الإسلامية.',
    'dream-added': 'تم إضافة الحلم',
    'dream-recorded': 'تم تسجيل حلمك في يوميتك.',
    dream: 'الحلم:',
    reflection: 'التأمل:',
    'no-dreams': 'لم يتم تسجيل أحلام بعد. ابدأ يومية أحلامك الروحية!',
    
    // Charity Tracker
    'charity-impact-tracker': 'متتبع أثر الصدقة',
    'record-donation': 'تسجيل تبرع جديد',
    'amount': 'المبلغ ($)',
    'cause-purpose': 'السبب/الغرض',
    'record-donation-btn': 'تسجيل التبرع',
    'monthly-goal': 'الهدف الشهري',
    'goal-achieved': '🎉 تم تحقيق الهدف! بارك الله فيك.',
    'remaining-goal': '% متبقي للوصول إلى هدفك',
    'people-helped': 'الأشخاص المساعدون',
    'acts-kindness': 'أعمال الخير',
    'this-month': 'هذا الشهر',
    'total-donated': 'إجمالي التبرعات',
    'recent-donations': 'التبرعات الأخيرة',
    'charity-quote': '"ظل المؤمن يوم القيامة صدقته." - النبي محمد (ص)',
    'donation-recorded': 'تم تسجيل التبرع! 🌟',
    
    // Quranic Word Learning
    'quranic-word-learning': 'تعلم الكلمات القرآنية',
    words: 'كلمات',
    'reveal-meaning': 'كشف المعنى',
    'mark-learned': 'اعتبر كمتعلم',
    learned: '✅ متعلم',
    previous: 'السابق',
    next: 'التالي',
    remaining: 'المتبقي',
    complete: 'مكتمل',
    'word-learned': 'تم تعلم الكلمة! 🎉',
    example: 'مثال:',
    
    // Spiritual Journal
    'spiritual-journal': 'يومية روحية',
    'new-entry': 'مدخل جديد',
    'search-journal': 'البحث في اليومية...',
    'todays-reflection-prompt': 'موجه التأمل اليوم',
    'entry-title': 'عنوان المدخل...',
    'write-reflections': 'اكتب تأملاتك الروحية هنا...',
    'mood': 'المزاج',
    'tags': 'الوسوم',
    'add-tag': 'إضافة وسم...',
    'save-entry': 'حفظ المدخل',
    'no-journal-entries': 'لا توجد مدخلات في اليومية بعد',
    'start-spiritual-journaling': 'ابدأ رحلة اليومية الروحية!',
    'incomplete-entry': 'مدخل غير مكتمل',
    'add-title-content': 'يرجى إضافة عنوان ومحتوى لمدخل يوميتك.',
    'entry-saved': 'تم حفظ المدخل',
    'reflection-saved': 'تم حفظ تأملك الروحي في يوميتك.',
    'grateful': 'ممتن',
    'peaceful': 'مطمئن',
    'hopeful': 'مليء بالأمل',
    'reflective': 'متأمل',
    'seeking': 'طالب للهداية',
    'current-prompt': 'المحث الحالي:',
  },
  en: {
    // Navigation
    dashboard: 'Dashboard',
    quran: 'Quran',
    hadith: 'Hadith',
    duas: 'Duas',
    adhkar: 'Adhkar',
    dhikr: 'Dhikr',
    habits: 'Habits',
    discover: 'Discover',
    saved: 'Saved',
    progress: 'Progress',
    reminders: 'Reminders',
    settings: 'Settings',
    calendar: 'Calendar',
    books: 'Books',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    search: 'Search',
    loading: 'Loading...',
    
    // Settings
    'app-name': 'Deen Companion',
    'customize-journey': 'Customize your spiritual journey',
    location: 'Location',
    'current-location': 'Current Location',
    'update-location': 'Update Location',
    notifications: 'Notifications',
    'prayer-notifications': 'Prayer Notifications',
    'prayer-notifications-desc': 'Get notified for prayer times',
    'adhan-sound': 'Adhan Sound',
    'adhan-sound-desc': 'Play Adhan for prayer times',
    'general-notifications': 'General Notifications',
    'general-notifications-desc': 'App updates and reminders',
    appearance: 'Appearance',
    'dark-mode': 'Dark Mode',
    'dark-mode-desc': 'Toggle dark theme',
    language: 'Language',
    'language-desc': 'Change app language',
    'about-app': 'About Deen Companion',
    version: 'Version',
    'app-description': 'Your companion for Islamic practices and spiritual growth',
    
    // Languages
    arabic: 'العربية',
    english: 'English',
    
    // Dream Journal
    'islamic-dream-journal': 'Islamic Dream Journal',
    'add-dream': 'Add Dream',
    'describe-dream': 'Describe your dream:',
    'dream-placeholder': 'I dreamed that...',
    'save-dream': 'Save Dream',
    'islamic-perspective': 'Islamic Perspective on Dreams',
    'dream-guidance': 'The Prophet (PBUH) said: "Good dreams are from Allah, and bad dreams are from Satan." Record your dreams and seek their interpretation through Islamic knowledge.',
    'dream-added': 'Dream Added',
    'dream-recorded': 'Your dream has been recorded in your journal.',
    dream: 'Dream:',
    reflection: 'Reflection:',
    'no-dreams': 'No dreams recorded yet. Start your spiritual dream journal!',
    
    // Charity Tracker
    'charity-impact-tracker': 'Charity Impact Tracker',
    'record-donation': 'Record New Donation',
    'amount': 'Amount ($)',
    'cause-purpose': 'Cause/Purpose',
    'record-donation-btn': 'Record Donation',
    'monthly-goal': 'Monthly Goal',
    'goal-achieved': '🎉 Goal achieved! May Allah reward you.',
    'remaining-goal': '% remaining to reach your goal',
    'people-helped': 'People Helped',
    'acts-kindness': 'Acts of Kindness',
    'this-month': 'This Month',
    'total-donated': 'Total Donated',
    'recent-donations': 'Recent Donations',
    'charity-quote': '"The believer\'s shade on the Day of Resurrection will be his charity." - Prophet Muhammad (PBUH)',
    'donation-recorded': 'Donation Recorded! 🌟',
    
    // Quranic Word Learning
    'quranic-word-learning': 'Quranic Word Learning',
    words: 'words',
    'reveal-meaning': 'Reveal Meaning',
    'mark-learned': 'Mark as Learned',
    learned: '✅ Learned',
    previous: 'Previous',
    next: 'Next',
    remaining: 'Remaining',
    complete: 'Complete',
    'word-learned': 'Word Learned! 🎉',
    example: 'Example:',
    
    // Spiritual Journal
    'spiritual-journal': 'Spiritual Journal',
    'new-entry': 'New Entry',
    'search-journal': 'Search your journal...',
    'todays-reflection-prompt': 'Today\'s Reflection Prompt',
    'entry-title': 'Entry title...',
    'write-reflections': 'Write your spiritual reflections here...',
    'mood': 'Mood',
    'tags': 'Tags',
    'add-tag': 'Add tag...',
    'save-entry': 'Save Entry',
    'no-journal-entries': 'No journal entries yet',
    'start-spiritual-journaling': 'Start your spiritual journaling journey!',
    'incomplete-entry': 'Incomplete Entry',
    'add-title-content': 'Please add both a title and content to your journal entry.',
    'entry-saved': 'Entry Saved',
    'reflection-saved': 'Your spiritual reflection has been saved to your journal.',
    'grateful': 'Grateful',
    'peaceful': 'Peaceful',
    'hopeful': 'Hopeful',
    'reflective': 'Reflective',
    'seeking': 'Seeking Guidance',
    'current-prompt': 'Current Prompt:',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar'); // Arabic as default

  useEffect(() => {
    // Apply RTL/LTR to document
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
