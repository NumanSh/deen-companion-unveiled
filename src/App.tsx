
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from '@/components/ui/toaster';
import MicroInteractionFeedback from '@/components/MicroInteractionFeedback';
import Index from '@/pages/Index';
import Home from '@/pages/Home';
import Books from '@/pages/Books';
import Calendar from '@/pages/Calendar';
import PrayerTimes from '@/pages/PrayerTimes';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';
import './App.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/books" element={<Books />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/prayer-times" element={<PrayerTimes />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <MicroInteractionFeedback />
          </div>
        </Router>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
