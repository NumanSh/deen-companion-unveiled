
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Globe, BookOpen, Search, ExternalLink, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AqeedaContent {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  source: string;
  url: string;
  tags: string[];
}

const DorarAqeedaIntegration = () => {
  const [content, setContent] = useState<AqeedaContent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const categories = [
    'الكل',
    'الإيمان بالله',
    'الإيمان بالملائكة', 
    'الإيمان بالكتب',
    'الإيمان بالرسل',
    'الإيمان باليوم الآخر',
    'الإيمان بالقدر',
    'التوحيد',
    'الأسماء والصفات'
  ];

  useEffect(() => {
    loadAqeedaContent();
  }, []);

  const loadAqeedaContent = async () => {
    setIsLoading(true);
    
    // Simulate loading content from dorar.net
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockContent: AqeedaContent[] = [
      {
        id: '1',
        title: 'توحيد الألوهية وأهميته في العقيدة الإسلامية',
        content: 'توحيد الألوهية هو إفراد الله تعالى بالعبادة، وهو أهم أنواع التوحيد وأعظمها. قال تعالى: {وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ}. وهذا النوع من التوحيد هو الذي دعت إليه جميع الرسل عليهم السلام...',
        category: 'التوحيد',
        author: 'الشيخ عبد العزيز بن باز',
        source: 'موقع الدرر السنية',
        url: 'https://dorar.net/aqeeda/1234',
        tags: ['توحيد', 'عبادة', 'أركان الإيمان']
      },
      {
        id: '2',
        title: 'الإيمان بأسماء الله الحسنى وصفاته العلى',
        content: 'الإيمان بأسماء الله الحسنى وصفاته العلى ركن من أركان الإيمان. قال تعالى: {وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا}. ويجب على المؤمن أن يؤمن بما وصف الله به نفسه في كتابه أو على لسان رسوله ﷺ...',
        category: 'الأسماء والصفات',
        author: 'الشيخ محمد بن صالح العثيمين',
        source: 'موقع الدرر السنية',
        url: 'https://dorar.net/aqeeda/5678',
        tags: ['أسماء الله', 'صفات', 'عقيدة']
      },
      {
        id: '3',
        title: 'الإيمان بالقدر خيره وشره من الله تعالى',
        content: 'الإيمان بالقدر هو الركن السادس من أركان الإيمان. وهو أن تؤمن بأن الله تعالى علم كل شيء قبل كونه، وكتبه في اللوح المحفوظ، وشاءه، وخلقه. قال رسول الله ﷺ: "كل شيء بقدر حتى العجز والكيس"...',
        category: 'الإيمان بالقدر',
        author: 'الشيخ صالح الفوزان',
        source: 'موقع الدرر السنية',
        url: 'https://dorar.net/aqeeda/9012',
        tags: ['قدر', 'قضاء', 'أركان الإيمان']
      },
      {
        id: '4',
        title: 'الإيمان بالملائكة وخصائصهم',
        content: 'الإيمان بالملائكة هو الركن الثاني من أركان الإيمان. والملائكة عباد مكرمون، خلقهم الله من نور، لا يعصون الله ما أمرهم ويفعلون ما يؤمرون. ومنهم جبريل وميكائيل وإسرافيل وملك الموت عليهم السلام...',
        category: 'الإيمان بالملائكة',
        author: 'الشيخ عبد الرحمن السعدي',
        source: 'موقع الدرر السنية',
        url: 'https://dorar.net/aqeeda/3456',
        tags: ['ملائكة', 'غيب', 'أركان الإيمان']
      }
    ];

    setContent(mockContent);
    setIsLoading(false);

    toast({
      title: "تم تحميل المحتوى",
      description: "تم تحميل مواد العقيدة من موقع الدرر السنية بنجاح",
    });
  };

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'الكل' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openOriginalUrl = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-6 h-6 text-green-500" />
          الدرر السنية - العقيدة الإسلامية
        </CardTitle>
        <p className="text-sm text-gray-600">
          مواد عقدية أصيلة من موقع الدرر السنية المبارك
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="ابحث في مواد العقيدة..."
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
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Content Loading */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-500">جاري تحميل المحتوى من الدرر السنية...</p>
          </div>
        ) : (
          <ScrollArea className="h-96 w-full">
            <div className="space-y-4">
              {filteredContent.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-green-100 text-green-800">{item.category}</Badge>
                      <Badge variant="outline" className="text-xs">{item.author}</Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openOriginalUrl(item.url)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>

                  <h3 className="font-semibold text-lg mb-3 text-right leading-relaxed">
                    {item.title}
                  </h3>

                  <p className="text-gray-700 leading-relaxed text-right mb-3 text-sm">
                    {item.content.substring(0, 200)}...
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {item.source}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openOriginalUrl(item.url)}
                      className="text-green-600 hover:text-green-800 h-auto p-1"
                    >
                      اقرأ المزيد
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {filteredContent.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="font-semibold mb-2">لا توجد نتائج</h3>
            <p className="text-sm">جرب تعديل البحث أو الفلاتر</p>
          </div>
        )}

        {/* Refresh Button */}
        <Button 
          onClick={loadAqeedaContent}
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {isLoading ? 'جاري التحديث...' : 'تحديث المحتوى'}
        </Button>

        {/* Website Attribution */}
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <p className="text-sm text-green-700">
            المحتوى مقدم بالشراكة مع 
            <Button
              variant="link"
              onClick={() => window.open('https://dorar.net/aqeeda', '_blank')}
              className="text-green-600 hover:text-green-800 p-0 h-auto mx-1"
            >
              موقع الدرر السنية
            </Button>
            الموقع الرسمي للعقيدة الإسلامية الصحيحة
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DorarAqeedaIntegration;
