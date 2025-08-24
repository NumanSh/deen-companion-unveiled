
import React from 'react';
import { QuranSurah } from '@/services/quranService';

interface QuranStatsProps {
  totalSurahs: number;
  filteredSurahs: number;
}

const QuranStats: React.FC<QuranStatsProps> = ({
  totalSurahs,
  filteredSurahs
}) => {
  return (
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-emerald-800 dark:text-emerald-200">Complete Quran</h3>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            {totalSurahs} Surahs • Arabic with English Translation • Audio Recitation
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">{filteredSurahs}</div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400">Available</div>
        </div>
      </div>
    </div>
  );
};

export default QuranStats;
