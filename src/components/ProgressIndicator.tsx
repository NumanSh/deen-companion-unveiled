
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CheckCircle, Circle, Target } from 'lucide-react';

interface ProgressIndicatorProps {
  title: string;
  current: number;
  total: number;
  type?: 'reading' | 'memorization' | 'prayer' | 'dhikr' | 'general';
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  title,
  current,
  total,
  type = 'general',
  showDetails = true,
  size = 'md',
  className,
  animated = true
}) => {
  const percentage = Math.min((current / total) * 100, 100);
  const isComplete = current >= total;

  const typeColors = {
    reading: 'from-emerald-500 to-teal-600',
    memorization: 'from-purple-500 to-indigo-600',
    prayer: 'from-blue-500 to-cyan-600',
    dhikr: 'from-rose-500 to-pink-600',
    general: 'from-gray-500 to-slate-600'
  };

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={cn('space-y-2', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isComplete ? (
            <CheckCircle className="w-4 h-4 text-green-600" />
          ) : (
            <Circle className="w-4 h-4 text-gray-400" />
          )}
          <span className={cn('font-medium text-gray-700', textSizes[size])}>
            {title}
          </span>
        </div>
        
        {showDetails && (
          <div className="flex items-center gap-2">
            <Badge 
              variant={isComplete ? "default" : "secondary"}
              className={cn(
                'text-xs',
                isComplete && 'bg-green-100 text-green-800'
              )}
            >
              {current}/{total}
            </Badge>
            <span className={cn('text-gray-500 font-medium', textSizes[size])}>
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <Progress 
          value={percentage} 
          className={cn(
            sizeClasses[size],
            'overflow-hidden',
            animated && 'transition-all duration-500 ease-out'
          )}
        />
        
        {/* Custom gradient overlay */}
        <div 
          className={cn(
            'absolute top-0 left-0 h-full bg-gradient-to-r rounded-full transition-all duration-500',
            typeColors[type],
            animated && 'animate-pulse'
          )}
          style={{ width: `${percentage}%` }}
        />

        {/* Completion glow effect */}
        {isComplete && (
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse opacity-75" />
        )}
      </div>

      {/* Milestone indicators */}
      {showDetails && total > 10 && (
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Start</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>Complete</span>
        </div>
      )}

      {/* Achievement message */}
      {isComplete && (
        <div className="flex items-center gap-1 text-sm text-green-600 font-medium animate-fade-in">
          <Target className="w-4 h-4" />
          <span>Goal achieved! ✨</span>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;
