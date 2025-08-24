
import { v4 as uuidv4 } from 'uuid';

export interface AIRecommendation {
  id: string;
  type: string;
  title: string;
  content: string;
  reason: string;
  personalizedScore: number;
  estimatedTime: number;
  difficulty: string;
  priority: number;
  tags: string[];
  aiGenerated: boolean;
  timeContext: string;
  engagementBoost: number;
}

export interface PersonalizationInsights {
  spiritualTrend: string;
  bestReadingTime: string;
  nextMilestone: string;
  motivationalMessage: string;
  weeklyGoalProgress: number;
  recommendedDailyMinutes: number;
}

export interface PersonalizationStats {
  totalSessions: number;
  averageEngagement: number;
  currentStreak: number;
  weeklyReadingMinutes: number;
  preferredContentTypes: string[];
  bestPerformanceHours: number[];
}

export interface ReadingSession {
  type: 'quran' | 'hadith' | 'dua' | 'dhikr' | 'reflection';
  content: string;
  duration: number;
  engagement: number;
  timestamp: Date;
  timeOfDay: number;
}

export type AIContentType = 'quran' | 'hadith' | 'dua' | 'dhikr' | 'reflection';

class AIPersonalizationEngine {
  private storageKey = 'islamic-app-personalization';
  
  private defaultUserPreferences = {
    preferredLanguages: ['en', 'ar'],
    preferredTopics: ['faith', 'spirituality', 'community'],
    morningReadingBonus: 15,
    nightReflectionBonus: 10,
    dailyGoalMinutes: 30,
    difficultyPreference: 'intermediate',
    notificationTimes: ['07:00', '13:00', '19:00'],
  };

