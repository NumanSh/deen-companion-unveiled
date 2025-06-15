
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, X, Star } from 'lucide-react';

interface FloatingActionButtonProps {
  isExpanded: boolean;
  hasInteracted: boolean;
  onToggle: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  isExpanded,
  hasInteracted,
  onToggle
}) => {
  return (
    <>
      {/* Main Toggle Button */}
      <Button
        onClick={onToggle}
        className={`h-14 w-14 rounded-full shadow-xl transition-all duration-300 active:scale-90 relative overflow-hidden ${
          isExpanded 
            ? 'bg-red-500 hover:bg-red-600 rotate-45' 
            : 'bg-gradient-to-br from-teal-500 via-emerald-500 to-green-600 hover:from-teal-600 hover:via-emerald-600 hover:to-green-700 hover:scale-110'
        }`}
        size="icon"
        aria-label={isExpanded ? 'Close quick actions' : 'Open quick actions'}
      >
        {isExpanded ? (
          <X className="w-6 h-6 text-white relative z-10" />
        ) : (
          <Plus className="w-6 h-6 text-white relative z-10" />
        )}
        
        {/* Pulse rings */}
        {!isExpanded && (
          <>
            <div className="absolute inset-0 rounded-full border-2 border-teal-300 animate-ping opacity-30" />
            <div className="absolute inset-2 rounded-full border border-emerald-200 animate-pulse opacity-50" />
          </>
        )}
      </Button>

      {/* First-time user hint */}
      {!hasInteracted && !isExpanded && (
        <div className="absolute -top-20 -left-28 bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-xs px-3 py-2 rounded-xl shadow-xl animate-fade-in max-w-36">
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Star className="w-3 h-3 animate-pulse" />
              <p className="font-semibold text-xs">Quick Access</p>
            </div>
            <p className="opacity-90 text-xs">Tap to explore</p>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-teal-600"></div>
        </div>
      )}
    </>
  );
};

export default FloatingActionButton;
