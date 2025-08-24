
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Search, 
  BookmarkPlus, 
  Clock, 
  Target,
  TrendingUp,
  Mic,
  Share2,
  Heart,
  Star,
  Award,
  X,
  Play,
  Pause
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EnhancedFloatingActionsSystem = () => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [readingTimer, setReadingTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const quickActions = [
    {
      id: 'voice-search',
      icon: Mic,
      label: 'البحث الصوتي',
      description: 'ابحث بصوتك',
      color: 'bg-blue-500 hover:bg-blue-600',
      badge: 'جديد',
      action: () => toggleVoiceSearch()
    },
    {
      id: 'smart-bookmark',
      icon: BookmarkPlus,
      label: 'حفظ ذكي',
      description: 'احفظ مع الذكاء الاصطناعي',
      color: 'bg-purple-500 hover:bg-purple-600',
      badge: null,
      action: () => handleSmartBookmark()
    },
    {
      id: 'reading-timer',
      icon: isTimerRunning ? Pause : Play,
      label: isTimerRunning ? 'إيقاف المؤقت' : 'مؤقت القراءة',
      description: `${Math.floor(readingTimer / 60)}:${(readingTimer % 60).toString().padStart(2, '0')}`,
      color: 'bg-green-500 hover:bg-green-600',
      badge: null,
      action: () => toggleReadingTimer()
    },
    {
      id: 'daily-progress',
      icon: Target,
      label: 'التقدم اليومي',
      description: 'تتبع أهدافك',
      color: 'bg-orange-500 hover:bg-orange-600',
      badge: null,
      action: () => showDailyProgress()
    },
    {
      id: 'achievements',
      icon: Award,
      label: 'الإنجازات',
      description: 'اكتشف إنجازاتك',
      color: 'bg-yellow-500 hover:bg-yellow-600',
      badge: '3',
      action: () => showAchievements()
    },
    {
      id: 'quick-share',
      icon: Share2,
      label: 'مشاركة سريعة',
      description: 'شارك آية أو حديث',
      color: 'bg-rose-500 hover:bg-rose-600',
      badge: null,
      action: () => handleQuickShare()
    }
  ];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setReadingTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const toggleVoiceSearch = () => {
    setIsListening(!isListening);
    toast({
      title: isListening ? 'توقف البحث الصوتي' : 'بدء البحث الصوتي',
      description: isListening ? 'تم إيقاف الاستماع' : 'قل ما تريد البحث عنه',
      duration: 2000,
    });
  };

  const handleSmartBookmark = () => {
    toast({
      title: 'تم الحفظ بنجاح',
      description: 'تم تحليل المحتوى وحفظه مع العلامات الذكية',
      duration: 2000,
    });
  };

  const toggleReadingTimer = () => {
    setIsTimerRunning(!isTimerRunning);
    toast({
      title: isTimerRunning ? 'تم إيقاف المؤقت' : 'بدء المؤقت',
      description: isTimerRunning ? 'تم حفظ جلسة القراءة' : 'بدأت جلسة قراءة جديدة',
      duration: 2000,
    });
  };

  const showDailyProgress = () => {
    toast({
      title: 'التقدم اليومي',
      description: 'تم قراءة 5 صفحات اليوم - 83% من الهدف',
      duration: 3000,
    });
  };

  const showAchievements = () => {
    toast({
      title: 'إنجازات جديدة! 🏆',
      description: 'حصلت على شارة "قارئ مثابر" - 7 أيام متتالية',
      duration: 3000,
    });
  };

  const handleQuickShare = () => {
    toast({
      title: 'جاهز للمشاركة',
      description: 'اختر المحتوى المراد مشاركته',
      duration: 2000,
    });
  };

  const handleActionClick = (action: unknown) => {
    action.action();
    if (action.id !== 'reading-timer') {
      setIsExpanded(false);
    }
  };

  return (
    <div className="fixed bottom-28 right-6 z-50">
      {/* Expanded Actions Menu */}
      {isExpanded && (
        <div className="mb-4 space-y-3 animate-fade-in-up">
          {quickActions.map((action, index) => (
            <Card
              key={action.id}
              className="shadow-xl border-0 bg-white/95 backdrop-blur-sm transform transition-all duration-200 hover:scale-105"
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: 'both'
              }}
            >
              <CardContent className="p-0">
                <Button
                  onClick={() => handleActionClick(action)}
                  className={`w-full justify-between gap-3 h-16 px-4 ${action.color} text-white border-0 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <action.icon className="w-5 h-5" />
                      {action.badge && (
                        <Badge className="absolute -top-2 -right-2 text-xs px-1 py-0 bg-red-500 text-white min-w-[20px] h-5 flex items-center justify-center">
                          {action.badge}
                        </Badge>
                      )}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-sm">{action.label}</div>
                      <div className="text-xs opacity-80">{action.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {action.id === 'voice-search' && isListening && (
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    )}
                    {action.id === 'reading-timer' && isTimerRunning && (
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    )}
                    <div className="w-1.5 h-1.5 bg-white/30 rounded-full"></div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Main Toggle Button */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
          isExpanded 
            ? 'bg-red-500 hover:bg-red-600 rotate-45' 
            : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-700 animate-glow'
        } text-white border-0`}
      >
        {isExpanded ? (
          <X className="w-7 h-7" />
        ) : (
          <Zap className="w-7 h-7" />
        )}
      </Button>

      {/* Smart Indicators */}
      {!isExpanded && (
        <>
          {(isListening || isTimerRunning) && (
            <div className="absolute -top-1 -left-1 w-4 h-4 bg-red-500 rounded-full animate-pulse flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          )}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white animate-gentle-bounce">
            6
          </div>
        </>
      )}
    </div>
  );
};

export default EnhancedFloatingActionsSystem;
