
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, History, MapPin, Users, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VerseContext {
  id: string;
  surah: string;
  ayahNumber: number;
  arabicText: string;
  translation: string;
  revelationPlace: 'مكة' | 'المدينة';
  revelationPeriod: string;
  historicalContext: string;
  occasionOfRevelation: string;
  relatedEvents: string[];
  previousVerses: string;
  nextVerses: string;
  themes: string[];
  lessons: string[];
}

const QuranVerseContextExplorer = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSurah, setSelectedSurah] = useState('');
  const [selectedAyah, setSelectedAyah] = useState('');
  const [currentContext, setCurrentContext] = useState<VerseContext | null>(null);

  const mockContext: VerseContext = {
    id: '1',
    surah: 'البقرة',
    ayahNumber: 255,
    arabicText: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ',
    translation: 'الله لا إله إلا هو الحي القيوم لا تأخذه سنة ولا نوم',
    revelationPlace: 'المدينة',
    revelationPeriod: 'السنة الثانية للهجرة',
    historicalContext: 'نزلت هذه الآية في المدينة المنورة في بداية تأسيس المجتمع الإسلامي، حيث كان المسلمون بحاجة لتعزيز عقيدتهم وفهم عظمة الله',
    occasionOfRevelation: 'نزلت بعد غزوة بدر لتثبيت إيمان المؤمنين وتذكيرهم بعظمة الله وقدرته',
    relatedEvents: ['غزوة بدر', 'بناء المسجد النبوي', 'تأسيس الدولة الإسلامية'],
    previousVerses: 'الآيات السابقة تتحدث عن الإنفاق في سبيل الله',
    nextVerses: 'الآيات التالية تتحدث عن حرية الاختيار في الدين',
    themes: ['التوحيد', 'أسماء الله الحسنى', 'العقيدة', 'القدرة الإلهية'],
    lessons: [
      'عظمة الله وكماله',
      'أهمية التوحيد في الإسلام',
      'الاعتماد على الله في جميع الأمور',
      'تعزيز الإيمان في النفوس'
    ]
  };

  const handleSearch = () => {
    if (!selectedSurah || !selectedAyah) {
      toast({
        title: 'الرجاء إدخال السورة والآية',
        description: 'يجب تحديد اسم السورة ورقم الآية للبحث',
        variant: 'destructive'
      });
      return;
    }

    setCurrentContext(mockContext);
    toast({
      title: 'تم تحميل السياق',
      description: `تم عرض السياق التاريخي للآية ${selectedAyah} من سورة ${selectedSurah}`,
    });
  };

  const getPlaceColor = (place: string) => {
    return place === 'مكة' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="w-6 h-6 text-teal-500" />
          مستكشف السياق القرآني
        </CardTitle>
        <p className="text-sm text-gray-600">اكتشف السياق التاريخي وأسباب النزول لآيات القرآن الكريم</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Interface */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">السورة</label>
            <Input
              placeholder="مثال: البقرة"
              value={selectedSurah}
              onChange={(e) => setSelectedSurah(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">رقم الآية</label>
            <Input
              type="number"
              placeholder="مثال: 255"
              value={selectedAyah}
              onChange={(e) => setSelectedAyah(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleSearch} className="w-full">
              <Search className="w-4 h-4 mr-2" />
              استكشاف السياق
            </Button>
          </div>
        </div>

        {/* Context Results */}
        {currentContext && (
          <div className="space-y-6">
            {/* Verse Display */}
            <div className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-200">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-teal-900">
                  سورة {currentContext.surah} - الآية {currentContext.ayahNumber}
                </h3>
                <div className="flex justify-center gap-2 mt-2">
                  <Badge className={getPlaceColor(currentContext.revelationPlace)}>
                    <MapPin className="w-3 h-3 mr-1" />
                    {currentContext.revelationPlace}
                  </Badge>
                  <Badge variant="outline">
                    <Clock className="w-3 h-3 mr-1" />
                    {currentContext.revelationPeriod}
                  </Badge>
                </div>
              </div>
              <div className="text-center text-2xl font-arabic text-teal-800 leading-loose mb-4">
                {currentContext.arabicText}
              </div>
              <div className="text-center text-gray-700">
                {currentContext.translation}
              </div>
            </div>

            {/* Historical Context */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-blue-50">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <History className="w-4 h-4" />
                    السياق التاريخي
                  </h4>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    {currentContext.historicalContext}
                  </p>
                </div>

                <div className="p-4 border rounded-lg bg-green-50">
                  <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    سبب النزول
                  </h4>
                  <p className="text-sm text-green-800 leading-relaxed">
                    {currentContext.occasionOfRevelation}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-purple-50">
                  <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    الأحداث المرتبطة
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentContext.relatedEvents.map((event, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {event}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-orange-50">
                  <h4 className="font-semibold text-orange-900 mb-2">المواضيع الرئيسية</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentContext.themes.map((theme, index) => (
                      <Badge key={index} className="bg-orange-200 text-orange-800 text-xs">
                        {theme}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Verse Context */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">الآيات السابقة</h4>
                <p className="text-sm text-gray-700">{currentContext.previousVerses}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">الآيات التالية</h4>
                <p className="text-sm text-gray-700">{currentContext.nextVerses}</p>
              </div>
            </div>

            {/* Lessons */}
            <div className="p-4 border rounded-lg bg-yellow-50">
              <h4 className="font-semibold text-yellow-900 mb-3">الدروس المستفادة</h4>
              <ul className="space-y-2">
                {currentContext.lessons.map((lesson, index) => (
                  <li key={index} className="text-sm text-yellow-800 flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    {lesson}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-teal-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-teal-600">6236</div>
            <div className="text-xs text-teal-600">آية قرآنية</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">114</div>
            <div className="text-xs text-blue-600">سورة</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">30</div>
            <div className="text-xs text-green-600">جزء</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuranVerseContextExplorer;
