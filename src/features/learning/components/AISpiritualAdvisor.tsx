
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Brain, MessageCircle, Sparkles, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AISpiritualAdvisor = () => {
  const [question, setQuestion] = useState('');
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const spiritualAdvice = [
    "Remember that Allah is always with you in times of difficulty. Trust in His wisdom and have patience.",
    "Start your day with Fajr prayer and dhikr. The morning hours are blessed and bring barakah to your entire day.",
    "When facing decisions, pray Salat al-Istikhara and trust that Allah will guide you to what's best.",
    "Regular recitation of Surah Al-Mulk before sleep brings protection and peace to the heart.",
    "Give sadaqah, even if it's small. Charity purifies the soul and brings Allah's blessings.",
    "Seek knowledge, as it is the path to understanding your purpose and drawing closer to Allah."
  ];

  const handleGetAdvice = async () => {
    if (!question.trim()) {
      toast({
        title: "Please enter your question",
        description: "Share what's on your mind for personalized guidance.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const randomAdvice = spiritualAdvice[Math.floor(Math.random() * spiritualAdvice.length)];
    setAdvice(randomAdvice);
    setIsLoading(false);

    toast({
      title: "Guidance Received",
      description: "May this advice bring peace to your heart.",
    });
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 border-purple-200 dark:border-purple-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <Sparkles className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
          </div>
          <span className="bg-gradient-to-r from-purple-700 to-blue-700 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
            AI Spiritual Advisor
          </span>
        </CardTitle>
        <p className="text-sm text-purple-700 dark:text-purple-300">
          Get personalized Islamic guidance for life's challenges
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-purple-700 dark:text-purple-300">
            What's on your mind?
          </label>
          <Textarea
            placeholder="Ask about any aspect of Islamic life, spiritual growth, or seeking guidance..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border-purple-200 dark:border-purple-700 focus:border-purple-400"
            rows={3}
          />
        </div>

        <Button 
          onClick={handleGetAdvice} 
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Seeking Guidance...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Get Spiritual Guidance
            </div>
          )}
        </Button>

        {advice && (
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Spiritual Guidance</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{advice}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AISpiritualAdvisor;
