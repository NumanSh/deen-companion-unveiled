
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen, Search, Volume2, Bookmark, MessageSquare, ArrowLeft, ArrowRight, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TafsirData {
  surahNumber: number;
  surahName: string;
  verseNumber: number;
  arabicText: string;
  translation: string;
  tafsir: {
    author: string;
    text: string;
    keyPoints: string[];
    linguisticNotes: string;
    historicalContext: string;
  };
  relatedVerses: Array<{
    surah: string;
    verse: number;
    connection: string;
  }>;
}

const DigitalTafsirReader = () => {
  const { toast } = useToast();
  
  const [currentVerse, setCurrentVerse] = useState<TafsirData>({
    surahNumber: 2,
    surahName: "البقرة",
    verseNumber: 255,
    arabicText: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ",
    translation: "الله لا إله إلا هو الحي القيوم لا تأخذه سنة ولا نوم",
    tafsir: {
      author: "ابن كثير",
      text: "هذه آية الكرسي، وهي أعظم آية في كتاب الله تعالى. تتضمن توحيد الألوهية والربوبية وإثبات صفات الكمال لله عز وجل",
      keyPoints: [
        "إثبات وحدانية الله تعالى",
        "إثبات صفة الحياة الكاملة لله",
        "نفي النقائص عن الله سبحانه وتعالى",
        "إثبات القيومية وهي قيام الله بنفسه وإقامته لجميع المخلوقات"
      ],
      linguisticNotes: "القيوم: صيغة مبالغة من القيام، بمعنى الذي يقوم بنفسه ويُقيم غيره",
      historicalContext: "نزلت هذه الآية في المدينة المنورة، وهي من أعظم الآيات التي تتحدث عن صفات الله تعالى"
    },
    relatedVerses: [
      { surah: "الإخلاص", verse: 1, connection: "توحيد الألوهية" },
      { surah: "الحشر", verse: 22, connection: "أسماء الله الحسنى" },
      { surah: "البقرة", verse: 163, connection: "وحدانية الله" }
    ]
  });

  const [fontSize, setFontSize] = useState(18);
  const [showTafsir, setShowTafsir] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<number[]>([255]);
  const [readingMode, setReadingMode] = useState<'light' | 'dark' | 'sepia'>('light');

  const sampleVerses = [
    {
      surahNumber: 1,
      surahName: "الفاتحة",
      verse: 1,
      text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
    },
    {
      surahNumber: 2,
      surahName: "البقرة",
      verse: 255,
      text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ"
    },
    {
      surahNumber: 112,
      surahName: "الإخلاص",
      verse: 1,
      text: "قُلْ هُوَ اللَّهُ أَحَدٌ"
    }
  ];

  const toggleBookmark = () => {
    const verseId = currentVerse.verseNumber;
    setBookmarks(prev => 
      prev.includes(verseId) 
        ? prev.filter(id => id !== verseId)
        : [...prev, verseId]
    );
    
    toast({
      title: bookmarks.includes(verseId) ? 'تم إلغاء الحفظ' : '📖 تم حفظ الآية',
      description: bookmarks.includes(verseId) 
        ? 'تم إزالة الآية من المحفوظات' 
        : 'تم حفظ الآية في التفسير المحفوظ',
    });
  };

  const playAudio = () => {
    toast({
      title: '🔊 تشغيل التلاوة',
      description: 'جاري تشغيل تلاوة الآية مع التفسير',
    });
  };

  const navigateVerse = (direction: 'next' | 'prev') => {
    toast({
      title: direction === 'next' ? '⬅️ الآية التالية' : '➡️ الآية السابقة',
      description: 'جاري تحميل الآية والتفسير',
    });
  };

  const getReadingModeClass = () => {
    switch (readingMode) {
      case 'dark': return 'bg-gray-900 text-white';
      case 'sepia': return 'bg-yellow-50 text-amber-900';
      default: return 'bg-white text-gray-900';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-500" />
          قارئ التفسير الرقمي
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Controls */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="ابحث في القرآن والتفسير..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setFontSize(prev => Math.min(prev + 2, 24))}>
              A+
            </Button>
            <Button size="sm" variant="outline" onClick={() => setFontSize(prev => Math.max(prev - 2, 14))}>
              A-
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setReadingMode(prev => 
                prev === 'light' ? 'dark' : prev === 'dark' ? 'sepia' : 'light'
              )}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="flex gap-2 overflow-x-auto">
          {sampleVerses.map((verse, index) => (
            <Button
              key={index}
              size="sm"
              variant="outline"
              className="whitespace-nowrap"
              onClick={() => toast({ title: 'تحميل الآية', description: `${verse.surahName} - آية ${verse.verse}` })}
            >
              {verse.surahName} {verse.verse}
            </Button>
          ))}
        </div>

        {/* Main Content */}
        <div className={`p-6 rounded-lg transition-colors ${getReadingModeClass()}`}>
          {/* Verse Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold mb-1">
                سورة {currentVerse.surahName} - آية {currentVerse.verseNumber}
              </h3>
              <Badge variant="outline">رقم السورة: {currentVerse.surahNumber}</Badge>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => navigateVerse('prev')}>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => navigateVerse('next')}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Arabic Text */}
          <div className="text-center mb-6">
            <div 
              className="leading-relaxed font-arabic mb-4" 
              style={{ fontSize: `${fontSize + 6}px` }}
            >
              {currentVerse.arabicText}
            </div>
            <div 
              className="leading-relaxed"
              style={{ fontSize: `${fontSize}px` }}
            >
              {currentVerse.translation}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3 mb-6">
            <Button size="sm" variant="outline" onClick={playAudio}>
              <Volume2 className="w-4 h-4 mr-1" />
              استمع
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={toggleBookmark}
              className={bookmarks.includes(currentVerse.verseNumber) ? 'bg-blue-100' : ''}
            >
              <Bookmark className={`w-4 h-4 mr-1 ${bookmarks.includes(currentVerse.verseNumber) ? 'fill-current' : ''}`} />
              {bookmarks.includes(currentVerse.verseNumber) ? 'محفوظة' : 'احفظ'}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setShowTafsir(!showTafsir)}>
              <MessageSquare className="w-4 h-4 mr-1" />
              {showTafsir ? 'إخفاء التفسير' : 'عرض التفسير'}
            </Button>
          </div>
        </div>

        {/* Tafsir Section */}
        {showTafsir && (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-green-500" />
              التفسير - {currentVerse.tafsir.author}
            </h4>
            
            <ScrollArea className="h-64">
              <div className="space-y-4 pr-4">
                {/* Main Tafsir */}
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="leading-relaxed text-green-800">{currentVerse.tafsir.text}</p>
                </div>

                {/* Key Points */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2">النقاط الرئيسية:</h5>
                  <ul className="space-y-1">
                    {currentVerse.tafsir.keyPoints.map((point, index) => (
                      <li key={index} className="text-blue-700 text-sm flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Linguistic Notes */}
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h5 className="font-semibold text-yellow-800 mb-2">ملاحظات لغوية:</h5>
                  <p className="text-yellow-700 text-sm">{currentVerse.tafsir.linguisticNotes}</p>
                </div>

                {/* Historical Context */}
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h5 className="font-semibold text-purple-800 mb-2">السياق التاريخي:</h5>
                  <p className="text-purple-700 text-sm">{currentVerse.tafsir.historicalContext}</p>
                </div>

                {/* Related Verses */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-semibold text-gray-800 mb-2">آيات ذات صلة:</h5>
                  <div className="space-y-2">
                    {currentVerse.relatedVerses.map((related, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="font-medium">سورة {related.surah} - آية {related.verse}</span>
                        <Badge variant="secondary" className="text-xs">{related.connection}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Reading Progress */}
        <div className="p-3 bg-indigo-50 rounded-lg text-center">
          <div className="text-sm text-indigo-600 mb-1">تقدم القراءة اليوم</div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg font-bold text-indigo-800">5</span>
            <span className="text-indigo-600">آيات مع تفسيرها</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DigitalTafsirReader;
