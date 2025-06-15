
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
  Zap,
  Target,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FloatingQuickAccess = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

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
      description: 'Read & Study',
      gradient: 'from-emerald-400 to-emerald-600'
    },
    {
      id: 'prayer-times',
      title: 'Prayer',
      icon: Clock,
      action: () => navigate('/calendar'),
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Times & Tracker',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      id: 'qibla',
      title: 'Qibla',
      icon: Compass,
      action: () => navigate('/calendar'),
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'Find Direction',
      gradient: 'from-purple-400 to-purple-600'
    },
    {
      id: 'duas',
      title: 'Duas',
      icon: Heart,
      action: () => navigate('/books?tab=duas'),
      color: 'bg-rose-500 hover:bg-rose-600',
      description: 'Daily Supplications',
      gradient: 'from-rose-400 to-rose-600'
    },
    {
      id: 'search',
      title: 'Search',
      icon: Search,
      action: () => navigate('/books'),
      color: 'bg-orange-500 hover:bg-orange-600',
      description: 'Find Content',
      gradient: 'from-orange-400 to-orange-600'
    },
    {
      id: 'goals',
      title: 'Goals',
      icon: Target,
      action: () => navigate('/home'),
      color: 'bg-indigo-500 hover:bg-indigo-600',
      description: 'Track Progress',
      gradient: 'from-indigo-400 to-indigo-600'
    }
  ];

  const handleActionClick = (action: any) => {
    toast({
      title: `Opening ${action.title}`,
      description: action.description,
      duration: 1500,
    });
    
    localStorage.setItem('floating-access-used', 'true');
    setHasInteracted(true);
    
    setTimeout(() => {
      action.action();
      setIsExpanded(false);
    }, 200);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
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
      {/* Enhanced Expanded Menu */}
      {isExpanded && (
        <div className="mb-4 animate-scale-in">
          <Card className="shadow-2xl border-2 border-teal-200/30 bg-white/95 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-teal-600" />
                  <span className="font-semibold text-gray-700 text-sm">Quick Actions</span>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {quickActions.length} actions
                </span>
              </div>
              
              {/* Actions Grid */}
              <div className="grid grid-cols-2 gap-3 w-48">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={action.id}
                      onClick={() => handleActionClick(action)}
                      className={`h-20 w-20 rounded-2xl text-white shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 group relative overflow-hidden ${action.color}`}
                      size="icon"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animationFillMode: 'both'
                      }}
                    >
                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-200`} />
                      
                      <div className="flex flex-col items-center gap-1 relative z-10">
                        <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                        <span className="text-xs font-medium leading-tight text-center">
                          {action.title}
                        </span>
                      </div>
                      
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700" />
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Enhanced Main Toggle Button */}
      <Button
        onClick={toggleExpanded}
        className={`h-16 w-16 rounded-full shadow-2xl transition-all duration-300 active:scale-90 relative overflow-hidden ${
          isExpanded 
            ? 'bg-red-500 hover:bg-red-600 rotate-45' 
            : 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 hover:scale-110'
        }`}
        size="icon"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-500 opacity-0 hover:opacity-20 transition-opacity duration-300" />
        
        {isExpanded ? (
          <X className="w-7 h-7 text-white relative z-10" />
        ) : (
          <Zap className="w-7 h-7 text-white relative z-10" />
        )}
        
        {/* Pulse ring */}
        {!isExpanded && (
          <div className="absolute inset-0 rounded-full border-2 border-teal-300 animate-ping opacity-50" />
        )}
      </Button>

      {/* Enhanced first-time user hint */}
      {!hasInteracted && !isExpanded && (
        <div className="absolute -top-20 -left-28 bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-xs px-4 py-3 rounded-xl shadow-xl animate-fade-in max-w-40">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-3 h-3" />
              <p className="font-semibold">Quick Access</p>
            </div>
            <p className="opacity-90 text-xs">Tap to explore amazing features</p>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-teal-600"></div>
        </div>
      )}
    </div>
  );
};

export default FloatingQuickAccess;
