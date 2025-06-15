
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ReflectionData } from '@/types/reflection';
import ReflectionHeader from './reflection/ReflectionHeader';
import VerseDisplay from './reflection/VerseDisplay';
import ReflectionContent from './reflection/ReflectionContent';

const IslamicDailyReflection: React.FC = () => {
  const [currentReflection, setCurrentReflection] = useState<ReflectionData | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const reflections: ReflectionData[] = [
    {
      id: 'reflection-1',
      verse: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا',
      translation: 'And whoever fears Allah - He will make for him a way out',
      surah: 'At-Talaq',
      ayah: 2,
      reflection: 'When we place our trust in Allah and strive to follow His guidance, He opens doors we never imagined possible. Every difficulty carries within it the seed of ease, and every closed door leads to a better one opening.',
      theme: 'Trust in Allah',
      date: new Date().toLocaleDateString()
    },
    {
      id: 'reflection-2',
      verse: 'وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ',
      translation: 'And do not despair of the mercy of Allah',
      surah: 'Yusuf',
      ayah: 87,
      reflection: 'Hope is the light that guides us through the darkest moments. Allah\'s mercy is infinite and His wisdom perfect. Even when we cannot see the way forward, His plan for us continues to unfold with perfect timing.',
      theme: 'Hope and Mercy',
      date: new Date().toLocaleDateString()
    },
    {
      id: 'reflection-3',
      verse: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
      translation: 'Indeed, with hardship comes ease',
      surah: 'Ash-Sharh',
      ayah: 6,
      reflection: 'This verse reminds us that difficulty and ease are paired by divine design. Every challenge we face is an opportunity for growth, and every struggle strengthens our character and deepens our faith.',
      theme: 'Patience and Perseverance',
      date: new Date().toLocaleDateString()
    }
  ];

  useEffect(() => {
    loadTodayReflection();
  }, []);

  const loadTodayReflection = () => {
    const today = new Date().getDate();
    const reflectionIndex = today % reflections.length;
    setCurrentReflection(reflections[reflectionIndex]);
  };

  const getNewReflection = () => {
    setIsLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * reflections.length);
      setCurrentReflection(reflections[randomIndex]);
      setIsLoading(false);
      toast({
        title: "New Reflection Loaded",
        description: "May this reflection bring you peace and guidance.",
      });
    }, 1000);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from Bookmarks" : "Added to Bookmarks",
      description: isBookmarked ? "Reflection removed from your saved items" : "Reflection saved for later reading",
    });
  };

  const shareReflection = () => {
    if (currentReflection) {
      const shareText = `${currentReflection.verse}\n\n"${currentReflection.translation}"\n\n${currentReflection.reflection}\n\n- ${currentReflection.surah} ${currentReflection.ayah}`;
      
      if (navigator.share) {
        navigator.share({
          title: 'Daily Islamic Reflection',
          text: shareText,
        });
      } else {
        navigator.clipboard.writeText(shareText);
        toast({
          title: "Copied to Clipboard",
          description: "Reflection copied successfully!",
        });
      }
    }
  };

  if (!currentReflection) {
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
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
      <CardHeader>
        <CardTitle>
          <ReflectionHeader
            isBookmarked={isBookmarked}
            isLoading={isLoading}
            onToggleBookmark={toggleBookmark}
            onShare={shareReflection}
            onRefresh={getNewReflection}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <VerseDisplay
          verse={currentReflection.verse}
          translation={currentReflection.translation}
          surah={currentReflection.surah}
          ayah={currentReflection.ayah}
          theme={currentReflection.theme}
        />
        <ReflectionContent
          reflection={currentReflection.reflection}
          date={currentReflection.date}
        />
      </CardContent>
    </Card>
  );
};

export default IslamicDailyReflection;
