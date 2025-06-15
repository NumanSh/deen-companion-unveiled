
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Search,
  Compass,
  Building,
  Users,
  Star,
  Phone,
  Globe,
  Calendar,
  Bookmark,
  Route,
  Wifi,
  Camera,
  Heart
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { locationService, LocationData } from '@/services/locationService';
import { prayerTimesApi } from '@/services/prayerTimesApi';

interface Mosque {
  id: string;
  name: string;
  address: string;
  distance: number;
  rating: number;
  reviews: number;
  services: string[];
  prayerTimes: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  contact?: string;
  website?: string;
  isBookmarked: boolean;
  hasLiveStream: boolean;
  capacity: number;
}

interface QiblaInfo {
  direction: number;
  accuracy: 'high' | 'medium' | 'low';
  distanceToKaaba: number;
}

const AdvancedIslamicLocationServices: React.FC = () => {
  const { toast } = useToast();
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [qiblaDirection, setQiblaDirection] = useState<QiblaInfo | null>(null);
  const [nearbyMosques, setNearbyMosques] = useState<Mosque[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [selectedMosque, setSelectedMosque] = useState<Mosque | null>(null);
  const [activeTab, setActiveTab] = useState<'nearby' | 'qibla' | 'prayer-times'>('nearby');

  useEffect(() => {
    loadCurrentLocation();
  }, []);

  const loadCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const location = await locationService.getCurrentLocation();
      setCurrentLocation(location);
      await loadQiblaDirection(location.latitude, location.longitude);
      await loadNearbyMosques(location.latitude, location.longitude);
      
      toast({
        title: 'Location Found! 📍',
        description: `${location.city}, ${location.country}`,
      });
    } catch (error) {
      toast({
        title: 'Location Error',
        description: 'Could not determine your location. Please enable location services.',
        variant: 'destructive'
      });
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const loadQiblaDirection = async (lat: number, lon: number) => {
    try {
      const qiblaData = await prayerTimesApi.getQiblaDirection(lat, lon);
      const distanceToKaaba = calculateDistance(lat, lon, 21.4225, 39.8262); // Kaaba coordinates
      
      setQiblaDirection({
        direction: qiblaData.data.direction,
        accuracy: 'high',
        distanceToKaaba: Math.round(distanceToKaaba)
      });
    } catch (error) {
      console.error('Failed to load Qibla direction:', error);
    }
  };

  const loadNearbyMosques = async (lat: number, lon: number) => {
    // Mock data for nearby mosques (in real app, this would come from a proper API)
    const mockMosques: Mosque[] = [
      {
        id: '1',
        name: 'Central Mosque',
        address: '123 Main Street, Downtown',
        distance: 0.8,
        rating: 4.7,
        reviews: 234,
        services: ['Prayer Times', 'Jummah', 'Quran Classes', 'Parking'],
        prayerTimes: {
          fajr: '05:30',
          dhuhr: '12:45',
          asr: '15:30',
          maghrib: '18:15',
          isha: '19:45'
        },
        contact: '+1-555-0123',
        website: 'www.centralmosque.org',
        isBookmarked: false,
        hasLiveStream: true,
        capacity: 500
      },
      {
        id: '2',
        name: 'Community Islamic Center',
        address: '456 Oak Avenue, Westside',
        distance: 1.2,
        rating: 4.5,
        reviews: 178,
        services: ['Prayer Times', 'Islamic School', 'Community Events'],
        prayerTimes: {
          fajr: '05:32',
          dhuhr: '12:47',
          asr: '15:32',
          maghrib: '18:17',
          isha: '19:47'
        },
        contact: '+1-555-0456',
        isBookmarked: true,
        hasLiveStream: false,
        capacity: 300
      },
      {
        id: '3',
        name: 'Al-Noor Masjid',
        address: '789 Elm Street, Eastside',
        distance: 2.1,
        rating: 4.8,
        reviews: 156,
        services: ['Prayer Times', 'Arabic Classes', 'Youth Programs'],
        prayerTimes: {
          fajr: '05:28',
          dhuhr: '12:43',
          asr: '15:28',
          maghrib: '18:13',
          isha: '19:43'
        },
        isBookmarked: false,
        hasLiveStream: true,
        capacity: 200
      }
    ];

    setNearbyMosques(mockMosques);
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const toggleBookmark = (mosqueId: string) => {
    setNearbyMosques(prev => prev.map(mosque => 
      mosque.id === mosqueId 
        ? { ...mosque, isBookmarked: !mosque.isBookmarked }
        : mosque
    ));
    
    const mosque = nearbyMosques.find(m => m.id === mosqueId);
    toast({
      title: mosque?.isBookmarked ? 'Removed from Bookmarks' : 'Added to Bookmarks',
      description: mosque?.name,
    });
  };

  const getDirections = (mosque: Mosque) => {
    toast({
      title: 'Opening Directions 🗺️',
      description: `Getting directions to ${mosque.name}`,
    });
  };

  const filteredMosques = nearbyMosques.filter(mosque =>
    mosque.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mosque.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderNearbyTab = () => (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search mosques..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-4">
        {filteredMosques.map((mosque) => (
          <Card key={mosque.id} className="border hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{mosque.name}</h3>
                    {mosque.hasLiveStream && (
                      <Badge variant="outline" className="text-xs bg-red-50 text-red-600">
                        <Wifi className="w-3 h-3 mr-1" />
                        Live
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{mosque.address}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Route className="w-3 h-3" />
                      {mosque.distance} km
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      {mosque.rating} ({mosque.reviews})
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {mosque.capacity} capacity
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleBookmark(mosque.id)}
                  className={mosque.isBookmarked ? 'text-red-500' : 'text-gray-400'}
                >
                  <Heart className={`w-4 h-4 ${mosque.isBookmarked ? 'fill-current' : ''}`} />
                </Button>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {mosque.services.map((service, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {service}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-5 gap-2 text-xs mb-3">
                <div className="text-center">
                  <div className="font-medium">Fajr</div>
                  <div className="text-gray-600">{mosque.prayerTimes.fajr}</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Dhuhr</div>
                  <div className="text-gray-600">{mosque.prayerTimes.dhuhr}</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Asr</div>
                  <div className="text-gray-600">{mosque.prayerTimes.asr}</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Maghrib</div>
                  <div className="text-gray-600">{mosque.prayerTimes.maghrib}</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Isha</div>
                  <div className="text-gray-600">{mosque.prayerTimes.isha}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" onClick={() => getDirections(mosque)} className="flex-1">
                  <Navigation className="w-3 h-3 mr-1" />
                  Directions
                </Button>
                {mosque.contact && (
                  <Button variant="outline" size="sm">
                    <Phone className="w-3 h-3 mr-1" />
                    Call
                  </Button>
                )}
                {mosque.website && (
                  <Button variant="outline" size="sm">
                    <Globe className="w-3 h-3 mr-1" />
                    Website
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderQiblaTab = () => (
    <div className="space-y-6">
      {qiblaDirection && currentLocation && (
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6 text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-green-200 rounded-full"></div>
              <div 
                className="absolute inset-2 bg-green-600 rounded-full flex items-center justify-center transform transition-transform duration-300"
                style={{ transform: `rotate(${qiblaDirection.direction}deg)` }}
              >
                <Compass className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div className="w-1 h-4 bg-red-500"></div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-green-800 mb-2">Qibla Direction</h3>
            <p className="text-green-600 mb-4">{Math.round(qiblaDirection.direction)}° from North</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-green-800">Distance to Kaaba</div>
                <div className="text-green-600">{qiblaDirection.distanceToKaaba.toLocaleString()} km</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-green-800">Accuracy</div>
                <div className="text-green-600 capitalize">{qiblaDirection.accuracy}</div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-green-100 rounded-lg">
              <p className="text-xs text-green-700">
                Point your device in the direction of the green arrow for accurate Qibla direction.
                Calibrate your compass for best results.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderPrayerTimesTab = () => (
    <div className="space-y-4">
      {currentLocation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Prayer Times for {currentLocation.city}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {nearbyMosques[0]?.prayerTimes && Object.entries(nearbyMosques[0].prayerTimes).map(([prayer, time]) => (
                <div key={prayer} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold capitalize text-lg">{prayer}</div>
                  <div className="text-blue-600 font-bold text-xl">{time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Islamic Location Services</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Find nearby mosques, get accurate Qibla direction, and view local prayer times
        </p>
      </div>

      {currentLocation && (
        <Card className="bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium">Current Location</div>
                  <div className="text-sm text-gray-600">{currentLocation.city}, {currentLocation.country}</div>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadCurrentLocation}
                disabled={isLoadingLocation}
              >
                {isLoadingLocation ? 'Updating...' : 'Refresh'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {([
            { id: 'nearby', label: 'Nearby Mosques', icon: Building },
            { id: 'qibla', label: 'Qibla Direction', icon: Compass },
            { id: 'prayer-times', label: 'Prayer Times', icon: Clock }
          ] as const).map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2"
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'nearby' && renderNearbyTab()}
      {activeTab === 'qibla' && renderQiblaTab()}
      {activeTab === 'prayer-times' && renderPrayerTimesTab()}
    </div>
  );
};

export default AdvancedIslamicLocationServices;
