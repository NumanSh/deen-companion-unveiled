
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Play, Pause, SkipForward, SkipBack, Volume2, Search, Download, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AudioContent {
  id: string;
  title: string;
  category: 'quran' | 'lectures' | 'nasheed' | 'dhikr';
  speaker: string;
  duration: string;
  isPlaying: boolean;
  isFavorite: boolean;
  downloadUrl?: string;
}

const IslamicAudioLibrary = () => {
  const { toast } = useToast();
  
  const [audioContent, setAudioContent] = useState<AudioContent[]>([
    {
      id: '1',
      title: 'سورة الفاتحة',
      category: 'quran',
      speaker: 'الشيخ عبد الرحمن السديس',
      duration: '2:15',
      isPlaying: false,
      isFavorite: true
    },
    {
      id: '2',
      title: 'أذكار الصباح',
      category: 'dhikr',
      speaker: 'الشيخ ماهر المعيقلي',
      duration: '15:30',
      isPlaying: false,
      isFavorite: false
    },
    {
      id: '3',
      title: 'محاضرة: آداب المسلم',
      category: 'lectures',
      speaker: 'الشيخ محمد العريفي',
      duration: '45:20',
      isPlaying: false,
      isFavorite: true
    },
    {
      id: '4',
      title: 'نشيد: يا رب العالمين',
      category: 'nasheed',
      speaker: 'مشاري راشد العفاسي',
      duration: '4:45',
      isPlaying: false,
      isFavorite: false
    }
  ]);

  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'الكل', count: audioContent.length },
    { key: 'quran', label: 'القرآن الكريم', count: audioContent.filter(a => a.category === 'quran').length },
    { key: 'lectures', label: 'محاضرات', count: audioContent.filter(a => a.category === 'lectures').length },
    { key: 'nasheed', label: 'أناشيد', count: audioContent.filter(a => a.category === 'nasheed').length },
    { key: 'dhikr', label: 'أذكار', count: audioContent.filter(a => a.category === 'dhikr').length }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      quran: 'bg-green-100 text-green-800',
      lectures: 'bg-blue-100 text-blue-800',
      nasheed: 'bg-purple-100 text-purple-800',
      dhikr: 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      quran: 'قرآن',
      lectures: 'محاضرة',
      nasheed: 'نشيد',
      dhikr: 'ذكر'
    };
    return labels[category] || category;
  };

  const togglePlay = (audioId: string) => {
    setAudioContent(prev => prev.map(audio => ({
      ...audio,
      isPlaying: audio.id === audioId ? !audio.isPlaying : false
    })));

    const audio = audioContent.find(a => a.id === audioId);
    if (audio) {
      if (currentlyPlaying === audioId) {
        setCurrentlyPlaying(null);
        toast({
          title: '⏸️ تم إيقاف التشغيل',
          description: `تم إيقاف ${audio.title}`,
        });
      } else {
        setCurrentlyPlaying(audioId);
        toast({
          title: '▶️ جاري التشغيل',
          description: `يتم تشغيل ${audio.title}`,
        });
      }
    }
  };

  const toggleFavorite = (audioId: string) => {
    setAudioContent(prev => prev.map(audio => 
      audio.id === audioId ? { ...audio, isFavorite: !audio.isFavorite } : audio
    ));

    const audio = audioContent.find(a => a.id === audioId);
    if (audio) {
      toast({
        title: audio.isFavorite ? 'تم إلغاء الإعجاب' : '❤️ تم الإعجاب',
        description: audio.isFavorite ? 'تم إزالة المحتوى من المفضلة' : 'تم إضافة المحتوى للمفضلة',
      });
    }
  };

  const downloadAudio = (audioId: string) => {
    const audio = audioContent.find(a => a.id === audioId);
    if (audio) {
      toast({
        title: '📥 جاري التحميل',
        description: `يتم تحميل ${audio.title}`,
      });
    }
  };

  const filteredContent = audioContent.filter(audio => {
    const matchesSearch = audio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audio.speaker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || audio.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const currentAudio = audioContent.find(a => a.id === currentlyPlaying);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="w-6 h-6 text-purple-500" />
          المكتبة الصوتية الإسلامية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Currently Playing */}
        {currentAudio && (
          <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold text-purple-800">{currentAudio.title}</h4>
                <p className="text-sm text-purple-600">{currentAudio.speaker}</p>
              </div>
              <Badge className={getCategoryColor(currentAudio.category)}>
                {getCategoryLabel(currentAudio.category)}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="border-purple-300">
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button 
                onClick={() => togglePlay(currentAudio.id)}
                size="sm"
                className="bg-purple-500 hover:bg-purple-600"
              >
                {currentAudio.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button size="sm" variant="outline" className="border-purple-300">
                <SkipForward className="w-4 h-4" />
              </Button>
              <span className="text-sm text-purple-600 ml-2">{currentAudio.duration}</span>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="ابحث في المكتبة الصوتية..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                size="sm"
                variant={selectedCategory === category.key ? "default" : "outline"}
                className={selectedCategory === category.key ? "bg-purple-500 hover:bg-purple-600" : ""}
              >
                {category.label} ({category.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Audio Content List */}
        <div className="space-y-3">
          <h4 className="font-semibold">المحتوى الصوتي</h4>
          {filteredContent.map((audio) => (
            <div key={audio.id} className={`p-4 border rounded-lg ${audio.isPlaying ? 'bg-purple-50 border-purple-200' : 'bg-white'}`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h5 className="font-medium text-gray-800 mb-1">{audio.title}</h5>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-600">{audio.speaker}</span>
                    <Badge className={getCategoryColor(audio.category)}>
                      {getCategoryLabel(audio.category)}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">{audio.duration}</div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => toggleFavorite(audio.id)}
                    size="sm"
                    variant="outline"
                    className={audio.isFavorite ? "text-red-600 border-red-300" : ""}
                  >
                    <Heart className={`w-4 h-4 ${audio.isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    onClick={() => downloadAudio(audio.id)}
                    size="sm"
                    variant="outline"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => togglePlay(audio.id)}
                    size="sm"
                    className="bg-purple-500 hover:bg-purple-600"
                  >
                    {audio.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            لم يتم العثور على محتوى صوتي يطابق البحث
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-800">{audioContent.filter(a => a.category === 'quran').length}</div>
            <div className="text-xs text-green-600">قرآن كريم</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-800">{audioContent.filter(a => a.category === 'lectures').length}</div>
            <div className="text-xs text-blue-600">محاضرات</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-lg font-bold text-purple-800">{audioContent.filter(a => a.category === 'nasheed').length}</div>
            <div className="text-xs text-purple-600">أناشيد</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-lg font-bold text-orange-800">{audioContent.filter(a => a.isFavorite).length}</div>
            <div className="text-xs text-orange-600">المفضلة</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicAudioLibrary;
