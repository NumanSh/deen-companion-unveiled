
import { HadithApiResponse } from '../types/hadith';

// Sunnah.com API base URL
export const SUNNAH_API_BASE = 'https://api.sunnah.com/v1';

// Available collections on Sunnah.com
export const SUNNAH_COLLECTIONS = [
  'bukhari', 'muslim', 'abudawud', 'tirmidhi', 'nasai', 'ibnmajah',
  'malik', 'riyadussalihin', 'adab', 'bulugh'
];

// Enhanced fallback data with more examples
export const FALLBACK_HADITHS: HadithApiResponse[] = [
  {
    id: 'fallback-1',
    text: 'إنما الأعمال بالنيات وإنما لكل امرئ ما نوى',
    narrator: 'عمر بن الخطاب رضي الله عنه',
    source: 'صحيح البخاري',
    book: 'كتاب بدء الوحي',
    chapter: 'كيف كان بدء الوحي',
    grade: 'صحيح',
    topic: ['النية', 'الأعمال']
  },
  {
    id: 'fallback-2',
    text: 'من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت',
    narrator: 'أبو هريرة رضي الله عنه',
    source: 'صحيح مسلم',
    book: 'كتاب الإيمان',
    chapter: 'إكرام الجار',
    grade: 'صحيح',
    topic: ['الكلام', 'الآداب']
  },
  {
    id: 'fallback-3',
    text: 'لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه',
    narrator: 'أنس بن مالك رضي الله عنه',
    source: 'صحيح البخاري',
    book: 'كتاب الإيمان',
    chapter: 'من الإيمان أن يحب لأخيه ما يحب لنفسه',
    grade: 'صحيح',
    topic: ['الإيمان', 'الأخوة']
  },
  {
    id: 'fallback-4',
    text: 'المسلم من سلم المسلمون من لسانه ويده',
    narrator: 'عبد الله بن عمرو رضي الله عنهما',
    source: 'صحيح البخاري',
    book: 'كتاب الإيمان',
    chapter: 'المسلم من سلم المسلمون من لسانه ويده',
    grade: 'صحيح',
    topic: ['الإسلام', 'الأخلاق']
  },
  {
    id: 'fallback-5',
    text: 'من لا يرحم الناس لا يرحمه الله',
    narrator: 'جرير بن عبد الله رضي الله عنه',
    source: 'صحيح مسلم',
    book: 'كتاب الفضائل',
    chapter: 'رحمة النبي صلى الله عليه وسلم الصبيان والعيال',
    grade: 'صحيح',
    topic: ['الرحمة', 'الأخلاق']
  }
];
