
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Trash2, Book } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Bookmark = {
  id: string;
  type: 'surah' | 'dua' | 'hadith';
  title: string;
  subtitle?: string;
  data: any;
  timestamp: number;
};

const BookmarkManager: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('islamic-app-bookmarks');
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  const removeBookmark = (id: string) => {
    const updated = bookmarks.filter(b => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem('islamic-app-bookmarks', JSON.stringify(updated));
    toast({
      title: "Bookmark removed",
      description: "The bookmark has been removed from your collection.",
    });
  };

  const clearAllBookmarks = () => {
    setBookmarks([]);
    localStorage.removeItem('islamic-app-bookmarks');
    toast({
      title: "All bookmarks cleared",
      description: "Your bookmark collection has been cleared.",
    });
  };

  if (bookmarks.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Heart className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p className="text-gray-500">No bookmarks yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Save your favorite Surahs, Duas, and Hadith for quick access
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500" />
          My Bookmarks ({bookmarks.length})
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={clearAllBookmarks}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Clear All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div className="flex items-center gap-3">
                <Book className="w-4 h-4 text-blue-500" />
                <div>
                  <h4 className="font-medium">{bookmark.title}</h4>
                  {bookmark.subtitle && (
                    <p className="text-sm text-gray-500">{bookmark.subtitle}</p>
                  )}
                  <p className="text-xs text-gray-400 capitalize">{bookmark.type}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeBookmark(bookmark.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookmarkManager;
