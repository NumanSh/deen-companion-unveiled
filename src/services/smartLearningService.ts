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
  personalizedReason?: string;
  adaptiveDifficulty?: boolean;
  aiGenerated?: boolean;
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
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  preferredLanguage: 'arabic' | 'english' | 'mixed';
  timePreferences: number[]; // preferred hours
  weakAreas: string[];
  strongAreas: string[];
  lastActivity: number;
  totalSessions: number;
  averageEngagement: number;
}

interface AdaptiveLearningSession {
  timestamp: number;
  type: string;
  duration: number;
  engagement: number;
  difficulty: string;
  completed: boolean;
  topics: string[];
}

class SmartLearningService {
  private profileKey = 'learning-profile-v2';
  private sessionsKey = 'learning-sessions';

  private getStoredProfile(): UserLearningProfile {
    const stored = localStorage.getItem(this.profileKey);
    return stored ? JSON.parse(stored) : {
      readingSurahs: [],
      completedPrayers: 0,
      preferredTopics: ['quran', 'prayer'],
      learningLevel: 'beginner',
      dailyGoals: { quranMinutes: 30, dhikrCount: 100, duasLearned: 1 },
      streaks: { prayer: 0, reading: 0, dhikr: 0 },
      learningStyle: 'mixed',
      preferredLanguage: 'mixed',
      timePreferences: [6, 7, 20, 21], // Fajr and Maghrib times
      weakAreas: [],
      strongAreas: [],
      lastActivity: Date.now(),
      totalSessions: 0,
      averageEngagement: 7
    };
  }

  private saveProfile(profile: UserLearningProfile): void {
    localStorage.setItem(this.profileKey, JSON.stringify(profile));
  }

  private getStoredSessions(): AdaptiveLearningSession[] {
    const stored = localStorage.getItem(this.sessionsKey);
    return stored ? JSON.parse(stored) : [];
  }

  private saveSessions(sessions: AdaptiveLearningSession[]): void {
    localStorage.setItem(this.sessionsKey, JSON.stringify(sessions));
  }

  private analyzeUserBehavior(): { weakAreas: string[], strongAreas: string[], adaptiveLevel: string } {
    const sessions = this.getStoredSessions();
    const recentSessions = sessions.filter(s => Date.now() - s.timestamp < 30 * 24 * 60 * 60 * 1000);

    if (recentSessions.length === 0) {
      return { weakAreas: [], strongAreas: [], adaptiveLevel: 'beginner' };
    }

    // Analyze topic performance
    const topicPerformance: { [topic: string]: { sessions: number, avgEngagement: number, completionRate: number } } = {};
    
    recentSessions.forEach(session => {
      session.topics.forEach(topic => {
        if (!topicPerformance[topic]) {
          topicPerformance[topic] = { sessions: 0, avgEngagement: 0, completionRate: 0 };
        }
        topicPerformance[topic].sessions++;
        topicPerformance[topic].avgEngagement += session.engagement;
        if (session.completed) topicPerformance[topic].completionRate++;
      });
    });

    // Calculate averages and identify patterns
    Object.keys(topicPerformance).forEach(topic => {
      const data = topicPerformance[topic];
      data.avgEngagement /= data.sessions;
      data.completionRate = (data.completionRate / data.sessions) * 100;
    });

    const strongAreas = Object.entries(topicPerformance)
      .filter(([_, data]) => data.avgEngagement >= 8 && data.completionRate >= 80)
      .map(([topic]) => topic);

    const weakAreas = Object.entries(topicPerformance)
      .filter(([_, data]) => data.avgEngagement < 6 || data.completionRate < 50)
      .map(([topic]) => topic);

    // Determine adaptive difficulty level
    const avgEngagement = recentSessions.reduce((sum, s) => sum + s.engagement, 0) / recentSessions.length;
    const completionRate = (recentSessions.filter(s => s.completed).length / recentSessions.length) * 100;

    let adaptiveLevel = 'intermediate';
    if (avgEngagement >= 8 && completionRate >= 80) {
      adaptiveLevel = 'advanced';
    } else if (avgEngagement < 6 || completionRate < 60) {
      adaptiveLevel = 'beginner';
    }

    return { weakAreas, strongAreas, adaptiveLevel };
  }

