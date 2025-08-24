
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Book, Search, Download, Star, Eye, Filter, BookMarked } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IslamicBook {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  pages: number;
  language: 'العربية' | 'الإنجليزية' | 'متعدد';
  difficulty: 'مبتدئ' | 'متوسط' | 'متقدم';
  rating: number;
  downloads: number;
  isBookmarked: boolean;
  era: string;
  topics: string[];
}

const IslamicBookLibrary = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedDifficulty, setSelectedDifficulty] = useState('الكل');
  const [books, setBooks] = useState<IslamicBook[]>([
    {
      id: '1',
      title: 'رياض الصالحين',
      author: 'الإمام النووي',
      category: 'الحديث',
      description: 'مجموعة منتقاة من الأحاديث النبوية الشريفة مقسمة حسب الموضوعات',
      pages: 450,
      language: 'العربية',
      difficulty: 'مبتدئ',
      rating: 4.9,
      downloads: 15420,
      isBookmarked: false,
      era: 'العصر الوسيط',
      topics: ['الأخلاق', 'العبادة', 'السلوك']
    },
    {
      id: '2',
      title: 'إحياء علوم الدين',
      author: 'الإمام الغزالي',
      category: 'التصوف والأخلاق',
      description: 'موسوعة شاملة في علوم الدين والأخلاق والتزكية',
      pages: 2000,
      language: 'العربية',
      difficulty: 'متقدم',
      rating: 4.8,
      downloads: 8930,
      isBookmarked: true,
      era: 'العصر الذهبي',
      topics: ['التزكية', 'الأخلاق', 'العبادة', 'المعاملات']
    },
    {
      id: '3',
      title: 'تفسير ابن كثير',
      author: 'ابن كثير',
      category: 'التفسير',
      description: 'من أشهر كتب التفسير بالمأثور، يفسر القرآن بالقرآن والسنة',
      pages: 3500,
      language: 'العربية',
      difficulty: 'متوسط',
      rating: 4.7,
      downloads: 12650,
      isBookmarked: false,
      era: 'العصر الوسيط',
      topics: ['التفسير', 'القرآن', 'السيرة']
    },
    {
      id: '4',
      title: 'الأربعون النووية',
      author: 'الإمام النووي',
      category: 'الحديث',
      description: 'أربعون حديثاً جامعة لأصول الدين والأحكام والآداب',
      pages: 120,
      language: 'العربية',
      difficulty: 'مبتدئ',
      rating: 4.9,
      downloads: 25780,
      isBookmarked: true,
      era: 'العصر الوسيط',
      topics: ['الأحكام', 'الآداب', 'العقيدة']
    },
    {
      id: '5',
      title: 'فقه السنة',
      author: 'السيد سابق',
      category: 'الفقه',
      description: 'عرض مبسط للأحكام الفقهية مع الأدلة من الكتاب والسنة',
      pages: 800,
      language: 'العربية',
      difficulty: 'متوسط',
      rating: 4.6,
      downloads: 9850,
      isBookmarked: false,
      era: 'العصر الحديث',
      topics: ['الفقه', 'الأحكام', 'العبادات', 'المعاملات']
    }
  ]);

  const categories = ['الكل', 'التفسير', 'الحديث', 'الفقه', 'العقيدة', 'التصوف والأخلاق', 'السيرة', 'التاريخ'];
  const difficulties = ['الكل', 'مبتدئ', 'متوسط', 'متقدم'];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'الكل' || book.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'الكل' || book.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const toggleBookmark = (bookId: string) => {
    setBooks(prev => prev.map(book => 
      book.id === bookId ? { ...book, isBookmarked: !book.isBookmarked } : book
    ));
    
    const book = books.find(b => b.id === bookId);
    toast({
      title: book?.isBookmarked ? 'تمت إزالة الكتاب من المفضلة' : 'تم إضافة الكتاب للمفضلة',
      description: book?.title,
    });
  };

  const downloadBook = (book: IslamicBook) => {
    setBooks(prev => prev.map(b => 
      b.id === book.id ? { ...b, downloads: b.downloads + 1 } : b
    ));
    
    toast({
      title: 'بدء التحميل',
      description: `جاري تحميل كتاب "${book.title}"`,
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

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'العربية': return 'bg-blue-100 text-blue-800';
      case 'الإنجليزية': return 'bg-purple-100 text-purple-800';
      case 'متعدد': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookMarked className="w-6 h-6 text-emerald-500" />
          المكتبة الإسلامية الرقمية
        </CardTitle>
        <p className="text-sm text-gray-600">آلاف الكتب الإسلامية في جميع العلوم الشرعية</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="ابحث في عنوان الكتاب، اسم المؤلف، أو الموضوعات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-sm border rounded px-3 py-2"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="text-sm border rounded px-3 py-2"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>{diff}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBooks.map((book) => (
            <div key={book.id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
              {/* Book Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-right leading-relaxed">{book.title}</h3>
                  <p className="text-gray-600 text-sm text-right">بقلم: {book.author}</p>
                  <p className="text-xs text-gray-500">{book.era}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleBookmark(book.id)}
                  className={book.isBookmarked ? 'text-red-500' : 'text-gray-400'}
                >
                  <Star className={`w-4 h-4 ${book.isBookmarked ? 'fill-current' : ''}`} />
                </Button>
              </div>

              {/* Book Details */}
              <div className="space-y-3">
                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{book.category}</Badge>
                  <Badge className={getDifficultyColor(book.difficulty)}>{book.difficulty}</Badge>
                  <Badge className={getLanguageColor(book.language)}>{book.language}</Badge>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 leading-relaxed text-right">
                  {book.description}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-1">
                  {book.topics.map((topic, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {book.downloads.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Book className="w-3 h-3" />
                      {book.pages} صفحة
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current text-yellow-400" />
                    <span>{book.rating}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => downloadBook(book)}
                    className="flex-1 text-sm"
                    size="sm"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    تحميل
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    معاينة
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Book className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="font-semibold mb-2">لا توجد كتب مطابقة</h3>
            <p className="text-sm">جرب تعديل البحث أو الفلاتر</p>
          </div>
        )}

        {/* Library Statistics */}
        <div className="grid grid-cols-4 gap-4 p-4 bg-emerald-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-600">{books.length}</div>
            <div className="text-xs text-emerald-600">كتاب متاح</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{categories.length - 1}</div>
            <div className="text-xs text-blue-600">تصنيف</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">
              {books.reduce((sum, book) => sum + book.downloads, 0).toLocaleString()}
            </div>
            <div className="text-xs text-purple-600">تحميل</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-600">
              {books.filter(book => book.isBookmarked).length}
            </div>
            <div className="text-xs text-orange-600">مفضل</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicBookLibrary;
