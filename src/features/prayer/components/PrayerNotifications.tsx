
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, BellOff, Settings, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PrayerTime {
  name: string;
  time: string;
  isNext: boolean;
}

const PrayerNotifications: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null);
  const { toast } = useToast();

  const prayerTimes: PrayerTime[] = [
    { name: 'Fajr', time: '05:30', isNext: false },
    { name: 'Dhuhr', time: '12:45', isNext: true },
    { name: 'Asr', time: '16:20', isNext: false },
    { name: 'Maghrib', time: '18:45', isNext: false },
    { name: 'Isha', time: '20:15', isNext: false },
  ];

  useEffect(() => {
    const next = prayerTimes.find(prayer => prayer.isNext);
    setNextPrayer(next || prayerTimes[0]);
  }, []);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        toast({
          title: "Notifications Enabled",
          description: "You'll receive prayer time reminders",
        });
      }
    }
  };

  const playAdhan = () => {
    if (soundEnabled) {
      // In a real app, you'd play the actual adhan sound
      toast({
        title: "🕌 Prayer Time",
        description: `Time for ${nextPrayer?.name} prayer`,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-600" />
          Prayer Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Next Prayer */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200">Next Prayer</h3>
          <div className="flex items-center justify-between mt-2">
            <div>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {nextPrayer?.name}
              </p>
              <p className="text-blue-600 dark:text-blue-300">{nextPrayer?.time}</p>
            </div>
            <Button onClick={playAdhan} variant="outline" size="icon">
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* All Prayer Times */}
        <div className="space-y-2">
          <h4 className="font-medium">Today's Prayer Times</h4>
          {prayerTimes.map((prayer) => (
            <div key={prayer.name} className={`flex justify-between items-center p-2 rounded ${
              prayer.isNext ? 'bg-green-100 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-800'
            }`}>
              <span className={prayer.isNext ? 'font-semibold text-green-800 dark:text-green-200' : ''}>
                {prayer.name}
              </span>
              <span className={prayer.isNext ? 'font-semibold text-green-800 dark:text-green-200' : ''}>
                {prayer.time}
              </span>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            <Button
              variant={notificationsEnabled ? "default" : "outline"}
              size="sm"
              onClick={requestNotificationPermission}
              className="flex items-center gap-2"
            >
              {notificationsEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
              {notificationsEnabled ? 'Enabled' : 'Enable'}
            </Button>
            <Button
              variant={soundEnabled ? "default" : "outline"}
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
            >
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrayerNotifications;
