
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Heart, 
  Users, 
  Plus, 
  MessageCircle, 
  Clock,
  Star,
  Send,
  User,
  Globe,
  TrendingUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PrayerRequest {
  id: string;
  title: string;
  description: string;
  author: string;
  timestamp: Date;
  category: 'health' | 'family' | 'guidance' | 'success' | 'forgiveness' | 'other';
  supportCount: number;
  isSupported: boolean;
  urgency: 'low' | 'medium' | 'high';
}

const CommunityPrayerRequestsSystem = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<PrayerRequest[]>([
    {
      id: '1',
      title: 'الدعاء لوالدي المريض',
      description: 'أرجو منكم الدعاء لوالدي بالشفاء العاجل. يواجه صعوبات صحية ونحتاج دعواتكم.',
      author: 'أحمد محمد',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      category: 'health',
      supportCount: 24,
      isSupported: false,
      urgency: 'high'
    },
    {
      id: '2',
      title: 'التوفيق في الامتحانات',
      description: 'قربت امتحانات الجامعة، أدعوكم للدعاء لي بالتوفيق والنجاح.',
      author: 'فاطمة علي',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      category: 'success',
      supportCount: 18,
      isSupported: true,
      urgency: 'medium'
    },
    {
      id: '3',
      title: 'الهداية للأسرة',
      description: 'أدعوكم للدعاء لأسرتي بالهداية والصلاح. نحتاج دعواتكم الصادقة.',
      author: 'محمد سالم',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      category: 'guidance',
      supportCount: 35,
      isSupported: false,
      urgency: 'medium'
    }
  ]);

  const [isAddingRequest, setIsAddingRequest] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    category: 'other' as PrayerRequest['category'],
    urgency: 'medium' as PrayerRequest['urgency']
  });

  const categories = {
    health: { name: 'الصحة', color: 'bg-red-100 text-red-800', icon: '🏥' },
    family: { name: 'الأسرة', color: 'bg-blue-100 text-blue-800', icon: '👨‍👩‍👧‍👦' },
    guidance: { name: 'الهداية', color: 'bg-green-100 text-green-800', icon: '🕌' },
    success: { name: 'النجاح', color: 'bg-yellow-100 text-yellow-800', icon: '🎯' },
    forgiveness: { name: 'المغفرة', color: 'bg-purple-100 text-purple-800', icon: '🤲' },
    other: { name: 'أخرى', color: 'bg-gray-100 text-gray-800', icon: '💭' }
  };

  const urgencyLevels = {
    low: { name: 'عادية', color: 'bg-gray-100 text-gray-800' },
    medium: { name: 'متوسطة', color: 'bg-yellow-100 text-yellow-800' },
    high: { name: 'عاجلة', color: 'bg-red-100 text-red-800' }
  };

  const handleSupportRequest = (requestId: string) => {
    setRequests(prev => prev.map(request => {
      if (request.id === requestId) {
        const newSupportCount = request.isSupported 
          ? request.supportCount - 1 
          : request.supportCount + 1;
        
        toast({
          title: request.isSupported ? 'تم إلغاء الدعم' : 'تم دعم الطلب',
          description: request.isSupported 
            ? 'تم إلغاء دعمك لهذا الطلب' 
            : 'تم إضافة دعمك وستذكر في الدعاء',
        });

        return {
          ...request,
          isSupported: !request.isSupported,
          supportCount: newSupportCount
        };
      }
      return request;
    }));
  };

  const handleAddRequest = () => {
    if (!newRequest.title.trim() || !newRequest.description.trim()) {
      toast({
        title: 'خطأ',
        description: 'يرجى ملء جميع الحقول المطلوبة',
        variant: 'destructive'
      });
      return;
    }

    const request: PrayerRequest = {
      id: Date.now().toString(),
      title: newRequest.title,
      description: newRequest.description,
      author: 'أنت',
      timestamp: new Date(),
      category: newRequest.category,
      supportCount: 0,
      isSupported: false,
      urgency: newRequest.urgency
    };

    setRequests(prev => [request, ...prev]);
    setNewRequest({ title: '', description: '', category: 'other', urgency: 'medium' });
    setIsAddingRequest(false);

    toast({
      title: 'تم إضافة الطلب',
      description: 'تم إضافة طلب الدعاء إلى المجتمع بنجاح',
    });
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'منذ دقائق';
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
    return `منذ ${Math.floor(diffInHours / 24)} يوم`;
  };

  return (
    <Card className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-600" />
          شبكة طلبات الدعاء المجتمعية
          <Badge className="bg-rose-100 text-rose-800">
            <Users className="w-3 h-3 mr-1" />
            {requests.length} طلب
          </Badge>
        </CardTitle>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">شارك المجتمع في الدعاء</p>
          <Button
            onClick={() => setIsAddingRequest(!isAddingRequest)}
            size="sm"
            className="bg-rose-600 hover:bg-rose-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            طلب جديد
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Request Form */}
        {isAddingRequest && (
          <Card className="bg-white/70 border-2 border-rose-200">
            <CardContent className="p-4 space-y-4">
              <Input
                placeholder="عنوان طلب الدعاء..."
                value={newRequest.title}
                onChange={(e) => setNewRequest(prev => ({ ...prev, title: e.target.value }))}
              />
              <Textarea
                placeholder="تفاصيل الطلب..."
                value={newRequest.description}
                onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">الفئة</label>
                  <select
                    value={newRequest.category}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, category: e.target.value as PrayerRequest['category'] }))}
                    className="w-full p-2 border rounded-md text-sm"
                  >
                    {Object.entries(categories).map(([key, cat]) => (
                      <option key={key} value={key}>{cat.icon} {cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">الأولوية</label>
                  <select
                    value={newRequest.urgency}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, urgency: e.target.value as PrayerRequest['urgency'] }))}
                    className="w-full p-2 border rounded-md text-sm"
                  >
                    {Object.entries(urgencyLevels).map(([key, level]) => (
                      <option key={key} value={key}>{level.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddRequest} size="sm">
                  <Send className="w-4 h-4 mr-2" />
                  إضافة الطلب
                </Button>
                <Button variant="outline" onClick={() => setIsAddingRequest(false)} size="sm">
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Prayer Requests List */}
        <ScrollArea className="h-96 w-full">
          <div className="space-y-4">
            {requests.map((request) => {
              const category = categories[request.category];
              const urgency = urgencyLevels[request.urgency];
              
              return (
                <Card key={request.id} className="bg-white/70 hover:bg-white/90 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-800">{request.title}</h4>
                          <Badge className={urgency.color}>
                            {urgency.name}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <User className="w-3 h-3" />
                          <span>{request.author}</span>
                          <Clock className="w-3 h-3 ml-2" />
                          <span>{getTimeAgo(request.timestamp)}</span>
                        </div>
                      </div>
                      <Badge className={category.color}>
                        {category.icon} {category.name}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Heart className="w-4 h-4 text-rose-500" />
                        <span>{request.supportCount} شخص يدعو</span>
                      </div>
                      <Button
                        onClick={() => handleSupportRequest(request.id)}
                        variant={request.isSupported ? "default" : "outline"}
                        size="sm"
                        className={request.isSupported ? "bg-rose-600 hover:bg-rose-700" : ""}
                      >
                        <Heart className={`w-4 h-4 mr-1 ${request.isSupported ? 'fill-current' : ''}`} />
                        {request.isSupported ? 'أدعو له' : 'سأدعو'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </ScrollArea>

        {/* Community Stats */}
        <div className="bg-white/50 p-3 rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-rose-600 mb-1">
                <Heart className="w-4 h-4" />
                <span className="font-bold">{requests.reduce((sum, r) => sum + r.supportCount, 0)}</span>
              </div>
              <p className="text-xs text-gray-600">إجمالي الدعوات</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                <Users className="w-4 h-4" />
                <span className="font-bold">{requests.length}</span>
              </div>
              <p className="text-xs text-gray-600">طلبات نشطة</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="font-bold">+5</span>
              </div>
              <p className="text-xs text-gray-600">اليوم</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityPrayerRequestsSystem;
