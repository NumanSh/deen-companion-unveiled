
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  Compass, 
  Calendar, 
  Heart, 
  Search,
  Plus,
  X,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FloatingQuickAccess = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-hide after first interaction for cleaner UX
  useEffect(() => {
    const hasUsedBefore = localStorage.getItem('floating-access-used');
    if (hasUsedBefore) {
      setHasInteracted(true);
    }
  }, []);

  const quickActions = [
    {
      id: 'quran',
      title: 'Quran',
      icon: BookOpen,
      action: () => navigate('/books?tab=quran'),
      color: 'bg-emerald-500 hover:bg-emerald-600',
      description: 'Read & Study'
    },
    {
      id: 'prayer-times',
      title: 'Prayer',
      icon: Clock,
      action: () => navigate('/calendar'),
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Times & Tracker'
    },
    {
      id: 'qibla',
      title: 'Qibla',
      icon: Compass,
      action: () => navigate('/calendar'),
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'Find Direction'
    },
    {
      id: 'duas',
      title: 'Duas',
      icon: Heart,
      action: () => navigate('/books?tab=duas'),
      color: 'bg-rose-500 hover:bg-rose-600',
      description: 'Daily Supplications'
    },
    {
      id: 'search',
      title: 'Search',
      icon: Search,
      action: () => navigate('/books'),
      color: 'bg-orange-500 hover:bg-orange-600',
      description: 'Find Content'
    },
    {
      id: 'calendar',
      title: 'Calendar',
      icon: Calendar,
      action: () => navigate('/calendar'),
      color: 'bg-indigo-500 hover:bg-indigo-600',
      description: 'Islamic Dates'
    }
  ];

  const handleActionClick = (action: any) => {
    // Instant feedback principle - provide immediate confirmation
    toast({
      title: `Opening ${action.title}`,
      description: action.description,
      duration: 1500,
    });
    
    // Mark as used for personalization
    localStorage.setItem('floating-access-used', 'true');
    setHasInteracted(true);
    
    // Visual feedback with slight delay for better UX
    setTimeout(() => {
      action.action();
      setIsExpanded(false);
    }, 200);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    // Haptic feedback simulation through toast for interaction confirmation
    if (!isExpanded) {
      toast({
        title: "Quick Access",
        description: "Tap any action to navigate",
        duration: 2000,
      });
    }
  };

  return (
    <div className="fixed bottom-24 right-4 z-50">
      {/* Expanded Menu - Touch-friendly design with larger hit areas */}
      {isExpanded && (
        <div className="mb-4 animate-scale-in">
          <Card className="shadow-2xl border-2 border-teal-200/50 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-3">
              <div className="grid grid-cols-2 gap-3 w-40">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={action.id}
                      onClick={() => handleActionClick(action)}
                      className={`h-20 w-20 rounded-2xl text-white shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 ${action.color}`}
                      size="icon"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-medium leading-tight text-center">
                          {action.title}
                        </span>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Toggle Button - Larger touch target */}
      <Button
        onClick={toggleExpanded}
        className={`h-16 w-16 rounded-full shadow-2xl transition-all duration-300 active:scale-90 ${
          isExpanded 
            ? 'bg-red-500 hover:bg-red-600 rotate-45' 
            : 'bg-teal-600 hover:bg-teal-700 hover:scale-110'
        }`}
        size="icon"
      >
        {isExpanded ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <Zap className="w-7 h-7 text-white" />
        )}
      </Button>

      {/* First-time user hint */}
      {!hasInteracted && !isExpanded && (
        <div className="absolute -top-16 -left-20 bg-teal-600 text-white text-xs px-3 py-2 rounded-lg shadow-lg animate-fade-in">
          <div className="text-center">
            <p className="font-medium">Quick Access</p>
            <p className="opacity-90">Tap to explore</p>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-teal-600"></div>
        </div>
      )}
    </div>
  );
};

export default FloatingQuickAccess;
