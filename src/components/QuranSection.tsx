
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, Heart, Play, Eye } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface Surah {
  id: number;
  name: string;
  arabicName: string;
  verses: number;
  revelation: 'Meccan' | 'Medinan';
  translation: string;
}

interface QuranSectionProps {
  onAddToBookmarks: (id: number) => void;
  onSurahRead: (id: number) => void;
  readingSurahs: Set<number>;
  isLoading: boolean;
}

// Mock Quran data - first 10 surahs for demonstration
const mockSurahs: Surah[] = [
  { id: 1, name: 'Al-Fatihah', arabicName: 'الفاتحة', verses: 7, revelation: 'Meccan', translation: 'The Opening' },
  { id: 2, name: 'Al-Baqarah', arabicName: 'البقرة', verses: 286, revelation: 'Medinan', translation: 'The Cow' },
  { id: 3, name: 'Al-Imran', arabicName: 'آل عمران', verses: 200, revelation: 'Medinan', translation: 'The Family of Imran' },
  { id: 4, name: 'An-Nisa', arabicName: 'النساء', verses: 176, revelation: 'Medinan', translation: 'The Women' },
  { id: 5, name: 'Al-Maidah', arabicName: 'المائدة', verses: 120, revelation: 'Medinan', translation: 'The Table Spread' },
  { id: 6, name: 'Al-Anam', arabicName: 'الأنعام', verses: 165, revelation: 'Meccan', translation: 'The Cattle' },
  { id: 7, name: 'Al-Araf', arabicName: 'الأعراف', verses: 206, revelation: 'Meccan', translation: 'The Heights' },
  { id: 8, name: 'Al-Anfal', arabicName: 'الأنفال', verses: 75, revelation: 'Medinan', translation: 'The Spoils of War' },
  { id: 9, name: 'At-Tawbah', arabicName: 'التوبة', verses: 129, revelation: 'Medinan', translation: 'The Repentance' },
  { id: 10, name: 'Yunus', arabicName: 'يونس', verses: 109, revelation: 'Meccan', translation: 'Jonah' }
];

const QuranSection: React.FC<QuranSectionProps> = ({
  onAddToBookmarks,
  onSurahRead,
  readingSurahs,
  isLoading
}) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRevelation, setSelectedRevelation] = useState<'all' | 'Meccan' | 'Medinan'>('all');

  const filteredSurahs = mockSurahs.filter(surah => {
    const matchesSearch = surah.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         surah.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         surah.arabicName.includes(searchTerm);
    const matchesRevelation = selectedRevelation === 'all' || surah.revelation === selectedRevelation;
    return matchesSearch && matchesRevelation;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          Holy Quran
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search surahs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={selectedRevelation === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedRevelation('all')}
            >
              All
            </Button>
            <Button
              variant={selectedRevelation === 'Meccan' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedRevelation('Meccan')}
            >
              Meccan
            </Button>
            <Button
              variant={selectedRevelation === 'Medinan' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedRevelation('Medinan')}
            >
              Medinan
            </Button>
          </div>
        </div>

        {/* Surahs Grid */}
        <div className="grid gap-3">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
              Loading Surahs...
            </div>
          ) : filteredSurahs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No surahs found matching your search</p>
            </div>
          ) : (
            filteredSurahs.map((surah) => (
              <div
                key={surah.id}
                className={cn(
                  "border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors",
                  readingSurahs.has(surah.id) && "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {surah.id}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{surah.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{surah.translation}</p>
                    </div>
                  </div>
                  
                  <div className="text-right flex items-center gap-4">
                    <div>
                      <p className="text-xl font-arabic" dir="rtl">{surah.arabicName}</p>
                      <p className="text-xs text-gray-500">
                        {surah.verses} verses • {surah.revelation}
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onAddToBookmarks(surah.id)}
                        className="h-8 w-8"
                        title="Add to bookmarks"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onSurahRead(surah.id)}
                        className="h-8 w-8"
                        title="Read surah"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuranSection;
