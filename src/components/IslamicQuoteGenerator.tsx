
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Quote, RefreshCw, Download, Share2, Palette, Type } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IslamicQuote {
  id: string;
  text: string;
  author: string;
  category: string;
  source?: string;
  arabicText?: string;
}

const IslamicQuoteGenerator: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<IslamicQuote | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [backgroundStyle, setBackgroundStyle] = useState('gradient1');
  const [fontSize, setFontSize] = useState('medium');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const islamicQuotes: IslamicQuote[] = [
    {
      id: 'quote-1',
      text: 'And it is He who created the heavens and earth in truth. And the day He says, "Be," and it is, His word is the truth.',
      author: 'Quran',
      category: 'quran',
      source: 'Surah Al-An\'am 6:73',
      arabicText: 'وَهُوَ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ بِالْحَقِّ وَيَوْمَ يَقُولُ كُن فَيَكُونُ قَوْلُهُ الْحَقُّ'
    },
    {
      id: 'quote-2',
      text: 'The believer is not one who eats his fill while his neighbor goes hungry.',
      author: 'Prophet Muhammad (PBUH)',
      category: 'hadith',
      source: 'Sahih al-Bukhari'
    },
    {
      id: 'quote-3',
      text: 'Knowledge enlivens the soul, just as rain enlivens the earth.',
      author: 'Imam Ali (RA)',
      category: 'wisdom',
      source: 'Nahj al-Balagha'
    },
    {
      id: 'quote-4',
      text: 'Do not be people without minds of your own, saying that if others treat you well you will treat them well, and that if they do wrong you will do wrong. Instead, accustom yourselves to do good if people do good and not to do wrong if they do evil.',
      author: 'Prophet Muhammad (PBUH)',
      category: 'hadith',
      source: 'Sunan at-Tirmidhi'
    },
    {
      id: 'quote-5',
      text: 'And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.',
      author: 'Quran',
      category: 'quran',
      source: 'Surah At-Talaq 65:3',
      arabicText: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ'
    },
    {
      id: 'quote-6',
      text: 'The best of people are those who benefit others.',
      author: 'Prophet Muhammad (PBUH)',
      category: 'hadith',
      source: 'Sahih al-Bukhari'
    },
    {
      id: 'quote-7',
      text: 'Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.',
      author: 'Rumi',
      category: 'sufi',
      source: 'The Essential Rumi'
    },
    {
      id: 'quote-8',
      text: 'Patience is of two kinds: patience over what pains you, and patience against what you covet.',
      author: 'Imam Ali (RA)',
      category: 'wisdom',
      source: 'Nahj al-Balagha'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Quotes', icon: '📚' },
    { id: 'quran', name: 'Quran', icon: '📖' },
    { id: 'hadith', name: 'Hadith', icon: '💬' },
    { id: 'wisdom', name: 'Scholars', icon: '🎓' },
    { id: 'sufi', name: 'Sufi Wisdom', icon: '💫' }
  ];

  const backgroundStyles = [
    { id: 'gradient1', name: 'Ocean', class: 'bg-gradient-to-br from-blue-400 to-purple-600' },
    { id: 'gradient2', name: 'Sunset', class: 'bg-gradient-to-br from-orange-400 to-pink-600' },
    { id: 'gradient3', name: 'Forest', class: 'bg-gradient-to-br from-green-400 to-teal-600' },
    { id: 'gradient4', name: 'Gold', class: 'bg-gradient-to-br from-yellow-400 to-orange-600' },
    { id: 'solid1', name: 'Deep Blue', class: 'bg-blue-900' },
    { id: 'solid2', name: 'Emerald', class: 'bg-emerald-700' }
  ];

  const fontSizes = [
    { id: 'small', name: 'Small', class: 'text-lg' },
    { id: 'medium', name: 'Medium', class: 'text-xl' },
    { id: 'large', name: 'Large', class: 'text-2xl' }
  ];

  useEffect(() => {
    generateQuote();
  }, [selectedCategory]);

  const generateQuote = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const filteredQuotes = selectedCategory === 'all' 
        ? islamicQuotes 
        : islamicQuotes.filter(quote => quote.category === selectedCategory);
      
      const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
      setCurrentQuote(randomQuote);
      setIsLoading(false);
      
      toast({
        title: "New Quote Generated",
        description: "May this wisdom inspire your day",
      });
    }, 500);
  };

  const downloadQuote = () => {
    if (!currentQuote) return;
    
    // Create a canvas element to generate the image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;

    // Apply background
    const currentBg = backgroundStyles.find(bg => bg.id === backgroundStyle);
    if (currentBg?.class.includes('gradient')) {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#3B82F6'); // Default colors
      gradient.addColorStop(1, '#8B5CF6');
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = '#1E40AF';
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add text
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    
    // Word wrap the quote text
    const words = currentQuote.text.split(' ');
    const lines = [];
    let currentLine = '';
    
    for (const word of words) {
      const testLine = currentLine + word + ' ';
      if (ctx.measureText(testLine).width > 700) {
        lines.push(currentLine);
        currentLine = word + ' ';
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);

    // Draw the text lines
    const lineHeight = 35;
    const startY = (canvas.height - (lines.length * lineHeight)) / 2;
    
    lines.forEach((line, index) => {
      ctx.fillText(line.trim(), canvas.width / 2, startY + (index * lineHeight));
    });

    // Add author
    ctx.font = '20px Arial';
    ctx.fillText(`- ${currentQuote.author}`, canvas.width / 2, startY + (lines.length * lineHeight) + 50);

    // Download the image
    const link = document.createElement('a');
    link.download = 'islamic-quote.png';
    link.href = canvas.toDataURL();
    link.click();

    toast({
      title: "Quote Downloaded",
      description: "Quote image saved successfully!",
    });
  };

  const shareQuote = () => {
    if (!currentQuote) return;
    
    const shareText = `"${currentQuote.text}"\n\n- ${currentQuote.author}${currentQuote.source ? `\n${currentQuote.source}` : ''}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Islamic Quote',
        text: shareText,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to Clipboard",
        description: "Quote copied successfully!",
      });
    }
  };

  const getCurrentBackgroundClass = () => {
    return backgroundStyles.find(bg => bg.id === backgroundStyle)?.class || 'bg-blue-500';
  };

  const getCurrentFontSizeClass = () => {
    return fontSizes.find(fs => fs.id === fontSize)?.class || 'text-xl';
  };

  if (isLoading || !currentQuote) {
    return (
      <Card className="animate-pulse">
        <CardContent className="p-6">
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Quote className="w-5 h-5 text-blue-600" />
            Islamic Quote Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Category Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">Category:</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-2 rounded-lg text-xs transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
                      : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div>{category.icon}</div>
                  <div className="mt-1">{category.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Style Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Background:
              </label>
              <select 
                value={backgroundStyle}
                onChange={(e) => setBackgroundStyle(e.target.value)}
                className="w-full p-2 border rounded-lg text-sm"
              >
                {backgroundStyles.map((style) => (
                  <option key={style.id} value={style.id}>{style.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <Type className="w-4 h-4" />
                Font Size:
              </label>
              <select 
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="w-full p-2 border rounded-lg text-sm"
              >
                {fontSizes.map((size) => (
                  <option key={size.id} value={size.id}>{size.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end gap-2">
              <Button onClick={generateQuote} className="flex-1">
                <RefreshCw className="w-4 h-4 mr-2" />
                New Quote
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quote Display */}
      <Card className="overflow-hidden">
        <div className={`${getCurrentBackgroundClass()} p-8 text-white relative`}>
          {/* Arabic text if available */}
          {currentQuote.arabicText && (
            <div 
              className="text-center mb-6 opacity-90"
              dir="rtl"
              style={{ fontFamily: 'Amiri, Arabic Typesetting, serif' }}
            >
              <p className="text-lg leading-relaxed">{currentQuote.arabicText}</p>
            </div>
          )}

          {/* Main quote */}
          <div className="text-center">
            <Quote className="w-8 h-8 mx-auto mb-4 opacity-50" />
            <p className={`${getCurrentFontSizeClass()} leading-relaxed mb-6 font-medium`}>
              {currentQuote.text}
            </p>
            <div className="text-right">
              <p className="text-lg font-semibold">— {currentQuote.author}</p>
              {currentQuote.source && (
                <p className="text-sm opacity-80 mt-1">{currentQuote.source}</p>
              )}
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                {categories.find(cat => cat.id === currentQuote.category)?.name || currentQuote.category}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={shareQuote}
                className="flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadQuote}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IslamicQuoteGenerator;
