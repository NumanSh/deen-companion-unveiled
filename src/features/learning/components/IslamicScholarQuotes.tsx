
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Quote, RefreshCw, Heart, Share2, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ScholarQuote {
  id: string;
  text: string;
  scholar: string;
  era: string;
  source?: string;
  category: string;
  liked: boolean;
}

const IslamicScholarQuotes = () => {
  const { toast } = useToast();
  const [currentQuote, setCurrentQuote] = useState<ScholarQuote | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const scholarQuotes: ScholarQuote[] = [
    {
      id: '1',
      text: 'العلم خير من المال، العلم يحرسك وأنت تحرس المال',
      scholar: 'الإمام علي بن أبي طالب',
      era: 'الصحابة',
      category: 'العلم والتعلم',
      liked: false
    },
    {
      id: '2',
      text: 'من أراد الدنيا فعليه بالعلم، ومن أراد الآخرة فعليه بالعلم، ومن أرادهما معاً فعليه بالعلم',
      scholar: 'الإمام الشافعي',
      era: 'التابعين',
      category: 'العلم والتعلم',
      liked: false
    },
    {
      id: '3',
      text: 'اطلبوا العلم من المهد إلى اللحد',
      scholar: 'الإمام الغزالي',
      era: 'العصر الذهبي',
      category: 'العلم والتعلم',
      liked: false
    },
    {
      id: '4',
      text: 'الصبر مفتاح الفرج',
      scholar: 'ابن تيمية',
      era: 'العصر المتوسط',
      category: 'الصبر والتحمل',
      liked: false
    },
    {
      id: '5',
      text: 'القلوب آنية الله في أرضه، فأحبها إليه أرقها وأصلبها وأصفاها',
      scholar: 'الإمام ابن القيم',
      era: 'العصر المتوسط',
      category: 'تزكية النفس',
      liked: false
    }
  ];

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * scholarQuotes.length);
    const quote = { ...scholarQuotes[randomIndex] };
    quote.liked = favorites.includes(quote.id);
    setCurrentQuote(quote);
  };

  useEffect(() => {
    getRandomQuote();
  }, []); // TODO: Add missing dependencies

  const toggleFavorite = () => {
    if (!currentQuote) return;
    
    const newFavorites = favorites.includes(currentQuote.id)
      ? favorites.filter(id => id !== currentQuote.id)
      : [...favorites, currentQuote.id];
    
    setFavorites(newFavorites);
    setCurrentQuote({ ...currentQuote, liked: !currentQuote.liked });
    
    toast({
      title: currentQuote.liked ? 'تمت إزالة الاقتباس من المفضلة' : 'تم إضافة الاقتباس للمفضلة',
      description: 'يمكنك مراجعة المفضلة في أي وقت',
    });
  };

  const shareQuote = () => {
    if (!currentQuote) return;
    
    const text = `"${currentQuote.text}"\n\n- ${currentQuote.scholar}`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      toast({
        title: 'تم النسخ',
        description: 'تم نسخ الاقتباس إلى الحافظة',
      });
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'العلم والتعلم': 'bg-blue-100 text-blue-800',
      'الصبر والتحمل': 'bg-green-100 text-green-800',
      'تزكية النفس': 'bg-purple-100 text-purple-800',
      'الإيمان والعقيدة': 'bg-indigo-100 text-indigo-800',
      'الأخلاق والآداب': 'bg-pink-100 text-pink-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (!currentQuote) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Quote className="w-6 h-6 text-amber-500" />
          حكم وأقوال العلماء
        </CardTitle>
        <p className="text-sm text-gray-600">استلهم من حكمة علماء الإسلام عبر التاريخ</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quote Card */}
        <div className="relative p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200">
          {/* Decorative Quote Mark */}
          <div className="absolute top-4 right-4 text-amber-200 opacity-50">
            <Quote className="w-12 h-12" />
          </div>
          
          {/* Category Badge */}
          <div className="mb-4">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(currentQuote.category)}`}>
              {currentQuote.category}
            </span>
          </div>
          
          {/* Quote Text */}
          <blockquote className="text-xl leading-relaxed text-amber-900 mb-6 font-medium text-right">
            "{currentQuote.text}"
          </blockquote>
          
          {/* Scholar Info */}
          <div className="flex items-center gap-3 p-4 bg-white/70 rounded-lg">
            <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-amber-700" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-amber-900">{currentQuote.scholar}</h4>
              <p className="text-sm text-amber-700">{currentQuote.era}</p>
              {currentQuote.source && (
                <p className="text-xs text-amber-600 mt-1">المصدر: {currentQuote.source}</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3">
          <Button
            onClick={toggleFavorite}
            variant={currentQuote.liked ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <Heart className={`w-4 h-4 ${currentQuote.liked ? 'fill-current' : ''}`} />
            {currentQuote.liked ? 'في المفضلة' : 'أضف للمفضلة'}
          </Button>
          
          <Button
            onClick={shareQuote}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            مشاركة
          </Button>
          
          <Button
            onClick={getRandomQuote}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            اقتباس جديد
          </Button>
        </div>

        {/* Scholar Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-amber-600">{scholarQuotes.length}</div>
            <div className="text-xs text-gray-600">إجمالي الأقوال</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{favorites.length}</div>
            <div className="text-xs text-gray-600">المفضلة</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">12</div>
            <div className="text-xs text-gray-600">العلماء</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicScholarQuotes;
