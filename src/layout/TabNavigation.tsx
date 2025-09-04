
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Home,
  BookOpen, 
  MessageSquare, 
  Heart, 
  Sparkles,
  Target,
  Award,
  BarChart3,
  Bookmark,
  Calendar,
  Search,
  Settings,
  Compass,
  TrendingUp,
  LucideIcon
} from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
  badge: string | null;
  description: string;
}

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: Tab[] = [
    { 
      id: 'dashboard', 
      label: 'الرئيسية', 
      icon: Home, 
      badge: null,
      description: 'لوحة التحكم الشخصية'
    },
    { 
      id: 'quran', 
      label: 'القرآن', 
      icon: BookOpen, 
      badge: null,
      description: '114 سورة'
    },
    { 
      id: 'hadith', 
      label: 'الحديث', 
      icon: MessageSquare, 
      badge: null,
      description: 'أحاديث صحيحة'
    },
    { 
      id: 'duas', 
      label: 'الأدعية', 
      icon: Heart, 
      badge: null,
      description: 'أدعية مأثورة'
    },
    { 
      id: 'discover', 
      label: 'اكتشف', 
      icon: Compass, 
      badge: 'محدث',
      description: 'أدوات متقدمة'
    },
    { 
      id: 'habits', 
      label: 'العادات', 
      icon: Target, 
      badge: 'جديد',
      description: 'تتبع العادات الروحية'
    },
    { 
      id: 'achievements', 
      label: 'الإنجازات', 
      icon: Award, 
      badge: '3',
      description: 'نظام الإنجازات التفاعلي'
    },
    { 
      id: 'analytics', 
      label: 'التحليلات', 
      icon: BarChart3, 
      badge: 'ذكي',
      description: 'تحليلات القراءة المتقدمة'
    },
    { 
      id: 'bookmarks', 
      label: 'المرجعيات', 
      icon: Bookmark, 
      badge: null,
      description: 'المحتوى المحفوظ'
    },
    { 
      id: 'islamic-library', 
      label: 'المكتبة', 
      icon: BookOpen, 
      badge: null,
      description: 'المكتبة الإسلامية الرقمية'
    }
  ];

  const getBadgeVariant = (badge: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (badge) {
      case 'جديد': return 'default';
      case 'محدث': return 'secondary';
      case 'ذكي': return 'outline';
      default: return 'destructive';
    }
  };

  const getBadgeClassName = (badge: string, isActive: boolean): string => {
    if (isActive) return 'bg-white/20 text-white';
    
    switch (badge) {
      case 'جديد': return 'bg-green-100 text-green-800';
      case 'محدث': return 'bg-blue-100 text-blue-800';
      case 'ذكي': return 'bg-purple-100 text-purple-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="w-full p-2 sm:p-4">
      <ScrollArea className="w-full">
        <div className="flex gap-2 sm:gap-3 pb-2 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <Button
                key={tab.id}
                variant={isActive ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap min-w-fit relative ${
                  isActive 
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg transform scale-105' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:scale-102'
                }`}
                aria-label={`${tab.label} - ${tab.description}`}
              >
                <Icon className={`w-3 h-3 sm:w-4 sm:h-4 ${isActive ? 'animate-gentle-bounce' : ''}`} />
                <span className="font-medium text-xs sm:text-sm">{tab.label}</span>
                {tab.badge && (
                  <Badge 
                    variant={getBadgeVariant(tab.badge)}
                    className={`text-xs px-1.5 py-0.5 ml-1 ${getBadgeClassName(tab.badge, isActive)}`}
                  >
                    {tab.badge}
                  </Badge>
                )}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </Button>
            );
          })}
        </div>
      </ScrollArea>
      
      {/* Active Tab Description */}
      <div className="mt-2 sm:mt-3 text-center">
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          {tabs.find(tab => tab.id === activeTab)?.description}
        </p>
      </div>
    </div>
  );
};

export default TabNavigation;
