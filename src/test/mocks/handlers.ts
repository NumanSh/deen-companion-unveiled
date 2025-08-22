import { http, HttpResponse } from 'msw'

// Mock data for tests
const mockSurahs = [
  {
    number: 1,
    name: "Al-Fatihah",
    englishName: "The Opening",
    englishNameTranslation: "The Opening",
    numberOfAyahs: 7,
    revelationType: "Meccan"
  },
  {
    number: 2,
    name: "Al-Baqarah",
    englishName: "The Cow",
    englishNameTranslation: "The Cow",
    numberOfAyahs: 286,
    revelationType: "Medinan"
  }
]

const mockPrayerTimes = {
  code: 200,
  status: "OK",
  data: {
    timings: {
      Fajr: "05:30",
      Sunrise: "07:00",
      Dhuhr: "12:30",
      Asr: "15:45",
      Maghrib: "18:30",
      Isha: "20:00"
    },
    date: {
      readable: "01 Jan 2024",
      timestamp: "1704067200"
    }
  }
}

const mockHadiths = [
  {
    id: "1",
    text: "إنما الأعمال بالنيات",
    narrator: "عمر بن الخطاب",
    source: "صحيح البخاري",
    book: "كتاب بدء الوحي",
    chapter: "باب كيف كان بدء الوحي",
    grade: "صحيح" as const,
    topic: ["الإخلاص", "النية"]
  }
]

export const handlers = [
  // Quran API handlers
  http.get('https://api.alquran.cloud/v1/surah', () => {
    return HttpResponse.json({
      code: 200,
      status: "OK",
      data: mockSurahs
    })
  }),

  http.get('https://api.alquran.cloud/v1/surah/:number', ({ params }) => {
    const { number } = params
    return HttpResponse.json({
      code: 200,
      status: "OK",
      data: {
        number: parseInt(number as string),
        name: "Al-Fatihah",
        englishName: "The Opening",
        englishNameTranslation: "The Opening",
        numberOfAyahs: 7,
        revelationType: "Meccan",
        ayahs: [
          {
            number: 1,
            text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
            numberInSurah: 1,
            juz: 1,
            manzil: 1,
            page: 1,
            ruku: 1,
            hizbQuarter: 1,
            sajda: false
          }
        ]
      }
    })
  }),

  // Prayer Times API handlers
  http.get('https://api.aladhan.com/v1/timings/*', () => {
    return HttpResponse.json(mockPrayerTimes)
  }),

  http.get('https://api.aladhan.com/v1/qibla/*', () => {
    return HttpResponse.json({
      code: 200,
      status: "OK",
      data: {
        direction: 45.5,
        latitude: 21.3891,
        longitude: 39.8579
      }
    })
  }),

  // Hadith API handlers
  http.get('https://api.hadith.gading.dev/books/*', () => {
    return HttpResponse.json({
      name: "صحيح البخاري",
      id: "bukhari",
      available: 7563,
      requested: 10,
      hadiths: mockHadiths
    })
  }),

  // Location API handlers
  http.get('https://api.bigdatacloud.net/data/*', () => {
    return HttpResponse.json({
      city: "Mecca",
      countryName: "Saudi Arabia",
      latitude: 21.3891,
      longitude: 39.8579
    })
  }),

  // Fallback for any unmatched requests
  http.all('*', () => {
    return HttpResponse.json(
      { error: 'No handler found for this request' },
      { status: 404 }
    )
  })
]
