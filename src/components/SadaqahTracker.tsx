
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Heart, TrendingUp, Gift, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SadaqahEntry {
  id: string;
  amount: number;
  type: string;
  description: string;
  date: string;
  anonymous: boolean;
}

const SadaqahTracker: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [selectedType, setSelectedType] = useState('money');
  const [description, setDescription] = useState('');
  const [monthlyGoal, setMonthlyGoal] = useState(100);
  const [entries, setEntries] = useState<SadaqahEntry[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const { toast } = useToast();

  const sadaqahTypes = [
    { id: 'money', label: 'Money Donation', emoji: '💰', unit: 'currency' },
    { id: 'food', label: 'Food/Meals', emoji: '🍽️', unit: 'meals' },
    { id: 'clothes', label: 'Clothing', emoji: '👕', unit: 'items' },
    { id: 'time', label: 'Volunteer Time', emoji: '⏰', unit: 'hours' },
    { id: 'knowledge', label: 'Teaching/Knowledge', emoji: '📚', unit: 'sessions' },
    { id: 'smile', label: 'Smile & Kindness', emoji: '😊', unit: 'acts' },
    { id: 'other', label: 'Other', emoji: '🤲', unit: 'acts' }
  ];

  const impactMessages = [
    "A small act of kindness can change someone's entire day",
    "Your generosity creates ripples of blessing",
    "Every act of charity purifies the soul",
    "The best people are those who benefit others",
    "Charity does not decrease wealth, but increases blessings"
  ];

  useEffect(() => {
    const saved = localStorage.getItem('sadaqah-entries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }

    const savedGoal = localStorage.getItem('sadaqah-monthly-goal');
    if (savedGoal) {
      setMonthlyGoal(Number(savedGoal));
    }
  }, []);

  const addSadaqahEntry = () => {
    if (!amount || !description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in the amount and description.",
        variant: "destructive",
      });
      return;
    }

    const entry: SadaqahEntry = {
      id: Date.now().toString(),
      amount: Number(amount),
      type: selectedType,
      description: description.trim(),
      date: new Date().toISOString(),
      anonymous: isAnonymous
    };

    const updated = [entry, ...entries];
    setEntries(updated);
    localStorage.setItem('sadaqah-entries', JSON.stringify(updated));

    // Reset form
    setAmount('');
    setDescription('');

    const randomMessage = impactMessages[Math.floor(Math.random() * impactMessages.length)];
    toast({
      title: "Sadaqah Recorded! 🤲",
      description: randomMessage,
    });
  };

  const getCurrentMonthTotal = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return entries
      .filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
      })
      .reduce((total, entry) => total + (entry.type === 'money' ? entry.amount : 0), 0);
  };

  const getTotalContributions = () => {
    return entries.length;
  };

  const getMonthlyProgress = () => {
    const total = getCurrentMonthTotal();
    return Math.min((total / monthlyGoal) * 100, 100);
  };

  const getSelectedTypeData = () => {
    return sadaqahTypes.find(type => type.id === selectedType) || sadaqahTypes[0];
  };

  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-emerald-600" />
          Sadaqah Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-emerald-600">
              ${getCurrentMonthTotal()}
            </div>
            <div className="text-xs text-gray-600">This Month</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {getTotalContributions()}
            </div>
            <div className="text-xs text-gray-600">Total Acts</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {getMonthlyProgress().toFixed(0)}%
            </div>
            <div className="text-xs text-gray-600">Goal Progress</div>
          </div>
        </div>

        {/* Monthly Goal Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Monthly Goal Progress</span>
            <span className="text-sm text-emerald-600">
              ${getCurrentMonthTotal()} / ${monthlyGoal}
            </span>
          </div>
          <Progress value={getMonthlyProgress()} className="h-3" />
        </div>

        {/* Add New Sadaqah */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            <Heart className="w-4 h-4 text-emerald-600" />
            Record New Sadaqah
          </h3>
          
          {/* Type Selection */}
          <div className="grid grid-cols-2 gap-2">
            {sadaqahTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`p-2 rounded-lg text-sm transition-colors text-left ${
                  selectedType === type.id
                    ? 'bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{type.emoji}</span>
                  <span>{type.label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Amount ({getSelectedTypeData().unit})
            </label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Enter ${getSelectedTypeData().unit}`}
              className="w-full"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What did you contribute?"
              className="w-full"
            />
          </div>

          {/* Anonymous Toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="anonymous"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="anonymous" className="text-sm">
              Keep this contribution private
            </label>
          </div>

          <Button
            onClick={addSadaqahEntry}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            Record Sadaqah
          </Button>
        </div>

        {/* Recent Entries */}
        {entries.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Recent Contributions</h4>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {entries.slice(0, 5).map((entry) => {
                const typeData = sadaqahTypes.find(t => t.id === entry.type) || sadaqahTypes[0];
                return (
                  <div key={entry.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{typeData.emoji}</span>
                        <span className="font-medium">{entry.description}</span>
                      </div>
                      <span className="text-emerald-600 font-medium">
                        {entry.amount} {typeData.unit}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Goal Setting */}
        <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Monthly Goal ($)</span>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={monthlyGoal}
                onChange={(e) => {
                  const newGoal = Number(e.target.value);
                  setMonthlyGoal(newGoal);
                  localStorage.setItem('sadaqah-monthly-goal', newGoal.toString());
                }}
                className="w-20 h-8 text-sm"
              />
              <Target className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SadaqahTracker;
