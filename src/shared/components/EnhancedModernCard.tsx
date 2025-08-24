
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, MoreVertical } from 'lucide-react';

interface EnhancedModernCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string;
  gradient?: string;
  className?: string;
  headerActions?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  collapsible?: boolean;
  defaultExpanded?: boolean;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  priority?: 'low' | 'medium' | 'high';
  interactive?: boolean;
  onClick?: () => void;
}

const EnhancedModernCard: React.FC<EnhancedModernCardProps> = ({
  title,
  subtitle,
  children,
  icon,
  badge,
  gradient = 'from-gray-50 to-white',
  className,
  headerActions,
  size = 'md',
  collapsible = false,
  defaultExpanded = true,
  loading = false,
  error = null,
  onRetry,
  priority = 'medium',
  interactive = false,
  onClick
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const priorityClasses = {
    low: 'border-gray-200',
    medium: 'border-blue-200',
    high: 'border-red-200 shadow-lg'
  };

  const handleCardClick = () => {
    if (interactive && onClick) {
      onClick();
    }
  };

  const handleToggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <Card 
      className={cn(
        "relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group",
        "bg-gradient-to-br", gradient,
        priorityClasses[priority],
        interactive && "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
      onClick={handleCardClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={interactive ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      } : undefined}
    >
      {/* Priority indicator */}
      {priority === 'high' && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-orange-400" />
      )}

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M10 0l10 10-10 10L0 10z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      <CardHeader className={cn("relative z-10", sizeClasses[size])}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            {icon && (
              <div className="p-2 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm group-hover:scale-110 transition-transform duration-200">
                {icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-gray-800 group-hover:text-gray-900 transition-colors truncate">
                {title}
              </h3>
              {subtitle && (
                <p className="text-sm text-gray-600 mt-1 truncate">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            {badge && (
              <Badge variant="secondary" className="bg-white/70 text-gray-700 hover:bg-white transition-colors">
                {badge}
              </Badge>
            )}
            {headerActions}
            {collapsible && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleExpanded}
                className="h-8 w-8 p-0"
                aria-label={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? 
                  <ChevronUp className="w-4 h-4" /> : 
                  <ChevronDown className="w-4 h-4" />
                }
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      {/* Error State */}
      {error && (
        <CardContent className={cn("relative z-10", sizeClasses[size], "pt-0")}>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-700 text-sm mb-2">{error}</p>
            {onRetry && (
              <Button variant="outline" size="sm" onClick={onRetry}>
                Try Again
              </Button>
            )}
          </div>
        </CardContent>
      )}

      {/* Loading State */}
      {loading && (
        <CardContent className={cn("relative z-10", sizeClasses[size], "pt-0")}>
          <div className="space-y-3">
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </CardContent>
      )}

      {/* Content */}
      {!loading && !error && (
        <CardContent 
          className={cn(
            "relative z-10", 
            sizeClasses[size], 
            "pt-0",
            collapsible && !isExpanded && "hidden"
          )}
        >
          {children}
        </CardContent>
      )}

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Card>
  );
};

export default EnhancedModernCard;
