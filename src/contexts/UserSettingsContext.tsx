
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserSettings {
  // Reading Preferences
  arabicFontSize: 'small' | 'medium' | 'large' | 'extra-large';
  translationFontSize: 'small' | 'medium' | 'large';
  showTajweedColors: boolean;
  autoPlayAudio: boolean;
  preferredReciter: string;
  showWordByWord: boolean;
  
  // Learning Preferences
  learningLanguage: 'en' | 'ar';
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  dailyWordGoal: number;
  showTransliteration: boolean;
  
  // Notification Settings
  dailyReflectionTime: string;
  hadithNotifications: boolean;
  wordLearningReminders: boolean;
  motivationalQuotes: boolean;
  
  // Display Preferences
  theme: 'light' | 'dark' | 'auto';
  colorScheme: 'green' | 'blue' | 'purple' | 'teal';
  showProgressBars: boolean;
  compactMode: boolean;
  
  // Privacy & Data
  syncProgress: boolean;
  shareUsageData: boolean;
}

const defaultSettings: UserSettings = {
  arabicFontSize: 'medium',
  translationFontSize: 'medium',
  showTajweedColors: false,
  autoPlayAudio: false,
  preferredReciter: 'mishary',
  showWordByWord: true,
  learningLanguage: 'en',
  difficultyLevel: 'beginner',
  dailyWordGoal: 5,
  showTransliteration: true,
  dailyReflectionTime: '09:00',
  hadithNotifications: true,
  wordLearningReminders: true,
  motivationalQuotes: true,
  theme: 'auto',
  colorScheme: 'teal',
  showProgressBars: true,
  compactMode: false,
  syncProgress: true,
  shareUsageData: false,
};

interface UserSettingsContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  resetSettings: () => void;
  exportSettings: () => string;
  importSettings: (settingsJson: string) => boolean;
}

const UserSettingsContext = createContext<UserSettingsContextType | undefined>(undefined);

export const useUserSettings = () => {
  const context = useContext(UserSettingsContext);
  if (!context) {
    throw new Error('useUserSettings must be used within a UserSettingsProvider');
  }
  return context;
};

interface UserSettingsProviderProps {
  children: ReactNode;
}

export const UserSettingsProvider: React.FC<UserSettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('user-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error('Failed to parse saved settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('user-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('user-settings');
  };

  const exportSettings = () => {
    return JSON.stringify(settings, null, 2);
  };

  const importSettings = (settingsJson: string) => {
    try {
      const imported = JSON.parse(settingsJson);
      const validatedSettings = { ...defaultSettings, ...imported };
      setSettings(validatedSettings);
      return true;
    } catch (error) {
      console.error('Failed to import settings:', error);
      return false;
    }
  };

  return (
    <UserSettingsContext.Provider value={{
      settings,
      updateSettings,
      resetSettings,
      exportSettings,
      importSettings,
    }}>
      {children}
    </UserSettingsContext.Provider>
  );
};
