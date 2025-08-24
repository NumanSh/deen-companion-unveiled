
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Heart, 
  MessageCircle,
  Share2,
  Calendar,
  Award,
  BookOpen,
  Globe,
  TrendingUp,
  Clock,
  Star,
  Send
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CommunityPost {
  id: string;
  author: string;
  content: string;
  type: 'prayer-request' | 'knowledge-share' | 'achievement' | 'question';
  timestamp: Date;
  likes: number;
  comments: number;
  isLiked: boolean;
}

const CommunityEngagementHub = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('feed');
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: '1',
      author: 'أحمد محمد',
      content: 'اللهم اشف والدي وعافه من كل سقم، أدعوكم للدعاء معي',
      type: 'prayer-request',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 24,
      comments: 8,
      isLiked: false
    },
    {
      id: '2',
      author: 'فاطمة علي',
      content: 'تم الانتهاء من قراءة سورة البقرة كاملة! الحمد لله رب العالمين',
      type: 'achievement',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 15,
      comments: 3,
      isLiked: true
    },
    {
      id: '3',
      author: 'د. خالد الأزهري',
      content: 'فائدة: قال رسول الله ﷺ: "من قال لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير في يوم مائة مرة..."',
      type: 'knowledge-share',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      likes: 42,
      comments: 12,
      isLiked: true
    }
  ]);

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const getPostTypeInfo = (type: string) => {
    switch (type) {
      case 'prayer-request':
        return { label: 'طلب دعاء', color: 'bg-red-100 text-red-800', icon: Heart };
      case 'achievement':
        return { label: 'إنجاز', color: 'bg-green-100 text-green-800', icon: Award };
      case 'knowledge-share':
        return { label: 'فائدة علمية', color: 'bg-blue-100 text-blue-800', icon: BookOpen };
      case 'question':
        return { label: 'سؤال', color: 'bg-purple-100 text-purple-800', icon: MessageCircle };
      default:
        return { label: 'منشور', color: 'bg-gray-100 text-gray-800', icon: MessageCircle };
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'منذ دقائق';
    if (diffInHours === 1) return 'منذ ساعة';
    if (diffInHours < 24) return `منذ ${diffInHours} ساعات`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'منذ يوم';
    return `منذ ${diffInDays} أيام`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">مركز التفاعل المجتمعي</h2>
                <p className="text-purple-200">تواصل مع المجتمع الإسلامي</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">1.2k</div>
              <div className="text-purple-200">عضو نشط</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
            <div className="text-2xl font-bold text-red-600">156</div>
            <div className="text-sm text-gray-600">طلبات دعاء</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold text-green-600">89</div>
            <div className="text-sm text-gray-600">إنجازات مشتركة</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold text-blue-600">234</div>
            <div className="text-sm text-gray-600">فوائد علمية</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold text-purple-600">67</div>
            <div className="text-sm text-gray-600">أسئلة</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feed" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            التغذية
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            الأكثر تفاعلاً
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            الفعاليات
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            إنشاء منشور
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4">
          {posts.map((post) => {
            const typeInfo = getPostTypeInfo(post.type);
            const TypeIcon = typeInfo.icon;
            
            return (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                      {post.author.charAt(0)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{post.author}</h4>
                        <Badge className={typeInfo.color}>
                          <TypeIcon className="w-3 h-3 mr-1" />
                          {typeInfo.label}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(post.timestamp)}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-3 leading-relaxed">{post.content}</p>
                      
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-1 ${
                            post.isLiked ? 'text-red-600' : 'text-gray-600'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                          <span>{post.likes}</span>
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600">
                          <Share2 className="w-4 h-4" />
                          مشاركة
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="trending">
          <Card>
            <CardHeader>
              <CardTitle>الأكثر تفاعلاً هذا الأسبوع</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="font-medium">دعاء الاستخارة - شرح مفصل</p>
                    <p className="text-sm text-gray-600">125 تفاعل • 45 تعليق</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Award className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">تحدي ختم القرآن في رمضان</p>
                    <p className="text-sm text-gray-600">89 مشارك • 234 تشجيع</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>الفعاليات القادمة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <Calendar className="w-8 h-8 text-blue-600" />
                  <div className="flex-1">
                    <h4 className="font-semibold">درس أسبوعي - سيرة النبي ﷺ</h4>
                    <p className="text-sm text-gray-600">كل يوم جمعة • 8:00 مساءً</p>
                  </div>
                  <Button size="sm">انضم</Button>
                </div>
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <Users className="w-8 h-8 text-green-600" />
                  <div className="flex-1">
                    <h4 className="font-semibold">حلقة تحفيظ القرآن</h4>
                    <p className="text-sm text-gray-600">يومياً بعد صلاة المغرب</p>
                  </div>
                  <Button size="sm">انضم</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>إنشاء منشور جديد</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button variant="outline" className="h-16 flex flex-col gap-1">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="text-xs">طلب دعاء</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col gap-1">
                  <Award className="w-5 h-5 text-green-500" />
                  <span className="text-xs">مشاركة إنجاز</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col gap-1">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <span className="text-xs">فائدة علمية</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col gap-1">
                  <MessageCircle className="w-5 h-5 text-purple-500" />
                  <span className="text-xs">سؤال</span>
                </Button>
              </div>
              <textarea
                placeholder="شارك ما يدور في خاطرك..."
                className="w-full p-3 border rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex justify-end">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  نشر
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityEngagementHub;
