
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Compass, 
  BookOpen, 
  Bookmark, 
  Calendar,
  Type,
  Zap,
  Eye,
  Star,
  TrendingUp
} from 'lucide-react';
import IslamicBookLibrary from '@/components/IslamicBookLibrary';
import VoiceReadingMode from '@/components/VoiceReadingMode';
import ReadingProgressVisualization from '@/components/ReadingProgressVisualization';
import SmartBookmarksCollections from '@/components/SmartBookmarksCollections';
import DailyIslamicCalendar from '@/components/DailyIslamicCalendar';
import EnhancedTypographyControls from '@/components/EnhancedTypographyControls';
import QuickActionShortcuts from '@/components/QuickActionShortcuts';

const DiscoverTab = () => {
  const [currentVerse, setCurrentVerse] = useState(1);

  const features = [
    {
      id: 'voice-reading',
      title: 'التلاوة الصوتية',
      description: 'استمع للقرآن مع تحكم متقدم',
      icon: BookOpen,
      badge: 'جديد',
      component: VoiceReadingMode
    },
    {
      id: 'progress',
      title: 'تصور التقدم',
      description: 'تتبع رحلتك في القراءة',
      icon: TrendingUp,
      badge: 'محدث',
      component: ReadingProgressVisualization
    },
    {
      id: 'smart-bookmarks',
      title: 'المرجعيات الذكية',
      description: 'تنظيم متقدم للمحتوى المحفوظ',
      icon: Bookmark,
      component: SmartBookmarksCollections
    },
    {
      id: 'islamic-calendar',
      title: 'التقويم الإسلامي',
      description: 'أحداث وتذكيرات يومية',
      icon: Calendar,
      component: DailyIslamicCalendar
    },
    {
      id: 'typography',
      title: 'تحكم في الطباعة',
      description: 'خصص طريقة عرض النصوص',
      icon: Type,
      component: EnhancedTypographyControls
    },
    {
      id: 'library',
      title: 'المكتبة الرقمية',
      description: 'مجموعة شاملة من الكتب الإسلامية',
      icon: Star,
      component: IslamicBookLibrary
    }
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <Card className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <CardContent className="relative p-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Compass className="w-8 h-8" />
              <h1 className="text-4xl font-bold">أدوات الدراسة المتقدمة</h1>
              <Eye className="w-8 h-8" />
            </div>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              اكتشف مجموعة شاملة من الأدوات الذكية لتعزيز تجربتك في دراسة القرآن والعلوم الإسلامية
            </p>
            <div className="flex justify-center items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>6 أدوات متقدمة</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>مزامنة ذكية</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>استجابة فورية</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Tabs */}
      <Tabs defaultValue="voice-reading" className="w-full">
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 h-auto p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <TabsTrigger
                key={feature.id}
                value={feature.id}
                className="flex flex-col items-center gap-2 p-4 text-xs data-[state=active]:bg-white data-[state=active]:shadow-md"
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {feature.badge && (
                    <Badge className="absolute -top-2 -right-2 text-xs px-1 py-0 bg-red-500 text-white">
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                <span className="font-medium text-center leading-tight">
                  {feature.title}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {features.map((feature) => (
          <TabsContent key={feature.id} value={feature.id} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                  {feature.title}
                  {feature.badge && (
                    <Badge className="bg-blue-100 text-blue-800">
                      {feature.badge}
                    </Badge>
                  )}
                </CardTitle>
                <p className="text-gray-600">{feature.description}</p>
              </CardHeader>
              <CardContent>
                {feature.id === 'voice-reading' && (
                  <VoiceReadingMode
                    surahNumber={1}
                    surahName="الفاتحة"
                    totalVerses={7}
                    onVerseChange={setCurrentVerse}
                  />
                )}
                {feature.id === 'progress' && <ReadingProgressVisualization />}
                {feature.id === 'smart-bookmarks' && <SmartBookmarksCollections />}
                {feature.id === 'islamic-calendar' && <DailyIslamicCalendar />}
                {feature.id === 'typography' && <EnhancedTypographyControls />}
                {feature.id === 'library' && <IslamicBookLibrary />}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Quick Action Shortcuts - Always Available */}
      <QuickActionShortcuts />
    </div>
  );
};

export default DiscoverTab;
