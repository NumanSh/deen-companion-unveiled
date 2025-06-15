
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Plus, 
  Search, 
  BookmarkPlus, 
  Clock, 
  X, 
  Zap, 
  BookOpen, 
  Heart,
  Target,
  Compass,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const EnhancedFloatingActions = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const hasUsed = localStorage.getItem('floating-actions-used');
    setHasInteracted(!!hasUsed);
  }, []);

  const quickActions = [
    {
      icon: Search,
      label: 'Quick Search',
      action: () => {
        navigate('/books');
        toast({
          title: 'Opening Search',
          description: 'Find verses and content quickly',
          duration: 1500,
        });
      },
      color: 'bg-blue-500 hover:bg-blue-600',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      icon: BookOpen,
      label: 'Read Quran',
      action: () => {
        navigate('/books');
        toast({
          title: 'Opening Quran',
          description: 'Continue your reading journey',
          duration: 1500,
        });
      },
      color: 'bg-emerald-500 hover:bg-emerald-600',
      lightColor: 'bg-emerald-50',
      textColor: 'text-emerald-700'
    },
    {
      icon: Clock,
      label: 'Prayer Times',
      action: () => {
        navigate('/calendar');
        toast({
          title: 'Prayer Times',
          description: 'Check prayer schedule',
          duration: 1500,
        });
      },
      color: 'bg-purple-500 hover:bg-purple-600',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      icon: Heart,
      label: 'Daily Duas',
      action: () => {
        navigate('/books');
        toast({
          title: 'Daily Duas',
          description: 'Access your supplications',
          duration: 1500,
        });
      },
      color: 'bg-rose-500 hover:bg-rose-600',
      lightColor: 'bg-rose-50',
      textColor: 'text-rose-700'
    },
    {
      icon: Compass,
      label: 'Qibla Direction',
      action: () => {
        navigate('/calendar');
        toast({
          title: 'Qibla Compass',
          description: 'Find prayer direction',
          duration: 1500,
        });
      },
      color: 'bg-orange-500 hover:bg-orange-600',
      lightColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    },
    {
      icon: Target,
      label: 'Daily Goals',
      action: () => {
        navigate('/home');
        toast({
          title: 'Daily Goals',
          description: 'Track your progress',
          duration: 1500,
        });
      },
      color: 'bg-indigo-500 hover:bg-indigo-600',
      lightColor: 'bg-indigo-50',
      textColor: 'text-indigo-700'
    }
  ];

  const handleActionClick = (action: any) => {
    localStorage.setItem('floating-actions-used', 'true');
    setHasInteracted(true);
    action.action();
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      toast({
        title: 'Quick Actions',
        description: 'Choose an action to continue',
        duration: 2000,
      });
    }
  };

  return (
    <div className="fixed bottom-28 right-6 z-50">
      {/* Expanded Actions Grid */}
      {isExpanded && (
        <div className="mb-4 animate-scale-in">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-3 w-72">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    onClick={() => handleActionClick(action)}
                    variant="outline"
                    className={`h-20 flex flex-col gap-2 transition-all duration-200 hover:scale-105 border-2 ${action.lightColor} hover:shadow-lg group`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <div className={`p-2 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-4 h-4" />
                    </div>
                    <span className={`text-xs font-medium ${action.textColor}`}>
                      {action.label}
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Toggle Button */}
      <Button
        onClick={toggleExpanded}
        className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 border-0 ${
          isExpanded 
            ? 'bg-red-500 hover:bg-red-600 rotate-45' 
            : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700'
        } text-white`}
      >
        {isExpanded ? (
          <X className="w-7 h-7" />
        ) : (
          <Zap className="w-7 h-7" />
        )}
      </Button>

      {/* Pulse indicator for new users */}
      {!hasInteracted && !isExpanded && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse">
          <div className="absolute inset-0 bg-red-400 rounded-full animate-ping"></div>
        </div>
      )}

      {/* Helper tooltip for first-time users */}
      {!hasInteracted && !isExpanded && (
        <div className="absolute -top-16 -left-24 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg animate-fade-in pointer-events-none">
          <div className="text-center">
            <p className="font-medium">Quick Actions</p>
            <p className="opacity-90">Tap to explore</p>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
};

export default EnhancedFloatingActions;
