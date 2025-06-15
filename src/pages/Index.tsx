
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Compass, 
  Book, 
  Menu, 
  Settings,
  Star,
  Heart,
  Search,
  TrendingUp,
  Award,
  BarChart3,
  Target
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
import FloatingQuickAccess from "@/components/FloatingQuickAccess";
import SmartNotificationCenter from "@/components/SmartNotificationCenter";
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
      color: "bg-emerald-500 hover:bg-emerald-600",
      description: "Read & Study",
      gradient: "from-emerald-400 to-emerald-600"
    },
    {
      title: "Prayer Times",
      icon: Clock,
      action: () => navigate("/calendar"),
      color: "bg-blue-500 hover:bg-blue-600",
      description: "Times & Tracker",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      title: "Qibla",
      icon: Compass,
      action: () => navigate("/calendar"),
      color: "bg-purple-500 hover:bg-purple-600",
      description: "Find Direction",
      gradient: "from-purple-400 to-purple-600"
    },
    {
      title: "Duas",
      icon: Heart,
      action: () => navigate("/books"),
      color: "bg-rose-500 hover:bg-rose-600",
      description: "Supplications",
      gradient: "from-rose-400 to-rose-600"
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      {/* Enhanced Header with Islamic patterns */}
      <div className="bg-gradient-to-br from-teal-600 to-emerald-700 pt-12 pb-6 px-4 relative overflow-hidden">
        {/* Islamic geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <pattern id="islamic-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M10,0 L20,10 L10,20 L0,10 Z" fill="none" stroke="white" strokeWidth="0.5"/>
                <circle cx="10" cy="10" r="3" fill="none" stroke="white" strokeWidth="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-pattern)"/>
          </svg>
        </div>

        <div className="flex justify-between items-center mb-6 relative z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20 h-12 w-12 rounded-xl transition-all duration-200 active:scale-90"
          >
            <Menu className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-3">
            <SmartNotificationCenter />
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20 h-12 w-12 rounded-xl transition-all duration-200 active:scale-90"
              onClick={() => {
                toast({
                  title: "Opening Settings",
                  description: "Customize your experience",
                  duration: 1000,
                });
                setTimeout(() => navigate("/settings"), 150);
              }}
            >
              <Settings className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="text-center text-white relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            {timeOfDay === 'morning' ? 'صباح الخير' : 
             timeOfDay === 'afternoon' ? 'مساء الخير' : 'مساء النور'}
          </h1>
          <p className="text-teal-100 text-base mb-1">Deen Companion</p>
          <p className="text-teal-200 text-sm">Your personalized spiritual journey</p>
        </div>

        {/* Enhanced Section Toggle */}
        <div className="flex justify-center mt-6 relative z-10">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-1 flex shadow-lg">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveSection(section.id as any)}
                className={`text-white transition-all duration-200 ${
                  activeSection === section.id 
                    ? 'bg-white/30 shadow-md' 
                    : 'hover:bg-white/10'
                }`}
              >
                <section.icon className="w-4 h-4 mr-2" />
                {section.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6 space-y-6 -mt-4">
        <div className="max-w-md mx-auto space-y-6">
          {/* Dynamic Section Content */}
          <div className="animate-fade-in">
            {sections.find(s => s.id === activeSection)?.component}
          </div>
          
          {/* Enhanced Quick Actions */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl border-gray-200/50 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl text-gray-800 dark:text-gray-200">Quick Actions</h3>
                <Target className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      onClick={() => handleQuickAction(action)}
                      variant="outline"
                      className="h-28 p-4 flex flex-col items-center gap-3 hover:shadow-lg transition-all duration-300 border-2 hover:border-gray-300 active:scale-95 group relative overflow-hidden"
                    >
                      {/* Gradient background on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg", action.color)}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-center relative z-10">
                        <span className="text-sm font-semibold block group-hover:text-gray-700 transition-colors">{action.title}</span>
                        <span className="text-xs text-gray-500 block mt-1">{action.description}</span>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Daily Content */}
          <div className="space-y-4">
            <QuranicVerseOfDay />
            <IslamicQuoteWidget />
          </div>

          {/* Prayer Times */}
          <PrayerTimesWidget />

          {/* Quick Stats Summary */}
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-indigo-800 mb-1">Today's Progress</h4>
                  <p className="text-sm text-indigo-600">Keep up the excellent work!</p>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold text-indigo-700">+25 pts</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <FloatingQuickAccess />
      <BottomTabBar />
    </div>
  );
};

export default Index;
