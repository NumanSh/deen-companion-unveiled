
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Clock, Plus, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PrayerRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  timestamp: Date;
  prayers: number;
  urgent: boolean;
}

const CommunityPrayerRequests = () => {
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [newRequest, setNewRequest] = useState({ title: '', description: '', category: 'general', urgent: false });
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const categories = [
    { value: 'health', label: 'Health & Healing', color: 'bg-red-100 text-red-800 border-red-200' },
    { value: 'family', label: 'Family', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { value: 'guidance', label: 'Guidance', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { value: 'success', label: 'Success', color: 'bg-green-100 text-green-800 border-green-200' },
    { value: 'general', label: 'General', color: 'bg-gray-100 text-gray-800 border-gray-200' }
  ];

  // Sample prayer requests
  useEffect(() => {
    const sampleRequests: PrayerRequest[] = [
      {
        id: '1',
        title: 'Recovery from Surgery',
        description: 'Please pray for my mother\'s quick recovery after her surgery. May Allah grant her strength and healing.',
        category: 'health',
        timestamp: new Date(),
        prayers: 47,
        urgent: true
      },
      {
        id: '2',
        title: 'Job Interview Success',
        description: 'I have an important job interview tomorrow. Please make dua that Allah opens this door if it\'s best for me.',
        category: 'success',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        prayers: 23,
        urgent: false
      },
      {
        id: '3',
        title: 'Family Reconciliation',
        description: 'Seeking prayers for peace and understanding in our family during this difficult time.',
        category: 'family',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        prayers: 31,
        urgent: false
      }
    ];
    setRequests(sampleRequests);
  }, []);

  const handleSubmitRequest = () => {
    if (!newRequest.title.trim() || !newRequest.description.trim()) {
      toast({
        title: "Please fill all fields",
        description: "Both title and description are required.",
        variant: "destructive"
      });
      return;
    }

    const request: PrayerRequest = {
      id: Date.now().toString(),
      ...newRequest,
      timestamp: new Date(),
      prayers: 0
    };

    setRequests(prev => [request, ...prev]);
    setNewRequest({ title: '', description: '', category: 'general', urgent: false });
    setShowForm(false);

    toast({
      title: "Prayer Request Shared",
      description: "May Allah answer your prayers and bless you.",
    });
  };

  const handlePray = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, prayers: req.prayers + 1 }
          : req
      )
    );

    toast({
      title: "Prayer Added",
      description: "May Allah accept your prayers and bless the requester.",
    });
  };

  const getCategoryStyle = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat?.color || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Card className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950 dark:to-pink-950 border-rose-200 dark:border-rose-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Users className="w-6 h-6 text-rose-600 dark:text-rose-400" />
              <Heart className="w-3 h-3 text-pink-500 absolute -top-1 -right-1" />
            </div>
            <span className="bg-gradient-to-r from-rose-700 to-pink-700 dark:from-rose-400 dark:to-pink-400 bg-clip-text text-transparent">
              Community Prayer Requests
            </span>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            size="sm"
            className="bg-rose-600 hover:bg-rose-700 text-white"
          >
            <Plus className="w-4 h-4 mr-1" />
            Request
          </Button>
        </CardTitle>
        <p className="text-sm text-rose-700 dark:text-rose-300">
          Share your needs and pray for others in our community
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {showForm && (
          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-rose-200 dark:border-rose-700 space-y-3">
            <Input
              placeholder="Prayer request title..."
              value={newRequest.title}
              onChange={(e) => setNewRequest(prev => ({ ...prev, title: e.target.value }))}
              className="border-rose-200 dark:border-rose-700"
            />
            <Textarea
              placeholder="Please describe what you need prayers for..."
              value={newRequest.description}
              onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
              className="border-rose-200 dark:border-rose-700"
              rows={3}
            />
            <div className="flex items-center gap-4">
              <select
                value={newRequest.category}
                onChange={(e) => setNewRequest(prev => ({ ...prev, category: e.target.value }))}
                className="border border-rose-200 dark:border-rose-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-800"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newRequest.urgent}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, urgent: e.target.checked }))}
                  className="text-rose-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Urgent</span>
              </label>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSubmitRequest} size="sm" className="bg-rose-600 hover:bg-rose-700">
                Share Request
              </Button>
              <Button onClick={() => setShowForm(false)} size="sm" variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-rose-200 dark:border-rose-700"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">{request.title}</h4>
                  {request.urgent && (
                    <Badge variant="destructive" className="text-xs">Urgent</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {formatTimeAgo(request.timestamp)}
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{request.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={getCategoryStyle(request.category)}>
                    {categories.find(c => c.value === request.category)?.label}
                  </Badge>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {request.prayers} prayers
                  </span>
                </div>
                <Button
                  onClick={() => handlePray(request.id)}
                  size="sm"
                  variant="outline"
                  className="text-rose-600 border-rose-300 hover:bg-rose-50"
                >
                  <Heart className="w-3 h-3 mr-1" />
                  Pray
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityPrayerRequests;
