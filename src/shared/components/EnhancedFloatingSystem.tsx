
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
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const EnhancedFloatingSystem = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const hasUsed = localStorage.getItem('floating-system-used');
    setHasInteracted(!!hasUsed);
  }, []); // TODO: Add missing dependencies;

  const quickActions = [
    {
      icon: BookOpen,
      label: 'Read Quran',
      description: 'Continue your journey',
      action: () => navigate('/books?tab=quran'),
      color: 'from-emerald-500 to-teal-600',
      hoverColor: 'hover:from-emerald-600 hover:to-teal-700',
      iconBg: 'bg-emerald-500',
      category: 'Reading'
    },
    {
      icon: Clock,
      label: 'Prayer Times',
      description: 'Stay on schedule',
      action: () => navigate('/calendar'),
      color: 'from-blue-500 to-indigo-600',
      hoverColor: 'hover:from-blue-600 hover:to-indigo-700',
      iconBg: 'bg-blue-500',
      category: 'Worship'
    },
    {
      icon: Search,
      label: 'Quick Search',
      description: 'Find verses instantly',
      action: () => navigate('/books'),
      color: 'from-orange-500 to-red-500',
      hoverColor: 'hover:from-orange-600 hover:to-red-600',
      iconBg: 'bg-orange-500',
      category: 'Search'
    },
    {
      icon: Heart,
      label: 'Daily Duas',
      description: 'Connect with Allah',
      action: () => navigate('/books?tab=duas'),
      color: 'from-rose-500 to-pink-600',
      hoverColor: 'hover:from-rose-600 hover:to-pink-700',
      iconBg: 'bg-rose-500',
      category: 'Dua'
    },
    {
      icon: Compass,
      label: 'Qibla Direction',
      description: 'Find the way',
      action: () => navigate('/calendar'),
      color: 'from-purple-500 to-violet-600',
      hoverColor: 'hover:from-purple-600 hover:to-violet-700',
      iconBg: 'bg-purple-500',
      category: 'Navigation'
    },
    {
      icon: Target,
      label: 'Daily Goals',
      description: 'Track progress',
      action: () => navigate('/home'),
      color: 'from-indigo-500 to-blue-600',
      hoverColor: 'hover:from-indigo-600 hover:to-blue-700',
      iconBg: 'bg-indigo-500',
      category: 'Goals'
    }
  ];

  const handleActionClick = (action: unknown) => {
    localStorage.setItem('floating-system-used', 'true');
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

  return (
    <div className="fixed bottom-24 right-4 z-50">
      {/* Expanded Actions Grid */}
      {isExpanded && (
        <div className="mb-4 animate-scale-in">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-md overflow-hidden">
            <CardContent className="p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Sparkles className="w-5 h-5 text-teal-600" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                  </div>
                  <span className="font-semibold text-gray-800">Quick Actions</span>
                </div>
                <Badge variant="secondary" className="text-xs bg-teal-50 text-teal-700">
                  {quickActions.length} actions
                </Badge>
              </div>
              
              {/* Actions Grid */}
              <div className="grid grid-cols-2 gap-3 w-64">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      onClick={() => handleActionClick(action)}
                      className={`h-24 w-full rounded-2xl text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden bg-gradient-to-br ${action.color} ${action.hoverColor}`}
                      style={{
                        animationDelay: `${index * 75}ms`,
                        animationFillMode: 'both'
                      }}
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700" />
                      
                      <div className="flex flex-col items-center gap-2 relative z-10">
                        <div className="relative">
                          <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-white/40 rounded-full group-hover:animate-ping" />
                        </div>
                        <div className="text-center">
                          <span className="text-sm font-semibold block leading-tight">
                            {action.label}
                          </span>
                          <span className="text-xs opacity-90 block mt-1">
                            {action.category}
                          </span>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Toggle Button */}
      <Button
        onClick={toggleExpanded}
        className={`h-16 w-16 rounded-full shadow-2xl transition-all duration-300 active:scale-90 relative overflow-hidden ${
          isExpanded 
            ? 'bg-red-500 hover:bg-red-600 rotate-45' 
            : 'bg-gradient-to-br from-teal-500 via-emerald-500 to-green-600 hover:from-teal-600 hover:via-emerald-600 hover:to-green-700 hover:scale-110'
        }`}
        size="icon"
      >
        {/* Animated background pulse */}
        {!isExpanded && (
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full" />
        )}
        
        {isExpanded ? (
          <X className="w-7 h-7 text-white relative z-10" />
        ) : (
          <Plus className="w-7 h-7 text-white relative z-10" />
        )}
        
        {/* Pulse rings */}
        {!isExpanded && (
          <>
            <div className="absolute inset-0 rounded-full border-2 border-teal-300 animate-ping opacity-30" />
            <div className="absolute inset-2 rounded-full border border-emerald-200 animate-pulse opacity-50" />
          </>
        )}
      </Button>

      {/* Enhanced first-time user hint */}
      {!hasInteracted && !isExpanded && (
        <div className="absolute -top-24 -left-32 bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-xs px-4 py-3 rounded-2xl shadow-xl animate-fade-in max-w-44">
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Star className="w-3 h-3 animate-pulse" />
              <p className="font-semibold">Quick Access</p>
              <Sparkles className="w-3 h-3 animate-pulse" />
            </div>
            <p className="opacity-90 text-xs">Tap to explore spiritual activities</p>
          </div>
          {/* Arrow pointer */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-8 border-transparent border-t-teal-600"></div>
        </div>
      )}
    </div>
  );
};

export default EnhancedFloatingSystem;
