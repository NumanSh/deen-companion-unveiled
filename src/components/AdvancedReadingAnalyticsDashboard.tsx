import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const AdvancedReadingAnalyticsDashboard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Reading Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Advanced reading analytics coming soon...</p>
      </CardContent>
    </Card>
  );
};

export default AdvancedReadingAnalyticsDashboard;