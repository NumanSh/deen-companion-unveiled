
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Brain, Star, Clock, MapPin, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AIIslamicCalendar = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    generateSmartCalendar();
  }, []);

  const generateSmartCalendar = async () => {
    setIsLoading(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockEvents = [
      {
        date: 'Today',
        event: 'Laylat al-Qadr (Night of Power)',
        type: 'spiritual',
        aiInsight: 'Perfect time for extra prayers and Quran recitation based on your spiritual goals',
        personalizedAction: 'Recite Surah Al-Qadr and make dua for forgiveness'
      },
      {
        date: 'Tomorrow',
        event: 'Local Islamic Conference',
        type: 'community',
        aiInsight: 'Matches your interest in Islamic scholarship and community engagement',
        personalizedAction: 'Attend the session on "Modern Challenges in Islamic Finance"'
      },
      {
        date: 'This Weekend',
        event: 'Charity Drive at Local Mosque',
        type: 'charity',
        aiInsight: 'Aligns with your sadaqah goals and community involvement preferences',
        personalizedAction: 'Volunteer for 2 hours and contribute to winter clothing drive'
      }
    ];

    const mockRecommendations = [
      {
        title: 'Optimize Fajr Preparation',
        description: 'AI detected you rush Fajr prayers. Try waking up 15 minutes earlier.',
        priority: 'high'
      },
      {
        title: 'Join Study Circle',
        description: 'Based on your learning patterns, join the Tuesday Hadith study group.',
        priority: 'medium'
      }
    ];

    setEvents(mockEvents);
    setRecommendations(mockRecommendations);
    setIsLoading(false);

    toast({
      title: "Smart Calendar Updated",
      description: "AI has personalized your Islamic calendar with recommendations.",
    });
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'spiritual': return 'bg-purple-100 text-purple-800';
      case 'community': return 'bg-blue-100 text-blue-800';
      case 'charity': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
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
            AI Islamic Calendar
          </span>
        </CardTitle>
        <p className="text-sm text-violet-700 dark:text-violet-300">
          Personalized Islamic events and spiritual opportunities powered by AI
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button 
          onClick={generateSmartCalendar}
          disabled={isLoading}
          className="w-full bg-violet-600 hover:bg-violet-700"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating Smart Calendar...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Refresh AI Calendar
            </div>
          )}
        </Button>

        {/* Upcoming Events */}
        <div className="space-y-3">
          <h4 className="font-semibold text-violet-700 dark:text-violet-300 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Personalized Events
          </h4>
          {events.map((event, index) => (
            <div key={index} className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-violet-200 dark:border-violet-700">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h5 className="font-medium text-gray-800 dark:text-gray-200">{event.event}</h5>
                  <p className="text-sm text-violet-600 dark:text-violet-400">{event.date}</p>
                </div>
                <Badge className={getEventTypeColor(event.type)}>
                  {event.type}
                </Badge>
              </div>
              <div className="bg-violet-50 dark:bg-violet-900/50 p-3 rounded-lg mb-2">
                <p className="text-sm text-violet-700 dark:text-violet-300 mb-1">
                  <strong>AI Insight:</strong> {event.aiInsight}
                </p>
                <p className="text-sm text-violet-600 dark:text-violet-400">
                  <strong>Recommended Action:</strong> {event.personalizedAction}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* AI Recommendations */}
        <div className="bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900 dark:to-purple-900 p-4 rounded-lg">
          <h5 className="font-semibold text-violet-700 dark:text-violet-300 mb-3">
            Smart Recommendations
          </h5>
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg mb-2 last:mb-0">
              <h6 className="font-medium text-gray-800 dark:text-gray-200">{rec.title}</h6>
              <p className="text-sm text-gray-600 dark:text-gray-400">{rec.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIIslamicCalendar;
