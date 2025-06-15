
interface LearningRecommendation {
  id: string;
  type: 'quran' | 'hadith' | 'dua' | 'dhikr' | 'reflection';
  title: string;
  description: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  priority: number;
  tags: string[];
}

interface UserLearningProfile {
  readingSurahs: number[];
  completedPrayers: number;
  preferredTopics: string[];
  learningLevel: 'beginner' | 'intermediate' | 'advanced';
  dailyGoals: {
    quranMinutes: number;
    dhikrCount: number;
    duasLearned: number;
  };
  streaks: {
    prayer: number;
    reading: number;
    dhikr: number;
  };
}

class SmartLearningService {
  private getStoredProfile(): UserLearningProfile {
    const stored = localStorage.getItem('learning-profile');
    return stored ? JSON.parse(stored) : {
      readingSurahs: [],
      completedPrayers: 0,
      preferredTopics: ['quran', 'prayer'],
      learningLevel: 'beginner',
      dailyGoals: { quranMinutes: 30, dhikrCount: 100, duasLearned: 1 },
      streaks: { prayer: 0, reading: 0, dhikr: 0 }
    };
  }

  private saveProfile(profile: UserLearningProfile): void {
    localStorage.setItem('learning-profile', JSON.stringify(profile));
  }

  getPersonalizedRecommendations(): LearningRecommendation[] {
    const profile = this.getStoredProfile();
    const recommendations: LearningRecommendation[] = [];

    // Quran recommendations based on reading history
    if (profile.readingSurahs.length < 5) {
      recommendations.push({
        id: 'short-surahs',
        type: 'quran',
        title: 'Start with Short Surahs',
        description: 'Begin your Quran journey with beautiful short chapters',
        content: 'Try reading Surah Al-Fatiha, Al-Ikhlas, and Al-Falaq',
        difficulty: 'beginner',
        estimatedTime: 15,
        priority: 9,
        tags: ['quran', 'beginner', 'memorization']
      });
    }

    // Prayer-based recommendations
    if (profile.streaks.prayer < 3) {
      recommendations.push({
        id: 'prayer-consistency',
        type: 'reflection',
        title: 'Building Prayer Consistency',
        description: 'Spiritual reflection on maintaining regular prayers',
        content: 'Prayer is the pillar of faith. Start with consistency over perfection.',
        difficulty: 'beginner',
        estimatedTime: 10,
        priority: 10,
        tags: ['prayer', 'habits', 'spirituality']
      });
    }

    // Dhikr recommendations
    recommendations.push({
      id: 'morning-dhikr',
      type: 'dhikr',
      title: 'Morning Remembrance',
      description: 'Start your day with beautiful dhikr',
      content: 'SubhanAllahi wa bihamdihi (100 times)',
      difficulty: 'beginner',
      estimatedTime: 5,
      priority: 8,
      tags: ['dhikr', 'morning', 'barakah']
    });

    // Advanced recommendations for experienced users
    if (profile.learningLevel === 'advanced' || profile.readingSurahs.length > 10) {
      recommendations.push({
        id: 'tafsir-study',
        type: 'quran',
        title: 'Deepen Your Understanding',
        description: 'Study the commentary (tafsir) of verses you\'ve read',
        content: 'Explore deeper meanings and context of your favorite ayahs',
        difficulty: 'advanced',
        estimatedTime: 25,
        priority: 7,
        tags: ['tafsir', 'understanding', 'knowledge']
      });
    }

    // Seasonal recommendations
    const today = new Date();
    const dayOfWeek = today.getDay();
    if (dayOfWeek === 5) { // Friday
      recommendations.push({
        id: 'friday-dua',
        type: 'dua',
        title: 'Friday Blessings',
        description: 'Special duas for the blessed day of Jumu\'ah',
        content: 'Increase your salawat upon Prophet Muhammad (ﷺ)',
        difficulty: 'beginner',
        estimatedTime: 10,
        priority: 9,
        tags: ['friday', 'dua', 'sunnah']
      });
    }

    return recommendations.sort((a, b) => b.priority - a.priority);
  }

  updateLearningProgress(activity: 'quran' | 'prayer' | 'dhikr', data: any): void {
    const profile = this.getStoredProfile();
    
    switch (activity) {
      case 'quran':
        if (data.surahNumber && !profile.readingSurahs.includes(data.surahNumber)) {
          profile.readingSurahs.push(data.surahNumber);
          profile.streaks.reading++;
        }
        break;
      case 'prayer':
        profile.completedPrayers++;
        profile.streaks.prayer++;
        break;
      case 'dhikr':
        profile.streaks.dhikr++;
        break;
    }

    this.saveProfile(profile);
  }

  getLearningStats() {
    const profile = this.getStoredProfile();
    return {
      totalSurahsRead: profile.readingSurahs.length,
      prayerStreak: profile.streaks.prayer,
      readingStreak: profile.streaks.reading,
      dhikrStreak: profile.streaks.dhikr,
      level: profile.learningLevel,
      progress: Math.min((profile.readingSurahs.length / 114) * 100, 100)
    };
  }
}

export const smartLearningService = new SmartLearningService();
export type { LearningRecommendation, UserLearningProfile };
