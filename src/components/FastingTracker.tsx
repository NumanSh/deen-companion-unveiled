
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Moon, Sun, Calendar, Clock, Star, Trophy } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface FastingDay {
  date: string;
  type: 'ramadan' | 'monday' | 'thursday' | 'ashura' | 'arafah' | 'custom';
  completed: boolean;
  suhurTime?: string;
  iftarTime?: string;
  intention?: string;
}

const FastingTracker = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [currentFast, setCurrentFast] = useState<FastingDay | null>(null);
  const [fastingHistory, setFastingHistory] = useState<FastingDay[]>([]);
  const [fastingStats, setFastingStats] = useState({
    totalFasts: 45,
    ramadanFasts: 30,
    voluntaryFasts: 15,
    currentStreak: 3
  });

  const [timeUntilIftar, setTimeUntilIftar] = useState('');

  useEffect(() => {
    // Simulate checking if user is currently fasting
    const today = new Date().toISOString().split('T')[0];
    const todayFast = fastingHistory.find(fast => fast.date === today);
    setCurrentFast(todayFast || null);

    // Update countdown timer
    const updateTimer = () => {
      if (currentFast?.iftarTime) {
        const now = new Date();
        const iftar = new Date();
        const [hours, minutes] = currentFast.iftarTime.split(':').map(Number);
        iftar.setHours(hours, minutes, 0, 0);
        
        if (iftar > now) {
          const diff = iftar.getTime() - now.getTime();
          const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
          const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setTimeUntilIftar(`${hoursLeft}:${minutesLeft.toString().padStart(2, '0')}`);
        } else {
          setTimeUntilIftar('حان وقت الإفطار!');
        }
      }
    };

    const timer = setInterval(updateTimer, 60000);
    updateTimer();
    return () => clearInterval(timer);
  }, [currentFast, fastingHistory]);

  const startFasting = (type: FastingDay['type']) => {
    const today = new Date().toISOString().split('T')[0];
    const newFast: FastingDay = {
      date: today,
      type,
      completed: false,
      suhurTime: '04:30',
      iftarTime: '18:45',
      intention: getIntentionText(type)
    };

    setCurrentFast(newFast);
    setFastingHistory(prev => [...prev, newFast]);
    
    toast({
      title: '🌙 بدأ الصيام',
      description: `تم تسجيل نية الصيام. بارك الله لك في صيامك`,
    });
  };

  const completeFasting = () => {
    if (currentFast) {
      const updatedFast = { ...currentFast, completed: true };
      setCurrentFast(updatedFast);
      setFastingHistory(prev => 
        prev.map(fast => fast.date === currentFast.date ? updatedFast : fast)
      );
      
      setFastingStats(prev => ({
        ...prev,
        totalFasts: prev.totalFasts + 1,
        voluntaryFasts: currentFast.type !== 'ramadan' ? prev.voluntaryFasts + 1 : prev.voluntaryFasts,
        ramadanFasts: currentFast.type === 'ramadan' ? prev.ramadanFasts + 1 : prev.ramadanFasts,
        currentStreak: prev.currentStreak + 1
      }));
      
      toast({
        title: '🎉 تم إتمام الصيام',
        description: 'تقبل الله صيامك وقيامك. بارك الله فيك!',
      });
    }
  };

  const getIntentionText = (type: FastingDay['type']) => {
    const intentions = {
      ramadan: 'نويت صوم غد عن أداء فرض رمضان هذه السنة لله تعالى',
      monday: 'نويت صوم يوم الاثنين تطوعاً لله تعالى',
      thursday: 'نويت صوم يوم الخميس تطوعاً لله تعالى',
      ashura: 'نويت صوم يوم عاشوراء تطوعاً لله تعالى',
      arafah: 'نويت صوم يوم عرفة تطوعاً لله تعالى',
      custom: 'نويت الصوم تطوعاً لله تعالى'
    };
    return intentions[type];
  };

  const getFastTypeLabel = (type: FastingDay['type']) => {
    const labels = {
      ramadan: 'رمضان',
      monday: 'الاثنين',
      thursday: 'الخميس',
      ashura: 'عاشوراء',
      arafah: 'عرفة',
      custom: 'تطوع'
    };
    return labels[type];
  };

  const getFastTypeColor = (type: FastingDay['type']) => {
    const colors = {
      ramadan: 'bg-green-100 text-green-800',
      monday: 'bg-blue-100 text-blue-800',
      thursday: 'bg-purple-100 text-purple-800',
      ashura: 'bg-orange-100 text-orange-800',
      arafah: 'bg-red-100 text-red-800',
      custom: 'bg-gray-100 text-gray-800'
    };
    return colors[type];
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Moon className="w-6 h-6 text-indigo-500" />
          متتبع الصيام
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Fast Status */}
        {currentFast ? (
          <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Moon className="w-8 h-8 text-indigo-600" />
                <div>
                  <h3 className="font-bold text-lg">أنت تصوم الآن</h3>
                  <Badge className={getFastTypeColor(currentFast.type)}>
                    {getFastTypeLabel(currentFast.type)}
                  </Badge>
                </div>
              </div>
              {!currentFast.completed && (
                <Button onClick={completeFasting} className="bg-green-500 hover:bg-green-600">
                  إتمام الصيام
                </Button>
              )}
            </div>
            
            {timeUntilIftar && !currentFast.completed && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold">الوقت المتبقي للإفطار:</span>
                  <span className="text-2xl font-bold text-orange-600">{timeUntilIftar}</span>
                </div>
                <Progress value={65} className="h-3" />
              </div>
            )}
            
            <div className="text-sm text-gray-600 bg-white p-3 rounded border">
              <strong>النية:</strong> {currentFast.intention}
            </div>
          </div>
        ) : (
          <div className="p-4 bg-gray-50 rounded-lg border text-center">
            <Sun className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-700 mb-2">لست تصوم اليوم</h3>
            <p className="text-sm text-gray-500 mb-4">ابدأ صيام جديد</p>
            
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={() => startFasting('monday')} 
                variant="outline"
                className="text-sm"
              >
                صيام الاثنين
              </Button>
              <Button 
                onClick={() => startFasting('thursday')} 
                variant="outline"
                className="text-sm"
              >
                صيام الخميس
              </Button>
              <Button 
                onClick={() => startFasting('custom')} 
                variant="outline"
                className="text-sm"
              >
                صيام تطوع
              </Button>
              <Button 
                onClick={() => startFasting('ramadan')} 
                variant="outline"
                className="text-sm"
              >
                صيام رمضان
              </Button>
            </div>
          </div>
        )}

        {/* Fasting Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Trophy className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <div className="text-xl font-bold text-blue-800">{fastingStats.totalFasts}</div>
            <div className="text-xs text-blue-600">إجمالي الصيام</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <Moon className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <div className="text-xl font-bold text-green-800">{fastingStats.ramadanFasts}</div>
            <div className="text-xs text-green-600">صيام رمضان</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <Star className="w-6 h-6 text-purple-600 mx-auto mb-1" />
            <div className="text-xl font-bold text-purple-800">{fastingStats.voluntaryFasts}</div>
            <div className="text-xs text-purple-600">صيام تطوع</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <Calendar className="w-6 h-6 text-orange-600 mx-auto mb-1" />
            <div className="text-xl font-bold text-orange-800">{fastingStats.currentStreak}</div>
            <div className="text-xs text-orange-600">أيام متتالية</div>
          </div>
        </div>

        {/* Islamic Knowledge Box */}
        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
          <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
            <Star className="w-5 h-5" />
            فضل الصيام
          </h4>
          <p className="text-sm text-amber-700">
            قال رسول الله صلى الله عليه وسلم: "من صام يوماً في سبيل الله باعد الله وجهه عن النار سبعين خريفاً"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FastingTracker;
