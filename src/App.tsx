
import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/LanguageContext';
import MicroInteractionFeedback from '@/components/MicroInteractionFeedback';
import { prayerTimesApi } from '@/services/prayerTimesApi';
import { prayerNotificationService } from '@/services/prayerNotificationService';
import './App.css';

// Lazy load pages for better performance
const Index = lazy(() => import('./pages/Index'));
const Books = lazy(() => import('./pages/Books'));
const Calendar = lazy(() => import('./pages/Calendar'));
const PrayerTimes = lazy(() => import('./pages/PrayerTimes'));
const Settings = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
  </div>
);

function App() {
  useEffect(() => {
    // Initialize prayer times cache on app start
    prayerTimesApi.initializePrayerTimesCache();
    
    // Initialize prayer notification service
    prayerNotificationService.initialize().catch(error => {
      console.error('Failed to initialize prayer notification service:', error);
    });
  }, []);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'quran', label: 'Quran', icon: '📖' },
    { id: 'offline-quran', label: 'Offline Quran', icon: '📱' },
    { id: 'ai-recommendations', label: 'AI Recommendations', icon: '🤖' },
    { id: 'hadith-checker', label: 'Hadith Checker', icon: '🔍' },
    { id: 'smart-learning-path', label: 'Learning Path', icon: '🎯' },
    { id: 'adaptive-ui', label: 'Adaptive UI', icon: '🎨' },
    { id: 'mosque-finder', label: 'Mosque Finder', icon: '🕌' },
    { id: 'study-circle', label: 'Study Circle', icon: '👥' },
    { id: 'islamic-study-group', label: 'Study Group', icon: '📚' },
    { id: 'hadith', label: 'Hadith', icon: '📜' },
    { id: 'duas', label: 'Duas', icon: '🤲' },
    { id: 'habits', label: 'Habits', icon: '📊' },
    { id: 'discover', label: 'Discover', icon: '🌟' },
    { id: 'prayer-notifications', label: 'Prayer Notifications', icon: '🔔' }
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/books" element={<Books />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/prayer-times" element={<PrayerTimes />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Toaster />
            <MicroInteractionFeedback />
          </div>
        </Router>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
