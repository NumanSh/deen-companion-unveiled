
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Search, 
  Star,
  Eye,
  Bookmark,
  Share2,
  Download,
  Filter,
  Book
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TafsirSource {
  id: string;
  name: string;
  author: string;
  period: string;
  methodology: string;
  language: string;
  isSelected: boolean;
}

interface VerseInterpretation {
  source: string;
  interpretation: string;
  keyPoints: string[];
  linguisticNotes?: string;
  historicalContext?: string;
}

const TafsirComparisonTool = () => {
  const { toast } = useToast();
  const [selectedVerse, setSelectedVerse] = useState({ surah: 1, verse: 1 });
  const [comparisonMode, setComparisonMode] = useState<'side-by-side' | 'tabbed'>('side-by-side');

  const [tafsirSources, setTafsirSources] = useState<TafsirSource[]>([
    {
      id: 'tabari',
      name: 'Tafsir al-Tabari',
      author: 'Ibn Jarir al-Tabari',
      period: '838-923 CE',
      methodology: 'Traditional/Historical',
      language: 'Arabic',
      isSelected: true
    },
    {
      id: 'qurtubi',
      name: 'Tafsir al-Qurtubi',
      author: 'Al-Qurtubi',
      period: '1214-1273 CE',
      methodology: 'Jurisprudential',
      language: 'Arabic',
      isSelected: true
    },
    {
      id: 'kathir',
      name: 'Tafsir Ibn Kathir',
      author: 'Ibn Kathir',
      period: '1300-1373 CE',
      methodology: 'Quran & Hadith',
      language: 'Arabic',
      isSelected: true
    },
    {
      id: 'maarif',
      name: 'Maariful Quran',
      author: 'Mufti Muhammad Shafi',
      period: '1898-1976 CE',
      methodology: 'Modern Traditional',
      language: 'Urdu/English',
      isSelected: false
    },
    {
      id: 'saadi',
      name: 'Tafsir as-Saadi',
      author: 'Abd al-Rahman al-Saadi',
      period: '1889-1956 CE',
      methodology: 'Simplified Modern',
      language: 'Arabic',
      isSelected: false
    }
  ]);

  const selectedSources = tafsirSources.filter(source => source.isSelected);

  const verseInterpretations: VerseInterpretation[] = [
    {
      source: 'Tafsir al-Tabari',
      interpretation: 'بسم الله الرحمن الرحيم - This is the opening formula that begins every chapter except one. It establishes the sacred nature of what follows and invokes Allah\'s name for blessing and guidance. The phrase combines Allah\'s essence with His attributes of mercy.',
      keyPoints: [
        'Acts as a seeking of blessing (barakah)',
        'Establishes the sacred context',
        'Combines divine essence with mercy',
        'Traditional opening for important acts'
      ],
      linguisticNotes: 'The Arabic structure emphasizes the comprehensive nature of Allah\'s mercy',
      historicalContext: 'Used by pre-Islamic Arabs for important undertakings'
    },
    {
      source: 'Tafsir al-Qurtubi',
      interpretation: 'The Basmalah serves multiple jurisprudential purposes: it marks the beginning of divine revelation, establishes the legal framework for recitation, and provides the foundation for ritual purity in worship. From a fiqh perspective, its recitation is mandatory in certain contexts.',
      keyPoints: [
        'Legal significance in Islamic jurisprudence',
        'Mandatory recitation in specific prayers',
        'Establishes ritual context',
        'Foundation for proper worship etiquette'
      ],
      linguisticNotes: 'Each name represents a different aspect of divine mercy',
      historicalContext: 'Adopted by the Muslim community as standard practice'
    },
    {
      source: 'Tafsir Ibn Kathir',
      interpretation: 'Based on authentic hadiths, the Prophet ﷺ emphasized the importance of beginning with Allah\'s name. The Basmalah connects the reader to prophetic tradition and ensures that any reading of the Quran follows the Sunnah method established by the Messenger of Allah.',
      keyPoints: [
        'Direct connection to prophetic tradition',
        'Supported by authentic hadiths',
        'Establishes Sunnah methodology',
        'Ensures proper spiritual preparation'
      ],
      linguisticNotes: 'The repetition of mercy attributes indicates divine emphasis',
      historicalContext: 'Recorded practice of the Prophet and early companions'
    }
  ];

  const handleToggleSource = (sourceId: string) => {
    setTafsirSources(sources =>
      sources.map(source =>
        source.id === sourceId ? { ...source, isSelected: !source.isSelected } : source
      )
    );
  };

  const handleBookmark = () => {
    toast({
      title: 'Comparison Bookmarked',
      description: `Saved comparison for Surah ${selectedVerse.surah}, Verse ${selectedVerse.verse}`,
      duration: 2000,
    });
  };

  const handleShare = () => {
    toast({
      title: 'Sharing Comparison',
      description: 'Generating shareable link...',
      duration: 2000,
    });
  };

  const handleExport = () => {
    toast({
      title: 'Exporting Comparison',
      description: 'Preparing PDF document...',
      duration: 2000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Tafsir Comparison Tool</h1>
                <p className="text-amber-200">Compare interpretations from classical and modern scholars</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{selectedSources.length}</div>
              <div className="text-amber-200">Sources Selected</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verse Selection & Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Surah</label>
                <select
                  value={selectedVerse.surah}
                  onChange={(e) => setSelectedVerse({...selectedVerse, surah: parseInt(e.target.value)})}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value={1}>1. Al-Fatihah</option>
                  <option value={2}>2. Al-Baqarah</option>
                  <option value={3}>3. Al-Imran</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Verse</label>
                <select
                  value={selectedVerse.verse}
                  onChange={(e) => setSelectedVerse({...selectedVerse, verse: parseInt(e.target.value)})}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  {[1,2,3,4,5,6,7].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              <Button className="mt-6">
                <Search className="w-4 h-4 mr-2" />
                Load Interpretations
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleBookmark}>
                <Bookmark className="w-4 h-4 mr-2" />
                Bookmark
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">View Mode:</span>
            <Button
              variant={comparisonMode === 'side-by-side' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setComparisonMode('side-by-side')}
            >
              Side by Side
            </Button>
            <Button
              variant={comparisonMode === 'tabbed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setComparisonMode('tabbed')}
            >
              Tabbed
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tafsir Source Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Select Tafsir Sources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tafsirSources.map((source) => (
              <Card
                key={source.id}
                className={`cursor-pointer transition-all duration-200 ${
                  source.isSelected ? 'border-amber-500 bg-amber-50' : 'hover:shadow-md'
                }`}
                onClick={() => handleToggleSource(source.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm">{source.name}</h3>
                    {source.isSelected && (
                      <Badge className="bg-amber-100 text-amber-800">Selected</Badge>
                    )}
                  </div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div><strong>Author:</strong> {source.author}</div>
                    <div><strong>Period:</strong> {source.period}</div>
                    <div><strong>Method:</strong> {source.methodology}</div>
                    <div><strong>Language:</strong> {source.language}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Arabic Text */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">
              Surah {selectedVerse.surah}, Verse {selectedVerse.verse}
            </h2>
            <div className="text-4xl font-arabic mb-4 leading-relaxed" dir="rtl">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <div className="text-lg text-gray-600 italic">
              "In the name of Allah, the Entirely Merciful, the Especially Merciful."
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Display */}
      {comparisonMode === 'side-by-side' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {verseInterpretations.slice(0, selectedSources.length).map((interpretation, index) => (
            <Card key={index} className="h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Book className="w-5 h-5 text-amber-600" />
                  {interpretation.source}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Interpretation</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {interpretation.interpretation}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Key Points</h4>
                  <ul className="text-sm space-y-1">
                    {interpretation.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Star className="w-3 h-3 text-amber-500 mt-1 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {interpretation.linguisticNotes && (
                  <div>
                    <h4 className="font-semibold mb-2">Linguistic Notes</h4>
                    <p className="text-sm text-blue-700 bg-blue-50 p-2 rounded">
                      {interpretation.linguisticNotes}
                    </p>
                  </div>
                )}

                {interpretation.historicalContext && (
                  <div>
                    <h4 className="font-semibold mb-2">Historical Context</h4>
                    <p className="text-sm text-green-700 bg-green-50 p-2 rounded">
                      {interpretation.historicalContext}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="0">
              <TabsList className="w-full">
                {verseInterpretations.slice(0, selectedSources.length).map((interpretation, index) => (
                  <TabsTrigger key={index} value={index.toString()} className="flex-1">
                    {interpretation.source}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {verseInterpretations.slice(0, selectedSources.length).map((interpretation, index) => (
                <TabsContent key={index} value={index.toString()} className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">{interpretation.source}</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {interpretation.interpretation}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Key Points</h4>
                      <ul className="space-y-2">
                        {interpretation.keyPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Star className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                            <span className="text-sm">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      {interpretation.linguisticNotes && (
                        <div>
                          <h4 className="font-semibold mb-2">Linguistic Notes</h4>
                          <p className="text-sm text-blue-700 bg-blue-50 p-3 rounded">
                            {interpretation.linguisticNotes}
                          </p>
                        </div>
                      )}
                      
                      {interpretation.historicalContext && (
                        <div>
                          <h4 className="font-semibold mb-2">Historical Context</h4>
                          <p className="text-sm text-green-700 bg-green-50 p-3 rounded">
                            {interpretation.historicalContext}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TafsirComparisonTool;
