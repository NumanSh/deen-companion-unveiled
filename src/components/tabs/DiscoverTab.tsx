
import React from 'react';
import QuranicVerseOfDay from '@/components/QuranicVerseOfDay';
import DigitalMushafReader from '@/components/DigitalMushafReader';
import QuranTranslationComparison from '@/components/QuranTranslationComparison';
import DigitalTafsirReader from '@/components/DigitalTafsirReader';
import TafsirComparisonTool from '@/components/TafsirComparisonTool';
import QuranVerseContextExplorer from '@/components/QuranVerseContextExplorer';
import QuranMemorizationTracker from '@/components/QuranMemorizationTracker';
import QuranicWordLearning from '@/components/QuranicWordLearning';
import DailyVerseReflection from '@/components/DailyVerseReflection';
import AsmaUlHusna from '@/components/AsmaUlHusna';

const DiscoverTab = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-teal-800 mb-2">Quran Study & Discovery</h2>
        <p className="text-teal-600">Advanced tools for deeper understanding and reflection</p>
      </div>
      
      <QuranicVerseOfDay />
      <DailyVerseReflection />
      <AsmaUlHusna />
      
      <div className="border-t border-teal-200 pt-6">
        <h3 className="text-lg font-semibold text-teal-700 mb-4">Reading & Study Tools</h3>
        <div className="space-y-6">
          <DigitalMushafReader />
          <QuranTranslationComparison />
          <DigitalTafsirReader />
          <TafsirComparisonTool />
          <QuranVerseContextExplorer />
        </div>
      </div>
      
      <div className="border-t border-teal-200 pt-6">
        <h3 className="text-lg font-semibold text-teal-700 mb-4">Learning & Memorization</h3>
        <div className="space-y-6">
          <QuranMemorizationTracker />
          <QuranicWordLearning />
        </div>
      </div>
    </div>
  );
};

export default DiscoverTab;
