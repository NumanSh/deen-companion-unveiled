
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Settings, Moon, Sun, Minus, Plus, Bookmark } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import AudioPlayer from './AudioPlayer';

interface ReadingModeProps {
  content: {
    title: string;
    arabic?: string;
    transliteration?: string;
    translation?: string;
    audioUrl?: string;
  };
  onClose: () => void;
}

const ReadingMode: React.FC<ReadingModeProps> = ({ content, onClose }) => {
  const [fontSize, setFontSize] = useState(18);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Prevent body scroll when reading mode is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBookmark = () => {
    const bookmark = {
      id: `reading-${Date.now()}`,
      type: 'surah' as const,
      title: content.title,
      subtitle: content.transliteration,
      data: content,
      timestamp: Date.now()
    };

    const saved = localStorage.getItem('islamic-app-bookmarks');
    const bookmarks = saved ? JSON.parse(saved) : [];
    
    if (!isBookmarked) {
      bookmarks.push(bookmark);
      localStorage.setItem('islamic-app-bookmarks', JSON.stringify(bookmarks));
      setIsBookmarked(true);
      toast({
        title: "Bookmarked",
        description: "Added to your reading list.",
      });
    } else {
      const filtered = bookmarks.filter((b: any) => b.title !== content.title);
      localStorage.setItem('islamic-app-bookmarks', JSON.stringify(filtered));
      setIsBookmarked(false);
      toast({
        title: "Bookmark Removed",
        description: "Removed from your reading list.",
      });
    }
  };

  return (
    <div className={`fixed inset-0 z-50 ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
        
        <h1 className="text-lg font-semibold text-center flex-1">{content.title}</h1>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBookmark}
            className={isBookmarked ? 'text-red-500' : ''}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Font Size</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                className="h-8 w-8"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-sm w-8 text-center">{fontSize}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setFontSize(Math.min(32, fontSize + 2))}
                className="h-8 w-8"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Theme</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="flex items-center gap-2"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {isDarkMode ? 'Light' : 'Dark'}
            </Button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="h-full overflow-y-auto p-6 pb-32">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Audio Player */}
          {content.audioUrl && (
            <AudioPlayer
              audioUrl={content.audioUrl}
              title={content.title}
            />
          )}

          {/* Arabic Text */}
          {content.arabic && (
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-4 text-green-700 dark:text-green-300">Arabic</h2>
              <p 
                className="leading-loose font-arabic text-right"
                style={{ fontSize: `${fontSize + 8}px` }}
                dir="rtl"
              >
                {content.arabic}
              </p>
            </div>
          )}

          {/* Transliteration */}
          {content.transliteration && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-300">Transliteration</h3>
              <p 
                className="italic leading-relaxed"
                style={{ fontSize: `${fontSize}px` }}
              >
                {content.transliteration}
              </p>
            </div>
          )}

          {/* Translation */}
          {content.translation && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-purple-700 dark:text-purple-300">Translation</h3>
              <p 
                className="leading-relaxed"
                style={{ fontSize: `${fontSize}px` }}
              >
                {content.translation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadingMode;
