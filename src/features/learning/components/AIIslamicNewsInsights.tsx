
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Newspaper, Brain, Globe, TrendingUp, MessageSquare, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  islamicPerspective: string;
  relevanceScore: number;
  sources: string[];
  aiInsights: string;
  timestamp: Date;
  trending: boolean;
}

const AIIslamicNewsInsights = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const categories = [
    { value: 'all', label: 'All News' },
    { value: 'ummah', label: 'Ummah' },
    { value: 'education', label: 'Islamic Education' },
    { value: 'culture', label: 'Islamic Culture' },
    { value: 'world', label: 'Muslim World' }
  ];

  useEffect(() => {
    const mockNews: NewsItem[] = [
      {
        id: '1',
        title: 'New Islamic Studies Program Launched at Major University',
        summary: 'A comprehensive Islamic studies program focusing on contemporary issues has been introduced.',
        category: 'education',
        islamicPerspective: 'The pursuit of knowledge is highly emphasized in Islam. The Prophet (PBUH) said: "Seek knowledge from the cradle to the grave."',
        relevanceScore: 95,
        sources: ['Islamic Education Journal', 'University Press'],
        aiInsights: 'This development shows growing academic interest in Islamic studies, which could help bridge understanding between Muslim and non-Muslim communities.',
        timestamp: new Date(),
        trending: true
      },
      {
        id: '2',
        title: 'Global Muslim Youth Conference Addresses Climate Change',
        summary: 'Young Muslims worldwide are taking action on environmental issues through Islamic principles.',
        category: 'ummah',
        islamicPerspective: 'Islam teaches stewardship (Khalifa) of the Earth. Allah says: "And it is He who has made you successors upon the earth."',
        relevanceScore: 88,
        sources: ['Islamic Climate Action', 'Green Ummah'],
        aiInsights: 'The intersection of Islamic values and environmental activism represents a powerful force for positive change in climate action.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        trending: false
      },
      {
        id: '3',
        title: 'Digital Quran Learning Platforms See Surge in Usage',
        summary: 'Online Quran learning has increased by 200% in the past year across all age groups.',
        category: 'education',
        islamicPerspective: 'The Quran is the final revelation and a source of guidance for all humanity. Learning it in any format brings one closer to Allah.',
        relevanceScore: 92,
        sources: ['Digital Islamic Education Report', 'TechUmmah'],
        aiInsights: 'Technology is democratizing Islamic education, making quality Quranic learning accessible to Muslims worldwide regardless of location.',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        trending: true
      }
    ];

    setNews(mockNews);
  }, []);

  const refreshNews = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    toast({
      title: "News Updated",
      description: "Latest Islamic news and insights have been refreshed.",
    });
  };

  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ummah': return 'bg-green-100 text-green-800';
      case 'education': return 'bg-blue-100 text-blue-800';
      case 'culture': return 'bg-purple-100 text-purple-800';
      case 'world': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950 border-slate-200 dark:border-slate-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <Newspaper className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            <Brain className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
          </div>
          <span className="bg-gradient-to-r from-slate-700 to-gray-700 dark:from-slate-400 dark:to-gray-400 bg-clip-text text-transparent">
            AI Islamic News & Insights
          </span>
        </CardTitle>
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            AI-curated Islamic news with contextual insights
          </p>
          <Button onClick={refreshNews} disabled={isLoading} size="sm" variant="outline">
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <TrendingUp className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
              className={selectedCategory === category.value ? "bg-slate-600" : ""}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* News Items */}
        <div className="space-y-4">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">{item.title}</h4>
                  {item.trending && (
                    <Badge variant="destructive" className="text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-gray-500">{formatTimeAgo(item.timestamp)}</div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Badge className={getCategoryColor(item.category)}>
                  {categories.find(c => c.value === item.category)?.label}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Eye className="w-3 h-3" />
                  Relevance: {item.relevanceScore}%
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed">
                {item.summary}
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/50 p-3 rounded-lg mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-700 dark:text-blue-300">Islamic Perspective</span>
                </div>
                <p className="text-blue-600 dark:text-blue-400 text-sm">{item.islamicPerspective}</p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/50 p-3 rounded-lg mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-amber-600" />
                  <span className="font-medium text-amber-700 dark:text-amber-300">AI Analysis</span>
                </div>
                <p className="text-amber-600 dark:text-amber-400 text-sm">{item.aiInsights}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>Sources:</span>
                  {item.sources.map((source, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {source}
                    </Badge>
                  ))}
                </div>
                <Button size="sm" variant="ghost" className="text-slate-600">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  Discuss
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No news items found for this category.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIIslamicNewsInsights;
