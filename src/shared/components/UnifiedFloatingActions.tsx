
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  Clock, 
  Heart, 
  Compass,
  Target,
  BookmarkPlus,
  Mic,
  Share2,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { FloatingActionMenu, FloatingActionButton } from '@/shared';

const UnifiedFloatingActions = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const hasUsed = localStorage.getItem('unified-floating-used');
    setHasInteracted(!!hasUsed);
  }, []);

  const handleVoiceSearch = useCallback(() => {
    toast({
      title: 'Voice Search',
      description: 'Listening for your voice command...',
      duration: 2000,
    });
  }, [toast]);

  const handleBookmark = useCallback(() => {
    toast({
      title: 'Bookmark Added',
      description: 'Current page saved to bookmarks',
      duration: 2000,
    });
  }, [toast]);

  const handleShare = useCallback(() => {
    toast({
      title: 'Share Menu',
      description: 'Choose your sharing option',
      duration: 2000,
    });
  }, [toast]);

  const quickActions = useMemo(() => [
    {
      id: 'quran',
      icon: BookOpen,
      label: 'Read Quran',
      description: 'Continue your journey',
      action: () => navigate('/books?tab=quran'),
      color: 'from-emerald-500 to-teal-600',
      category: 'primary' as const
    },
    {
      id: 'prayer',
      icon: Clock,
      label: 'Prayer Times',
      description: 'Stay on schedule',
      action: () => navigate('/calendar'),
      color: 'from-blue-500 to-indigo-600',
      category: 'primary' as const
    },
    {
      id: 'qibla',
      icon: Compass,
      label: 'Qibla',
      description: 'Find direction',
      action: () => navigate('/calendar'),
      color: 'from-purple-500 to-violet-600',
      category: 'primary' as const
    },
    {
      id: 'duas',
      icon: Heart,
      label: 'Daily Duas',
      description: 'Connect with Allah',
      action: () => navigate('/books?tab=duas'),
      color: 'from-rose-500 to-pink-600',
      category: 'primary' as const
    },
    {
      id: 'search',
      icon: Search,
      label: 'Quick Search',
      description: 'Find verses',
      action: () => navigate('/books'),
      color: 'from-orange-500 to-red-500',
      category: 'secondary' as const
    },
    {
      id: 'voice-search',
      icon: Mic,
      label: 'Voice Search',
      description: 'Search by voice',
      action: handleVoiceSearch,
      color: 'from-blue-500 to-cyan-500',
      category: 'secondary' as const
    },
    {
      id: 'bookmark',
      icon: BookmarkPlus,
      label: 'Quick Bookmark',
      description: 'Save current page',
      action: handleBookmark,
      color: 'from-purple-500 to-indigo-500',
      category: 'secondary' as const
    },
    {
      id: 'share',
      icon: Share2,
      label: 'Quick Share',
      description: 'Share content',
      action: handleShare,
      color: 'from-green-500 to-emerald-500',
      category: 'secondary' as const
    },
    {
      id: 'goals',
      icon: Target,
      label: 'Daily Goals',
      description: 'Track progress',
      action: () => navigate('/home'),
      color: 'from-indigo-500 to-purple-500',
      category: 'secondary' as const
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Quick Settings',
      description: 'Preferences',
      action: () => navigate('/settings'),
      color: 'from-gray-500 to-slate-600',
      category: 'secondary' as const
    }
  ], [navigate, handleVoiceSearch, handleBookmark, handleShare]);

  const handleActionClick = useCallback((action: any) => {
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
  }, [toast]);

  const toggleExpanded = useCallback(() => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      toast({
        title: "Quick Actions",
        description: "Choose your spiritual activity",
        duration: 2000,
      });
    }
  }, [isExpanded, toast]);

  return (
    <div className="fixed bottom-6 right-4 z-50">
      <FloatingActionMenu
        actions={quickActions}
        onActionClick={handleActionClick}
        isVisible={isExpanded}
      />
      
      <FloatingActionButton
        isExpanded={isExpanded}
        hasInteracted={hasInteracted}
        onToggle={toggleExpanded}
      />
    </div>
  );
};

export default UnifiedFloatingActions;
