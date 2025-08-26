import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, Heart, Calendar, TrendingUp, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import QuickFeatureCards from '@/components/QuickFeatureCards';

const SimpleDashboardTab: React.FC = () => {
  const navigate = useNavigate();

  const quickStats = [
    { title: 'Quran Progress', value: '15 Surahs Read', icon: BookOpen, color: 'text-green-600', bgColor: 'bg-green-50' },
    { title: 'Prayer Streak', value: '7 Days', icon: Clock, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { title: 'Daily Dhikr', value: '500 Times', icon: Heart, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { title: 'This Month', value: 'Rajab 1445', icon: Calendar, color: 'text-orange-600', bgColor: 'bg-orange-50' },
  ];

  const quickActions = [
    { title: 'Continue Reading', description: 'Surah Al-Baqarah', action: () => navigate('/'), icon: BookOpen },
    { title: 'Next Prayer', description: 'Maghrib in 2h 15m', action: () => navigate('/'), icon: Clock },
    { title: 'Qibla Direction', description: 'Find direction to Mecca', action: () => navigate('/qibla'), icon: Navigation },
    { title: 'Daily Quotes', description: 'Islamic wisdom & inspiration', action: () => navigate('/quotes'), icon: Heart },
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardHeader>
          <CardTitle className="text-2xl">Assalamu Alaikum</CardTitle>
          <p className="text-muted-foreground">Continue your spiritual journey today</p>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className={`${stat.bgColor} border-none`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Features */}
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-800">
        <CardContent className="p-6">
          <QuickFeatureCards />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              onClick={action.action}
              variant="ghost"
              className="w-full justify-start h-auto p-4"
            >
              <action.icon className="w-5 h-5 mr-3 text-primary" />
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-sm text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleDashboardTab;