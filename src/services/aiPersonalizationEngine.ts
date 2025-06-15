interface UserBehaviorData {
  readingSessions: ReadingSession[];
  prayerConsistency: number;
  preferredReadingTimes: number[];
  favoriteTopics: string[];
  averageSessionDuration: number;
  learningProgress: LearningProgress;
  spiritualGoals: string[];
  lastActiveDate: string;
  streakData: StreakData;
}

interface ReadingSession {
  timestamp: number;
  type: 'quran' | 'hadith' | 'dua' | 'dhikr';
  content: string;
  duration: number;
  engagement: number; // 1-10 scale
  timeOfDay: number;
  completed: boolean;
}

interface LearningProgress {
  surahs: { number: number; progress: number; lastRead: number }[];
  hadiths: { collection: string; count: number }[];
  duas: { category: string; learned: number }[];
  comprehensionLevel: 'beginner' | 'intermediate' | 'advanced';
}

interface StreakData {
  current: number;
  longest: number;
  type: 'daily_reading' | 'prayer' | 'dhikr';
  lastUpdated: number;
}

interface AIRecommendation {
  id: string;
  type: 'surah' | 'hadith' | 'dua' | 'dhikr' | 'reflection';
  title: string;
  content: string;
  reason: string;
  priority: number;
  estimatedTime: number;
  personalizedScore: number;
  aiGenerated: boolean;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timing: 'morning' | 'afternoon' | 'evening' | 'anytime';
}

interface PersonalizationInsights {
  bestReadingTime: string;
  strongAreas: string[];
  improvementAreas: string[];
  learningStyle: string;
  motivationalMessage: string;
  nextMilestone: string;
  spiritualTrend: 'improving' | 'consistent' | 'declining';
}

class AIPersonalizationEngine {
  private readonly storageKey = 'ai_personalization_data_v1';
  private readonly sessionKey = 'current_session_data';

  private getUserBehaviorData(): UserBehaviorData {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : {
      readingSessions: [],
      prayerConsistency: 0,
      preferredReadingTimes: [],
      favoriteTopics: [],
      averageSessionDuration: 0,
      learningProgress: {
        surahs: [],
        hadiths: [],
        duas: [],
        comprehensionLevel: 'beginner'
      },
      spiritualGoals: [],
      lastActiveDate: new Date().toISOString(),
      streakData: { current: 0, longest: 0, type: 'daily_reading', lastUpdated: Date.now() }
    };
  }

  private saveUserBehaviorData(data: UserBehaviorData): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  // AI Analysis Methods
  private analyzeReadingPatterns(sessions: ReadingSession[]): { patterns: string[], insights: string[] } {
    if (sessions.length === 0) return { patterns: [], insights: [] };

    const timePreferences = this.getTimePreferences(sessions);
    const contentPreferences = this.getContentPreferences(sessions);
    const engagementTrends = this.getEngagementTrends(sessions);

    const patterns = [
      `Most active reading time: ${timePreferences.peak}`,
      `Preferred content type: ${contentPreferences.favorite}`,
      `Average engagement: ${engagementTrends.average}/10`
    ];

    const insights = [
      timePreferences.peak === 'morning' ? 'You\'re a morning reader - great for Fajr reflection!' : 
      timePreferences.peak === 'evening' ? 'Evening reading suits you - perfect for pre-sleep contemplation' : 
      'You have flexible reading habits - try scheduling consistent times',
      
      engagementTrends.average >= 8 ? 'Your engagement is excellent - you\'re deeply connecting with the content' :
      engagementTrends.average >= 6 ? 'Good engagement - consider exploring topics that excite you more' :
      'Let\'s find content that resonates better with your interests',
      
      contentPreferences.variety > 3 ? 'You enjoy diverse Islamic content - great for well-rounded growth' :
      'Consider exploring more variety in Islamic content for comprehensive learning'
    ];

    return { patterns, insights };
  }

  private getTimePreferences(sessions: ReadingSession[]): { peak: string, distribution: number[] } {
    const hourCounts = new Array(24).fill(0);
    sessions.forEach(session => {
      const hour = new Date(session.timestamp).getHours();
      hourCounts[hour]++;
    });

    const maxCount = Math.max(...hourCounts);
    const peakHour = hourCounts.indexOf(maxCount);
    
    const peak = peakHour < 12 ? 'morning' : peakHour < 18 ? 'afternoon' : 'evening';
    
    return { peak, distribution: hourCounts };
  }

  private getContentPreferences(sessions: ReadingSession[]): { favorite: string, variety: number } {
    const typeCounts: Record<string, number> = {};
    sessions.forEach(session => {
      typeCounts[session.type] = (typeCounts[session.type] || 0) + 1;
    });

    const favorite = Object.entries(typeCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'quran';
    
    return { favorite, variety: Object.keys(typeCounts).length };
  }

  private getEngagementTrends(sessions: ReadingSession[]): { average: number, trend: string } {
    if (sessions.length === 0) return { average: 7, trend: 'stable' };

    const recentSessions = sessions.slice(-10);
    const average = recentSessions.reduce((sum, s) => sum + s.engagement, 0) / recentSessions.length;
    
    const firstHalf = recentSessions.slice(0, Math.floor(recentSessions.length / 2));
    const secondHalf = recentSessions.slice(Math.floor(recentSessions.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, s) => sum + s.engagement, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, s) => sum + s.engagement, 0) / secondHalf.length;
    
    const trend = secondAvg > firstAvg + 0.5 ? 'improving' : 
                  secondAvg < firstAvg - 0.5 ? 'declining' : 'stable';

    return { average: Math.round(average * 10) / 10, trend };
  }

