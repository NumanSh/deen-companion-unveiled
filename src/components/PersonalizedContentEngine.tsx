
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Heart, Star, Clock, BookOpen, Sparkles, TrendingUp, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserPreference {
  category: string;
  weight: number;
  topics: string[];
}

interface ContentRecommendation {
  id: string;
  title: string;
  titleArabic: string;
  type: 'surah' | 'hadith' | 'dua' | 'article' | 'lecture';
  description: string;
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  relevanceScore: number;
  category: string;
  tags: string[];
  reason: string;
  isPersonalized: boolean;
}

const PersonalizedContentEngine = () => {
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<ContentRecommendation[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreference[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'for-you' | 'trending' | 'spiritual-growth'>('for-you');

  useEffect(() => {
    // Sample user preferences based on activity
    const preferences: UserPreference[] = [
      { category: 'Prayer & Worship', weight: 0.9, topics: ['salah', 'dua', 'dhikr'] },
      { category: 'Quran Study', weight: 0.8, topics: ['tafsir', 'recitation', 'memorization'] },
      { category: 'Personal Development', weight: 0.7, topics: ['character', 'patience', 'gratitude'] },
      { category: 'Spiritual Growth', weight: 0.6, topics: ['self-reflection', 'tawbah', 'taqwa'] }
    ];
    setUserPreferences(preferences);

    // AI-generated personalized recommendations
    const personalizedContent: ContentRecommendation[] = [
      {
        id: '1',
        title: 'The Power of Patience in Trials',
        titleArabic: 'قوة الصبر في المحن',
        type: 'article',
        description: 'Learn how the Quran and Sunnah guide us through difficult times with patience and trust in Allah.',
        estimatedTime: 8,
        difficulty: 'intermediate',
        relevanceScore: 95,
        category: 'Personal Development',
        tags: ['patience', 'trials', 'spiritual-strength'],
        reason: 'Based on your recent interest in character development and spiritual growth',
        isPersonalized: true
      },
      {
        id: '2',
        title: 'Surah Al-Ankabut: The Spider',
        titleArabic: 'سورة العنكبوت',
        type: 'surah',
        description: 'A powerful chapter about trials, faith, and Allah\'s wisdom in testing His servants.',
        estimatedTime: 25,
        difficulty: 'intermediate',
        relevanceScore: 92,
        category: 'Quran Study',
        tags: ['trials', 'faith', 'wisdom'],
        reason: 'Recommended based on your prayer consistency and Quran reading habits',
        isPersonalized: true
      },
      {
        id: '3',
        title: 'Dua for Seeking Forgiveness',
        titleArabic: 'دعاء الاستغفار',
        type: 'dua',
        description: 'Beautiful supplications for seeking Allah\'s forgiveness and mercy.',
        estimatedTime: 5,
        difficulty: 'beginner',
        relevanceScore: 88,
        category: 'Prayer & Worship',
        tags: ['forgiveness', 'mercy', 'tawbah'],
        reason: 'Perfect for your evening dhikr routine',
        isPersonalized: true
      },
      {
        id: '4',
        title: 'The Etiquette of Seeking Knowledge',
        titleArabic: 'آداب طلب العلم',
        type: 'hadith',
        description: 'Prophetic guidance on the proper way to seek and share Islamic knowledge.',
        estimatedTime: 12,
        difficulty: 'intermediate',
        relevanceScore: 85,
        category: 'Personal Development',
        tags: ['knowledge', 'etiquette', 'learning'],
        reason: 'Aligns with your interest in continuous Islamic learning',
        isPersonalized: false
      },
      {
        id: '5',
        title: 'Night Prayer: A Spiritual Journey',
        titleArabic: 'قيام الليل: رحلة روحانية',
        type: 'lecture',
        description: 'Discover the spiritual benefits and practical tips for establishing Tahajjud prayer.',
        estimatedTime: 45,
        difficulty: 'advanced',
        relevanceScore: 82,
        category: 'Spiritual Growth',
        tags: ['tahajjud', 'night-prayer', 'spirituality'],
        reason: 'Recommended for deepening your spiritual practice',
        isPersonalized: true
      }
    ];

    setRecommendations(personalizedContent);
  }, []);

  const categories = [
    { key: 'for-you', label: 'مخصص لك', icon: User },
    { key: 'all', label: 'جميع المحتوى', icon: BookOpen },
    { key: 'trending', label: 'الأكثر شيوعاً', icon: TrendingUp },
    { key: 'spiritual-growth', label: 'النمو الروحي', icon: Sparkles }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'surah': return '📖';
      case 'hadith': return '📜';
      case 'dua': return '🤲';
      case 'article': return '📝';
      case 'lecture': return '🎧';
      default: return '📚';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'surah': return 'bg-green-100 text-green-800';
      case 'hadith': return 'bg-purple-100 text-purple-800';
      case 'dua': return 'bg-blue-100 text-blue-800';
      case 'article': return 'bg-orange-100 text-orange-800';
      case 'lecture': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredRecommendations = recommendations.filter(item => {
    switch (selectedCategory) {
      case 'for-you':
        return item.isPersonalized;
      case 'trending':
        return item.relevanceScore > 85;
      case 'spiritual-growth':
        return item.category === 'Spiritual Growth' || item.tags.includes('spirituality');
      default:
        return true;
    }
  });

  const handleContentInteraction = (content: ContentRecommendation, action: 'like' | 'save' | 'start') => {
    toast({
      title: action === 'like' ? 'تم الإعجاب' : action === 'save' ? 'تم الحفظ' : 'بدء المحتوى',
      description: content.title,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-500" />
          محرك المحتوى الشخصي
        </CardTitle>
        <p className="text-sm text-gray-600">محتوى إسلامي مخصص بناءً على اهتماماتك وعاداتك</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AI Insights */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-purple-800">رؤى ذكية</span>
          </div>
          <p className="text-sm text-purple-700">
            بناءً على نشاطك الأخير، نوصي بالتركيز على تطوير الصبر والنمو الروحي.
            لديك اتساق ممتاز في الصلاة والأذكار! 🌟
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <Button
                key={category.key}
                size="sm"
                variant={selectedCategory === category.key ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.key as any)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </Button>
            );
          })}
        </div>

        {/* Recommendations Grid */}
        <div className="space-y-4">
          {filteredRecommendations.map(content => (
            <div key={content.id} className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
              {/* Content Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{getTypeIcon(content.type)}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{content.title}</h3>
                      {content.isPersonalized && (
                        <Badge className="bg-purple-100 text-purple-800 text-xs">
                          <Sparkles className="w-3 h-3 mr-1" />
                          مخصص
                        </Badge>
                      )}
                    </div>
                    <p className="text-right text-gray-600 text-sm" dir="rtl">{content.titleArabic}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{content.relevanceScore}%</span>
                </div>
              </div>

              {/* Content Details */}
              <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                {content.description}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className={getTypeColor(content.type)}>
                  {content.type}
                </Badge>
                <Badge className={getDifficultyColor(content.difficulty)}>
                  {content.difficulty === 'beginner' ? 'مبتدئ' : 
                   content.difficulty === 'intermediate' ? 'متوسط' : 'متقدم'}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {content.estimatedTime} دقيقة
                </Badge>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {content.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Personalization Reason */}
              {content.isPersonalized && (
                <div className="p-2 bg-blue-50 rounded text-sm text-blue-700 mb-3">
                  <span className="font-medium">لماذا هذا المحتوى؟ </span>
                  {content.reason}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleContentInteraction(content, 'start')}
                >
                  ابدأ الآن
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleContentInteraction(content, 'save')}
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleContentInteraction(content, 'like')}
                >
                  <Star className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Preference Learning */}
        <div className="p-4 border rounded-lg bg-gray-50">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-500" />
            تحليل تفضيلاتك
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {userPreferences.map(pref => (
              <div key={pref.category} className="flex justify-between items-center">
                <span className="text-sm font-medium">{pref.category}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${pref.weight * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">{Math.round(pref.weight * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalizedContentEngine;
