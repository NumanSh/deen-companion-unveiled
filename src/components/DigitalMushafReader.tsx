
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Settings, Bookmark, Search, Play, Pause, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VerseData {
  number: number;
  arabic: string;
  translation: string;
  audio?: string;
}

interface ReaderSettings {
  fontSize: number;
  theme: 'light' | 'sepia' | 'dark';
  showTranslation: boolean;
  autoScroll: boolean;
  highlightVerse: boolean;
}

const DigitalMushafReader = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [settings, setSettings] = useState<ReaderSettings>({
    fontSize: 18,
    theme: 'light',
    showTranslation: true,
    autoScroll: false,
    highlightVerse: true
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerse, setCurrentVerse] = useState(1);
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  // Sample Quran data (Surah Al-Fatihah)
  const verses: VerseData[] = [
    {
      number: 1,
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful."
    },
    {
      number: 2,
      arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      translation: "All praise is due to Allah, Lord of the worlds -"
    },
    {
      number: 3,
      arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
      translation: "The Entirely Merciful, the Especially Merciful,"
    },
    {
      number: 4,
      arabic: "مَالِكِ يَوْمِ الدِّينِ",
      translation: "Sovereign of the Day of Recompense."
    },
    {
      number: 5,
      arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      translation: "It is You we worship and You we ask for help."
    },
    {
      number: 6,
      arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
      translation: "Guide us to the straight path -"
    },
    {
      number: 7,
      arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
      translation: "The path of those upon whom You have bestowed favor, not of those who have evoked Your anger or of those who are astray."
    }
  ];

  const getThemeClasses = () => {
    switch (settings.theme) {
      case 'sepia':
        return 'bg-yellow-50 text-yellow-900';
      case 'dark':
        return 'bg-gray-900 text-white';
      default:
        return 'bg-white text-gray-900';
    }
  };

  const toggleBookmark = (verseNumber: number) => {
    if (bookmarks.includes(verseNumber)) {
      setBookmarks(prev => prev.filter(v => v !== verseNumber));
      toast({
        title: 'تم إزالة العلامة المرجعية',
        description: `الآية ${verseNumber}`,
      });
    } else {
      setBookmarks(prev => [...prev, verseNumber]);
      toast({
        title: 'تم إضافة علامة مرجعية',
        description: `الآية ${verseNumber}`,
      });
    }
  };

  const toggleAudioPlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      toast({
        title: 'بدء التشغيل',
        description: 'جاري تشغيل التلاوة',
      });
    }
  };

  const updateSettings = (key: keyof ReaderSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-500" />
            المصحف الرقمي
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">سورة الفاتحة</Badge>
            <Badge variant="secondary">صفحة {currentPage}</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap gap-4 p-4 border rounded-lg">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">حجم الخط:</span>
            <Slider
              value={[settings.fontSize]}
              onValueChange={([value]) => updateSettings('fontSize', value)}
              max={24}
              min={12}
              step={1}
              className="w-20"
            />
            <span className="text-sm">{settings.fontSize}px</span>
          </div>

          <div className="flex gap-2">
            {(['light', 'sepia', 'dark'] as const).map(theme => (
              <Button
                key={theme}
                size="sm"
                variant={settings.theme === theme ? "default" : "outline"}
                onClick={() => updateSettings('theme', theme)}
                className="text-xs"
              >
                {theme === 'light' ? 'فاتح' : theme === 'sepia' ? 'كلاسيكي' : 'مظلم'}
              </Button>
            ))}
          </div>

          <Button
            size="sm"
            variant={settings.showTranslation ? "default" : "outline"}
            onClick={() => updateSettings('showTranslation', !settings.showTranslation)}
          >
            الترجمة
          </Button>

          <Button
            size="sm"
            onClick={toggleAudioPlayback}
            className="flex items-center gap-1"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {isPlaying ? 'إيقاف' : 'تشغيل'}
          </Button>
        </div>

        {/* Quran Text */}
        <div className={`p-6 rounded-lg transition-all ${getThemeClasses()}`}>
          <div className="space-y-6">
            {verses.map((verse) => (
              <div
                key={verse.number}
                className={`relative group ${
                  settings.highlightVerse && currentVerse === verse.number
                    ? 'bg-blue-100 dark:bg-blue-900 p-3 rounded-lg'
                    : ''
                }`}
              >
                {/* Verse Number and Bookmark */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-medium">
                      {verse.number}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleBookmark(verse.number)}
                      className={bookmarks.includes(verse.number) ? 'text-yellow-500' : 'text-gray-400'}
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarks.includes(verse.number) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </div>

                {/* Arabic Text */}
                <div
                  className="text-right leading-loose mb-3"
                  style={{ fontSize: `${settings.fontSize + 2}px` }}
                  dir="rtl"
                >
                  {verse.arabic}
                </div>

                {/* Translation */}
                {settings.showTranslation && (
                  <div
                    className="text-left text-gray-600 dark:text-gray-300 italic"
                    style={{ fontSize: `${settings.fontSize - 2}px` }}
                  >
                    {verse.translation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            الصفحة السابقة
          </Button>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              صفحة {currentPage} من 604
            </span>
            <Button size="sm" variant="outline">
              <Search className="w-4 h-4 mr-1" />
              بحث
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === 604}
          >
            الصفحة التالية
          </Button>
        </div>

        {/* Reading Progress */}
        <div className="p-4 bg-emerald-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-emerald-800">تقدم القراءة</span>
            <span className="text-sm text-emerald-600">{Math.round((currentPage / 604) * 100)}%</span>
          </div>
          <div className="w-full bg-emerald-200 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all"
              style={{ width: `${(currentPage / 604) * 100}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DigitalMushafReader;
