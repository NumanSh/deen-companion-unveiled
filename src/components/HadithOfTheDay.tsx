
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Share2, BookOpen, Heart, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DailyHadith {
  id: string;
  arabic: string;
  translation: string;
  narrator: string;
  source: string;
  reference: string;
  theme: string;
  commentary: string;
  date: string;
}

const HadithOfTheDay: React.FC = () => {
  const [currentHadith, setCurrentHadith] = useState<DailyHadith | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const dailyHadiths: DailyHadith[] = [
    {
      id: 'hadith-1',
      arabic: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
      translation: 'Actions are but by intention, and every man shall have only that which he intended.',
      narrator: 'Umar ibn Al-Khattab (RA)',
      source: 'Sahih al-Bukhari',
      reference: 'Book 1, Hadith 1',
      theme: 'Intention and Sincerity',
      commentary: 'This fundamental hadith teaches us that the value of our deeds lies in our intentions. Whether our actions lead to reward or punishment depends on what we intended when performing them.',
      date: new Date().toLocaleDateString()
    },
    {
      id: 'hadith-2',
      arabic: 'مَن كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْراً أَوْ لِيَصْمُتْ',
      translation: 'Whoever believes in Allah and the Last Day should speak good or remain silent.',
      narrator: 'Abu Hurairah (RA)',
      source: 'Sahih al-Bukhari',
      reference: 'Book 78, Hadith 109',
      theme: 'Speech and Conduct',
      commentary: 'This hadith emphasizes the importance of mindful speech. Our words have power and can either bring benefit or harm. Silence is better than harmful speech.',
      date: new Date().toLocaleDateString()
    },
    {
      id: 'hadith-3',
      arabic: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
      translation: 'None of you believes until he loves for his brother what he loves for himself.',
      narrator: 'Anas ibn Malik (RA)',
      source: 'Sahih al-Bukhari',
      reference: 'Book 2, Hadith 12',
      theme: 'Brotherhood and Love',
      commentary: 'True faith is demonstrated through our care for others. This hadith teaches us that genuine belief includes wanting good for others as we want for ourselves.',
      date: new Date().toLocaleDateString()
    },
    {
      id: 'hadith-4',
      arabic: 'الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ',
      translation: 'A Muslim is one from whose tongue and hand the Muslims are safe.',
      narrator: 'Abdullah ibn Amr (RA)',
      source: 'Sahih al-Bukhari',
      reference: 'Book 2, Hadith 9',
      theme: 'Character and Behavior',
      commentary: 'True Islam is reflected in our character. A Muslim should be a source of peace and safety for others, not harm or distress.',
      date: new Date().toLocaleDateString()
    },
    {
      id: 'hadith-5',
      arabic: 'مَنْ لاَ يَرْحَمُ النَّاسَ لاَ يَرْحَمُهُ اللَّهُ',
      translation: 'He who does not show mercy to people, Allah will not show mercy to him.',
      narrator: 'Jarir ibn Abdullah (RA)',
      source: 'Sahih al-Bukhari',
      reference: 'Book 78, Hadith 27',
      theme: 'Mercy and Compassion',
      commentary: 'Mercy is a divine quality that we should embody. Our treatment of others reflects our relationship with Allah, and mercy begets mercy.',
      date: new Date().toLocaleDateString()
    }
  ];

  useEffect(() => {
    loadTodayHadith();
  }, []);

  const loadTodayHadith = () => {
    const today = new Date();
    const hadithIndex = today.getDate() % dailyHadiths.length;
    setCurrentHadith(dailyHadiths[hadithIndex]);
  };

  const getRandomHadith = () => {
    setIsLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * dailyHadiths.length);
      setCurrentHadith(dailyHadiths[randomIndex]);
      setIsLoading(false);
      toast({
        title: "New Hadith Loaded",
        description: "May this wisdom guide your day",
      });
    }, 1000);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from Bookmarks" : "Added to Bookmarks",
      description: isBookmarked ? "Hadith removed from saved items" : "Hadith saved for later reading",
    });
  };

  const copyHadith = () => {
    if (currentHadith) {
      const text = `${currentHadith.arabic}\n\n"${currentHadith.translation}"\n\nNarrator: ${currentHadith.narrator}\nSource: ${currentHadith.source}\nReference: ${currentHadith.reference}`;
      navigator.clipboard.writeText(text);
      toast({
        title: "Copied to Clipboard",
        description: "Hadith copied successfully!",
      });
    }
  };

  const shareHadith = () => {
    if (currentHadith) {
      const shareText = `Hadith of the Day:\n\n${currentHadith.arabic}\n\n"${currentHadith.translation}"\n\n- ${currentHadith.narrator}\n${currentHadith.source}`;
      
      if (navigator.share) {
        navigator.share({
          title: 'Hadith of the Day',
          text: shareText,
        });
      } else {
        copyHadith();
      }
    }
  };

  if (!currentHadith) {
    return (
      <Card className="animate-pulse">
        <CardContent className="p-6">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            Hadith of the Day
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleBookmark}
              className={isBookmarked ? 'text-red-500' : 'text-gray-400'}
            >
              <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={copyHadith}
              className="text-gray-600"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={shareHadith}
              className="text-gray-600"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={getRandomHadith}
              disabled={isLoading}
              className="text-amber-600"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Theme Badge */}
        <div className="flex justify-center">
          <span className="px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 text-sm font-medium rounded-full">
            {currentHadith.theme}
          </span>
        </div>

        {/* Arabic Text */}
        <div 
          className="text-lg font-arabic text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg leading-relaxed"
          dir="rtl"
          style={{ fontFamily: 'Amiri, Arabic Typesetting, serif' }}
        >
          {currentHadith.arabic}
        </div>

        {/* Translation */}
        <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
          <p className="text-amber-800 dark:text-amber-200 italic font-medium leading-relaxed">
            "{currentHadith.translation}"
          </p>
        </div>

        {/* Source Information */}
        <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">Narrator: </span>
              <span className="text-gray-600 dark:text-gray-400">{currentHadith.narrator}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">Source: </span>
              <span className="text-gray-600 dark:text-gray-400">{currentHadith.source}</span>
            </div>
          </div>
          <div className="text-sm">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Reference: </span>
            <span className="text-gray-600 dark:text-gray-400">{currentHadith.reference}</span>
          </div>
        </div>

        {/* Commentary */}
        <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Reflection:</h4>
          <p className="text-orange-700 dark:text-orange-300 leading-relaxed text-sm">
            {currentHadith.commentary}
          </p>
        </div>

        {/* Date */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          {currentHadith.date}
        </div>
      </CardContent>
    </Card>
  );
};

export default HadithOfTheDay;
