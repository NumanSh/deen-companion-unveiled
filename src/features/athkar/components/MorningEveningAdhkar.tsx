
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sunrise, Sunset, Heart, BookOpen, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { AthkarItem, fetchAthkarByCategory } from '../services/athkarService';
import { useToast } from '@/hooks/use-toast';

const MorningEveningAdhkar: React.FC = () => {
  const [activeTime, setActiveTime] = useState<'morning' | 'evening'>('morning');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [expandedDhikr, setExpandedDhikr] = useState<string | null>(null);
  const [athkarList, setAthkarList] = useState<AthkarItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [counters, setCounters] = useState<Record<string, number>>({});
  const { toast } = useToast();

  useEffect(() => {
    loadAthkarForTime(activeTime);
    loadFavorites();
    loadCounters();
  }, [activeTime]);

  const loadAthkarForTime = async (time: 'morning' | 'evening') => {
    setIsLoading(true);
    try {
      const athkar = await fetchAthkarByCategory(time);
      setAthkarList(athkar);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load Athkar. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadFavorites = () => {
    const saved = localStorage.getItem('adhkar-favorites');
    if (saved) {
      setFavorites(new Set(JSON.parse(saved)));
    }
  };

  const loadCounters = () => {
    const saved = localStorage.getItem('adhkar-counters');
    if (saved) {
      setCounters(JSON.parse(saved));
    }
  };

  const saveFavorites = (newFavorites: Set<string>) => {
    localStorage.setItem('adhkar-favorites', JSON.stringify(Array.from(newFavorites)));
    setFavorites(newFavorites);
  };

  const saveCounters = (newCounters: Record<string, number>) => {
    localStorage.setItem('adhkar-counters', JSON.stringify(newCounters));
    setCounters(newCounters);
  };

  const toggleFavorite = (athkarId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(athkarId)) {
      newFavorites.delete(athkarId);
    } else {
      newFavorites.add(athkarId);
    }
    saveFavorites(newFavorites);
  };

  const incrementCounter = (athkarId: string, target: number) => {
    const currentCount = counters[athkarId] || 0;
    const newCount = Math.min(currentCount + 1, target);
    const newCounters = { ...counters, [athkarId]: newCount };
    saveCounters(newCounters);

    if (newCount === target) {
      toast({
        title: "Dhikr Complete! 🎉",
        description: "You've completed this dhikr. May Allah accept it.",
      });
    }
  };

  const resetCounter = (athkarId: string) => {
    const newCounters = { ...counters };
    delete newCounters[athkarId];
    saveCounters(newCounters);
  };

  const resetAllCounters = () => {
    setCounters({});
    localStorage.removeItem('adhkar-counters');
    toast({
      title: "All Counters Reset",
      description: "All dhikr counters have been reset.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-center">
          <BookOpen className="w-5 h-5 text-teal-600" />
          اذكار الصباح والمساء
        </CardTitle>
        <p className="text-center text-sm text-muted-foreground">
          Morning and Evening Remembrance of Allah
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Time Selection */}
        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <Button
            variant={activeTime === 'morning' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTime('morning')}
            className={cn(
              "flex-1 flex items-center gap-2",
              activeTime === 'morning' 
                ? "bg-orange-500 hover:bg-orange-600 text-white" 
                : "hover:bg-orange-100 dark:hover:bg-orange-900/20"
            )}
          >
            <Sunrise className="w-4 h-4" />
            اذكار الصباح
          </Button>
          <Button
            variant={activeTime === 'evening' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTime('evening')}
            className={cn(
              "flex-1 flex items-center gap-2",
              activeTime === 'evening' 
                ? "bg-indigo-500 hover:bg-indigo-600 text-white" 
                : "hover:bg-indigo-100 dark:hover:bg-indigo-900/20"
            )}
          >
            <Sunset className="w-4 h-4" />
            اذكار المساء
          </Button>
        </div>

        {/* Time Info */}
        <div className={cn(
          "p-3 rounded-lg text-center text-sm",
          activeTime === 'morning' 
            ? "bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200"
            : "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-200"
        )}>
          {activeTime === 'morning' 
            ? "Recite these adhkar from Fajr until sunrise (approximately 15 minutes after sunrise)"
            : "Recite these adhkar from Maghrib until Isha prayer time"
          }
        </div>

        {/* Reset All Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={resetAllCounters}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset All Counters
          </Button>
        </div>

        {/* Adhkar List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
              Loading Athkar...
            </div>
          ) : athkarList.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No Athkar available for this time.
            </div>
          ) : (
            athkarList.map((athkar, index) => {
              const currentCount = counters[athkar.id] || 0;
              const target = athkar.repetitions || 1;
              const isComplete = currentCount >= target;
              
              return (
                <div
                  key={athkar.id}
                  className={cn(
                    "border rounded-lg p-4 space-y-4 transition-colors",
                    isComplete 
                      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white",
                        activeTime === 'morning' ? "bg-orange-500" : "bg-indigo-500",
                        isComplete && "bg-green-500"
                      )}>
                        {isComplete ? "✓" : index + 1}
                      </div>
                      {athkar.repetitions && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            {currentCount}/{target}
                          </span>
                          {target > 1 && (
                            <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className={cn(
                                  "h-2 rounded-full transition-all",
                                  activeTime === 'morning' ? "bg-orange-500" : "bg-indigo-500",
                                  isComplete && "bg-green-500"
                                )}
                                style={{ width: `${(currentCount / target) * 100}%` }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(athkar.id)}
                        className="h-8 w-8"
                      >
                        <Heart
                          className={cn(
                            "w-4 h-4",
                            favorites.has(athkar.id)
                              ? "fill-red-500 text-red-500"
                              : "text-gray-400"
                          )}
                        />
                      </Button>
                      {!isComplete && target > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => incrementCounter(athkar.id, target)}
                        >
                          Count
                        </Button>
                      )}
                      {currentCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => resetCounter(athkar.id)}
                        >
                          <RotateCcw className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Arabic Text */}
                  <div className="text-right">
                    <p className="text-xl leading-loose font-arabic" dir="rtl">
                      {athkar.arabic}
                    </p>
                  </div>

                  {/* Transliteration */}
                  {athkar.transliteration && (
                    <div>
                      <p className="text-sm font-medium text-blue-600 mb-1">Transliteration:</p>
                      <p className="text-sm italic text-gray-700 dark:text-gray-300">
                        {athkar.transliteration}
                      </p>
                    </div>
                  )}

                  {/* Translation and Reference */}
                  {(expandedDhikr === athkar.id) && (
                    <div className="space-y-3 border-t pt-3">
                      {athkar.translation && (
                        <div>
                          <p className="text-sm font-medium text-green-600 mb-1">Translation:</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {athkar.translation}
                          </p>
                        </div>
                      )}
                      
                      {athkar.reference && (
                        <div>
                          <p className="text-sm font-medium text-purple-600 mb-1">Reference:</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {athkar.reference}
                          </p>
                        </div>
                      )}

                      {athkar.benefit && (
                        <div>
                          <p className="text-sm font-medium text-orange-600 mb-1">Benefit:</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {athkar.benefit}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedDhikr(expandedDhikr === athkar.id ? null : athkar.id)}
                    className="text-xs"
                  >
                    {expandedDhikr === athkar.id ? "Show less" : "Show details"}
                  </Button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs text-muted-foreground bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
          <p>May Allah accept your dhikr and grant you His protection and blessings.</p>
          <p className="mt-1 font-arabic text-sm">بارك الله فيكم</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MorningEveningAdhkar;
