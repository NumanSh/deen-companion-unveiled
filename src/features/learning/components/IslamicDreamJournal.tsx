
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Moon, 
  Star, 
  BookOpen, 
  Brain,
  Clock,
  Calendar,
  Search,
  Heart,
  Eye,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DreamEntry {
  id: string;
  date: Date;
  title: string;
  description: string;
  emotions: string[];
  islamicInterpretation: string;
  symbols: string[];
  significance: 'low' | 'medium' | 'high';
  category: 'spiritual' | 'personal' | 'guidance' | 'warning' | 'blessing';
}

const IslamicDreamJournal = () => {
  const { toast } = useToast();
  const [newDream, setNewDream] = useState({
    title: '',
    description: '',
    emotions: [] as string[]
  });

  const [dreamEntries] = useState<DreamEntry[]>([
    {
      id: '1',
      date: new Date(Date.now() - 86400000),
      title: 'Walking in a Beautiful Garden',
      description: 'I was walking through a lush green garden with flowing water and beautiful flowers. There was a bright light in the distance.',
      emotions: ['peaceful', 'joyful', 'hopeful'],
      islamicInterpretation: 'Gardens in dreams often represent Paradise (Jannah) and spiritual growth. The flowing water signifies purification and Allah\'s blessings. The bright light may represent divine guidance.',
      symbols: ['garden', 'water', 'light', 'flowers'],
      significance: 'high',
      category: 'spiritual'
    },
    {
      id: '2',
      date: new Date(Date.now() - 172800000),
      title: 'Reading Quran',
      description: 'I was reading the Quran in a mosque, and the words were glowing with golden light.',
      emotions: ['serene', 'blessed', 'focused'],
      islamicInterpretation: 'Reading Quran in dreams is considered highly blessed and indicates spiritual elevation. The golden light represents divine knowledge and barakah.',
      symbols: ['quran', 'mosque', 'golden light', 'reading'],
      significance: 'high',
      category: 'blessing'
    },
    {
      id: '3',
      date: new Date(Date.now() - 259200000),
      title: 'Flying Over Mountains',
      description: 'I was flying over high mountains and could see the whole world below me.',
      emotions: ['free', 'amazed', 'powerful'],
      islamicInterpretation: 'Flying dreams can indicate spiritual liberation and overcoming difficulties. Mountains represent challenges that you will overcome with Allah\'s help.',
      symbols: ['flying', 'mountains', 'height', 'world'],
      significance: 'medium',
      category: 'guidance'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const emotionOptions = [
    'peaceful', 'joyful', 'fearful', 'confused', 'hopeful', 'anxious', 
    'blessed', 'serene', 'powerful', 'humble', 'grateful', 'worried'
  ];

  const islamicSymbols = [
    { symbol: 'water', meaning: 'Purification, life, knowledge' },
    { symbol: 'light', meaning: 'Divine guidance, truth, righteousness' },
    { symbol: 'garden', meaning: 'Paradise, spiritual growth, peace' },
    { symbol: 'book', meaning: 'Knowledge, guidance, divine message' },
    { symbol: 'mosque', meaning: 'Spiritual center, community, worship' },
    { symbol: 'mountain', meaning: 'Challenges, stability, perseverance' },
    { symbol: 'bird', meaning: 'Soul, freedom, divine message' },
    { symbol: 'gold', meaning: 'Purity, value, divine blessing' }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'spiritual': return 'bg-purple-100 text-purple-800';
      case 'blessing': return 'bg-green-100 text-green-800';
      case 'guidance': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-red-100 text-red-800';
      case 'personal': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSaveDream = () => {
    if (!newDream.title || !newDream.description) {
      toast({
        title: 'Incomplete Entry',
        description: 'Please provide both title and description',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Dream Saved',
      description: 'Your dream has been recorded for Islamic interpretation',
      duration: 3000,
    });

    setNewDream({ title: '', description: '', emotions: [] });
  };

  const handleGetInterpretation = (dreamId: string) => {
    toast({
      title: 'AI Islamic Interpretation',
      description: 'Generating interpretation based on Islamic dream principles...',
      duration: 3000,
    });
  };

  const filteredDreams = selectedCategory === 'all' 
    ? dreamEntries 
    : dreamEntries.filter(dream => dream.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Islamic Dream Journal</h1>
                <p className="text-indigo-200">Record and understand your dreams through Islamic wisdom</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5" />
                <span className="text-lg font-semibold">{dreamEntries.length} Dreams</span>
              </div>
              <p className="text-sm text-indigo-200">Recorded</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Dream Entry */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-purple-600" />
            Record New Dream
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Dream Title</label>
            <input
              type="text"
              value={newDream.title}
              onChange={(e) => setNewDream({ ...newDream, title: e.target.value })}
              placeholder="Give your dream a meaningful title..."
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Dream Description</label>
            <Textarea
              value={newDream.description}
              onChange={(e) => setNewDream({ ...newDream, description: e.target.value })}
              placeholder="Describe your dream in detail. Include people, places, actions, and feelings..."
              className="min-h-32 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Emotions Felt</label>
            <div className="flex flex-wrap gap-2">
              {emotionOptions.map((emotion) => (
                <Button
                  key={emotion}
                  variant={newDream.emotions.includes(emotion) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    const emotions = newDream.emotions.includes(emotion)
                      ? newDream.emotions.filter(e => e !== emotion)
                      : [...newDream.emotions, emotion];
                    setNewDream({ ...newDream, emotions });
                  }}
                >
                  {emotion}
                </Button>
              ))}
            </div>
          </div>

          <Button onClick={handleSaveDream} className="w-full bg-purple-600 hover:bg-purple-700">
            <Moon className="w-4 h-4 mr-2" />
            Save Dream & Get Islamic Interpretation
          </Button>
        </CardContent>
      </Card>

      {/* Dream Categories Filter */}
      <div className="flex flex-wrap gap-2">
        {['all', 'spiritual', 'blessing', 'guidance', 'warning', 'personal'].map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category === 'all' ? 'All Dreams' : category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>

      {/* Dream Entries */}
      <div className="space-y-4">
        {filteredDreams.map((dream) => (
          <Card key={dream.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{dream.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{dream.date.toLocaleDateString()}</span>
                    </div>
                    <Badge className={getCategoryColor(dream.category)}>
                      {dream.category}
                    </Badge>
                    <Badge className={getSignificanceColor(dream.significance)}>
                      {dream.significance} significance
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleGetInterpretation(dream.id)}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Re-analyze
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Dream Description</h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{dream.description}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-green-600" />
                    Islamic Interpretation
                  </h4>
                  <p className="text-gray-700 bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                    {dream.islamicInterpretation}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Emotions</h4>
                    <div className="flex flex-wrap gap-1">
                      {dream.emotions.map((emotion) => (
                        <Badge key={emotion} variant="secondary" className="text-xs">
                          {emotion}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Symbols</h4>
                    <div className="flex flex-wrap gap-1">
                      {dream.symbols.map((symbol) => (
                        <Badge key={symbol} className="bg-blue-100 text-blue-800 text-xs">
                          {symbol}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Islamic Dream Symbols Reference */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            Islamic Dream Symbols Reference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {islamicSymbols.map((item) => (
              <div key={item.symbol} className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div className="font-semibold text-amber-800 mb-1 capitalize">{item.symbol}</div>
                <div className="text-sm text-amber-700">{item.meaning}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IslamicDreamJournal;
