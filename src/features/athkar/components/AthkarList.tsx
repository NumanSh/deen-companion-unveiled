
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AthkarItem } from '../services/athkarService';
import AthkarCard from './AthkarCard';

interface AthkarListProps {
  athkar: AthkarItem[];
  isLoading: boolean;
  expandedItems: Set<string>;
  favorites: Set<string>;
  onToggleExpanded: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const AthkarList = ({
  athkar,
  isLoading,
  expandedItems,
  favorites,
  onToggleExpanded,
  onToggleFavorite
}: AthkarListProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
          Loading Athkar...
        </CardContent>
      </Card>
    );
  }

  if (athkar.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          No Athkar found matching your search criteria.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {athkar.map((athkarItem, index) => (
        <AthkarCard
          key={athkarItem.id}
          athkar={athkarItem}
          index={index}
          isExpanded={expandedItems.has(athkarItem.id)}
          isFavorite={favorites.has(athkarItem.id)}
          onToggleExpanded={onToggleExpanded}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default AthkarList;
