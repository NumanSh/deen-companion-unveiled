
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Bell, Star } from 'lucide-react';
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

  const mockEvents: IslamicEvent[] = [
    {
      id: '1',
      name: 'ليلة القدر',
      date: '2024-04-05',
      hijriDate: '27 رمضان 1445',
      type: 'عبادة',
      description: 'ليلة مباركة خير من ألف شهر',
      significance: 'ليلة نزول القرآن الكريم، وهي ليلة مباركة يضاعف فيها الأجر',
      recommendations: ['الإكثار من الدعاء', 'قراءة القرآن', 'الذكر والتسبيح', 'الاعتكاف'],
      daysRemaining: 15,
      isToday: false,
      priority: 'عالي'
    },
    {
      id: '2',
      name: 'عيد الفطر',
      date: '2024-04-10',
      hijriDate: '1 شوال 1445',
      type: 'مناسبة',
      description: 'عيد الفطر المبارك',
      significance: 'عيد المسلمين بعد انتهاء شهر رمضان المبارك',
      recommendations: ['صلاة العيد', 'التكبير', 'زكاة الفطر', 'صلة الأرحام'],
      daysRemaining: 20,
      isToday: false,
      priority: 'عالي'
    },
    {
      id: '3',
      name: 'يوم عرفة',
      date: '2024-06-15',
      hijriDate: '9 ذي الحجة 1445',
      type: 'عبادة',
      description: 'يوم عرفة المبارك',
      significance: 'أعظم أيام السنة، يوم الحج الأكبر ومغفرة الذنوب',
      recommendations: ['الصيام لغير الحاج', 'الإكثار من الدعاء', 'التلبية', 'الذكر'],
      daysRemaining: 86,
      isToday: false,
      priority: 'عالي'
    },
    {
      id: '4',
      name: 'المولد النبوي',
      date: '2024-09-15',
      hijriDate: '12 ربيع الأول 1446',
      type: 'تاريخي',
      description: 'ذكرى مولد النبي محمد صلى الله عليه وسلم',
      significance: 'يوم ولادة خير البشر وخاتم المرسلين',
      recommendations: ['قراءة السيرة النبوية', 'الصلاة على النبي', 'تذكر أخلاقه'],
      daysRemaining: 178,
      isToday: false,
      priority: 'متوسط'
    }
  ];

  useEffect(() => {
    setEvents(mockEvents);
  }, []);

  const filteredEvents = events.filter(event => 
    selectedType === 'الكل' || event.type === selectedType
  );

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast({
      title: notificationsEnabled ? 'تم إيقاف التنبيهات' : 'تم تفعيل التنبيهات',
      description: notificationsEnabled ? 
        'لن تصلك تنبيهات المناسبات الإسلامية' : 
        'ستصلك تنبيهات قبل المناسبات الإسلامية المهمة',
    });
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'عبادة': 'bg-green-100 text-green-800',
      'مناسبة': 'bg-blue-100 text-blue-800',
      'تاريخي': 'bg-purple-100 text-purple-800',
      'موسمي': 'bg-orange-100 text-orange-800',
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-6 h-6 text-indigo-500" />
          تقويم المناسبات الإسلامية
        </CardTitle>
        <p className="text-sm text-gray-600">تابع أهم المناسبات والتواريخ الإسلامية على مدار السنة</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex gap-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="text-sm border rounded px-3 py-2"
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
            <div key={event.id} className="border rounded-lg p-4 bg-white shadow-sm">
              {/* Event Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{event.name}</h3>
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(event.priority)}`}></div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
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
              <p className="text-gray-700 mb-3 leading-relaxed">{event.description}</p>
              
              {/* Significance */}
              <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-1">الأهمية:</h4>
                <p className="text-sm text-blue-800">{event.significance}</p>
              </div>

              {/* Recommendations */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">التوصيات:</h4>
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
        <div className="grid grid-cols-3 gap-4 p-4 bg-indigo-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-indigo-600">
              {events.filter(e => e.daysRemaining <= 30).length}
            </div>
            <div className="text-xs text-indigo-600">هذا الشهر</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              {events.filter(e => e.priority === 'عالي').length}
            </div>
            <div className="text-xs text-green-600">أولوية عالية</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{events.length}</div>
            <div className="text-xs text-purple-600">إجمالي المناسبات</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicDateEventsTracker;
