
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, Clock, Volume2, VolumeX, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PrayerTime {
  name: string;
  time: string;
  enabled: boolean;
  reminderMinutes: number;
}

const IslamicPrayerTimeAlerts = () => {
  const { toast } = useToast();
  
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([
    { name: 'الفجر', time: '05:30', enabled: true, reminderMinutes: 10 },
    { name: 'الظهر', time: '12:15', enabled: true, reminderMinutes: 5 },
    { name: 'العصر', time: '15:45', enabled: true, reminderMinutes: 5 },
    { name: 'المغرب', time: '18:20', enabled: true, reminderMinutes: 10 },
    { name: 'العشاء', time: '19:50', enabled: true, reminderMinutes: 5 }
  ]);

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      checkPrayerTimes();
    }, 1000);

    return () => clearInterval(timer);
  }, [prayerTimes]);

  const checkPrayerTimes = () => {
    const now = new Date();
    const currentTimeString = now.toTimeString().slice(0, 5);
    
    prayerTimes.forEach(prayer => {
      if (prayer.enabled && prayer.time === currentTimeString) {
        showPrayerAlert(prayer.name);
      }
    });
  };

  const showPrayerAlert = (prayerName: string) => {
    toast({
      title: `🕌 حان وقت صلاة ${prayerName}`,
      description: 'بارك الله فيك، لا تنس أداء الصلاة',
    });

    if (soundEnabled && 'Notification' in window) {
      new Notification(`حان وقت صلاة ${prayerName}`, {
        body: 'بارك الله فيك، لا تنس أداء الصلاة',
        icon: '/favicon.ico'
      });
    }
  };

  const togglePrayer = (index: number) => {
    setPrayerTimes(prev => prev.map((prayer, i) => 
      i === index ? { ...prayer, enabled: !prayer.enabled } : prayer
    ));
  };

  const getNextPrayer = () => {
    const now = new Date();
    const currentTimeMinutes = now.getHours() * 60 + now.getMinutes();
    
    for (const prayer of prayerTimes) {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerTimeMinutes = hours * 60 + minutes;
      
      if (prayerTimeMinutes > currentTimeMinutes && prayer.enabled) {
        return {
          name: prayer.name,
          time: prayer.time,
          minutesUntil: prayerTimeMinutes - currentTimeMinutes
        };
      }
    }
    
    // If no prayer found today, return first prayer tomorrow
    const firstPrayer = prayerTimes.find(p => p.enabled);
    if (firstPrayer) {
      const [hours, minutes] = firstPrayer.time.split(':').map(Number);
      const prayerTimeMinutes = hours * 60 + minutes;
      const minutesUntilTomorrow = (24 * 60) - currentTimeMinutes + prayerTimeMinutes;
      
      return {
        name: firstPrayer.name,
        time: firstPrayer.time,
        minutesUntil: minutesUntilTomorrow
      };
    }
    
    return null;
  };

  const nextPrayer = getNextPrayer();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-6 h-6 text-blue-500" />
          تنبيهات مواقيت الصلاة
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Next Prayer */}
        {nextPrayer && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">الصلاة القادمة</h4>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-blue-900">{nextPrayer.name}</div>
                <div className="text-blue-700">{nextPrayer.time}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-blue-800">
                  {Math.floor(nextPrayer.minutesUntil / 60)}:{String(nextPrayer.minutesUntil % 60).padStart(2, '0')}
                </div>
                <div className="text-sm text-blue-600">متبقي</div>
              </div>
            </div>
          </div>
        )}

        {/* Sound Settings */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            {soundEnabled ? <Volume2 className="w-5 h-5 text-green-600" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
            <span className="font-medium">تنبيهات صوتية</span>
          </div>
          <Switch
            checked={soundEnabled}
            onCheckedChange={setSoundEnabled}
          />
        </div>

        {/* Prayer Times List */}
        <div className="space-y-3">
          <h4 className="font-semibold">مواقيت الصلاة</h4>
          {prayerTimes.map((prayer, index) => (
            <div key={prayer.name} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Switch
                  checked={prayer.enabled}
                  onCheckedChange={() => togglePrayer(index)}
                />
                <div>
                  <div className="font-medium">{prayer.name}</div>
                  <div className="text-sm text-gray-600">{prayer.time}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={prayer.enabled ? "default" : "secondary"}>
                  {prayer.enabled ? 'مفعل' : 'معطل'}
                </Badge>
                <Clock className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Current Time */}
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-sm text-green-600">الوقت الحالي</div>
          <div className="text-xl font-bold text-green-800">
            {currentTime.toLocaleTimeString('ar-SA', { 
              hour: '2-digit', 
              minute: '2-digit',
              second: '2-digit',
              hour12: true 
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicPrayerTimeAlerts;
