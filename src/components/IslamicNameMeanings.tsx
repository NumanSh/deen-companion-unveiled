
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, Heart, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface IslamicName {
  arabic: string;
  transliteration: string;
  meaning: string;
  origin: string;
  gender: 'male' | 'female' | 'unisex';
  popularRank?: number;
  islamicSignificance?: string;
}

const IslamicNameMeanings = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  const islamicNames: IslamicName[] = [
    {
      arabic: 'محمد',
      transliteration: 'Muhammad',
      meaning: 'المحمود، المُثنى عليه',
      origin: 'عربي',
      gender: 'male',
      popularRank: 1,
      islamicSignificance: 'اسم النبي صلى الله عليه وسلم'
    },
    {
      arabic: 'فاطمة',
      transliteration: 'Fatimah',
      meaning: 'الفطيمة، التي فُطمت عن الشر',
      origin: 'عربي',
      gender: 'female',
      popularRank: 1,
      islamicSignificance: 'ابنة النبي صلى الله عليه وسلم'
    },
    {
      arabic: 'عبد الله',
      transliteration: 'Abdullah',
      meaning: 'عبد الله، خادم الله',
      origin: 'عربي',
      gender: 'male',
      popularRank: 2,
      islamicSignificance: 'والد النبي صلى الله عليه وسلم'
    },
    {
      arabic: 'عائشة',
      transliteration: 'Aisha',
      meaning: 'الحية، النشيطة',
      origin: 'عربي',
      gender: 'female',
      popularRank: 2,
      islamicSignificance: 'زوجة النبي صلى الله عليه وسلم'
    },
    {
      arabic: 'عمر',
      transliteration: 'Umar',
      meaning: 'العمر، الحياة الطويلة',
      origin: 'عربي',
      gender: 'male',
      popularRank: 3,
      islamicSignificance: 'الخليفة الثاني رضي الله عنه'
    },
    {
      arabic: 'خديجة',
      transliteration: 'Khadijah',
      meaning: 'المولودة قبل أوانها',
      origin: 'عربي',
      gender: 'female',
      popularRank: 3,
      islamicSignificance: 'زوجة النبي الأولى رضي الله عنها'
    },
    {
      arabic: 'إبراهيم',
      transliteration: 'Ibrahim',
      meaning: 'أب الجمهور',
      origin: 'عبري',
      gender: 'male',
      popularRank: 4,
      islamicSignificance: 'النبي إبراهيم عليه السلام'
    },
    {
      arabic: 'مريم',
      transliteration: 'Maryam',
      meaning: 'السيدة المُبجلة',
      origin: 'عبري',
      gender: 'female',
      popularRank: 4,
      islamicSignificance: 'والدة عيسى عليه السلام'
    }
  ];

  const filteredNames = islamicNames.filter(name => 
    name.arabic.includes(searchTerm) || 
    name.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
    name.meaning.includes(searchTerm)
  );

  const toggleFavorite = (nameKey: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(nameKey)) {
      newFavorites.delete(nameKey);
      toast({
        title: 'تم الإزالة',
        description: 'تم إزالة الاسم من المفضلة',
      });
    } else {
      newFavorites.add(nameKey);
      toast({
        title: 'تم الحفظ',
        description: 'تم إضافة الاسم للمفضلة',
      });
    }
    setFavorites(newFavorites);
  };

  const getGenderBadge = (gender: string) => {
    const colors = {
      male: 'bg-blue-100 text-blue-800',
      female: 'bg-pink-100 text-pink-800',
      unisex: 'bg-purple-100 text-purple-800'
    };
    const labels = {
      male: 'ذكر',
      female: 'أنثى', 
      unisex: 'مشترك'
    };
    return <Badge className={colors[gender]}>{labels[gender]}</Badge>;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-indigo-500" />
          معاني الأسماء الإسلامية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="ابحث عن اسم أو معنى..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>

        <div className="grid gap-4">
          {filteredNames.map((name, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-indigo-50 to-white hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{name.arabic}</h3>
                    <span className="text-gray-500">({name.transliteration})</span>
                    {name.popularRank && (
                      <Badge variant="outline" className="text-xs">
                        #{name.popularRank}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {getGenderBadge(name.gender)}
                    <Badge variant="outline">{name.origin}</Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(name.arabic)}
                  className={favorites.has(name.arabic) ? 'text-red-500' : 'text-gray-400'}
                >
                  <Heart className={`w-5 h-5 ${favorites.has(name.arabic) ? 'fill-current' : ''}`} />
                </Button>
              </div>
              
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">المعنى: </span>
                  <span className="text-gray-600">{name.meaning}</span>
                </div>
                
                {name.islamicSignificance && (
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-800">الأهمية الإسلامية</span>
                    </div>
                    <p className="text-green-700 text-sm">{name.islamicSignificance}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredNames.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            لم يتم العثور على أسماء تطابق بحثك
          </div>
        )}

        <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <h4 className="font-semibold text-indigo-800 mb-2">نصائح لاختيار الاسم</h4>
          <ul className="text-sm text-indigo-700 space-y-1">
            <li>• اختر اسماً له معنى جميل وإيجابي</li>
            <li>• تأكد من سهولة النطق والكتابة</li>
            <li>• فكر في الأسماء المرتبطة بالأنبياء والصحابة</li>
            <li>• تجنب الأسماء ذات المعاني السلبية</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicNameMeanings;
