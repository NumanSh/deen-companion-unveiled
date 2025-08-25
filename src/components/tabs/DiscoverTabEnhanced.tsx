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
  TrendingUp,
  Brain,
  Users,
  Calculator,
  Heart,
  Target,
  BarChart3,
  Moon,
  Globe,
  Cloud,
  Headphones,
  DollarSign,
  Navigation,
  MessageCircle,
  Bell,
  Bot
} from 'lucide-react';
import { IslamicBookLibrary, IslamicHabitBuilder, IslamicHabitVisualization } from '@/features/tracking';
import { VoiceReadingMode } from '@/shared';
import { ReadingProgressVisualization } from '@/features/quran';
import { SmartBookmarksCollections } from '@/shared';
import { DailyIslamicCalendar } from '@/features/tracking';
import { EnhancedTypographyControls, QuickActionShortcuts } from '@/shared';
import { VirtualStudyCircle, CommunityEngagementHub } from '@/features/community';
import { AIIslamicLearningAssistant, AIPersonalizedLearningPath, IslamicDreamJournal, IslamicPodcastLibrary, AIIslamicChatbot, SmartNotificationDashboard } from '@/features/learning';
import { TafsirComparisonTool } from '@/features/quran';
// Create placeholder components for missing ones
const EnhancedZakatCalculator = () => <div className="p-4 text-center">Zakat Calculator - Coming Soon</div>;
const CommunityPrayerRequestsSystem = () => <div className="p-4 text-center">Prayer Requests - Coming Soon</div>;
const SmartPrayerWeatherIntegration = () => <div className="p-4 text-center">Prayer Weather - Coming Soon</div>;
const SmartQiblaCompassAR = () => <div className="p-4 text-center">Qibla Compass - Coming Soon</div>;
const IslamicFinanceCalculatorEnhanced = () => <div className="p-4 text-center">Finance Calculator - Coming Soon</div>;

