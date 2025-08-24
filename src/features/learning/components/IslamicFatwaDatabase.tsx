
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookMarked, Search, Filter, Eye, ThumbsUp, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Fatwa {
  id: string;
  question: string;
  answer: string;
  scholar: string;
  category: string;
  date: string;
  views: number;
  likes: number;
  tags: string[];
  difficulty: 'مبتدئ' | 'متوسط' | 'متقدم';
  source: string;
}

const IslamicFatwaDatabase = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [fatwas] = useState<Fatwa[]>([
    {
      id: '1',
      question: 'ما حكم الصلاة بالحذاء في المسجد؟',
      answer: 'الأصل في الصلاة بالحذاء الجواز، بشرط أن يكون الحذاء طاهراً. وقد ثبت في السنة أن النبي صلى الله عليه وسلم كان يصلي أحياناً بنعليه. ولكن في المساجد المفروشة، يُستحب خلع الحذاء مراعاة لنظافة المسجد واحتراماً للمكان.',
      scholar: 'الشيخ ابن باز',
      category: 'الصلاة',
      date: '2024-01-15',
      views: 1250,
      likes: 89,
      tags: ['الصلاة', 'الطهارة', 'المسجد'],
      difficulty: 'مبتدئ',
      source: 'فتاوى اللجنة الدائمة'
    },
    {
      id: '2',
      question: 'هل يجوز للمرأة أن تؤم النساء في الصلاة؟',
      answer: 'نعم، يجوز للمرأة أن تؤم النساء في الصلاة، وهذا مذهب جمهور العلماء. وتقف الإمامة وسط الصف وليس أمامهن كما يفعل الرجال. وقد ثبت أن عائشة رضي الله عنها كانت تؤم النساء في بيتها.',
      scholar: 'الشيخ ابن عثيمين',
      category: 'الصلاة',
      date: '2024-01-10',
      views: 980,
      likes: 76,
      tags: ['الصلاة', 'المرأة', 'الإمامة'],
      difficulty: 'متوسط',
      source: 'فتاوى نور على الدرب'
    },
    {
      id: '3',
      question: 'ما حكم التداوي بالمحرمات؟',
      answer: 'الأصل تحريم التداوي بالمحرمات، لقول النبي صلى الله عليه وسلم: "إن الله لم يجعل شفاءكم فيما حرم عليكم". ولكن في حالات الضرورة القصوى، وعدم وجود البديل المباح، وتحقق غلبة الظن بالشفاء، قد يُباح التداوي بالمحرم عند بعض العلماء.',
      scholar: 'الشيخ صالح الفوزان',
      category: 'الطب والعلاج',
      date: '2024-01-05',
      views: 1540,
      likes: 112,
      tags: ['التداوي', 'الطب', 'الضرورة'],
      difficulty: 'متقدم',
      source: 'فتاوى الشيخ صالح الفوزان'
    },
    {
      id: '4',
      question: 'ما هو الحكم الشرعي للتجارة الإلكترونية؟',
      answer: 'التجارة الإلكترونية جائزة شرعاً بالضوابط الآتية: وضوح السلعة ووصفها، تحديد الثمن، عدم الغرر الفاحش، وأن تكون السلعة مباحة. ويجب تجنب الربا والغش والخداع. والبيع عبر الإنترنت له حكم البيع العادي.',
      scholar: 'الشيخ عبد الله المطلق',
      category: 'المعاملات المالية',
      date: '2024-01-12',
      views: 2100,
      likes: 156,
      tags: ['التجارة', 'الإنترنت', 'المعاملات'],
      difficulty: 'متوسط',
      source: 'فتاوى معاصرة'
    }
  ]);

  const categories = ['الكل', 'الصلاة', 'الزكاة', 'الصيام', 'الحج', 'المعاملات المالية', 'الطب والعلاج', 'الأسرة', 'المرأة'];

  const filteredFatwas = fatwas.filter(fatwa => {
    const matchesSearch = fatwa.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         fatwa.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         fatwa.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'الكل' || fatwa.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'مبتدئ': return 'bg-green-100 text-green-800';
      case 'متوسط': return 'bg-yellow-100 text-yellow-800';
      case 'متقدم': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const likeFatwa = (fatwaId: string) => {
    toast({
      title: 'شكراً لك',
      description: 'تم تسجيل إعجابك بهذه الفتوى',
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookMarked className="w-6 h-6 text-purple-500" />
          قاعدة بيانات الفتاوى الإسلامية
        </CardTitle>
        <p className="text-sm text-gray-600">فتاوى معتمدة من علماء موثوقين في جميع أبواب الفقه</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="ابحث في الفتاوى، الأسئلة، أو الكلمات المفتاحية..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                size="sm"
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="text-xs"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Fatwas List */}
        <div className="space-y-4">
          {filteredFatwas.map((fatwa) => (
            <div key={fatwa.id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
              {/* Fatwa Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-right leading-relaxed mb-2">
                    {fatwa.question}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{fatwa.category}</Badge>
                    <Badge className={getDifficultyColor(fatwa.difficulty)}>{fatwa.difficulty}</Badge>
                    <Badge variant="secondary" className="text-xs">{fatwa.scholar}</Badge>
                  </div>
                </div>
              </div>

              {/* Answer */}
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 leading-relaxed text-right">
                  {fatwa.answer}
                </p>
                <div className="mt-2 text-sm text-gray-500 text-right">
                  المصدر: {fatwa.source}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {fatwa.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Stats and Actions */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {fatwa.views.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    {fatwa.likes}
                  </span>
                  <span>{fatwa.date}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => likeFatwa(fatwa.id)}
                    className="text-xs"
                  >
                    <ThumbsUp className="w-3 h-3 mr-1" />
                    مفيد
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    <MessageCircle className="w-3 h-3 mr-1" />
                    سؤال متعلق
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFatwas.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <BookMarked className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="font-semibold mb-2">لا توجد فتاوى مطابقة</h3>
            <p className="text-sm">جرب تعديل البحث أو الفلاتر</p>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-4 gap-4 p-4 bg-purple-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{fatwas.length}</div>
            <div className="text-xs text-purple-600">فتوى متاحة</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{categories.length - 1}</div>
            <div className="text-xs text-blue-600">قسم فقهي</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">15</div>
            <div className="text-xs text-green-600">عالم معتمد</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-600">
              {fatwas.reduce((sum, f) => sum + f.views, 0).toLocaleString()}
            </div>
            <div className="text-xs text-orange-600">مشاهدة</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicFatwaDatabase;
