
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  BookOpen, 
  Heart, 
  Clock, 
  Star,
  Search,
  Bookmark,
  Play,
  Pause,
  SkipForward,
  Volume2,
  Copy,
  Share2,
  RefreshCw,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  shortcut: string;
  category: 'reading' | 'navigation' | 'audio' | 'utility';
  action: () => void;
}

const QuickActionShortcuts = () => {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(true);

  const quickActions: QuickAction[] = [
    {
      id: 'next-verse',
      title: 'الآية التالية',
      description: 'الانتقال للآية التالية',
      icon: SkipForward,
      shortcut: 'مسافة',
      category: 'reading',
      action: () => toast({ title: 'انتقال للآية التالية' })
    },
    {
      id: 'play-pause',
      title: 'تشغيل/إيقاف',
      description: 'تشغيل أو إيقاف التلاوة',
      icon: Play,
      shortcut: 'P',
      category: 'audio',
      action: () => toast({ title: 'تم تبديل التشغيل' })
    },
    {
      id: 'bookmark',
      title: 'إضافة مرجعية',
      description: 'حفظ الآية الحالية',
      icon: Bookmark,
      shortcut: 'B',
      category: 'utility',
      action: () => toast({ title: 'تم حفظ المرجعية' })
    },
    {
      id: 'search',
      title: 'البحث السريع',
      description: 'فتح نافذة البحث',
      icon: Search,
      shortcut: 'Ctrl+F',
      category: 'navigation',
      action: () => toast({ title: 'فتح البحث' })
    },
    {
      id: 'copy-verse',
      title: 'نسخ الآية',
      description: 'نسخ النص للحافظة',
      icon: Copy,
      shortcut: 'Ctrl+C',
      category: 'utility',
      action: () => toast({ title: 'تم نسخ الآية' })
    },
    {
      id: 'share',
      title: 'مشاركة',
      description: 'مشاركة الآية',
      icon: Share2,
      shortcut: 'Ctrl+S',
      category: 'utility',
      action: () => toast({ title: 'فتح المشاركة' })
    },
    {
      id: 'volume-up',
      title: 'رفع الصوت',
      description: 'زيادة مستوى الصوت',
      icon: Volume2,
      shortcut: '↑',
      category: 'audio',
      action: () => toast({ title: 'تم رفع الصوت' })
    },
    {
      id: 'refresh',
      title: 'تحديث',
      description: 'إعادة تحميل المحتوى',
      icon: RefreshCw,
      shortcut: 'F5',
      category: 'utility',
      action: () => toast({ title: 'تم التحديث' })
    }
  ];

  const categories = {
    reading: { name: 'القراءة', color: 'bg-emerald-500', icon: BookOpen },
    navigation: { name: 'التنقل', color: 'bg-blue-500', icon: Star },
    audio: { name: 'الصوت', color: 'bg-purple-500', icon: Volume2 },
    utility: { name: 'أدوات', color: 'bg-orange-500', icon: Settings }
  };

  const groupedActions = quickActions.reduce((acc, action) => {
    if (!acc[action.category]) {
      acc[action.category] = [];
    }
    acc[action.category].push(action);
    return acc;
  }, {} as Record<string, QuickAction[]>);

  // Keyboard shortcuts listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const action = quickActions.find(a => {
        if (a.shortcut === 'مسافة') return e.code === 'Space';
        if (a.shortcut === 'P') return e.key.toLowerCase() === 'p' && !e.ctrlKey;
        if (a.shortcut === 'B') return e.key.toLowerCase() === 'b' && !e.ctrlKey;
        if (a.shortcut === 'Ctrl+F') return e.key.toLowerCase() === 'f' && e.ctrlKey;
        if (a.shortcut === 'Ctrl+C') return e.key.toLowerCase() === 'c' && e.ctrlKey;
        if (a.shortcut === 'Ctrl+S') return e.key.toLowerCase() === 's' && e.ctrlKey;
        if (a.shortcut === '↑') return e.key === 'ArrowUp';
        if (a.shortcut === 'F5') return e.key === 'F5';
        return false;
      });

      if (action) {
        e.preventDefault();
        action.action();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg rounded-full"
          size="sm"
        >
          <Zap className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">الاختصارات السريعة</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
            >
              ×
            </Button>
          </div>

          {/* Quick Actions by Category */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {Object.entries(groupedActions).map(([categoryKey, actions]) => {
              const category = categories[categoryKey as keyof typeof categories];
              const CategoryIcon = category.icon;

              return (
                <div key={categoryKey}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${category.color}`} />
                    <span className="text-sm font-medium text-gray-700">
                      {category.name}
                    </span>
                  </div>
                  
                  <div className="space-y-1 ml-4">
                    {actions.map((action) => {
                      const Icon = action.icon;
                      return (
                        <Button
                          key={action.id}
                          variant="ghost"
                          size="sm"
                          onClick={action.action}
                          className="w-full justify-between h-auto p-2 hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-gray-600" />
                            <div className="text-left">
                              <div className="text-sm font-medium">
                                {action.title}
                              </div>
                              <div className="text-xs text-gray-500">
                                {action.description}
                              </div>
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {action.shortcut}
                          </Badge>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Help */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-500 text-center">
              💡 استخدم الاختصارات لتصفح أسرع
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActionShortcuts;
