
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
  Settings,
  Calendar,
  Award,
  TrendingUp,
  Play,
  Pause,
  Volume2,
  Copy,
  RefreshCw,
  Zap,
  Plus,
  X,
  Star,
  ChevronRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface FloatingAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  action: () => void;
  color: string;
  category: 'primary' | 'secondary' | 'reading' | 'navigation' | 'audio' | 'utility';
  shortcut?: string;
  isEnabled: boolean;
  usageCount: number;
}

const EnhancedFloatingActionSystem: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [actions, setActions] = useState<FloatingAction[]>([]);

  // Initialize actions
  useEffect(() => {
    const defaultActions: FloatingAction[] = [
      {
        id: 'quran',
        title: 'Read Quran',
        description: 'Continue your spiritual journey',
        icon: BookOpen,
        action: () => navigate('/books?tab=quran'),
        color: 'from-emerald-500 to-teal-600',
        category: 'primary',
        isEnabled: true,
        usageCount: 0
      },
      {
        id: 'prayer',
        title: 'Prayer Times',
        description: 'Stay on schedule',
        icon: Clock,
        action: () => navigate('/calendar'),
        color: 'from-blue-500 to-indigo-600',
        category: 'primary',
        isEnabled: true,
        usageCount: 0
      },
      {
        id: 'qibla',
        title: 'Qibla Direction',
        description: 'Find prayer direction',
        icon: Compass,
        action: () => navigate('/calendar'),
        color: 'from-purple-500 to-violet-600',
        category: 'primary',
        isEnabled: true,
        usageCount: 0
      },
      {
        id: 'duas',
        title: 'Daily Duas',
        description: 'Connect with Allah',
        icon: Heart,
        action: () => navigate('/books?tab=duas'),
        color: 'from-rose-500 to-pink-600',
        category: 'primary',
        isEnabled: true,
        usageCount: 0
      },
      {
        id: 'search',
        title: 'Quick Search',
        description: 'Find verses and content',
        icon: Search,
        action: () => navigate('/books'),
        color: 'from-orange-500 to-red-500',
        category: 'secondary',
        shortcut: 'Ctrl+F',
        isEnabled: true,
        usageCount: 0
      },
      {
        id: 'voice-search',
        title: 'Voice Search',
        description: 'Search by voice',
        icon: Mic,
        action: () => toast({ title: 'Voice Search Active', description: 'Listening...' }),
        color: 'from-blue-500 to-cyan-500',
        category: 'secondary',
        isEnabled: false,
        usageCount: 0
      },
      {
        id: 'bookmark',
        title: 'Quick Bookmark',
        description: 'Save current content',
        icon: BookmarkPlus,
        action: () => toast({ title: 'Bookmark Added', description: 'Content saved' }),
        color: 'from-purple-500 to-indigo-500',
        category: 'utility',
        shortcut: 'Ctrl+B',
        isEnabled: true,
        usageCount: 0
      },
      {
        id: 'share',
        title: 'Quick Share',
        description: 'Share spiritual content',
        icon: Share2,
        action: () => toast({ title: 'Share Menu', description: 'Choose sharing option' }),
        color: 'from-green-500 to-emerald-500',
        category: 'utility',
        isEnabled: true,
        usageCount: 0
      },
      {
        id: 'calendar',
        title: 'Islamic Calendar',
        description: 'View events and dates',
        icon: Calendar,
        action: () => navigate('/calendar'),
        color: 'from-indigo-500 to-purple-500',
        category: 'navigation',
        isEnabled: true,
        usageCount: 0
      },
      {
        id: 'achievements',
        title: 'Achievements',
        description: 'View your progress',
        icon: Award,
        action: () => navigate('/'),
        color: 'from-yellow-500 to-orange-500',
        category: 'navigation',
        isEnabled: false,
        usageCount: 0
      }
    ];

    // Load saved configuration
    const savedActions = localStorage.getItem('floating-actions-config');
    if (savedActions) {
      setActions(JSON.parse(savedActions));
    } else {
      setActions(defaultActions);
    }

    // Check if user has interacted before
    const hasUsed = localStorage.getItem('floating-actions-used');
    setHasInteracted(!!hasUsed);
  }, [navigate, toast]);

  // Save configuration
  const saveConfig = (newActions: FloatingAction[]) => {
    setActions(newActions);
    localStorage.setItem('floating-actions-config', JSON.stringify(newActions));
  };

  // Toggle action enabled state
  const toggleAction = (actionId: string) => {
    const updatedActions = actions.map(action =>
      action.id === actionId
        ? { ...action, isEnabled: !action.isEnabled }
        : action
    );
    saveConfig(updatedActions);
    toast({
      title: 'Configuration Updated',
      description: 'Floating action menu updated',
    });
  };

  // Track usage and execute action
  const handleActionClick = useCallback((action: FloatingAction) => {
    // Track usage
    const updatedActions = actions.map(a =>
      a.id === action.id
        ? { ...a, usageCount: a.usageCount + 1 }
        : a
    );
    saveConfig(updatedActions);

    // Mark as interacted
    localStorage.setItem('floating-actions-used', 'true');
    setHasInteracted(true);
    
    // Show feedback
    toast({
      title: action.title,
      description: action.description,
      duration: 1500,
    });
    
    // Execute action
    setTimeout(() => {
      action.action();
      setIsExpanded(false);
    }, 200);
  }, [actions, toast]);

  // Get most used actions for quick access
  const mostUsedActions = useMemo(() => {
    return actions
      .filter(action => action.isEnabled)
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, 4);
  }, [actions]);

  // Get enabled actions by category
  const enabledActions = useMemo(() => {
    return actions.filter(action => action.isEnabled);
  }, [actions]);

  const primaryActions = enabledActions.filter(a => a.category === 'primary');
  const secondaryActions = enabledActions.filter(a => a.category === 'secondary');
  const utilityActions = enabledActions.filter(a => a.category === 'utility');

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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const action = actions.find(a => {
        if (!a.shortcut || !a.isEnabled) return false;
        if (a.shortcut === 'Ctrl+F') return e.key.toLowerCase() === 'f' && e.ctrlKey;
        if (a.shortcut === 'Ctrl+B') return e.key.toLowerCase() === 'b' && e.ctrlKey;
        return false;
      });

      if (action) {
        e.preventDefault();
        handleActionClick(action);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [actions, handleActionClick]);

  return (
    <div className="fixed bottom-6 right-4 z-50">
      {/* Expanded Actions Menu */}
      {isExpanded && (
        <div className="mb-4 animate-fade-in">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-md overflow-hidden max-w-xs">
            <CardContent className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-teal-600" />
                  <span className="font-semibold text-gray-800 text-sm">Quick Actions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs bg-teal-50 text-teal-700">
                    {enabledActions.length} actions
                  </Badge>
                  <Dialog open={isConfiguring} onOpenChange={setIsConfiguring}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Settings className="w-3 h-3" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Configure Quick Actions</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {actions.map((action) => {
                          const Icon = action.icon;
                          return (
                            <div key={action.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-r", action.color)}>
                                  <Icon className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-sm">{action.title}</div>
                                  <div className="text-xs text-gray-500">{action.description}</div>
                                  {action.usageCount > 0 && (
                                    <div className="text-xs text-blue-600">Used {action.usageCount} times</div>
                                  )}
                                </div>
                              </div>
                              <Switch
                                checked={action.isEnabled}
                                onCheckedChange={() => toggleAction(action.id)}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              
              {/* Most Used Actions */}
              {mostUsedActions.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Most Used</p>
                  <div className="grid grid-cols-2 gap-2">
                    {mostUsedActions.slice(0, 4).map((action) => {
                      const Icon = action.icon;
                      return (
                        <Button
                          key={action.id}
                          onClick={() => handleActionClick(action)}
                          className={cn("h-16 w-full rounded-xl text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95 bg-gradient-to-br", action.color)}
                        >
                          <div className="flex flex-col items-center gap-1">
                            <Icon className="w-4 h-4" />
                            <span className="text-xs font-medium text-center leading-tight">
                              {action.title.split(' ')[0]}
                            </span>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Primary Actions */}
              {primaryActions.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Essential</p>
                  <div className="space-y-1">
                    {primaryActions.map((action) => {
                      const Icon = action.icon;
                      return (
                        <Button
                          key={action.id}
                          onClick={() => handleActionClick(action)}
                          variant="ghost"
                          className="w-full justify-start h-10 px-3 text-left hover:bg-gray-50"
                        >
                          <Icon className="w-4 h-4 mr-3" />
                          <div className="flex-1">
                            <span className="text-sm font-medium">{action.title}</span>
                          </div>
                          <ChevronRight className="w-3 h-3 text-gray-400" />
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Secondary Actions */}
              {(secondaryActions.length > 0 || utilityActions.length > 0) && (
                <div>
                  <p className="text-xs text-gray-500 mb-2">More Actions</p>
                  <div className="space-y-1">
                    {[...secondaryActions, ...utilityActions].map((action) => {
                      const Icon = action.icon;
                      return (
                        <Button
                          key={action.id}
                          onClick={() => handleActionClick(action)}
                          variant="ghost"
                          className="w-full justify-start h-8 px-2 text-left hover:bg-gray-50"
                        >
                          <Icon className="w-3 h-3 mr-2" />
                          <span className="text-xs">{action.title}</span>
                          {action.shortcut && (
                            <Badge variant="outline" className="ml-auto text-xs">
                              {action.shortcut}
                            </Badge>
                          )}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Main Toggle Button */}
      <Button
        onClick={toggleExpanded}
        className={cn(
          "h-14 w-14 rounded-full shadow-xl transition-all duration-300 active:scale-90 relative overflow-hidden",
          isExpanded 
            ? 'bg-red-500 hover:bg-red-600 rotate-45' 
            : 'bg-gradient-to-br from-teal-500 via-emerald-500 to-green-600 hover:from-teal-600 hover:via-emerald-600 hover:to-green-700 hover:scale-110'
        )}
        size="icon"
        aria-label={isExpanded ? 'Close quick actions' : 'Open quick actions'}
      >
        {isExpanded ? (
          <X className="w-6 h-6 text-white relative z-10" />
        ) : (
          <Plus className="w-6 h-6 text-white relative z-10" />
        )}
        
        {/* Pulse rings for main button */}
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

export default EnhancedFloatingActionSystem;
