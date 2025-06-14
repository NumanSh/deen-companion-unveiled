
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, BookOpen, Sparkles, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QuranVerseMoodMatcher = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [currentVerse, setCurrentVerse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const moods = [
    { id: 'grateful', label: 'Grateful', emoji: '🙏', color: 'bg-green-100 text-green-800 border-green-200' },
    { id: 'anxious', label: 'Anxious', emoji: '😰', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { id: 'sad', label: 'Sad', emoji: '😢', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { id: 'hopeful', label: 'Hopeful', emoji: '🌟', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { id: 'confused', label: 'Seeking Guidance', emoji: '🤔', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
    { id: 'peaceful', label: 'Peaceful', emoji: '☮️', color: 'bg-teal-100 text-teal-800 border-teal-200' },
    { id: 'struggling', label: 'Struggling', emoji: '💪', color: 'bg-orange-100 text-orange-800 border-orange-200' },
    { id: 'lonely', label: 'Lonely', emoji: '😔', color: 'bg-gray-100 text-gray-800 border-gray-200' }
  ];

  const versesByMood = {
    grateful: [
      {
        arabic: "وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
        transliteration: "Wa idh ta'adhdhana rabbukum la'in shakartum la'azeedannakum",
        translation: "And [remember] when your Lord proclaimed, 'If you are grateful, I will certainly give you more.'",
        reference: "Surah Ibrahim 14:7"
      }
    ],
    anxious: [
      {
        arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
        transliteration: "Wa man yatawakkal 'ala Allah fahuwa hasbuh",
        translation: "And whoever relies upon Allah - then He is sufficient for him.",
        reference: "Surah At-Talaq 65:3"
      }
    ],
    sad: [
      {
        arabic: "وَبَشِّرِ الصَّابِرِينَ",
        transliteration: "Wa bashshir as-sabireen",
        translation: "And give good tidings to the patient, Who, when disaster strikes them, say, 'Indeed we belong to Allah, and indeed to Him we will return.'",
        reference: "Surah Al-Baqarah 2:155-156"
      }
    ],
    hopeful: [
      {
        arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
        transliteration: "Wa man yattaqi Allah yaj'al lahu makhrajan",
        translation: "And whoever fears Allah - He will make for him a way out.",
        reference: "Surah At-Talaq 65:2"
      }
    ],
    confused: [
      {
        arabic: "وَاللَّهُ يَهْدِي مَن يَشَاءُ إِلَىٰ صِرَاطٍ مُّسْتَقِيمٍ",
        transliteration: "Wallahu yahdee man yasha'u ila siratin mustaqeem",
        translation: "And Allah guides whom He wills to a straight path.",
        reference: "Surah Al-Baqarah 2:213"
      }
    ],
    peaceful: [
      {
        arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
        transliteration: "Ala bidhikri Allahi tatma'innu al-quloob",
        translation: "Unquestionably, by the remembrance of Allah hearts are assured.",
        reference: "Surah Ar-Ra'd 13:28"
      }
    ],
    struggling: [
      {
        arabic: "وَمَن جَاهَدَ فَإِنَّمَا يُجَاهِدُ لِنَفْسِهِ",
        transliteration: "Wa man jahada fa'innama yujahidu linafsihi",
        translation: "And whoever strives only strives for [the benefit of] himself.",
        reference: "Surah Al-Ankabut 29:6"
      }
    ],
    lonely: [
      {
        arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
        transliteration: "Wa huwa ma'akum ayna ma kuntum",
        translation: "And He is with you wherever you are.",
        reference: "Surah Al-Hadid 57:4"
      }
    ]
  };

  const findVerse = async () => {
    if (!selectedMood) {
      toast({
        title: "Please select your mood",
        description: "Choose how you're feeling to get a relevant verse.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const verses = versesByMood[selectedMood as keyof typeof versesByMood] || [];
    const randomVerse = verses[Math.floor(Math.random() * verses.length)];
    
    setCurrentVerse(randomVerse);
    setIsLoading(false);

    toast({
      title: "Verse Found",
      description: "May this verse bring comfort to your heart.",
    });
  };

  const getMoodStyle = (moodId: string) => {
    const mood = moods.find(m => m.id === moodId);
    return mood?.color || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <Card className="bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-950 dark:to-indigo-950 border-sky-200 dark:border-sky-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <Heart className="w-6 h-6 text-sky-600 dark:text-sky-400" />
            <Sparkles className="w-3 h-3 text-pink-500 absolute -top-1 -right-1" />
          </div>
          <span className="bg-gradient-to-r from-sky-700 to-indigo-700 dark:from-sky-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Quran Verse Mood Matcher
          </span>
        </CardTitle>
        <p className="text-sm text-sky-700 dark:text-sky-300">
          Find Quranic verses that speak to your current emotional state
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-sky-700 dark:text-sky-300 mb-3">How are you feeling today?</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {moods.map((mood) => (
              <Button
                key={mood.id}
                variant={selectedMood === mood.id ? "default" : "outline"}
                onClick={() => setSelectedMood(mood.id)}
                className={`h-auto p-3 text-left justify-start ${
                  selectedMood === mood.id 
                    ? 'bg-sky-600 text-white border-sky-600' 
                    : 'hover:bg-sky-50 dark:hover:bg-sky-950'
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-lg">{mood.emoji}</span>
                  <span className="text-xs">{mood.label}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <Button 
          onClick={findVerse} 
          disabled={isLoading || !selectedMood}
          className="w-full bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Finding Perfect Verse...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Find My Verse
            </div>
          )}
        </Button>

        {currentVerse && (
          <div className="bg-white/70 dark:bg-gray-800/70 p-6 rounded-lg border border-sky-200 dark:border-sky-700 space-y-4">
            <div className="flex items-center justify-between">
              <Badge className={getMoodStyle(selectedMood)}>
                {moods.find(m => m.id === selectedMood)?.emoji} {moods.find(m => m.id === selectedMood)?.label}
              </Badge>
              <Button
                onClick={findVerse}
                size="sm"
                variant="outline"
                className="text-sky-600 border-sky-300"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                New Verse
              </Button>
            </div>

            <div className="space-y-3">
              <div className="text-2xl font-arabic text-right text-sky-800 dark:text-sky-200 leading-relaxed">
                {currentVerse.arabic}
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400 italic">
                {currentVerse.transliteration}
              </div>
              
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                "{currentVerse.translation}"
              </div>
              
              <div className="text-sm text-sky-600 dark:text-sky-400 font-medium">
                — {currentVerse.reference}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuranVerseMoodMatcher;
