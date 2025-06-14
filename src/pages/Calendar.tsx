
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Star } from "lucide-react";
import BottomTabBar from "@/components/BottomTabBar";
import { useHijriDate } from "@/hooks/useHijriDate";

interface IslamicEvent {
  day: number;
  title: string;
  description: string;
  isImportant?: boolean;
}

const islamicEvents: Record<string, IslamicEvent[]> = {
  "Muharram": [
    { day: 1, title: "Islamic New Year", description: "Beginning of the Islamic calendar", isImportant: true },
    { day: 10, title: "Day of Ashura", description: "Day of fasting and remembrance", isImportant: true },
  ],
  "Safar": [],
  "Rabi al-Awwal": [
    { day: 12, title: "Mawlid al-Nabi", description: "Birth of Prophet Muhammad (PBUH)", isImportant: true },
  ],
  "Rabi al-Thani": [],
  "Jumada al-Awwal": [],
  "Jumada al-Thani": [],
  "Rajab": [
    { day: 27, title: "Isra and Mi'raj", description: "Night Journey of Prophet Muhammad (PBUH)", isImportant: true },
  ],
  "Shaban": [
    { day: 15, title: "Laylat al-Bara'at", description: "Night of Forgiveness", isImportant: true },
  ],
  "Ramadan": [
    { day: 1, title: "First Day of Ramadan", description: "Beginning of fasting month", isImportant: true },
    { day: 27, title: "Laylat al-Qadr", description: "Night of Power", isImportant: true },
  ],
  "Shawwal": [
    { day: 1, title: "Eid al-Fitr", description: "Festival of Breaking the Fast", isImportant: true },
  ],
  "Dhu al-Qadah": [],
  "Dhu al-Hijjah": [
    { day: 9, title: "Day of Arafah", description: "Day of pilgrimage", isImportant: true },
    { day: 10, title: "Eid al-Adha", description: "Festival of Sacrifice", isImportant: true },
  ],
};

const hijriMonths = [
  "Muharram", "Safar", "Rabi al-Awwal", "Rabi al-Thani",
  "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Shaban",
  "Ramadan", "Shawwal", "Dhu al-Qadah", "Dhu al-Hijjah"
];

const Calendar = () => {
  const currentHijri = useHijriDate();
  const [selectedMonth, setSelectedMonth] = useState(currentHijri.month);
  const [selectedYear, setSelectedYear] = useState(currentHijri.year);

  const currentMonthIndex = hijriMonths.indexOf(selectedMonth);
  const events = islamicEvents[selectedMonth] || [];

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      if (currentMonthIndex === 11) {
        setSelectedMonth(hijriMonths[0]);
        setSelectedYear(selectedYear + 1);
      } else {
        setSelectedMonth(hijriMonths[currentMonthIndex + 1]);
      }
    } else {
      if (currentMonthIndex === 0) {
        setSelectedMonth(hijriMonths[11]);
        setSelectedYear(selectedYear - 1);
      } else {
        setSelectedMonth(hijriMonths[currentMonthIndex - 1]);
      }
    }
  };

  const getDaysInMonth = (month: string) => {
    const monthData = [
      { name: 'Muharram', days: 30 },
      { name: 'Safar', days: 29 },
      { name: 'Rabi al-Awwal', days: 30 },
      { name: 'Rabi al-Thani', days: 29 },
      { name: 'Jumada al-Awwal', days: 30 },
      { name: 'Jumada al-Thani', days: 29 },
      { name: 'Rajab', days: 30 },
      { name: 'Shaban', days: 29 },
      { name: 'Ramadan', days: 30 },
      { name: 'Shawwal', days: 29 },
      { name: 'Dhu al-Qadah', days: 30 },
      { name: 'Dhu al-Hijjah', days: 29 }
    ];
    return monthData.find(m => m.name === month)?.days || 30;
  };

  const daysInMonth = getDaysInMonth(selectedMonth);
  const isCurrentMonth = selectedMonth === currentHijri.month && selectedYear === currentHijri.year;

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20">
      <div className="flex-1 px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-center mb-8">Islamic Calendar</h1>
          
          {/* Month Navigation */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <CardTitle className="text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <CalendarIcon className="w-5 h-5" />
                    <span>{selectedMonth} {selectedYear} AH</span>
                  </div>
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {/* Week days header */}
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <div key={index} className="text-center text-sm font-medium text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
                
                {/* Calendar days */}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const hasEvent = events.some(event => event.day === day);
                  const isToday = isCurrentMonth && day === currentHijri.day;
                  
                  return (
                    <div
                      key={day}
                      className={`
                        relative p-2 text-center text-sm rounded-lg border transition-colors
                        ${isToday ? 'bg-primary text-primary-foreground font-bold' : 'hover:bg-muted'}
                        ${hasEvent ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-border'}
                      `}
                    >
                      {day}
                      {hasEvent && (
                        <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Events for Selected Month */}
          {events.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Important Dates in {selectedMonth}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events
                    .sort((a, b) => a.day - b.day)
                    .map((event, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-l-4 ${
                          event.isImportant
                            ? 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                            : 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{event.title}</h3>
                            <p className="text-muted-foreground mt-1">{event.description}</p>
                          </div>
                          <span className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-sm font-medium">
                            {event.day}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Today's Date Card */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-emerald-900 dark:to-green-900">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CalendarIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-lg font-semibold text-green-900 dark:text-green-100">
                  Today
                </span>
              </div>
              <p className="text-green-800 dark:text-green-200 font-medium">
                {currentHijri.day} {currentHijri.month} {currentHijri.year} AH
              </p>
              <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <BottomTabBar />
    </div>
  );
};

export default Calendar;
