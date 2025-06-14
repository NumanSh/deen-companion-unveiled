
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Search, ThumbsUp, BookOpen, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FiqhQuestion {
  id: string;
  question: string;
  answer: string;
  category: string;
  madhab: string;
  evidence: string[];
  difficulty: 'مبتدئ' | 'متوسط' | 'متقدم';
  likes: number;
  isExpanded?: boolean;
}

const FiqhQASection = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedMadhab, setSelectedMadhab] = useState('الكل');
  const [questions, setQuestions] = useState<FiqhQuestion[]>([
    {
      id: '1',
      question: 'ما حكم الصلاة في المسجد الذي به قبر؟',
      answer: 'الصلاة في المسجد الذي به قبر محل خلاف بين العلماء. والراجح أنه لا يجوز البناء على القبور واتخاذها مساجد، لكن إذا وُجد المسجد أولاً ثم دُفن فيه الميت فالصلاة صحيحة مع الكراهة.',
      category: 'الصلاة',
      madhab: 'عام',
      evidence: [
        'قول النبي ﷺ: "لعن الله اليهود والنصارى اتخذوا قبور أنبيائهم مساجد"',
        'حديث: "ألا وإن من كان قبلكم كانوا يتخذون قبور أنبيائهم وصالحيهم مساجد"'
      ],
      difficulty: 'متوسط',
      likes: 45,
      isExpanded: false
    },
    {
      id: '2',
      question: 'هل يجوز للمرأة السفر بدون محرم للحج؟',
      answer: 'اختلف العلماء في هذه المسألة. الجمهور على أنه لا يجوز للمرأة السفر للحج بدون محرم، والحنفية أجازوا السفر مع النساء الثقات أو الرفقة الآمنة.',
      category: 'الحج والعمرة',
      madhab: 'مختلف فيه',
      evidence: [
        'حديث: "لا تسافر المرأة إلا مع ذي محرم"',
        'قول ابن حزم: "ولا يحل لامرأة أن تسافر إلا مع ذي محرم منها"'
      ],
      difficulty: 'متقدم',
      likes: 67,
      isExpanded: false
    },
    {
      id: '3',
      question: 'ما حكم استخدام الهاتف أثناء خطبة الجمعة؟',
      answer: 'استخدام الهاتف أثناء خطبة الجمعة منهي عنه لأنه يتنافى مع الإنصات المطلوب شرعاً. والواجب على المسلم الإنصات للخطبة وعدم الانشغال بغيرها.',
      category: 'الصلاة',
      madhab: 'إجماع',
      evidence: [
        'قوله تعالى: "وإذا قُرئ القرآن فاستمعوا له وأنصتوا"',
        'حديث: "إذا قلت لصاحبك يوم الجمعة أنصت والإمام يخطب فقد لغوت"'
      ],
      difficulty: 'مبتدئ',
      likes: 123,
      isExpanded: false
    }
  ]);

  const categories = ['الكل', 'الصلاة', 'الزكاة', 'الصيام', 'الحج والعمرة', 'النكاح', 'المعاملات', 'الجنايات'];
  const madhabs = ['الكل', 'حنفي', 'مالكي', 'شافعي', 'حنبلي', 'ظاهري', 'عام', 'مختلف فيه'];

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         q.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || q.category === selectedCategory;
    const matchesMadhab = selectedMadhab === 'الكل' || q.madhab === selectedMadhab;
    return matchesSearch && matchesCategory && matchesMadhab;
  });

  const toggleExpanded = (questionId: string) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId ? { ...q, isExpanded: !q.isExpanded } : q
    ));
  };

  const likeQuestion = (questionId: string) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId ? { ...q, likes: q.likes + 1 } : q
    ));
    toast({
      title: 'تم إعجابك بالسؤال',
      description: 'شكراً لتفاعلك مع المحتوى',
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'مبتدئ': return 'bg-green-100 text-green-800';
      case 'متوسط': return 'bg-yellow-100 text-yellow-800';
      case 'متقدم': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMadhabColor = (madhab: string) => {
    const colors = {
      'حنفي': 'bg-blue-100 text-blue-800',
      'مالكي': 'bg-green-100 text-green-800',
      'شافعي': 'bg-purple-100 text-purple-800',
      'حنبلي': 'bg-orange-100 text-orange-800',
      'ظاهري': 'bg-pink-100 text-pink-800',
      'عام': 'bg-gray-100 text-gray-800',
      'مختلف فيه': 'bg-indigo-100 text-indigo-800',
    };
    return colors[madhab as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-indigo-500" />
          الفقه الإسلامي - أسئلة وأجوبة
        </CardTitle>
        <p className="text-sm text-gray-600">استفسارات فقهية مع أدلتها من الكتاب والسنة</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="ابحث في الأسئلة والأجوبة الفقهية..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-sm border rounded px-3 py-2"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={selectedMadhab}
              onChange={(e) => setSelectedMadhab(e.target.value)}
              className="text-sm border rounded px-3 py-2"
            >
              {madhabs.map(madhab => (
                <option key={madhab} value={madhab}>{madhab}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => (
            <div key={q.id} className="border rounded-lg p-4 bg-white shadow-sm">
              {/* Question Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex flex-wrap gap-2">
                  <Badge className={getDifficultyColor(q.difficulty)}>{q.difficulty}</Badge>
                  <Badge className={getMadhabColor(q.madhab)}>{q.madhab}</Badge>
                  <Badge variant="outline">{q.category}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => likeQuestion(q.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {q.likes}
                  </Button>
                </div>
              </div>

              {/* Question */}
              <h3 className="font-semibold text-lg mb-3 text-right leading-relaxed">
                {q.question}
              </h3>

              {/* Short Answer */}
              <p className="text-gray-700 leading-relaxed text-right mb-3">
                {q.isExpanded ? q.answer : `${q.answer.substring(0, 150)}...`}
              </p>

              {/* Evidence (if expanded) */}
              {q.isExpanded && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    الأدلة:
                  </h4>
                  <ul className="space-y-2">
                    {q.evidence.map((evidence, index) => (
                      <li key={index} className="text-sm text-gray-600 text-right">
                        • {evidence}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Expand Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleExpanded(q.id)}
                className="mt-3 text-indigo-600 hover:text-indigo-800"
              >
                {q.isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-1" />
                    أخفِ التفاصيل
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-1" />
                    اعرض الأدلة والتفاصيل
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="font-semibold mb-2">لا توجد نتائج</h3>
            <p className="text-sm">جرب تعديل البحث أو الفلاتر</p>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-indigo-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-indigo-600">{questions.length}</div>
            <div className="text-xs text-indigo-600">سؤال فقهي</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{categories.length - 1}</div>
            <div className="text-xs text-green-600">أبواب فقهية</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{madhabs.length - 1}</div>
            <div className="text-xs text-purple-600">مذهب فقهي</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FiqhQASection;
