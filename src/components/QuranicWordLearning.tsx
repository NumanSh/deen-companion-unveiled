
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Book, Volume2, Star, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WordCard {
  arabic: string;
  transliteration: string;
  meaning: string;
  example: string;
  learned: boolean;
}

const QuranicWordLearning: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [learnedWords, setLearnedWords] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  const words: WordCard[] = [
    {
      arabic: 'رَبّ',
      transliteration: 'Rabb',
      meaning: 'Lord, Master, Sustainer',
      example: 'رَبِّ الْعَالَمِينَ - Lord of all worlds',
      learned: false
    },
    {
      arabic: 'رَحْمَن',
      transliteration: 'Rahman',
      meaning: 'The Most Gracious',
      example: 'الرَّحْمَٰنِ الرَّحِيمِ - The Most Gracious, Most Merciful',
      learned: false
    },
    {
      arabic: 'صَلاة',
      transliteration: 'Salah',
      meaning: 'Prayer',
      example: 'أَقِيمُوا الصَّلَاةَ - Establish prayer',
      learned: false
    },
    {
      arabic: 'زَكاة',
      transliteration: 'Zakah',
      meaning: 'Obligatory charity',
      example: 'آتُوا الزَّكَاةَ - Give zakah',
      learned: false
    },
    {
      arabic: 'حَمْد',
      transliteration: 'Hamd',
      meaning: 'Praise',
      example: 'الْحَمْدُ لِلَّهِ - Praise be to Allah',
      learned: false
    }
  ];

  const currentWord = words[currentWordIndex];
  const progress = (learnedWords.size / words.length) * 100;

  const markAsLearned = () => {
    setLearnedWords(prev => new Set([...prev, currentWordIndex]));
    toast({
      title: "Word Learned! 🎉",
      description: `You've learned "${currentWord.transliteration}" - ${currentWord.meaning}`,
    });
  };

  const nextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setShowMeaning(false);
    }
  };

  const previousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setShowMeaning(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="w-5 h-5 text-purple-600" />
          Quranic Word Learning
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress: {learnedWords.size}/{words.length} words</span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Word Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-purple-200 dark:border-purple-700">
          <div className="text-center space-y-4">
            <div className="text-5xl font-arabic text-purple-800 dark:text-purple-200" dir="rtl">
              {currentWord.arabic}
            </div>
            <div className="text-lg text-purple-600 dark:text-purple-400">
              {currentWord.transliteration}
            </div>
            
            {showMeaning && (
              <div className="space-y-3 pt-4 border-t">
                <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {currentWord.meaning}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded">
                  <strong>Example:</strong> {currentWord.example}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3">
          {!showMeaning ? (
            <Button 
              onClick={() => setShowMeaning(true)}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Reveal Meaning
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={markAsLearned}
                disabled={learnedWords.has(currentWordIndex)}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {learnedWords.has(currentWordIndex) ? '✅ Learned' : 'Mark as Learned'}
              </Button>
              <Button variant="outline" size="icon">
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
          )}
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={previousWord}
              disabled={currentWordIndex === 0}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-500 self-center">
              {currentWordIndex + 1} of {words.length}
            </span>
            <Button 
              variant="outline" 
              onClick={nextWord}
              disabled={currentWordIndex === words.length - 1}
            >
              Next
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded">
            <div className="font-semibold">{learnedWords.size}</div>
            <div className="text-xs">Learned</div>
          </div>
          <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded">
            <div className="font-semibold">{words.length - learnedWords.size}</div>
            <div className="text-xs">Remaining</div>
          </div>
          <div className="bg-green-100 dark:bg-green-800 p-2 rounded">
            <div className="font-semibold">{Math.round(progress)}%</div>
            <div className="text-xs">Complete</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuranicWordLearning;
