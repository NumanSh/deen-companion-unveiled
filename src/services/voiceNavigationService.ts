import { voiceReadingService } from './voiceReadingService';
import '../types/speechRecognition';

interface VoiceCommand {
  patterns: string[];
  action: () => void;
  description: string;
  category: 'navigation' | 'reading' | 'content';
}

class VoiceNavigationService {
  private recognition: any = null; // Using any to avoid TypeScript issues
  private isListening = false;
  private commands: VoiceCommand[] = [];
  private onListeningChange?: (isListening: boolean) => void;
  private onCommandRecognized?: (command: string) => void;
  private navigate?: (path: string) => void;

  constructor() {
    this.initializeSpeechRecognition();
    this.setupDefaultCommands();
  }

  private initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new (window as any).webkitSpeechRecognition();
    } else if ('SpeechRecognition' in window) {
      this.recognition = new (window as any).SpeechRecognition();
    }

    if (this.recognition) {
      this.recognition.continuous = true;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        this.isListening = true;
        this.onListeningChange?.(true);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.onListeningChange?.(false);
      };

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
        this.processCommand(transcript);
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        this.isListening = false;
        this.onListeningChange?.(false);
      };
    }
  }

  private setupDefaultCommands() {
    this.commands = [
      // Navigation commands
      {
        patterns: ['go home', 'home page', 'navigate home'],
        action: () => this.navigate?.('/'),
        description: 'Navigate to home page',
        category: 'navigation'
      },
      {
        patterns: ['open quran', 'go to quran', 'show quran'],
        action: () => this.navigate?.('/books'),
        description: 'Open Quran reader',
        category: 'navigation'
      },
      {
        patterns: ['prayer times', 'show prayers', 'go to calendar'],
        action: () => this.navigate?.('/calendar'),
        description: 'Show prayer times',
        category: 'navigation'
      },
      {
        patterns: ['settings', 'open settings', 'go to settings'],
        action: () => this.navigate?.('/settings'),
        description: 'Open settings',
        category: 'navigation'
      },

      // Reading control commands
      {
        patterns: ['start reading', 'begin reading', 'read aloud'],
        action: () => this.startReadingCurrentContent(),
        description: 'Start reading current content',
        category: 'reading'
      },
      {
        patterns: ['stop reading', 'stop', 'pause reading'],
        action: () => voiceReadingService.stop(),
        description: 'Stop reading',
        category: 'reading'
      },
      {
        patterns: ['pause', 'pause reading'],
        action: () => voiceReadingService.pause(),
        description: 'Pause reading',
        category: 'reading'
      },
      {
        patterns: ['resume', 'continue reading', 'resume reading'],
        action: () => voiceReadingService.resume(),
        description: 'Resume reading',
        category: 'reading'
      },

      // Content interaction commands
      {
        patterns: ['next verse', 'next ayah'],
        action: () => this.triggerNextVerse(),
        description: 'Go to next verse',
        category: 'content'
      },
      {
        patterns: ['previous verse', 'previous ayah', 'last verse'],
        action: () => this.triggerPreviousVerse(),
        description: 'Go to previous verse',
        category: 'content'
      },
      {
        patterns: ['bookmark this', 'add bookmark', 'save this'],
        action: () => this.triggerBookmark(),
        description: 'Bookmark current content',
        category: 'content'
      }
    ];
  }

  setNavigationCallback(callback: (path: string) => void) {
    this.navigate = callback;
  }

  setListeningCallback(callback: (isListening: boolean) => void) {
    this.onListeningChange = callback;
  }

  setCommandCallback(callback: (command: string) => void) {
    this.onCommandRecognized = callback;
  }

  startListening() {
    if (this.recognition && !this.isListening) {
      try {
        this.recognition.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }

  isCurrentlyListening(): boolean {
    return this.isListening;
  }

  getAvailableCommands(): VoiceCommand[] {
    return [...this.commands];
  }

  addCustomCommand(command: VoiceCommand) {
    this.commands.push(command);
  }

  private processCommand(transcript: string) {
    console.log('Voice command received:', transcript);
    this.onCommandRecognized?.(transcript);

    const matchedCommand = this.commands.find(command =>
      command.patterns.some(pattern =>
        transcript.includes(pattern.toLowerCase())
      )
    );

    if (matchedCommand) {
      console.log('Executing command:', matchedCommand.description);
      matchedCommand.action();
    } else {
      console.log('No matching command found for:', transcript);
    }
  }

  private startReadingCurrentContent() {
    // Try to find readable content on the page
    const readableElements = [
      'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      '[data-verse-text]', '[data-hadith-text]', '[data-dua-text]'
    ];
    
    for (const selector of readableElements) {
      const element = document.querySelector(selector);
      if (element && element.textContent?.trim()) {
        voiceReadingService.speak(element.textContent.trim());
        return;
      }
    }
    
    // Fallback: read page title or any visible text
    const title = document.title;
    if (title) {
      voiceReadingService.speak(`Currently on page: ${title}`);
    }
  }

  private triggerNextVerse() {
    // Dispatch a custom event that components can listen to
    window.dispatchEvent(new CustomEvent('voice-next-verse'));
  }

  private triggerPreviousVerse() {
    window.dispatchEvent(new CustomEvent('voice-previous-verse'));
  }

  private triggerBookmark() {
    window.dispatchEvent(new CustomEvent('voice-bookmark'));
  }

  isSupported(): boolean {
    return this.recognition !== null;
  }
}

export const voiceNavigationService = new VoiceNavigationService();