  // AI Recommendation Generation
  generatePersonalizedRecommendations(): AIRecommendation[] {
    const userData = this.getUserBehaviorData();
    const analysis = this.analyzeReadingPatterns(userData.readingSessions);
    const currentHour = new Date().getHours();
    const recommendations: AIRecommendation[] = [];

    // Time-based recommendations
    const timing = currentHour < 12 ? 'morning' : currentHour < 18 ? 'afternoon' : 'evening';
    
    // Personalized content based on reading patterns
    if (userData.readingSessions.length > 0) {
      const recentEngagement = this.getEngagementTrends(userData.readingSessions);
      
      if (recentEngagement.average >= 8) {
        recommendations.push({
          id: 'high-engagement-challenge',
          type: 'quran',
          title: 'Advanced Tafsir Study',
          content: 'Since you\'re highly engaged, explore deeper meanings in Surah Al-Baqarah',
          reason: `Your engagement score is ${recentEngagement.average}/10 - you\'re ready for advanced content`,
          priority: 9,
          estimatedTime: 30,
          personalizedScore: 95,
          aiGenerated: true,
          tags: ['advanced', 'tafsir', 'challenge'],
          difficulty: 'advanced',
          timing
        });
      } else if (recentEngagement.average < 6) {
        recommendations.push({
          id: 'gentle-reengagement',
          type: 'dhikr',
          title: 'Peaceful Dhikr Session',
          content: 'Gentle remembrance to reconnect with your spiritual practice',
          reason: 'Let\'s rebuild your connection with easier, more peaceful content',
          priority: 10,
          estimatedTime: 10,
          personalizedScore: 90,
          aiGenerated: true,
          tags: ['gentle', 'reconnection', 'peace'],
          difficulty: 'beginner',
          timing
        });
      }
    }

    // Habit-based recommendations
    if (userData.streakData.current >= 7) {
      recommendations.push({
        id: 'streak-celebration',
        type: 'reflection',
        title: 'Celebrating Your Consistency',
        content: `Reflect on your ${userData.streakData.current}-day streak and its spiritual benefits`,
        reason: `Amazing ${userData.streakData.current}-day streak! Time to reflect on your progress`,
        priority: 8,
        estimatedTime: 15,
        personalizedScore: 88,
        aiGenerated: true,
        tags: ['celebration', 'consistency', 'reflection'],
        difficulty: 'intermediate',
        timing
      });
    }

    // Learning progress based recommendations
    const completedSurahs = userData.learningProgress.surahs.filter(s => s.progress >= 100).length;
    if (completedSurahs < 10) {
      recommendations.push({
        id: 'progressive-learning',
        type: 'surah',
        title: 'Continue Your Quran Journey',
        content: `You've completed ${completedSurahs} surahs. Continue with the next one in your sequence`,
        reason: 'Systematic progression through the Quran builds strong foundation',
        priority: 7,
        estimatedTime: 20,
        personalizedScore: 85,
        aiGenerated: true,
        tags: ['progression', 'systematic', 'learning'],
        difficulty: userData.learningProgress.comprehensionLevel,
        timing
      });
    }

    // Contextual recommendations based on time of day
    if (timing === 'morning') {
      recommendations.push({
        id: 'morning-energy',
        type: 'dua',
        title: 'Morning Duas for Energy',
        content: 'Start your day with powerful morning supplications',
        reason: 'Morning is perfect for energizing duas that set a positive tone',
        priority: 8,
        estimatedTime: 8,
        personalizedScore: 87,
        aiGenerated: true,
        tags: ['morning', 'energy', 'positive'],
        difficulty: 'beginner',
        timing: 'morning'
      });
    } else if (timing === 'evening') {
      recommendations.push({
        id: 'evening-reflection',
        type: 'reflection',
        title: 'Evening Self-Reflection',
        content: 'Reflect on your day through Islamic principles and seek forgiveness',
        reason: 'Evening is ideal for contemplation and seeking Allah\'s forgiveness',
        priority: 7,
        estimatedTime: 12,
        personalizedScore: 84,
        aiGenerated: true,
        tags: ['evening', 'reflection', 'forgiveness'],
        difficulty: 'intermediate',
        timing: 'evening'
      });
    }

    // Adaptive difficulty recommendations
    const userLevel = userData.learningProgress.comprehensionLevel;
    if (userLevel === 'beginner') {
      recommendations.push({
        id: 'beginner-friendly',
        type: 'hadith',
        title: 'Simple Beautiful Hadiths',
        content: 'Easy-to-understand hadiths about kindness and good character',
        reason: 'Perfect for building your Islamic knowledge foundation',
        priority: 6,
        estimatedTime: 10,
        personalizedScore: 82,
        aiGenerated: true,
        tags: ['beginner', 'character', 'simple'],
        difficulty: 'beginner',
        timing
      });
    }

    // Sort by priority and personalization score
    return recommendations
      .sort((a, b) => (b.priority + b.personalizedScore/10) - (a.priority + a.personalizedScore/10))
      .slice(0, 6);
  }

  generatePersonalizationInsights(): PersonalizationInsights {
    const userData = this.getUserBehaviorData();
    const analysis = this.analyzeReadingPatterns(userData.readingSessions);
    const engagementTrend = this.getEngagementTrends(userData.readingSessions);

    return {
      bestReadingTime: analysis.patterns[0]?.split(': ')[1] || 'morning',
      strongAreas: userData.favoriteTopics.slice(0, 3),
      improvementAreas: userData.favoriteTopics.length < 2 ? ['content_variety'] : [],
      learningStyle: this.determineLearningStyle(userData),
      motivationalMessage: this.generateMotivationalMessage(userData, engagementTrend),
      nextMilestone: this.calculateNextMilestone(userData),
      spiritualTrend: engagementTrend.trend as 'improving' | 'consistent' | 'declining'
    };
  }

  private determineLearningStyle(userData: UserBehaviorData): string {
    const avgDuration = userData.averageSessionDuration;
    if (avgDuration > 25) return 'deep_learner';
    if (avgDuration > 15) return 'balanced_learner';
    return 'quick_learner';
  }

