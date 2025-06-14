
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Compass, Calendar as CalendarIcon, Book, Sun, Moon, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "@/components/BottomTabBar";
import PrayerTimesWidget from "@/components/PrayerTimesWidget";
import QiblaCompass from "@/components/QiblaCompass";
import WeatherPrayerBanner from "@/components/WeatherPrayerBanner";
import { cn } from "@/lib/utils";

const Index = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const quickActions = [
    {
      title: "Prayer Times",
      icon: Clock,
      description: "View today's prayer schedule",
      action: () => navigate("/calendar"),
      gradient: "from-emerald-500 to-blue-500",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30"
    },
    {
      title: "Qibla Direction",
      icon: Compass,
      description: "Find direction to Mecca",
      action: () => navigate("/calendar"),
      gradient: "from-blue-500 to-purple-500",
      iconBg: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      title: "Islamic Calendar",
      icon: CalendarIcon,
      description: "Important Islamic dates",
      action: () => navigate("/calendar"),
      gradient: "from-purple-500 to-pink-500",
      iconBg: "bg-purple-100 dark:bg-purple-900/30"
    },
    {
      title: "Quran & Hadith",
      icon: Book,
      description: "Read holy texts",
      action: () => navigate("/books"),
      gradient: "from-pink-500 to-red-500",
      iconBg: "bg-pink-100 dark:bg-pink-900/30"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20 relative overflow-hidden">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-600"></div>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
          <defs>
            <pattern id="islamic-pattern-main" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20,0 L40,20 L20,40 L0,20 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern-main)"/>
        </svg>
      </div>

      <div className="flex-1 px-4 py-6 relative">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Enhanced Header */}
          <div className="text-center space-y-4 mb-8">
            <div className="relative inline-flex items-center gap-3">
              <div className="relative">
                <Star className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-blue-700 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
                Deen Companion
              </h1>
              <div className="relative">
                <Moon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="text-emerald-700 dark:text-emerald-300 font-medium text-lg">
              السلام عليكم - Your Islamic companion
            </p>
            
            {/* Enhanced Time Display */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/50 dark:to-blue-950/50 px-6 py-3 rounded-2xl border-2 border-emerald-200 dark:border-emerald-700 shadow-lg">
              <Sun className="w-5 h-5 text-amber-500" />
              <span className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                {formatTime(currentTime)}
              </span>
              <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>

          {/* Enhanced Weather Prayer Banner */}
          <div className="relative">
            <WeatherPrayerBanner />
          </div>

          {/* Enhanced Quick Actions */}
          <Card className="relative backdrop-blur-sm bg-white/95 dark:bg-gray-900/95 border-emerald-200 dark:border-emerald-800 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 border-b border-emerald-100 dark:border-emerald-800">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="relative">
                  <MapPin className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                  <Star className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
                </div>
                <span className="bg-gradient-to-r from-emerald-700 to-blue-700 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent font-bold">
                  Quick Actions
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <div
                      key={index}
                      className={cn(
                        "group relative border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer",
                        "bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-850",
                        "border-emerald-100 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-600"
                      )}
                      onClick={action.action}
                    >
                      {/* Decorative Corner Elements */}
                      <div className="absolute top-4 right-4 w-6 h-6 opacity-20">
                        <svg viewBox="0 0 24 24" className="w-full h-full text-emerald-600">
                          <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
                        </svg>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110",
                          action.iconBg
                        )}>
                          <Icon className="w-6 h-6 text-emerald-700 dark:text-emerald-300" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            {action.description}
                          </p>
                        </div>
                      </div>

                      {/* Gradient Border Effect */}
                      <div className={cn(
                        "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r",
                        action.gradient
                      )}></div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Prayer Times Widget */}
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

export default Index;
