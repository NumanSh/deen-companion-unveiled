
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Clock } from 'lucide-react';
import { AthkarItem } from '../services/athkarService';

interface AthkarCardProps {
  athkar: AthkarItem;
  index: number;
  isExpanded: boolean;
  isFavorite: boolean;
  onToggleExpanded: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const AthkarCard = ({
  athkar,
  index,
  isExpanded,
  isFavorite,
  onToggleExpanded,
  onToggleFavorite
}: AthkarCardProps) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      morning: 'bg-orange-100 text-orange-800',
      evening: 'bg-indigo-100 text-indigo-800',
      after_prayer: 'bg-green-100 text-green-800',
      sleeping: 'bg-purple-100 text-purple-800',
      general: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <div className="space-y-1">
                <Badge className={getCategoryColor(athkar.category)}>
                  {athkar.category.replace('_', ' ')}
                </Badge>
                {athkar.repetitions && (
                  <Badge variant="outline" className="ml-2">
                    <Clock className="w-3 h-3 mr-1" />
                    {athkar.repetitions}x
                  </Badge>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleFavorite(athkar.id)}
              className="h-8 w-8"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-400'
                }`}
              />
            </Button>
          </div>

          {/* Arabic Text */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-xl leading-loose font-arabic text-right" dir="rtl">
              {athkar.arabic}
            </div>
          </div>

          {/* Transliteration and Translation */}
          {isExpanded && (
            <div className="space-y-3 border-t pt-4">
              {athkar.transliteration && (
                <div>
                  <h4 className="font-medium text-blue-600 mb-1">Transliteration:</h4>
                  <p className="text-sm italic text-gray-700 dark:text-gray-300">
                    {athkar.transliteration}
                  </p>
                </div>
              )}
              
              {athkar.translation && (
                <div>
                  <h4 className="font-medium text-green-600 mb-1">Translation:</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {athkar.translation}
                  </p>
                </div>
              )}

              {athkar.reference && (
                <div>
                  <h4 className="font-medium text-purple-600 mb-1">Reference:</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {athkar.reference}
                  </p>
                </div>
              )}

              {athkar.benefit && (
                <div>
                  <h4 className="font-medium text-orange-600 mb-1">Benefit:</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {athkar.benefit}
                  </p>
                </div>
              )}
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleExpanded(athkar.id)}
            className="text-xs"
          >
            {isExpanded ? 'Show less' : 'Show details'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AthkarCard;
