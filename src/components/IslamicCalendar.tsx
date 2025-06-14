
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, Moon, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type IslamicEvent = {
  id: string;
  name: string;
  type: 'major' | 'minor' | 'prayer';
  description?: string;
  hijriMonth: number;
  hijriDay: number;
};

const islamicEvents: IslamicEvent[] = [
  { id: '1', name: 'Muharram (New Year)', type: 'major', hijriMonth: 1, hijriDay: 1 },
  { id: '2', name: 'Ashura', type: 'major', hijriMonth: 1, hijriDay: 10 },
  { id: '3', name: 'Mawlid an-Nabi', type: 'major', hijriMonth: 3, hijriDay: 12 },
  { id: '4', name: 'Isra and Miraj', type: 'major', hijriMonth: 7, hijriDay: 27 },
  { id: '5', name: 'Ramadan Begins', type: 'major', hijriMonth: 9, hijriDay: 1 },
  { id: '6', name: 'Laylat al-Qadr', type: 'major', hijriMonth: 9, hijriDay: 27 },
  { id: '7', name: 'Eid al-Fitr', type: 'major', hijriMonth: 10, hijriDay: 1 },
  { id: '8', name: 'Hajj Season', type: 'major', hijriMonth: 12, hijriDay: 8 },
  { id: '9', name: 'Eid al-Adha', type: 'major', hijriMonth: 12, hijriDay: 10 },
];

const hijriMonths = [
  'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
  'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
  'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
];

// Simple Hijri date conversion (approximation)
const gregorianToHijri = (gregorianDate: Date) => {
  const HIJRI_EPOCH = new Date('622-07-16'); // Approximate start of Islamic calendar
  const daysDiff = Math.floor((gregorianDate.getTime() - HIJRI_EPOCH.getTime()) / (1000 * 60 * 60 * 24));
  const hijriYear = Math.floor(daysDiff / 354.367) + 1; // Average Hijri year length
  const remainingDays = daysDiff % 354.367;
  const hijriMonth = Math.floor(remainingDays / 29.531) + 1; // Average month length
  const hijriDay = Math.floor(remainingDays % 29.531) + 1;
  
  return {
    year: Math.max(1, Math.floor(hijriYear)),
    month: Math.max(1, Math.min(12, Math.floor(hijriMonth))),
    day: Math.max(1, Math.min(30, Math.floor(hijriDay)))
  };
};

const IslamicCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentHijri, setCurrentHijri] = useState(gregorianToHijri(new Date()));

  useEffect(() => {
    const today = new Date();
    setCurrentHijri(gregorianToHijri(today));
  }, []);

  const getCurrentMonthEvents = () => {
    const hijri = gregorianToHijri(currentDate);
    return islamicEvents.filter(event => event.hijriMonth === hijri.month);
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date();
    const isCurrentMonth = currentDate.getMonth() === today.getMonth() && 
                          currentDate.getFullYear() === today.getFullYear();

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const hijriDate = gregorianToHijri(date);
      const isToday = isCurrentMonth && day === today.getDate();
      const hasEvent = islamicEvents.some(event => 
        event.hijriMonth === hijriDate.month && event.hijriDay === hijriDate.day
      );

      days.push(
        <div
          key={day}
          className={cn(
            "p-2 text-center cursor-pointer rounded-lg transition-colors relative",
            isToday && "bg-blue-500 text-white font-bold",
            !isToday && hasEvent && "bg-green-100 dark:bg-green-900/30",
            !isToday && !hasEvent && "hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
          onClick={() => setSelectedDate(date)}
        >
          <div className="text-sm font-medium">{day}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {hijriDate.day}
          </div>
          {hasEvent && (
            <div className="absolute top-1 right-1">
              <Star className="w-3 h-3 text-green-600 fill-current" />
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const currentMonthEvents = getCurrentMonthEvents();

  return (
    <div className="space-y-6">
      {/* Current Hijri Date Display */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-center gap-3 text-center">
            <Moon className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">
                Today's Hijri Date
              </h3>
              <p className="text-lg text-blue-700 dark:text-blue-300">
                {currentHijri.day} {hijriMonths[currentHijri.month - 1]} {currentHijri.year} AH
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              Islamic Calendar
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth('prev')}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="text-center min-w-[150px]">
                <div className="font-semibold">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {hijriMonths[gregorianToHijri(currentDate).month - 1]} {gregorianToHijri(currentDate).year} AH
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth('next')}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center font-medium text-gray-600 dark:text-gray-400 text-sm">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {renderCalendarDays()}
          </div>
        </CardContent>
      </Card>

      {/* Islamic Events This Month */}
      {currentMonthEvents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-600" />
              Islamic Events This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentMonthEvents.map((event) => (
                <div
                  key={event.id}
                  className={cn(
                    "p-4 rounded-lg border-l-4",
                    event.type === 'major' && "border-l-green-500 bg-green-50 dark:bg-green-900/20",
                    event.type === 'minor' && "border-l-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-lg">{event.name}</h4>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {event.hijriDay} {hijriMonths[event.hijriMonth - 1]}
                    </span>
                  </div>
                  {event.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {event.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IslamicCalendar;