  private getUserData() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return this.getDefaultUserData();
      }
    }
    return this.getDefaultUserData();
  }

  private getDefaultUserData() {
    return {
      preferences: this.defaultUserPreferences,
      stats: {
        totalSessions: 12,
        averageEngagement: 7.8,
        currentStreak: 5,
        weeklyReadingMinutes: 180,
        preferredContentTypes: ['quran', 'hadith'],
        bestPerformanceHours: [7, 8, 9, 19, 20, 21],
      },
      readingHistory: [
        { type: 'quran', content: 'Surah Al-Baqarah', duration: 25, engagement: 9, timestamp: new Date(Date.now() - 86400000), timeOfDay: 8 },
        { type: 'hadith', content: 'Sahih Bukhari - Faith', duration: 15, engagement: 7, timestamp: new Date(Date.now() - 172800000), timeOfDay: 13 },
        { type: 'dua', content: 'Morning Adhkar', duration: 12, engagement: 8, timestamp: new Date(Date.now() - 259200000), timeOfDay: 7 },
        { type: 'reflection', content: 'Evening Reflection', duration: 18, engagement: 8, timestamp: new Date(Date.now() - 345600000), timeOfDay: 20 },
      ]
    };
  }

  private saveUserData(data: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  trackReadingSession(type: AIContentType, content: string, duration: number, engagement: number) {
    const userData = this.getUserData();
    const currentHour = new Date().getHours();
    
    const session: ReadingSession = {
      type,
      content,
      duration,
      engagement,
      timestamp: new Date(),
      timeOfDay: currentHour
    };

    userData.readingHistory.push(session);
    userData.stats.totalSessions++;
    userData.stats.averageEngagement = (userData.stats.averageEngagement + engagement) / 2;
    userData.stats.currentStreak++;
    userData.stats.weeklyReadingMinutes += duration;

    // Update preferred content types based on engagement
    if (engagement >= 8) {
      const preferredTypes = userData.stats.preferredContentTypes;
      if (!preferredTypes.includes(type)) {
        preferredTypes.push(type);
      }
    }

    // Update best performance hours
    if (engagement >= 8) {
      const bestHours = userData.stats.bestPerformanceHours;
      if (!bestHours.includes(currentHour)) {
        bestHours.push(currentHour);
      }
    }

    this.saveUserData(userData);
  }

  getUserPreferences() {
    return this.getUserData().preferences;
  }

  getPersonalizationStats(): PersonalizationStats {
    return this.getUserData().stats;
  }

  getReadingHistory(): ReadingSession[] {
    return this.getUserData().readingHistory;
  }

  generatePersonalizationInsights(): PersonalizationInsights {
    const userData = this.getUserData();
    const stats = userData.stats;
    const history = userData.readingHistory;
    
    // Analyze spiritual trend
    const recentSessions = history.slice(-5);
    const recentAvgEngagement = recentSessions.reduce((sum, s) => sum + s.engagement, 0) / recentSessions.length;
    const spiritualTrend = recentAvgEngagement > stats.averageEngagement ? 'improving' : 
                          recentAvgEngagement < stats.averageEngagement - 1 ? 'declining' : 'stable';

    // Determine best reading time
    const hourStats = new Map();
    history.forEach(session => {
      const hour = session.timeOfDay;
      if (!hourStats.has(hour)) {
        hourStats.set(hour, { total: 0, count: 0 });
      }
      const stat = hourStats.get(hour);
      stat.total += session.engagement;
      stat.count++;
    });

    let bestHour = 8; // default morning
    let bestAverage = 0;
    hourStats.forEach((stat, hour) => {
      const average = stat.total / stat.count;
      if (average > bestAverage) {
        bestAverage = average;
        bestHour = hour;
      }
    });

    const bestReadingTime = bestHour < 12 ? 'Morning' : bestHour < 17 ? 'Afternoon' : 'Evening';

    // Generate next milestone
    const totalMinutes = stats.weeklyReadingMinutes;
    const nextMilestone = totalMinutes < 100 ? 'Read for 100 minutes this week' :
                         totalMinutes < 200 ? 'Complete 200 minutes of reading' :
                         'Maintain consistent daily practice';

    // Create motivational message
    const messages = [
      `Excellent progress! Your ${stats.currentStreak}-day streak shows true dedication.`,
      `Your engagement has been ${spiritualTrend}. Keep up the wonderful work!`,
      `You've completed ${stats.totalSessions} sessions. Every moment counts in your spiritual journey.`,
      `Your consistency in ${bestReadingTime.toLowerCase()} reading is paying off beautifully.`
    ];
    
    const motivationalMessage = messages[Math.floor(Math.random() * messages.length)];

    return {
      spiritualTrend,
      bestReadingTime,
      nextMilestone,
      motivationalMessage,
      weeklyGoalProgress: Math.min(100, (totalMinutes / userData.preferences.dailyGoalMinutes * 7) * 100),
      recommendedDailyMinutes: userData.preferences.dailyGoalMinutes
    };
  }

  generatePersonalizedRecommendations(): AIRecommendation[] {
    const userData = this.getUserData();
    const stats = userData.stats;
    const preferences = userData.preferences;
    const history = userData.readingHistory;
    const currentHour = new Date().getHours();
    const currentDay = new Date().getDay();
    
    const recommendations: AIRecommendation[] = [];
    
    // Analyze user patterns
    const preferredTypes = stats.preferredContentTypes;
    const bestHours = stats.bestPerformanceHours;
    const isOptimalTime = bestHours.includes(currentHour);
    const timeBonus = isOptimalTime ? 20 : 0;

    // Time-based recommendations
    if (currentHour >= 5 && currentHour <= 11) {
      // Morning recommendations
      recommendations.push({
        id: uuidv4(),
        type: 'quran',
        title: 'Morning Quran Reflection',
        content: 'Begin your day with Surah Al-Fatiha and reflect on its profound meanings. Let the opening chapter guide your morning prayers and set a peaceful tone for the day ahead.',
        reason: `Perfect for your morning routine. Your engagement is ${preferences.morningReadingBonus}% higher during morning hours.`,
        personalizedScore: Math.min(95, 70 + preferences.morningReadingBonus + timeBonus),
        estimatedTime: 10,
        difficulty: preferences.difficultyPreference || 'intermediate',
        priority: 9,
        tags: ['morning', 'reflection', 'daily', 'blessed'],
        aiGenerated: true,
        timeContext: 'morning',
        engagementBoost: preferences.morningReadingBonus
      });

      if (preferredTypes.includes('dua')) {
        recommendations.push({
          id: uuidv4(),
          type: 'dua',
          title: 'Morning Adhkar Collection',
          content: 'Recite the comprehensive morning adhkar to seek Allah\'s protection and blessings for the day. These supplications will strengthen your connection with Allah.',
          reason: 'Based on your excellent engagement with duas and morning reading preference.',
          personalizedScore: Math.min(90, 75 + timeBonus),
          estimatedTime: 8,
          difficulty: 'beginner',
          priority: 8,
          tags: ['morning', 'protection', 'adhkar', 'daily'],
          aiGenerated: true,
          timeContext: 'morning',
          engagementBoost: 10
        });
      }
    }

    if (currentHour >= 12 && currentHour <= 17) {
      // Afternoon recommendations
      recommendations.push({
        id: uuidv4(),
        type: 'hadith',
        title: 'Hadith on Compassion and Justice',
        content: 'Explore authentic hadiths about showing compassion to others and upholding justice. Learn how the Prophet ﷺ exemplified these values in his daily interactions.',
        reason: 'Afternoon is ideal for learning from the Prophet\'s teachings and applying them to daily life.',
        personalizedScore: Math.min(88, 65 + (stats.averageEngagement * 3) + timeBonus),
        estimatedTime: 15,
        difficulty: preferences.difficultyPreference || 'intermediate',
        priority: 7,
        tags: ['afternoon', 'hadith', 'character', 'practical'],
        aiGenerated: true,
        timeContext: 'afternoon',
        engagementBoost: 5
      });

      if (preferredTypes.includes('reflection')) {
        recommendations.push({
          id: uuidv4(),
          type: 'reflection',
          title: 'Midday Spiritual Check-in',
          content: 'Take a moment to reflect on your morning actions and intentions. Assess your spiritual state and make adjustments for the remainder of the day.',
          reason: 'Your reflection sessions show high engagement, perfect for midday spiritual assessment.',
          personalizedScore: Math.min(85, 70 + timeBonus),
          estimatedTime: 12,
          difficulty: 'intermediate',
          priority: 6,
          tags: ['reflection', 'mindfulness', 'assessment'],
          aiGenerated: true,
          timeContext: 'afternoon',
          engagementBoost: 8
        });
      }
    }

    if (currentHour >= 18 && currentHour <= 22) {
      // Evening recommendations
      recommendations.push({
        id: uuidv4(),
        type: 'dua',
        title: 'Evening Gratitude and Protection',
        content: 'Recite evening adhkar expressing gratitude for the day\'s blessings and seeking Allah\'s protection through the night. End your day with thankfulness and peace.',
        reason: `Evening duas align with your reading patterns and provide ${preferences.nightReflectionBonus}% engagement boost.`,
        personalizedScore: Math.min(92, 75 + preferences.nightReflectionBonus + timeBonus),
        estimatedTime: 14,
        difficulty: 'beginner',
        priority: 8,
        tags: ['evening', 'gratitude', 'protection', 'peace'],
        aiGenerated: true,
        timeContext: 'evening',
        engagementBoost: preferences.nightReflectionBonus
      });

      if (currentDay === 5) { // Friday
        recommendations.push({
          id: uuidv4(),
          type: 'quran',
          title: 'Surah Al-Kahf - Friday Special',
          content: 'Read Surah Al-Kahf as recommended for Fridays. This blessed chapter contains stories of faith, patience, and divine guidance that illuminate the heart.',
          reason: 'Special Friday recommendation. Reading Surah Al-Kahf on Friday brings immense spiritual benefits.',
          personalizedScore: Math.min(98, 80 + timeBonus + 15), // Friday bonus
          estimatedTime: 35,
          difficulty: 'intermediate',
          priority: 10,
          tags: ['friday', 'special', 'blessed', 'stories'],
          aiGenerated: true,
          timeContext: 'friday-evening',
          engagementBoost: 25
        });
      }
    }

    if (currentHour >= 22 || currentHour <= 4) {
      // Night recommendations
      recommendations.push({
        id: uuidv4(),
        type: 'reflection',
        title: 'Night Reflection and Istighfar',
        content: 'Reflect on the day\'s actions, seek forgiveness through istighfar, and prepare your heart for rest. Let gratitude and repentance cleanse your soul.',
        reason: 'Night reflection helps process the day\'s experiences and maintains spiritual consciousness.',
        personalizedScore: Math.min(87, 65 + (stats.currentStreak * 2)),
        estimatedTime: 18,
        difficulty: 'intermediate',
        priority: 7,
        tags: ['night', 'reflection', 'istighfar', 'peace'],
        aiGenerated: true,
        timeContext: 'night',
        engagementBoost: 12
      });
    }

    // Personalized recommendations based on reading history
    const lastSession = history[history.length - 1];
    if (lastSession && Date.now() - lastSession.timestamp.getTime() > 24 * 60 * 60 * 1000) {
      // If more than 24 hours since last session, add motivational content
      recommendations.push({
        id: uuidv4(),
        type: lastSession.type, // Same type as last successful session
        title: 'Welcome Back - Gentle Return',
        content: `Continue your spiritual journey with a gentle ${lastSession.type} session. Every step back to Allah is a victory worth celebrating.`,
        reason: 'Designed to help you gently return to your spiritual practice after a break.',
        personalizedScore: Math.min(85, 60 + (lastSession.engagement * 2)),
        estimatedTime: Math.max(5, lastSession.duration - 5), // Shorter than last session
        difficulty: 'beginner', // Always start easy after a break
        priority: 9,
        tags: ['welcome-back', 'gentle', 'encouraging'],
        aiGenerated: true,
        timeContext: 'return',
        engagementBoost: 15
      });
    }

    // Sort by priority and personalized score
    return recommendations.sort((a, b) => {
      if (a.priority !== b.priority) return b.priority - a.priority;
      return b.personalizedScore - a.personalizedScore;
    }).slice(0, 4); // Return top 4 recommendations
  }

  // Method to update user preferences
  updateUserPreferences(newPreferences: Partial<typeof this.defaultUserPreferences>) {
    const userData = this.getUserData();
    userData.preferences = { ...userData.preferences, ...newPreferences };
    this.saveUserData(userData);
  }

  // Method to reset streak (for testing or user request)
  resetStreak() {
    const userData = this.getUserData();
    userData.stats.currentStreak = 0;
    this.saveUserData(userData);
  }

  // Method to get content recommendations for specific type
  getContentRecommendationsForType(type: AIContentType, limit: number = 3): AIRecommendation[] {
    return this.generatePersonalizedRecommendations()
      .filter(rec => rec.type === type)
      .slice(0, limit);
  }
}

export const aiPersonalizationEngine = new AIPersonalizationEngine();
