
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Compass, 
  Book, 
  Star,
  Heart,
  Search,
  TrendingUp,
  Award,
  BarChart3,
  Target,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from '@/hooks/use-toast';
import BottomTabBar from "@/components/BottomTabBar";
import SmartPersonalizationDashboard from "@/components/SmartPersonalizationDashboard";
import InteractiveAchievementSystem from "@/components/InteractiveAchievementSystem";
import SmartReadingAnalytics from "@/components/SmartReadingAnalytics";
import QuranicVerseOfDay from "@/components/QuranicVerseOfDay";
import IslamicQuoteWidget from "@/components/IslamicQuoteWidget";
import PrayerTimesWidget from "@/components/PrayerTimesWidget";
import EnhancedFloatingSystem from "@/components/EnhancedFloatingSystem";
import ModernHeader from "@/components/ModernHeader";
import ModernCard from "@/components/ModernCard";
import { cn } from "@/lib/utils";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<'dashboard' | 'achievements' | 'analytics'>('dashboard');
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setTimeOfDay('morning');
    } else if (hour < 18) {
      setTimeOfDay('afternoon');
    } else {
      setTimeOfDay('evening');
    }
  }, []);

  const quickActions = [
    {
      title: "The Quran",
      icon: Book,
      action: () => navigate("/books"),
      color: "from-emerald-400 to-emerald-600",
      description: "Read & Study",
      iconColor: "text-emerald-600"
    },
    {
      title: "Prayer Times",
      icon: Clock,
      action: () => navigate("/calendar"),
      color: "from-blue-400 to-blue-600",
      description: "Times & Tracker",
      iconColor: "text-blue-600"
    },
    {
      title: "Qibla",
      icon: Compass,
      action: () => navigate("/calendar"),
      color: "from-purple-400 to-purple-600",
      description: "Find Direction",
      iconColor: "text-purple-600"
    },
    {
      title: "Duas",
      icon: Heart,
      action: () => navigate("/books"),
      color: "from-rose-400 to-rose-600",
      description: "Supplications",
      iconColor: "text-rose-600"
    }
  ];

  const handleQuickAction = (action: any) => {
    toast({
      title: `Opening ${action.title}`,
      description: action.description,
      duration: 1000,
    });
    
    setTimeout(() => {
      action.action();
    }, 150);
  };

  const sections = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: TrendingUp,
      component: <SmartPersonalizationDashboard />
    },
    {
      id: 'achievements',
      label: 'Achievements',
      icon: Award,
      component: <InteractiveAchievementSystem />
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      component: <SmartReadingAnalytics />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      {/* Modern Header */}
      <ModernHeader timeOfDay={timeOfDay} />

      {/* Enhanced Section Toggle */}
      <div className="px-4 -mt-6 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-1.5 flex shadow-lg border border-white/20">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveSection(section.id as any)}
                className={cn(
                  "flex-1 transition-all duration-200 rounded-xl",
                  activeSection === section.id 
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-md hover:from-teal-600 hover:to-emerald-700' 
                    : 'hover:bg-gray-100 text-gray-600'
                )}
              >
                <section.icon className="w-4 h-4 mr-2" />
                {section.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6 space-y-6">
        <div className="max-w-md mx-auto space-y-6">
          {/* Dynamic Section Content */}
          <div className="animate-fade-in">
            {sections.find(s => s.id === activeSection)?.component}
          </div>
          
          {/* Enhanced Quick Actions */}
          <ModernCard
            title="Quick Actions"
            subtitle="Jump to your spiritual activities"
            icon={<Target className="w-5 h-5 text-emerald-600" />}
            badge={`${quickActions.length} actions`}
            gradient="from-white to-emerald-50/50"
          >
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    variant="outline"
                    className="h-32 p-4 flex flex-col items-center gap-3 hover:shadow-lg transition-all duration-300 border-2 hover:border-gray-300 active:scale-95 group relative overflow-hidden bg-white hover:bg-gray-50"
                  >
                    {/* Gradient accent */}
                    <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", action.color)} />
                    
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-gray-50 group-hover:bg-white group-hover:shadow-md")}>
                      <Icon className={cn("w-6 h-6", action.iconColor)} />
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-semibold block group-hover:text-gray-700 transition-colors">{action.title}</span>
                      <span className="text-xs text-gray-500 block mt-1">{action.description}</span>
                    </div>

                    {/* Hover shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  </Button>
                );
              })}
            </div>
          </ModernCard>

          {/* Daily Content */}
          <div className="space-y-4">
            <QuranicVerseOfDay />
            <IslamicQuoteWidget />
          </div>

          {/* Prayer Times */}
          <PrayerTimesWidget />

          {/* Enhanced Progress Summary */}
          <ModernCard
            title="Today's Progress"
            subtitle="Keep up the excellent work!"
            icon={<Zap className="w-5 h-5 text-yellow-500" />}
            gradient="from-yellow-50 to-orange-50"
            size="sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-yellow-700 text-lg">+25 pts</p>
                  <p className="text-xs text-yellow-600">Spiritual Growth</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">Daily Streak</p>
                <p className="text-xs text-gray-500">3 days strong! 🔥</p>
              </div>
            </div>
          </ModernCard>
        </div>
      </div>
      
      <EnhancedFloatingSystem />
      <BottomTabBar />
    </div>
  );
};

export default Index;
