
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Heart, Share2, BookOpen } from 'lucide-react';

interface ReflectionHeaderProps {
  isBookmarked: boolean;
  isLoading: boolean;
  onToggleBookmark: () => void;
  onShare: () => void;
  onRefresh: () => void;
}

const ReflectionHeader: React.FC<ReflectionHeaderProps> = ({
  isBookmarked,
  isLoading,
  onToggleBookmark,
  onShare,
  onRefresh
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-blue-600" />
        Daily Reflection
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleBookmark}
          className={isBookmarked ? 'text-red-500' : 'text-gray-400'}
        >
          <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onShare}
          className="text-gray-600"
        >
          <Share2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRefresh}
          disabled={isLoading}
          className="text-blue-600"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
    </div>
  );
};

export default ReflectionHeader;
