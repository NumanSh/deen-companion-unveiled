import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { EnhancedQuranReader, ReadingProgressTracker, QuranSearchControls, QuranSurahGrid, QuranStats, QuranLoadingStates, ReadingSessionTimer, EnhancedQuranSearch, VerseShareCard, QuranWordSearch } from '@/features/quran';
import { useQuranData, useSurahContent, useOfflineQuran } from '@/features/quran';
import { LazyAdvancedQuranSearch } from '@/components/lazy/LazyAdvancedQuranSearch';
import { Clock, BookOpen, Search } from 'lucide-react';

const QuranTab = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-green-600" />
            Holy Quran
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Read, search, and explore the Noble Quran</p>
        </CardContent>
      </Card>

      {/* Quick Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Quick Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="Search for verses, surahs, or topics..." />
        </CardContent>
      </Card>

      {/* Quran Stats */}
      <QuranStats />

      {/* Enhanced Quran Reader */}
      <EnhancedQuranReader />

      {/* Reading Progress Tracker */}
      <ReadingProgressTracker />

      {/* Surah Grid */}
      <QuranSurahGrid />

      {/* Reading Session Timer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Reading Session
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ReadingSessionTimer />
        </CardContent>
      </Card>

      {/* Advanced Search - Lazy Loaded */}
      <LazyAdvancedQuranSearch />
    </div>
  );
};

export default QuranTab;