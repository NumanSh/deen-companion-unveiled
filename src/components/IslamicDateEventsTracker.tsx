
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Bell, Star, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IslamicEvent {
  id: string;
  name: string;
  date: string;
  hijriDate: string;
  type: 'عبادة' | 'مناسبة' | 'تاريخي' | 'موسمي';
  description: string;
  significance: string;
  recommendations: string[];
  daysRemaining: number;
  isToday: boolean;
  priority: 'عالي' | 'متوسط' | 'عادي';
}

const IslamicDateEventsTracker = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<IslamicEvent[]>([]);
  const [selectedType, setSelectedType] = useState('الكل');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNotificationSettings();
    generateIslamicEvents();
  }, []);

  const loadNotificationSettings = () => {
    const saved = localStorage.getItem('islamicEventsNotifications');
    if (saved) {
      setNotificationsEnabled(JSON.parse(saved));
    }
  };

  const generateIslamicEvents = async () => {
    setIsLoading(true);
    
    try {
      // Calculate current Islamic year and upcoming events
      const currentYear = new Date().getFullYear();
      const islamicEvents = calculateUpcomingEvents(currentYear);
      setEvents(islamicEvents);
    } catch (error) {
      console.error('Error calculating Islamic events:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل التواريخ الإسلامية",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateUpcomingEvents = (year: number): IslamicEvent[] => {
    const events: IslamicEvent[] = [];
    const today = new Date();

    // Major Islamic events (approximate Gregorian dates)
    const islamicEvents = [
      {
        name: 'رأس السنة الهجرية',
        month: 8, // August (approximate)
        day: 20,
        type: 'تاريخي' as const,
        hijriDate: '1 محرم',
        description: 'بداية السنة الهجرية الجديدة',
        significance: 'ذكرى هجرة النبي محمد صلى الله عليه وسلم',
        recommendations: ['التوبة والاستغفار', 'وضع أهداف روحية جديدة', 'قراءة السيرة'],
        priority: 'متوسط' as const
      },
      {
        name: 'عاشوراء',
        month: 8, // August (approximate)
        day: 30,
        type: 'عبادة' as const,
        hijriDate: '10 محرم',
        description: 'يوم عاشوراء المبارك',
        significance: 'يوم صيام مستحب وله فضل عظيم',
        recommendations: ['الصيام', 'الإكثار من الدعاء', 'التوبة', 'قراءة القرآن'],
        priority: 'عالي' as const
      },
      {
        name: 'المولد النبوي',
        month: 10, // October (approximate)
        day: 15,
        type: 'تاريخي' as const,
        hijriDate: '12 ربيع الأول',
        description: 'ذكرى مولد النبي محمد صلى الله عليه وسلم',
        significance: 'يوم ولادة خير البشر وخاتم المرسلين',
        recommendations: ['قراءة السيرة النبوية', 'الصلاة على النبي', 'تذكر أخلاقه الكريمة'],
        priority: 'متوسط' as const
      },
      {
        name: 'ليلة الإسراء والمعراج',
        month: 2, // February (approximate)
        day: 20,
        type: 'عبادة' as const,
        hijriDate: '27 رجب',
        description: 'ذكرى رحلة الإسراء والمعراج',
        significance: 'معجزة عظيمة وفرض الصلوات الخمس',
        recommendations: ['إحياء الليل بالصلاة', 'قراءة قصة الإسراء', 'الإكثار من الصلاة'],
        priority: 'عالي' as const
      },
      {
        name: 'ليلة النصف من شعبان',
        month: 3, // March (approximate)
        day: 15,
        type: 'عبادة' as const,
        hijriDate: '15 شعبان',
        description: 'ليلة مباركة في شعبان',
        significance: 'ليلة مغفرة وتوبة',
        recommendations: ['قيام الليل', 'الاستغفار', 'الدعاء', 'الصيام في اليوم التالي'],
        priority: 'متوسط' as const
      }
    ];

    // Add events for current and next year
    for (const event of islamicEvents) {
      for (const eventYear of [year, year + 1]) {
        const eventDate = new Date(eventYear, event.month - 1, event.day);
        const daysRemaining = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysRemaining >= -1) { // Include today and future events
          events.push({
            id: `${event.name}-${eventYear}`,
            name: event.name,
            date: eventDate.toLocaleDateString('ar-SA'),
            hijriDate: event.hijriDate,
            type: event.type,
            description: event.description,
            significance: event.significance,
            recommendations: event.recommendations,
            daysRemaining: Math.max(0, daysRemaining),
            isToday: daysRemaining === 0,
            priority: event.priority
          });
        }
      }
    }

    // Sort by days remaining
    return events.sort((a, b) => a.daysRemaining - b.daysRemaining);
  };

  const filteredEvents = events.filter(event => 
    selectedType === 'الكل' || event.type === selectedType
  );

  const toggleNotifications = () => {
    const newState = !notificationsEnabled;
    setNotificationsEnabled(newState);
    localStorage.setItem('islamicEventsNotifications', JSON.stringify(newState));
    
    toast({
      title: newState ? 'تم تفعيل التنبيهات' : 'تم إيقاف التنبيهات',
      description: newState ? 
        'ستصلك تنبيهات قبل المناسبات الإسلامية المهمة' : 
        'لن تصلك تنبيهات المناسبات الإسلامية',
    });
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'عبادة': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'مناسبة': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'تاريخي': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'موسمي': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'عالي': 'bg-red-500',
      'متوسط': 'bg-yellow-500',
      'عادي': 'bg-gray-500',
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-500';
  };

  const getDaysText = (days: number) => {
    if (days === 0) return 'اليوم';
    if (days === 1) return 'غداً';
    if (days <= 7) return `خلال ${days} أيام`;
    if (days <= 30) return `خلال ${Math.ceil(days / 7)} أسابيع`;
    return `خلال ${Math.ceil(days / 30)} شهر`;
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
            <span className="mr-2">جاري تحميل التواريخ الإسلامية...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-6 h-6 text-indigo-500" />
          تقويم المناسبات الإسلامية
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          تابع أهم المناسبات والتواريخ الإسلامية على مدار السنة
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex gap-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="text-sm border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-600"
            >
              <option value="الكل">جميع المناسبات</option>
              <option value="عبادة">مناسبات عبادة</option>
              <option value="مناسبة">المناسبات الخاصة</option>
              <option value="تاريخي">الأحداث التاريخية</option>
              <option value="موسمي">المناسبات الموسمية</option>
            </select>
          </div>
          
          <Button
            onClick={toggleNotifications}
            variant={notificationsEnabled ? "default" : "outline"}
            size="sm"
            className="flex items-center gap-2"
          >
            <Bell className="w-4 h-4" />
            {notificationsEnabled ? 'إيقاف التنبيهات' : 'تفعيل التنبيهات'}
          </Button>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div key={event.id} className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm">
              {/* Event Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{event.name}</h3>
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(event.priority)}`}></div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {event.hijriDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {getDaysText(event.daysRemaining)}
                    </span>
                  </div>
                </div>
                <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
              </div>

              {/* Description */}
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">{event.description}</p>
              
              {/* Significance */}
              <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-1">الأهمية:</h4>
                <p className="text-sm text-blue-800 dark:text-blue-400">{event.significance}</p>
              </div>

              {/* Recommendations */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">التوصيات:</h4>
                <div className="flex flex-wrap gap-2">
                  {event.recommendations.map((rec, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {rec}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
              {events.filter(e => e.daysRemaining <= 30).length}
            </div>
            <div className="text-xs text-indigo-600 dark:text-indigo-400">هذا الشهر</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              {events.filter(e => e.priority === 'عالي').length}
            </div>
            <div className="text-xs text-green-600 dark:text-green-400">أولوية عالية</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{events.length}</div>
            <div className="text-xs text-purple-600 dark:text-purple-400">إجمالي المناسبات</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicDateEventsTracker;