const DiscoverTabEnhanced = () => {
  const [currentVerse, setCurrentVerse] = useState(1);

  const features = [
    {
      id: 'ai-chatbot',
      title: 'المساعد الذكي',
      description: 'مساعد AI للأسئلة الإسلامية مع إجابات فورية',
      icon: Bot,
      badge: 'جديد',
      component: AIIslamicChatbot
    },
    {
      id: 'community-hub',
      title: 'مركز المجتمع',
      description: 'تفاعل مع المجتمع الإسلامي ومشاركة التجارب',
      icon: Users,
      badge: 'جديد',
      component: CommunityEngagementHub
    },
    {
      id: 'smart-notifications',
      title: 'التنبيهات الذكية',
      description: 'نظام تنبيهات متقدم مع تخصيص كامل',
      icon: Bell,
      badge: 'جديد',
      component: SmartNotificationDashboard
    },
    {
      id: 'qibla-compass',
      title: 'البوصلة الذكية',
      description: 'بوصلة القبلة مع الواقع المعزز',
      icon: Navigation,
      badge: 'محدث',
      component: SmartQiblaCompassAR
    },
    {
      id: 'podcast-library',
      title: 'مكتبة البودكاست',
      description: 'محتوى صوتي إسلامي متنوع',
      icon: Headphones,
      badge: 'محدث',
      component: IslamicPodcastLibrary
    },
    {
      id: 'zakat-calculator',
      title: 'حاسبة الزكاة المتقدمة',
      description: 'حساب الزكاة مع تتبع الاستثمارات',
      icon: DollarSign,
      badge: 'محدث',
      component: EnhancedZakatCalculator
    },
    {
      id: 'habit-builder',
      title: 'بناء العادات',
      description: 'نظام تتبع العادات الإسلامية مع التحفيز',
      icon: Target,
      badge: 'محدث',
      component: IslamicHabitBuilder
    },
    {
      id: 'habit-visualization',
      title: 'مرئيات العادات',
      description: 'تحليل بصري لتقدم العادات الروحية',
      icon: BarChart3,
      badge: 'محدث',
      component: IslamicHabitVisualization
    },
    {
      id: 'ai-assistant',
      title: 'مساعد التعلم',
      description: 'مساعد AI متخصص في التعلم الإسلامي',
      icon: Brain,
      badge: null,
      component: AIIslamicLearningAssistant
    },
    {
      id: 'prayer-requests',
      title: 'طلبات الدعاء',
      description: 'شبكة مجتمعية للدعاء',
      icon: Heart,
      badge: null,
      component: CommunityPrayerRequestsSystem
    },
    {
      id: 'finance-calculator',
      title: 'الحاسبة المالية',
      description: 'زكاة وصدقات واستثمار حلال',
      icon: Calculator,
      badge: null,
      component: IslamicFinanceCalculatorEnhanced
    },
    {
      id: 'voice-reading',
      title: 'التلاوة الصوتية',
      description: 'استمع للقرآن مع تحكم متقدم',
      icon: BookOpen,
      badge: null,
      component: VoiceReadingMode
    },
    {
      id: 'progress',
      title: 'تصور التقدم',
      description: 'تتبع رحلتك في القراءة',
      icon: TrendingUp,
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
    },
    {
      id: 'ai-learning-path',
      title: 'مسار التعلم الذكي',
      description: 'نظام تعلم مخصص مدعوم بالذكاء الاصطناعي',
      icon: Brain,
      badge: null,
      component: AIPersonalizedLearningPath
    },
    {
      id: 'prayer-weather',
      title: 'الطقس والصلاة',
      description: 'تنبيهات ذكية للصلاة مع حالة الطقس',
      icon: Cloud,
      badge: null,
      component: SmartPrayerWeatherIntegration
    },
    {
      id: 'dream-journal',
      title: 'مفكرة الأحلام',
      description: 'سجل وفسر أحلامك بالمنظور الإسلامي',
      icon: Moon,
      badge: null,
      component: IslamicDreamJournal
    },
    {
      id: 'study-circle',
      title: 'حلقة الدراسة',
      description: 'انضم لحلقات دراسة افتراضية مع علماء',
      icon: Users,
      badge: null,
      component: VirtualStudyCircle
    },
    {
      id: 'tafsir-comparison',
      title: 'مقارنة التفاسير',
      description: 'قارن تفسيرات العلماء جنباً إلى جنب',
      icon: BookOpen,
      badge: null,
      component: TafsirComparisonTool
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
                <span>{features.length} أدوات متقدمة</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                <span>مدعوم بالذكاء الاصطناعي</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>شبكة مجتمعية</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>تتبع العادات</span>
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
      <Tabs defaultValue="ai-chatbot" className="w-full">
        <TabsList className="grid grid-cols-3 lg:grid-cols-8 h-auto p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
          {features.slice(0, 8).map((feature) => {
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

        {/* Show remaining features in a second row if needed */}
        {features.length > 8 && (
          <div className="mt-2">
            <TabsList className="grid grid-cols-3 lg:grid-cols-8 h-auto p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
              {features.slice(8).map((feature) => {
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
          </div>
        )}

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
                {feature.id === 'ai-chatbot' && <AIIslamicChatbot />}
                {feature.id === 'community-hub' && <CommunityEngagementHub />}
                {feature.id === 'smart-notifications' && <SmartNotificationDashboard />}
                {feature.id === 'qibla-compass' && <SmartQiblaCompassAR />}
                {feature.id === 'podcast-library' && <IslamicPodcastLibrary />}
                {feature.id === 'zakat-calculator' && <EnhancedZakatCalculator />}
                {feature.id === 'habit-builder' && <IslamicHabitBuilder />}
                {feature.id === 'habit-visualization' && <IslamicHabitVisualization />}
                {feature.id === 'ai-assistant' && <AIIslamicLearningAssistant />}
                {feature.id === 'prayer-requests' && <CommunityPrayerRequestsSystem />}
                {feature.id === 'finance-calculator' && <IslamicFinanceCalculatorEnhanced />}
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
                {feature.id === 'ai-learning-path' && <AIPersonalizedLearningPath />}
                {feature.id === 'prayer-weather' && <SmartPrayerWeatherIntegration />}
                {feature.id === 'dream-journal' && <IslamicDreamJournal />}
                {feature.id === 'study-circle' && <VirtualStudyCircle />}
                {feature.id === 'tafsir-comparison' && <TafsirComparisonTool />}
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

export default DiscoverTabEnhanced;
