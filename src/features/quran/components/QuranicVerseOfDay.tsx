
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Heart, Share2, Volume2, Bookmark, RefreshCw } from 'lucide-react';
import { useToast } from '@/shared';
import { fetchRandomVerse } from '@/features/quran';

interface Verse {
  arabic: string;
  translation: string;
  transliteration: string;
  surahName: string;
  verseNumber: number;
  reflection: string;
  theme: string;
}

const QuranicVerseOfDay = () => {
  const { toast } = useToast();
  
  const [dailyVerse, setDailyVerse] = useState<Verse>({
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    translation: "All praise is due to Allah, Lord of the worlds.",
    transliteration: "Alhamdu lillahi rabbi al-alameen",
    surahName: "Al-Fatihah",
    verseNumber: 2,
    reflection: "This verse reminds us to always be grateful to Allah, the Lord of all creation.",
    theme: "Gratitude"
  });

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Fetch verse of the day
  const fetchVerseOfDay = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching verse of the day from API...');
      const verseData = await fetchRandomVerse();
      
      setDailyVerse({
        arabic: verseData.arabicText,
        translation: verseData.translation,
        transliteration: "Loading transliteration...", // Could be enhanced with transliteration API
        surahName: verseData.surahName,
        verseNumber: verseData.verse,
        reflection: "Reflect on this beautiful verse from the Quran and contemplate its meaning in your daily life.",
        theme: "Daily Reflection"
      });

      toast({
        title: '📖 Verse Updated',
        description: 'New verse of the day loaded from Quran API',
      });
    } catch (error) {
      console.error('Failed to fetch verse of the day:', error);
      toast({
        title: 'Connection Error',
        description: 'Using offline verse. Check your internet connection.',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    // Fetch verse of the day on component mount
    fetchVerseOfDay();

    return () => clearInterval(timer);
  }, []);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? 'تم إلغاء الحفظ' : '📖 تم حفظ الآية',
      description: isBookmarked ? 'تم إزالة الآية من المحفوظات' : 'تم حفظ آية اليوم في المفضلة',
    });
  };

  const shareVerse = async () => {
    const shareText = `${dailyVerse.arabic}\n\n${dailyVerse.translation}\n\n${dailyVerse.surahName} - آية ${dailyVerse.verseNumber}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'آية اليوم',
          text: shareText,
        });
      } catch (error) {
        copyToClipboard(shareText);
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: '📋 تم النسخ',
      description: 'تم نسخ آية اليوم إلى الحافظة',
    });
  };

  const playAudio = () => {
    // Simulate audio play
    toast({
      title: '🔊 تشغيل الصوت',
      description: 'جاري تشغيل تلاوة الآية الكريمة',
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-green-500" />
            آية اليوم
          </div>
          <Button
            onClick={fetchVerseOfDay}
            size="sm"
            variant="outline"
            disabled={isLoading}
            className="flex items-center gap-1"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            تحديث
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Header */}
        <div className="text-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
          <div className="text-sm text-green-600">
            {currentDate.toLocaleDateString('ar-SA', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        {/* Verse Card */}
        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          {/* Arabic Text */}
          <div className="text-center mb-4">
            <div className="text-2xl leading-relaxed font-arabic text-blue-900 mb-3">
              {dailyVerse.arabic}
            </div>
            <div className="flex items-center justify-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">
                {dailyVerse.surahName} - آية {dailyVerse.verseNumber}
              </Badge>
              <Badge variant="outline" className="border-blue-300 text-blue-700">
                {dailyVerse.theme}
              </Badge>
            </div>
          </div>

          {/* Translation */}
          <div className="text-center mb-4 p-3 bg-white/50 rounded">
            <p className="text-blue-800 leading-relaxed">{dailyVerse.translation}</p>
          </div>

          {/* Transliteration */}
          <div className="text-center mb-4 text-sm text-blue-600 italic">
            {dailyVerse.transliteration}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Button
              onClick={playAudio}
              size="sm"
              variant="outline"
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              <Volume2 className="w-4 h-4 mr-1" />
              استمع
            </Button>
            <Button
              onClick={toggleBookmark}
              size="sm"
              variant="outline"
              className={`border-blue-300 ${isBookmarked ? 'bg-blue-100 text-blue-800' : 'text-blue-700 hover:bg-blue-50'}`}
            >
              <Bookmark className={`w-4 h-4 mr-1 ${isBookmarked ? 'fill-current' : ''}`} />
              {isBookmarked ? 'محفوظة' : 'احفظ'}
            </Button>
            <Button
              onClick={shareVerse}
              size="sm"
              variant="outline"
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              <Share2 className="w-4 h-4 mr-1" />
              شارك
            </Button>
          </div>
        </div>

        {/* Reflection */}
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            تأمل وتدبر
          </h4>
          <p className="text-yellow-700 leading-relaxed">{dailyVerse.reflection}</p>
        </div>

        {/* API Status */}
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">مصدر البيانات</div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg">🌐</span>
            <span className="text-gray-600">القرآن الكريم API</span>
            {isLoading && <span className="text-blue-600">جاري التحديث...</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuranicVerseOfDay;
