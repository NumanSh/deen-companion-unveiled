import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';

const AdvancedQuranSearch = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Advanced Quran Search
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Advanced Quran search coming soon...</p>
      </CardContent>
    </Card>
  );
};

export default AdvancedQuranSearch;