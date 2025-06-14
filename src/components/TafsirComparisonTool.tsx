
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, Users, Eye, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TafsirComparison {
  verse: string;
  surah: string;
  ayahNumber: number;
  arabicText: string;
  tafsirs: {
    scholar: string;
    interpretation: string;
    approach: string;
    era: string;
  }[];
}

const TafsirComparisonTool = () => {
  const { toast } = useToast();
  const [selectedSurah, setSelectedSurah] = useState('');
  const [selectedAyah, setSelectedAyah] = useState('');
  const [currentComparison, setCurrentComparison] = useState<TafsirComparison | null>(null);
  const [selectedScholars, setSelectedScholars] = useState<string[]>(['الطبري', 'ابن كثير', 'القرطبي']);

  const availableScholars = [
    { name: 'الطبري', era: 'الطبقة الأولى', approach: 'التفسير بالمأثور' },
    { name: 'ابن كثير', era: 'العصر الوسيط', approach: 'التفسير بالمأثور' },
    { name: 'القرطبي', era: 'العصر الوسيط', approach: 'التفسير الفقهي' },
    { name: 'الزمخشري', era: 'العصر الوسيط', approach: 'التفسير البلاغي' },
    { name: 'الرازي', era: 'العصر الوسيط', approach: 'التفسير العقلي' },
    { name: 'السعدي', era: 'العصر الحديث', approach: 'التفسير المبسط' },
  ];

  const mockComparison: TafsirComparison = {
    verse: 'الفاتحة',
    surah: 'الفاتحة',
    ayahNumber: 6,
    arabicText: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
    tafsirs: [
      {
        scholar: 'الطبري',
        interpretation: 'أرشدنا إلى الطريق القويم الذي لا اعوجاج فيه، وهو دين الإسلام الذي بعث الله به محمداً صلى الله عليه وسلم',
        approach: 'التفسير بالمأثور',
        era: 'الطبقة الأولى'
      },
      {
        scholar: 'ابن كثير',
        interpretation: 'أي أدمنا واثبتنا وزدنا هداية، وهو طلب الثبات على الهداية والزيادة منها، والصراط المستقيم هو الإسلام',
        approach: 'التفسير بالمأثور',
        era: 'العصر الوسيط'
      },
      {
        scholar: 'القرطبي',
        interpretation: 'الهداية هنا طلب الإرشاد والتوفيق، والصراط المستقيم قيل هو القرآن، وقيل الإسلام، وقيل النبي وصحابته',
        approach: 'التفسير الفقهي',
        era: 'العصر الوسيط'
      }
    ]
  };

  const handleSearch = () => {
    if (!selectedSurah || !selectedAyah) {
      toast({
        title: 'الرجاء اختيار السورة والآية',
        description: 'يجب تحديد السورة ورقم الآية للمقارنة',
        variant: 'destructive'
      });
      return;
    }

    setCurrentComparison(mockComparison);
    toast({
      title: 'تم تحميل التفاسير',
      description: `تم عرض تفسير الآية ${selectedAyah} من سورة ${selectedSurah}`,
    });
  };

  const toggleScholar = (scholar: string) => {
    setSelectedScholars(prev => 
      prev.includes(scholar)
        ? prev.filter(s => s !== scholar)
        : [...prev, scholar]
    );
  };

  const getApproachColor = (approach: string) => {
    const colors = {
      'التفسير بالمأثور': 'bg-green-100 text-green-800',
      'التفسير الفقهي': 'bg-blue-100 text-blue-800',
      'التفسير البلاغي': 'bg-purple-100 text-purple-800',
      'التفسير العقلي': 'bg-orange-100 text-orange-800',
      'التفسير المبسط': 'bg-pink-100 text-pink-800',
    };
    return colors[approach as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-6 h-6 text-purple-500" />
          أداة مقارنة التفاسير
        </CardTitle>
        <p className="text-sm text-gray-600">قارن بين تفسيرات العلماء لآيات القرآن الكريم</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Interface */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">السورة</label>
            <Input
              placeholder="اسم السورة"
              value={selectedSurah}
              onChange={(e) => setSelectedSurah(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">رقم الآية</label>
            <Input
              type="number"
              placeholder="رقم الآية"
              value={selectedAyah}
              onChange={(e) => setSelectedAyah(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleSearch} className="w-full">
              <Search className="w-4 h-4 mr-2" />
              قارن التفاسير
            </Button>
          </div>
        </div>

        {/* Scholar Selection */}
        <div>
          <h3 className="font-medium mb-3">اختر المفسرين للمقارنة:</h3>
          <div className="flex flex-wrap gap-2">
            {availableScholars.map((scholar) => (
              <Button
                key={scholar.name}
                variant={selectedScholars.includes(scholar.name) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleScholar(scholar.name)}
                className="text-sm"
              >
                {scholar.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Comparison Results */}
        {currentComparison && (
          <div className="space-y-6">
            {/* Verse Display */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-blue-900">
                  سورة {currentComparison.surah} - الآية {currentComparison.ayahNumber}
                </h3>
              </div>
              <div className="text-center text-2xl font-arabic text-blue-800 leading-loose">
                {currentComparison.arabicText}
              </div>
            </div>

            {/* Tafsir Comparisons */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                المقارنة بين التفاسير
              </h3>
              
              {currentComparison.tafsirs
                .filter(tafsir => selectedScholars.includes(tafsir.scholar))
                .map((tafsir, index) => (
                <div key={index} className="p-4 border rounded-lg bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-lg">{tafsir.scholar}</h4>
                      <Badge variant="outline">{tafsir.era}</Badge>
                    </div>
                    <Badge className={getApproachColor(tafsir.approach)}>
                      {tafsir.approach}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed text-right">
                    {tafsir.interpretation}
                  </p>
                </div>
              ))}
            </div>

            {/* Analysis Summary */}
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                ملاحظات المقارنة
              </h4>
              <div className="space-y-2 text-sm text-yellow-700">
                <p>• يتفق المفسرون على أن الصراط المستقيم هو الطريق الصحيح في الدين</p>
                <p>• التفسير بالمأثور يركز على النقل من السلف</p>
                <p>• التفسير الفقهي يستنبط الأحكام الشرعية</p>
              </div>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-purple-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{availableScholars.length}</div>
            <div className="text-xs text-purple-600">مفسر متاح</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">6236</div>
            <div className="text-xs text-blue-600">آية قرآنية</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">114</div>
            <div className="text-xs text-green-600">سورة</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TafsirComparisonTool;
