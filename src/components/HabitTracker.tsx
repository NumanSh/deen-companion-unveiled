import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, Target, Flame } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Habit {
  id: string;
  name: string;
  streak: number;
  completed: boolean;
  target: number;
  current: number;
}

const HabitTracker: React.FC = () => {
  const { toast } = useToast();
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      name: 'Daily Prayers',
      streak: 12,
      completed: false,
      target: 5,
      current: 3
    },
    {
      id: '2',
      name: 'Quran Reading',
      streak: 8,
      completed: true,
      target: 1,
      current: 1
    }
  ]);

  const toggleHabit = (habitId: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const updated = { ...habit, completed: !habit.completed };
        if (updated.completed) {
          updated.streak += 1;
          toast({
            title: 'Habit Completed!',
            description: `${habit.name} - Day ${updated.streak}`,
          });
        }
        return updated;
      }
      return habit;
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <Target className="w-5 h-5 text-green-600" />
        Islamic Habit Tracker
      </h3>
      
      {habits.map((habit) => (
        <Card key={habit.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{habit.name}</span>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-normal">{habit.streak} days</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Progress value={(habit.current / habit.target) * 100} className="w-full" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {habit.current} / {habit.target} completed
                </span>
                <Button
                  variant={habit.completed ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleHabit(habit.id)}
                  className="flex items-center gap-2"
                >
                  {habit.completed ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                  {habit.completed ? 'Completed' : 'Mark Complete'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HabitTracker;