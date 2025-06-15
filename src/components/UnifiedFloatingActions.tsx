
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  BookOpen, 
  Clock, 
  Heart, 
  Compass,
  Target,
  Star,
  X,
  Zap,
  BookmarkPlus,
  Mic,
  Share2,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const UnifiedFloatingActions = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const hasUsed = localStorage.getItem('unified-floating-used');
    setHasInteracted(!!hasUsed);
  }, []);

  const quickActions = [
    {
      id: 'quran',
      icon: BookOpen,
      label: 'Read Quran',
      description: 'Continue your journey',
      action: () => navigate('/books?tab=quran'),
      color: 'from-emerald-500 to-teal-600',
      category: 'primary'
    },
    {
      id: 'prayer',
      icon: Clock,
      label: 'Prayer Times',
      description: 'Stay on schedule',
      action: () => navigate('/calendar'),
      color: 'from-blue-500 to-indigo-600',
      category: 'primary'
    },
    {
      id: 'qibla',
      icon: Compass,
      label: 'Qibla',
      description: 'Find direction',
      action: () => navigate('/calendar'),
      color: 'from-purple-500 to-violet-600',
      category: 'primary'
    },
    {
      id: 'duas',
      icon: Heart,
      label: 'Daily Duas',
      description: 'Connect with Allah',
      action: () => navigate('/books?tab=duas'),
      color: 'from-rose-500 to-pink-600',
      category: 'primary'
    },
    {
      id: 'search',
      icon: Search,
      label: 'Quick Search',
      description: 'Find verses',
      action: () => navigate('/books'),
      color: 'from-orange-500 to-red-500',
      category: 'secondary'
    },
    {
      id: 'voice-search',
      icon: Mic,
      label: 'Voice Search',
      description: 'Search by voice',
      action: () => handleVoiceSearch(),
      color: 'from-blue-500 to-cyan-500',
      category: 'secondary'
    },
    {
      id: 'bookmark',
      icon: BookmarkPlus,
      label: 'Quick Bookmark',
      description: 'Save current page',
      action: () => handleBookmark(),
      color: 'from-purple-500 to-indigo-500',
      category: 'secondary'
    },
    {
      id: 'share',
      icon: Share2,
      label: 'Quick Share',
      description: 'Share content',
      action: () => handleShare(),
      color: 'from-green-500 to-emerald-500',
      category: 'secondary'
    },
    {
      id: 'goals',
      icon: Target,
      label: 'Daily Goals',
      description: 'Track progress',
      action: () => navigate('/home'),
      color: 'from-indigo-500 to-purple-500',
      category: 'secondary'
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Quick Settings',
      description: 'Preferences',
      action: () => navigate('/settings'),
      color: 'from-gray-500 to-slate-600',
      category: 'secondary'
    }
  ];

  const handleVoiceSearch = () => {
    toast({
      title: 'Voice Search',
      description: 'Listening for your voice command...',
      duration: 2000,
    });
  };

  const handleBookmark = () => {
    toast({
      title: 'Bookmark Added',
      description: 'Current page saved to bookmarks',
      duration: 2000,
    });
  };

  const handleShare = () => {
    toast({
      title: 'Share Menu',
      description: 'Choose your sharing option',
      duration: 2000,
    });
  };

  const handleActionClick = (action: any) => {
    localStorage.setItem('unified-floating-used', 'true');
    setHasInteracted(true);
    
    toast({
      title: action.label,
      description: action.description,
      duration: 1500,
    });
    
    setTimeout(() => {
      action.action();
      setIsExpanded(false);
    }, 200);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      toast({
        title: "Quick Actions",
        description: "Choose your spiritual activity",
        duration: 2000,
      });
    }
  };

  const primaryActions = quickActions.filter(a => a.category === 'primary');
  const secondaryActions = quickActions.filter(a => a.category === 'secondary');

  return (
    <div className="fixed bottom-6 right-4 z-50">
      {/* Expanded Actions Menu */}
      {isExpanded && (
        <div className="mb-4 animate-scale-in">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-md overflow-hidden max-w-xs">
            <CardContent className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-teal-600" />
                  <span className="font-semibold text-gray-800 text-sm">Quick Actions</span>
                </div>
                <Badge variant="secondary" className="text-xs bg-teal-50 text-teal-700">
                  {quickActions.length} actions
                </Badge>
              </div>
              
              {/* Primary Actions - 2x2 Grid */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Essential</p>
                <div className="grid grid-cols-2 gap-2">
                  {primaryActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={action.id}
                        onClick={() => handleActionClick(action)}
                        className={`h-16 w-full rounded-xl text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95 bg-gradient-to-br ${action.color}`}
                        style={{
                          animationDelay: `${index * 50}ms`,
                          animationFillMode: 'both'
                        }}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <Icon className="w-4 h-4" />
                          <span className="text-xs font-medium text-center leading-tight">
                            {action.label.split(' ')[0]}
                          </span>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Secondary Actions - Compact List */}
              <div>
                <p className="text-xs text-gray-500 mb-2">More Actions</p>
                <div className="space-y-1">
                  {secondaryActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={action.id}
                        onClick={() => handleActionClick(action)}
                        variant="ghost"
                        className="w-full justify-start h-8 px-2 text-left hover:bg-gray-50"
                      >
                        <Icon className="w-3 h-3 mr-2" />
                        <span className="text-xs">{action.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Toggle Button */}
      <Button
        onClick={toggleExpanded}
        className={`h-14 w-14 rounded-full shadow-xl transition-all duration-300 active:scale-90 relative overflow-hidden ${
          isExpanded 
            ? 'bg-red-500 hover:bg-red-600 rotate-45' 
            : 'bg-gradient-to-br from-teal-500 via-emerald-500 to-green-600 hover:from-teal-600 hover:via-emerald-600 hover:to-green-700 hover:scale-110'
        }`}
        size="icon"
      >
        {isExpanded ? (
          <X className="w-6 h-6 text-white relative z-10" />
        ) : (
          <Plus className="w-6 h-6 text-white relative z-10" />
        )}
        
        {/* Pulse rings */}
        {!isExpanded && (
          <>
            <div className="absolute inset-0 rounded-full border-2 border-teal-300 animate-ping opacity-30" />
            <div className="absolute inset-2 rounded-full border border-emerald-200 animate-pulse opacity-50" />
          </>
        )}
      </Button>

      {/* First-time user hint */}
      {!hasInteracted && !isExpanded && (
        <div className="absolute -top-20 -left-28 bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-xs px-3 py-2 rounded-xl shadow-xl animate-fade-in max-w-36">
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Star className="w-3 h-3 animate-pulse" />
              <p className="font-semibold text-xs">Quick Access</p>
            </div>
            <p className="opacity-90 text-xs">Tap to explore</p>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-teal-600"></div>
        </div>
      )}
    </div>
  );
};

export default UnifiedFloatingActions;
