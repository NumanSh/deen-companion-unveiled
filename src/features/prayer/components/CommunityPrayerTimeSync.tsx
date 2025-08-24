
import React, { useState, useEffect } from 'react';

interface PrayerTime {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  date: string;
}import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Clock, 
  MapPin, 
  Users, 
  Wifi, 
  WifiOff,
  Calendar,
  Bell,
  Globe,
  CheckCircle,
  AlertCircle,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PrayerTime {
  name: string;
  time: string;
  icon: React.ComponentType<any>;
  status: 'upcoming' | 'current' | 'completed';
}

interface CommunityMember {
  id: string;
  name: string;
  location: string;
  timezone: string;
  isOnline: boolean;
  lastPrayer: string;
  streak: number;
}

interface GlobalPrayerStats {
  totalMembers: number;
  currentlyPraying: number;
  completedToday: number;
  activeTimezones: number;
}

const CommunityPrayerTimeSync: React.FC = () => {
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimezone, setSelectedTimezone] = useState('local');
  const [communityMembers, setCommunityMembers] = useState<CommunityMember[]>([]);
  const [globalStats, setGlobalStats] = useState<GlobalPrayerStats>({
    totalMembers: 12400,
    currentlyPraying: 847,
    completedToday: 9234,
    activeTimezones: 67
  });

  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([
    { name: 'Fajr', time: '05:30', icon: Sunrise, status: 'completed' },
    { name: 'Dhuhr', time: '12:45', icon: Sun, status: 'completed' },
    { name: 'Asr', time: '15:30', icon: Sun, status: 'current' },
    { name: 'Maghrib', time: '18:15', icon: Sunset, status: 'upcoming' },
    { name: 'Isha', time: '19:45', icon: Moon, status: 'upcoming' }
  ]);

  const timezones = [
    { id: 'local', name: 'Local Time', members: 1247 },
    { id: 'mecca', name: 'Mecca (UTC+3)', members: 3456 },
    { id: 'istanbul', name: 'Istanbul (UTC+3)', members: 2134 },
    { id: 'london', name: 'London (UTC+0)', members: 1876 },
    { id: 'new_york', name: 'New York (UTC-5)', members: 1654 },
    { id: 'jakarta', name: 'Jakarta (UTC+7)', members: 2987 }
  ];

  useEffect(() => {
    // Load community members data
    const mockMembers: CommunityMember[] = [
      {
        id: '1',
        name: 'Ahmad Hassan',
        location: 'Riyadh, Saudi Arabia',
        timezone: 'UTC+3',
        isOnline: true,
        lastPrayer: 'Dhuhr',
        streak: 15
      },
      {
        id: '2',
        name: 'Fatima Al-Zahra',
        location: 'Istanbul, Turkey',
        timezone: 'UTC+3',
        isOnline: true,
        lastPrayer: 'Asr',
        streak: 23
      },
      {
        id: '3',
        name: 'Omar Khan',
        location: 'London, UK',
        timezone: 'UTC+0',
        isOnline: false,
        lastPrayer: 'Dhuhr',
        streak: 8
      },
      {
        id: '4',
        name: 'Aisha Rahman',
        location: 'New York, USA',
        timezone: 'UTC-5',
        isOnline: true,
        lastPrayer: 'Fajr',
        streak: 31
      }
    ];

    setCommunityMembers(mockMembers);

    // Update current time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []); // TODO: Add missing dependencies;

  const markPrayerCompleted = (prayerName: string) => {
    setPrayerTimes(prev => prev.map(prayer => 
      prayer.name === prayerName 
        ? { ...prayer, status: 'completed' as const }
        : prayer
    ));

    setGlobalStats(prev => ({
      ...prev,
      completedToday: prev.completedToday + 1,
      currentlyPraying: prev.currentlyPraying + 1
    }));

    toast({
      title: `${prayerName} Prayer Completed! 🤲`,
      description: "May Allah accept your prayer. Your streak continues!",
    });
  };

  const getPrayerStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'current': return 'bg-blue-100 text-blue-800';
      case 'upcoming': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCurrentPrayer = () => {
    return prayerTimes.find(prayer => prayer.status === 'current');
  };

  const currentPrayer = getCurrentPrayer();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Community Prayer Time Sync</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Stay connected with the global Muslim community through synchronized prayer times
        </p>
      </div>

      {/* Global Prayer Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{globalStats.totalMembers.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Total Members</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{globalStats.currentlyPraying}</div>
            <div className="text-xs text-gray-600">Currently Praying</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{globalStats.completedToday.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Completed Today</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Globe className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{globalStats.activeTimezones}</div>
            <div className="text-xs text-gray-600">Active Timezones</div>
          </CardContent>
        </Card>
      </div>

      {/* Current Prayer Highlight */}
      {currentPrayer && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <currentPrayer.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200">
                    {currentPrayer.name} Prayer Time
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400">
                    {currentPrayer.time} • Currently Active
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600">{globalStats.currentlyPraying} members praying now</span>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => markPrayerCompleted(currentPrayer.name)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Mark as Completed
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Prayer Times Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Today's Prayer Times
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {prayerTimes.map((prayer, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-3">
                  <prayer.icon className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-medium">{prayer.name}</div>
                    <div className="text-sm text-gray-600">{prayer.time}</div>
                  </div>
                </div>
                <Badge className={getPrayerStatusColor(prayer.status)}>
                  {prayer.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-600" />
              Global Timezones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {timezones.slice(0, 5).map((zone, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium">{zone.name}</div>
                    <div className="text-sm text-gray-600">{zone.members} members</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Community Members Online */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Community Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {communityMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {member.isOnline ? (
                      <Wifi className="w-4 h-4 text-green-500 absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" />
                    ) : (
                      <WifiOff className="w-4 h-4 text-gray-400 absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-gray-600">{member.location}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>Last: {member.lastPrayer}</span>
                      <span>•</span>
                      <span>{member.streak} day streak</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{member.timezone}</div>
                  <Badge variant={member.isOnline ? 'default' : 'secondary'} className="text-xs">
                    {member.isOnline ? 'Online' : 'Offline'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityPrayerTimeSync;
