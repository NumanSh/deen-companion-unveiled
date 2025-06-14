
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, MapPin, Star, Moon, Sun } from "lucide-react";
import BottomTabBar from "@/components/BottomTabBar";
import IslamicCalendar from "@/components/IslamicCalendar";
import PrayerTimesWidget from "@/components/PrayerTimesWidget";
import QiblaCompass from "@/components/QiblaCompass";
import { cn } from "@/lib/utils";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20 relative overflow-hidden">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-600"></div>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
          <defs>
            <pattern id="islamic-pattern-calendar" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20,0 L40,20 L20,40 L0,20 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern-calendar)"/>
        </svg>
      </div>

      <div className="flex-1 px-4 py-6 relative">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Enhanced Header */}
          <div className="text-center space-y-4 mb-8">
            <div className="relative inline-flex items-center gap-3">
              <div className="relative">
                <CalendarIcon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                <Star className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-blue-700 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
                Islamic Calendar
              </h1>
              <div className="relative">
                <Moon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="text-emerald-700 dark:text-emerald-300 font-medium text-lg">
              Prayer times, Islamic dates, and Qibla direction
            </p>
          </div>

          {/* Enhanced Islamic Calendar */}
          <Card className="relative backdrop-blur-sm bg-white/95 dark:bg-gray-900/95 border-emerald-200 dark:border-emerald-800 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 border-b border-emerald-100 dark:border-emerald-800">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="relative">
                  <CalendarIcon className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                  <Star className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
                </div>
                <span className="bg-gradient-to-r from-emerald-700 to-blue-700 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent font-bold">
                  Hijri Calendar
                </span>
              </CardTitle>
              <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-2 font-medium">
                Important Islamic dates and events
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <IslamicCalendar />
            </CardContent>
          </Card>

          {/* Enhanced Prayer Times */}
          <div className="relative">
            <PrayerTimesWidget />
          </div>

          {/* Enhanced Qibla Compass */}
          <div className="relative">
            <QiblaCompass />
          </div>
        </div>
      </div>
      
      <BottomTabBar />
    </div>
  );
};

export default Calendar;
