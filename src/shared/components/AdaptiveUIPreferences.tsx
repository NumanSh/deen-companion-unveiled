
import React, { useState, useEffect } from 'react';

interface UIPreference {
  theme: 'light' | 'dark' | 'auto';
  fontSize: 'small' | 'medium' | 'large';
  language: string;
  animations: boolean;
  accessibility: {
    highContrast: boolean;
    reducedMotion: boolean;
    screenReader: boolean;
  };
}

interface AISuggestion {
  type: 'theme' | 'font' | 'layout';
  value: string;
  reason: string;
  confidence: number;
}import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Palette, 
  Type, 
  Layout, 
  Monitor, 
  Moon, 
  Sun, 
  Eye, 
  Brain,
  Settings,
  Smartphone,
  Tablet,
  RotateCcw,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UIPreferences {
  theme: 'light' | 'dark' | 'auto';
  fontSize: number;
  fontFamily: string;
  compactMode: boolean;
  animations: boolean;
  highContrast: boolean;
  layoutDensity: 'comfortable' | 'compact' | 'spacious';
  primaryColor: string;
  cardStyle: 'modern' | 'classic' | 'minimal';
  navigationStyle: 'sidebar' | 'tabs' | 'minimal';
}

interface UserBehavior {
  preferredReadingTime: number[];
  frequentFeatures: string[];
  sessionDuration: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  accessibilityNeeds: string[];
}

