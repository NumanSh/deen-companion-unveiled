
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Type, 
  Volume2, 
  Palette, 
  Moon, 
  Sun,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large' | 'xl';
  contrast: 'normal' | 'high';
  theme: 'light' | 'dark' | 'auto';
  readingMode: boolean;
  audioEnabled: boolean;
}

const AccessibilityEnhancements = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 'medium',
    contrast: 'normal',
    theme: 'auto',
    readingMode: false,
    audioEnabled: true
  });

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('accessibility-settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Font size
    const fontSizes = {
      small: '14px',
      medium: '16px',
      large: '18px',
      xl: '20px'
    };
    root.style.fontSize = fontSizes[settings.fontSize];
    
    // High contrast
    if (settings.contrast === 'high') {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Reading mode
    if (settings.readingMode) {
      root.classList.add('reading-mode');
    } else {
      root.classList.remove('reading-mode');
    }

    // Save to localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: 'Accessibility Updated',
      description: `${key} changed to ${value}`,
      duration: 1500,
    });
  };

  const resetSettings = () => {
    const defaultSettings: AccessibilitySettings = {
      fontSize: 'medium',
      contrast: 'normal',
      theme: 'auto',
      readingMode: false,
      audioEnabled: true
    };
    setSettings(defaultSettings);
    toast({
      title: 'Settings Reset',
      description: 'All accessibility settings restored to default',
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-blue-600" />
          Accessibility Settings
          <Badge variant="secondary">Easy Access</Badge>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Customize your reading and interaction experience
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Font Size Controls */}
        <div className="space-y-3">
          <label className="text-sm font-medium flex items-center gap-2">
            <Type className="w-4 h-4" />
            Text Size
          </label>
          <div className="flex gap-2">
            {(['small', 'medium', 'large', 'xl'] as const).map((size) => (
              <Button
                key={size}
                variant={settings.fontSize === size ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateSetting('fontSize', size)}
                className="flex items-center gap-1"
              >
                {size === 'small' && <ZoomOut className="w-3 h-3" />}
                {size === 'xl' && <ZoomIn className="w-3 h-3" />}
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Contrast Controls */}
        <div className="space-y-3">
          <label className="text-sm font-medium flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Contrast
          </label>
          <div className="flex gap-2">
            <Button
              variant={settings.contrast === 'normal' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateSetting('contrast', 'normal')}
            >
              Normal
            </Button>
            <Button
              variant={settings.contrast === 'high' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateSetting('contrast', 'high')}
            >
              High Contrast
            </Button>
          </div>
        </div>

        {/* Theme Controls */}
        <div className="space-y-3">
          <label className="text-sm font-medium flex items-center gap-2">
            <Sun className="w-4 h-4" />
            Theme
          </label>
          <div className="flex gap-2">
            {(['light', 'dark', 'auto'] as const).map((theme) => (
              <Button
                key={theme}
                variant={settings.theme === theme ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateSetting('theme', theme)}
                className="flex items-center gap-1"
              >
                {theme === 'light' && <Sun className="w-3 h-3" />}
                {theme === 'dark' && <Moon className="w-3 h-3" />}
                {theme === 'auto' && <Eye className="w-3 h-3" />}
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Toggle Options */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Reading Mode
            </label>
            <Button
              variant={settings.readingMode ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateSetting('readingMode', !settings.readingMode)}
            >
              {settings.readingMode ? 'Enabled' : 'Disabled'}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              Audio Feedback
            </label>
            <Button
              variant={settings.audioEnabled ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateSetting('audioEnabled', !settings.audioEnabled)}
            >
              {settings.audioEnabled ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
        </div>

        {/* Reset Button */}
        <div className="pt-4 border-t">
          <Button
            variant="outline"
            onClick={resetSettings}
            className="w-full flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Default
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessibilityEnhancements;
