
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, Copy, Share2, Languages } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Translation {
  id: string;
  name: string;
  translator: string;
  language: string;
  text: string;
}

interface VerseComparison {
  surah: number;
  verse: number;
  arabic: string;
  translations: Translation[];
}

const QuranTranslationComparison = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVerse, setSelectedVerse] = useState<VerseComparison | null>(null);
  const [selectedTranslations, setSelectedTranslations] = useState<string[]>(['sahih', 'pickthall', 'yusuf']);

  const availableTranslations = [
    { id: 'sahih', name: 'Sahih International', translator: 'Saheeh International', language: 'English' },
    { id: 'pickthall', name: 'Pickthall', translator: 'Mohammed Marmaduke William Pickthall', language: 'English' },
    { id: 'yusuf', name: 'Yusuf Ali', translator: 'Abdullah Yusuf Ali', language: 'English' },
    { id: 'shakir', name: 'Shakir', translator: 'Mohammad Habib Shakir', language: 'English' },
    { id: 'hilali', name: 'Hilali & Khan', translator: 'Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan', language: 'English' },
    { id: 'french', name: 'French Translation', translator: 'Muhammad Hamidullah', language: 'French' },
    { id: 'urdu', name: 'Urdu Translation', translator: 'Fateh Muhammad Jalandhry', language: 'Urdu' }
  ];

  // Sample verse data
  const sampleVerse: VerseComparison = {
    surah: 1,
    verse: 2,
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    translations: [
      {
        id: 'sahih',
        name: 'Sahih International',
        translator: 'Saheeh International',
        language: 'English',
        text: '[All] praise is [due] to Allah, Lord of the worlds -'
      },
      {
        id: 'pickthall',
        name: 'Pickthall',
        translator: 'Mohammed Marmaduke William Pickthall',
        language: 'English',
        text: 'Praise be to Allah, Lord of the Worlds,'
      },
      {
        id: 'yusuf',
        name: 'Yusuf Ali',
        translator: 'Abdullah Yusuf Ali',
        language: 'English',
        text: 'Praise be to Allah, the Cherisher and Sustainer of the worlds;'
      }
    ]
  };

  const searchVerse = () => {
    if (searchQuery.trim()) {
      setSelectedVerse(sampleVerse);
      toast({
        title: 'آية محملة',
        description: `تم تحميل الآية ${sampleVerse.verse} من سورة الفاتحة`,
      });
    }
  };

  const toggleTranslation = (translationId: string) => {
    setSelectedTranslations(prev => 
      prev.includes(translationId) 
        ? prev.filter(id => id !== translationId)
        : [...prev, translationId]
    );
  };

  const copyTranslation = (text: string, translatorName: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'تم النسخ',
      description: `تم نسخ ترجمة ${translatorName}`,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Languages className="w-6 h-6 text-blue-500" />
          مقارنة ترجمات القرآن
        </CardTitle>
        <p className="text-sm text-gray-600">قارن بين ترجمات مختلفة لآيات القرآن الكريم</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="ابحث بسورة:آية (مثال: 1:2) أو كلمة مفتاحية"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              onKeyPress={(e) => e.key === 'Enter' && searchVerse()}
            />
          </div>
          <Button onClick={searchVerse}>
            <BookOpen className="w-4 h-4 mr-1" />
            بحث
          </Button>
        </div>

        {/* Translation Selection */}
        <div className="space-y-3">
          <h3 className="font-semibold">اختر الترجمات للمقارنة:</h3>
          <div className="flex flex-wrap gap-2">
            {availableTranslations.map(translation => (
              <Button
                key={translation.id}
                size="sm"
                variant={selectedTranslations.includes(translation.id) ? "default" : "outline"}
                onClick={() => toggleTranslation(translation.id)}
                className="text-xs"
              >
                {translation.name}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {translation.language}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Verse Comparison */}
        {selectedVerse && (
          <div className="space-y-6">
            {/* Arabic Text */}
            <div className="p-6 bg-emerald-50 rounded-lg text-center">
              <div className="text-2xl font-arabic leading-loose mb-2" dir="rtl">
                {selectedVerse.arabic}
              </div>
              <Badge variant="outline">
                سورة {selectedVerse.surah} - آية {selectedVerse.verse}
              </Badge>
            </div>

            {/* Translations */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">الترجمات:</h3>
              {selectedVerse.translations
                .filter(t => selectedTranslations.includes(t.id))
                .map(translation => (
                <div key={translation.id} className="border rounded-lg p-4 bg-white">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-blue-600">{translation.name}</h4>
                      <p className="text-sm text-gray-500">بواسطة: {translation.translator}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyTranslation(translation.text, translation.name)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-gray-800 leading-relaxed italic">
                    "{translation.text}"
                  </p>
                  <Badge className="mt-2" variant="secondary">
                    {translation.language}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Analysis */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">ملاحظات المقارنة:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• ترجمة صحيح إنترناشيونال تركز على المعنى الحرفي</li>
                <li>• ترجمة يوسف علي تستخدم لغة شاعرية أكثر</li>
                <li>• ترجمة بيكثال تحافظ على الطابع الكلاسيكي</li>
              </ul>
            </div>
          </div>
        )}

        {!selectedVerse && (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="font-semibold mb-2">ابحث عن آية للمقارنة</h3>
            <p className="text-sm">أدخل رقم السورة والآية أو كلمة مفتاحية للبحث</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuranTranslationComparison;
