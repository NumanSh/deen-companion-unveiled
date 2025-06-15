
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Search, BookmarkPlus, Clock, Share2, X, Zap, BookOpen, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FloatingQuickActionsProps {
  onQuickSearch: () => void;
  onWordSearch: () => void;
  onAddBookmark: () => void;
  onStartTimer: () => void;
}

const FloatingQuickActions: React.FC<FloatingQuickActionsProps> = ({
  onQuickSearch,
  onWordSearch,
  onAddBookmark,
  onStartTimer
}) => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions = [
    {
      icon: Search,
      label: 'Quick Search',
      action: () => {
        onQuickSearch();
        toast({
          title: 'Opening Search',
          description: 'Find verses and content quickly',
          duration: 1500,
        });
      },
      color: 'bg-blue-500 hover:bg-blue-600',
      shortcut: '⌘K'
    },
    {
      icon: BookmarkPlus,
      label: 'Add Bookmark',
      action: () => {
        onAddBookmark();
        toast({
          title: 'Bookmark Added',
          description: 'Save this content for later',
          duration: 1500,
        });
      },
      color: 'bg-purple-500 hover:bg-purple-600',
      shortcut: '⌘B'
    },
    {
      icon: Clock,
      label: 'Reading Timer',
      action: () => {
        onStartTimer();
        toast({
          title: 'Timer Started',
          description: 'Track your reading session',
          duration: 1500,
        });
      },
      color: 'bg-green-500 hover:bg-green-600',
      shortcut: '⌘T'
    },
    {
      icon: BookOpen,
      label: 'Word Search',
      action: () => {
        onWordSearch();
        toast({
          title: 'Word Search',
          description: 'Search for specific Arabic words',
          duration: 1500,
        });
      },
      color: 'bg-orange-500 hover:bg-orange-600',
      shortcut: '⌘W'
    }
  ];

  const handleActionClick = (action: any) => {
    action.action();
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      toast({
        title: 'Quick Actions',
        description: 'Choose an action to continue',
        duration: 2000,
      });
    }
  };

  return (
    <div className="fixed bottom-28 right-6 z-50">
      {/* Expanded Actions Menu */}
      {isExpanded && (
        <div className="mb-4 space-y-3 animate-fade-in-up">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="shadow-xl border-0 bg-white/95 backdrop-blur-sm transform transition-all duration-200 hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
              }}
            >
              <CardContent className="p-0">
                <Button
                  onClick={() => handleActionClick(action)}
                  className={`w-full justify-between gap-3 h-14 px-4 ${action.color} text-white border-0 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200`}
                >
                  <div className="flex items-center gap-3">
                    <action.icon className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium text-sm">{action.label}</div>
                      <div className="text-xs opacity-80">{action.shortcut}</div>
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Main Toggle Button */}
      <Button
        onClick={toggleExpanded}
        className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
          isExpanded 
            ? 'bg-red-500 hover:bg-red-600 rotate-45' 
            : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700'
        } text-white border-0`}
      >
        {isExpanded ? (
          <X className="w-7 h-7" />
        ) : (
          <Zap className="w-7 h-7" />
        )}
      </Button>

      {/* Floating hint for first-time users */}
      {!isExpanded && (
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
      )}
    </div>
  );
};

export default FloatingQuickActions;
