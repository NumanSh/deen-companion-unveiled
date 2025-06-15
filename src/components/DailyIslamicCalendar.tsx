
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  Moon,
  Sun,
  Clock,
  Bell,
  MapPin,
  Star,
  BookOpen,
  Heart,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IslamicEvent {
  id: string;
  title: string;
  description: string;
  type: 'religious' | 'historical' | 'cultural';
  date: string;
  priority: 'high' | 'medium' | 'low';
}

interface PrayerTime {
  name: string;
  time: string;
  arabicName: string;
  passed: boolean;
  next: boolean;
}

interface HijriDate {
  day: number;
  month: string;
  year: number;
  monthNumber: number;
}

const DailyIslamicCalendar = () => {
  const { toast } = useToast();
  const [currentDate] = useState(new Date());
  const [hijriDate] = useState<HijriDate>({
    day: 15,
    month: 'جمادى الآخرة',
    year: 1446,
    monthNumber: 6
  });

  const [prayerTimes] = useState<PrayerTime[]>([
    { name: 'Fajr', time: '05:30', arabicName: 'الفجر', passed: true, next: false },
    { name: 'Sunrise', time: '06:52', arabicName: 'الشروق', passed: true, next: false },
    { name: 'Dhuhr', time: '12:15', arabicName: 'الظهر', passed: true, next: false },
    { name: 'Asr', time: '15:30', arabicName: 'العصر', passed: false, next: true },
    { name: 'Maghrib', time: '17:45', arabicName: 'المغرب', passed: false, next: false },
    { name: 'Isha', time: '19:15', arabicName: 'العشاء', passed: false, next: false }
  ]);

  const [todayEvents] = useState<IslamicEvent[]>([
    {
      id: '1',
      title: 'ليلة القدر المحتملة',
      description: 'إحدى الليالي الوترية في العشر الأواخر من رمضان',
      type: 'religious',
      date: '2024-01-15',
      priority: 'high'
    },
    {
      id: '2',
      title: 'ذكرى فتح مكة',
      description: 'الفتح العظيم في السنة الثامنة للهجرة',
      type: 'historical',
      date: '2024-01-15',
      priority: 'medium'
    }
  ]);

  const [dailyReminders] = useState([
    'قراءة الورد اليومي من القرآن',
    'أذكار الصباح والمساء',
    'الصلاة على النبي ﷺ',
    'الاستغفار والتسبيح'
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'religious': return <Star className="w-4 h-4" />;
      case 'historical': return <BookOpen className="w-4 h-4" />;
      case 'cultural': return <Heart className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const formatGregorianDate = (date: Date) => {
    return date.toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Date Header */}
      <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calendar className="w-6 h-6" />
              <h2 className="text-2xl font-bold">التقويم الإسلامي اليومي</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* Hijri Date */}
              <div className="bg-white/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Moon className="w-5 h-5" />
                  <span className="text-sm opacity-90">التاريخ الهجري</span>
                </div>
                <div className="text-xl font-bold">
                  {hijriDate.day} {hijriDate.month} {hijriDate.year}
                </div>
              </div>

              {/* Gregorian Date */}
              <div className="bg-white/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="w-5 h-5" />
                  <span className="text-sm opacity-90">التاريخ الميلادي</span>
                </div>
                <div className="text-xl font-bold">
                  {formatGregorianDate(currentDate)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Prayer Times */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              مواقيت الصلاة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {prayerTimes.map((prayer, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    prayer.next
                      ? 'bg-blue-50 border-blue-200'
                      : prayer.passed
                      ? 'bg-gray-50 border-gray-200'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      prayer.next ? 'bg-blue-500' : prayer.passed ? 'bg-gray-400' : 'bg-green-500'
                    }`} />
                    <span className="font-medium">{prayer.arabicName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-mono">{prayer.time}</span>
                    {prayer.next && (
                      <Badge className="bg-blue-100 text-blue-800">التالية</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-800">الموقع: الرياض، السعودية</span>
              </div>
              <p className="text-xs text-emerald-700">
                المواقيت محسوبة حسب موقعك الحالي
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Today's Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-600" />
              أحداث اليوم
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todayEvents.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>لا توجد أحداث خاصة اليوم</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg border ${getPriorityColor(event.priority)}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-1 bg-white rounded">
                        {getTypeIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{event.title}</h3>
                        <p className="text-sm opacity-90">{event.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Daily Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-600" />
            تذكيرات يومية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {dailyReminders.map((reminder, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200"
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span className="flex-1 text-purple-800">{reminder}</span>
                <Button variant="ghost" size="sm" className="text-purple-600">
                  <Zap className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Bell className="w-4 h-4 mr-2" />
              تفعيل التذكيرات
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>إجراءات سريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-16 flex-col gap-1">
              <BookOpen className="w-5 h-5" />
              <span className="text-xs">قراءة القرآن</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-1">
              <Heart className="w-5 h-5" />
              <span className="text-xs">الأذكار</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-1">
              <Star className="w-5 h-5" />
              <span className="text-xs">الأدعية</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-1">
              <Calendar className="w-5 h-5" />
              <span className="text-xs">التقويم</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyIslamicCalendar;
