
import React, { useState, useEffect } from 'react';

interface ContentItem {
  id: string;
  type: 'quran' | 'hadith' | 'article' | 'video';
  title: string;
  description: string;
  tags: string[];
  rating: number;
}

interface DiscoveryFilter {
  type: string[];
  tags: string[];
  rating: number;
  sortBy: 'relevance' | 'popularity' | 'date';
}import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, BookOpen, Heart, Clock, TrendingUp, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContentItem {
  id: string;
  type: 'surah' | 'dua' | 'hadith' | 'dhikr';
  title: string;
  subtitle?: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  popularity: number;
  category: string;
  isRecommended?: boolean;
}

const ContentDiscovery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'recommended' | 'trending' | 'beginner'>('recommended');
  const [discoveryContent, setDiscoveryContent] = useState<ContentItem[]>([]);

  useEffect(() => {
    // Mock content data - in real app, this would come from API
    const content: ContentItem[] = [
      {
        id: '1',
        type: 'surah',
        title: 'Surah Al-Mulk',
        subtitle: 'The Sovereignty',
        description: 'A powerful chapter that protects from the punishment of the grave',
        difficulty: 'beginner',
        estimatedTime: 15,
        popularity: 95,
        category: 'Protection',
        isRecommended: true
      },
      {
        id: '2',
        type: 'dua',
        title: 'Dua for Seeking Knowledge',
        description: 'Beautiful supplication for increasing in beneficial knowledge',
        difficulty: 'beginner',
        estimatedTime: 3,
        popularity: 88,
        category: 'Knowledge'
      },
      {
        id: '3',
        type: 'hadith',
        title: 'The Best of People',
        description: 'Hadith about the best people being those who benefit others',
        difficulty: 'intermediate',
        estimatedTime: 8,
        popularity: 92,
        category: 'Character',
        isRecommended: true
      },
      {
        id: '4',
        type: 'dhikr',
        title: 'Istighfar (100x)',
        subtitle: 'Seeking Forgiveness',
        description: 'Daily practice of seeking Allah\'s forgiveness',
        difficulty: 'beginner',
        estimatedTime: 10,
        popularity: 89,
        category: 'Forgiveness'
      },
      {
        id: '5',
        type: 'surah',
        title: 'Surah Ar-Rahman',
        subtitle: 'The Most Merciful',
        description: 'Beautiful chapter highlighting Allah\'s countless blessings',
        difficulty: 'intermediate',
        estimatedTime: 25,
        popularity: 94,
        category: 'Gratitude',
        isRecommended: true
      }
    ];

    setDiscoveryContent(content);
  }, []); // TODO: Add missing dependencies;

  const categories = [
    { key: 'recommended', label: 'Recommended', icon: Sparkles },
    { key: 'all', label: 'All Content', icon: BookOpen },
    { key: 'trending', label: 'Trending', icon: TrendingUp },
    { key: 'beginner', label: 'Beginner', icon: Star },
  ];

  const typeColors = {
    surah: 'bg-green-100 text-green-800',
    dua: 'bg-blue-100 text-blue-800',
    hadith: 'bg-purple-100 text-purple-800',
    dhikr: 'bg-orange-100 text-orange-800'
  };

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700'
  };

  const filteredContent = discoveryContent.filter(item => {
    switch (selectedCategory) {
      case 'recommended':
        return item.isRecommended;
      case 'trending':
        return item.popularity > 90;
      case 'beginner':
        return item.difficulty === 'beginner';
      default:
        return true;
    }
  });

  const handleContentSelect = (item: ContentItem) => {
    // Add to recently viewed
    const recentlyViewed = JSON.parse(localStorage.getItem('recently-viewed') || '[]');
    const updated = [item, ...recentlyViewed.filter((r: unknown) => r.id !== item.id)].slice(0, 10);
    localStorage.setItem('recently-viewed', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Discover Content</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Explore curated Islamic content based on your interests and level
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => {
          const Icon = category.icon;
          return (
            <Button
              key={category.key}
              variant={selectedCategory === category.key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.key as any)}
              className="flex items-center gap-2"
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </Button>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredContent.map(item => (
          <Card 
            key={item.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleContentSelect(item)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={cn("text-xs", typeColors[item.type])}>
                      {item.type}
                    </Badge>
                    <Badge variant="outline" className={cn("text-xs", difficultyColors[item.difficulty])}>
                      {item.difficulty}
                    </Badge>
                    {item.isRecommended && (
                      <Badge className="text-xs bg-yellow-100 text-yellow-800">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Recommended
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  {item.subtitle && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.subtitle}</p>
                  )}
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                {item.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.estimatedTime} min
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {item.popularity}%
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {item.category}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No content found for the selected category.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentDiscovery;
