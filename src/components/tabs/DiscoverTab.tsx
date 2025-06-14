import React from 'react';
import ContentDiscovery from '@/components/ContentDiscovery';
import PersonalizedContentEngine from '@/components/PersonalizedContentEngine';
import VirtualIslamicStudyGroup from '@/components/VirtualIslamicStudyGroup';
import IslamicWisdomCollection from '@/components/IslamicWisdomCollection';
import IslamicFatwaDatabase from '@/components/IslamicFatwaDatabase';
import HadithSearchEngine from '@/components/HadithSearchEngine';
import IslamicScholarQuotes from '@/components/IslamicScholarQuotes';
import FiqhQASection from '@/components/FiqhQASection';
import TafsirComparisonTool from '@/components/TafsirComparisonTool';
import QuranVerseContextExplorer from '@/components/QuranVerseContextExplorer';
import IslamicBookLibrary from '@/components/IslamicBookLibrary';
import IslamicArticleLibrary from '@/components/IslamicArticleLibrary';
import VirtualStudyCircle from '@/components/VirtualStudyCircle';
import IslamicAudioLibrary from '@/components/IslamicAudioLibrary';
import AIHadithCompanion from '@/components/AIHadithCompanion';
import IslamicNameMeanings from '@/components/IslamicNameMeanings';
import QuranMemorizationTracker from '@/components/QuranMemorizationTracker';
import IslamicFinanceTracker from '@/components/IslamicFinanceTracker';
import HijriDateConverter from '@/components/HijriDateConverter';
import QiblaCompass from '@/components/QiblaCompass';
import VirtualMosqueFinder from '@/components/VirtualMosqueFinder';
import IslamicLearningPath from '@/components/IslamicLearningPath';
import IslamicKnowledgeQuiz from '@/components/IslamicKnowledgeQuiz';
import AsmaUlHusna from '@/components/AsmaUlHusna';
import IslamicStoriesHub from '@/components/IslamicStoriesHub';
import IslamicEventCountdown from '@/components/IslamicEventCountdown';
import AISpiritualAdvisor from '@/components/AISpiritualAdvisor';
import VirtualHajjPreparation from '@/components/VirtualHajjPreparation';
import IslamicDreamInterpretation from '@/components/IslamicDreamInterpretation';
import CommunityPrayerRequests from '@/components/CommunityPrayerRequests';
import IslamicFinanceCalculator from '@/components/IslamicFinanceCalculator';
import QuranVerseMoodMatcher from '@/components/QuranVerseMoodMatcher';

const DiscoverTab = () => {
  return (
    <div className="space-y-6">
      <ContentDiscovery />
      <PersonalizedContentEngine />
      
      {/* New AI-Powered Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AISpiritualAdvisor />
        <QuranVerseMoodMatcher />
      </div>
      
      <VirtualHajjPreparation />
      <IslamicDreamInterpretation />
      <CommunityPrayerRequests />
      <IslamicFinanceCalculator />
      
      {/* Existing Components */}
      <VirtualIslamicStudyGroup />
      <IslamicWisdomCollection />
      <IslamicFatwaDatabase />
      <HadithSearchEngine />
      <IslamicScholarQuotes />
      <FiqhQASection />
      <TafsirComparisonTool />
      <QuranVerseContextExplorer />
      <IslamicBookLibrary />
      <IslamicArticleLibrary />
      <VirtualStudyCircle />
      <IslamicAudioLibrary />
      <AIHadithCompanion />
      <IslamicNameMeanings />
      <QuranMemorizationTracker />
      <IslamicFinanceTracker />
      <HijriDateConverter />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QiblaCompass />
        <VirtualMosqueFinder />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IslamicLearningPath />
        <IslamicKnowledgeQuiz />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AsmaUlHusna />
        <IslamicStoriesHub />
      </div>
      <IslamicEventCountdown />
    </div>
  );
};

export default DiscoverTab;
