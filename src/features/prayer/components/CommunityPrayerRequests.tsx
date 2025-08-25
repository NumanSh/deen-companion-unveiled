
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  MessageCircle, 
  Users, 
  Plus,
  Calendar,
  MapPin,
  Clock,
  Send
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PrayerRequest {
  id: string;
  title: string;
  description: string;
  category: 'health' | 'family' | 'guidance' | 'success' | 'forgiveness' | 'general';
  author: string;
  timestamp: number;
  location?: string;
  urgent: boolean;
  prayerCount: number;
  supporters: string[];
  updates: Array<{
    id: string;
    message: string;
    timestamp: number;
    type: 'update' | 'gratitude' | 'request';
  }>;
}

const CommunityPrayerRequests = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<PrayerRequest[]>([
    {
      id: '1',
      title: 'Recovery for my mother',
      description: 'Please pray for my mother\'s quick recovery from her surgery. May Allah grant her complete healing.',
      category: 'health',
      author: 'Sister Fatima',
      timestamp: Date.now() - 2 * 60 * 60 * 1000,
      location: 'London, UK',
      urgent: true,
      prayerCount: 127,
      supporters: ['Ahmad', 'Khadijah', 'Yusuf'],
      updates: [
        {
          id: '1',
          message: 'Surgery went well, Alhamdulillah. Still need prayers for recovery.',
          timestamp: Date.now() - 1 * 60 * 60 * 1000,
          type: 'update'
        }
      ]
    },
    {
      id: '2',
      title: 'Guidance in career decision',
      description: 'Seeking Allah\'s guidance in choosing the right career path that pleases Him.',
      category: 'guidance',
      author: 'Brother Omar',
      timestamp: Date.now() - 4 * 60 * 60 * 1000,
      urgent: false,
      prayerCount: 89,
      supporters: ['Aisha', 'Ibrahim'],
      updates: []
    },
    {
      id: '3',
      title: 'Unity for our family',
      description: 'Please pray for reconciliation and understanding within our family during difficult times.',
      category: 'family',
      author: 'Sister Maryam',
      timestamp: Date.now() - 6 * 60 * 60 * 1000,
      urgent: false,
      prayerCount: 156,
      supporters: ['Zaynab', 'Hassan', 'Layla'],
      updates: []
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    category: 'general' as PrayerRequest['category'],
    location: '',
    urgent: false
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'health': return 'bg-red-100 text-red-800';
      case 'family': return 'bg-blue-100 text-blue-800';
      case 'guidance': return 'bg-purple-100 text-purple-800';
      case 'success': return 'bg-green-100 text-green-800';
      case 'forgiveness': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const handlePray = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { 
              ...req, 
              prayerCount: req.prayerCount + 1,
              supporters: [...req.supporters, 'You']
            }
          : req
      )
    );
    
    toast({
      title: 'Prayer Recorded 🤲',
      description: 'May Allah accept your prayers and grant ease.',
    });
  };

  const submitRequest = () => {
    if (!newRequest.title || !newRequest.description) return;
    
    const request: PrayerRequest = {
      id: Date.now().toString(),
      ...newRequest,
      author: 'You',
      timestamp: Date.now(),
      prayerCount: 0,
      supporters: [],
      updates: []
    };
    
    setRequests(prev => [request, ...prev]);
    setNewRequest({
      title: '',
      description: '',
      category: 'general',
      location: '',
      urgent: false
    });
    setShowForm(false);
    
    toast({
      title: 'Prayer Request Shared',
      description: 'May Allah answer your prayers and grant you ease.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            Community Prayer Requests
          </CardTitle>
          <p className="text-sm text-gray-600">
            "And when My servants ask you concerning Me, indeed I am near. I respond to the invocation of the supplicant when he calls upon Me." - Al-Baqarah 2:186
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span>{requests.length} Active Requests</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span>{requests.reduce((sum, r) => sum + r.prayerCount, 0)} Prayers Made</span>
              </div>
            </div>
            <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Request
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Request Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Share Your Prayer Request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Brief title for your request"
              value={newRequest.title}
              onChange={(e) => setNewRequest(prev => ({ ...prev, title: e.target.value }))}
            />
            
            <Textarea
              placeholder="Describe what you'd like the community to pray for..."
              value={newRequest.description}
              onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <select 
                value={newRequest.category}
                onChange={(e) => setNewRequest(prev => ({ ...prev, category: e.target.value as PrayerRequest['category'] }))}
                className="p-2 border rounded-md"
              >
                <option value="general">General</option>
                <option value="health">Health</option>
                <option value="family">Family</option>
                <option value="guidance">Guidance</option>
                <option value="success">Success</option>
                <option value="forgiveness">Forgiveness</option>
              </select>
              
              <Input
                placeholder="Location (optional)"
                value={newRequest.location}
                onChange={(e) => setNewRequest(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
            
            <div className="flex justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newRequest.urgent}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, urgent: e.target.checked }))}
                />
                <span className="text-sm">Urgent request</span>
              </label>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button onClick={submitRequest}>
                  <Send className="w-4 h-4 mr-2" />
                  Share Request
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Prayer Requests List */}
      <div className="space-y-4">
        {requests.map((request) => (
          <Card key={request.id} className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{request.title}</h3>
                    {request.urgent && (
                      <Badge className="bg-red-100 text-red-800">Urgent</Badge>
                    )}
                    <Badge className={getCategoryColor(request.category)}>
                      {request.category}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {request.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {request.author}
                    </span>
                    {request.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {request.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatTimeAgo(request.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Updates */}
              {request.updates.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-4">
                  <h4 className="font-semibold text-sm mb-2">Latest Update:</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {request.updates[0].message}
                  </p>
                </div>
              )}
              
              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => handlePray(request.id)}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={request.supporters.includes('You')}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    {request.supporters.includes('You') ? 'Prayed' : 'Pray'}
                  </Button>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>{request.prayerCount} prayers</span>
                  </div>
                </div>
                
                {request.supporters.length > 0 && (
                  <div className="text-sm text-gray-600">
                    {request.supporters.slice(0, 3).join(', ')}
                    {request.supporters.length > 3 && ` +${request.supporters.length - 3} more`}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityPrayerRequests;
