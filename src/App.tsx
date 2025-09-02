
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { performanceMonitor } from '@/features/tracking/services/performanceMonitoring';
// import { PerformanceDashboard } from '@/features/tracking';
import { MicroInteractionFeedback } from '@/shared';
import { prayerTimesApi } from '@/features/prayer/services/prayerTimesApi';
import { prayerNotificationService } from '@/features/prayer/services/prayerNotificationService';
import { voiceGuidedPrayerService } from '@/features/community/services/voiceGuidedPrayerService';
import { KeyboardShortcutsManager } from '@/shared';
import './App.css';

// Lazy load pages for better performance
const Index = lazy(() => import('./pages/Index'));
const Home = lazy(() => import('./pages/Home'));
const Books = lazy(() => import('./pages/Books'));
const QiblaCompass = lazy(() => import('./pages/QiblaCompass'));
const IslamicQuotes = lazy(() => import('./pages/IslamicQuotes'));
const IslamicCalendar = lazy(() => import('./pages/IslamicCalendar'));
const Calendar = lazy(() => import('./pages/Calendar'));
const PrayerTimes = lazy(() => import('./pages/PrayerTimes'));
const Settings = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50">
    <div className="text-center space-y-4">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-200 border-t-teal-600 mx-auto"></div>
      <div className="space-y-2">
        <p className="text-lg font-semibold text-teal-700">Loading Islamic App...</p>
        <p className="text-sm text-teal-600">بسم الله الرحمن الرحيم</p>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [showPerformanceDashboard, setShowPerformanceDashboard] = useState(false);

  useEffect(() => {
    // Initialize services asynchronously without blocking UI
    const initializeServices = async () => {
      try {
        // Initialize prayer times cache (non-blocking)
        prayerTimesApi.initializePrayerTimesCache().catch(error => {
          console.log('Prayer times cache initialization deferred:', error.message);
        });
        
        // Initialize prayer notification service (non-blocking)
        prayerNotificationService.initialize().catch(error => {
          console.log('Prayer notification service initialization deferred:', error.message);
        });

        // Initialize voice-guided prayer service (non-blocking)
        try {
          voiceGuidedPrayerService.initialize();
        } catch (error) {
          console.log('Voice service initialization deferred:', error);
        }
      } catch (error) {
        console.log('Service initialization deferred:', error);
      }
    };

    // Run initialization after UI loads
    setTimeout(initializeServices, 100);

    // Cleanup performance monitor on unmount
    return () => {
      try {
        performanceMonitor.destroy();
      } catch (error) {
        console.log('Performance monitor cleanup completed');
      }
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/home" element={<Home />} />
                <Route path="/books" element={<Books />} />
                <Route path="/qibla" element={<QiblaCompass />} />
                <Route path="/quotes" element={<IslamicQuotes />} />
                <Route path="/calendar" element={<IslamicCalendar />} />
                <Route path="/prayer-times" element={<PrayerTimes />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Toaster />
            <MicroInteractionFeedback />
            <KeyboardShortcutsManager />
            {/* Performance Dashboard commented out */}
            {/* <PerformanceDashboard 
              isVisible={showPerformanceDashboard}
              onClose={() => setShowPerformanceDashboard(false)}
            /> */}
          </div>
        </Router>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
