interface LearningSession {
  id: string;
  type: 'quran' | 'hadith' | 'dua' | 'dhikr' | 'reflection';
  duration: number;
  completed: boolean;
  accuracy?: number;
  engagement: number; // 1-10 scale
  timestamp: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
}

interface LearningPattern {
  preferredTimes: number[]; // hours of day
  averageSessionLength: number;
  strongTopics: string[];
  improvementAreas: string[];
  learningVelocity: number;
  consistency: number;
}

interface AIInsight {
  id: string;
  type: 'strength' | 'improvement' | 'recommendation' | 'milestone';
  title: string;
  description: string;
  priority: number;
  actionable: boolean;
  estimatedImpact: 'low' | 'medium' | 'high';
}

class AdvancedLearningAnalytics {
  private storageKey = 'advanced-learning-analytics';

  private getStoredData() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : {
      sessions: [],
      patterns: null,
      insights: [],
      lastAnalysis: null
    };
  }

  private saveData(data: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  recordSession(session: Omit<LearningSession, 'id' | 'timestamp'>) {
    const data = this.getStoredData();
    const newSession: LearningSession = {
      ...session,
      id: Date.now().toString(),
      timestamp: Date.now()
    };
    
    data.sessions.push(newSession);
    
    // Keep only last 100 sessions
    if (data.sessions.length > 100) {
      data.sessions = data.sessions.slice(-100);
    }
    
    this.saveData(data);
    this.analyzePatterns();
  }

  private analyzePatterns() {
    const data = this.getStoredData();
    const sessions = data.sessions as LearningSession[];
    
    if (sessions.length < 5) return; // Need minimum data
    
    const patterns: LearningPattern = {
      preferredTimes: this.calculatePreferredTimes(sessions),
      averageSessionLength: this.calculateAverageSessionLength(sessions),
      strongTopics: this.identifyStrongTopics(sessions),
      improvementAreas: this.identifyImprovementAreas(sessions),
      learningVelocity: this.calculateLearningVelocity(sessions),
      consistency: this.calculateConsistency(sessions)
    };
    
    data.patterns = patterns;
    data.insights = this.generateAIInsights(sessions, patterns);
    data.lastAnalysis = Date.now();
    
    this.saveData(data);
  }

  private calculatePreferredTimes(sessions: LearningSession[]): number[] {
    const hourCounts: { [hour: number]: number } = {};
    
    sessions.forEach(session => {
      const hour = new Date(session.timestamp).getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });
    
    return Object.entries(hourCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([hour]) => parseInt(hour));
  }

  private calculateAverageSessionLength(sessions: LearningSession[]): number {
    const completedSessions = sessions.filter(s => s.completed);
    if (completedSessions.length === 0) return 0;
    
    const totalDuration = completedSessions.reduce((sum, s) => sum + s.duration, 0);
    return Math.round(totalDuration / completedSessions.length);
  }

  private identifyStrongTopics(sessions: LearningSession[]): string[] {
    const topicPerformance: { [topic: string]: { total: number, success: number } } = {};
    
    sessions.forEach(session => {
      session.topics.forEach(topic => {
        if (!topicPerformance[topic]) {
          topicPerformance[topic] = { total: 0, success: 0 };
        }
        topicPerformance[topic].total++;
        if (session.completed && session.engagement >= 7) {
          topicPerformance[topic].success++;
        }
      });
    });
    
    return Object.entries(topicPerformance)
      .filter(([, data]) => data.total >= 3) // Minimum sessions
      .map(([topic, data]) => ({ topic, rate: data.success / data.total }))
      .sort((a, b) => b.rate - a.rate)
      .slice(0, 5)
      .map(item => item.topic);
  }

  private identifyImprovementAreas(sessions: LearningSession[]): string[] {
    const topicPerformance: { [topic: string]: { total: number, success: number } } = {};
    
    sessions.forEach(session => {
      session.topics.forEach(topic => {
        if (!topicPerformance[topic]) {
          topicPerformance[topic] = { total: 0, success: 0 };
        }
        topicPerformance[topic].total++;
        if (session.completed && session.engagement >= 7) {
          topicPerformance[topic].success++;
        }
      });
    });
    
    return Object.entries(topicPerformance)
      .filter(([, data]) => data.total >= 3) // Minimum sessions
      .map(([topic, data]) => ({ topic, rate: data.success / data.total }))
      .sort((a, b) => a.rate - b.rate)
      .slice(0, 3)
      .map(item => item.topic);
  }

  private calculateLearningVelocity(sessions: LearningSession[]): number {
    if (sessions.length < 10) return 0;
    
    const recentSessions = sessions.slice(-10);
    const olderSessions = sessions.slice(-20, -10);
    
    const recentAvg = recentSessions.reduce((sum, s) => sum + s.engagement, 0) / recentSessions.length;
    const olderAvg = olderSessions.length > 0 
      ? olderSessions.reduce((sum, s) => sum + s.engagement, 0) / olderSessions.length 
      : recentAvg;
    
    return Math.max(0, Math.min(10, recentAvg - olderAvg + 5));
  }

  private calculateConsistency(sessions: LearningSession[]): number {
    const last30Days = sessions.filter(s => 
      Date.now() - s.timestamp < 30 * 24 * 60 * 60 * 1000
    );
    
    const daysSeen = new Set(
      last30Days.map(s => new Date(s.timestamp).toDateString())
    ).size;
    
    return Math.round((daysSeen / 30) * 100);
  }

  private generateAIInsights(sessions: LearningSession[], patterns: LearningPattern): AIInsight[] {
    const insights: AIInsight[] = [];
    
    // Consistency insights
    if (patterns.consistency >= 80) {
      insights.push({
        id: 'consistency-excellent',
        type: 'strength',
        title: 'Excellent Consistency! 🌟',
        description: `You've maintained ${patterns.consistency}% consistency this month. This is the foundation of lasting Islamic knowledge.`,
        priority: 9,
        actionable: false,
        estimatedImpact: 'high'
      });
    } else if (patterns.consistency < 50) {
      insights.push({
        id: 'consistency-improvement',
        type: 'improvement',
        title: 'Build Learning Consistency',
        description: 'Try setting daily reminders for Islamic learning. Even 10 minutes daily creates lasting habits.',
        priority: 10,
        actionable: true,
        estimatedImpact: 'high'
      });
    }
    
    // Learning velocity insights
    if (patterns.learningVelocity >= 7) {
      insights.push({
        id: 'velocity-excellent',
        type: 'milestone',
        title: 'Accelerating Learning Journey! 🚀',
        description: 'Your engagement and comprehension are increasing. Consider exploring more advanced topics.',
        priority: 8,
        actionable: true,
        estimatedImpact: 'medium'
      });
    }
    
    // Topic-specific insights
    if (patterns.strongTopics.length > 0) {
      insights.push({
        id: 'strong-topics',
        type: 'strength',
        title: 'Your Learning Strengths',
        description: `You excel in: ${patterns.strongTopics.slice(0, 3).join(', ')}. Consider teaching or sharing these topics.`,
        priority: 7,
        actionable: true,
        estimatedImpact: 'medium'
      });
    }
    
    if (patterns.improvementAreas.length > 0) {
      insights.push({
        id: 'improvement-areas',
        type: 'recommendation',
        title: 'Growth Opportunities',
        description: `Focus on: ${patterns.improvementAreas[0]}. Try shorter, more frequent sessions to build confidence.`,
        priority: 8,
        actionable: true,
        estimatedImpact: 'high'
      });
    }
    
    // Time-based insights
    if (patterns.preferredTimes.length > 0) {
      const bestTime = patterns.preferredTimes[0];
      const timeOfDay = bestTime < 12 ? 'morning' : bestTime < 18 ? 'afternoon' : 'evening';
      insights.push({
        id: 'optimal-timing',
        type: 'recommendation',
        title: `Your Peak Learning Time: ${timeOfDay}`,
        description: `You're most engaged around ${bestTime}:00. Schedule important learning sessions during this time.`,
        priority: 6,
        actionable: true,
        estimatedImpact: 'medium'
      });
    }
    
    return insights.sort((a, b) => b.priority - a.priority);
  }

  getAnalytics() {
    const data = this.getStoredData();
    return {
      patterns: data.patterns,
      insights: data.insights,
      sessionCount: data.sessions.length,
      lastAnalysis: data.lastAnalysis
    };
  }

  getRecentSessions(limit: number = 10): LearningSession[] {
    const data = this.getStoredData();
    return data.sessions.slice(-limit).reverse();
  }

  exportData() {
    return this.getStoredData();
  }
}

export const advancedLearningAnalytics = new AdvancedLearningAnalytics();
export type { LearningSession, LearningPattern, AIInsight };