  private generateMotivationalMessage(userData: UserBehaviorData, engagement: any): string {
    if (engagement.trend === 'improving') {
      return 'MashaAllah! Your spiritual engagement is growing beautifully. Keep up the excellent progress!';
    } else if (engagement.trend === 'declining') {
      return 'Remember, every small step counts in your spiritual journey. Allah appreciates consistency.';
    }
    return 'You\'re maintaining steady progress in your Islamic learning. May Allah increase you in knowledge!';
  }

  private calculateNextMilestone(userData: UserBehaviorData): string {
    const completedSurahs = userData.learningProgress.surahs.filter(s => s.progress >= 100).length;
    if (completedSurahs < 5) return '5 surahs completed';
    if (completedSurahs < 10) return '10 surahs completed';
    if (completedSurahs < 20) return '20 surahs completed';
    return '30 surahs completed';
  }

  // Tracking Methods
  trackReadingSession(type: 'quran' | 'hadith' | 'dua' | 'dhikr', content: string, duration: number, engagement: number): void {
    const userData = this.getUserBehaviorData();
    
    const session: ReadingSession = {
      timestamp: Date.now(),
      type,
      content,
      duration,
      engagement,
      timeOfDay: new Date().getHours(),
      completed: duration > 5 // Consider completed if more than 5 minutes
    };

    userData.readingSessions.push(session);
    
    // Keep only last 100 sessions for performance
    if (userData.readingSessions.length > 100) {
      userData.readingSessions = userData.readingSessions.slice(-100);
    }

    // Update averages and preferences
    this.updateUserPreferences(userData);
    
    this.saveUserBehaviorData(userData);
  }

  private updateUserPreferences(userData: UserBehaviorData): void {
    const sessions = userData.readingSessions;
    
    // Update average session duration
    userData.averageSessionDuration = sessions.reduce((sum, s) => sum + s.duration, 0) / sessions.length;
    
    // Update preferred reading times
    const timePrefs = this.getTimePreferences(sessions);
    userData.preferredReadingTimes = timePrefs.distribution
      .map((count, hour) => ({ hour, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
      .map(item => item.hour);

    // Update favorite topics based on content type frequency
    const contentPrefs = this.getContentPreferences(sessions);
    userData.favoriteTopics = Object.entries(
      sessions.reduce((acc: Record<string, number>, session) => {
        acc[session.type] = (acc[session.type] || 0) + 1;
        return acc;
      }, {})
    )
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([topic]) => topic);

    userData.lastActiveDate = new Date().toISOString();
  }

  updateLearningProgress(type: 'surah' | 'hadith' | 'dua', identifier: string | number, progress: number): void {
    const userData = this.getUserBehaviorData();
    
    if (type === 'surah') {
      const surahNum = Number(identifier);
      const existing = userData.learningProgress.surahs.find(s => s.number === surahNum);
      if (existing) {
        existing.progress = Math.max(existing.progress, progress);
        existing.lastRead = Date.now();
      } else {
        userData.learningProgress.surahs.push({
          number: surahNum,
          progress,
          lastRead: Date.now()
        });
      }
    }
    
    this.saveUserBehaviorData(userData);
  }

  getPersonalizationStats() {
    const userData = this.getUserBehaviorData();
    const insights = this.generatePersonalizationInsights();
    
    return {
      totalSessions: userData.readingSessions.length,
      averageEngagement: this.getEngagementTrends(userData.readingSessions).average,
      currentStreak: userData.streakData.current,
      learningLevel: userData.learningProgress.comprehensionLevel,
      strongAreas: insights.strongAreas,
      spiritualTrend: insights.spiritualTrend,
      lastActive: userData.lastActiveDate,
      recommendations: this.generatePersonalizedRecommendations().length
    };
  }
}

export const aiPersonalizationEngine = new AIPersonalizationEngine();
export type { AIRecommendation, PersonalizationInsights, UserBehaviorData };
