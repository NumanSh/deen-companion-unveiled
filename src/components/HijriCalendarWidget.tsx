
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Moon, Star, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HijriDate {
  day: number;
  month: string;
  monthNumber: number;
  year: number;
  weekday: string;
}

interface IslamicEvent {
  date: string;
  title: string;
  description: string;
  type: 'major' | 'minor';
  emoji: string;
}

const HijriCalendarWidget: React.FC = () => {
  const [hijriDate, setHijriDate] = useState<HijriDate | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<IslamicEvent[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const { toast } = useToast();

  const hijriMonths = [
    'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaban',
    'Ramadan', 'Shawwal', 'Dhul Qidah', 'Dhul Hijjah'
  ];

  const islamicEvents: IslamicEvent[] = [
    {
      date: '1-1',
      title: 'Islamic New Year',
      description: 'Beginning of the Hijri calendar year',
      type: 'major',
      emoji: '🌙'
    },
    {
      date: '10-1',
      title: 'Day of Ashura',
      description: 'Recommended fasting day, historical significance',
      type: 'major',
      emoji: '🤲'
    },
    {
      date: '12-3',
      title: 'Mawlid an-Nabi',
      description: 'Birth of Prophet Muhammad (PBUH)',
      type: 'major',
      emoji: '🕌'
    },
    {
      date: '27-7',
      title: 'Isra and Miraj',
      description: 'Night Journey of Prophet Muhammad (PBUH)',
      type: 'major',
      emoji: '✨'
    },
    {
      date: '15-8',
      title: 'Laylat al-Bara\'at',
      description: 'Night of Forgiveness',
      type: 'minor',
      emoji: '🌟'
    },
    {
      date: '1-9',
      title: 'Beginning of Ramadan',
      description: 'Start of the holy month of fasting',
      type: 'major',
      emoji: '🌙'
    },
    {
      date: '27-9',
      title: 'Laylat al-Qadr',
      description: 'Night of Power (estimated date)',
      type: 'major',
      emoji: '⭐'
    },
    {
      date: '1-10',
      title: 'Eid al-Fitr',
      description: 'Festival of Breaking the Fast',
      type: 'major',
      emoji: '🎉'
    },
    {
      date: '10-12',
      title: 'Eid al-Adha',
      description: 'Festival of Sacrifice',
      type: 'major',
      emoji: '🕋'
    }
  ];

  // Simplified Hijri date calculation (approximation)
  const getHijriDate = (): HijriDate => {
    const today = new Date();
    const hijriEpoch = new Date('622-07-16'); // Approximate start of Hijri calendar
    const daysDifference = Math.floor((today.getTime() - hijriEpoch.getTime()) / (1000 * 60 * 60 * 24));
    
    // Approximate Hijri year calculation (354.367 days per Hijri year)
    const hijriYear = Math.floor(daysDifference / 354.367) + 1;
    const daysInCurrentYear = daysDifference % 354.367;
    
    // Approximate month and day calculation
    const monthIndex = Math.floor(daysInCurrentYear / 29.5);
    const dayOfMonth = Math.floor(daysInCurrentYear % 29.5) + 1;
    
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    return {
      day: Math.max(1, Math.min(30, dayOfMonth)),
      month: hijriMonths[Math.min(11, monthIndex)],
      monthNumber: Math.min(11, monthIndex) + 1,
      year: Math.floor(hijriYear),
      weekday: weekdays[today.getDay()]
    };
  };

  const getUpcomingEvents = (currentHijriDate: HijriDate): IslamicEvent[] => {
    const currentMonth = currentHijriDate.monthNumber;
    const currentDay = currentHijriDate.day;
    
    return islamicEvents
      .map(event => {
        const [day, month] = event.date.split('-').map(Number);
        let daysUntil = 0;
        
        if (month > currentMonth || (month === currentMonth && day >= currentDay)) {
          // Event is this year
          const daysInMonths = (month - currentMonth) * 29.5;
          daysUntil = Math.floor(daysInMonths + (day - currentDay));
        } else {
          // Event is next year
          const daysToYearEnd = (12 - currentMonth) * 29.5 + (29.5 - currentDay);
          const daysFromYearStart = (month - 1) * 29.5 + day;
          daysUntil = Math.floor(daysToYearEnd + daysFromYearStart);
        }
        
        return { ...event, daysUntil };
      })
      .sort((a, b) => (a as any).daysUntil - (b as any).daysUntil)
      .slice(0, 3);
  };

  useEffect(() => {
    const currentHijriDate = getHijriDate();
    setHijriDate(currentHijriDate);
    setSelectedMonth(currentHijriDate.monthNumber - 1);
    setUpcomingEvents(getUpcomingEvents(currentHijriDate));
  }, []);

  const handleEventClick = (event: IslamicEvent) => {
    toast({
      title: event.title,
      description: event.description,
    });
  };

  if (!hijriDate) return null;

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900/20 dark:to-blue-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Moon className="w-5 h-5 text-slate-600" />
          Hijri Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Hijri Date */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-slate-500">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-slate-700 dark:text-slate-300">
              {hijriDate.day}
            </div>
            <div className="text-lg font-semibold text-slate-600 dark:text-slate-400">
              {hijriDate.month} {hijriDate.year} AH
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {hijriDate.weekday}
            </div>
            <div className="text-xs text-gray-500">
              {new Date().toLocaleDateString()} (Gregorian)
            </div>
          </div>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedMonth(Math.max(0, selectedMonth - 1))}
            disabled={selectedMonth === 0}
          >
            Previous
          </Button>
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {hijriMonths[selectedMonth]}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedMonth(Math.min(11, selectedMonth + 1))}
            disabled={selectedMonth === 11}
          >
            Next
          </Button>
        </div>

        {/* Month Events */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Star className="w-4 h-4 text-slate-600" />
            Events in {hijriMonths[selectedMonth]}
          </h4>
          
          {islamicEvents
            .filter(event => {
              const [, month] = event.date.split('-').map(Number);
              return month === selectedMonth + 1;
            })
            .map((event, index) => (
              <div
                key={index}
                onClick={() => handleEventClick(event)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  event.type === 'major'
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 hover:border-blue-300'
                    : 'bg-gray-50 dark:bg-gray-800 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{event.emoji}</div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-800 dark:text-slate-200">
                      {event.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {event.description}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {event.date.split('-')[0]} {hijriMonths[selectedMonth]}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          
          {islamicEvents.filter(event => {
            const [, month] = event.date.split('-').map(Number);
            return month === selectedMonth + 1;
          }).length === 0 && (
            <div className="text-center py-4 text-gray-500">
              <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No special events this month</p>
            </div>
          )}
        </div>

        {/* Upcoming Events */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-600" />
            Upcoming Events
          </h4>
          
          {upcomingEvents.map((event, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-3 rounded-lg border flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{event.emoji}</span>
                <div>
                  <div className="font-medium text-sm">{event.title}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {event.description}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {(event as any).daysUntil === 0 ? 'Today' : 
                   (event as any).daysUntil === 1 ? 'Tomorrow' : 
                   `${(event as any).daysUntil} days`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HijriCalendarWidget;
