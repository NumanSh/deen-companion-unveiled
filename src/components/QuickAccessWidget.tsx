
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, X, RotateCcw, Book, Heart, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickAccessWidgetProps {
  onDhikr: () => void;
  onBookmarks: () => void;
  onQuran: () => void;
  onDuas: () => void;
}

const QuickAccessWidget: React.FC<QuickAccessWidgetProps> = ({
  onDhikr,
  onBookmarks,
  onQuran,
  onDuas
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions = [
    { icon: RotateCcw, label: 'Dhikr', action: onDhikr, color: 'bg-purple-500 hover:bg-purple-600' },
    { icon: Book, label: 'Quran', action: onQuran, color: 'bg-green-500 hover:bg-green-600' },
    { icon: Calendar, label: 'Duas', action: onDuas, color: 'bg-blue-500 hover:bg-blue-600' },
    { icon: Heart, label: 'Saved', action: onBookmarks, color: 'bg-red-500 hover:bg-red-600' },
  ];

  return (
    <div className="fixed bottom-24 right-4 z-40">
      {/* Quick Actions */}
      <div className={cn(
        "flex flex-col gap-2 mb-4 transition-all duration-300",
        isExpanded ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      )}>
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.label}
              size="icon"
              className={cn(
                "rounded-full shadow-lg w-12 h-12",
                action.color,
                "animate-in slide-in-from-bottom-2"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => {
                action.action();
                setIsExpanded(false);
              }}
              title={action.label}
            >
              <Icon className="w-5 h-5 text-white" />
            </Button>
          );
        })}
      </div>

      {/* Main Toggle Button */}
      <Button
        size="icon"
        className={cn(
          "rounded-full shadow-lg w-14 h-14 transition-all duration-300",
          isExpanded 
            ? "bg-gray-500 hover:bg-gray-600 rotate-45" 
            : "bg-emerald-500 hover:bg-emerald-600"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Plus className="w-6 h-6 text-white" />
        )}
      </Button>
    </div>
  );
};

export default QuickAccessWidget;
