
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Edit2, Trash2, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly';
  streak: number;
  lastCompleted?: string;
  completions: string[];
}

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabitName, setNewHabitName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load habits from localStorage
    const savedHabits = localStorage.getItem('deen-companion-habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    } else {
      // Initialize with default habits
      const defaultHabits: Habit[] = [
        {
          id: '1',
          name: 'Fajr Prayer',
          description: 'Complete morning prayer',
          frequency: 'daily',
          streak: 5,
          completions: []
        },
        {
          id: '2',
          name: 'Quran Reading',
          description: 'Read at least 10 minutes daily',
          frequency: 'daily',
          streak: 3,
          completions: []
        },
        {
          id: '3',
          name: 'Dhikr (100x)',
          description: 'Complete 100 dhikr recitations',
          frequency: 'daily',
          streak: 7,
          completions: []
        }
      ];
      setHabits(defaultHabits);
      saveHabits(defaultHabits);
    }
  }, []);

  const saveHabits = (habitsToSave: Habit[]) => {
    localStorage.setItem('deen-companion-habits', JSON.stringify(habitsToSave));
  };

  const addHabit = () => {
    if (!newHabitName.trim()) return;

    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newHabitName,
      description: '',
      frequency: 'daily',
      streak: 0,
      completions: []
    };

    const updatedHabits = [...habits, newHabit];
    setHabits(updatedHabits);
    saveHabits(updatedHabits);
    setNewHabitName('');
    setShowAddForm(false);

    toast({
      title: "Habit Added",
      description: `${newHabitName} has been added to your tracking list.`,
    });
  };

  const toggleHabitCompletion = (habitId: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    setHabits(prevHabits => {
      const updatedHabits = prevHabits.map(habit => {
        if (habit.id === habitId) {
          const isCompletedToday = habit.completions.includes(today);
          
          if (isCompletedToday) {
            // Remove completion
            return {
              ...habit,
              completions: habit.completions.filter(date => date !== today),
              streak: Math.max(0, habit.streak - 1)
            };
          } else {
            // Add completion
            return {
              ...habit,
              completions: [...habit.completions, today],
              streak: habit.streak + 1,
              lastCompleted: today
            };
          }
        }
        return habit;
      });
      
      saveHabits(updatedHabits);
      return updatedHabits;
    });

    const habit = habits.find(h => h.id === habitId);
    const isCompleted = habit?.completions.includes(today);
    
    toast({
      title: isCompleted ? "Habit Unchecked" : "Habit Completed! 🎉",
      description: isCompleted 
        ? "Removed from today's completions" 
        : `Great job completing ${habit?.name}!`,
    });
  };

  const deleteHabit = (habitId: string) => {
    const updatedHabits = habits.filter(habit => habit.id !== habitId);
    setHabits(updatedHabits);
    saveHabits(updatedHabits);

    toast({
      title: "Habit Removed",
      description: "Habit has been deleted from your tracking list.",
    });
  };

  const getStreakDays = (habit: Habit) => {
    const today = new Date();
    const days = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      days.push({
        date: dateStr,
        completed: habit.completions.includes(dateStr),
        day: date.toLocaleDateString('en', { weekday: 'short' })
      });
    }
    
    return days;
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Habit Tracker</h2>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Habit
        </Button>
      </div>

      {/* Add Habit Form */}
      {showAddForm && (
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter habit name..."
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md"
                onKeyPress={(e) => e.key === 'Enter' && addHabit()}
              />
              <Button onClick={addHabit} size="sm">Add</Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Habits List */}
      <div className="space-y-4">
        {habits.map(habit => {
          const isCompletedToday = habit.completions.includes(today);
          const streakDays = getStreakDays(habit);
          
          return (
            <Card key={habit.id} className={cn(
              "transition-all",
              isCompletedToday && "ring-2 ring-green-200 bg-green-50 dark:bg-green-900/20"
            )}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={isCompletedToday}
                      onCheckedChange={() => toggleHabitCompletion(habit.id)}
                    />
                    <div>
                      <h3 className={cn(
                        "font-medium",
                        isCompletedToday && "text-green-700"
                      )}>
                        {habit.name}
                      </h3>
                      {habit.description && (
                        <p className="text-sm text-gray-600">{habit.description}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-sm font-medium text-orange-600">
                        🔥 {habit.streak} day streak
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteHabit(habit.id)}
                      className="h-8 w-8 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Weekly Progress */}
                <div className="flex gap-1">
                  {streakDays.map((day, index) => (
                    <div key={index} className="flex-1 text-center">
                      <div className="text-xs text-gray-500 mb-1">{day.day}</div>
                      <div className={cn(
                        "w-8 h-8 mx-auto rounded-full border-2 flex items-center justify-center",
                        day.completed 
                          ? "bg-green-500 border-green-500 text-white" 
                          : "border-gray-200 bg-gray-50"
                      )}>
                        {day.completed && <CheckCircle className="w-4 h-4" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {habits.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No habits tracked yet. Add your first habit to get started!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HabitTracker;
