interface DreamSymbol {
  symbol: string;
  meaning: string;
  significance: 'positive' | 'negative' | 'neutral';
}

interface DreamInterpretation {
  symbols: DreamSymbol[];
  islamicGuidance: string;
  generalInterpretation: string;
  recommendation: string;
}

class DreamInterpretationService {
  private commonSymbols: Record<string, DreamSymbol> = {
    'water': {
      symbol: 'Water',
      meaning: 'Represents purification, knowledge, and spiritual cleansing',
      significance: 'positive'
    },
    'light': {
      symbol: 'Light',
      meaning: 'Guidance, wisdom, and divine blessing',
      significance: 'positive'
    },
    'garden': {
      symbol: 'Garden',
      meaning: 'Paradise, spiritual growth, and good deeds',
      significance: 'positive'
    },
    'mountain': {
      symbol: 'Mountain',
      meaning: 'Stability, challenges to overcome, or spiritual elevation',
      significance: 'neutral'
    },
    'book': {
      symbol: 'Book',
      meaning: 'Knowledge, wisdom, or the Quran',
      significance: 'positive'
    }
  };

  async interpretDream(dreamText: string): Promise<DreamInterpretation> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lowerText = dreamText.toLowerCase();
    const foundSymbols: DreamSymbol[] = [];

    // Find matching symbols
    Object.entries(this.commonSymbols).forEach(([key, symbol]) => {
      if (lowerText.includes(key)) {
        foundSymbols.push(symbol);
      }
    });

    // Generate interpretation based on found symbols
    const hasPositiveSymbols = foundSymbols.some(s => s.significance === 'positive');
    const hasNegativeSymbols = foundSymbols.some(s => s.significance === 'negative');

    let islamicGuidance = '';
    let generalInterpretation = '';
    let recommendation = '';

    if (hasPositiveSymbols) {
      islamicGuidance = 'Your dream contains positive symbols that may indicate Allah\'s blessings and guidance in your life. Dreams can be a form of divine communication.';
      generalInterpretation = 'This dream suggests a period of spiritual growth and positive transformation ahead.';
      recommendation = 'Continue your prayers and good deeds. Seek knowledge and maintain your connection with Allah.';
    } else if (hasNegativeSymbols) {
      islamicGuidance = 'Some elements in your dream may represent challenges or tests. Remember that Allah tests those He loves.';
      generalInterpretation = 'This dream may be highlighting areas where you need to be more careful or seek protection.';
      recommendation = 'Increase your dhikr, seek refuge in Allah, and perform istighfar. Consider this a reminder to strengthen your faith.';
    } else {
      islamicGuidance = 'Dreams can be reflections of our daily thoughts and experiences. Not all dreams carry spiritual significance.';
      generalInterpretation = 'This dream may simply be processing your daily experiences and thoughts.';
      recommendation = 'Continue your regular prayers and dhikr. If the dream troubles you, seek guidance from a knowledgeable person.';
    }

    return {
      symbols: foundSymbols,
      islamicGuidance,
      generalInterpretation,
      recommendation
    };
  }
}

export const dreamInterpretationService = new DreamInterpretationService();
export type { DreamInterpretation, DreamSymbol };