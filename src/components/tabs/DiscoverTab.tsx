
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

// Existing AI-powered components
import AIQuranStudyCompanion from '@/components/AIQuranStudyCompanion';
import SmartIslamicLearningAssistant from '@/components/SmartIslamicLearningAssistant';
import AIIslamicLifeCoach from '@/components/AIIslamicLifeCoach';
import IntelligentPrayerAnalytics from '@/components/IntelligentPrayerAnalytics';
import AIIslamicNewsInsights from '@/components/AIIslamicNewsInsights';
import AIIslamicCalendar from '@/components/AIIslamicCalendar';
import SmartIslamicGoalSetter from '@/components/SmartIslamicGoalSetter';
import AIPersonalizedDhikr from '@/components/AIPersonalizedDhikr';
import SmartQuranCompanion from '@/components/SmartQuranCompanion';

// New cutting-edge AI features
import AIIslamicScholarChat from '@/components/AIIslamicScholarChat';
import SmartHadithAuthenticityChecker from '@/components/SmartHadithAuthenticityChecker';
import AIIslamicDreamAnalysis from '@/components/AIIslamicDreamAnalysis';
import DorarAqeedaIntegration from '@/components/DorarAqeedaIntegration';

const DiscoverTab = () => {
  return (
    <div className="space-y-6">
      <ContentDiscovery />
      <PersonalizedContentEngine />
      
      {/* 🚀 Revolutionary AI Features */}
      <div className="bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700">
        <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-4 text-center">
          🌟 Revolutionary AI Islamic Features
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AIIslamicScholarChat />
          <SmartHadithAuthenticityChecker />
        </div>
        <div className="mt-6">
          <AIIslamicDreamAnalysis />
        </div>
      </div>

      {/* 📚 Dorar.net Integration */}
      <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 p-4 rounded-lg border border-green-200 dark:border-green-700">
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4 text-center">
          📚 موقع الدرر السنية - العقيدة الإسلامية
        </h3>
        <DorarAqeedaIntegration />
      </div>
      
      {/* 🚀 Latest AI Innovations */}
      <div className="bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900 dark:to-rose-900 p-4 rounded-lg border border-pink-200 dark:border-pink-700">
        <h3 className="text-lg font-semibold text-pink-800 dark:text-pink-200 mb-4 text-center">
          🌟 Latest AI Innovations
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AIIslamicCalendar />
          <SmartIslamicGoalSetter />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <AIPersonalizedDhikr />
          <SmartQuranCompanion />
        </div>
      </div>
      
      {/* Previous AI-Powered Features */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
        <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-4 text-center">
          🚀 AI-Powered Features
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AIQuranStudyCompanion />
          <SmartIslamicLearningAssistant />
        </div>
        <div className="mt-6">
          <AIIslamicLifeCoach />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <IntelligentPrayerAnalytics />
          <AIIslamicNewsInsights />
        </div>
      </div>
      
      {/* Existing AI-Powered Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AISpiritualAdvisor />
        <QuranVerseMoodMatcher />
      </div>
      
      <VirtualHajjPreparation />
      <IslamicDreamInterpretation />
      <CommunityPrayerRequests />
      <IslamicFinanceCalculator />
      
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
