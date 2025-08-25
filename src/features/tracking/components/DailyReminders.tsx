
import React, { useState, useEffect } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Bell, Clock, Sun, Moon, Book, RotateCcw, Plus, X } from 'lucide-react';
import { useToast } from '@/shared';

interface Reminder {
  id: string;
  type: 'prayer' | 'quran' | 'dhikr' | 'charity';
  title: string;
  description: string;
  time: string;
  enabled: boolean;
  repeat: 'daily' | 'weekly' | 'monthly';
  frequency: 'daily' | 'weekly' | 'monthly';
  days?: string[];
}

const DailyReminders: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
    type: 'dhikr',
    frequency: 'daily',
    enabled: true
  });
  const { toast } = useToast();

  useEffect(() => {
    // Load reminders from localStorage
    const saved = localStorage.getItem('islamic-app-reminders');
    if (saved) {
      setReminders(JSON.parse(saved));
    } else {
      // Set default reminders
      const defaultReminders: Reminder[] = [
        {
          id: '1',
          type: 'dhikr',
          title: 'Morning Dhikr',
          description: 'Start your day with morning dhikr',
          time: '07:00',
          enabled: true,
          repeat: 'daily',
          frequency: 'daily'
        },
        {
          id: '2',
          type: 'dhikr',
          title: 'Evening Dhikr',
          description: 'End your day with evening dhikr',
          time: '18:00',
          enabled: true,
          repeat: 'daily',
          frequency: 'daily'
        },
        {
          id: '3',
          type: 'quran',
          title: 'Quran Reading',
          description: 'Daily Quran reading session',
          time: '20:00',
          enabled: false,
          repeat: 'daily',
          frequency: 'daily'
        }
      ];
      setReminders(defaultReminders);
      localStorage.setItem('islamic-app-reminders', JSON.stringify(defaultReminders));
    }
  }, []); // TODO: Add missing dependencies;

  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          toast({
            title: "Notifications Enabled",
            description: "You'll receive daily reminders for your Islamic practices.",
          });
        }
      });
    }
  }, [toast]);

  const updateReminder = (id: string, updates: Partial<Reminder>) => {
    const updated = reminders.map(r => 
      r.id === id ? { ...r, ...updates } : r
    );
    setReminders(updated);
    localStorage.setItem('islamic-app-reminders', JSON.stringify(updated));
  };

  const addReminder = () => {
    if (!newReminder.title || !newReminder.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const reminder: Reminder = {
      id: Date.now().toString(),
      type: (newReminder.type as Reminder['type']) || 'dhikr',
      title: newReminder.title || '',
      description: newReminder.description || '',
      time: newReminder.time || '',
      enabled: newReminder.enabled || true,
      repeat: (newReminder.frequency as Reminder['repeat']) || 'daily',
      frequency: (newReminder.frequency as Reminder['frequency']) || 'daily'
    };

    const updated = [...reminders, reminder];
    setReminders(updated);
    localStorage.setItem('islamic-app-reminders', JSON.stringify(updated));
    
    setNewReminder({ type: 'dhikr', frequency: 'daily', enabled: true });
    setShowAddForm(false);
    
    toast({
      title: "Reminder Added",
      description: `${reminder.title} reminder has been set for ${reminder.time}.`,
    });
  };

  const deleteReminder = (id: string) => {
    const updated = reminders.filter(r => r.id !== id);
    setReminders(updated);
    localStorage.setItem('islamic-app-reminders', JSON.stringify(updated));
    
    toast({
      title: "Reminder Deleted",
      description: "The reminder has been removed.",
    });
  };

  const typeIcons = {
    prayer: Bell,
    dhikr: RotateCcw,
    quran: Book,
    charity: Moon
  };

  const typeColors = {
    prayer: 'text-green-600 bg-green-100',
    dhikr: 'text-purple-600 bg-purple-100',
    quran: 'text-blue-600 bg-blue-100',
    charity: 'text-orange-600 bg-orange-100'
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            Daily Reminders
          </CardTitle>
          <Button
            size="sm"
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Reminder
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Permission Status */}
        {Notification.permission !== 'granted' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800 mb-2">
              Enable notifications to receive reminders
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => Notification.requestPermission()}
            >
              Enable Notifications
            </Button>
          </div>
        )}

        {/* Add Reminder Form */}
        {showAddForm && (
          <Card className="border-dashed">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Add New Reminder</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAddForm(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    placeholder="Reminder title"
                    value={newReminder.title || ''}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Time</label>
                  <Input
                    type="time"
                    value={newReminder.time || ''}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <select
                    className="ml-2 text-sm border rounded px-2 py-1"
                    value={newReminder.type}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, type: e.target.value as Reminder['type'] }))}
                  >
                    <option value="dhikr">Dhikr</option>
                    <option value="quran">Quran</option>
                    <option value="charity">Charity</option>
                    <option value="prayer">Prayer</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Frequency</label>
                  <select
                    className="ml-2 text-sm border rounded px-2 py-1"
                    value={newReminder.frequency}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, frequency: e.target.value as Reminder['frequency'] }))}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
              </div>
              
              <Button onClick={addReminder} size="sm" className="w-full">
                Add Reminder
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Reminders List */}
        <div className="space-y-3">
          {reminders.map((reminder) => {
            const Icon = typeIcons[reminder.type];
            return (
              <div
                key={reminder.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${typeColors[reminder.type]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">{reminder.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-3 h-3" />
                      {reminder.time}
                      <span className="capitalize">• {reminder.frequency}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch
                    checked={reminder.enabled}
                    onCheckedChange={(enabled) => updateReminder(reminder.id, { enabled })}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteReminder(reminder.id)}
                    className="h-8 w-8 text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {reminders.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No reminders set</p>
            <p className="text-sm">Add reminders to stay consistent with your daily practices</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyReminders;
