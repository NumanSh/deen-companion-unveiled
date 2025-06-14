
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, RotateCcw, Plus, Minus } from "lucide-react";
import BottomTabBar from "@/components/BottomTabBar";
import DuasSection from "@/components/DuasSection";

const Books = () => {
  const [dhikrCount, setDhikrCount] = useState(0);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);

  // Popular Surahs for quick access
  const popularSurahs = [
    { number: 1, name: "Al-Fatihah", meaning: "The Opening" },
    { number: 2, name: "Al-Baqarah", meaning: "The Cow" },
    { number: 18, name: "Al-Kahf", meaning: "The Cave" },
    { number: 36, name: "Ya-Sin", meaning: "Ya-Sin" },
    { number: 55, name: "Ar-Rahman", meaning: "The Beneficent" },
    { number: 67, name: "Al-Mulk", meaning: "The Sovereignty" },
    { number: 112, name: "Al-Ikhlas", meaning: "The Sincerity" },
    { number: 113, name: "Al-Falaq", meaning: "The Daybreak" },
    { number: 114, name: "An-Nas", meaning: "Mankind" },
  ];

  const resetDhikr = () => setDhikrCount(0);
  const incrementDhikr = () => setDhikrCount(prev => prev + 1);
  const decrementDhikr = () => setDhikrCount(prev => Math.max(0, prev - 1));

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20">
      <div className="flex-1 px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-center mb-8">Islamic Books</h1>
          
          {/* Duas Section - NEW */}
          <DuasSection />
          
          {/* Dhikr Counter */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-purple-900 dark:text-purple-100">
                Dhikr Counter
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-6xl font-bold text-purple-800 dark:text-purple-200 mb-4">
                {dhikrCount}
              </div>
              
              <div className="flex justify-center items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementDhikr}
                  className="h-12 w-12"
                >
                  <Minus className="h-6 w-6" />
                </Button>
                
                <Button
                  onClick={incrementDhikr}
                  size="lg"
                  className="h-16 w-32 text-lg bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="h-6 w-6 mr-2" />
                  Count
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={resetDhikr}
                  className="h-12 w-12"
                >
                  <RotateCcw className="h-6 w-6" />
                </Button>
              </div>
              
              <p className="text-purple-700 dark:text-purple-300 text-sm">
                Use this counter for Tasbih, Tahmid, Takbir, and other Dhikr
              </p>
            </CardContent>
          </Card>

          {/* Quran Quick Access */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="w-5 h-5 text-green-600" />
                Quran - Popular Surahs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {popularSurahs.map((surah) => (
                  <div
                    key={surah.number}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      selectedSurah === surah.number
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-200 hover:border-green-300 hover:bg-green-50/50 dark:hover:bg-green-900/10'
                    }`}
                    onClick={() => setSelectedSurah(selectedSurah === surah.number ? null : surah.number)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{surah.name}</h3>
                        <p className="text-sm text-muted-foreground">{surah.meaning}</p>
                      </div>
                      <div className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded text-sm font-medium">
                        {surah.number}
                      </div>
                    </div>
                    
                    {selectedSurah === surah.number && (
                      <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-700">
                        <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                          Click below to read Surah {surah.name}
                        </p>
                        <Button 
                          size="sm" 
                          className="w-full bg-green-600 hover:bg-green-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            // In a real app, this would navigate to the Quran reader
                            console.log(`Opening Surah ${surah.name}`);
                          }}
                        >
                          Read Surah
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Daily Dhikr Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Daily Dhikr Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Subhan Allah (سبحان الله)
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    "Glory be to Allah" - Recommended 33 times after each prayer
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                    Alhamdulillah (الحمد لله)
                  </h3>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    "All praise is due to Allah" - Recommended 33 times after each prayer
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                    Allahu Akbar (الله أكبر)
                  </h3>
                  <p className="text-purple-700 dark:text-purple-300 text-sm">
                    "Allah is the Greatest" - Recommended 34 times after each prayer
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <BottomTabBar />
    </div>
  );
};

export default Books;
