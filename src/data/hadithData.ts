
import { HadithApiResponse } from '../types/hadith';

// Updated API configuration based on the GitHub repo
export const HADITH_API_BASE = 'https://api.hadith.gading.dev';
export const SUNNAH_API_BASE = 'https://api.sunnah.com/v1';

// Available collections from the new API
export const HADITH_COLLECTIONS = [
  'abu-dawud', 'ahmad', 'bukhari', 'darimi', 'ibnu-majah', 
  'malik', 'muslim', 'nasai', 'tirmidhi'
];

// Legacy collections for backward compatibility
export const SUNNAH_COLLECTIONS = [
  'bukhari', 'muslim', 'abudawud', 'tirmidhi', 'nasai', 'ibnmajah',
  'malik', 'riyadussalihin', 'adab', 'bulugh'
];

// Enhanced fallback data with more authentic hadiths
export const FALLBACK_HADITHS: HadithApiResponse[] = [
  {
    id: 'fallback-1',
    text: 'إنما الأعمال بالنيات وإنما لكل امرئ ما نوى، فمن كانت هجرته إلى الله ورسوله فهجرته إلى الله ورسوله، ومن كانت هجرته لدنيا يصيبها أو امرأة ينكحها فهجرته إلى ما هاجر إليه',
    narrator: 'عمر بن الخطاب رضي الله عنه',
    source: 'صحيح البخاري',
    book: 'كتاب بدء الوحي',
    chapter: 'كيف كان بدء الوحي إلى رسول الله صلى الله عليه وسلم',
    grade: 'صحيح',
    topic: ['النية', 'الأعمال', 'الهجرة']
  },
  {
    id: 'fallback-2',
    text: 'من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت، ومن كان يؤمن بالله واليوم الآخر فليكرم جاره، ومن كان يؤمن بالله واليوم الآخر فليكرم ضيفه',
    narrator: 'أبو هريرة رضي الله عنه',
    source: 'صحيح مسلم',
    book: 'كتاب الإيمان',
    chapter: 'الحث على إكرام الجار والضيف',
    grade: 'صحيح',
    topic: ['الكلام', 'الآداب', 'الجار', 'الضيافة']
  },
  {
    id: 'fallback-3',
    text: 'لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه',
    narrator: 'أنس بن مالك رضي الله عنه',
    source: 'صحيح البخاري',
    book: 'كتاب الإيمان',
    chapter: 'من الإيمان أن يحب لأخيه ما يحب لنفسه',
    grade: 'صحيح',
    topic: ['الإيمان', 'الأخوة', 'المحبة']
  },
  {
    id: 'fallback-4',
    text: 'المسلم من سلم المسلمون من لسانه ويده، والمهاجر من هجر ما نهى الله عنه',
    narrator: 'عبد الله بن عمرو رضي الله عنهما',
    source: 'صحيح البخاري',
    book: 'كتاب الإيمان',
    chapter: 'المسلم من سلم المسلمون من لسانه ويده',
    grade: 'صحيح',
    topic: ['الإسلام', 'الأخلاق', 'الهجرة']
  },
  {
    id: 'fallback-5',
    text: 'من لا يرحم الناس لا يرحمه الله',
    narrator: 'جرير بن عبد الله رضي الله عنه',
    source: 'صحيح مسلم',
    book: 'كتاب الفضائل',
    chapter: 'رحمة النبي صلى الله عليه وسلم الصبيان والعيال',
    grade: 'صحيح',
    topic: ['الرحمة', 'الأخلاق', 'التعامل']
  },
  {
    id: 'fallback-6',
    text: 'الدين النصيحة، قلنا: لمن؟ قال: لله ولكتابه ولرسوله ولأئمة المسلمين وعامتهم',
    narrator: 'تميم الداري رضي الله عنه',
    source: 'صحيح مسلم',
    book: 'كتاب الإيمان',
    chapter: 'بيان أن الدين النصيحة',
    grade: 'صحيح',
    topic: ['النصيحة', 'الدين', 'الأخلاق']
  },
  {
    id: 'fallback-7',
    text: 'من حسن إسلام المرء تركه ما لا يعنيه',
    narrator: 'أبو هريرة رضي الله عنه',
    source: 'جامع الترمذي',
    book: 'كتاب الزهد',
    chapter: 'ما جاء في حسن الإسلام',
    grade: 'حسن',
    topic: ['الإسلام', 'الآداب', 'السلوك']
  },
  {
    id: 'fallback-8',
    text: 'البر حسن الخلق، والإثم ما حاك في نفسك وكرهت أن يطلع عليه الناس',
    narrator: 'النواس بن سمعان رضي الله عنه',
    source: 'صحيح مسلم',
    book: 'كتاب البر والصلة والآداب',
    chapter: 'تفسير البر والإثم',
    grade: 'صحيح',
    topic: ['البر', 'الأخلاق', 'الضمير']
  }
];
