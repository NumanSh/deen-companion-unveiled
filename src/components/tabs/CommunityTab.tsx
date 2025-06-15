
import React from 'react';
import CommunityChallenge from '@/components/CommunityChallenge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Heart, BookOpen, Trophy } from 'lucide-react';

const CommunityTab: React.FC = () => {
  return (
    <div className="space-y-6 p-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Community Hub
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Connect, learn, and grow together with fellow Muslims
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">12.4K</div>
            <div className="text-xs text-gray-600">Active Members</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">847</div>
            <div className="text-xs text-gray-600">Challenges Completed</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">156</div>
            <div className="text-xs text-gray-600">Study Circles</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">2.3K</div>
            <div className="text-xs text-gray-600">Acts of Kindness</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Community Challenge */}
      <CommunityChallenge />

      {/* Additional Community Features Placeholder */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm">👤</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Ahmad completed 100 dhikr</div>
                  <div className="text-xs text-gray-500">2 minutes ago</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm">👤</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Fatima joined Tafsir study circle</div>
                  <div className="text-xs text-gray-500">5 minutes ago</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-sm">👤</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Omar read Surah Al-Fatiha</div>
                  <div className="text-xs text-gray-500">8 minutes ago</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Aisha', points: 2847, rank: 1 },
                { name: 'Muhammad', points: 2134, rank: 2 },
                { name: 'Khadijah', points: 1965, rank: 3 },
                { name: 'You', points: 1247, rank: 12 }
              ].map((user, index) => (
                <div key={index} className={`flex items-center justify-between p-2 rounded ${user.name === 'You' ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      user.rank === 1 ? 'bg-yellow-500 text-white' : 
                      user.rank === 2 ? 'bg-gray-400 text-white' :
                      user.rank === 3 ? 'bg-amber-600 text-white' :
                      'bg-gray-200 text-gray-700'
                    }`}>
                      {user.rank}
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{user.points} pts</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommunityTab;
