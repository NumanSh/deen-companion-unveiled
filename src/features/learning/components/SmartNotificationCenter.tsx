
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Clock, 
  Star, 
  Calendar,
  BookOpen,
  Heart,
  Trophy,
  X,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'prayer' | 'achievement' | 'reminder' | 'challenge' | 'verse';
  title: string;
  message: string;
  timestamp: number;
  priority: 'low' | 'medium' | 'high';
  read: boolean;
  actionable?: boolean;
  action?: () => void;
}

const SmartNotificationCenter = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'prayer',
      title: 'Maghrib Prayer Time',
      message: 'It\'s time for Maghrib prayer. May Allah accept your worship.',
      timestamp: Date.now() - 30 * 60 * 1000,
      priority: 'high',
      read: false,
      actionable: true,
      action: () => console.log('Navigate to prayer tracker')
    },
    {
      id: '2',
      type: 'achievement',
      title: 'Streak Milestone!',
      message: 'Congratulations! You\'ve maintained your prayer streak for 10 days.',
      timestamp: Date.now() - 2 * 60 * 60 * 1000,
      priority: 'medium',
      read: false
    },
    {
      id: '3',
      type: 'verse',
      title: 'Daily Verse Reflection',
      message: 'Reflect on today\'s verse from Surah Al-Baqarah about patience.',
      timestamp: Date.now() - 4 * 60 * 60 * 1000,
      priority: 'low',
      read: true
    },
    {
      id: '4',
      type: 'challenge',
      title: 'Daily Challenge',
      message: 'You\'re one step away from completing today\'s dhikr challenge!',
      timestamp: Date.now() - 6 * 60 * 60 * 1000,
      priority: 'medium',
      read: false,
      actionable: true
    }
  ]);

  const [isExpanded, setIsExpanded] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'prayer': return Clock;
      case 'achievement': return Trophy;
      case 'reminder': return Bell;
      case 'challenge': return Star;
      case 'verse': return BookOpen;
      default: return Bell;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const removeNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        variant="ghost"
        size="icon"
        className="relative"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-red-500">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {/* Expanded Notification Panel */}
      {isExpanded && (
        <Card className="absolute top-12 right-0 w-80 max-h-96 overflow-hidden shadow-2xl border-2 z-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notifications ({unreadCount} new)
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(false)}
                className="h-6 w-6"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0 max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No notifications</p>
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                        !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${getPriorityColor(notification.priority)}`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-sm truncate">
                              {notification.title}
                            </h4>
                            <span className="text-xs text-gray-500 ml-2">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center gap-2">
                            {notification.actionable && (
                              <Button
                                size="sm"
                                className="h-6 px-2 text-xs"
                                onClick={() => {
                                  notification.action?.();
                                  markAsRead(notification.id);
                                }}
                              >
                                View
                              </Button>
                            )}
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs"
                              onClick={() => markAsRead(notification.id)}
                            >
                              {notification.read ? 'Read' : 'Mark Read'}
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => removeNotification(notification.id)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartNotificationCenter;
