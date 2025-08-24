
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  X, 
  BookOpen, 
  Search, 
  Clock,
  Heart,
  Settings,
  ChevronRight
} from 'lucide-react';

interface HelpTopic {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  steps: string[];
}

const FloatingHelpSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<HelpTopic | null>(null);

  const helpTopics: HelpTopic[] = [
    {
      id: 'reading',
      title: 'Reading the Quran',
      description: 'Learn how to use the Quran reader',
      icon: BookOpen,
      steps: [
        'Navigate to the Books tab',
        'Select the Quran section',
        'Choose a Surah to read',
        'Use the reading controls for audio',
        'Right-click for additional options'
      ]
    },
    {
      id: 'prayers',
      title: 'Prayer Times',
      description: 'Set up and track prayer times',
      icon: Clock,
      steps: [
        'Go to the Calendar page',
        'Allow location access for accurate times',
        'Set prayer reminders',
        'Track your prayer completion',
        'View Qibla direction'
      ]
    },
    {
      id: 'search',
      title: 'Searching Content',
      description: 'Find verses, hadiths, and duas',
      icon: Search,
      steps: [
        'Use the search bar in unknown section',
        'Filter by content type',
        'Search in Arabic or English',
        'Save useful results to bookmarks',
        'Share findings with others'
      ]
    },
    {
      id: 'habits',
      title: 'Spiritual Habits',
      description: 'Track your Islamic practices',
      icon: Heart,
      steps: [
        'Set daily reading goals',
        'Track dhikr and tasbeeh',
        'Monitor prayer consistency',
        'View progress analytics',
        'Celebrate achievements'
      ]
    }
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-20 right-4 z-40">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-lg rounded-full w-12 h-12 p-0"
        >
          <HelpCircle className="w-5 h-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 z-40 w-80">
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              <h3 className="font-semibold">
                {selectedTopic ? selectedTopic.title : 'Help & Guidance'}
              </h3>
            </div>
            <div className="flex items-center gap-1">
              {selectedTopic && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTopic(null)}
                  className="text-white hover:bg-white/20"
                >
                  Back
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="max-h-96 overflow-y-auto">
            {!selectedTopic ? (
              /* Topics List */
              <div className="p-4 space-y-3">
                <p className="text-sm text-gray-600 mb-4">
                  Choose a topic to get step-by-step guidance:
                </p>
                {helpTopics.map((topic) => {
                  const Icon = topic.icon;
                  return (
                    <Button
                      key={topic.id}
                      variant="ghost"
                      className="w-full justify-start h-auto p-3 hover:bg-gray-50"
                      onClick={() => setSelectedTopic(topic)}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="p-2 bg-teal-100 rounded-lg">
                          <Icon className="w-4 h-4 text-teal-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className="font-medium text-gray-800">
                            {topic.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {topic.description}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </Button>
                  );
                })}
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h4 className="font-medium text-gray-800 mb-2">Quick Tips</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                      <span>Right-click on unknown content for more options</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                      <span>Use keyboard shortcuts for faster navigation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                      <span>Enable notifications for prayer reminders</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Topic Steps */
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <selectedTopic.icon className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {selectedTopic.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {selectedTopic.description}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium text-gray-700">Steps to follow:</h5>
                  {selectedTopic.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Badge className="bg-teal-500 text-white min-w-[24px] h-6 rounded-full flex items-center justify-center text-xs">
                        {index + 1}
                      </Badge>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-3 bg-teal-50 rounded-lg">
                  <p className="text-sm text-teal-800">
                    💡 <strong>Tip:</strong> Take your time to explore each feature. 
                    The app is designed to support your spiritual journey at your own pace.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FloatingHelpSystem;
