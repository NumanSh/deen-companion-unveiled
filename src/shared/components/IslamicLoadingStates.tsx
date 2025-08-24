
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Heart, Star, BookOpen } from 'lucide-react';

interface IslamicLoadingStatesProps {
  type?: 'default' | 'reading' | 'search' | 'prayers';
  message?: string;
}

const IslamicLoadingStates: React.FC<IslamicLoadingStatesProps> = ({ 
  type = 'default',
  message 
}) => {
  const getLoadingContent = () => {
    switch (type) {
      case 'reading':
        return {
          icon: BookOpen,
          title: 'Preparing your reading...',
          subtitle: 'جاري تحضير القراءة...',
          color: 'text-emerald-600'
        };
      case 'search':
        return {
          icon: Star,
          title: 'Searching wisdom...',
          subtitle: 'جاري البحث في الحكمة...',
          color: 'text-blue-600'
        };
      case 'prayers':
        return {
          icon: Heart,
          title: 'Loading prayer times...',
          subtitle: 'جاري تحميل أوقات الصلاة...',
          color: 'text-purple-600'
        };
      default:
        return {
          icon: Heart,
          title: 'Loading...',
          subtitle: 'بركة الله معكم...',
          color: 'text-teal-600'
        };
    }
  };

  const content = getLoadingContent();
  const Icon = content.icon;

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      {/* Animated Icon */}
      <div className="relative">
        <div className={`animate-pulse ${content.color}`}>
          <Icon className="w-12 h-12" />
        </div>
        <div className="absolute inset-0 animate-ping opacity-25">
          <Icon className={`w-12 h-12 ${content.color}`} />
        </div>
      </div>

      {/* Loading Text */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">
          {message || content.title}
        </h3>
        <p className="text-sm text-gray-500" dir="rtl">
          {content.subtitle}
        </p>
      </div>

      {/* Islamic Pattern Loading Bar */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full animate-pulse" 
             style={{
               background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.8), transparent)',
               backgroundSize: '200% 100%',
               animation: 'shimmer 2s infinite'
             }} />
      </div>

      {/* Content Skeletons */}
      <div className="w-full max-w-md space-y-3">
        <Skeleton className="h-4 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
        <Skeleton className="h-4 w-2/3 mx-auto" />
      </div>
    </div>
  );
};

export default IslamicLoadingStates;
