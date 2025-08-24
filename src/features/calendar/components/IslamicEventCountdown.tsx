
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Star } from 'lucide-react';

interface IslamicEvent {
  name: string;
  date: Date;
  description: string;
  type: 'major' | 'minor';
  emoji: string;
}

const IslamicEventCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  const [nextEvent, setNextEvent] = useState<IslamicEvent | null>(null);

  // Islamic events for 2024-2025 (approximate dates)
  const islamicEvents: IslamicEvent[] = [
    {
      name: "Ramadan",
      date: new Date('2025-02-28'),
      description: "The holy month of fasting begins",
      type: 'major',
      emoji: '🌙'
    },
    {
      name: "Eid al-Fitr",
      date: new Date('2025-03-30'),
      description: "Festival of breaking the fast",
      type: 'major',
      emoji: '🎉'
    },
    {
      name: "Eid al-Adha",
      date: new Date('2025-06-06'),
      description: "Festival of sacrifice",
      type: 'major',
      emoji: '🕋'
    },
    {
      name: "Islamic New Year",
      date: new Date('2025-06-26'),
      description: "First day of Muharram",
      type: 'minor',
      emoji: '🌟'
    },
    {
      name: "Day of Ashura",
      date: new Date('2025-07-05'),
      description: "10th day of Muharram",
      type: 'minor',
      emoji: '🤲'
    },
    {
      name: "Mawlid an-Nabi",
      date: new Date('2025-09-04'),
      description: "Birth of Prophet Muhammad (PBUH)",
      type: 'major',
      emoji: '✨'
    }
  ];

  useEffect(() => {
    const findNextEvent = () => {
      const now = new Date();
      const upcomingEvents = islamicEvents
        .filter(event => event.date > now)
        .sort((a, b) => a.date.getTime() - b.date.getTime());
      
      return upcomingEvents[0] || islamicEvents[islamicEvents.length - 1];
    };

    const calculateTimeLeft = (targetDate: Date) => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    const updateCountdown = () => {
      const event = findNextEvent();
      setNextEvent(event);
      
      if (event) {
        setTimeLeft(calculateTimeLeft(event.date));
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []); // TODO: Add missing dependencies

  if (!nextEvent) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-600" />
          Next Islamic Event
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Event Info */}
        <div className="text-center space-y-2">
          <div className="text-4xl mb-2">{nextEvent.emoji}</div>
          <h3 className="text-2xl font-bold text-amber-800 dark:text-amber-200">
            {nextEvent.name}
          </h3>
          <p className="text-amber-600 dark:text-amber-400">
            {nextEvent.description}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            {formatDate(nextEvent.date)}
          </div>
        </div>

        {/* Countdown Display */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">
              {timeLeft.days}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 uppercase">
              Days
            </div>
          </div>
          
          <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">
              {timeLeft.hours}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 uppercase">
              Hours
            </div>
          </div>
          
          <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">
              {timeLeft.minutes}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 uppercase">
              Minutes
            </div>
          </div>
          
          <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">
              {timeLeft.seconds}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 uppercase">
              Seconds
            </div>
          </div>
        </div>

        {/* Upcoming Events List */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-600" />
            Upcoming Events
          </h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {islamicEvents
              .filter(event => event.date > new Date())
              .slice(0, 4)
              .map((event, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    event.name === nextEvent.name 
                      ? 'bg-amber-100 dark:bg-amber-800' 
                      : 'bg-gray-50 dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{event.emoji}</span>
                    <div>
                      <div className="text-sm font-medium">{event.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {event.date.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  {event.type === 'major' && (
                    <div className="w-2 h-2 bg-amber-500 rounded-full" title="Major Event" />
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* Preparation Message */}
        <div className="text-center p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
          <div className="text-sm text-amber-800 dark:text-amber-200">
            {timeLeft.days > 30 ? (
              "🕐 Time to prepare spiritually for this blessed occasion"
            ) : timeLeft.days > 7 ? (
              "🌟 The blessed event is approaching soon!"
            ) : (
              "✨ Very soon! May Allah bless this upcoming event"
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicEventCountdown;
