
import React, { useEffect } from 'react';
import EnhancedContextMenu from '@/components/EnhancedContextMenu';
import { cn } from '@/lib/utils';
import { voiceReadingService } from '@/services/voiceReadingService';

interface IslamicContentWrapperProps {
  children: React.ReactNode;
  content?: {
    text?: string;
    title?: string;
    type?: 'verse' | 'hadith' | 'dua' | 'general';
    surahNumber?: number;
    verseNumber?: number;
    isArabic?: boolean;
  };
  className?: string;
  onBookmark?: () => void;
  onShare?: () => void;
  onHighlight?: (color: string) => void;
  onAddNote?: () => void;
  selectable?: boolean;
}

const IslamicContentWrapper: React.FC<IslamicContentWrapperProps> = ({
  children,
  content,
  className,
  onBookmark,
  onShare,
  onHighlight,
  onAddNote,
  selectable = true
}) => {
  useEffect(() => {
    // Listen for voice bookmark events
    const handleVoiceBookmark = () => {
      if (onBookmark) {
        onBookmark();
      }
    };

    window.addEventListener('voice-bookmark', handleVoiceBookmark);
    return () => window.removeEventListener('voice-bookmark', handleVoiceBookmark);
  }, [onBookmark]);

  const handleVoiceReading = () => {
    if (content?.text) {
      voiceReadingService.speak(content.text);
    }
  };

  return (
    <EnhancedContextMenu
      content={content}
      onBookmark={onBookmark}
      onShare={onShare}
      onHighlight={onHighlight}
      onAddNote={onAddNote}
    >
      <div 
        className={cn(
          "transition-all duration-200",
          selectable && "select-text cursor-text hover:bg-gray-50/50 rounded-lg p-1",
          className
        )}
        onClick={handleVoiceReading}
        data-verse-text={content?.type === 'verse' ? content.text : undefined}
        data-hadith-text={content?.type === 'hadith' ? content.text : undefined}
        data-dua-text={content?.type === 'dua' ? content.text : undefined}
      >
        {children}
      </div>
    </EnhancedContextMenu>
  );
};

export default IslamicContentWrapper;
