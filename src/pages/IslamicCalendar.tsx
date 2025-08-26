import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Star, Moon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useHijriDate } from '@/shared';

interface IslamicEvent {
  date: number;
  month: number;
  title: string;
  description: string;
  isImportant: boolean;
}

const IslamicCalendar: React.FC = () => {
  const { hijriDate, loading, hijriMonths } = useHijriDate();
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentYear, setCurrentYear] = useState(1445);

  const islamicEvents: IslamicEvent[] = [
    { date: 1, month: 1, title: 'Islamic New Year', description: 'Beginning of Muharram', isImportant: true },
    { date: 10, month: 1, title: 'Day of Ashura', description: 'Day of fasting and remembrance', isImportant: true },
    { date: 12, month: 3, title: 'Mawlid an-Nabi', description: 'Prophet Muhammad\'s Birthday', isImportant: true },
    { date: 27, month: 7, title: 'Isra and Mi\'raj', description: 'Night Journey of the Prophet', isImportant: true },
    { date: 15, month: 8, title: 'Laylat al-Bara\'ah', description: 'Night of Forgiveness', isImportant: false },
    { date: 1, month: 9, title: 'Start of Ramadan', description: 'Beginning of fasting month', isImportant: true },
    { date: 27, month: 9, title: 'Laylat al-Qadr', description: 'Night of Power', isImportant: true },
    { date: 1, month: 10, title: 'Eid al-Fitr', description: 'Festival of Breaking the Fast', isImportant: true },
    { date: 10, month: 12, title: 'Eid al-Adha', description: 'Festival of Sacrifice', isImportant: true },
  ];

  useEffect(() => {
    if (hijriDate) {
      setCurrentMonth(hijriDate.monthNumber - 1);
      setCurrentYear(hijriDate.year);
    }
  }, [hijriDate]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  };

  const getEventsForMonth = (month: number) => {
    return islamicEvents.filter(event => event.month === month + 1);
  };

  const getDaysInMonth = (month: number) => {
    // Islamic months alternate between 29 and 30 days (simplified)
    const daysInMonths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
    return daysInMonths[month];
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const monthEvents = getEventsForMonth(currentMonth);
    const days = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = monthEvents.filter(event => event.date === day);
      const isToday = hijriDate && 
        day === hijriDate.day && 
        currentMonth === hijriDate.monthNumber - 1 && 
        currentYear === hijriDate.year;

      days.push(
        <div
          key={day}
          className={`
            relative p-2 h-16 border border-gray-200 dark:border-gray-700 
            ${isToday ? 'bg-green-100 dark:bg-green-900/30 border-green-500' : 'bg-white dark:bg-gray-800'}
            ${dayEvents.length > 0 ? 'hover:bg-blue-50 dark:hover:bg-blue-900/20' : ''}
          `}
        >
          <div className={`text-sm font-medium ${isToday ? 'text-green-700 dark:text-green-300' : ''}`}>
            {day}
          </div>
          {dayEvents.map((event, index) => (
            <div
              key={index}
              className={`
                absolute bottom-1 left-1 right-1 text-xs p-1 rounded truncate
                ${event.isImportant 
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' 
                  : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                }
              `}
              title={event.title}
            >
              {event.isImportant && <Star className="w-3 h-3 inline mr-1" />}
              {event.title}
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-none">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Calendar className="w-8 h-8" />
              Islamic Calendar
            </CardTitle>
            <p className="text-blue-100">Hijri Calendar & Islamic Events</p>
          </CardHeader>
        </Card>

        {/* Current Date Display */}
        {hijriDate && (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Moon className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold">Today</h2>
              </div>
              <p className="text-xl text-blue-600 font-semibold">
                {hijriDate.day} {hijriDate.month} {hijriDate.year} AH
              </p>
              <p className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Calendar Navigation */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <CardTitle className="text-xl">
                {hijriMonths[currentMonth]} {currentYear} AH
              </CardTitle>
              <Button variant="outline" onClick={() => navigateMonth('next')}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                <div key={day} className="p-2 text-center font-medium text-sm text-muted-foreground">
                  {day}
                </div>
              ))}
              {renderCalendarDays()}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Upcoming Islamic Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {islamicEvents
                .filter(event => event.month >= currentMonth + 1 || (event.month === currentMonth + 1 && event.date >= (hijriDate?.day || 1)))
                .slice(0, 5)
                .map((event, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className={`
                      flex-shrink-0 w-2 h-2 rounded-full mt-2
                      ${event.isImportant ? 'bg-red-500' : 'bg-blue-500'}
                    `}></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{event.title}</h4>
                        {event.isImportant && <Star className="w-4 h-4 text-yellow-500" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        {event.date} {hijriMonths[event.month - 1]}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Month Info */}
        <Card>
          <CardHeader>
            <CardTitle>About {hijriMonths[currentMonth]}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {currentMonth === 0 && (
                <p>Muharram is the first month of the Islamic calendar and one of the four sacred months. The 10th day (Ashura) is particularly significant.</p>
              )}
              {currentMonth === 8 && (
                <p>Ramadan is the ninth month of the Islamic calendar and the month of fasting. It commemorates the first revelation of the Quran to Muhammad.</p>
              )}
              {currentMonth === 9 && (
                <p>Shawwal is the tenth month of the Islamic calendar. The first day is celebrated as Eid al-Fitr, marking the end of Ramadan.</p>
              )}
              {currentMonth === 11 && (
                <p>Dhu al-Hijjah is the twelfth and final month of the Islamic calendar. It is the month of Hajj pilgrimage, and the 10th day is Eid al-Adha.</p>
              )}
              {![0, 8, 9, 11].includes(currentMonth) && (
                <p>This is the {currentMonth + 1}{['st', 'nd', 'rd'][currentMonth] || 'th'} month of the Islamic calendar with {getDaysInMonth(currentMonth)} days.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IslamicCalendar;