import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Square,
  Settings,
  HelpCircle,
  Bell,
  Headphones
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { voiceReadingService } from '@/features/community/services/voiceReadingService';
import { voiceNavigationService } from '@/features/community/services/voiceNavigationService';
import { voiceGuidedPrayerService } from '@/features/community/services/voiceGuidedPrayerService';
import { AudioFirstLearningMode } from '@/features/learning';
import { useNavigate } from 'react-router-dom';

interface VoiceControlsProps {
  onClose?: () => void;
}

const VoiceControls: React.FC<VoiceControlsProps> = ({ onClose }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isListening, setIsListening] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>('');
  const [volume, setVolume] = useState([80]);
  const [rate, setRate] = useState([100]);
  const [pitch, setPitch] = useState([100]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [showCommands, setShowCommands] = useState(false);
  const [activeTab, setActiveTab] = useState<'controls' | 'prayer' | 'learning'>('controls');

  // Prayer voice settings
  const [prayerVoiceSettings, setPrayerVoiceSettings] = useState(voiceGuidedPrayerService.getSettings());

  useEffect(() => {
    // Initialize voice settings
    const updateVoices = () => {
      const voices = voiceReadingService.getAvailableVoices();
      setAvailableVoices(voices);
      if (voices.length > 0 && !selectedVoice) {
        const defaultVoice = voices.find(v => v.default) || voices[0];
        setSelectedVoice(defaultVoice.name);
        voiceReadingService.setVoice(defaultVoice);
      }
    };

    updateVoices();
    window.speechSynthesis.addEventListener('voiceschanged', updateVoices);

    // Set up voice service callbacks
    voiceReadingService.setPlayStateCallback(setIsReading);
    voiceNavigationService.setListeningCallback(setIsListening);
    voiceNavigationService.setCommandCallback(setLastCommand);
    voiceNavigationService.setNavigationCallback(navigate);

    // Initialize voice guided prayer service
    voiceGuidedPrayerService.initialize();

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', updateVoices);
    };
  }, [navigate, selectedVoice]);

  const toggleListening = async () => {
    if (!voiceNavigationService.isSupported()) {
      toast({
        title: 'Voice Recognition Not Supported',
        description: 'Your browser does not support speech recognition.',
        variant: 'destructive'
      });
      return;
    }

    try {
      if (isListening) {
        voiceNavigationService.stopListening();
      } else {
        // Request microphone permission
        await navigator.mediaDevices.getUserMedia({ audio: true });
        voiceNavigationService.startListening();
        toast({
          title: 'Voice Navigation Active',
          description: 'Say commands like "go home" or "start reading"',
        });
      }
    } catch (error) {
      toast({
        title: 'Microphone Access Required',
        description: 'Please allow microphone access to use voice commands.',
        variant: 'destructive'
      });
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    voiceReadingService.setSettings({ volume: newVolume[0] / 100 });
  };

  const handleRateChange = (newRate: number[]) => {
    setRate(newRate);
    voiceReadingService.setSettings({ rate: newRate[0] / 100 });
  };

  const handlePitchChange = (newPitch: number[]) => {
    setPitch(newPitch);
    voiceReadingService.setSettings({ pitch: newPitch[0] / 100 });
  };

  const handleVoiceChange = (voiceName: string) => {
    setSelectedVoice(voiceName);
    const voice = availableVoices.find(v => v.name === voiceName);
    if (voice) {
      voiceReadingService.setVoice(voice);
    }
  };

  const testVoice = () => {
    const testText = selectedVoice.includes('ar') || selectedVoice.toLowerCase().includes('arabic')
      ? 'بسم الله الرحمن الرحيم'
      : 'This is a voice test. The quick brown fox jumps over the lazy dog.';
    
    voiceReadingService.speak(testText, {
      onStart: () => toast({ title: 'Voice Test Started', description: 'Testing current voice settings' }),
      onEnd: () => toast({ title: 'Voice Test Complete', description: 'Voice test finished' })
    });
  };

  const stopReading = () => {
    voiceReadingService.stop();
  };

  const pauseReading = () => {
    if (voiceReadingService.isPaused()) {
      voiceReadingService.resume();
    } else {
      voiceReadingService.pause();
    }
  };

  const updatePrayerVoiceSettings = (key: string, value: any) => {
    const newSettings = { ...prayerVoiceSettings, [key]: value };
    setPrayerVoiceSettings(newSettings);
    voiceGuidedPrayerService.updateSettings(newSettings);
  };

  const testPrayerAnnouncement = () => {
    voiceGuidedPrayerService.testAnnouncement('dhuhr');
    toast({
      title: 'Prayer Announcement Test',
      description: 'Playing sample prayer notification',
    });
  };

  const availableCommands = voiceNavigationService.getAvailableCommands();
  const commandsByCategory = availableCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, typeof availableCommands>);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-emerald-600" />
            Voice Controls
          </CardTitle>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              ×
            </Button>
          )}
        </div>
        <p className="text-sm text-gray-600">Control reading, navigation, and accessibility with your voice</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'controls' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('controls')}
          >
            <Mic className="w-4 h-4 mr-2" />
            Voice Controls
          </Button>
          <Button
            variant={activeTab === 'prayer' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('prayer')}
          >
            <Bell className="w-4 h-4 mr-2" />
            Prayer Voices
          </Button>
          <Button
            variant={activeTab === 'learning' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('learning')}
          >
            <Headphones className="w-4 h-4 mr-2" />
            Audio Learning
          </Button>
        </div>

        {activeTab === 'controls' && (
          <div className="space-y-6">
            {/* Voice Navigation */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Mic className="w-4 h-4" />
                Voice Navigation
              </h3>
              
              <div className="flex items-center gap-4">
                <Button
                  onClick={toggleListening}
                  variant={isListening ? "destructive" : "default"}
                  className="flex items-center gap-2"
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  {isListening ? 'Stop Listening' : 'Start Listening'}
                </Button>

                {isListening && (
                  <Badge variant="secondary" className="animate-pulse">
                    🎤 Listening...
                  </Badge>
                )}
              </div>

              {lastCommand && (
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <p className="text-sm text-emerald-800">
                    <strong>Last Command:</strong> "{lastCommand}"
                  </p>
                </div>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCommands(!showCommands)}
                className="flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4" />
                {showCommands ? 'Hide' : 'Show'} Available Commands
              </Button>

              {showCommands && (
                <div className="space-y-3 p-4 border rounded-lg bg-gray-50">
                  {Object.entries(commandsByCategory).map(([category, commands]) => (
                    <div key={category}>
                      <h4 className="font-medium capitalize text-sm text-gray-700 mb-2">{category}</h4>
                      <div className="grid gap-2">
                        {commands.map((cmd, index) => (
                          <div key={index} className="text-xs">
                            <span className="font-mono bg-white px-2 py-1 rounded">
                              "{cmd.patterns[0]}"
                            </span>
                            <span className="text-gray-600 ml-2">- {cmd.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            {/* Voice Reading Controls */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                Voice Reading
              </h3>

              <div className="flex items-center gap-2">
                <Button
                  onClick={testVoice}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Test Voice
                </Button>

                {isReading && (
                  <>
                    <Button
                      onClick={pauseReading}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      {voiceReadingService.isPaused() ? (
                        <><Play className="w-4 h-4" /> Resume</>
                      ) : (
                        <><Pause className="w-4 h-4" /> Pause</>
                      )}
                    </Button>

                    <Button
                      onClick={stopReading}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Square className="w-4 h-4" />
                      Stop
                    </Button>

                    <Badge variant="secondary" className="animate-pulse">
                      🔊 Reading...
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Voice Settings */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Voice Settings
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Voice</label>
                  <Select value={selectedVoice} onValueChange={handleVoiceChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableVoices.map((voice) => (
                        <SelectItem key={voice.name} value={voice.name}>
                          {voice.name} ({voice.lang})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Volume ({volume[0]}%)</label>
                    <Slider
                      value={volume}
                      onValueChange={handleVolumeChange}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Speed ({rate[0]}%)</label>
                    <Slider
                      value={rate}
                      onValueChange={handleRateChange}
                      min={25}
                      max={200}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Pitch ({pitch[0]}%)</label>
                    <Slider
                      value={pitch}
                      onValueChange={handlePitchChange}
                      min={50}
                      max={150}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prayer' && (
          <div className="space-y-6">
            <h3 className="font-semibold flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Voice-Guided Prayer Notifications
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Voice Announcements</span>
                  <p className="text-sm text-gray-600">Enable voice announcements for prayer times</p>
                </div>
                <Switch
                  checked={prayerVoiceSettings.enabled}
                  onCheckedChange={(checked) => updatePrayerVoiceSettings('enabled', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Include Supplications</span>
                  <p className="text-sm text-gray-600">Add Islamic supplications to announcements</p>
                </div>
                <Switch
                  checked={prayerVoiceSettings.includeSupplication}
                  onCheckedChange={(checked) => updatePrayerVoiceSettings('includeSupplication', checked)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Language</label>
                <Select 
                  value={prayerVoiceSettings.language} 
                  onValueChange={(value) => updatePrayerVoiceSettings('language', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">Arabic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Reminder Time ({prayerVoiceSettings.reminderMinutes} minutes before)
                </label>
                <Slider
                  value={[prayerVoiceSettings.reminderMinutes]}
                  onValueChange={(value) => updatePrayerVoiceSettings('reminderMinutes', value[0])}
                  min={1}
                  max={30}
                  step={1}
                  className="w-full"
                />
              </div>

              <Button
                onClick={testPrayerAnnouncement}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Test Prayer Announcement
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'learning' && (
          <AudioFirstLearningMode />
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceControls;
