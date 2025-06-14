
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, BookOpen, Star, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HadithSearchResult {
  id: string;
  text: string;
  narrator: string;
  source: string;
  book: string;
  chapter: string;
  grade: 'صحيح' | 'حسن' | 'ضعيف';
  topic: string[];
}

const HadithSearchEngine = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState('الكل');
  const [selectedGrade, setSelectedGrade] = useState('الكل');
  const [results, setResults] = useState<HadithSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const sources = ['الكل', 'صحيح البخاري', 'صحيح مسلم', 'سنن أبي داود', 'جامع الترمذي', 'سنن النسائي'];
  const grades = ['الكل', 'صحيح', 'حسن', 'ضعيف'];

  // Expanded hadith database with more entries
  const hadithDatabase: HadithSearchResult[] = [
    {
      id: '1',
      text: 'إنما الأعمال بالنيات وإنما لكل امرئ ما نوى',
      narrator: 'عمر بن الخطاب',
      source: 'صحيح البخاري',
      book: 'كتاب بدء الوحي',
      chapter: 'باب كيف كان بدء الوحي',
      grade: 'صحيح',
      topic: ['النية', 'الإخلاص', 'العبادة']
    },
    {
      id: '2',
      text: 'من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت',
      narrator: 'أبو هريرة',
      source: 'صحيح البخاري',
      book: 'كتاب الأدب',
      chapter: 'باب من كان يؤمن بالله واليوم الآخر',
      grade: 'صحيح',
      topic: ['الكلام', 'الآداب', 'الصمت']
    },
    {
      id: '3',
      text: 'الطهور شطر الإيمان',
      narrator: 'أبو مالك الأشعري',
      source: 'صحيح مسلم',
      book: 'كتاب الطهارة',
      chapter: 'باب فضل الوضوء',
      grade: 'صحيح',
      topic: ['الطهارة', 'الوضوء', 'الإيمان']
    },
    {
      id: '4',
      text: 'من يرد الله به خيراً يفقهه في الدين',
      narrator: 'معاوية بن أبي سفيان',
      source: 'صحيح البخاري',
      book: 'كتاب العلم',
      chapter: 'باب من يرد الله به خيراً',
      grade: 'صحيح',
      topic: ['العلم', 'الفقه', 'الدين']
    },
    {
      id: '5',
      text: 'المؤمن للمؤمن كالبنيان يشد بعضه بعضاً',
      narrator: 'أبو موسى الأشعري',
      source: 'صحيح البخاري',
      book: 'كتاب الأدب',
      chapter: 'باب تعاون المؤمنين',
      grade: 'صحيح',
      topic: ['التعاون', 'الأخوة', 'المجتمع']
    },
    {
      id: '6',
      text: 'لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه',
      narrator: 'أنس بن مالك',
      source: 'صحيح البخاري',
      book: 'كتاب الإيمان',
      chapter: 'باب من الإيمان أن يحب',
      grade: 'صحيح',
      topic: ['الإيمان', 'المحبة', 'الأخوة']
    },
    {
      id: '7',
      text: 'من صلى البردين دخل الجنة',
      narrator: 'أبو موسى الأشعري',
      source: 'صحيح البخاري',
      book: 'كتاب مواقيت الصلاة',
      chapter: 'باب فضل صلاة الفجر والعصر',
      grade: 'صحيح',
      topic: ['الصلاة', 'الفجر', 'العصر', 'الجنة']
    },
    {
      id: '8',
      text: 'الدين النصيحة',
      narrator: 'تميم الداري',
      source: 'صحيح مسلم',
      book: 'كتاب الإيمان',
      chapter: 'باب بيان أن الدين النصيحة',
      grade: 'صحيح',
      topic: ['النصيحة', 'الدين', 'الإرشاد']
    },
    {
      id: '9',
      text: 'لا ضرر ولا ضرار',
      narrator: 'أبو سعيد الخدري',
      source: 'سنن ابن ماجه',
      book: 'كتاب الأحكام',
      chapter: 'باب من بنى في حقه ما يضر بجاره',
      grade: 'حسن',
      topic: ['الضرر', 'العدالة', 'الحقوق']
    },
    {
      id: '10',
      text: 'إذا مات الإنسان انقطع عنه عمله إلا من ثلاثة',
      narrator: 'أبو هريرة',
      source: 'صحيح مسلم',
      book: 'كتاب الوصية',
      chapter: 'باب ما يلحق الإنسان من الثواب بعد وفاته',
      grade: 'صحيح',
      topic: ['الموت', 'الصدقة', 'العلم', 'الولد الصالح']
    },
    {
      id: '11',
      text: 'كل عمل ابن آدم له إلا الصوم فإنه لي وأنا أجزي به',
      narrator: 'أبو هريرة',
      source: 'صحيح البخاري',
      book: 'كتاب الصوم',
      chapter: 'باب فضل الصوم',
      grade: 'صحيح',
      topic: ['الصوم', 'رمضان', 'الأجر']
    },
    {
      id: '12',
      text: 'خير الناس أنفعهم للناس',
      narrator: 'عبد الله بن عمر',
      source: 'المعجم الأوسط للطبراني',
      book: 'المعجم الأوسط',
      chapter: 'باب الخير والنفع',
      grade: 'حسن',
      topic: ['النفع', 'الخير', 'خدمة الناس']
    },
    {
      id: '13',
      text: 'اتق الله حيثما كنت',
      narrator: 'أبو ذر الغفاري',
      source: 'جامع الترمذي',
      book: 'كتاب البر والصلة',
      chapter: 'باب في معاشرة الناس',
      grade: 'حسن',
      topic: ['التقوى', 'الأخلاق', 'المعاملة']
    },
    {
      id: '14',
      text: 'من سن في الإسلام سنة حسنة فله أجرها وأجر من عمل بها',
      narrator: 'جرير بن عبد الله',
      source: 'صحيح مسلم',
      book: 'كتاب الزكاة',
      chapter: 'باب الحث على الصدقة',
      grade: 'صحيح',
      topic: ['السنة الحسنة', 'الأجر', 'القدوة']
    },
    {
      id: '15',
      text: 'إن الله جميل يحب الجمال',
      narrator: 'عبد الله بن مسعود',
      source: 'صحيح مسلم',
      book: 'كتاب الإيمان',
      chapter: 'باب تحريم الكبر',
      grade: 'صحيح',
      topic: ['الجمال', 'التواضع', 'الكبر']
    }
  ];

  const handleSearch = async () => {
    setIsSearching(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredResults = hadithDatabase;
    
    // Filter by search query
    if (searchQuery.trim()) {
      filteredResults = filteredResults.filter(hadith =>
        hadith.text.includes(searchQuery) ||
        hadith.narrator.includes(searchQuery) ||
        hadith.topic.some(topic => topic.includes(searchQuery)) ||
        hadith.source.includes(searchQuery) ||
        hadith.book.includes(searchQuery)
      );
    }
    
    // Filter by source
    if (selectedSource !== 'الكل') {
      filteredResults = filteredResults.filter(hadith =>
        hadith.source === selectedSource
      );
    }
    
    // Filter by grade
    if (selectedGrade !== 'الكل') {
      filteredResults = filteredResults.filter(hadith =>
        hadith.grade === selectedGrade
      );
    }
    
    setResults(filteredResults);
    setIsSearching(false);
  };

  // Show all hadiths on component mount
  React.useEffect(() => {
    setResults(hadithDatabase);
  }, []);

  const copyHadith = (hadith: HadithSearchResult) => {
    const text = `${hadith.text}\n\nالراوي: ${hadith.narrator}\nالمصدر: ${hadith.source}\nالدرجة: ${hadith.grade}`;
    navigator.clipboard.writeText(text);
    toast({
      title: 'تم النسخ',
      description: 'تم نسخ الحديث إلى الحافظة',
    });
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'صحيح': return 'bg-green-100 text-green-800';
      case 'حسن': return 'bg-yellow-100 text-yellow-800';
      case 'ضعيف': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-6 h-6 text-blue-500" />
          محرك البحث في الأحاديث
        </CardTitle>
        <p className="text-sm text-gray-600">ابحث في مجموعة شاملة من الأحاديث النبوية الشريفة</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Interface */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="ابحث في نص الحديث، الراوي، أو الموضوع..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isSearching}>
              <Search className="w-4 h-4" />
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">المصدر:</span>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                {sources.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">الدرجة:</span>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {isSearching && (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">جاري البحث...</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">نتائج البحث ({results.length})</h3>
            {results.map((hadith) => (
              <div key={hadith.id} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <Badge className={getGradeColor(hadith.grade)}>{hadith.grade}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyHadith(hadith)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="text-lg leading-relaxed mb-3 text-right">
                  {hadith.text}
                </div>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <div><strong>الراوي:</strong> {hadith.narrator}</div>
                  <div><strong>المصدر:</strong> {hadith.source} - {hadith.book}</div>
                  <div><strong>الباب:</strong> {hadith.chapter}</div>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {hadith.topic.map((topic, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {results.length === 0 && !isSearching && (
          <div className="text-center py-8 text-gray-500">
            <div className="relative mb-6">
              <BookOpen className="w-16 h-16 mx-auto opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Search className="w-6 h-6 opacity-50" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">لم يتم العثور على أحاديث</h3>
            <p className="text-sm">جرب تعديل كلمات البحث أو المرشحات</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HadithSearchEngine;
