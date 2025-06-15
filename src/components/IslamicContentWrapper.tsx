
import React from 'react';
import EnhancedContextMenu from '@/components/EnhancedContextMenu';
import { cn } from '@/lib/utils';

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
      >
        {children}
      </div>
    </EnhancedContextMenu>
  );
};

export default IslamicContentWrapper;
