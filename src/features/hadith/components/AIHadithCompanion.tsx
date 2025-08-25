import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Book, MessageCircle, Search, Sparkles } from 'lucide-react';

interface HadithAnalysis {
  hadith: string;
  authenticity: string;
  explanation: string;
  lifeApplication: string;
  relatedHadiths: string[];
}

const AIHadithCompanion: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [analysis, setAnalysis] = useState<HadithAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeHadith = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    // Mock AI analysis
    setTimeout(() => {
      setAnalysis({
        hadith: searchQuery,
        authenticity: "Sahih (Authentic) - Narrated by Bukhari and Muslim",
        explanation: "This hadith emphasizes the importance of good character and treating others with kindness and respect in Islam.",
        lifeApplication: "In daily life, this means being patient with family, honest in business dealings, and showing compassion to all creation.",
        relatedHadiths: [
          "The best of people are those who benefit others",
          "A believer is not one who eats his fill while his neighbor goes hungry"
        ]
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI Hadith Companion
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter hadith text or topic to analyze..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button onClick={analyzeHadith} disabled={isLoading}>
              {isLoading ? (
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              Analyze
            </Button>
          </div>

          {analysis && (
            <div className="space-y-4 mt-6">
              <Card className="border-purple-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Book className="w-4 h-4" />
                    Hadith Analysis
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm text-gray-600 mb-1">Authenticity</h4>
                      <p className="text-sm bg-green-50 p-2 rounded border-l-4 border-green-400">
                        {analysis.authenticity}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-600 mb-1">Explanation</h4>
                      <p className="text-sm">{analysis.explanation}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-600 mb-1">Life Application</h4>
                      <p className="text-sm bg-blue-50 p-2 rounded">{analysis.lifeApplication}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-600 mb-1">Related Hadiths</h4>
                      <ul className="text-sm space-y-1">
                        {analysis.relatedHadiths.map((hadith, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-gray-400">•</span>
                            {hadith}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIHadithCompanion;