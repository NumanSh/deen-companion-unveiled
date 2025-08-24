
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Brain, Trophy, Star, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

const IslamicKnowledgeQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "How many times is prayer (Salah) mentioned in the Quran?",
      options: ["67 times", "83 times", "99 times", "107 times"],
      correctAnswer: 1,
      explanation: "Prayer (Salah) is mentioned 83 times in the Quran, emphasizing its importance in Islam.",
      category: "Worship"
    },
    {
      id: 2,
      question: "Which Surah is known as the 'Heart of the Quran'?",
      options: ["Al-Fatiha", "Ya-Sin", "Al-Baqarah", "Al-Ikhlas"],
      correctAnswer: 1,
      explanation: "Surah Ya-Sin is often called the 'Heart of the Quran' due to its profound spiritual content.",
      category: "Quran"
    },
    {
      id: 3,
      question: "What is the first pillar of Islam?",
      options: ["Prayer", "Shahada", "Hajj", "Zakat"],
      correctAnswer: 1,
      explanation: "The Shahada (declaration of faith) is the first and most fundamental pillar of Islam.",
      category: "Pillars"
    },
    {
      id: 4,
      question: "In which month was the Quran first revealed?",
      options: ["Muharram", "Rajab", "Ramadan", "Dhul-Hijjah"],
      correctAnswer: 2,
      explanation: "The Quran was first revealed in the month of Ramadan, making it a blessed month.",
      category: "History"
    },
    {
      id: 5,
      question: "How many chapters (Surahs) are in the Quran?",
      options: ["112", "114", "116", "118"],
      correctAnswer: 1,
      explanation: "The Quran contains 114 chapters (Surahs), from Al-Fatiha to An-Nas.",
      category: "Quran"
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
        const finalScore = isCorrect ? score + 1 : score;
        const percentage = (finalScore / questions.length) * 100;
        
        toast({
          title: "Quiz Completed!",
          description: `You scored ${finalScore}/${questions.length} (${percentage.toFixed(0)}%)`,
        });
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return { message: "Excellent! Masha'Allah!", emoji: "🏆", color: "text-yellow-600" };
    if (percentage >= 60) return { message: "Good job! Keep learning!", emoji: "⭐", color: "text-blue-600" };
    if (percentage >= 40) return { message: "Not bad! Study more!", emoji: "📚", color: "text-green-600" };
    return { message: "Keep practicing! You'll improve!", emoji: "💪", color: "text-purple-600" };
  };

  if (quizCompleted) {
    const scoreMessage = getScoreMessage();
    return (
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">{scoreMessage.emoji}</div>
          <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
          <div className={`text-lg font-semibold ${scoreMessage.color} mb-4`}>
            {scoreMessage.message}
          </div>
          <div className="text-3xl font-bold text-indigo-600 mb-6">
            {score}/{questions.length}
          </div>
          <Button onClick={resetQuiz} className="bg-indigo-600 hover:bg-indigo-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-indigo-600" />
          Islamic Knowledge Quiz
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              {score}/{questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <div className="text-xs text-indigo-600 dark:text-indigo-400 mb-2">
            {question.category}
          </div>
          <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-3 text-left rounded-lg border transition-all ${
                  selectedAnswer === index
                    ? 'bg-indigo-100 dark:bg-indigo-900/30 border-indigo-300'
                    : 'bg-gray-50 dark:bg-gray-700 border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                } ${showResult && index === question.correctAnswer ? 'bg-green-100 border-green-300' : ''}
                ${showResult && selectedAnswer === index && index !== question.correctAnswer ? 'bg-red-100 border-red-300' : ''}`}
                disabled={showResult}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                  <span>{option}</span>
                  {showResult && index === question.correctAnswer && (
                    <span className="ml-auto text-green-600">✓</span>
                  )}
                  {showResult && selectedAnswer === index && index !== question.correctAnswer && (
                    <span className="ml-auto text-red-600">✗</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {showResult && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Explanation:</h4>
            <p className="text-blue-700 dark:text-blue-300">{question.explanation}</p>
          </div>
        )}

        <Button
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null || showResult}
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default IslamicKnowledgeQuiz;
