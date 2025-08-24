
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, Clock, MapPin, Volume2, VolumeX, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PrayerTime {
  name: string;
  arabicName: string;
  time: string;
  adhanTime: string;
  iqamaTime: string;
  isNext: boolean;
  timeRemaining?: string;
}

interface ReminderSettings {
  enabled: boolean;
  beforeAdhan: number; // minutes before
  adhanSound: boolean;
  vibration: boolean;
  iqamaReminder: boolean;
  voiceReminder: boolean;
}

const SmartSalahReminder = () => {
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [settings, setSettings] = useState<ReminderSettings>({
    enabled: true,
    beforeAdhan: 10,
    adhanSound: true,
    vibration: true,
    iqamaReminder: true,
    voiceReminder: false
  });
  const [location, setLocation] = useState('الرياض، السعودية');

  useEffect(() => {
    // Sample prayer times for today
    const sampleTimes: PrayerTime[] = [
      {
        name: 'fajr',
        arabicName: 'الفجر',
        time: '05:30',
        adhanTime: '05:30',
        iqamaTime: '05:45',
        isNext: false
      },
      {
        name: 'dhuhr',
        arabicName: 'الظهر',
        time: '12:15',
        adhanTime: '12:15',
        iqamaTime: '12:30',
        isNext: true,
        timeRemaining: '2 ساعة و 30 دقيقة'
      },
      {
        name: 'asr',
        arabicName: 'العصر',
        time: '15:45',
        adhanTime: '15:45',
        iqamaTime: '16:00',
        isNext: false
      },
      {
        name: 'maghrib',
        arabicName: 'المغرب',
        time: '18:30',
        adhanTime: '18:30',
        iqamaTime: '18:35',
        isNext: false
      },
      {
        name: 'isha',
        arabicName: 'العشاء',
        time: '20:00',
        adhanTime: '20:00',
        iqamaTime: '20:15',
        isNext: false
      }
    ];

    setPrayerTimes(sampleTimes);

    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const updateSettings = (key: keyof ReminderSettings, value: boolean | number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: 'تم تحديث الإعدادات',
      description: 'تم حفظ إعدادات التذكير الجديدة',
    });
  };

  const testReminder = () => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('حان وقت الصلاة', {
          body: 'حان وقت صلاة الظهر',
          icon: '/placeholder.svg'
        });
      } else {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('حان وقت الصلاة', {
              body: 'حان وقت صلاة الظهر',
              icon: '/placeholder.svg'
            });
          }
        });
      }
    }
    
    toast({
      title: 'تجربة التذكير',
      description: 'تم إرسال تذكير تجريبي',
    });
  };

  const nextPrayer = prayerTimes.find(prayer => prayer.isNext);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-6 h-6 text-indigo-500" />
          نظام التذكير الذكي للصلاة
        </CardTitle>
        <p className="text-sm text-gray-600">تذكيرات ذكية لأوقات الصلاة مع إعدادات قابلة للتخصيص</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg">الصلاة القادمة</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-3 h-3" />
                {location}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600">
                {currentTime.toLocaleTimeString('ar-SA', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
              <div className="text-sm text-gray-500">
                {currentTime.toLocaleDateString('ar-SA')}
              </div>
            </div>
          </div>
          
          {nextPrayer && (
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div>
                <div className="font-semibold text-lg">{nextPrayer.arabicName}</div>
                <div className="text-sm text-gray-600">
                  الأذان: {nextPrayer.adhanTime} • الإقامة: {nextPrayer.iqamaTime}
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-indigo-500">
                  {nextPrayer.timeRemaining}
                </Badge>
              </div>
            </div>
          )}
        </div>

        {/* Today's Prayer Times */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Clock className="w-5 h-5" />
            مواقيت اليوم
          </h3>
          <div className="grid gap-2">
            {prayerTimes.map((prayer) => (
              <div
                key={prayer.name}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  prayer.isNext 
                    ? 'bg-indigo-100 border-2 border-indigo-300' 
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    prayer.isNext ? 'bg-indigo-500' : 'bg-gray-400'
                  }`}></div>
                  <div>
                    <div className="font-medium">{prayer.arabicName}</div>
                    <div className="text-sm text-gray-500">
                      الإقامة: {prayer.iqamaTime}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{prayer.adhanTime}</div>
                  {prayer.isNext && (
                    <div className="text-xs text-indigo-600">القادمة</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reminder Settings */}
        <div className="space-y-4 p-4 border rounded-lg">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Settings className="w-5 h-5" />
            إعدادات التذكير
          </h3>
          
          <div className="space-y-4">
            {/* Main Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">تفعيل التذكيرات</div>
                <div className="text-sm text-gray-500">تذكيرات أوقات الصلاة</div>
              </div>
              <Switch
                checked={settings.enabled}
                onCheckedChange={(checked) => updateSettings('enabled', checked)}
              />
            </div>

            {settings.enabled && (
              <>
                {/* Before Adhan Reminder */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">التذكير قبل الأذان</div>
                    <div className="text-sm text-gray-500">
                      {settings.beforeAdhan} دقائق قبل الأذان
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {[5, 10, 15, 30].map(minutes => (
                      <Button
                        key={minutes}
                        size="sm"
                        variant={settings.beforeAdhan === minutes ? "default" : "outline"}
                        onClick={() => updateSettings('beforeAdhan', minutes)}
                        className="text-xs"
                      >
                        {minutes}د
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Adhan Sound */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">صوت الأذان</div>
                    <div className="text-sm text-gray-500">تشغيل الأذان عند دخول الوقت</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {settings.adhanSound ? (
                      <Volume2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-gray-400" />
                    )}
                    <Switch
                      checked={settings.adhanSound}
                      onCheckedChange={(checked) => updateSettings('adhanSound', checked)}
                    />
                  </div>
                </div>

                {/* Iqama Reminder */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">تذكير الإقامة</div>
                    <div className="text-sm text-gray-500">تذكير بوقت الإقامة</div>
                  </div>
                  <Switch
                    checked={settings.iqamaReminder}
                    onCheckedChange={(checked) => updateSettings('iqamaReminder', checked)}
                  />
                </div>

                {/* Vibration */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">الاهتزاز</div>
                    <div className="text-sm text-gray-500">اهتزاز الجهاز مع التذكير</div>
                  </div>
                  <Switch
                    checked={settings.vibration}
                    onCheckedChange={(checked) => updateSettings('vibration', checked)}
                  />
                </div>
              </>
            )}
          </div>

          {/* Test Button */}
          <Button 
            onClick={testReminder}
            className="w-full"
            variant="outline"
          >
            <Bell className="w-4 h-4 mr-2" />
            تجربة التذكير
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">5</div>
            <div className="text-xs text-green-600">صلوات يومية</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {settings.beforeAdhan}
            </div>
            <div className="text-xs text-blue-600">دقائق قبل الأذان</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">
              {settings.enabled ? 'مفعل' : 'معطل'}
            </div>
            <div className="text-xs text-purple-600">حالة التذكير</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartSalahReminder;
