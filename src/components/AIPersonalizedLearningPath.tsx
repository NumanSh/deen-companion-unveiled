import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain } from 'lucide-react';

const AIPersonalizedLearningPath = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          AI Learning Path
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Personalized learning path coming soon...</p>
      </CardContent>
    </Card>
  );
};

export default AIPersonalizedLearningPath;