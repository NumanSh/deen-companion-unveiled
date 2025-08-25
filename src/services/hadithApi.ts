// Simple hadith API service for backward compatibility
export const SUNNAH_API_BASE = 'https://api.sunnah.com/v1';

export interface HadithApiResponse {
  id: string;
  text: string;
  arabic: string;
  reference: string;
  collection: string;
  narrator?: string;
  source?: string;
  book?: string;
  chapter?: string;
  grade?: string;
  topic?: string;
}

export const fetchHadiths = async (): Promise<HadithApiResponse[]> => {
  return [
    {
      id: '1',
      text: 'The best of people are those who benefit others.',
      arabic: 'خير الناس أنفعهم للناس',
      reference: 'Hadith',
      collection: 'Various',
      narrator: 'Various',
      source: 'sunnah.com',
      book: 'Book 1',
      chapter: 'Chapter 1',
      grade: 'Sahih',
      topic: 'General'
    }
  ];
};

export default { fetchHadiths, SUNNAH_API_BASE };