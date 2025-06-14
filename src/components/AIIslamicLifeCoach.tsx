
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Heart, Compass, MessageCircle, Lightbulb, Star, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AIIslamicLifeCoach = () => {
  const [situation, setSituation] = useState('');
  const [coaching, setCoaching] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const getGuidance = async () => {
    if (!situation.trim()) {
      toast({
        title: "Please describe your situation",
        description: "Share what you're going through for personalized Islamic guidance.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI coaching analysis
    await new Promise(resolve => setTimeout(resolve, 3000));

    const mockCoaching = {
      islamicPerspective: "From an Islamic viewpoint, this challenge is an opportunity for spiritual growth. Allah tests those He loves to purify their hearts and strengthen their faith.",
      quranVerses: [
        { verse: "2:286", text: "Allah does not burden a soul beyond that it can bear" },
        { verse: "94:5-6", text: "Indeed, with hardship comes ease. Indeed, with hardship comes ease." }
      ],
      propheticGuidance: "The Prophet (peace be upon him) said: 'And know that victory comes with patience, relief with affliction, and ease with hardship.'",
      practicalSteps: [
        "Start each day with istighfar (seeking forgiveness) and gratitude",
        "Increase your dhikr during difficult moments",
        "Seek counsel from knowledgeable and trustworthy people",
        "Make dua during the blessed times (before Fajr, between Maghrib and Isha)"
      ],
      spiritualPrescription: "Focus on strengthening your relationship with Allah through consistent prayer, reading Quran, and remembrance. Trust in Allah's wisdom and timing.",
      warningSign: "Be cautious of despair and losing hope in Allah's mercy. Remember that He is Al-Ghafoor (The Forgiving) and Ar-Rahman (The Compassionate).",
      followUpActions: ["Daily reflection", "Increased charity", "Community support", "Consistent worship"]
    };

    setCoaching(mockCoaching);
    setIsAnalyzing(false);

    toast({
      title: "Guidance Received",
      description: "Your personalized Islamic life coaching is ready.",
    });
  };

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200 dark:border-amber-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <Compass className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            <Heart className="w-3 h-3 text-red-500 absolute -top-1 -right-1" />
          </div>
          <span className="bg-gradient-to-r from-amber-700 to-orange-700 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
            AI Islamic Life Coach
          </span>
        </CardTitle>
        <p className="text-sm text-amber-700 dark:text-amber-300">
          Get personalized Islamic guidance for life's challenges and decisions
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-amber-700 dark:text-amber-300">
            What situation do you need guidance for?
          </label>
          <Textarea
            placeholder="Describe your current challenge, decision, or life situation you need Islamic guidance for..."
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            className="border-amber-200 dark:border-amber-700 focus:border-amber-400"
            rows={4}
          />
        </div>

        <Button 
          onClick={getGuidance} 
          disabled={isAnalyzing}
          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
        >
          {isAnalyzing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing with Islamic wisdom...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Get Islamic Life Guidance
            </div>
          )}
        </Button>

        {coaching && (
          <div className="space-y-4">
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
              <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Islamic Perspective
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                {coaching.islamicPerspective}
              </p>
              
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-amber-600 dark:text-amber-400 mb-2">Quranic Guidance:</h5>
                  {coaching.quranVerses.map((item: any, index: number) => (
                    <div key={index} className="bg-amber-50 dark:bg-amber-900/50 p-3 rounded mb-2">
                      <div className="font-medium text-amber-700 dark:text-amber-300">{item.verse}</div>
                      <div className="text-sm text-amber-600 dark:text-amber-400">{item.text}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/50 p-3 rounded">
                  <h5 className="font-medium text-orange-700 dark:text-orange-300 mb-2">Prophetic Guidance:</h5>
                  <p className="text-sm text-orange-600 dark:text-orange-400 italic">
                    {coaching.propheticGuidance}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
              <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-3 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Practical Action Plan
              </h4>
              <div className="space-y-2">
                {coaching.practicalSteps.map((step: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <Badge variant="outline" className="text-xs mt-1">{index + 1}</Badge>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/50 p-4 rounded-lg border border-green-200 dark:border-green-700">
                <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">Spiritual Prescription</h5>
                <p className="text-sm text-green-600 dark:text-green-400">{coaching.spiritualPrescription}</p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/50 p-4 rounded-lg border border-red-200 dark:border-red-700">
                <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">⚠️ Be Mindful Of</h5>
                <p className="text-sm text-red-600 dark:text-red-400">{coaching.warningSign}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900 dark:to-orange-900 p-4 rounded-lg">
              <h5 className="font-semibold text-amber-700 dark:text-amber-300 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Follow-up Actions
              </h5>
              <div className="flex flex-wrap gap-2">
                {coaching.followUpActions.map((action: string, index: number) => (
                  <Badge key={index} variant="secondary" className="bg-amber-200 text-amber-800">
                    {action}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIIslamicLifeCoach;
