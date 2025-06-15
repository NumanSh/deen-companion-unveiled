
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Search, BookmarkPlus, Clock, Share2, X } from 'lucide-react';

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
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions = [
    {
      icon: Search,
      label: 'Quick Search',
      action: onQuickSearch,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: BookmarkPlus,
      label: 'Add Bookmark',
      action: onAddBookmark,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: Clock,
      label: 'Reading Timer',
      action: onStartTimer,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: Share2,
      label: 'Word Search',
      action: onWordSearch,
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {/* Expanded Actions */}
      {isExpanded && (
        <div className="mb-4 space-y-3 animate-fade-in">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="shadow-lg border-0 bg-white/95 backdrop-blur-sm"
            >
              <CardContent className="p-0">
                <Button
                  onClick={() => {
                    action.action();
                    setIsExpanded(false);
                  }}
                  className={`w-full justify-start gap-3 h-12 ${action.color} text-white border-0`}
                >
                  <action.icon className="w-5 h-5" />
                  <span className="font-medium">{action.label}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Main Action Button */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isExpanded 
            ? 'bg-red-500 hover:bg-red-600 rotate-45' 
            : 'bg-emerald-600 hover:bg-emerald-700'
        } text-white border-0`}
      >
        {isExpanded ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </Button>
    </div>
  );
};

export default FloatingQuickActions;
