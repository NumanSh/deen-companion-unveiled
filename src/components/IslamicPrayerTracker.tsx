
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Clock, CheckCircle, AlertCircle, Calendar, Target, TrendingUp, Edit3, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PrayerRecord {
  id: string;
  prayer: string;
  date: string;
  status: 'prayed' | 'missed' | 'qada';
  time?: string;
}

interface QadaCounter {
  fajr: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
}

const IslamicPrayerTracker = () => {
  const { toast } = useToast();
  const [todaysPrayers, setTodaysPrayers] = useState<PrayerRecord[]>([]);
  const [qadaCount, setQadaCount] = useState<QadaCounter>({
    fajr: 0,
    dhuhr: 0,
    asr: 0,
    maghrib: 0,
    isha: 0
  });
  const [streak, setStreak] = useState(0);
  const [editingQada, setEditingQada] = useState<string | null>(null);
  const [tempQadaValue, setTempQadaValue] = useState('');

  const prayers = [
    { name: 'fajr', displayName: 'الفجر', time: '05:30' },
    { name: 'dhuhr', displayName: 'الظهر', time: '12:15' },
    { name: 'asr', displayName: 'العصر', time: '15:45' },
    { name: 'maghrib', displayName: 'المغرب', time: '18:30' },
    { name: 'isha', displayName: 'العشاء', time: '20:00' }
  ];

  useEffect(() => {
    // Load qada count from localStorage
    const savedQada = localStorage.getItem('qada-counter');
    if (savedQada) {
      setQadaCount(JSON.parse(savedQada));
    }

    // Initialize today's prayers
    const today = new Date().toISOString().split('T')[0];
    const savedTodaysPrayers = localStorage.getItem(`prayers-${today}`);
    
    if (savedTodaysPrayers) {
      setTodaysPrayers(JSON.parse(savedTodaysPrayers));
    } else {
      const initialPrayers = prayers.map(prayer => ({
        id: `${prayer.name}-${today}`,
        prayer: prayer.name,
        date: today,
        status: 'missed' as const,
        time: prayer.time
      }));
      setTodaysPrayers(initialPrayers);
    }

    // Load streak
    const savedStreak = localStorage.getItem('prayer-streak');
    if (savedStreak) {
      setStreak(parseInt(savedStreak));
    }
  }, []);

  const markPrayerComplete = (prayerId: string) => {
    const updatedPrayers = todaysPrayers.map(prayer => 
      prayer.id === prayerId 
        ? { ...prayer, status: 'prayed' as const }
        : prayer
    );
    setTodaysPrayers(updatedPrayers);
    
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`prayers-${today}`, JSON.stringify(updatedPrayers));
    
    toast({
      title: 'صلاة مكتملة! 🤲',
      description: 'تقبل الله منك وجعلها في ميزان حسناتك',
    });
  };

  const markPrayerMissed = (prayerId: string, prayerName: string) => {
    const updatedPrayers = todaysPrayers.map(prayer => 
      prayer.id === prayerId 
        ? { ...prayer, status: 'missed' as const }
        : prayer
    );
    setTodaysPrayers(updatedPrayers);

    const newQadaCount = {
      ...qadaCount,
      [prayerName]: qadaCount[prayerName as keyof QadaCounter] + 1
    };
    setQadaCount(newQadaCount);
    localStorage.setItem('qada-counter', JSON.stringify(newQadaCount));

    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`prayers-${today}`, JSON.stringify(updatedPrayers));

    toast({
      title: 'صلاة فائتة',
      description: 'تم إضافتها لعداد القضاء. لا تنس قضاءها',
      variant: 'destructive'
    });
  };

  const makeUpQadaPrayer = (prayerName: string) => {
    if (qadaCount[prayerName as keyof QadaCounter] > 0) {
      const newQadaCount = {
        ...qadaCount,
        [prayerName]: Math.max(0, qadaCount[prayerName as keyof QadaCounter] - 1)
      };
      setQadaCount(newQadaCount);
      localStorage.setItem('qada-counter', JSON.stringify(newQadaCount));

      toast({
        title: 'قضاء الصلاة! ✅',
        description: `تم قضاء صلاة ${prayers.find(p => p.name === prayerName)?.displayName}`,
      });
    }
  };

  const startEditingQada = (prayerName: string) => {
    setEditingQada(prayerName);
    setTempQadaValue(qadaCount[prayerName as keyof QadaCounter].toString());
  };

  const saveQadaEdit = (prayerName: string) => {
    const newValue = parseInt(tempQadaValue) || 0;
    const newQadaCount = {
      ...qadaCount,
      [prayerName]: Math.max(0, newValue)
    };
    setQadaCount(newQadaCount);
    localStorage.setItem('qada-counter', JSON.stringify(newQadaCount));
    setEditingQada(null);
    
    toast({
      title: 'تم التحديث',
      description: `تم تحديث عدد صلوات ${prayers.find(p => p.name === prayerName)?.displayName} للقضاء`,
    });
  };

  const cancelQadaEdit = () => {
    setEditingQada(null);
    setTempQadaValue('');
  };

  const getTotalQada = () => {
    return Object.values(qadaCount).reduce((sum, count) => sum + count, 0);
  };

  const getCompletedToday = () => {
    return todaysPrayers.filter(p => p.status === 'prayed').length;
  };

  const getPrayerIcon = (status: string) => {
    switch (status) {
      case 'prayed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'missed': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-500" />
          متتبع الصلوات والقضاء
        </CardTitle>
        <p className="text-sm text-gray-600">تتبع صلواتك اليومية وقضاء الصلوات الفائتة</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{streak}</div>
            <div className="text-xs text-blue-600">أيام متتالية</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{getCompletedToday()}/5</div>
            <div className="text-xs text-green-600">صلوات اليوم</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{getTotalQada()}</div>
            <div className="text-xs text-orange-600">صلوات للقضاء</div>
          </div>
        </div>

        {/* Today's Prayers */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            صلوات اليوم
          </h3>
          {todaysPrayers.map((prayer) => {
            const prayerInfo = prayers.find(p => p.name === prayer.prayer);
            return (
              <div key={prayer.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getPrayerIcon(prayer.status)}
                  <div>
                    <div className="font-medium">{prayerInfo?.displayName}</div>
                    <div className="text-sm text-gray-500">{prayer.time}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {prayer.status !== 'prayed' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => markPrayerComplete(prayer.id)}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        صليت
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markPrayerMissed(prayer.id, prayer.prayer)}
                        className="text-red-500 border-red-200"
                      >
                        فاتت
                      </Button>
                    </>
                  )}
                  {prayer.status === 'prayed' && (
                    <Badge className="bg-green-100 text-green-800">مكتملة</Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Qada Counter */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Target className="w-5 h-5" />
            عداد القضاء
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {prayers.map((prayer) => {
              const count = qadaCount[prayer.name as keyof QadaCounter];
              const isEditing = editingQada === prayer.name;
              return (
                <div key={prayer.name} className="flex items-center justify-between p-3 border rounded-lg bg-orange-50">
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{prayer.displayName}</div>
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={tempQadaValue}
                          onChange={(e) => setTempQadaValue(e.target.value)}
                          className="w-20 h-8"
                          min="0"
                        />
                        <Button size="sm" onClick={() => saveQadaEdit(prayer.name)}>
                          <Save className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={cancelQadaEdit}>
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Badge variant={count > 0 ? "destructive" : "secondary"}>
                          {count} للقضاء
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => startEditingQada(prayer.name)}
                          className="p-1 h-6 w-6"
                        >
                          <Edit3 className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  {!isEditing && count > 0 && (
                    <Button
                      size="sm"
                      onClick={() => makeUpQadaPrayer(prayer.name)}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      قضيت
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <div className="text-sm text-indigo-800 text-center font-medium">
            "إن أول ما يحاسب به العبد يوم القيامة من عمله صلاته"
          </div>
          <div className="text-xs text-indigo-600 text-center mt-1">
            - النبي محمد صلى الله عليه وسلم
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicPrayerTracker;
