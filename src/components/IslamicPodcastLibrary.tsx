
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Headphones, 
  Play, 
  Pause,
  Download,
  Heart,
  Share2,
  Clock,
  Star,
  Mic,
  Users,
  BookOpen,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Podcast {
  id: string;
  title: string;
  speaker: string;
  description: string;
  duration: string;
  category: string;
  rating: number;
  downloads: number;
  isPlaying: boolean;
  isDownloaded: boolean;
  isFavorite: boolean;
  tags: string[];
}

const IslamicPodcastLibrary = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Categories', icon: Headphones, count: 156 },
    { id: 'quran', name: 'Quran Recitation', icon: BookOpen, count: 45 },
    { id: 'hadith', name: 'Hadith Studies', icon: Star, count: 32 },
    { id: 'fiqh', name: 'Islamic Jurisprudence', icon: Users, count: 28 },
    { id: 'seerah', name: 'Prophet\'s Biography', icon: Heart, count: 25 },
    { id: 'lectures', name: 'Islamic Lectures', icon: Mic, count: 26 }
  ];

  const [podcasts, setPodcasts] = useState<Podcast[]>([
    {
      id: '1',
      title: 'The Beautiful Names of Allah - Part 1',
      speaker: 'Sheikh Omar Suleiman',
      description: 'Exploring the profound meanings of Asma ul Husna and their impact on our daily lives',
      duration: '45:30',
      category: 'lectures',
      rating: 4.9,
      downloads: 15420,
      isPlaying: false,
      isDownloaded: true,
      isFavorite: true,
      tags: ['Names of Allah', 'Spirituality', 'English']
    },
    {
      id: '2',
      title: 'Sahih Bukhari - Book of Faith',
      speaker: 'Dr. Yasir Qadhi',
      description: 'A detailed explanation of the authentic hadiths about faith and belief',
      duration: '62:15',
      category: 'hadith',
      rating: 4.8,
      downloads: 12350,
      isPlaying: false,
      isDownloaded: false,
      isFavorite: false,
      tags: ['Bukhari', 'Faith', 'Arabic/English']
    },
    {
      id: '3',
      title: 'Surah Al-Baqarah Recitation',
      speaker: 'Sheikh Abdul Rahman Al-Sudais',
      description: 'Beautiful recitation of the longest chapter of the Quran with English translation',
      duration: '120:00',
      category: 'quran',
      rating: 5.0,
      downloads: 25680,
      isPlaying: false,
      isDownloaded: true,
      isFavorite: true,
      tags: ['Recitation', 'Al-Baqarah', 'Arabic']
    },
    {
      id: '4',
      title: 'Marriage in Islam - Rights and Responsibilities',
      speaker: 'Sheikh Assim Al-Hakeem',
      description: 'Comprehensive guide to Islamic marriage, covering rights, duties, and practical advice',
      duration: '38:45',
      category: 'fiqh',
      rating: 4.7,
      downloads: 8920,
      isPlaying: false,
      isDownloaded: false,
      isFavorite: false,
      tags: ['Marriage', 'Family', 'English']
    },
    {
      id: '5',
      title: 'The Life of Prophet Muhammad (PBUH) - Mecca Period',
      speaker: 'Sheikh Safi-ur-Rahman al-Mubarakpuri',
      description: 'Detailed account of the Prophet\'s life in Mecca, covering the early revelations',
      duration: '75:20',
      category: 'seerah',
      rating: 4.9,
      downloads: 18750,
      isPlaying: false,
      isDownloaded: true,
      isFavorite: true,
      tags: ['Seerah', 'Mecca', 'Biography']
    }
  ]);

  const filteredPodcasts = activeCategory === 'all' 
    ? podcasts 
    : podcasts.filter(p => p.category === activeCategory);

  const handlePlayPause = (podcastId: string) => {
    if (currentlyPlaying === podcastId) {
      setCurrentlyPlaying(null);
      toast({
        title: 'Playback Paused',
        description: 'Audio paused',
        duration: 1000,
      });
    } else {
      setCurrentlyPlaying(podcastId);
      toast({
        title: 'Now Playing',
        description: podcasts.find(p => p.id === podcastId)?.title,
        duration: 2000,
      });
    }
  };

  const handleDownload = (podcastId: string) => {
    setPodcasts(prev => prev.map(p => 
      p.id === podcastId ? { ...p, isDownloaded: true } : p
    ));
    toast({
      title: 'Download Started',
      description: 'Podcast will be available offline',
      duration: 2000,
    });
  };

  const handleFavorite = (podcastId: string) => {
    setPodcasts(prev => prev.map(p => 
      p.id === podcastId ? { ...p, isFavorite: !p.isFavorite } : p
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Headphones className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Islamic Podcast Library</h2>
                <p className="text-indigo-200">Curated Islamic Audio Content</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">156</div>
              <div className="text-indigo-200">Episodes</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-purple-600" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className={`h-20 flex flex-col gap-2 ${
                    activeCategory === category.id 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'hover:bg-purple-50'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <Icon className="w-6 h-6" />
                  <div className="text-xs text-center">
                    <div className="font-medium">{category.name}</div>
                    <div className="opacity-70">{category.count}</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Podcast List */}
      <div className="space-y-4">
        {filteredPodcasts.map((podcast) => (
          <Card key={podcast.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Mic className="w-8 h-8 text-white" />
                  </div>
                  {podcast.isDownloaded && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Download className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{podcast.title}</h3>
                      <p className="text-sm text-gray-600 mb-1">by {podcast.speaker}</p>
                      <p className="text-sm text-gray-500 mb-2">{podcast.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFavorite(podcast.id)}
                      className={podcast.isFavorite ? 'text-red-500' : 'text-gray-400'}
                    >
                      <Heart className={`w-5 h-5 ${podcast.isFavorite ? 'fill-current' : ''}`} />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {podcast.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{podcast.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{podcast.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        <span>{podcast.downloads.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(podcast.id)}
                        disabled={podcast.isDownloaded}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        {podcast.isDownloaded ? 'Downloaded' : 'Download'}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handlePlayPause(podcast.id)}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        {currentlyPlaying === podcast.id ? (
                          <Pause className="w-4 h-4 mr-1" />
                        ) : (
                          <Play className="w-4 h-4 mr-1" />
                        )}
                        {currentlyPlaying === podcast.id ? 'Pause' : 'Play'}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Currently Playing Bar */}
      {currentlyPlaying && (
        <Card className="fixed bottom-24 left-4 right-4 z-40 bg-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-700 rounded flex items-center justify-center">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-sm">
                    {podcasts.find(p => p.id === currentlyPlaying)?.title}
                  </div>
                  <div className="text-xs text-purple-200">
                    {podcasts.find(p => p.id === currentlyPlaying)?.speaker}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentlyPlaying(null)}
                className="text-white hover:bg-purple-700"
              >
                <Pause className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IslamicPodcastLibrary;
