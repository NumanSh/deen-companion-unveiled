
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import EnhancedModernCard from '@/components/EnhancedModernCard';
import { 
  Search, 
  TrendingUp, 
  Clock, 
  Heart, 
  BookOpen, 
  Star,
  Filter,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'quran' | 'hadith' | 'dua' | 'article';
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  readTime: number;
  rating: number;
  isBookmarked: boolean;
  isRecent: boolean;
  tags: string[];
}

const SmartContentDiscovery = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'relevance' | 'recent' | 'popular' | 'rating'>('relevance');
  const [showFilters, setShowFilters] = useState(false);

  const [mockContent] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'Surah Al-Fatiha',
      subtitle: 'The Opening - Learn the meaning and pronunciation',
      type: 'quran',
      category: 'Essential Surahs',
      difficulty: 'beginner',
      readTime: 5,
      rating: 4.9,
      isBookmarked: true,
      isRecent: false,
      tags: ['daily', 'prayer', 'essential']
    },
    {
      id: '2',
      title: 'The Importance of Patience',
      subtitle: 'Beautiful hadith about Sabr in difficult times',
      type: 'hadith',
      category: 'Character Building',
      difficulty: 'intermediate',
      readTime: 8,
      rating: 4.8,
      isBookmarked: false,
      isRecent: true,
      tags: ['patience', 'character', 'trials']
    },
    {
      id: '3',
      title: 'Dua for Protection',
      subtitle: 'Morning and evening supplications',
      type: 'dua',
      category: 'Daily Duas',
      difficulty: 'beginner',
      readTime: 3,
      rating: 4.7,
      isBookmarked: true,
      isRecent: true,
      tags: ['protection', 'morning', 'evening']
    }
  ]);

  const filters = {
    type: ['quran', 'hadith', 'dua', 'article'],
    difficulty: ['beginner', 'intermediate', 'advanced'],
    category: ['Essential Surahs', 'Character Building', 'Daily Duas']
  };

  const filteredContent = mockContent.filter(item => {
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilters = selectedFilters.length === 0 || 
      selectedFilters.includes(item.type) ||
      selectedFilters.includes(item.difficulty) ||
      selectedFilters.includes(item.category);

    return matchesSearch && matchesFilters;
  });

  const sortedContent = [...filteredContent].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return (b.isRecent ? 1 : 0) - (a.isRecent ? 1 : 0);
      case 'popular':
        return b.rating - a.rating;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setSearchQuery('');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quran': return <BookOpen className="w-4 h-4 text-emerald-600" />;
      case 'hadith': return <Star className="w-4 h-4 text-blue-600" />;
      case 'dua': return <Heart className="w-4 h-4 text-rose-600" />;
      default: return <BookOpen className="w-4 h-4 text-gray-600" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters Header */}
      <EnhancedModernCard
        title="Discover Islamic Content"
        subtitle="Find personalized content based on your interests"
        icon={<Search className="w-5 h-5 text-blue-600" />}
        badge={`${sortedContent.length} results`}
        size="sm"
      >
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search Quran, Hadith, Duas, or articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
                {selectedFilters.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedFilters.length}
                  </Badge>
                )}
              </Button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-sm border rounded px-3 py-2"
              >
                <option value="relevance">Most Relevant</option>
                <option value="recent">Recently Added</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {(selectedFilters.length > 0 || searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear
              </Button>
            )}
          </div>

          {/* Filter Tags */}
          {showFilters && (
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
              {Object.entries(filters).map(([category, options]) => (
                <div key={category}>
                  <label className="text-sm font-medium text-gray-700 capitalize mb-2 block">
                    {category}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {options.map(option => (
                      <Button
                        key={option}
                        variant={selectedFilters.includes(option) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFilter(option)}
                        className="text-xs"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </EnhancedModernCard>

      {/* Content Results */}
      <div className="space-y-4">
        {sortedContent.map((item) => (
          <EnhancedModernCard
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            icon={getTypeIcon(item.type)}
            interactive
            onClick={() => {
              toast({
                title: `Opening ${item.title}`,
                description: item.subtitle,
                duration: 1500,
              });
            }}
            size="sm"
          >
            <div className="space-y-3">
              {/* Content Meta */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                  <Badge className={`text-xs ${getDifficultyColor(item.difficulty)}`}>
                    {item.difficulty}
                  </Badge>
                  {item.isRecent && (
                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                      New
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {item.readTime} min
                  <Star className="w-3 h-3 fill-current text-yellow-400" />
                  {item.rating}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {item.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button size="sm" className="flex-1">
                  Read Now
                </Button>
                <Button
                  variant={item.isBookmarked ? "default" : "outline"}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toast({
                      title: item.isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks',
                      description: item.title,
                    });
                  }}
                >
                  <Heart className={`w-4 h-4 ${item.isBookmarked ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>
          </EnhancedModernCard>
        ))}
      </div>

      {sortedContent.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h3 className="font-semibold mb-2">No content found</h3>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default SmartContentDiscovery;
