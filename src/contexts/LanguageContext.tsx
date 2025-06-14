
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
    home: 'الرئيسية',
    explore: 'استكشف',
    notes: 'الملاحظات',
    
    // Common
    save: 'حفظ',
    cancel: 'إلغاء',
    add: 'إضافة',
    edit: 'تعديل',
    delete: 'حذف',
    search: 'بحث',
    loading: 'جارٍ التحميل...',
    complete: 'مكتمل',
    incomplete: 'غير مكتمل',
    yes: 'نعم',
    no: 'لا',
    ok: 'موافق',
    done: 'تم',
    continue: 'متابعة',
    back: 'رجوع',
    next: 'التالي',
    previous: 'السابق',
    close: 'إغلاق',
    view: 'عرض',
    all: 'الكل',
    
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
    
    // Prayer times
    'todays-prayers': 'صلوات اليوم',
    'prayers-remaining': 'صلوات متبقية',
    'mark-complete': 'تحديد كمكتمل',
    fajr: 'الفجر',
    dhuhr: 'الظهر',
    asr: 'العصر',
    maghrib: 'المغرب',
    isha: 'العشاء',
    
    // Islamic content
    'islamic-quote-day': 'اقتباس إسلامي لليوم',
    'morning-evening-adhkar': 'أذكار الصباح والمساء',
    'recite-morning-evening': 'تلاوة أذكار الصباح والمساء',
    points: 'نقاط',
    'complete-daily-prayers': 'أكمل الصلوات الخمس',
    'perform-obligatory-prayers': 'أدي جميع الصلوات الواجبة في الوقت',
    'read-page-quran': 'اقرأ صفحة من القرآن',
    'daily-quran-recitation': 'تلاوة القرآن اليومية',
    'give-charity-sadaqah': 'تصدق (الصدقة)',
    'any-form-charity': 'أي شكل من أشكال الصدقة، حتى الابتسامة',
    'seek-forgiveness-istighfar': 'اطلب المغفرة (الاستغفار)',
    'say-astaghfirullah-100-times': 'قل "أستغفر الله" ١٠٠ مرة',
    
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
    remaining: 'المتبقي',
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
    
    // Habit Builder
    'islamic-habit-builder': 'بناء العادات الإسلامية',
    'overall-level': 'المستوى العام',
    'habits-completed-today': 'عادات مكتملة اليوم',
    'habit-completed': 'تم إنجاز العادة!',
    'streak-days': 'أيام متتالية',
    'level-up': 'ارتقاء في المستوى!',
    'reached-level': 'وصل إلى المستوى',
    'add-new-islamic-habit': 'إضافة عادة إسلامية جديدة',
    'most-beloved-deeds': '"أحب الأعمال إلى الله أدومها وإن قل." - النبي محمد (ص)',
    'recent-achievement': 'إنجاز حديث',
    'consistent-reader': 'قارئ مثابر - قرأ القرآن لمدة ١٠ أيام متتالية!',
    'morning-adhkar': 'أذكار الصباح',
    'recite-morning-remembrance': 'تلاوة أذكار الصباح',
    'read-quran': 'قراءة القرآن',
    'read-one-page-daily': 'اقرأ صفحة واحدة على الأقل من القرآن يومياً',
    'make-dua-parents': 'ادع للوالدين',
    'remember-parents-prayers': 'تذكر الوالدين في الصلوات اليومية',
    worship: 'العبادة',
    knowledge: 'المعرفة',
    character: 'الأخلاق',
    health: 'الصحة',
    
    // Bottom navigation
    'quran-tab': 'القرآن',
    'explore-tab': 'استكشف',
    'home-tab': 'الرئيسية',
    'duas-tab': 'الأدعية',
    'notes-tab': 'الملاحظات',
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
    home: 'Home',
    explore: 'Explore',
    notes: 'Notes',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    search: 'Search',
    loading: 'Loading...',
    complete: 'Complete',
    incomplete: 'Incomplete',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    done: 'Done',
    continue: 'Continue',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    view: 'View',
    all: 'All',
    
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
    
    // Prayer times
    'todays-prayers': "Today's Prayers",
    'prayers-remaining': 'prayers remaining',
    'mark-complete': 'Mark Complete',
    fajr: 'Fajr',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha',
    
    // Islamic content
    'islamic-quote-day': 'Islamic Quote of the Day',
    'morning-evening-adhkar': 'Morning & Evening Adhkar',
    'recite-morning-evening': 'Recite morning and evening remembrance',
    points: 'points',
    'complete-daily-prayers': 'Complete 5 Daily Prayers',
    'perform-obligatory-prayers': 'Perform all obligatory prayers on time',
    'read-page-quran': 'Read 1 Page of Quran',
    'daily-quran-recitation': 'Daily Quran recitation',
    'give-charity-sadaqah': 'Give Charity (Sadaqah)',
    'any-form-charity': 'Any form of charity, even a smile',
    'seek-forgiveness-istighfar': 'Seek Forgiveness (Istighfar)',
    'say-astaghfirullah-100-times': 'Say "Astaghfirullah" 100 times',
    
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
    remaining: 'Remaining',
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
    
    // Habit Builder
    'islamic-habit-builder': 'Islamic Habit Builder',
    'overall-level': 'Overall Level',
    'habits-completed-today': 'habits completed today',
    'habit-completed': 'Habit Completed!',
    'streak-days': 'days',
    'level-up': 'Level Up!',
    'reached-level': 'reached level',
    'add-new-islamic-habit': 'Add New Islamic Habit',
    'most-beloved-deeds': '"The most beloved of deeds to Allah are those that are most consistent, even if they are small." - Prophet Muhammad (PBUH)',
    'recent-achievement': 'Recent Achievement',
    'consistent-reader': 'Consistent Reader - Read Quran for 10 days straight!',
    'morning-adhkar': 'Morning Adhkar',
    'recite-morning-remembrance': 'Recite morning remembrance of Allah',
    'read-quran': 'Read Quran',
    'read-one-page-daily': 'Read at least one page of Quran daily',
    'make-dua-parents': 'Make Dua for Parents',
    'remember-parents-prayers': 'Remember parents in daily prayers',
    worship: 'worship',
    knowledge: 'knowledge',
    character: 'character',
    health: 'health',
    
    // Bottom navigation
    'quran-tab': 'Quran',
    'explore-tab': 'Explore',
    'home-tab': 'Home',
    'duas-tab': 'Duas',
    'notes-tab': 'Notes',
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
