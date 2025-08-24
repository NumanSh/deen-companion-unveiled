
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Star, Clock, MapPin, Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IslamicEvent {
  id: string;
  name: string;
  hijriDate: string;
  gregorianDate: string;
  type: 'ديني' | 'تاريخي' | 'موسمي' | 'عبادة';
  description: string;
  significance: string;
  recommendations: string[];
  isToday: boolean;
  daysUntil: number;
  isRecurring: boolean;
  location?: string;
}

const IslamicCalendarEvents = () => {
  const { toast } = useToast();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedType, setSelectedType] = useState('الكل');
  const [events] = useState<IslamicEvent[]>([
    {
      id: '1',
      name: 'ليلة القدر',
      hijriDate: '27 رمضان 1446',
      gregorianDate: '2025-03-28',
      type: 'عبادة',
      description: 'ليلة مباركة خير من ألف شهر، ليلة نزول القرآن الكريم',
      significance: 'أعظم الليالي في السنة، يُضاعف فيها الأجر ويُستجاب فيها الدعاء',
      recommendations: ['الإكثار من الدعاء', 'قراءة القرآن', 'الذكر والتسبيح', 'الاعتكاف في المسجد'],
      isToday: false,
      daysUntil: 120,
      isRecurring: true
    },
    {
      id: '2',
      name: 'رأس السنة الهجرية',
      hijriDate: '1 محرم 1446',
      gregorianDate: '2024-07-07',
      type: 'تاريخي',
      description: 'بداية العام الهجري الجديد، ذكرى هجرة النبي صلى الله عليه وسلم',
      significance: 'حدث تاريخي مهم يمثل بداية التاريخ الإسلامي',
      recommendations: ['التأمل في دروس الهجرة', 'تجديد العهد مع الله', 'وضع أهداف روحية جديدة'],
      isToday: false,
      daysUntil: 200,
      isRecurring: true
    },
    {
      id: '3',
      name: 'يوم عاشوراء',
      hijriDate: '10 محرم 1446',
      gregorianDate: '2024-07-16',
      type: 'عبادة',
      description: 'يوم مبارك صامه النبي صلى الله عليه وسلم وأمر بصيامه',
      significance: 'يوم نجى الله فيه موسى عليه السلام وقومه من فرعون',
      recommendations: ['صيام يوم عاشوراء', 'صيام يوم قبله أو بعده', 'الإكثار من الذكر والدعاء'],
      isToday: false,
      daysUntil: 210,
      isRecurring: true
    },
    {
      id: '4',
      name: 'المولد النبوي الشريف',
      hijriDate: '12 ربيع الأول 1446',
      gregorianDate: '2024-09-15',
      type: 'تاريخي',
      description: 'ذكرى مولد النبي محمد صلى الله عليه وسلم',
      significance: 'يوم ولادة خير البشر وخاتم المرسلين',
      recommendations: ['قراءة السيرة النبوية', 'الصلاة على النبي', 'تذكر أخلاقه وسنته'],
      isToday: false,
      daysUntil: 270,
      isRecurring: true
    },
    {
      id: '5',
      name: 'ليلة الإسراء والمعراج',
      hijriDate: '27 رجب 1446',
      gregorianDate: '2025-01-27',
      type: 'ديني',
      description: 'ذكرى رحلة النبي صلى الله عليه وسلم الليلية من المسجد الحرام إلى المسجد الأقصى ثم إلى السماوات العلا',
      significance: 'معجزة عظيمة تظهر مكانة النبي عند الله وتكريم الله له',
      recommendations: ['قراءة قصة الإسراء والمعراج', 'التأمل في عظمة هذه المعجزة', 'الدعاء والذكر'],
      isToday: true,
      daysUntil: 0,
      isRecurring: true,
      location: 'القدس الشريف'
    }
  ]);

  const eventTypes = ['الكل', 'ديني', 'تاريخي', 'موسمي', 'عبادة'];

  const filteredEvents = events.filter(event => 
    selectedType === 'الكل' || event.type === selectedType
  );

  const upcomingEvents = filteredEvents
    .filter(event => event.daysUntil >= 0)
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, 5);

  const todaysEvents = filteredEvents.filter(event => event.isToday);

  const getTypeColor = (type: string) => {
    const colors = {
      'ديني': 'bg-blue-100 text-blue-800',
      'تاريخي': 'bg-purple-100 text-purple-800',
      'موسمي': 'bg-orange-100 text-orange-800',
      'عبادة': 'bg-green-100 text-green-800',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getDaysText = (days: number) => {
    if (days === 0) return 'اليوم';
    if (days === 1) return 'غداً';
    if (days <= 7) return `خلال ${days} أيام`;
    if (days <= 30) return `خلال ${Math.ceil(days / 7)} أسابيع`;
    return `خلال ${Math.ceil(days / 30)} شهر`;
  };

  const setEventReminder = (eventId: string) => {
    toast({
      title: 'تم تعيين التذكير',
      description: 'سنذكرك قبل هذا الحدث بيوم واحد',
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-6 h-6 text-emerald-500" />
          التقويم الإسلامي والأحداث المهمة
        </CardTitle>
        <p className="text-sm text-gray-600">تتبع الأحداث والمناسبات الإسلامية المهمة على مدار السنة</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Today's Events */}
        {todaysEvents.length > 0 && (
          <div className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border-2 border-emerald-200">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-emerald-500" />
              أحداث اليوم
            </h3>
            {todaysEvents.map((event) => (
              <div key={event.id} className="bg-white p-3 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-lg">{event.name}</h4>
                    <p className="text-sm text-gray-600">{event.hijriDate}</p>
                    {event.location && (
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </p>
                    )}
                  </div>
                  <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                </div>
                <p className="text-sm text-gray-700 mb-2">{event.description}</p>
                <div className="text-xs text-emerald-600 font-medium">🌟 {event.significance}</div>
              </div>
            ))}
          </div>
        )}

        {/* Calendar Navigation */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
            <ChevronRight className="w-4 h-4" />
          </Button>
          <div className="text-center">
            <div className="font-semibold text-lg">
              {currentMonth.toLocaleDateString('ar-SA', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </div>
            <div className="text-sm text-gray-500">
              {currentMonth.toLocaleDateString('ar-SA-u-ca-islamic', {
                month: 'long',
                year: 'numeric'
              })} هجري
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>

        {/* Event Type Filter */}
        <div className="flex flex-wrap gap-2">
          {eventTypes.map(type => (
            <Button
              key={type}
              size="sm"
              variant={selectedType === type ? "default" : "outline"}
              onClick={() => setSelectedType(type)}
              className="text-xs"
            >
              {type}
            </Button>
          ))}
        </div>

        {/* Upcoming Events */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Clock className="w-5 h-5" />
            الأحداث القادمة
          </h3>
          {upcomingEvents.map((event) => (
            <div key={event.id} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-lg">{event.name}</h4>
                    {event.isRecurring && <Badge variant="outline" className="text-xs">سنوي</Badge>}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span>{event.hijriDate}</span>
                    <span>{event.gregorianDate}</span>
                    {event.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                    <Badge variant="secondary">{getDaysText(event.daysUntil)}</Badge>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEventReminder(event.id)}
                  className="flex items-center gap-1"
                >
                  <Bell className="w-3 h-3" />
                  تذكير
                </Button>
              </div>

              <p className="text-gray-700 mb-3 leading-relaxed">{event.description}</p>
              
              <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-1">الأهمية:</h5>
                <p className="text-sm text-blue-800">{event.significance}</p>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium text-gray-900">التوصيات:</h5>
                <div className="flex flex-wrap gap-1">
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

        {/* Monthly Statistics */}
        <div className="grid grid-cols-4 gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{filteredEvents.length}</div>
            <div className="text-xs text-purple-600">حدث مجدول</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              {filteredEvents.filter(e => e.type === 'عبادة').length}
            </div>
            <div className="text-xs text-green-600">مناسبة عبادة</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {filteredEvents.filter(e => e.daysUntil <= 30).length}
            </div>
            <div className="text-xs text-blue-600">خلال الشهر</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-600">
              {filteredEvents.filter(e => e.isRecurring).length}
            </div>
            <div className="text-xs text-orange-600">مناسبة سنوية</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicCalendarEvents;
