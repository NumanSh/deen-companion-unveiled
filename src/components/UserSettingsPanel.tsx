
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { 
  Settings, 
  BookOpen, 
  Brain, 
  Bell, 
  Palette, 
  Shield,
  Download,
  Upload,
  RotateCcw,
  Save
} from 'lucide-react';
import { useUserSettings } from '@/contexts/UserSettingsContext';
import { useToast } from '@/hooks/use-toast';

const UserSettingsPanel: React.FC = () => {
  const { settings, updateSettings, resetSettings, exportSettings, importSettings } = useUserSettings();
  const { toast } = useToast();
  const [importText, setImportText] = useState('');

  const handleExport = () => {
    const settingsData = exportSettings();
    navigator.clipboard.writeText(settingsData);
    toast({
      title: "Settings Exported",
      description: "Settings copied to clipboard",
    });
  };

  const handleImport = () => {
    if (importSettings(importText)) {
      toast({
        title: "Settings Imported",
        description: "Your settings have been updated",
      });
      setImportText('');
    } else {
      toast({
        title: "Import Failed",
        description: "Invalid settings format",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    resetSettings();
    toast({
      title: "Settings Reset",
      description: "All settings restored to defaults",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Settings className="w-8 h-8 text-blue-600" />
          User Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Customize your Islamic learning experience
        </p>
      </div>

      <Tabs defaultValue="reading" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="reading" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Reading
          </TabsTrigger>
          <TabsTrigger value="learning" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Learning
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Privacy
          </TabsTrigger>
        </TabsList>

        {/* Reading Preferences */}
        <TabsContent value="reading" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reading Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Arabic Font Size</Label>
                  <Select value={settings.arabicFontSize} onValueChange={(value: any) => updateSettings({ arabicFontSize: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="extra-large">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Translation Font Size</Label>
                  <Select value={settings.translationFontSize} onValueChange={(value: any) => updateSettings({ translationFontSize: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Preferred Reciter</Label>
                  <Select value={settings.preferredReciter} onValueChange={(value) => updateSettings({ preferredReciter: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mishary">Mishary Al-Afasy</SelectItem>
                      <SelectItem value="sudais">Abdul Rahman Al-Sudais</SelectItem>
                      <SelectItem value="minshawi">Mohamed Siddiq El-Minshawi</SelectItem>
                      <SelectItem value="husary">Mahmoud Khalil Al-Husary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Show Tajweed Colors</Label>
                  <Switch 
                    checked={settings.showTajweedColors} 
                    onCheckedChange={(checked) => updateSettings({ showTajweedColors: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Auto-play Audio</Label>
                  <Switch 
                    checked={settings.autoPlayAudio} 
                    onCheckedChange={(checked) => updateSettings({ autoPlayAudio: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Show Word-by-Word Translation</Label>
                  <Switch 
                    checked={settings.showWordByWord} 
                    onCheckedChange={(checked) => updateSettings({ showWordByWord: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Learning Preferences */}
        <TabsContent value="learning" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Learning Language</Label>
                  <Select value={settings.learningLanguage} onValueChange={(value: any) => updateSettings({ learningLanguage: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Difficulty Level</Label>
                  <Select value={settings.difficultyLevel} onValueChange={(value: any) => updateSettings({ difficultyLevel: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Daily Word Learning Goal: {settings.dailyWordGoal} words</Label>
                  <Slider
                    value={[settings.dailyWordGoal]}
                    onValueChange={([value]) => updateSettings({ dailyWordGoal: value })}
                    max={20}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Show Transliteration</Label>
                  <Switch 
                    checked={settings.showTransliteration} 
                    onCheckedChange={(checked) => updateSettings({ showTransliteration: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Daily Reflection Time</Label>
                <Input
                  type="time"
                  value={settings.dailyReflectionTime}
                  onChange={(e) => updateSettings({ dailyReflectionTime: e.target.value })}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Hadith Notifications</Label>
                  <Switch 
                    checked={settings.hadithNotifications} 
                    onCheckedChange={(checked) => updateSettings({ hadithNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Word Learning Reminders</Label>
                  <Switch 
                    checked={settings.wordLearningReminders} 
                    onCheckedChange={(checked) => updateSettings({ wordLearningReminders: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Motivational Quotes</Label>
                  <Switch 
                    checked={settings.motivationalQuotes} 
                    onCheckedChange={(checked) => updateSettings({ motivationalQuotes: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select value={settings.theme} onValueChange={(value: any) => updateSettings({ theme: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Color Scheme</Label>
                  <Select value={settings.colorScheme} onValueChange={(value: any) => updateSettings({ colorScheme: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teal">Teal</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Show Progress Bars</Label>
                  <Switch 
                    checked={settings.showProgressBars} 
                    onCheckedChange={(checked) => updateSettings({ showProgressBars: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Compact Mode</Label>
                  <Switch 
                    checked={settings.compactMode} 
                    onCheckedChange={(checked) => updateSettings({ compactMode: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sync Progress</Label>
                    <p className="text-sm text-gray-500">Sync your progress across devices</p>
                  </div>
                  <Switch 
                    checked={settings.syncProgress} 
                    onCheckedChange={(checked) => updateSettings({ syncProgress: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Share Usage Data</Label>
                    <p className="text-sm text-gray-500">Help improve the app by sharing anonymous usage data</p>
                  </div>
                  <Switch 
                    checked={settings.shareUsageData} 
                    onCheckedChange={(checked) => updateSettings({ shareUsageData: checked })}
                  />
                </div>
              </div>

              {/* Import/Export Settings */}
              <div className="border-t pt-6 space-y-4">
                <h3 className="font-semibold">Backup & Restore</h3>
                
                <div className="flex gap-2">
                  <Button onClick={handleExport} variant="outline" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Settings
                  </Button>
                  <Button onClick={handleReset} variant="outline" className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Reset to Defaults
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Import Settings</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Paste settings JSON here..."
                      value={importText}
                      onChange={(e) => setImportText(e.target.value)}
                    />
                    <Button onClick={handleImport} disabled={!importText.trim()}>
                      <Upload className="w-4 h-4 mr-2" />
                      Import
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserSettingsPanel;
