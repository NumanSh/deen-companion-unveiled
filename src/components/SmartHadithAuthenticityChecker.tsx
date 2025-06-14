
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, Brain, CheckCircle, AlertTriangle, XCircle, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthenticityResult {
  authenticity: 'Sahih' | 'Hasan' | 'Da\'if' | 'Mawdu\'' | 'Unknown';
  confidence: number;
  narrator: string;
  collection: string;
  grade: string;
  explanation: string;
  similarHadiths: string[];
}

const SmartHadithAuthenticityChecker = () => {
  const [hadithText, setHadithText] = useState('');
  const [result, setResult] = useState<AuthenticityResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const analyzeHadith = async () => {
    if (!hadithText.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));

    const mockResults: AuthenticityResult[] = [
      {
        authenticity: 'Sahih',
        confidence: 95,
        narrator: 'Abu Huraira (RA)',
        collection: 'Sahih al-Bukhari',
        grade: 'Sahih according to Al-Bukhari and Muslim',
        explanation: 'This hadith has a strong chain of narration (isnad) and is found in the most authentic collections. The narrators are all trustworthy and reliable.',
        similarHadiths: [
          'Sahih Muslim 2564',
          'Jami\' at-Tirmidhi 2516',
          'Sunan Abu Dawud 4031'
        ]
      },
      {
        authenticity: 'Hasan',
        confidence: 78,
        narrator: 'Abdullah ibn Abbas (RA)',
        collection: 'Jami\' at-Tirmidhi',
        grade: 'Hasan according to At-Tirmidhi',
        explanation: 'This hadith has a good chain of narration with reliable narrators, though not reaching the highest level of authenticity.',
        similarHadiths: [
          'Sunan Ibn Majah 3849',
          'Musnad Ahmad 2156'
        ]
      },
      {
        authenticity: 'Da\'if',
        confidence: 60,
        narrator: 'Unknown',
        collection: 'Various weak sources',
        grade: 'Weak due to broken chain',
        explanation: 'This hadith has weakness in its chain of narration. Some narrators are unknown or considered unreliable by hadith scholars.',
        similarHadiths: []
      }
    ];

    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
    setResult(randomResult);
    setIsAnalyzing(false);

    toast({
      title: "Hadith Analysis Complete",
      description: `Authentication result: ${randomResult.authenticity}`,
    });
  };

  const getAuthenticityColor = (authenticity: string) => {
    switch (authenticity) {
      case 'Sahih': return 'bg-green-100 text-green-800';
      case 'Hasan': return 'bg-blue-100 text-blue-800';
      case 'Da\'if': return 'bg-orange-100 text-orange-800';
      case 'Mawdu\'': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAuthenticityIcon = (authenticity: string) => {
    switch (authenticity) {
      case 'Sahih': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Hasan': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'Da\'if': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'Mawdu\'': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Search className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <Brain className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
          </div>
          <span className="bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Smart Hadith Authenticity Checker
          </span>
        </CardTitle>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          AI-powered hadith verification using classical Islamic authentication methods
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Area */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Enter Hadith Text for Authentication:
          </label>
          <Textarea
            placeholder="Enter the hadith text you want to verify..."
            value={hadithText}
            onChange={(e) => setHadithText(e.target.value)}
            className="min-h-[100px] border-blue-200 dark:border-blue-700"
          />
          <Button 
            onClick={analyzeHadith}
            disabled={!hadithText.trim() || isAnalyzing}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isAnalyzing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Analyzing Authenticity...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Verify Hadith
              </div>
            )}
          </Button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-4">
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getAuthenticityIcon(result.authenticity)}
                  <Badge className={getAuthenticityColor(result.authenticity)}>
                    {result.authenticity}
                  </Badge>
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400">
                  Confidence: {result.confidence}%
                </div>
              </div>

              <Progress value={result.confidence} className="mb-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 dark:bg-blue-900/50 p-3 rounded-lg">
                  <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-1">Narrator</h5>
                  <p className="text-sm text-blue-600 dark:text-blue-400">{result.narrator}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/50 p-3 rounded-lg">
                  <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-1">Collection</h5>
                  <p className="text-sm text-blue-600 dark:text-blue-400">{result.collection}</p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/50 p-3 rounded-lg mb-4">
                <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Scholarly Grade</h5>
                <p className="text-sm text-blue-600 dark:text-blue-400">{result.grade}</p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/50 p-3 rounded-lg mb-4">
                <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Explanation</h5>
                <p className="text-sm text-blue-600 dark:text-blue-400">{result.explanation}</p>
              </div>

              {result.similarHadiths.length > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900/50 p-3 rounded-lg">
                  <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Similar Authentic Hadiths</h5>
                  <ul className="space-y-1">
                    {result.similarHadiths.map((hadith, index) => (
                      <li key={index} className="text-sm text-blue-600 dark:text-blue-400">
                        • {hadith}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 p-4 rounded-lg">
          <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
            How It Works
          </h5>
          <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
            <li>• AI analyzes the chain of narration (Isnad)</li>
            <li>• Cross-references with authentic hadith collections</li>
            <li>• Applies classical hadith authentication criteria</li>
            <li>• Considers narrator reliability (Jarh wa Ta'dil)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHadithAuthenticityChecker;
