
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRightLeft, Clock, Moon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useHijriDate } from '@/hooks/useHijriDate';

interface DateConversion {
  gregorian: {
    day: number;
    month: number;
    year: number;
    monthName: string;
    dayName: string;
  };
  hijri: {
    day: number;
    month: string;
    year: number;
    monthName: string;
    dayName: string;
  };
}

const HijriDateConverter = () => {
  const { toast } = useToast();
  const currentHijriDate = useHijriDate();
  
  const [gregorianInput, setGregorianInput] = useState('');
  const [hijriInput, setHijriInput] = useState('');
  const [conversionResult, setConversionResult] = useState<DateConversion | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const hijriMonths = [
    'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الثانية',
    'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
  ];

  const gregorianMonths = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  const arabicDays = [
    'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simple Hijri conversion (approximation)
  const convertGregorianToHijri = (gregorianDate: Date) => {
    const hijriEpoch = new Date(622, 6, 16);
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysSinceEpoch = Math.floor((gregorianDate.getTime() - hijriEpoch.getTime()) / msPerDay);
    
    const avgHijriYear = 354.367;
    const hijriYear = Math.floor(daysSinceEpoch / avgHijriYear) + 1;
    const dayOfYear = Math.floor(daysSinceEpoch % avgHijriYear);
    
    let remainingDays = dayOfYear;
    let month = 0;
    let day = 1;
    
    const monthDays = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
    
    for (let i = 0; i < monthDays.length; i++) {
      if (remainingDays <= monthDays[i]) {
        month = i;
        day = Math.max(1, Math.floor(remainingDays));
        break;
      }
      remainingDays -= monthDays[i];
    }

    return {
      day,
      month: hijriMonths[month],
      year: hijriYear,
      monthName: hijriMonths[month],
      dayName: arabicDays[gregorianDate.getDay()]
    };
  };

  const convertHijriToGregorian = (hijriDay: number, hijriMonthIndex: number, hijriYear: number) => {
    // Simple approximation
    const avgHijriYear = 354.367;
    const hijriEpoch = new Date(622, 6, 16);
    
    const monthDays = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
    let totalDays = (hijriYear - 1) * avgHijriYear;
    
    for (let i = 0; i < hijriMonthIndex; i++) {
      totalDays += monthDays[i];
    }
    totalDays += hijriDay;
    
    const gregorianDate = new Date(hijriEpoch.getTime() + totalDays * 24 * 60 * 60 * 1000);
    
    return {
      day: gregorianDate.getDate(),
      month: gregorianDate.getMonth() + 1,
      year: gregorianDate.getFullYear(),
      monthName: gregorianMonths[gregorianDate.getMonth()],
      dayName: arabicDays[gregorianDate.getDay()]
    };
  };

  const handleGregorianConversion = () => {
    if (!gregorianInput) {
      toast({
        title: '⚠️ تنبيه',
        description: 'الرجاء إدخال التاريخ الميلادي',
        variant: 'destructive',
      });
      return;
    }

    const [year, month, day] = gregorianInput.split('-').map(Number);
    const gregorianDate = new Date(year, month - 1, day);
    const hijriDate = convertGregorianToHijri(gregorianDate);

    setConversionResult({
      gregorian: {
        day,
        month,
        year,
        monthName: gregorianMonths[month - 1],
        dayName: arabicDays[gregorianDate.getDay()]
      },
      hijri: hijriDate
    });

    toast({
      title: '✅ تم التحويل',
      description: 'تم تحويل التاريخ من الميلادي إلى الهجري',
    });
  };

  const handleHijriConversion = () => {
    if (!hijriInput) {
      toast({
        title: '⚠️ تنبيه',
        description: 'الرجاء إدخال التاريخ الهجري',
        variant: 'destructive',
      });
      return;
    }

    const [day, monthIndex, year] = hijriInput.split('-').map((val, index) => {
      if (index === 1) return parseInt(val) - 1; // month index
      return parseInt(val);
    });

    const gregorianDate = convertHijriToGregorian(day, monthIndex, year);
    
    setConversionResult({
      gregorian: gregorianDate,
      hijri: {
        day,
        month: hijriMonths[monthIndex],
        year,
        monthName: hijriMonths[monthIndex],
        dayName: gregorianDate.dayName
      }
    });

    toast({
      title: '✅ تم التحويل',
      description: 'تم تحويل التاريخ من الهجري إلى الميلادي',
    });
  };

  const getCurrentConversion = () => {
    const today = new Date();
    const hijriToday = convertGregorianToHijri(today);
    
    return {
      gregorian: {
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear(),
        monthName: gregorianMonths[today.getMonth()],
        dayName: arabicDays[today.getDay()]
      },
      hijri: hijriToday
    };
  };

  const todayConversion = getCurrentConversion();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-6 h-6 text-purple-500" />
          محول التاريخ الهجري والميلادي
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Date Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              اليوم - التاريخ الميلادي
            </h4>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-900 mb-1">
                {todayConversion.gregorian.day} {todayConversion.gregorian.monthName} {todayConversion.gregorian.year}
              </div>
              <div className="text-green-700">{todayConversion.gregorian.dayName}</div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <Moon className="w-5 h-5" />
              اليوم - التاريخ الهجري
            </h4>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900 mb-1">
                {todayConversion.hijri.day} {todayConversion.hijri.month} {todayConversion.hijri.year}
              </div>
              <div className="text-blue-700">{todayConversion.hijri.dayName}</div>
            </div>
          </div>
        </div>

        {/* Current Time */}
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">الوقت الحالي</span>
          </div>
          <div className="text-lg font-bold text-gray-800">
            {currentDate.toLocaleTimeString('ar-SA', { 
              hour: '2-digit', 
              minute: '2-digit',
              second: '2-digit',
              hour12: true 
            })}
          </div>
        </div>

        {/* Conversion Tools */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5" />
            أدوات التحويل
          </h3>

          {/* Gregorian to Hijri */}
          <div className="p-4 border rounded-lg space-y-3">
            <h4 className="font-medium text-gray-800">تحويل من الميلادي إلى الهجري</h4>
            <div className="flex gap-2">
              <Input
                type="date"
                value={gregorianInput}
                onChange={(e) => setGregorianInput(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleGregorianConversion} className="bg-green-500 hover:bg-green-600">
                تحويل
              </Button>
            </div>
          </div>

          {/* Hijri to Gregorian */}
          <div className="p-4 border rounded-lg space-y-3">
            <h4 className="font-medium text-gray-800">تحويل من الهجري إلى الميلادي</h4>
            <div className="grid grid-cols-3 gap-2">
              <Input
                type="number"
                placeholder="اليوم"
                onChange={(e) => {
                  const parts = hijriInput.split('-');
                  parts[0] = e.target.value;
                  setHijriInput(parts.join('-'));
                }}
              />
              <Input
                type="number"
                placeholder="الشهر (1-12)"
                min="1"
                max="12"
                onChange={(e) => {
                  const parts = hijriInput.split('-');
                  parts[1] = e.target.value;
                  setHijriInput(parts.join('-'));
                }}
              />
              <Input
                type="number"
                placeholder="السنة"
                onChange={(e) => {
                  const parts = hijriInput.split('-');
                  parts[2] = e.target.value;
                  setHijriInput(parts.join('-'));
                }}
              />
            </div>
            <Button onClick={handleHijriConversion} className="bg-blue-500 hover:bg-blue-600 w-full">
              تحويل
            </Button>
          </div>
        </div>

        {/* Conversion Result */}
        {conversionResult && (
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">نتيجة التحويل</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-white rounded border">
                <div className="text-sm text-gray-600 mb-1">التاريخ الميلادي</div>
                <div className="font-bold text-gray-800">
                  {conversionResult.gregorian.day} {conversionResult.gregorian.monthName} {conversionResult.gregorian.year}
                </div>
                <div className="text-sm text-gray-600">{conversionResult.gregorian.dayName}</div>
              </div>
              <div className="p-3 bg-white rounded border">
                <div className="text-sm text-gray-600 mb-1">التاريخ الهجري</div>
                <div className="font-bold text-gray-800">
                  {conversionResult.hijri.day} {conversionResult.hijri.month} {conversionResult.hijri.year}
                </div>
                <div className="text-sm text-gray-600">{conversionResult.hijri.dayName}</div>
              </div>
            </div>
          </div>
        )}

        {/* Hijri Months Reference */}
        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <h4 className="font-semibold text-indigo-800 mb-3">الأشهر الهجرية</h4>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {hijriMonths.map((month, index) => (
              <Badge key={month} variant="outline" className="text-center p-2">
                {index + 1}. {month}
              </Badge>
            ))}
          </div>
        </div>

        {/* Important Islamic Dates */}
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-3">مناسبات إسلامية مهمة</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>رأس السنة الهجرية:</span>
              <span className="font-medium">1 محرم</span>
            </div>
            <div className="flex justify-between">
              <span>عاشوراء:</span>
              <span className="font-medium">10 محرم</span>
            </div>
            <div className="flex justify-between">
              <span>المولد النبوي:</span>
              <span className="font-medium">12 ربيع الأول</span>
            </div>
            <div className="flex justify-between">
              <span>ليلة الإسراء والمعراج:</span>
              <span className="font-medium">27 رجب</span>
            </div>
            <div className="flex justify-between">
              <span>شهر رمضان:</span>
              <span className="font-medium">1-30 رمضان</span>
            </div>
            <div className="flex justify-between">
              <span>عيد الفطر:</span>
              <span className="font-medium">1 شوال</span>
            </div>
            <div className="flex justify-between">
              <span>عيد الأضحى:</span>
              <span className="font-medium">10 ذو الحجة</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HijriDateConverter;
