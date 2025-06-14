
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Search, Clock, User, Tag, Heart, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Article {
  id: string;
  title: string;
  author: string;
  category: string;
  summary: string;
  readTime: number;
  publishDate: string;
  tags: string[];
  difficulty: 'مبتدئ' | 'متوسط' | 'متقدم';
  isBookmarked: boolean;
  views: number;
  rating: number;
  content: string;
}

const IslamicArticleLibrary = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [articles, setArticles] = useState<Article[]>([
    {
      id: '1',
      title: 'أهمية الصلاة في حياة المسلم',
      author: 'د. أحمد محمد',
      category: 'العبادات',
      summary: 'مقال شامل عن فضل الصلاة ومكانتها في الإسلام وتأثيرها على حياة المسلم اليومية',
      readTime: 8,
      publishDate: '2024-01-15',
      tags: ['الصلاة', 'العبادة', 'الخشوع', 'الإيمان'],
      difficulty: 'مبتدئ',
      isBookmarked: false,
      views: 1250,
      rating: 4.8,
      content: 'محتوى المقال الكامل...'
    },
    {
      id: '2',
      title: 'التفسير الموضوعي للقرآن الكريم',
      author: 'د. فاطمة الزهراء',
      category: 'علوم القرآن',
      summary: 'منهجية دراسة القرآن الكريم من خلال المواضيع والموضوعات المختلفة',
      readTime: 15,
      publishDate: '2024-01-10',
      tags: ['التفسير', 'القرآن', 'المنهجية', 'البحث'],
      difficulty: 'متقدم',
      isBookmarked: true,
      views: 2340,
      rating: 4.9,
      content: 'محتوى المقال الكامل...'
    },
    {
      id: '3',
      title: 'الأخلاق الإسلامية في التعامل مع الآخرين',
      author: 'الشيخ محمد العلي',
      category: 'الأخلاق والآداب',
      summary: 'دليل عملي للأخلاق الإسلامية في التعامل مع الناس في الحياة اليومية',
      readTime: 12,
      publishDate: '2024-01-08',
      tags: ['الأخلاق', 'التعامل', 'المجتمع', 'الآداب'],
      difficulty: 'متوسط',
      isBookmarked: false,
      views: 980,
      rating: 4.7,
      content: 'محتوى المقال الكامل...'
    },
    {
      id: '4',
      title: 'فقه الزكاة في الإسلام',
      author: 'د. عبدالله الحسن',
      category: 'الفقه',
      summary: 'شرح مفصل لأحكام الزكاة وشروطها ومصارفها في الشريعة الإسلامية',
      readTime: 20,
      publishDate: '2024-01-05',
      tags: ['الزكاة', 'الفقه', 'الأحكام', 'المال'],
      difficulty: 'متقدم',
      isBookmarked: false,
      views: 1870,
      rating: 4.6,
      content: 'محتوى المقال الكامل...'
    },
    {
      id: '5',
      title: 'قصص الأنبياء والعبر المستفادة',
      author: 'أ. سارة أحمد',
      category: 'القصص والسير',
      summary: 'استخلاص الدروس والعبر من قصص الأنبياء في القرآن الكريم',
      readTime: 10,
      publishDate: '2024-01-03',
      tags: ['الأنبياء', 'القصص', 'العبر', 'التربية'],
      difficulty: 'مبتدئ',
      isBookmarked: true,
      views: 1560,
      rating: 4.9,
      content: 'محتوى المقال الكامل...'
    }
  ]);

  const categories = [
    'الكل', 'العبادات', 'علوم القرآن', 'الأخلاق والآداب', 
    'الفقه', 'القصص والسير', 'التاريخ الإسلامي', 'الدعوة والإرشاد'
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'الكل' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleBookmark = (articleId: string) => {
    setArticles(prev => prev.map(article => 
      article.id === articleId ? { ...article, isBookmarked: !article.isBookmarked } : article
    ));
    
    const article = articles.find(a => a.id === articleId);
    toast({
      title: article?.isBookmarked ? 'تمت إزالة المقال من المفضلة' : 'تم إضافة المقال للمفضلة',
      description: article?.title,
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-500" />
          مكتبة المقالات الإسلامية
        </CardTitle>
        <p className="text-sm text-gray-600">مجموعة مختارة من المقالات الإسلامية التعليمية والتثقيفية</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="ابحث في عنوان المقال، اسم الكاتب، أو الكلمات المفتاحية..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
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
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <div key={article.id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
              {/* Article Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-right leading-relaxed mb-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {article.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.readTime} دقائق قراءة
                    </span>
                    <span>{formatDate(article.publishDate)}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleBookmark(article.id)}
                  className={article.isBookmarked ? 'text-red-500' : 'text-gray-400'}
                >
                  <Heart className={`w-4 h-4 ${article.isBookmarked ? 'fill-current' : ''}`} />
                </Button>
              </div>

              {/* Article Details */}
              <div className="space-y-3">
                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{article.category}</Badge>
                  <Badge className={getDifficultyColor(article.difficulty)}>{article.difficulty}</Badge>
                </div>

                {/* Summary */}
                <p className="text-sm text-gray-700 leading-relaxed text-right">
                  {article.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {article.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats and Actions */}
                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {article.views.toLocaleString()} مشاهدة
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      {article.rating}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      قراءة المقال
                    </Button>
                    <Button size="sm" className="text-xs">
                      تحميل PDF
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="font-semibold mb-2">لا توجد مقالات مطابقة</h3>
            <p className="text-sm">جرب تعديل البحث أو الفلاتر</p>
          </div>
        )}

        {/* Library Statistics */}
        <div className="grid grid-cols-4 gap-4 p-4 bg-blue-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{articles.length}</div>
            <div className="text-xs text-blue-600">مقال متاح</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              {articles.filter(a => a.isBookmarked).length}
            </div>
            <div className="text-xs text-green-600">مقال مفضل</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{categories.length - 1}</div>
            <div className="text-xs text-purple-600">تصنيف</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-600">
              {Math.round(articles.reduce((sum, article) => sum + article.rating, 0) / articles.length * 10) / 10}
            </div>
            <div className="text-xs text-orange-600">متوسط التقييم</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicArticleLibrary;
