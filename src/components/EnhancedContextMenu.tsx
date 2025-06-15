
import React from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from '@/components/ui/context-menu';
import { 
  Copy, 
  Share2, 
  BookmarkPlus, 
  Download, 
  Heart,
  Volume2,
  Search,
  MessageCircle,
  Printer,
  ExternalLink,
  Tag,
  Calendar,
  Clock,
  Star,
  Highlighter,
  Repeat,
  Translate
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface EnhancedContextMenuProps {
  children: React.ReactNode;
  content?: {
    text?: string;
    title?: string;
    type?: 'verse' | 'hadith' | 'dua' | 'general';
    surahNumber?: number;
    verseNumber?: number;
    isArabic?: boolean;
  };
  onBookmark?: () => void;
  onShare?: () => void;
  onHighlight?: (color: string) => void;
  onAddNote?: () => void;
  disabled?: boolean;
}

const EnhancedContextMenu: React.FC<EnhancedContextMenuProps> = ({
  children,
  content,
  onBookmark,
  onShare,
  onHighlight,
  onAddNote,
  disabled = false
}) => {
  const { toast } = useToast();

  const handleCopy = () => {
    if (content?.text) {
      navigator.clipboard.writeText(content.text);
      toast({
        title: 'Copied to clipboard',
        description: `${content.type === 'verse' ? 'Verse' : 'Content'} copied successfully`,
        duration: 1500,
      });
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare();
    } else if (content?.text) {
      if (navigator.share) {
        navigator.share({
          title: content.title || `Islamic ${content.type || 'Content'}`,
          text: content.text,
        });
      } else {
        handleCopy();
        toast({
          title: 'Ready to share',
          description: 'Content copied - paste it anywhere to share',
        });
      }
    }
  };

  const handleBookmark = () => {
    if (onBookmark) {
      onBookmark();
    }
    toast({
      title: 'Added to bookmarks',
      description: `${content?.type === 'verse' ? 'Verse' : 'Content'} saved for later`,
    });
  };

  const handleListen = () => {
    toast({
      title: 'Audio playback',
      description: content?.isArabic ? 'Starting Arabic recitation...' : 'Starting narration...',
    });
  };

  const handleSearch = () => {
    if (content?.text) {
      const searchTerm = content.text.length > 50 
        ? content.text.substring(0, 50) + '...' 
        : content.text;
      toast({
        title: 'Searching...',
        description: `Finding content related to: "${searchTerm}"`,
      });
    }
  };

  const handleHighlight = (color: string) => {
    if (onHighlight) {
      onHighlight(color);
    }
    toast({
      title: 'Highlighted',
      description: `Text highlighted in ${color}`,
    });
  };

  const handleAddNote = () => {
    if (onAddNote) {
      onAddNote();
    }
    toast({
      title: 'Add Note',
      description: 'Opening note editor...',
    });
  };

  const handlePrint = () => {
    toast({
      title: 'Printing...',
      description: 'Preparing content for printing',
    });
    window.print();
  };

  const handleTranslate = () => {
    toast({
      title: 'Translation',
      description: 'Opening translation options...',
    });
  };

  const handleSchedule = () => {
    toast({
      title: 'Schedule Reading',
      description: 'Adding to reading schedule...',
    });
  };

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger className="cursor-context-menu">
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64 bg-white/95 backdrop-blur-sm border shadow-xl">
        {/* Primary Actions */}
        <ContextMenuItem onClick={handleCopy} className="cursor-pointer">
          <Copy className="w-4 h-4 mr-2" />
          Copy text
          <ContextMenuShortcut>Ctrl+C</ContextMenuShortcut>
        </ContextMenuItem>
        
        <ContextMenuItem onClick={handleShare} className="cursor-pointer">
          <Share2 className="w-4 h-4 mr-2" />
          Share
          <ContextMenuShortcut>Ctrl+S</ContextMenuShortcut>
        </ContextMenuItem>
        
        <ContextMenuItem onClick={handleBookmark} className="cursor-pointer">
          <BookmarkPlus className="w-4 h-4 mr-2" />
          Add to bookmarks
          <ContextMenuShortcut>Ctrl+B</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSeparator />

        {/* Study Actions */}
        <ContextMenuSub>
          <ContextMenuSubTrigger className="cursor-pointer">
            <Highlighter className="w-4 h-4 mr-2" />
            Highlight
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem onClick={() => handleHighlight('yellow')} className="cursor-pointer">
              <div className="w-3 h-3 bg-yellow-300 rounded mr-2"></div>
              Yellow
            </ContextMenuItem>
            <ContextMenuItem onClick={() => handleHighlight('green')} className="cursor-pointer">
              <div className="w-3 h-3 bg-green-300 rounded mr-2"></div>
              Green
            </ContextMenuItem>
            <ContextMenuItem onClick={() => handleHighlight('blue')} className="cursor-pointer">
              <div className="w-3 h-3 bg-blue-300 rounded mr-2"></div>
              Blue
            </ContextMenuItem>
            <ContextMenuItem onClick={() => handleHighlight('pink')} className="cursor-pointer">
              <div className="w-3 h-3 bg-pink-300 rounded mr-2"></div>
              Pink
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuItem onClick={handleAddNote} className="cursor-pointer">
          <MessageCircle className="w-4 h-4 mr-2" />
          Add personal note
        </ContextMenuItem>

        {content?.type === 'verse' && (
          <ContextMenuItem onClick={handleSchedule} className="cursor-pointer">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule for study
          </ContextMenuItem>
        )}

        <ContextMenuSeparator />
        
        {/* Media Actions */}
        <ContextMenuItem onClick={handleListen} className="cursor-pointer">
          <Volume2 className="w-4 h-4 mr-2" />
          Listen to audio
          {content?.isArabic && (
            <Badge variant="secondary" className="ml-auto text-xs">Arabic</Badge>
          )}
        </ContextMenuItem>

        {content?.isArabic && (
          <ContextMenuItem onClick={handleTranslate} className="cursor-pointer">
            <Translate className="w-4 h-4 mr-2" />
            View translation
          </ContextMenuItem>
        )}
        
        <ContextMenuItem onClick={handleSearch} className="cursor-pointer">
          <Search className="w-4 h-4 mr-2" />
          Find similar content
        </ContextMenuItem>

        <ContextMenuSeparator />

        {/* Additional Actions */}
        <ContextMenuItem className="cursor-pointer">
          <Heart className="w-4 h-4 mr-2" />
          Add to favorites
        </ContextMenuItem>
        
        <ContextMenuItem onClick={handlePrint} className="cursor-pointer">
          <Printer className="w-4 h-4 mr-2" />
          Print
          <ContextMenuShortcut>Ctrl+P</ContextMenuShortcut>
        </ContextMenuItem>

        {content?.type === 'verse' && content.surahNumber && content.verseNumber && (
          <ContextMenuItem className="cursor-pointer">
            <ExternalLink className="w-4 h-4 mr-2" />
            View in context
            <Badge variant="outline" className="ml-auto text-xs">
              {content.surahNumber}:{content.verseNumber}
            </Badge>
          </ContextMenuItem>
        )}

        <ContextMenuSeparator />

        <ContextMenuItem className="cursor-pointer">
          <Repeat className="w-4 h-4 mr-2" />
          Add to daily review
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default EnhancedContextMenu;
