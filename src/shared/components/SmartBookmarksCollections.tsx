import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookmarkIcon, Heart, Trash2, FolderOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SmartBookmarksCollections: React.FC = () => {
  const { toast } = useToast();
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('islamic-app-bookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  const categories = [
    { id: 'all', label: 'All', count: bookmarks.length },
    { id: 'surah', label: 'Quran', count: bookmarks.filter(b => b.type === 'surah').length },
    { id: 'hadith', label: 'Hadith', count: bookmarks.filter(b => b.type === 'hadith').length },
    { id: 'dua', label: 'Duas', count: bookmarks.filter(b => b.type === 'dua').length },
  ];

  const filteredBookmarks = selectedCategory === 'all' 
    ? bookmarks 
    : bookmarks.filter(b => b.type === selectedCategory);

  const removeBookmark = (id: string) => {
    const updatedBookmarks = bookmarks.filter(b => b.id !== id);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('islamic-app-bookmarks', JSON.stringify(updatedBookmarks));
    toast({
      title: 'Bookmark Removed',
      description: 'Item removed from your bookmarks'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookmarkIcon className="w-5 h-5 text-amber-600" />
          Smart Bookmarks Collections
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Category Filters */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              <FolderOpen className="w-4 h-4" />
              {category.label}
              <Badge variant="secondary">{category.count}</Badge>
            </Button>
          ))}
        </div>

        {/* Bookmarks List */}
        <div className="space-y-3">
          {filteredBookmarks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Heart className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No bookmarks yet</p>
              <p className="text-sm">Start bookmarking your favorite content</p>
            </div>
          ) : (
            filteredBookmarks.map((bookmark) => (
              <div key={bookmark.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{bookmark.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{bookmark.subtitle}</p>
                  <Badge variant="outline" className="mt-1">
                    {bookmark.type}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeBookmark(bookmark.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartBookmarksCollections;