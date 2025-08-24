
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  X, 
  Calendar, 
  BookOpen, 
  Heart,
  Star,
  Clock,
  Gift,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'prayer' | 'reading' | 'achievement' | 'reminder' | 'tip';
  title: string;
  message: string;
  time: string;
  icon: React.ComponentType<any>;
  color: string;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const SmartNotificationSystem = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load notifications from localStorage
    const saved = localStorage.getItem('islamic-app-notifications');
    if (saved) {
      setNotifications(JSON.parse(saved));
    } else {
      // Initialize with some sample notifications
      const initialNotifications: Notification[] = [
        {
          id: '1',
          type: 'prayer',
          title: 'Maghrib Prayer Time',
          message: 'Time for Maghrib prayer in 5 minutes',
          time: '2 min ago',
          icon: Clock,
          color: 'text-blue-600',
          read: false,
          action: {
            label: 'View Times',
            onClick: () => window.location.href = '/calendar'
          }
        },
        {
          id: '2',
          type: 'achievement',
          title: 'Reading Streak!',
          message: 'You\'ve completed 7 days of Quran reading',
          time: '1 hour ago',
          icon: Star,
          color: 'text-yellow-600',
          read: false
        },
        {
          id: '3',
          type: 'tip',
          title: 'Daily Wisdom',
          message: 'Learn about the 99 Names of Allah today',
          time: '3 hours ago',
          icon: Heart,
          color: 'text-rose-600',
          read: true
        }
      ];
      setNotifications(initialNotifications);
      localStorage.setItem('islamic-app-notifications', JSON.stringify(initialNotifications));
    }
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
      localStorage.setItem('islamic-app-notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== id);
      localStorage.setItem('islamic-app-notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      localStorage.setItem('islamic-app-notifications', JSON.stringify(updated));
      return updated;
    });
  };

  if (!isOpen) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="relative bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-white shadow-lg"
          size="sm"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 min-w-[20px] h-5 flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 w-80">
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-800">Notifications</h3>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {unreadCount} new
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  Mark all read
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full bg-white shadow-sm ${notification.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-sm text-gray-800">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notification.time}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeNotification(notification.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                        {notification.action && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              notification.action!.onClick();
                              markAsRead(notification.id);
                            }}
                            className="mt-2 text-xs"
                          >
                            {notification.action.label}
                          </Button>
                        )}
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="mt-1 text-xs text-blue-600 hover:text-blue-700"
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartNotificationSystem;
