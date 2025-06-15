
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
  TrendingUp
} from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
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
    }
  ];

  return (
    <div className="w-full p-4">
      <ScrollArea className="w-full">
        <div className="flex gap-2 pb-2" style={{ minWidth: 'max-content' }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <Button
                key={tab.id}
                variant={isActive ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onTabChange(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap ${
                  isActive 
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg transform scale-105' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:scale-102'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'animate-gentle-bounce' : ''}`} />
                <span className="font-medium">{tab.label}</span>
                {tab.badge && (
                  <Badge 
                    className={`text-xs px-1.5 py-0.5 ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : tab.badge === 'جديد' 
                          ? 'bg-green-100 text-green-800' 
                          : tab.badge === 'محدث'
                            ? 'bg-blue-100 text-blue-800'
                            : tab.badge === 'ذكي'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {tab.badge}
                  </Badge>
                )}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </Button>
            );
          })}
        </div>
      </ScrollArea>
      
      {/* Active Tab Description */}
      <div className="mt-3 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {tabs.find(tab => tab.id === activeTab)?.description}
        </p>
      </div>
    </div>
  );
};

export default TabNavigation;
