import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen, Clock, Heart, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SimpleFloatingMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const quickActions = [
    { icon: BookOpen, label: 'Read Quran', path: '/quran' },
    { icon: Clock, label: 'Prayer Times', path: '/prayer' },
    { icon: Heart, label: 'Duas & Dhikr', path: '/athkar' },
    { icon: Calendar, label: 'Islamic Calendar', path: '/calendar' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 space-y-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              onClick={() => {
                navigate(action.path);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
              size="sm"
            >
              <action.icon className="w-4 h-4" />
              {action.label}
            </Button>
          ))}
        </div>
      )}
      
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
        size="icon"
      >
        <Plus className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-45' : ''}`} />
      </Button>
    </div>
  );
};

export default SimpleFloatingMenu;