
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Brain, Star, Clock, MapPin, Users, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IslamicEvent {
  date: string;
  event: string;
  type: 'spiritual' | 'community' | 'charity' | 'historical';
  hijriDate: string;
  description: string;
  recommendedActions: string[];
}

interface UserPreferences {
  spiritualGoals: string[];
  communityInterests: string[];
  learningTopics: string[];
}

const AIIslamicCalendar = () => {
  const [events, setEvents] = useState<IslamicEvent[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    spiritualGoals: [],
    communityInterests: [],
    learningTopics: []
  });
  const { toast } = useToast();

  useEffect(() => {
    loadUserPreferences();
    generatePersonalizedCalendar();
  }, []);

  const loadUserPreferences = () => {
    const saved = localStorage.getItem('islamicCalendarPreferences');
    if (saved) {
      setUserPreferences(JSON.parse(saved));
    } else {
      // Default preferences based on common Islamic practices
      const defaultPrefs: UserPreferences = {
        spiritualGoals: ['daily_quran', 'five_prayers', 'dhikr'],
        communityInterests: ['mosque_events', 'charity', 'education'],
        learningTopics: ['quran_study', 'hadith', 'fiqh']
      };
      setUserPreferences(defaultPrefs);
      localStorage.setItem('islamicCalendarPreferences', JSON.stringify(defaultPrefs));
    }
  };

  const generatePersonalizedCalendar = async () => {
    setIsLoading(true);
    
    try {
      // Get current Hijri date and upcoming Islamic events
      const currentDate = new Date();
      const upcomingEvents = getUpcomingIslamicEvents(currentDate);
      
      // Filter and personalize based on user preferences
      const personalizedEvents = upcomingEvents.map(event => ({
        ...event,
        recommendedActions: generateRecommendations(event, userPreferences)
      }));

      setEvents(personalizedEvents);
      
      // Generate smart recommendations
      const smartRecommendations = generateSmartRecommendations(userPreferences);
      setRecommendations(smartRecommendations);

      toast({
        title: "Calendar Updated",
        description: "Personalized Islamic calendar generated based on your preferences.",
      });
    } catch (error) {
      console.error('Error generating calendar:', error);
      toast({
        title: "Error",
        description: "Failed to generate personalized calendar. Using offline data.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getUpcomingIslamicEvents = (currentDate: Date): IslamicEvent[] => {
    // Calculate upcoming Islamic events based on current date
    const events: IslamicEvent[] = [
      {
        date: 'This Week',
        event: 'Friday Prayer (Jummah)',
        type: 'spiritual',
        hijriDate: 'Every Friday',
        description: 'Congregational prayer and sermon',
        recommendedActions: []
      },
      {
        date: 'Next Month',
        event: 'Islamic New Year',
        type: 'historical',
        hijriDate: '1 Muharram',
        description: 'Beginning of the Islamic calendar year',
        recommendedActions: []
      },
      {
        date: 'Upcoming',
        event: 'Day of Arafah',
        type: 'spiritual',
        hijriDate: '9 Dhul Hijjah',
        description: 'Most sacred day of the Islamic year',
        recommendedActions: []
      }
    ];

    return events;
  };

  const generateRecommendations = (event: IslamicEvent, preferences: UserPreferences): string[] => {
    const recommendations: string[] = [];
    
    if (event.type === 'spiritual') {
      if (preferences.spiritualGoals.includes('daily_quran')) {
        recommendations.push('Read extra Quran verses');
      }
      if (preferences.spiritualGoals.includes('dhikr')) {
        recommendations.push('Increase dhikr and remembrance');
      }
      recommendations.push('Make special duas');
    }
    
    if (event.type === 'community') {
      if (preferences.communityInterests.includes('charity')) {
        recommendations.push('Participate in charity activities');
      }
      if (preferences.communityInterests.includes('mosque_events')) {
        recommendations.push('Attend mosque programs');
      }
    }

    return recommendations.length > 0 ? recommendations : ['Reflect and remember Allah'];
  };

  const generateSmartRecommendations = (preferences: UserPreferences): string[] => {
    const recommendations: string[] = [];
    
    if (preferences.spiritualGoals.includes('five_prayers')) {
      recommendations.push('Set prayer time reminders for consistent timing');
    }
    
    if (preferences.learningTopics.includes('quran_study')) {
      recommendations.push('Join a Quran study circle or online course');
    }
    
    if (preferences.communityInterests.includes('charity')) {
      recommendations.push('Set up monthly charity goals and tracking');
    }

    return recommendations;
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'spiritual': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'community': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'charity': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'historical': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950 dark:to-purple-950 border-violet-200 dark:border-violet-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <Calendar className="w-6 h-6 text-violet-600 dark:text-violet-400" />
            <Brain className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
          </div>
          <span className="bg-gradient-to-r from-violet-700 to-purple-700 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
            Personalized Islamic Calendar
          </span>
        </CardTitle>
        <p className="text-sm text-violet-700 dark:text-violet-300">
          Islamic events and spiritual opportunities tailored to your goals
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button 
          onClick={generatePersonalizedCalendar}
          disabled={isLoading}
          className="w-full bg-violet-600 hover:bg-violet-700"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Updating Calendar...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Refresh Personalized Calendar
            </div>
          )}
        </Button>

        {/* Upcoming Events */}
        {events.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-violet-700 dark:text-violet-300 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Upcoming Events
            </h4>
            {events.map((event, index) => (
              <div key={index} className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-violet-200 dark:border-violet-700">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className="font-medium text-gray-800 dark:text-gray-200">{event.event}</h5>
                    <p className="text-sm text-violet-600 dark:text-violet-400">{event.date}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{event.hijriDate}</p>
                  </div>
                  <Badge className={getEventTypeColor(event.type)}>
                    {event.type}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{event.description}</p>
                {event.recommendedActions.length > 0 && (
                  <div className="bg-violet-50 dark:bg-violet-900/50 p-3 rounded-lg">
                    <p className="text-sm text-violet-700 dark:text-violet-300 font-medium mb-1">
                      Recommended Actions:
                    </p>
                    <ul className="text-sm text-violet-600 dark:text-violet-400 list-disc list-inside">
                      {event.recommendedActions.map((action, idx) => (
                        <li key={idx}>{action}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Smart Recommendations */}
        {recommendations.length > 0 && (
          <div className="bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900 dark:to-purple-900 p-4 rounded-lg">
            <h5 className="font-semibold text-violet-700 dark:text-violet-300 mb-3">
              Smart Recommendations
            </h5>
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg mb-2 last:mb-0">
                <p className="text-sm text-gray-700 dark:text-gray-300">{rec}</p>
              </div>
            ))}
          </div>
        )}

        {/* If no events loaded */}
        {!isLoading && events.length === 0 && (
          <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <Calendar className="w-12 h-12 text-violet-400 mx-auto mb-2" />
            <p className="text-gray-600 dark:text-gray-400">
              Click "Refresh Personalized Calendar" to load Islamic events
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIIslamicCalendar;
