
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Plus, Search, Calendar, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: string;
  tags: string[];
  reflectionPrompt?: string;
}

const SpiritualJournal: React.FC = () => {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: 'grateful',
    tags: [] as string[]
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const { toast } = useToast();

  const reflectionPrompts = [
    "What did I learn about myself through my worship today?",
    "How did Allah's guidance manifest in my life this week?",
    "What challenges tested my faith, and how did I respond?",
    "Which verse or hadith resonated with me recently, and why?",
    "How can I improve my relationship with Allah tomorrow?",
    "What am I most grateful to Allah for today?",
    "How did I serve others in the name of Allah?",
    "What sins do I need to seek forgiveness for?",
    "How has my character improved through Islamic teachings?",
    "What spiritual goal do I want to work towards?"
  ];

  const moods = [
    { id: 'grateful', label: t('grateful'), emoji: '🤲', color: 'bg-green-100 text-green-800' },
    { id: 'peaceful', label: t('peaceful'), emoji: '☮️', color: 'bg-blue-100 text-blue-800' },
    { id: 'hopeful', label: t('hopeful'), emoji: '🌟', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'reflective', label: t('reflective'), emoji: '🤔', color: 'bg-purple-100 text-purple-800' },
    { id: 'seeking', label: t('seeking'), emoji: '🧭', color: 'bg-orange-100 text-orange-800' }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('spiritual-journal-entries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }

    // Set a random prompt
    const randomPrompt = reflectionPrompts[Math.floor(Math.random() * reflectionPrompts.length)];
    setCurrentPrompt(randomPrompt);
  }, []);

  const saveEntry = () => {
    if (!newEntry.title || !newEntry.content) {
      toast({
        title: t('incomplete-entry'),
        description: t('add-title-content'),
        variant: "destructive",
      });
      return;
    }

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      title: newEntry.title,
      content: newEntry.content,
      mood: newEntry.mood,
      tags: newEntry.tags,
      reflectionPrompt: currentPrompt
    };

    const updatedEntries = [entry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('spiritual-journal-entries', JSON.stringify(updatedEntries));

    setNewEntry({ title: '', content: '', mood: 'grateful', tags: [] });
    setIsWriting(false);
    
    toast({
      title: t('entry-saved'),
      description: t('reflection-saved'),
    });
  };

  const addTag = (tag: string) => {
    if (tag && !newEntry.tags.includes(tag)) {
      setNewEntry(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewEntry(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          {t('spiritual-journal')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isWriting ? (
          <>
            {/* Header Actions */}
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setIsWriting(true)}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t('new-entry')}
              </Button>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder={t('search-journal')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Daily Prompt */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-indigo-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-indigo-800 dark:text-indigo-200">
                    {t('todays-reflection-prompt')}
                  </h4>
                  <p className="text-indigo-700 dark:text-indigo-300 mt-1">
                    {currentPrompt}
                  </p>
                </div>
              </div>
            </div>

            {/* Journal Entries */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredEntries.length > 0 ? (
                filteredEntries.map(entry => {
                  const mood = moods.find(m => m.id === entry.mood);
                  return (
                    <Card key={entry.id} className="bg-gray-50 dark:bg-gray-800">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{entry.title}</h4>
                            <div className="flex items-center gap-2">
                              <Badge className={mood?.color}>
                                {mood?.emoji} {mood?.label}
                              </Badge>
                              <span className="text-sm text-gray-500 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(entry.date)}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {entry.content.substring(0, 200)}
                            {entry.content.length > 200 && '...'}
                          </p>
                          
                          {entry.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {entry.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>{t('no-journal-entries')}</p>
                  <p className="text-sm">{t('start-spiritual-journaling')}</p>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Writing Mode */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{t('new-entry')}</h3>
              <Button
                variant="outline"
                onClick={() => setIsWriting(false)}
              >
                {t('cancel')}
              </Button>
            </div>

            <Input
              placeholder={t('entry-title')}
              value={newEntry.title}
              onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">{t('current-prompt')}</label>
              <div className="text-sm text-indigo-600 dark:text-indigo-400 italic bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded">
                {currentPrompt}
              </div>
            </div>

            <Textarea
              placeholder={t('write-reflections')}
              value={newEntry.content}
              onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
              className="min-h-32 resize-none"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">{t('mood')}:</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {moods.map(mood => (
                    <button
                      key={mood.id}
                      onClick={() => setNewEntry(prev => ({ ...prev, mood: mood.id }))}
                      className={`p-2 rounded-lg text-xs transition-all ${
                        newEntry.mood === mood.id
                          ? mood.color
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {mood.emoji} {mood.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">{t('tags')}:</label>
                <div className="flex flex-wrap gap-1 mt-2">
                  {newEntry.tags.map(tag => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      #{tag} ×
                    </Badge>
                  ))}
                  <Input
                    placeholder={t('add-tag')}
                    className="h-6 text-xs"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addTag(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={saveEntry}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              {t('save-entry')}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SpiritualJournal;
