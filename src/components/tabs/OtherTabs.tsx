import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ScrollText, 
  Book, 
  Heart, 
  Bookmark, 
  BarChart3, 
  Bell, 
  Trophy,
  Users,
  Sparkles,
  Clock
} from 'lucide-react';
import PersonalizedPrayerNotifications from '@/components/PersonalizedPrayerNotifications';

export const HadithTab = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ScrollText className="w-6 h-6 text-amber-600" />
          Hadith Collection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Explore authentic Hadith collections from Sahih Bukhari, Sahih Muslim, and other trusted sources.
        </p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {['Sahih Bukhari', 'Sahih Muslim', 'Sunan Abu Dawud', 'Jami` at-Tirmidhi', 'Sunan an-Nasa\'i', 'Sunan Ibn Majah'].map((collection) => (
            <Button key={collection} variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Book className="w-6 h-6 text-amber-600" />
              <span className="text-sm font-medium">{collection}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export const AdhkarTab = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-rose-600" />
          Daily Adhkar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Morning and evening remembrance of Allah with authentic supplications.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-amber-800 mb-2">Morning Adhkar</h3>
              <p className="text-sm text-amber-700">Start your day with beautiful remembrance</p>
              <Badge className="mt-2 bg-amber-100 text-amber-800">23 Adhkar</Badge>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-indigo-800 mb-2">Evening Adhkar</h3>
              <p className="text-sm text-indigo-700">End your day in remembrance</p>
              <Badge className="mt-2 bg-indigo-100 text-indigo-800">18 Adhkar</Badge>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  </div>
);

export const DhikrTab = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-emerald-600" />
          Dhikr Counter
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Keep track of your daily dhikr with our digital counter.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Subhan Allah', count: 33, color: 'bg-green-100 text-green-800' },
            { name: 'Alhamdulillah', count: 33, color: 'bg-blue-100 text-blue-800' },
            { name: 'Allahu Akbar', count: 34, color: 'bg-purple-100 text-purple-800' }
          ].map((dhikr) => (
            <Card key={dhikr.name} className="text-center">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{dhikr.name}</h3>
                <div className="text-3xl font-bold text-gray-800 mb-2">0</div>
                <Badge className={dhikr.color}>Target: {dhikr.count}</Badge>
                <Button className="w-full mt-3">Start Counting</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export const BookmarksTab = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bookmark className="w-6 h-6 text-blue-600" />
          My Bookmarks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Your saved verses, duas, and hadith for quick access.
        </p>
        <div className="space-y-3">
          {[
            { type: 'Surah', title: 'Al-Fatiha', subtitle: 'The Opening' },
            { type: 'Dua', title: 'Morning Protection', subtitle: 'Daily Adhkar' },
            { type: 'Hadith', title: 'On Seeking Knowledge', subtitle: 'Sahih Bukhari' }
          ].map((item, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="secondary" className="mb-2">{item.type}</Badge>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.subtitle}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Bookmark className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export const AnalyticsTab = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-green-600" />
          Reading Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">156</div>
            <div className="text-sm text-gray-600">Pages Read</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">7</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">23</div>
            <div className="text-sm text-gray-600">Surahs Completed</div>
          </Card>
        </div>
      </CardContent>
    </Card>
  </div>
);

export const RemindersTab = () => (
  <PersonalizedPrayerNotifications />
);

export const AchievementsTab = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-600" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'First Steps', description: 'Complete your first reading session', earned: true },
            { title: 'Consistent Reader', description: 'Read for 7 consecutive days', earned: true },
            { title: 'Surah Master', description: 'Complete 10 different surahs', earned: false },
            { title: 'Monthly Devotee', description: 'Read for 30 consecutive days', earned: false }
          ].map((achievement, index) => (
            <Card key={index} className={`p-4 ${achievement.earned ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                <Trophy className={`w-8 h-8 ${achievement.earned ? 'text-yellow-600' : 'text-gray-400'}`} />
                <div>
                  <h3 className="font-semibold">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export const PersonalizedTab = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-600" />
          Personalized Experience
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          AI-powered recommendations tailored to your spiritual journey.
        </p>
        <div className="space-y-4">
          <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50">
            <h3 className="font-semibold text-purple-800 mb-2">Today's Recommendation</h3>
            <p className="text-sm text-purple-700">Based on your reading history, we suggest exploring Surah Ar-Rahman</p>
          </Card>
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h3 className="font-semibold text-blue-800 mb-2">Learning Path</h3>
            <p className="text-sm text-blue-700">Continue your journey with "Understanding Prayer" - 3 lessons remaining</p>
          </Card>
        </div>
      </CardContent>
    </Card>
  </div>
);

export const CommunityTab = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-6 h-6 text-indigo-600" />
          Community
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Connect with fellow Muslims in your spiritual journey.
        </p>
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Reading Circles</h3>
            <p className="text-sm text-gray-600 mb-3">Join group reading sessions and discussions</p>
            <Button variant="outline">Join Circle</Button>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Daily Challenges</h3>
            <p className="text-sm text-gray-600 mb-3">Participate in community-wide spiritual challenges</p>
            <Button variant="outline">View Challenges</Button>
          </Card>
        </div>
      </CardContent>
    </Card>
  </div>
);
