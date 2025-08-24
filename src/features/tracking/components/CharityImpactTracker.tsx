
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Heart, TrendingUp, Users, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface CharityEntry {
  id: string;
  amount: number;
  cause: string;
  date: string;
  organization: string;
}

const CharityImpactTracker: React.FC = () => {
  const { t } = useLanguage();
  const [donations, setDonations] = useState<CharityEntry[]>([
    {
      id: '1',
      amount: 50,
      cause: t('food-for-orphans'),
      date: '2024-01-10',
      organization: t('local-islamic-center')
    },
    {
      id: '2',
      amount: 100,
      cause: t('water-wells'),
      date: '2024-01-05',
      organization: t('islamic-relief')
    }
  ]);
  
  const [newAmount, setNewAmount] = useState('');
  const [newCause, setNewCause] = useState('');
  const [monthlyGoal] = useState(200);
  const { toast } = useToast();

  const totalDonated = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const currentMonth = new Date().getMonth();
  const monthlyDonations = donations.filter(d => 
    new Date(d.date).getMonth() === currentMonth
  );
  const monthlyTotal = monthlyDonations.reduce((sum, donation) => sum + donation.amount, 0);
  const goalProgress = (monthlyTotal / monthlyGoal) * 100;

  const addDonation = () => {
    if (!newAmount || !newCause) return;

    const donation: CharityEntry = {
      id: Date.now().toString(),
      amount: parseFloat(newAmount),
      cause: newCause,
      date: new Date().toISOString().split('T')[0],
      organization: t('personal-charity')
    };

    setDonations([donation, ...donations]);
    setNewAmount('');
    setNewCause('');
    
    toast({
      title: t('donation-recorded'),
      description: `$${newAmount} ${t('for')} ${newCause} ${t('has-been-added-charity-tracker')}.`,
    });
  };

  const impactMetrics = [
    { icon: Users, label: t('people-helped'), value: Math.floor(totalDonated / 5), color: 'text-blue-600' },
    { icon: Heart, label: t('acts-kindness'), value: donations.length, color: 'text-red-600' },
    { icon: TrendingUp, label: t('this-month'), value: `$${monthlyTotal}`, color: 'text-green-600' },
    { icon: Gift, label: t('total-donated'), value: `$${totalDonated}`, color: 'text-purple-600' }
  ];

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-green-600" />
          {t('charity-impact-tracker')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Add */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
          <h4 className="font-medium mb-3">{t('record-donation')}</h4>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder={t('amount')}
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
            />
            <Input
              placeholder={t('cause-purpose')}
              value={newCause}
              onChange={(e) => setNewCause(e.target.value)}
            />
          </div>
          <Button 
            onClick={addDonation} 
            className="w-full mt-3 bg-green-600 hover:bg-green-700"
            disabled={!newAmount || !newCause}
          >
            {t('record-donation-btn')}
          </Button>
        </div>

        {/* Monthly Goal Progress */}
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800/20 dark:to-emerald-800/20 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-green-800 dark:text-green-200">{t('monthly-goal')}</h4>
            <span className="text-sm text-green-600 dark:text-green-300">
              ${monthlyTotal} / ${monthlyGoal}
            </span>
          </div>
          <Progress value={goalProgress} className="h-3 mb-2" />
          <p className="text-xs text-green-700 dark:text-green-300">
            {goalProgress >= 100 ? t('goal-achieved') : 
             `${Math.round(100 - goalProgress)}${t('remaining-goal')}`}
          </p>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-2 gap-3">
          {impactMetrics.map((metric, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
              <metric.icon className={`w-6 h-6 mx-auto mb-2 ${metric.color}`} />
              <div className="text-lg font-bold">{metric.value}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Donations */}
        <div>
          <h4 className="font-medium mb-3">{t('recent-donations')}</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {donations.slice(0, 5).map((donation) => (
              <div key={donation.id} className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded border">
                <div>
                  <div className="font-medium text-sm">{donation.cause}</div>
                  <div className="text-xs text-gray-500">{donation.organization}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">${donation.amount}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(donation.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Islamic Quote */}
        <div className="bg-green-100 dark:bg-green-800/20 p-3 rounded-lg text-center">
          <p className="text-sm italic text-green-800 dark:text-green-200">
            {t('charity-quote')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharityImpactTracker;
