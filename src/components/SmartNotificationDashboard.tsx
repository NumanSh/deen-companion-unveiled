
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, 
  Clock, 
  BookOpen,
  Heart,
  Target,
  Users,
  Calendar,
  Moon,
  Sun,
  Settings,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: any;
  enabled: boolean;
  sound: boolean;
  times?: string[];
  category: 'prayer' | 'reading' | 'community' | 'reminder';
}

const SmartNotificationDashboard = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: 'prayer-times',
      title: 'أوقات الصلاة',
      description: 'تنبيهات لجميع الصلوات الخمس',
      icon: Clock,
      enabled: true,
      sound: true,
      times: ['05:30', '12:45', '15:30', '18:15', '19:45'],
      category: 'prayer'
    },
    {
      id: 'quran-reading',
      title: 'قراءة القرآن اليومية',
      description: 'تذكير بقراءة الورد اليومي',
      icon: BookOpen,
      enabled: true,
      sound: false,
      times: ['09:00', '21:00'],
      category: 'reading'
    },
    {
      id: 'morning-adhkar',
      title: 'أذكار الصباح',
      description: 'تذكير بأذكار الصباح والمساء',
      icon: Sun,
      enabled: true,
      sound: true,
      times: ['07:00'],
      category: 'reminder'
    },
    {
      id: 'evening-adhkar',
      title: 'أذكار المساء',
      description: 'تذكير بأذكار المساء',
      icon: Moon,
      enabled: true,
      sound: true,
      times: ['18:00'],
      category: 'reminder'
    },
    {
      id: 'community-updates',
      title: 'تحديثات المجتمع',
      description: 'رسائل وطلبات الدعاء من المجتمع',
      icon: Users,
      enabled: false,
      sound: false,
      category: 'community'
    },
    {
      id: 'habit-reminders',
      title: 'تذكيرات العادات',
      description: 'تذكير بالعادات الإسلامية اليومية',
      icon: Target,
      enabled: true,
      sound: false,
      category: 'reminder'
    }
  ]);

  const toggleNotification = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
      )
    );
    toast({
      title: 'تم تحديث الإعدادات',
      description: 'تم حفظ تفضيلات التنبيهات',
      duration: 2000,
    });
  };

  const toggleSound = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, sound: !notif.sound } : notif
      )
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'prayer': return 'bg-green-100 text-green-800';
      case 'reading': return 'bg-blue-100 text-blue-800';
      case 'community': return 'bg-purple-100 text-purple-800';
      case 'reminder': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'prayer': return 'صلاة';
      case 'reading': return 'قراءة';
      case 'community': return 'مجتمع';
      case 'reminder': return 'تذكير';
      default: return 'عام';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">إدارة التنبيهات الذكية</h2>
                <p className="text-indigo-200">تخصيص التذكيرات والإشعارات</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{notifications.filter(n => n.enabled).length}</div>
              <div className="text-indigo-200">تنبيه نشط</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['prayer', 'reading', 'community', 'reminder'].map((category) => {
          const count = notifications.filter(n => n.category === category && n.enabled).length;
          const total = notifications.filter(n => n.category === category).length;
          return (
            <Card key={category}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-indigo-600">{count}/{total}</div>
                <div className="text-sm text-gray-600">{getCategoryLabel(category)}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Notification Settings */}
      <div className="space-y-4">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <Card key={notification.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <Icon className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{notification.title}</h3>
                        <Badge className={getCategoryColor(notification.category)}>
                          {getCategoryLabel(notification.category)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.description}</p>
                      {notification.times && (
                        <div className="flex flex-wrap gap-2">
                          {notification.times.map((time, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {time}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSound(notification.id)}
                        disabled={!notification.enabled}
                      >
                        {notification.sound ? (
                          <Volume2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <VolumeX className="w-4 h-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                    <Switch
                      checked={notification.enabled}
                      onCheckedChange={() => toggleNotification(notification.id)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Global Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600" />
            الإعدادات العامة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">الوضع الصامت أثناء الصلاة</h4>
              <p className="text-sm text-gray-600">إيقاف جميع التنبيهات تلقائياً أثناء أوقات الصلاة</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">التنبيهات التدريجية</h4>
              <p className="text-sm text-gray-600">زيادة مستوى الصوت تدريجياً</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">تنبيهات نهاية الأسبوع</h4>
              <p className="text-sm text-gray-600">تلخيص أسبوعي للإنجازات والتذكيرات</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartNotificationDashboard;
