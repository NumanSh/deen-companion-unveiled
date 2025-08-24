
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Type, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Palette,
  Eye,
  Moon,
  Sun,
  Contrast,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TypographySettings {
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  fontFamily: string;
  textAlign: 'left' | 'center' | 'right';
  colorScheme: 'light' | 'dark' | 'sepia' | 'high-contrast';
  arabicFont: string;
  translationFont: string;
  verseSpacing: number;
}

const EnhancedTypographyControls = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<TypographySettings>({
    fontSize: 18,
    lineHeight: 1.8,
    letterSpacing: 0.5,
    fontFamily: 'Traditional',
    textAlign: 'right',
    colorScheme: 'light',
    arabicFont: 'Uthmanic',
    translationFont: 'Noto Sans',
    verseSpacing: 24
  });

  const arabicFonts = [
    { id: 'uthmanic', name: 'الخط الأثماني', preview: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' },
    { id: 'naskh', name: 'النسخ', preview: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' },
    { id: 'kufi', name: 'الكوفي', preview: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' },
    { id: 'thuluth', name: 'الثلث', preview: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' }
  ];

  const translationFonts = [
    { id: 'noto-sans', name: 'Noto Sans', preview: 'In the name of Allah, the Gracious, the Merciful' },
    { id: 'open-sans', name: 'Open Sans', preview: 'In the name of Allah, the Gracious, the Merciful' },
    { id: 'roboto', name: 'Roboto', preview: 'In the name of Allah, the Gracious, the Merciful' },
    { id: 'lato', name: 'Lato', preview: 'In the name of Allah, the Gracious, the Merciful' }
  ];

  const colorSchemes = [
    { 
      id: 'light', 
      name: 'فاتح', 
      icon: Sun, 
      preview: 'bg-white text-gray-900',
      description: 'خلفية بيضاء مع نص داكن'
    },
    { 
      id: 'dark', 
      name: 'داكن', 
      icon: Moon, 
      preview: 'bg-gray-900 text-white',
      description: 'خلفية داكنة مع نص فاتح'
    },
    { 
      id: 'sepia', 
      name: 'بني دافئ', 
      icon: Eye, 
      preview: 'bg-amber-50 text-amber-900',
      description: 'ألوان دافئة مريحة للعين'
    },
    { 
      id: 'high-contrast', 
      name: 'تباين عالي', 
      icon: Contrast, 
      preview: 'bg-black text-yellow-400',
      description: 'تباين عالي لضعاف البصر'
    }
  ];

  useEffect(() => {
    // Load saved settings
    const saved = localStorage.getItem('typography-settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []); // TODO: Add missing dependencies;

  const updateSetting = (key: keyof TypographySettings, value: unknown) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('typography-settings', JSON.stringify(newSettings));
  };

  const resetToDefaults = () => {
    const defaultSettings: TypographySettings = {
      fontSize: 18,
      lineHeight: 1.8,
      letterSpacing: 0.5,
      fontFamily: 'Traditional',
      textAlign: 'right',
      colorScheme: 'light',
      arabicFont: 'Uthmanic',
      translationFont: 'Noto Sans',
      verseSpacing: 24
    };
    setSettings(defaultSettings);
    localStorage.setItem('typography-settings', JSON.stringify(defaultSettings));
    toast({
      title: 'تم إعادة التعيين',
      description: 'تم استعادة الإعدادات الافتراضية',
    });
  };

  const savePreset = () => {
    toast({
      title: 'تم حفظ الإعدادات',
      description: 'تم حفظ تفضيلاتك للطباعة بنجاح',
    });
  };

  return (
    <div className="space-y-6">
      {/* Preview Section */}
      <Card className={`transition-all duration-300 ${
        settings.colorScheme === 'dark' ? 'bg-gray-900 text-white' :
        settings.colorScheme === 'sepia' ? 'bg-amber-50 text-amber-900' :
        settings.colorScheme === 'high-contrast' ? 'bg-black text-yellow-400' :
        'bg-white text-gray-900'
      }`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            معاينة النص
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className={`space-y-4 p-6 rounded-lg border transition-all duration-300`}
            style={{
              fontSize: `${settings.fontSize}px`,
              lineHeight: settings.lineHeight,
              letterSpacing: `${settings.letterSpacing}px`,
              textAlign: settings.textAlign,
              marginBottom: `${settings.verseSpacing}px`
            }}
          >
            {/* Arabic Text Preview */}
            <div className="text-right" style={{ fontFamily: settings.arabicFont }}>
              <p className="text-2xl mb-4">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p className="mb-4">
                الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمَٰنِ الرَّحِيمِ ﴿٣﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾
              </p>
            </div>
            
            {/* Translation Preview */}
            <div style={{ fontFamily: settings.translationFont }}>
              <p className="text-gray-600 dark:text-gray-300">
                In the name of Allah, the Entirely Merciful, the Especially Merciful. 
                [All] praise is [due] to Allah, Lord of the worlds - The Entirely Merciful, the Especially Merciful.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typography Controls */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Font Size & Spacing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="w-5 h-5 text-blue-600" />
              حجم الخط والمسافات
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Font Size */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">حجم الخط</label>
                <Badge variant="outline">{settings.fontSize}px</Badge>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => updateSetting('fontSize', Math.max(12, settings.fontSize - 2))}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Slider
                  value={[settings.fontSize]}
                  onValueChange={([value]) => updateSetting('fontSize', value)}
                  min={12}
                  max={32}
                  step={2}
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => updateSetting('fontSize', Math.min(32, settings.fontSize + 2))}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Line Height */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">ارتفاع السطر</label>
                <Badge variant="outline">{settings.lineHeight}</Badge>
              </div>
              <Slider
                value={[settings.lineHeight]}
                onValueChange={([value]) => updateSetting('lineHeight', value)}
                min={1.2}
                max={3}
                step={0.1}
              />
            </div>

            {/* Letter Spacing */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">تباعد الأحرف</label>
                <Badge variant="outline">{settings.letterSpacing}px</Badge>
              </div>
              <Slider
                value={[settings.letterSpacing]}
                onValueChange={([value]) => updateSetting('letterSpacing', value)}
                min={-1}
                max={3}
                step={0.1}
              />
            </div>

            {/* Verse Spacing */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">تباعد الآيات</label>
                <Badge variant="outline">{settings.verseSpacing}px</Badge>
              </div>
              <Slider
                value={[settings.verseSpacing]}
                onValueChange={([value]) => updateSetting('verseSpacing', value)}
                min={8}
                max={48}
                step={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Text Alignment & Colors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-600" />
              المحاذاة والألوان
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Text Alignment */}
            <div>
              <label className="text-sm font-medium mb-3 block">محاذاة النص</label>
              <div className="flex gap-2">
                <Button
                  variant={settings.textAlign === 'right' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateSetting('textAlign', 'right')}
                >
                  <AlignRight className="w-4 h-4" />
                </Button>
                <Button
                  variant={settings.textAlign === 'center' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateSetting('textAlign', 'center')}
                >
                  <AlignCenter className="w-4 h-4" />
                </Button>
                <Button
                  variant={settings.textAlign === 'left' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateSetting('textAlign', 'left')}
                >
                  <AlignLeft className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Color Schemes */}
            <div>
              <label className="text-sm font-medium mb-3 block">نظام الألوان</label>
              <div className="grid grid-cols-2 gap-2">
                {colorSchemes.map((scheme) => {
                  const Icon = scheme.icon;
                  return (
                    <Button
                      key={scheme.id}
                      variant={settings.colorScheme === scheme.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateSetting('colorScheme', scheme.id)}
                      className="justify-start h-auto p-3"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Icon className="w-4 h-4" />
                        <div className="text-left">
                          <div className="font-medium text-xs">{scheme.name}</div>
                          <div className="text-xs opacity-75">{scheme.description}</div>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Font Selection */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Arabic Fonts */}
        <Card>
          <CardHeader>
            <CardTitle>خطوط النص العربي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {arabicFonts.map((font) => (
                <Button
                  key={font.id}
                  variant={settings.arabicFont === font.id ? 'default' : 'outline'}
                  className="w-full h-auto p-4 justify-start"
                  onClick={() => updateSetting('arabicFont', font.id)}
                >
                  <div className="text-right w-full">
                    <div className="font-medium mb-1">{font.name}</div>
                    <div className="text-lg" style={{ fontFamily: font.id }}>
                      {font.preview}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Translation Fonts */}
        <Card>
          <CardHeader>
            <CardTitle>خطوط الترجمة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {translationFonts.map((font) => (
                <Button
                  key={font.id}
                  variant={settings.translationFont === font.id ? 'default' : 'outline'}
                  className="w-full h-auto p-4 justify-start"
                  onClick={() => updateSetting('translationFont', font.id)}
                >
                  <div className="text-left w-full">
                    <div className="font-medium mb-1">{font.name}</div>
                    <div className="text-sm opacity-75" style={{ fontFamily: font.id }}>
                      {font.preview}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-center gap-3">
            <Button onClick={savePreset} className="bg-emerald-600 hover:bg-emerald-700">
              <Save className="w-4 h-4 mr-2" />
              حفظ الإعدادات
            </Button>
            <Button variant="outline" onClick={resetToDefaults}>
              <RotateCcw className="w-4 h-4 mr-2" />
              إعادة تعيين
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedTypographyControls;
