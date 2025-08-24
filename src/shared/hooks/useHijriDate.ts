
import { useState, useEffect } from 'react';

// Simple Hijri date calculation based on astronomical calculations
// This is an approximation - for precise religious dates, an API would be better
function calculateHijriDate(gregorianDate: Date) {
  // Hijri epoch starts on July 16, 622 CE (Gregorian)
  const hijriEpoch = new Date(622, 6, 16);
  const msPerDay = 24 * 60 * 60 * 1000;
  const daysSinceEpoch = Math.floor((gregorianDate.getTime() - hijriEpoch.getTime()) / msPerDay);
  
  // Average Hijri year is approximately 354.367 days
  const avgHijriYear = 354.367;
  const hijriYear = Math.floor(daysSinceEpoch / avgHijriYear) + 1;
  
  // Approximate day of year
  const dayOfYear = Math.floor(daysSinceEpoch % avgHijriYear);
  
  // Hijri months (approximate days)
  const hijriMonths = [
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
  
  let remainingDays = dayOfYear;
  let month = 0;
  let day = 1;
  
  for (let i = 0; i < hijriMonths.length; i++) {
    if (remainingDays <= hijriMonths[i].days) {
      month = i;
      day = Math.max(1, Math.floor(remainingDays));
      break;
    }
    remainingDays -= hijriMonths[i].days;
  }
  
  return {
    year: hijriYear,
    month: hijriMonths[month].name,
    day: day
  };
}

export function useHijriDate() {
  const [hijriDate, setHijriDate] = useState(() => {
    const now = new Date();
    return calculateHijriDate(now);
  });

  useEffect(() => {
    const updateHijriDate = () => {
      const now = new Date();
      setHijriDate(calculateHijriDate(now));
    };

    // Update at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    const timeoutId = setTimeout(() => {
      updateHijriDate();
      // Then update daily
      const intervalId = setInterval(updateHijriDate, 24 * 60 * 60 * 1000);
      return () => clearInterval(intervalId);
    }, msUntilMidnight);

    return () => clearTimeout(timeoutId);
  }, []);

  return hijriDate;
}
