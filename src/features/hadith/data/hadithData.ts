export interface HadithCollection {
  id: string;
  name: string;
  arabicName: string;
  totalHadith: number;
  source: string;
}

export const SUNNAH_API_BASE = 'https://api.sunnah.com/v1';
export const SUNNAH_COLLECTIONS = ['bukhari', 'muslim', 'abudawud', 'tirmidhi'];

export const HADITH_COLLECTIONS: HadithCollection[] = [
  {
    id: 'bukhari',
    name: 'Sahih al-Bukhari',
    arabicName: 'صحيح البخاري',
    totalHadith: 7563,
    source: 'sunnah.com'
  },
  {
    id: 'muslim',
    name: 'Sahih Muslim',
    arabicName: 'صحيح مسلم',
    totalHadith: 7190,
    source: 'sunnah.com'
  }
];

export const FALLBACK_HADITHS = [
  {
    id: '1',
    text: 'The best of people are those who benefit others.',
    arabic: 'خير الناس أنفعهم للناس',
    reference: 'Hadith',
    collection: 'Various'
  }
];