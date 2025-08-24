
import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock, Navigation, MapPin } from 'lucide-react';
import { BottomTabBar } from '@/layout';
import { PrayerTimesWidget, QiblaCompass } from '@/features/prayer';

const PrayerTimes = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20 relative overflow-hidden">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
          <defs>
            <pattern id="islamic-pattern-prayer" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20,0 L40,20 L20,40 L0,20 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
              <path d="M20,12 L28,20 L20,28 L12,20 Z" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern-prayer)"/>
        </svg>
      </div>

      <div className="flex-1 px-4 md:px-6 lg:px-8 py-6 relative">
        <div className="w-full max-w-[1400px] mx-auto space-y-6">
          {/* Enhanced Header */}
          <div className="text-center space-y-4 mb-8">
            <div className="relative inline-flex items-center gap-3">
              <div className="relative">
                <Clock className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Prayer Times
              </h1>
              <div className="relative">
                <Navigation className="w-10 h-10 text-green-600 dark:text-green-400" />
                <div className="absolute -top-1 -left-1 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="text-xl text-blue-700 dark:text-blue-300 font-medium">
              Stay connected with your prayers and find the Qibla direction
            </p>
            <div className="flex justify-center items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Times</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Location Based</span>
              </div>
              <div className="flex items-center gap-1">
                <Navigation className="w-4 h-4" />
                <span>Qibla Compass</span>
              </div>
            </div>
          </div>

          {/* Prayer Times and Qibla Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Prayer Times Widget */}
            <div className="space-y-4 md:col-span-7 lg:col-span-8">
              <PrayerTimesWidget />
            </div>

            {/* Qibla Compass */}
            <div className="space-y-4 md:col-span-5 lg:col-span-4">
              <QiblaCompass />
              
              {/* Additional Info Card */}
              <Card className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-6">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-3">Prayer Guidelines</h3>
                <div className="space-y-2 text-sm text-green-700 dark:text-green-300">
                  <p>• Face the Qibla direction during prayer</p>
                  <p>• Perform Wudu (ablution) before prayer</p>
                  <p>• Find a clean place for prayer</p>
                  <p>• Pray on time for maximum reward</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Prayer Methods Info */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">About Prayer Time Calculations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Method Used</h4>
                <p>Islamic Society of North America (ISNA)</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Fajr Angle</h4>
                <p>15 degrees below horizon</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Isha Angle</h4>
                <p>15 degrees below horizon</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <BottomTabBar />
    </div>
  );
};

export default PrayerTimes;
