
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, MessageCircle, BookOpen, Star, RefreshCw, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HadithData {
  id: number;
  arabic: string;
  translation: string;
  narrator: string;
  source: string;
  theme: string;
  explanation: string;
  modernApplication: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

const AIHadithCompanion = () => {
  const { toast } = useToast();
  
  const [currentHadith, setCurrentHadith] = useState<HadithData>({
    id: 1,
    arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
    translation: "إنما الأعمال بالنيات وإنما لكل امرئ ما نوى",
    narrator: "عمر بن الخطاب رضي الله عنه",
    source: "صحيح البخاري",
    theme: "النية والإخلاص",
    explanation: "هذا الحديث يعلمنا أن قيمة العمل تكمن في النية الصادقة وراءه",
    modernApplication: "في عصرنا الحالي، هذا يعني أن نخلص النية في جميع أعمالنا اليومية",
    difficulty: 'beginner',
    tags: ['النية', 'الإخلاص', 'العبادة']
  });

  const [showExplanation, setShowExplanation] = useState(false);
  const [userProgress, setUserProgress] = useState({
    studiedToday: 3,
    totalStudied: 47,
    currentStreak: 12
  });

  const hadithDatabase: HadithData[] = [
    {
      id: 1,
      arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
      translation: "إنما الأعمال بالنيات وإنما لكل امرئ ما نوى",
      narrator: "عمر بن الخطاب رضي الله عنه",
      source: "صحيح البخاري",
      theme: "النية والإخلاص",
      explanation: "هذا الحديث يعلمنا أن قيمة العمل تكمن في النية الصادقة وراءه",
      modernApplication: "في عصرنا الحالي، هذا يعني أن نخلص النية في جميع أعمالنا اليومية",
      difficulty: 'beginner',
      tags: ['النية', 'الإخلاص', 'العبادة']
    },
    {
      id: 2,
      arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
      translation: "من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت",
      narrator: "أبو هريرة رضي الله عنه",
      source: "صحيح البخاري",
      theme: "آداب الكلام",
      explanation: "الحديث يرشدنا إلى أهمية اختيار الكلمات الطيبة أو الصمت",
      modernApplication: "في عصر وسائل التواصل، هذا يذكرنا بأهمية التفكير قبل النشر أو التعليق",
      difficulty: 'intermediate',
      tags: ['الكلام', 'الآداب', 'الصمت']
    }
  ];

  const getRandomHadith = () => {
    const randomIndex = Math.floor(Math.random() * hadithDatabase.length);
    setCurrentHadith(hadithDatabase[randomIndex]);
    setShowExplanation(false);
  };

  const markAsStudied = () => {
    setUserProgress(prev => ({
      ...prev,
      studiedToday: prev.studiedToday + 1,
      totalStudied: prev.totalStudied + 1
    }));
    
    toast({
      title: '🎉 أحسنت!',
      description: 'تم تسجيل دراسة الحديث في تقدمك اليومي',
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'مبتدئ';
      case 'intermediate': return 'متوسط';
      case 'advanced': return 'متقدم';
      default: return 'عام';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-500" />
          مرافق الأحاديث الذكي
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">{userProgress.studiedToday}</div>
              <div className="text-sm text-purple-600">اليوم</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-600">{userProgress.totalStudied}</div>
              <div className="text-sm text-pink-600">المجموع</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-600">{userProgress.currentStreak}</div>
              <div className="text-sm text-indigo-600">متتالية</div>
            </div>
          </div>
        </div>

        {/* Hadith Card */}
        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          {/* Hadith Header */}
          <div className="flex items-center justify-between mb-4">
            <Badge className={getDifficultyColor(currentHadith.difficulty)}>
              {getDifficultyLabel(currentHadith.difficulty)}
            </Badge>
            <Badge variant="outline" className="border-blue-300 text-blue-700">
              {currentHadith.theme}
            </Badge>
          </div>

          {/* Arabic Text */}
          <div className="text-center mb-4">
            <div className="text-xl leading-relaxed font-arabic text-blue-900 mb-3">
              {currentHadith.arabic}
            </div>
          </div>

          {/* Translation */}
          <div className="text-center mb-4 p-3 bg-white/50 rounded">
            <p className="text-blue-800 leading-relaxed">{currentHadith.translation}</p>
          </div>

          {/* Narrator and Source */}
          <div className="text-center mb-4 text-sm text-blue-600">
            <div>رواه: {currentHadith.narrator}</div>
            <div>المصدر: {currentHadith.source}</div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {currentHadith.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* AI Explanation */}
        {showExplanation && (
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 animate-fade-in">
            <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              الشرح التفصيلي
            </h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-yellow-700 mb-1">المعنى:</h5>
                <p className="text-yellow-700 text-sm leading-relaxed">{currentHadith.explanation}</p>
              </div>
              <div>
                <h5 className="font-medium text-yellow-700 mb-1">التطبيق المعاصر:</h5>
                <p className="text-yellow-700 text-sm leading-relaxed">{currentHadith.modernApplication}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => setShowExplanation(!showExplanation)}
            variant="outline"
            className="border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            {showExplanation ? 'إخفاء الشرح' : 'اعرض الشرح'}
          </Button>
          
          <Button
            onClick={markAsStudied}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <Star className="w-4 h-4 mr-2" />
            تم الدراسة
          </Button>
          
          <Button
            onClick={getRandomHadith}
            variant="outline"
            className="border-purple-300 text-purple-700 hover:bg-purple-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            حديث جديد
          </Button>
        </div>

        {/* Daily Tip */}
        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-green-600" />
            <span className="font-medium text-green-800">نصيحة اليوم</span>
          </div>
          <p className="text-green-700 text-sm">
            حاول تطبيق معنى الحديث في حياتك اليومية لتحصل على الأجر والبركة
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIHadithCompanion;
