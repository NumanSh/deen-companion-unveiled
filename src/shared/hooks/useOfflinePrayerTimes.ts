import { useState, useEffect } from 'react';

export const useOfflinePrayerTimes = () => {
  const [cachedTimes, setCachedTimes] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadOfflineTimes = () => {
    setLoading(true);
    // Simulate loading offline prayer times
    setTimeout(() => {
      setCachedTimes({
        fajr: '05:30',
        dhuhr: '12:30', 
        asr: '15:45',
        maghrib: '18:20',
        isha: '19:45'
      });
      setLoading(false);
    }, 100);
  };

  return { cachedTimes, loading, loadOfflineTimes };
};