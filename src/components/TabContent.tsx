
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import DuasSection from './DuasSection';
import MorningEveningAdhkar from './MorningEveningAdhkar';
import QuranSection from './QuranSection';
import HadithSection from './HadithSection';

interface TabContentProps {
  activeTab: string;
  onAddToBookmarks: (id: number) => void;
  onSurahRead: (id: number) => void;
  readingSurahs: Set<number>;
  isLoading: boolean;
}

const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  onAddToBookmarks,
  onSurahRead,
  readingSurahs,
  isLoading
}) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case 'quran':
        return (
          <QuranSection
            onAddToBookmarks={onAddToBookmarks}
            onSurahRead={onSurahRead}
            readingSurahs={readingSurahs}
            isLoading={isLoading}
          />
        );
      case 'hadith':
        return <HadithSection />;
      case 'duas':
        return <DuasSection />;
      case 'athkar':
        return <MorningEveningAdhkar />;
      default:
        return (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">Select a tab to view content</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      {renderTabContent()}
    </div>
  );
};

export default TabContent;
