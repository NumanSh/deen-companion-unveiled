
import React from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuShortcut,
} from '@/components/ui/context-menu';
import { 
  Copy, 
  Share2, 
  BookmarkPlus, 
  Download, 
  Heart,
  Volume2,
  Search,
  MessageCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EnhancedContextMenuProps {
  children: React.ReactNode;
  content?: {
    text?: string;
    title?: string;
    type?: 'verse' | 'hadith' | 'dua' | 'general';
  };
  onBookmark?: () => void;
  onShare?: () => void;
}

const EnhancedContextMenu: React.FC<EnhancedContextMenuProps> = ({
  children,
  content,
  onBookmark,
  onShare
}) => {
  const { toast } = useToast();

  const handleCopy = () => {
    if (content?.text) {
      navigator.clipboard.writeText(content.text);
      toast({
        title: 'Copied to clipboard',
        description: 'Text has been copied successfully',
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
          title: content.title || 'Islamic Content',
          text: content.text,
        });
      } else {
        handleCopy();
        toast({
          title: 'Ready to share',
          description: 'Content copied - you can now paste it anywhere',
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
      description: 'Content saved for later reading',
    });
  };

  const handleListen = () => {
    toast({
      title: 'Audio playback',
      description: 'Starting audio narration...',
    });
    // Audio functionality would be implemented here
  };

  const handleSearch = () => {
    toast({
      title: 'Searching...',
      description: 'Finding related content',
    });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className="cursor-context-menu">
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56 bg-white/95 backdrop-blur-sm border shadow-lg">
        <ContextMenuItem onClick={handleCopy} className="cursor-pointer">
          <Copy className="w-4 h-4 mr-2" />
          Copy text
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        
        <ContextMenuItem onClick={handleShare} className="cursor-pointer">
          <Share2 className="w-4 h-4 mr-2" />
          Share
          <ContextMenuShortcut>⌘S</ContextMenuShortcut>
        </ContextMenuItem>
        
        <ContextMenuItem onClick={handleBookmark} className="cursor-pointer">
          <BookmarkPlus className="w-4 h-4 mr-2" />
          Add to bookmarks
          <ContextMenuShortcut>⌘B</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSeparator />
        
        <ContextMenuItem onClick={handleListen} className="cursor-pointer">
          <Volume2 className="w-4 h-4 mr-2" />
          Listen
        </ContextMenuItem>
        
        <ContextMenuItem onClick={handleSearch} className="cursor-pointer">
          <Search className="w-4 h-4 mr-2" />
          Find similar content
        </ContextMenuItem>

        <ContextMenuSeparator />
        
        <ContextMenuItem className="cursor-pointer">
          <Heart className="w-4 h-4 mr-2" />
          Add to favorites
        </ContextMenuItem>
        
        <ContextMenuItem className="cursor-pointer">
          <MessageCircle className="w-4 h-4 mr-2" />
          Discuss this
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default EnhancedContextMenu;
