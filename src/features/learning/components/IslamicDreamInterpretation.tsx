
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Moon, Stars, Brain, BookOpen, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const IslamicDreamInterpretation = () => {
  const [dream, setDream] = useState('');
  const [interpretation, setInterpretation] = useState<unknown>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const dreamSymbols = {
    water: { meaning: 'Knowledge, purity, or spiritual cleansing', significance: 'positive' },
    light: { meaning: 'Divine guidance, righteousness, or enlightenment', significance: 'positive' },
    flying: { meaning: 'Freedom from worldly concerns, spiritual elevation', significance: 'positive' },
    green: { meaning: 'Islam, paradise, or blessing', significance: 'positive' },
    mosque: { meaning: 'Spiritual refuge, community, or divine protection', significance: 'positive' },
    quran: { meaning: 'Divine guidance, wisdom, or spiritual awakening', significance: 'positive' },
    darkness: { meaning: 'Confusion, sin, or spiritual challenges', significance: 'caution' },
    falling: { meaning: 'Loss of faith, worldly concerns, or trials', significance: 'caution' }
  };

  const interpretDream = async () => {
    if (!dream.trim()) {
      toast({
        title: "Please describe your dream",
        description: "Share the details of your dream for interpretation.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Simple keyword matching for demo
    const foundSymbols = Object.entries(dreamSymbols).filter(([symbol]) => 
      dream.toLowerCase().includes(symbol)
    );

    const result = {
      symbols: foundSymbols.map(([symbol, data]) => ({ symbol, ...data })),
      generalInterpretation: "Dreams are a gift from Allah. Good dreams are from Allah, while confusing dreams may be from daily thoughts. Seek refuge in Allah from bad dreams and do not share them widely.",
      islamicGuidance: "Prophet Muhammad (peace be upon him) said: 'Good dreams are one of the forty-six parts of prophethood.' Trust in Allah's wisdom and seek His guidance through prayer.",
      recommendation: foundSymbols.length > 0 ? "Your dream contains positive spiritual symbols. Continue your spiritual journey with gratitude." : "Focus on your spiritual growth and maintain strong faith in Allah."
    };

    setInterpretation(result);
    setIsAnalyzing(false);

    toast({
      title: "Dream Analysis Complete",
      description: "May Allah grant you beneficial knowledge and guidance.",
    });
  };

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border-indigo-200 dark:border-indigo-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <Moon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <Stars className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
          </div>
          <span className="bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Islamic Dream Interpretation
          </span>
        </CardTitle>
        <p className="text-sm text-indigo-700 dark:text-indigo-300">
          Understand your dreams through Islamic wisdom and symbolism
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
            Describe Your Dream
          </label>
          <Textarea
            placeholder="Share the details of your dream... What did you see, feel, or experience?"
            value={dream}
            onChange={(e) => setDream(e.target.value)}
            className="border-indigo-200 dark:border-indigo-700 focus:border-indigo-400"
            rows={4}
          />
        </div>

        <Button 
          onClick={interpretDream} 
          disabled={isAnalyzing}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
        >
          {isAnalyzing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing Dream...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Interpret Dream
            </div>
          )}
        </Button>

        {interpretation && (
          <div className="space-y-4">
            {interpretation.symbols.length > 0 && (
              <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-indigo-200 dark:border-indigo-700">
                <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Dream Symbols Found
                </h4>
                <div className="space-y-2">
                  {interpretation.symbols.map((item: unknown, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <Badge 
                        variant={item.significance === 'positive' ? 'default' : 'secondary'}
                        className="mt-1"
                      >
                        {item.symbol}
                      </Badge>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{item.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-indigo-200 dark:border-indigo-700">
              <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Islamic Guidance
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{interpretation.islamicGuidance}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm italic">{interpretation.generalInterpretation}</p>
            </div>

            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 p-4 rounded-lg border border-indigo-200 dark:border-indigo-700">
              <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Recommendation</h4>
              <p className="text-indigo-600 dark:text-indigo-400 text-sm">{interpretation.recommendation}</p>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400 italic text-center">
          Remember: Only Allah knows the true meaning of dreams. This is for reflection and spiritual guidance only.
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicDreamInterpretation;
