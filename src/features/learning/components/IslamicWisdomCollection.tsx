
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, RefreshCw, Heart, Share2, BookOpen, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WisdomItem {
  id: string;
  text: string;
  source: string;
  category: string;
  author: string;
  type: 'حديث' | 'آية' | 'حكمة' | 'دعاء';
  tags: string[];
  liked: boolean;
  difficulty: 'بسيط' | 'متوسط' | 'عميق';
}

const IslamicWisdomCollection = () => {
  const { toast } = useToast();
  const [currentWisdom, setCurrentWisdom] = useState<WisdomItem | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const wisdomCollection: WisdomItem[] = [
    {
      id: '1',
      text: 'من طلب العلا سهر الليالي',
      source: 'الحكم والأمثال',
      category: 'التعليم والنمو',
      author: 'المثل العربي',
      type: 'حكمة',
      tags: ['العلم', 'الصبر', 'النجاح'],
      liked: false,
      difficulty: 'بسيط'
    },
    {
      id: '2',
      text: 'واتقوا الله ويعلمكم الله',
      source: 'سورة البقرة',
      category: 'التقوى والإيمان',
      author: 'القرآن الكريم',
      type: 'آية',
      tags: ['التقوى', 'العلم', 'الإيمان'],
      liked: false,
      difficulty: 'متوسط'
    },
    {
      id: '3',
      text: 'إذا مات الإنسان انقطع عمله إلا من ثلاث: صدقة جارية، أو علم ينتفع به، أو ولد صالح يدعو له',
      source: 'صحيح مسلم',
      category: 'الأعمال الصالحة',
      author: 'النبي محمد ﷺ',
      type: 'حديث',
      tags: ['الصدقة', 'العلم', 'التربية'],
      liked: false,
      difficulty: 'عميق'
    },
    {
      id: '4',
      text: 'اللهم أعني على ذكرك وشكرك وحسن عبادتك',
      source: 'سنن أبي داود',
      category: 'الأذكار والأدعية',
      author: 'النبي محمد ﷺ',
      type: 'دعاء',
      tags: ['الذكر', 'الشكر', 'العبادة'],
      liked: false,
      difficulty: 'بسيط'
    },
    {
      id: '5',
      text: 'الصبر مفتاح الفرج، والدعاء مفتاح الرحمة',
      source: 'أقوال السلف',
      category: 'الصبر والدعاء',
      author: 'علماء السلف',
      type: 'حكمة',
      tags: ['الصبر', 'الدعاء', 'الرحمة'],
      liked: false,
      difficulty: 'متوسط'
    }
  ];

  const categories = [
    'الكل', 'التعليم والنمو', 'التقوى والإيمان', 'الأعمال الصالحة', 
    'الأذكار والأدعية', 'الصبر والدعاء', 'الأخلاق والآداب'
  ];

  const getRandomWisdom = () => {
    const filtered = selectedCategory === 'الكل' 
      ? wisdomCollection 
      : wisdomCollection.filter(w => w.category === selectedCategory);
    
    const randomIndex = Math.floor(Math.random() * filtered.length);
    const wisdom = { ...filtered[randomIndex] };
    wisdom.liked = favorites.includes(wisdom.id);
    setCurrentWisdom(wisdom);
  };

  useEffect(() => {
    getRandomWisdom();
  }, [selectedCategory]);

  const toggleFavorite = () => {
    if (!currentWisdom) return;
    
    const newFavorites = favorites.includes(currentWisdom.id)
      ? favorites.filter(id => id !== currentWisdom.id)
      : [...favorites, currentWisdom.id];
    
    setFavorites(newFavorites);
    setCurrentWisdom({ ...currentWisdom, liked: !currentWisdom.liked });
    
    toast({
      title: currentWisdom.liked ? 'تمت إزالة الحكمة من المفضلة' : 'تم إضافة الحكمة للمفضلة',
      description: 'يمكنك مراجعة المفضلة في أي وقت',
    });
  };

  const shareWisdom = () => {
    if (!currentWisdom) return;
    
    const text = `"${currentWisdom.text}"\n\nالمصدر: ${currentWisdom.source}`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      toast({
        title: 'تم النسخ',
        description: 'تم نسخ الحكمة إلى الحافظة',
      });
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'حديث': 'bg-green-100 text-green-800',
      'آية': 'bg-blue-100 text-blue-800',
      'حكمة': 'bg-purple-100 text-purple-800',
      'دعاء': 'bg-orange-100 text-orange-800',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'بسيط': 'bg-green-50 border-green-200 text-green-700',
      'متوسط': 'bg-yellow-50 border-yellow-200 text-yellow-700',
      'عميق': 'bg-red-50 border-red-200 text-red-700',
    };
    return colors[difficulty as keyof typeof colors] || 'bg-gray-50 border-gray-200 text-gray-700';
  };

  if (!currentWisdom) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          كنز الحكمة الإسلامية
        </CardTitle>
        <p className="text-sm text-gray-600">استلهم من خزانة الحكمة الإسلامية يومياً</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-xs"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Wisdom Card */}
        <div className={`relative p-6 rounded-lg border-2 ${getDifficultyColor(currentWisdom.difficulty)}`}>
          {/* Type and Difficulty Badges */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-2">
              <Badge className={getTypeColor(currentWisdom.type)}>{currentWisdom.type}</Badge>
              <Badge variant="outline" className="text-xs">{currentWisdom.difficulty}</Badge>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current text-yellow-400" />
              <span className="text-sm text-gray-600">{Math.floor(Math.random() * 5) + 1}</span>
            </div>
          </div>
          
          {/* Wisdom Text */}
          <blockquote className="text-xl leading-relaxed text-gray-800 mb-4 font-medium text-right">
            "{currentWisdom.text}"
          </blockquote>
          
          {/* Source and Author */}
          <div className="flex items-center gap-3 p-3 bg-white/70 rounded-lg mb-4">
            <BookOpen className="w-5 h-5 text-gray-500" />
            <div className="flex-1 text-right">
              <p className="font-medium text-gray-900">{currentWisdom.source}</p>
              <p className="text-sm text-gray-600">{currentWisdom.author}</p>
            </div>
          </div>

          {/* Category */}
          <div className="mb-4">
            <Badge variant="secondary" className="text-xs">
              {currentWisdom.category}
            </Badge>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {currentWisdom.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3">
          <Button
            onClick={toggleFavorite}
            variant={currentWisdom.liked ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <Heart className={`w-4 h-4 ${currentWisdom.liked ? 'fill-current' : ''}`} />
            {currentWisdom.liked ? 'في المفضلة' : 'أضف للمفضلة'}
          </Button>
          
          <Button
            onClick={shareWisdom}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            مشاركة
          </Button>
          
          <Button
            onClick={getRandomWisdom}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            حكمة جديدة
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-4 gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-600">{wisdomCollection.length}</div>
            <div className="text-xs text-yellow-600">حكمة ونصيحة</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              {wisdomCollection.filter(w => w.type === 'حديث').length}
            </div>
            <div className="text-xs text-green-600">أحاديث نبوية</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {wisdomCollection.filter(w => w.type === 'آية').length}
            </div>
            <div className="text-xs text-blue-600">آيات قرآنية</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{favorites.length}</div>
            <div className="text-xs text-purple-600">المفضلة</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicWisdomCollection;
