
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Plus, 
  BookOpen, 
  Clock, 
  Compass, 
  Mic, 
  Search,
  Settings,
  Home,
  Calendar,
  Heart,
  X,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import VoiceControls from './VoiceControls';
import SupportUsAdButton from './SupportUsAdButton';

interface FloatingAction {
  id: string;
  icon: React.ReactNode;
  label: string;
  action: () => void;
  color: string;
  badge?: string;
  priority: 'high' | 'medium' | 'low';
}

const EnhancedFloatingActionSystem: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [showVoiceControls, setShowVoiceControls] = useState(false);
  const [recentActions, setRecentActions] = useState<string[]>([]);

  // Store recent actions in localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recent-actions');
    if (stored) {
      setRecentActions(JSON.parse(stored));
    }
  }, []);

  const addToRecent = (actionId: string) => {
    const updated = [actionId, ...recentActions.filter(id => id !== actionId)].slice(0, 3);
    setRecentActions(updated);
    localStorage.setItem('recent-actions', JSON.stringify(updated));
  };

  const floatingActions: FloatingAction[] = [
    {
      id: 'home',
      icon: <Home className="w-5 h-5" />,
      label: 'Home',
      action: () => {
        navigate('/');
        addToRecent('home');
        toast({ title: 'Navigating to Home', duration: 1000 });
      },
      color: 'bg-emerald-500 hover:bg-emerald-600',
      priority: 'high'
    },
    {
      id: 'quran',
      icon: <BookOpen className="w-5 h-5" />,
      label: 'Read Quran',
      action: () => {
        navigate('/books');
        addToRecent('quran');
        toast({ title: 'Opening Quran', duration: 1000 });
      },
      color: 'bg-emerald-500 hover:bg-emerald-600',
      priority: 'high'
    },
    {
      id: 'prayer-times',
      icon: <Clock className="w-5 h-5" />,
      label: 'Prayer Times',
      action: () => {
        navigate('/prayer-times');
        addToRecent('prayer-times');
        toast({ title: 'Checking Prayer Times', duration: 1000 });
      },
      color: 'bg-blue-500 hover:bg-blue-600',
      priority: 'high'
    },
    {
      id: 'qibla',
      icon: <Compass className="w-5 h-5" />,
      label: 'Qibla Direction',
      action: () => {
        navigate('/calendar');
        addToRecent('qibla');
        toast({ title: 'Finding Qibla Direction', duration: 1000 });
      },
      color: 'bg-purple-500 hover:bg-purple-600',
      priority: 'high'
    },
    {
      id: 'voice-controls',
      icon: <Mic className="w-5 h-5" />,
      label: 'Voice Controls',
      action: () => {
        setShowVoiceControls(true);
        addToRecent('voice-controls');
        toast({ title: 'Opening Voice Controls', duration: 1000 });
      },
      color: 'bg-indigo-500 hover:bg-indigo-600',
      priority: 'medium'
    },
    {
      id: 'search',
      icon: <Search className="w-5 h-5" />,
      label: 'Search',
      action: () => {
        navigate('/books');
        addToRecent('search');
        toast({ title: 'Opening Search', duration: 1000 });
      },
      color: 'bg-orange-500 hover:bg-orange-600',
      priority: 'medium'
    },
    {
      id: 'calendar',
      icon: <Calendar className="w-5 h-5" />,
      label: 'Islamic Calendar',
      action: () => {
        navigate('/calendar');
        addToRecent('calendar');
        toast({ title: 'Opening Calendar', duration: 1000 });
      },
      color: 'bg-teal-500 hover:bg-teal-600',
      priority: 'medium'
    },
    {
      id: 'settings',
      icon: <Settings className="w-5 h-5" />,
      label: 'Settings',
      action: () => {
        navigate('/settings');
        addToRecent('settings');
        toast({ title: 'Opening Settings', duration: 1000 });
      },
      color: 'bg-gray-500 hover:bg-gray-600',
      priority: 'low'
    }
  ];

  // Filter actions based on current page and recent usage
  const getVisibleActions = () => {
    const currentPageActions = floatingActions.filter(action => {
      // Don't show current page action
      if (location.pathname === '/' && action.id === 'home') return false;
      if (location.pathname === '/books' && action.id === 'quran') return false;
      if (location.pathname === '/prayer-times' && action.id === 'prayer-times') return false;
      if (location.pathname === '/calendar' && action.id === 'calendar') return false;
      if (location.pathname === '/settings' && action.id === 'settings') return false;
      return true;
    });

    // Prioritize recent actions and high priority
    const sortedActions = currentPageActions.sort((a, b) => {
      const aRecent = recentActions.includes(a.id);
      const bRecent = recentActions.includes(b.id);
      
      if (aRecent && !bRecent) return -1;
      if (!aRecent && bRecent) return 1;
      
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    return isExpanded ? sortedActions : sortedActions.slice(0, 3);
  };

  const visibleActions = getVisibleActions();

  return (
    <>
      <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-3">
        {/* Support Us Button */}
        <SupportUsAdButton variant="floating" />
        
        {/* Action Buttons */}
        {visibleActions.map((action, index) => (
          <div
            key={action.id}
            className={`transform transition-all duration-300 ${
              isExpanded 
                ? 'translate-y-0 opacity-100' 
                : index < 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ 
              transitionDelay: isExpanded ? `${index * 50}ms` : '0ms' 
            }}
          >
            <div className="flex items-center gap-3">
              {/* Action Label */}
              <Card className={`
                bg-white/95 backdrop-blur-sm shadow-lg border-0 transition-all duration-200
                ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}
              `}>
                <CardContent className="px-3 py-1.5">
                  <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    {action.label}
                    {recentActions.includes(action.id) && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Recent
                      </Badge>
                    )}
                  </span>
                </CardContent>
              </Card>

              {/* Action Button */}
              <Button
                onClick={action.action}
                size="icon"
                className={`
                  w-12 h-12 rounded-full shadow-lg transition-all duration-200 
                  hover:scale-110 active:scale-95 text-white
                  ${action.color}
                `}
                aria-label={action.label}
                title={action.label}
              >
                {action.icon}
              </Button>
            </div>
          </div>
        ))}

        {/* Main Floating Action Button */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          size="icon"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-white"
          aria-label={isExpanded ? 'Close quick actions' : 'Open quick actions'}
          title={isExpanded ? 'Close quick actions' : 'Open quick actions'}
        >
          <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-45' : 'rotate-0'}`}>
            {isExpanded ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </div>
        </Button>

        {/* Expand/Collapse Indicator */}
        {!isExpanded && floatingActions.length > 3 && (
          <div className="absolute -top-2 right-2 pointer-events-none">
            <Badge variant="secondary" className="text-xs bg-teal-100 text-teal-700">
              +{floatingActions.length - 3}
            </Badge>
          </div>
        )}
      </div>

      {/* Voice Controls Modal */}
      {showVoiceControls && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-auto">
            <VoiceControls onClose={() => setShowVoiceControls(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default EnhancedFloatingActionSystem;