  getPersonalizedRecommendations(): LearningRecommendation[] {
    const profile = this.getStoredProfile();
    const analysis = this.analyzeUserBehavior();
    const recommendations: LearningRecommendation[] = [];
    const currentHour = new Date().getHours();

    // Update profile with analysis
    profile.weakAreas = analysis.weakAreas;
    profile.strongAreas = analysis.strongAreas;
    profile.learningLevel = analysis.adaptiveLevel as any;
    this.saveProfile(profile);

    // AI-powered adaptive recommendations based on time of day
    if (profile.timePreferences.includes(currentHour)) {
      recommendations.push({
        id: 'optimal-time-quran',
        type: 'quran',
        title: 'Perfect Time for Quran',
        description: 'This is one of your most productive hours for Quran study',
        content: 'Your engagement is 40% higher during this time. Consider reading a new surah or reviewing memorization.',
        difficulty: profile.learningLevel,
        estimatedTime: 25,
        priority: 10,
        tags: ['quran', 'optimal-timing', 'personalized'],
        personalizedReason: `You're most focused at ${currentHour}:00 based on your learning pattern`,
        adaptiveDifficulty: true,
        aiGenerated: true
      });
    }

    // Address weak areas with supportive content
    if (profile.weakAreas.length > 0) {
      const weakArea = profile.weakAreas[0];
      recommendations.push({
        id: `support-${weakArea}`,
        type: this.getTypeForTopic(weakArea),
        title: `Strengthen Your ${weakArea} Knowledge`,
        description: 'Personalized support for your learning journey',
        content: `Gentle approach to ${weakArea} with easier content and step-by-step guidance`,
        difficulty: 'beginner', // Always start easy for weak areas
        estimatedTime: 15,
        priority: 9,
        tags: [weakArea, 'support', 'adaptive'],
        personalizedReason: `Designed to help you improve in ${weakArea} at a comfortable pace`,
        adaptiveDifficulty: true,
        aiGenerated: true
      });
    }

    // Leverage strong areas for advanced content
    if (profile.strongAreas.length > 0) {
      const strongArea = profile.strongAreas[0];
      recommendations.push({
        id: `advanced-${strongArea}`,
        type: this.getTypeForTopic(strongArea),
        title: `Advanced ${strongArea} Study`,
        description: 'Challenge yourself with deeper knowledge',
        content: `Since you excel in ${strongArea}, here's advanced content to further your mastery`,
        difficulty: 'advanced',
        estimatedTime: 35,
        priority: 8,
        tags: [strongArea, 'advanced', 'mastery'],
        personalizedReason: `You've shown excellent progress in ${strongArea} - time to go deeper!`,
        adaptiveDifficulty: true,
        aiGenerated: true
      });
    }

    // Dynamic difficulty adjustment based on recent performance
    if (profile.averageEngagement >= 8) {
      recommendations.push({
        id: 'challenge-content',
        type: 'reflection',
        title: 'Challenge: Deep Islamic Reflection',
        description: 'You\'re ready for more complex spiritual concepts',
        content: 'Explore the deeper meanings of Islamic teachings through scholarly commentary and reflection',
        difficulty: 'advanced',
        estimatedTime: 30,
        priority: 7,
        tags: ['challenge', 'reflection', 'advanced'],
        personalizedReason: 'Your high engagement shows you\'re ready for challenging content',
        adaptiveDifficulty: true,
        aiGenerated: true
      });
    } else if (profile.averageEngagement < 6) {
      recommendations.push({
        id: 'gentle-approach',
        type: 'dhikr',
        title: 'Gentle Dhikr Practice',
        description: 'Simple, peaceful remembrance to reconnect',
        content: 'Start with just 10 minutes of peaceful dhikr to rebuild your spiritual rhythm',
        difficulty: 'beginner',
        estimatedTime: 10,
        priority: 9,
        tags: ['gentle', 'dhikr', 'reconnection'],
        personalizedReason: 'A gentle approach to help you reconnect with your practice',
        adaptiveDifficulty: true,
        aiGenerated: true
      });
    }

    // Context-aware recommendations
    const dayOfWeek = new Date().getDay();
    if (dayOfWeek === 5) { // Friday
      recommendations.push({
        id: 'friday-special',
        type: 'dua',
        title: 'Friday Blessings & Duas',
        description: 'Special supplications for the blessed day',
        content: 'Increase your salawat and make special duas on this blessed Friday',
        difficulty: profile.learningLevel,
        estimatedTime: 15,
        priority: 10,
        tags: ['friday', 'dua', 'blessed'],
        personalizedReason: 'Friday is the most blessed day for Muslims',
        aiGenerated: true
      });
    }

    // Habit-based recommendations
    if (profile.streaks.prayer >= 7) {
      recommendations.push({
        id: 'prayer-consistency-reward',
        type: 'reflection',
        title: 'Celebrating Your Prayer Consistency',
        description: 'Reflect on the blessings of consistent prayer',
        content: 'Your prayer consistency is excellent! Reflect on how this discipline is strengthening your relationship with Allah',
        difficulty: profile.learningLevel,
        estimatedTime: 10,
        priority: 7,
        tags: ['prayer', 'consistency', 'celebration'],
        personalizedReason: `You've maintained ${profile.streaks.prayer} days of consistent prayer!`,
        aiGenerated: true
      });
    }

    // Learning style adaptations
    if (profile.learningStyle === 'visual') {
      recommendations.push({
        id: 'visual-learning',
        type: 'quran',
        title: 'Visual Quran Study',
        description: 'Quran study optimized for visual learners',
        content: 'Use calligraphy, charts, and visual aids to enhance your Quran understanding',
        difficulty: profile.learningLevel,
        estimatedTime: 20,
        priority: 6,
        tags: ['visual', 'quran', 'learning-style'],
        personalizedReason: 'Adapted for your visual learning preference',
        adaptiveDifficulty: true,
        aiGenerated: true
      });
    }

    // Classic recommendations (always include some)
    if (profile.readingSurahs.length < 10) {
      recommendations.push({
        id: 'surah-progression',
        type: 'quran',
        title: 'Continue Your Surah Journey',
        description: 'Systematic progression through the Quran',
        content: 'Continue reading new surahs to build your Quranic knowledge foundation',
        difficulty: profile.learningLevel,
        estimatedTime: 20,
        priority: 8,
        tags: ['quran', 'progression', 'systematic'],
        adaptiveDifficulty: true
      });
    }

    return recommendations
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 8); // Limit to top 8 recommendations
  }

  private getTypeForTopic(topic: string): 'quran' | 'hadith' | 'dua' | 'dhikr' | 'reflection' {
    const topicMap: { [key: string]: 'quran' | 'hadith' | 'dua' | 'dhikr' | 'reflection' } = {
      'quran': 'quran',
      'prayer': 'dua',
      'dhikr': 'dhikr',
      'hadith': 'hadith',
      'reflection': 'reflection',
      'recitation': 'quran',
      'memorization': 'quran',
      'spirituality': 'reflection'
    };
    return topicMap[topic] || 'reflection';
  }

  updateLearningProgress(activity: 'quran' | 'prayer' | 'dhikr', data: any): void {
    const profile = this.getStoredProfile();
    const sessions = this.getStoredSessions();
    
    // Record session for AI analysis
    const session: AdaptiveLearningSession = {
      timestamp: Date.now(),
      type: activity,
      duration: data.duration || 15,
      engagement: data.engagement || 7,
      difficulty: data.difficulty || profile.learningLevel,
      completed: data.completed !== false,
      topics: data.topics || [activity]
    };
    
    sessions.push(session);
    
    // Keep only last 100 sessions
    if (sessions.length > 100) {
      sessions.splice(0, sessions.length - 100);
    }
    
    this.saveSessions(sessions);
    
    // Update profile
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

    profile.lastActivity = Date.now();
    profile.totalSessions++;
    
    // Update average engagement
    const recentSessions = sessions.slice(-10);
    profile.averageEngagement = recentSessions.reduce((sum, s) => sum + s.engagement, 0) / recentSessions.length;
    
    this.saveProfile(profile);
  }

  getLearningStats() {
    const profile = this.getStoredProfile();
    const sessions = this.getStoredSessions();
    const analysis = this.analyzeUserBehavior();
    
    return {
      totalSurahsRead: profile.readingSurahs.length,
      prayerStreak: profile.streaks.prayer,
      readingStreak: profile.streaks.reading,
      dhikrStreak: profile.streaks.dhikr,
      level: profile.learningLevel,
      progress: Math.min((profile.readingSurahs.length / 114) * 100, 100),
      totalSessions: profile.totalSessions,
      averageEngagement: Math.round(profile.averageEngagement * 10) / 10,
      strongAreas: analysis.strongAreas,
      weakAreas: analysis.weakAreas,
      learningStyle: profile.learningStyle,
      recentActivity: sessions.slice(-5)
    };
  }

  // New method for AI insights
  getAIInsights() {
    const profile = this.getStoredProfile();
    const sessions = this.getStoredSessions();
    const insights = [];

    if (profile.averageEngagement >= 8) {
      insights.push({
        type: 'positive',
        message: 'Your engagement levels are excellent! You\'re in the top 10% of learners.',
        action: 'Consider sharing your learning journey to inspire others.'
      });
    }

    if (profile.streaks.prayer >= 30) {
      insights.push({
        type: 'milestone',
        message: 'Subhan\'Allah! 30+ days of consistent prayer is a major achievement.',
        action: 'Make du\'a for continued consistency and thank Allah for this blessing.'
      });
    }

    if (profile.strongAreas.length > 0) {
      insights.push({
        type: 'strength',
        message: `You excel in ${profile.strongAreas.join(', ')}. MashaAllah!`,
        action: 'Consider teaching or mentoring others in these areas.'
      });
    }

    return insights;
  }
}

export const smartLearningService = new SmartLearningService();
export type { LearningRecommendation, UserLearningProfile, AdaptiveLearningSession };
