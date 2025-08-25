import { HadithApiResponse } from '../types/hadith';

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

export const FALLBACK_HADITHS: HadithApiResponse[] = [
  {
    id: '1',
    text: 'The best of people are those who benefit others.',
    arabic: 'خير الناس أنفعهم للناس',
    reference: 'Hadith 1',
    narrator: 'Various',
    source: 'sunnah.com',
    book: 'Book 1',
    chapter: 'Chapter 1',
    grade: 'صحيح',
    topic: ['General']
  },
  {
    id: '2',
    text: 'Actions are but by intention and every man shall have only that which he intended.',
    arabic: 'إنما الأعمال بالنيات وإنما لكل امرئ ما نوى',
    reference: 'Bukhari 1',
    narrator: 'Umar ibn al-Khattab',
    source: 'Bukhari', 
    book: 'Book of Faith',
    chapter: 'Chapter 1',
    grade: 'صحيح',
    topic: ['Faith', 'Intention']
  },
  {
    id: '3',
    text: 'None of you believes until he loves for his brother what he loves for himself.',
    arabic: 'لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه',
    reference: 'Bukhari 13',
    narrator: 'Anas',
    source: 'Bukhari',
    book: 'Book of Faith',
    chapter: 'Chapter 2',
    grade: 'صحيح',
    topic: ['Faith', 'Brotherhood']
  }
];