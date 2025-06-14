
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Moon, Plus, Calendar, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DreamEntry {
  id: string;
  date: string;
  dream: string;
  interpretation: string;
  mood: 'positive' | 'neutral' | 'negative';
  tags: string[];
}

const IslamicDreamJournal: React.FC = () => {
  const [dreams, setDreams] = useState<DreamEntry[]>([
    {
      id: '1',
      date: '2024-01-15',
      dream: 'I saw myself praying in a beautiful mosque with golden light',
      interpretation: 'This could signify spiritual growth and divine guidance. Light in dreams often represents knowledge and righteousness.',
      mood: 'positive',
      tags: ['prayer', 'mosque', 'light']
    }
  ]);
  const [newDream, setNewDream] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  const addDream = () => {
    if (!newDream.trim()) return;

    const dream: DreamEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      dream: newDream,
      interpretation: 'Reflect on this dream in light of Islamic teachings. Consider seeking guidance from knowledgeable sources.',
      mood: 'neutral',
      tags: ['personal']
    };

    setDreams([dream, ...dreams]);
    setNewDream('');
    setShowAddForm(false);
    
    toast({
      title: "Dream Added",
      description: "Your dream has been recorded in your journal.",
    });
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'positive': return 'bg-green-100 text-green-800 border-green-200';
      case 'negative': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-indigo-600" />
            Islamic Dream Journal
          </div>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            size="sm"
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Dream
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Dream Form */}
        {showAddForm && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
            <div className="space-y-3">
              <div className="text-sm font-medium">Describe your dream:</div>
              <Textarea
                value={newDream}
                onChange={(e) => setNewDream(e.target.value)}
                placeholder="I dreamed that..."
                className="min-h-[100px]"
              />
              <div className="flex gap-2">
                <Button onClick={addDream} className="bg-indigo-600 hover:bg-indigo-700">
                  Save Dream
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Islamic Dream Guidance */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
            🌙 Islamic Perspective on Dreams
          </h4>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            The Prophet (PBUH) said: "Good dreams are from Allah, and bad dreams are from Satan." 
            Record your dreams and seek their interpretation through Islamic knowledge.
          </p>
        </div>

        {/* Dreams List */}
        <div className="space-y-3">
          {dreams.map((dream) => (
            <div key={dream.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(dream.date).toLocaleDateString()}
                  </span>
                </div>
                <Badge className={getMoodColor(dream.mood)}>
                  {dream.mood}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-200 mb-1">Dream:</div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{dream.dream}</p>
                </div>
                
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-200 mb-1">Reflection:</div>
                  <p className="text-sm text-indigo-700 dark:text-indigo-300">{dream.interpretation}</p>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {dream.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {dreams.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Moon className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No dreams recorded yet. Start your spiritual dream journal!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IslamicDreamJournal;
