import { useState, useEffect } from 'react';

interface HijriDate {
  day: number;
  month: string;
  year: number;
  monthNumber: number;
}

const useHijriDate = () => {
  const [hijriDate, setHijriDate] = useState<HijriDate | null>(null);
  const [loading, setLoading] = useState(true);

  const hijriMonths = [
    'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
    'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
  ];

  useEffect(() => {
    // Simple Hijri date calculation (approximation)
    const gregorianDate = new Date();
    const gregorianYear = gregorianDate.getFullYear();
    const gregorianMonth = gregorianDate.getMonth() + 1;
    const gregorianDay = gregorianDate.getDate();

    // Approximation formula for Hijri conversion
    const hijriYear = Math.floor((gregorianYear - 622) * 1.030684);
    const hijriMonthNumber = ((gregorianMonth + 6) % 12) + 1;
    const hijriDay = Math.floor(gregorianDay * 0.97);

    setHijriDate({
      day: hijriDay,
      month: hijriMonths[hijriMonthNumber - 1],
      year: hijriYear,
      monthNumber: hijriMonthNumber
    });
    setLoading(false);
  }, []);

  return { hijriDate, loading, hijriMonths };
};

export default useHijriDate;