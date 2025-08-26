import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Quote, RefreshCw, Heart, Share2, BookOpen } from 'lucide-react';
import { useCopyToClipboard } from '@/shared';
import { useToast } from '@/hooks/use-toast';

interface IslamicQuote {
  text: string;
  author: string;
  category: string;
  arabic?: string;
}

const IslamicQuotes: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<IslamicQuote | null>(null);
  const [favorites, setFavorites] = useState<IslamicQuote[]>([]);
  const { copyToClipboard } = useCopyToClipboard();
  const { toast } = useToast();

  const quotes: IslamicQuote[] = [
    {
      text: "And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.",
      author: "Quran 65:3",
      category: "Trust in Allah",
      arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ۚ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ"
    },
    {
      text: "And it is He who created the heavens and earth in truth. And the day He says, 'Be,' and it is, His word is the truth.",
      author: "Quran 6:73",
      category: "Allah's Power",
      arabic: "وَهُوَ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ بِالْحَقِّ ۖ وَيَوْمَ يَقُولُ كُن فَيَكُونُ ۚ قَوْلُهُ الْحَقُّ"
    },
    {
      text: "The believer is not one who eats his fill while his neighbor goes hungry.",
      author: "Prophet Muhammad (PBUH)",
      category: "Compassion"
    },
    {
      text: "Whoever believes in Allah and the Last Day should speak good or keep silent.",
      author: "Prophet Muhammad (PBUH)",
      category: "Good Speech"
    },
    {
      text: "And whoever fears Allah - He will make for him a way out.",
      author: "Quran 65:2",
      category: "Trust in Allah",
      arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا"
    },
    {
      text: "The world is green and beautiful, and Allah has appointed you as His stewards over it.",
      author: "Prophet Muhammad (PBUH)",
      category: "Environment"
    },
    {
      text: "Indeed, with hardship comes ease.",
      author: "Quran 94:6",
      category: "Hope",
      arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا"
    },
    {
      text: "The best of people are those who benefit mankind.",
      author: "Prophet Muhammad (PBUH)",
      category: "Service"
    }
  ];

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorite-quotes');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    // Set initial quote
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const getNewQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
  };

  const toggleFavorite = (quote: IslamicQuote) => {
    const isFavorite = favorites.some(fav => fav.text === quote.text);
    let newFavorites: IslamicQuote[];

    if (isFavorite) {
      newFavorites = favorites.filter(fav => fav.text !== quote.text);
      toast({
        title: 'Removed from Favorites',
        description: 'Quote removed from your favorites',
      });
    } else {
      newFavorites = [...favorites, quote];
      toast({
        title: 'Added to Favorites',
        description: 'Quote saved to your favorites',
      });
    }

    setFavorites(newFavorites);
    localStorage.setItem('favorite-quotes', JSON.stringify(newFavorites));
  };

  const shareQuote = (quote: IslamicQuote) => {
    const shareText = `"${quote.text}"\n\n- ${quote.author}\n\n#Islam #Quotes #Faith`;
    copyToClipboard(shareText);
    toast({
      title: 'Quote Copied',
      description: 'Quote copied to clipboard for sharing',
    });
  };

  const isFavorite = currentQuote ? favorites.some(fav => fav.text === currentQuote.text) : false;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-none">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Quote className="w-8 h-8" />
              Islamic Quotes
            </CardTitle>
            <p className="text-purple-100">Wisdom from Quran & Sunnah</p>
          </CardHeader>
        </Card>

        {/* Current Quote */}
        {currentQuote && (
          <Card className="bg-white/70 backdrop-blur-sm border-purple-200 dark:bg-gray-800/70 dark:border-purple-700">
            <CardContent className="p-8">
              {/* Arabic Text */}
              {currentQuote.arabic && (
                <div className="text-right mb-6" dir="rtl">
                  <p className="text-xl font-arabic text-gray-800 dark:text-gray-200 leading-relaxed">
                    {currentQuote.arabic}
                  </p>
                </div>
              )}

              {/* English Quote */}
              <div className="text-center mb-6">
                <Quote className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 leading-relaxed italic">
                  "{currentQuote.text}"
                </p>
              </div>

              {/* Author & Category */}
              <div className="text-center space-y-2">
                <p className="text-purple-600 dark:text-purple-400 font-semibold">
                  — {currentQuote.author}
                </p>
                <span className="inline-block bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                  {currentQuote.category}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-3 mt-8">
                <Button
                  onClick={() => toggleFavorite(currentQuote)}
                  variant={isFavorite ? "default" : "outline"}
                  size="sm"
                  className={isFavorite ? "bg-red-500 hover:bg-red-600 text-white" : ""}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Favorited' : 'Favorite'}
                </Button>
                <Button onClick={() => shareQuote(currentQuote)} variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button onClick={getNewQuote} variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  New Quote
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-current" />
                Your Favorite Quotes ({favorites.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {favorites.slice(0, 5).map((quote, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm italic mb-2">"{quote.text}"</p>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-purple-600 dark:text-purple-400">
                      — {quote.author}
                    </p>
                    <Button
                      onClick={() => shareQuote(quote)}
                      variant="ghost"
                      size="sm"
                    >
                      <Share2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
              {favorites.length > 5 && (
                <p className="text-center text-sm text-muted-foreground">
                  And {favorites.length - 5} more favorites...
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Quote Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Quote Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {['Trust in Allah', 'Compassion', 'Good Speech', 'Hope', 'Service', 'Environment'].map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const categoryQuotes = quotes.filter(q => q.category === category);
                    if (categoryQuotes.length > 0) {
                      setCurrentQuote(categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)]);
                    }
                  }}
                  className="text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IslamicQuotes;