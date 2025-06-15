
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Brain, ChevronRight, RotateCcw, Trophy, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuranicWord {
  id: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  example: string;
  exampleTranslation: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const QuranicWordLearning: React.FC = () => {
  const [currentWord, setCurrentWord] = useState<QuranicWord | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [learnedWords, setLearnedWords] = useState<string[]>([]);
  const [currentCategory, setCurrentCategory] = useState('basic');
  const [streak, setStreak] = useState(0);
  const { toast } = useToast();

  const quranicWords: QuranicWord[] = [
    {
      id: 'word-1',
      arabic: 'اللَّهُ',
      transliteration: 'Allah',
      meaning: 'God, The One and Only',
      example: 'اللَّهُ أَكْبَرُ',
      exampleTranslation: 'Allah is Greatest',
      category: 'basic',
      difficulty: 'beginner'
    },
    {
      id: 'word-2',
      arabic: 'الرَّحْمَٰنُ',
      transliteration: 'Ar-Rahman',
      meaning: 'The Most Merciful',
      example: 'الرَّحْمَٰنُ الرَّحِيمُ',
      exampleTranslation: 'The Most Merciful, The Most Compassionate',
      category: 'attributes',
      difficulty: 'beginner'
    },
    {
      id: 'word-3',
      arabic: 'صَلَاةٌ',
      transliteration: 'Salah',
      meaning: 'Prayer',
      example: 'أَقِيمُوا الصَّلَاةَ',
      exampleTranslation: 'Establish the prayer',
      category: 'worship',
      difficulty: 'beginner'
    },
    {
      id: 'word-4',
      arabic: 'قُرْآنٌ',
      transliteration: 'Quran',
      meaning: 'The Holy Book, Recitation',
      example: 'وَهَٰذَا كِتَابٌ أَنزَلْنَاهُ مُبَارَكٌ',
      exampleTranslation: 'And this is a Book which We have sent down, blessed',
      category: 'scripture',
      difficulty: 'intermediate'
    },
    {
      id: 'word-5',
      arabic: 'تَقْوَىٰ',
      transliteration: 'Taqwa',
      meaning: 'God-consciousness, Piety',
      example: 'وَتَزَوَّدُوا فَإِنَّ خَيْرَ الزَّادِ التَّقْوَىٰ',
      exampleTranslation: 'And take provisions, but indeed, the best provision is Taqwa',
      category: 'spiritual',
      difficulty: 'advanced'
    },
    {
      id: 'word-6',
      arabic: 'سَبِيلٌ',
      transliteration: 'Sabil',
      meaning: 'Path, Way',
      example: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
      exampleTranslation: 'Guide us to the straight path',
      category: 'guidance',
      difficulty: 'intermediate'
    }
  ];

  const categories = [
    { id: 'basic', name: 'Basic Words', icon: '📚' },
    { id: 'attributes', name: 'Divine Attributes', icon: '✨' },
    { id: 'worship', name: 'Worship Terms', icon: '🕌' },
    { id: 'scripture', name: 'Scripture Terms', icon: '📖' },
    { id: 'spiritual', name: 'Spiritual Concepts', icon: '💫' },
    { id: 'guidance', name: 'Guidance & Path', icon: '🛤️' }
  ];

  useEffect(() => {
    loadRandomWord();
  }, [currentCategory]);

  const loadRandomWord = () => {
    const categoryWords = quranicWords.filter(word => word.category === currentCategory);
    if (categoryWords.length > 0) {
      const randomWord = categoryWords[Math.floor(Math.random() * categoryWords.length)];
      setCurrentWord(randomWord);
      setShowAnswer(false);
    }
  };

  const markAsLearned = () => {
    if (currentWord && !learnedWords.includes(currentWord.id)) {
      setLearnedWords([...learnedWords, currentWord.id]);
      setStreak(streak + 1);
      toast({
        title: "Word Learned! 🎉",
        description: `You've learned "${currentWord.transliteration}"`,
      });
    }
    loadRandomWord();
  };

  const playPronunciation = () => {
    // In a real app, you would play audio pronunciation
    toast({
      title: "🔊 Pronunciation",
      description: `Listen to: ${currentWord?.transliteration}`,
    });
  };

  const resetProgress = () => {
    setLearnedWords([]);
    setStreak(0);
    loadRandomWord();
    toast({
      title: "Progress Reset",
      description: "Starting fresh with your word learning journey",
    });
  };

  const progress = (learnedWords.length / quranicWords.length) * 100;

  if (!currentWord) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-green-600" />
            Quranic Word Learning
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full">
              🔥 {streak} streak
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={resetProgress}
              className="text-gray-600"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{learnedWords.length}/{quranicWords.length} words</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Category Selection */}
        <div className="grid grid-cols-3 gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setCurrentCategory(category.id)}
              className={`p-2 rounded-lg text-xs transition-colors ${
                currentCategory === category.id
                  ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200'
                  : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div>{category.icon}</div>
              <div className="mt-1">{category.name}</div>
            </button>
          ))}
        </div>

        {/* Word Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center space-y-4">
          {/* Difficulty Badge */}
          <div className="flex justify-center">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              currentWord.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
              currentWord.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {currentWord.difficulty}
            </span>
          </div>

          {/* Arabic Word */}
          <div 
            className="text-4xl font-arabic mb-4"
            dir="rtl"
            style={{ fontFamily: 'Amiri, Arabic Typesetting, serif' }}
          >
            {currentWord.arabic}
          </div>

          {/* Pronunciation Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={playPronunciation}
            className="flex items-center gap-2"
          >
            <Volume2 className="w-4 h-4" />
            {currentWord.transliteration}
          </Button>

          {/* Show/Hide Answer */}
          {!showAnswer ? (
            <Button
              onClick={() => setShowAnswer(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              Show Meaning
            </Button>
          ) : (
            <div className="space-y-4">
              {/* Meaning */}
              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Meaning:</h4>
                <p className="text-green-700 dark:text-green-300">{currentWord.meaning}</p>
              </div>

              {/* Example */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Example:</h4>
                <div 
                  className="text-lg font-arabic mb-2" 
                  dir="rtl"
                  style={{ fontFamily: 'Amiri, Arabic Typesetting, serif' }}
                >
                  {currentWord.example}
                </div>
                <p className="text-blue-700 dark:text-blue-300 italic">
                  "{currentWord.exampleTranslation}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={markAsLearned}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  <Trophy className="w-4 h-4" />
                  I Know This
                </Button>
                <Button
                  onClick={loadRandomWord}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ChevronRight className="w-4 h-4" />
                  Next Word
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{learnedWords.length}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Words Learned</div>
          </div>
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{streak}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Current Streak</div>
          </div>
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{Math.round(progress)}%</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Progress</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuranicWordLearning;
