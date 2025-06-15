
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string;
  gradient?: string;
  className?: string;
  headerActions?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const ModernCard: React.FC<ModernCardProps> = ({
  title,
  subtitle,
  children,
  icon,
  badge,
  gradient = 'from-gray-50 to-white',
  className,
  headerActions,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <Card className={cn(
      "relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group",
      "bg-gradient-to-br", gradient,
      className
    )}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M10 0l10 10-10 10L0 10z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      <CardHeader className={cn("relative z-10", sizeClasses[size])}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm group-hover:scale-110 transition-transform duration-200">
                {icon}
              </div>
            )}
            <div>
              <h3 className="font-bold text-lg text-gray-800 group-hover:text-gray-900 transition-colors">
                {title}
              </h3>
              {subtitle && (
                <p className="text-sm text-gray-600 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {badge && (
              <Badge variant="secondary" className="bg-white/70 text-gray-700 hover:bg-white transition-colors">
                {badge}
              </Badge>
            )}
            {headerActions}
          </div>
        </div>
      </CardHeader>

      <CardContent className={cn("relative z-10", sizeClasses[size], "pt-0")}>
        {children}
      </CardContent>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Card>
  );
};

export default ModernCard;
