
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Heart, Share2, Copy } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

interface IslamicQuote {
  text: string;
  author: string;
  reference?: string;
}

const IslamicQuoteWidget: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<IslamicQuote | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const { copyToClipboard } = useCopyToClipboard();

  const islamicQuotes: IslamicQuote[] = [
    {
      text: "And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.",
      author: "Quran",
      reference: "65:3"
    },
    {
      text: "The believer is not one who eats his fill while his neighbor goes hungry.",
      author: "Prophet Muhammad (PBUH)",
      reference: "Bukhari"
    },
    {
      text: "Verily, with hardship comes ease.",
      author: "Quran",
      reference: "94:6"
    },
    {
      text: "The best of people are those who benefit others.",
      author: "Prophet Muhammad (PBUH)",
      reference: "Ahmad"
    },
    {
      text: "And Allah is the best of planners.",
      author: "Quran",
      reference: "8:30"
    },
    {
      text: "A good word is charity.",
      author: "Prophet Muhammad (PBUH)",
      reference: "Bukhari & Muslim"
    }
  ];

  useEffect(() => {
    // Set a random quote on component mount
    const randomQuote = islamicQuotes[Math.floor(Math.random() * islamicQuotes.length)];
    setCurrentQuote(randomQuote);
  }, []);

  const getNewQuote = () => {
    const randomQuote = islamicQuotes[Math.floor(Math.random() * islamicQuotes.length)];
    setCurrentQuote(randomQuote);
    setIsLiked(false);
  };

  const handleCopyQuote = () => {
    if (currentQuote) {
      const fullQuote = `"${currentQuote.text}" - ${currentQuote.author}${currentQuote.reference ? ` (${currentQuote.reference})` : ''}`;
      copyToClipboard(fullQuote, "Quote copied to clipboard");
    }
  };

  if (!currentQuote) return null;

  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-800">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
            ✨ Islamic Quote of the Day
          </div>
          
          <blockquote className="text-lg italic text-gray-800 dark:text-gray-200 leading-relaxed">
            "{currentQuote.text}"
          </blockquote>
          
          <div className="text-sm text-emerald-700 dark:text-emerald-300">
            <div className="font-semibold">{currentQuote.author}</div>
            {currentQuote.reference && (
              <div className="text-emerald-600 dark:text-emerald-400">
                {currentQuote.reference}
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 pt-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? 'text-red-500' : 'text-gray-500'}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopyQuote}
              className="text-gray-500 hover:text-gray-700"
            >
              <Copy className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={getNewQuote}
              className="text-emerald-600 hover:text-emerald-700"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicQuoteWidget;
