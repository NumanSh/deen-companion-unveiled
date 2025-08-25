import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
      <Card>
        <CardHeader>
          <CardTitle>Quran Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">114 Surahs available</p>
        </CardContent>
      </Card>

      {/* Enhanced Quran Reader */}
      <Card>
        <CardHeader>
          <CardTitle>Enhanced Quran Reader</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Quran reader component - Coming Soon</p>
        </CardContent>
      </Card>

      {/* Reading Progress Tracker */}
      <Card>
        <CardHeader>
          <CardTitle>Reading Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Progress tracking - Coming Soon</p>
        </CardContent>
      </Card>

      {/* Surah Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Surah Grid</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Surah navigation - Coming Soon</p>
        </CardContent>
      </Card>

      {/* Reading Session Timer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Reading Session
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Reading session timer - Coming Soon</p>
        </CardContent>
      </Card>

      {/* Advanced Search - Lazy Loaded */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Search</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Advanced search features - Coming Soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuranTab;