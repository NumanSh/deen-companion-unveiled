
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack,
  Headphones,
  Settings,
  BookOpen,
  Mic
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { voiceReadingService } from '@/services/voiceReadingService';
import { voiceNavigationService } from '@/services/voiceNavigationService';

interface LearningContent {
  id: string;
  title: string;
  content: string;
  type: 'verse' | 'hadith' | 'explanation' | 'dua';
  duration?: number;
  audio?: string;
}

interface AudioLearningSettings {
  autoPlay: boolean;
  continuousPlayback: boolean;
  includeExplanations: boolean;
  repeatMode: boolean;
  playbackSpeed: number;
  voiceGuidance: boolean;
}

const AudioFirstLearningMode: React.FC = () => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentContent, setCurrentContent] = useState<LearningContent | null>(null);
  const [contentQueue, setContentQueue] = useState<LearningContent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [settings, setSettings] = useState<AudioLearningSettings>({
    autoPlay: true,
    continuousPlayback: true,
    includeExplanations: true,
    repeatMode: false,
    playbackSpeed: 1,
    voiceGuidance: true
  });

  // Sample learning content
  const sampleContent: LearningContent[] = [
    {
      id: '1',
      title: 'Al-Fatiha',
      content: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ. الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      type: 'verse'
    },
    {
      id: '2',
      title: 'Al-Fatiha Translation',
      content: 'In the name of Allah, the Most Gracious, the Most Merciful. All praise is due to Allah, Lord of all the worlds.',
      type: 'explanation'
    },
    {
      id: '3',
      title: 'Morning Dhikr',
      content: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      type: 'dua'
    }
  ];

  useEffect(() => {
    if (isActive) {
      initializeAudioLearning();
      setupVoiceCommands();
    }
    return () => {
      voiceReadingService.stop();
    };
  }, [isActive]);

  useEffect(() => {
    voiceReadingService.setPlayStateCallback(setIsPlaying);
  }, []);

  const initializeAudioLearning = () => {
    setContentQueue(sampleContent);
    setCurrentContent(sampleContent[0]);
    setCurrentIndex(0);
    
    if (settings.voiceGuidance) {
      voiceReadingService.speak('Audio learning mode activated. You can use voice commands to navigate.', {
        onEnd: () => {
          if (settings.autoPlay) {
            setTimeout(() => playCurrentContent(), 1000);
          }
        }
      });
    }
  };

  const setupVoiceCommands = () => {
    // Add custom voice commands for audio learning
    voiceNavigationService.addCustomCommand({
      patterns: ['next content', 'skip forward', 'next lesson'],
      action: () => playNext(),
      description: 'Play next learning content',
      category: 'content'
    });

    voiceNavigationService.addCustomCommand({
      patterns: ['previous content', 'go back', 'previous lesson'],
      action: () => playPrevious(),
      description: 'Play previous learning content',
      category: 'content'
    });

    voiceNavigationService.addCustomCommand({
      patterns: ['repeat this', 'play again', 'repeat current'],
      action: () => repeatCurrent(),
      description: 'Repeat current content',
      category: 'content'
    });

    voiceNavigationService.addCustomCommand({
      patterns: ['what is this', 'explain this', 'tell me about this'],
      action: () => explainCurrent(),
      description: 'Explain current content',
      category: 'content'
    });
  };

  const playCurrentContent = () => {
    if (!currentContent) return;

    let textToSpeak = currentContent.content;
    
    if (settings.voiceGuidance) {
      const intro = `Now playing: ${currentContent.title}. ${currentContent.type === 'verse' ? 'Quranic verse' : currentContent.type}.`;
      textToSpeak = `${intro} ${textToSpeak}`;
    }

    voiceReadingService.setSettings({
      rate: settings.playbackSpeed
    });

    voiceReadingService.speak(textToSpeak, {
      onEnd: () => {
        if (settings.continuousPlayback && !settings.repeatMode) {
          setTimeout(() => playNext(), 2000);
        } else if (settings.repeatMode) {
          setTimeout(() => playCurrentContent(), 2000);
        }
      }
    });
  };

  const playNext = () => {
    if (currentIndex < contentQueue.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentContent(contentQueue[nextIndex]);
      
      setTimeout(() => playCurrentContent(), 500);
    } else {
      if (settings.voiceGuidance) {
        voiceReadingService.speak('End of learning session. Would you like to restart?');
      }
    }
  };

  const playPrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCurrentContent(contentQueue[prevIndex]);
      
      setTimeout(() => playCurrentContent(), 500);
    }
  };

  const repeatCurrent = () => {
    if (currentContent) {
      voiceReadingService.stop();
      setTimeout(() => playCurrentContent(), 500);
    }
  };

  const explainCurrent = () => {
    if (!currentContent) return;
    
    const explanation = `This is ${currentContent.title}, which is a ${currentContent.type}. ${
      currentContent.type === 'verse' ? 'This is a verse from the Holy Quran.' :
      currentContent.type === 'dua' ? 'This is a supplication or dua.' :
      currentContent.type === 'hadith' ? 'This is a saying of Prophet Muhammad, peace be upon him.' :
      'This is an explanation or commentary.'
    }`;
    
    voiceReadingService.speak(explanation);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      voiceReadingService.pause();
    } else if (voiceReadingService.isPaused()) {
      voiceReadingService.resume();
    } else {
      playCurrentContent();
    }
  };

  const updateSettings = (key: keyof AudioLearningSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('audio-learning-settings', JSON.stringify(newSettings));
    
    if (key === 'playbackSpeed') {
      voiceReadingService.setSettings({ rate: value });
    }
  };

  const activateAudioMode = () => {
    setIsActive(true);
    toast({
      title: 'Audio Learning Activated',
      description: 'Use voice commands to navigate content',
    });
  };

  const deactivateAudioMode = () => {
    setIsActive(false);
    voiceReadingService.stop();
    toast({
      title: 'Audio Learning Deactivated',
      description: 'Returned to regular mode',
    });
  };

  if (!isActive) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Headphones className="w-5 h-5 text-purple-600" />
            Audio-First Learning
          </CardTitle>
          <p className="text-sm text-gray-600">
            Learn through voice-guided content with hands-free navigation
          </p>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={activateAudioMode}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Audio Learning
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Headphones className="w-5 h-5 text-purple-600" />
            Audio Learning Mode
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Active
            </Badge>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={deactivateAudioMode}
          >
            Exit
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Current Content Display */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-2">
            {currentContent?.title}
          </h3>
          <p className="text-purple-700 text-sm mb-3">
            {currentContent?.content}
          </p>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-purple-600">
              {currentContent?.type}
            </Badge>
            <span className="text-sm text-purple-600">
              {currentIndex + 1} of {contentQueue.length}
            </span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={playPrevious}
            disabled={currentIndex === 0}
          >
            <SkipBack className="w-4 h-4" />
          </Button>

          <Button
            onClick={togglePlayPause}
            size="lg"
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={playNext}
            disabled={currentIndex === contentQueue.length - 1}
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        {/* Voice Commands */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
            <Mic className="w-4 h-4" />
            Voice Commands
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-blue-700">
            <div>"Next content" - Next lesson</div>
            <div>"Previous content" - Previous lesson</div>
            <div>"Repeat this" - Repeat current</div>
            <div>"Explain this" - Get explanation</div>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Audio Settings
          </h4>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Auto-play</span>
              <Switch
                checked={settings.autoPlay}
                onCheckedChange={(checked) => updateSettings('autoPlay', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Continuous</span>
              <Switch
                checked={settings.continuousPlayback}
                onCheckedChange={(checked) => updateSettings('continuousPlayback', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Voice Guide</span>
              <Switch
                checked={settings.voiceGuidance}
                onCheckedChange={(checked) => updateSettings('voiceGuidance', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Repeat Mode</span>
              <Switch
                checked={settings.repeatMode}
                onCheckedChange={(checked) => updateSettings('repeatMode', checked)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Playback Speed ({settings.playbackSpeed}x)
            </label>
            <Slider
              value={[settings.playbackSpeed]}
              onValueChange={(value) => updateSettings('playbackSpeed', value[0])}
              min={0.5}
              max={2}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioFirstLearningMode;