const AdaptiveUIPreferences = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<UIPreferences>({
    theme: 'auto',
    fontSize: 16,
    fontFamily: 'system',
    compactMode: false,
    animations: true,
    highContrast: false,
    layoutDensity: 'comfortable',
    primaryColor: 'blue',
    cardStyle: 'modern',
    navigationStyle: 'tabs'
  });

  const [userBehavior, setUserBehavior] = useState<UserBehavior>({
    preferredReadingTime: [20, 21], // 8-9 PM
    frequentFeatures: ['quran', 'prayer-times', 'duas'],
    sessionDuration: 25, // minutes
    deviceType: 'desktop',
    accessibilityNeeds: []
  });

  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);

  useEffect(() => {
    loadPreferences();
    analyzeUserBehavior();
    generateAISuggestions();
  }, []); // TODO: Add missing dependencies

  const loadPreferences = () => {
    const saved = localStorage.getItem('ui-preferences');
    if (saved) {
      setPreferences(JSON.parse(saved));
    }

    const behaviorData = localStorage.getItem('user-behavior');
    if (behaviorData) {
      setUserBehavior(JSON.parse(behaviorData));
    }
  };

  const savePreferences = (newPrefs: Partial<UIPreferences>) => {
    const updated = { ...preferences, ...newPrefs };
    setPreferences(updated);
    localStorage.setItem('ui-preferences', JSON.stringify(updated));
    applyUIChanges(updated);
    
    toast({
      title: 'UI Updated',
      description: 'Your interface preferences have been saved and applied.',
    });
  };

  const applyUIChanges = (prefs: UIPreferences) => {
    const root = document.documentElement;
    
    // Apply theme
    if (prefs.theme === 'dark') {
      root.classList.add('dark');
    } else if (prefs.theme === 'light') {
      root.classList.remove('dark');
    } else {
      // Auto theme based on time
      const hour = new Date().getHours();
      if (hour >= 20 || hour <= 6) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }

    // Apply font size
    root.style.setProperty('--base-font-size', `${prefs.fontSize}px`);
    
    // Apply high contrast
    if (prefs.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply primary color
    const colorMap = {
      blue: { primary: '59 130 246', secondary: '147 197 253' },
      green: { primary: '34 197 94', secondary: '134 239 172' },
      purple: { primary: '147 51 234', secondary: '196 181 253' },
      teal: { primary: '20 184 166', secondary: '153 246 228' }
    };
    
    const colors = colorMap[prefs.primaryColor as keyof typeof colorMap] || colorMap.blue;
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--primary-foreground', colors.secondary);
  };

  const analyzeUserBehavior = () => {
    // Simulate AI analysis of user behavior
    const currentHour = new Date().getHours();
    const screenWidth = window.innerWidth;
    
    let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
    if (screenWidth < 768) deviceType = 'mobile';
    else if (screenWidth < 1024) deviceType = 'tablet';

    setUserBehavior(prev => ({
      ...prev,
      deviceType,
      preferredReadingTime: currentHour >= 20 ? [20, 22] : [currentHour - 1, currentHour + 1]
    }));
  };

  const generateAISuggestions = () => {
    const suggestions = [];

    // Time-based suggestions
    const hour = new Date().getHours();
    if (hour >= 20 || hour <= 6) {
      suggestions.push({
        id: 'dark-mode',
        title: 'Enable Dark Mode',
        reason: 'It\'s evening/night time - dark mode reduces eye strain',
        action: () => savePreferences({ theme: 'dark' }),
        priority: 'high'
      });
    }

    // Device-based suggestions
    if (userBehavior.deviceType === 'mobile') {
      suggestions.push({
        id: 'compact-mode',
        title: 'Enable Compact Mode',
        reason: 'Mobile users benefit from more compact layouts',
        action: () => savePreferences({ compactMode: true, layoutDensity: 'compact' }),
        priority: 'medium'
      });
    }

    // Usage pattern suggestions
    if (userBehavior.sessionDuration > 30) {
      suggestions.push({
        id: 'comfort-settings',
        title: 'Optimize for Long Reading',
        reason: 'Your sessions are typically long - these settings reduce eye fatigue',
        action: () => savePreferences({ fontSize: 18, animations: false }),
        priority: 'medium'
      });
    }

    setAiSuggestions(suggestions);
  };

  const resetToDefaults = () => {
    const defaults: UIPreferences = {
      theme: 'auto',
      fontSize: 16,
      fontFamily: 'system',
      compactMode: false,
      animations: true,
      highContrast: false,
      layoutDensity: 'comfortable',
      primaryColor: 'blue',
      cardStyle: 'modern',
      navigationStyle: 'tabs'
    };
    
    savePreferences(defaults);
    toast({
      title: 'Reset Complete',
      description: 'All UI preferences have been reset to defaults.',
    });
  };

  const applyAISuggestion = (suggestion: unknown) => {
    suggestion.action();
    toast({
      title: 'AI Suggestion Applied',
      description: suggestion.title,
    });
  };

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-6 h-6 text-indigo-600" />
          Adaptive UI Preferences
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Intelligent interface that learns and adapts to your preferences
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AI Suggestions */}
        {aiSuggestions.length > 0 && (
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-800/30 dark:to-indigo-800/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-700 dark:text-blue-300">AI Suggestions</span>
            </div>
            <div className="space-y-2">
              {aiSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{suggestion.title}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{suggestion.reason}</div>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => applyAISuggestion(suggestion)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    Apply
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Theme Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Theme & Appearance
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Theme Mode</label>
              <Select value={preferences.theme} onValueChange={(value: unknown) => savePreferences({ theme: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4" />
                      Light
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center gap-2">
                      <Moon className="w-4 h-4" />
                      Dark
                    </div>
                  </SelectItem>
                  <SelectItem value="auto">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      Auto (Smart)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Primary Color</label>
              <Select value={preferences.primaryColor} onValueChange={(value) => savePreferences({ primaryColor: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="teal">Teal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Typography Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Type className="w-5 h-5" />
            Typography & Reading
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Font Size: {preferences.fontSize}px</label>
              <Slider
                value={[preferences.fontSize]}
                onValueChange={([value]) => savePreferences({ fontSize: value })}
                min={12}
                max={24}
                step={1}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-medium">High Contrast</div>
                <div className="text-sm text-gray-600">Better readability for accessibility</div>
              </div>
              <Switch
                checked={preferences.highContrast}
                onCheckedChange={(checked) => savePreferences({ highContrast: checked })}
              />
            </div>
          </div>
        </div>

        {/* Layout Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Layout className="w-5 h-5" />
            Layout & Interaction
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Layout Density</label>
              <Select value={preferences.layoutDensity} onValueChange={(value: unknown) => savePreferences({ layoutDensity: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="comfortable">Comfortable</SelectItem>
                  <SelectItem value="spacious">Spacious</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-medium">Compact Mode</div>
                <div className="text-sm text-gray-600">Optimized for smaller screens</div>
              </div>
              <Switch
                checked={preferences.compactMode}
                onCheckedChange={(checked) => savePreferences({ compactMode: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-medium">Animations</div>
                <div className="text-sm text-gray-600">Smooth transitions and effects</div>
              </div>
              <Switch
                checked={preferences.animations}
                onCheckedChange={(checked) => savePreferences({ animations: checked })}
              />
            </div>
          </div>
        </div>

        {/* Device Optimization */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Smartphone className="w-5 h-5 text-gray-600" />
            <span className="font-medium">Device Optimization</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Detected Device:</span>
              <div className="font-medium capitalize">{userBehavior.deviceType}</div>
            </div>
            <div>
              <span className="text-gray-600">Optimal Reading Time:</span>
              <div className="font-medium">{userBehavior.preferredReadingTime[0]}:00 - {userBehavior.preferredReadingTime[1]}:00</div>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={resetToDefaults}
            className="w-full"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdaptiveUIPreferences;
