
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BottomTabBar from '@/components/BottomTabBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen, MessageSquare, Lightbulb, Calendar, Quote, Brain } from 'lucide-react';

// Import existing components
import QuranSurahGrid from '@/components/QuranSurahGrid';
import HadithSearchEngine from '@/components/HadithSearchEngine';

// Import new Phase 2 components
import IslamicDailyReflection from '@/components/IslamicDailyReflection';
import QuranicWordLearning from '@/components/QuranicWordLearning';
import IslamicEventsCalendar from '@/components/IslamicEventsCalendar';
import HadithOfTheDay from '@/components/HadithOfTheDay';
import IslamicQuoteGenerator from '@/components/IslamicQuoteGenerator';

const Books: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'quran';
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6 pb-24">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Islamic Knowledge Hub
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Explore the Quran, Hadith, and deepen your Islamic knowledge
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6">
            <TabsTrigger value="quran" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Quran</span>
            </TabsTrigger>
            <TabsTrigger value="hadith" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Hadith</span>
            </TabsTrigger>
            <TabsTrigger value="learning" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Learning</span>
            </TabsTrigger>
            <TabsTrigger value="reflection" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              <span className="hidden sm:inline">Reflection</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
            <TabsTrigger value="quotes" className="flex items-center gap-2">
              <Quote className="w-4 h-4" />
              <span className="hidden sm:inline">Quotes</span>
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(100vh-220px)]">
            {/* Quran Tab */}
            <TabsContent value="quran" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-teal-600" />
                    Holy Quran
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <QuranSurahGrid />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Hadith Tab */}
            <TabsContent value="hadith" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <HadithOfTheDay />
                <div>
                  <HadithSearchEngine />
                </div>
              </div>
            </TabsContent>

            {/* Learning Tab */}
            <TabsContent value="learning" className="space-y-6">
              <QuranicWordLearning />
            </TabsContent>

            {/* Reflection Tab */}
            <TabsContent value="reflection" className="space-y-6">
              <IslamicDailyReflection />
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar" className="space-y-6">
              <IslamicEventsCalendar />
            </TabsContent>

            {/* Quotes Tab */}
            <TabsContent value="quotes" className="space-y-6">
              <IslamicQuoteGenerator />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>

      <BottomTabBar />
    </div>
  );
};

export default Books;
