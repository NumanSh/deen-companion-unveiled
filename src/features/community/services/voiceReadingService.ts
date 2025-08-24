
interface VoiceSettings {
  rate: number;
  pitch: number;
  volume: number;
  voice: SpeechSynthesisVoice | null;
}

class VoiceReadingService {
  private synthesis: SpeechSynthesis;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private settings: VoiceSettings = {
    rate: 1,
    pitch: 1,
    volume: 0.8,
    voice: null
  };
  private isPlaying = false;
  private onPlayStateChange?: (isPlaying: boolean) => void;

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.initializeDefaultVoice();
  }

  private initializeDefaultVoice() {
    // Wait for voices to be loaded
    if (this.synthesis.getVoices().length === 0) {
      this.synthesis.addEventListener('voiceschanged', () => {
        this.setDefaultVoice();
      });
    } else {
      this.setDefaultVoice();
    }
  }

  private setDefaultVoice() {
    const voices = this.synthesis.getVoices();
    // Prefer Arabic voice for Quranic content
    const arabicVoice = voices.find(voice => 
      voice.lang.includes('ar') || voice.name.toLowerCase().includes('arabic')
    );
    this.settings.voice = arabicVoice || voices[0] || null;
  }

  getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.synthesis.getVoices();
  }

  setVoice(voice: SpeechSynthesisVoice) {
    this.settings.voice = voice;
  }

  setSettings(newSettings: Partial<VoiceSettings>) {
    this.settings = { ...this.settings, ...newSettings };
  }

  getSettings(): VoiceSettings {
    return { ...this.settings };
  }

  setPlayStateCallback(callback: (isPlaying: boolean) => void) {
    this.onPlayStateChange = callback;
  }

  speak(text: string, options?: { onStart?: () => void; onEnd?: () => void; onError?: () => void }) {
    this.stop(); // Stop any current speech

    if (!text.trim()) return;

    this.currentUtterance = new SpeechSynthesisUtterance(text);
    
    // Apply settings
    this.currentUtterance.rate = this.settings.rate;
    this.currentUtterance.pitch = this.settings.pitch;
    this.currentUtterance.volume = this.settings.volume;
    
    if (this.settings.voice) {
      this.currentUtterance.voice = this.settings.voice;
    }

    // Set up event listeners
    this.currentUtterance.onstart = () => {
      this.isPlaying = true;
      this.onPlayStateChange?.(true);
      options?.onStart?.();
    };

    this.currentUtterance.onend = () => {
      this.isPlaying = false;
      this.onPlayStateChange?.(false);
      options?.onEnd?.();
    };

    this.currentUtterance.onerror = () => {
      this.isPlaying = false;
      this.onPlayStateChange?.(false);
      options?.onError?.();
    };

    this.synthesis.speak(this.currentUtterance);
  }

  pause() {
    if (this.synthesis.speaking && !this.synthesis.paused) {
      this.synthesis.pause();
      this.isPlaying = false;
      this.onPlayStateChange?.(false);
    }
  }

  resume() {
    if (this.synthesis.paused) {
      this.synthesis.resume();
      this.isPlaying = true;
      this.onPlayStateChange?.(true);
    }
  }

  stop() {
    if (this.synthesis.speaking) {
      this.synthesis.cancel();
      this.isPlaying = false;
      this.onPlayStateChange?.(false);
    }
  }

  isCurrentlyPlaying(): boolean {
    return this.isPlaying && this.synthesis.speaking;
  }

  isPaused(): boolean {
    return this.synthesis.paused;
  }
}

export const voiceReadingService = new VoiceReadingService();
