
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  Calendar,
  Award,
  Eye,
  Heart,
  Brain,
  Zap,
  Star,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

const AdvancedReadingAnalyticsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock data for analytics
  const weeklyReadingData = [
    { name: 'السبت', pages: 12, time: 45, surahs: 2 },
    { name: 'الأحد', pages: 8, time: 30, surahs: 1 },
    { name: 'الاثنين', pages: 15, time: 60, surahs: 3 },
    { name: 'الثلاثاء', pages: 10, time: 40, surahs: 2 },
    { name: 'الأربعاء', pages: 18, time: 70, surahs: 4 },
    { name: 'الخميس', pages: 13, time: 50, surahs: 2 },
    { name: 'الجمعة', pages: 20, time: 80, surahs: 5 }
  ];

  const surahProgressData = [
    { name: 'البقرة', progress: 85, pages: 48, bookmark: 205 },
    { name: 'آل عمران', progress: 60, pages: 20, bookmark: 120 },
    { name: 'النساء', progress: 30, pages: 24, bookmark: 75 },
    { name: 'المائدة', progress: 100, pages: 16, bookmark: 120 },
    { name: 'الأنعام', progress: 45, pages: 20, bookmark: 90 }
  ];

  const readingPatternData = [
    { time: '6:00', intensity: 20, focus: 85 },
    { time: '9:00', intensity: 45, focus: 90 },
    { time: '12:00', intensity: 30, focus: 70 },
    { time: '15:00', intensity: 25, focus: 65 },
    { time: '18:00', intensity: 60, focus: 95 },
    { time: '21:00', intensity: 80, focus: 98 },
    { time: '24:00', intensity: 40, focus: 85 }
  ];

  const categoryDistribution = [
    { name: 'قراءة القرآن', value: 65, color: '#10B981' },
    { name: 'الأحاديث', value: 20, color: '#3B82F6' },
    { name: 'الأدعية', value: 10, color: '#8B5CF6' },
    { name: 'التفسير', value: 5, color: '#F59E0B' }
  ];

  const stats = {
    totalPages: 156,
    totalTime: 425,
    currentStreak: 12,
    longestStreak: 28,
    averageDaily: 22,
    completedSurahs: 8,
    bookmarks: 47,
    notes: 23
  };

  const improvements = [
    { metric: 'الصفحات اليومية', change: +15, trend: 'up' },
    { metric: 'وقت التركيز', change: +8, trend: 'up' },
    { metric: 'سرعة القراءة', change: -3, trend: 'down' },
    { metric: 'الاستيعاب', change: +12, trend: 'up' }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-900">{stats.totalPages}</div>
                <div className="text-sm text-emerald-700">صفحة مقروءة</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-900">{Math.floor(stats.totalTime / 60)}h {stats.totalTime % 60}m</div>
                <div className="text-sm text-blue-700">وقت القراءة</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-900">{stats.currentStreak}</div>
                <div className="text-sm text-purple-700">أيام متتالية</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Award className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-900">{stats.completedSurahs}</div>
                <div className="text-sm text-amber-700">سور مكتملة</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Improvements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            تحسن الأداء هذا الأسبوع
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {improvements.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <div className="text-sm text-gray-600">{item.metric}</div>
                  <div className="font-semibold">{Math.abs(item.change)}%</div>
                </div>
                <div className={`p-1 rounded ${
                  item.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {item.trend === 'up' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Tabs */}
      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="daily">يومي</TabsTrigger>
          <TabsTrigger value="surahs">السور</TabsTrigger>
          <TabsTrigger value="patterns">الأنماط</TabsTrigger>
          <TabsTrigger value="insights">التحليلات</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>النشاط الأسبوعي</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyReadingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="pages" fill="#10B981" name="الصفحات" />
                  <Bar dataKey="time" fill="#3B82F6" name="الوقت (دقيقة)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="surahs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>تقدم السور</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {surahProgressData.map((surah, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{surah.name}</span>
                    <Badge variant="outline">
                      {surah.progress}% - آية {surah.bookmark}
                    </Badge>
                  </div>
                  <Progress value={surah.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>أنماط القراءة اليومية</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={readingPatternData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="intensity" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="focus" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توزيع المحتوى</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {categoryDistribution.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">رؤى ذكية</h3>
                </div>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• أفضل أوقاتك للقراءة هي المساء (18:00-21:00)</li>
                  <li>• معدل تركيزك يزيد بنسبة 23% في الأيام المطيرة</li>
                  <li>• تقرأ بسرعة أكبر في سور القصص</li>
                  <li>• أدائك الأسبوعي يتحسن باستمرار</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-emerald-600" />
                  <h3 className="font-semibold text-emerald-900">توصيات مخصصة</h3>
                </div>
                <ul className="space-y-2 text-sm text-emerald-800">
                  <li>• اقرأ سورة يوسف لتحسين التركيز</li>
                  <li>• خصص 15 دقيقة إضافية للتفسير</li>
                  <li>• راجع آخر 3 سور قرأتها</li>
                  <li>• ابدأ بسورة الكهف هذا الأسبوع</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedReadingAnalyticsDashboard;
