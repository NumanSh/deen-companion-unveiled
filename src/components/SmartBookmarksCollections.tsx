
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Bookmark, 
  Plus, 
  Search, 
  Filter, 
  Heart,
  BookOpen,
  Star,
  Folder,
  FolderOpen,
  Tag,
  Calendar,
  Share
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BookmarkItem {
  id: string;
  type: 'surah' | 'verse' | 'dua' | 'hadith';
  title: string;
  content: string;
  surahNumber?: number;
  verseNumber?: number;
  tags: string[];
  dateAdded: string;
  collectionId: string;
  notes?: string;
}

interface Collection {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  itemCount: number;
  isPrivate: boolean;
}

const SmartBookmarksCollections = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');

  const [collections, setCollections] = useState<Collection[]>([
    {
      id: 'favorites',
      name: 'المفضلة',
      description: 'الآيات والأدعية المفضلة',
      color: 'bg-red-500',
      icon: '❤️',
      itemCount: 12,
      isPrivate: false
    },
    {
      id: 'daily-reading',
      name: 'القراءة اليومية',
      description: 'السور والآيات للورد اليومي',
      color: 'bg-emerald-500',
      icon: '📖',
      itemCount: 8,
      isPrivate: false
    },
    {
      id: 'duas',
      name: 'أدعية مختارة',
      description: 'أدعية من القرآن والسنة',
      color: 'bg-blue-500',
      icon: '🤲',
      itemCount: 15,
      isPrivate: false
    },
    {
      id: 'study',
      name: 'للدراسة والتدبر',
      description: 'آيات للتفسير والدراسة',
      color: 'bg-purple-500',
      icon: '📚',
      itemCount: 6,
      isPrivate: true
    }
  ]);

  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([
    {
      id: '1',
      type: 'verse',
      title: 'آية الكرسي',
      content: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...',
      surahNumber: 2,
      verseNumber: 255,
      tags: ['تسبيح', 'حماية', 'تلاوة يومية'],
      dateAdded: '2024-01-15',
      collectionId: 'favorites',
      notes: 'للقراءة في الصباح والمساء'
    },
    {
      id: '2',
      type: 'dua',
      title: 'دعاء الاستخارة',
      content: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ...',
      tags: ['استخارة', 'قرار', 'توفيق'],
      dateAdded: '2024-01-14',
      collectionId: 'duas',
      notes: 'عند اتخاذ القرارات المهمة'
    },
    {
      id: '3',
      type: 'surah',
      title: 'سورة الفاتحة',
      content: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ...',
      surahNumber: 1,
      tags: ['فاتحة', 'صلاة', 'شفاء'],
      dateAdded: '2024-01-13',
      collectionId: 'daily-reading'
    }
  ]);

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bookmark.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bookmark.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCollection = !selectedCollection || bookmark.collectionId === selectedCollection;
    const matchesType = filterType === 'all' || bookmark.type === filterType;
    
    return matchesSearch && matchesCollection && matchesType;
  });

  const createCollection = (name: string, description: string) => {
    const newCollection: Collection = {
      id: Date.now().toString(),
      name,
      description,
      color: 'bg-gray-500',
      icon: '📁',
      itemCount: 0,
      isPrivate: false
    };
    
    setCollections(prev => [...prev, newCollection]);
    toast({
      title: 'تم إنشاء المجموعة',
      description: `تم إنشاء مجموعة "${name}" بنجاح`,
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'verse': return <BookOpen className="w-4 h-4" />;
      case 'surah': return <Star className="w-4 h-4" />;
      case 'dua': return <Heart className="w-4 h-4" />;
      case 'hadith': return <Bookmark className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-emerald-600" />
            مجموعات المرجعيات الذكية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="ابحث في المرجعيات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('all')}
              >
                الكل
              </Button>
              <Button
                variant={filterType === 'verse' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('verse')}
              >
                آيات
              </Button>
              <Button
                variant={filterType === 'surah' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('surah')}
              >
                سور
              </Button>
              <Button
                variant={filterType === 'dua' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('dua')}
              >
                أدعية
              </Button>
              <Button
                variant={filterType === 'hadith' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('hadith')}
              >
                أحاديث
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Collections Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">المجموعات</h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowCreateCollection(true)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={selectedCollection === null ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setSelectedCollection(null)}
              >
                <Folder className="w-4 h-4 mr-2" />
                جميع المرجعيات
                <Badge variant="secondary" className="ml-auto">
                  {bookmarks.length}
                </Badge>
              </Button>
              
              {collections.map((collection) => (
                <Button
                  key={collection.id}
                  variant={selectedCollection === collection.id ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedCollection(collection.id)}
                >
                  <div className={`w-3 h-3 rounded-full ${collection.color} mr-2`} />
                  <span className="flex-1 text-right">{collection.name}</span>
                  <Badge variant="secondary" className="ml-2">
                    {collection.itemCount}
                  </Badge>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Bookmarks Content */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            {filteredBookmarks.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Bookmark className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="font-semibold mb-2">لا توجد مرجعيات</h3>
                  <p className="text-gray-600 text-sm">ابدأ بحفظ الآيات والأدعية المفضلة لديك</p>
                </CardContent>
              </Card>
            ) : (
              filteredBookmarks.map((bookmark) => (
                <Card key={bookmark.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(bookmark.type)}
                        <h3 className="font-semibold">{bookmark.title}</h3>
                        {bookmark.surahNumber && (
                          <Badge variant="outline" className="text-xs">
                            سورة {bookmark.surahNumber}
                            {bookmark.verseNumber && ` - آية ${bookmark.verseNumber}`}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Share className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-3 text-right leading-relaxed">
                      {bookmark.content.length > 150 
                        ? `${bookmark.content.substring(0, 150)}...`
                        : bookmark.content
                      }
                    </p>

                    {bookmark.notes && (
                      <div className="bg-amber-50 border border-amber-200 rounded p-2 mb-3">
                        <p className="text-sm text-amber-800">{bookmark.notes}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {bookmark.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {new Date(bookmark.dateAdded).toLocaleDateString('ar-SA')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartBookmarksCollections;
