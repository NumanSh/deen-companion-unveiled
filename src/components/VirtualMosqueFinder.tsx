
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Phone, Navigation, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Mosque {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  phone: string;
  prayerTimes: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  features: string[];
  isOpen: boolean;
}

const VirtualMosqueFinder: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedMosque, setSelectedMosque] = useState<Mosque | null>(null);
  const { toast } = useToast();

  const mosques: Mosque[] = [
    {
      id: '1',
      name: 'Masjid Al-Noor',
      address: '123 Main Street, Downtown',
      distance: '0.5 miles',
      rating: 4.8,
      phone: '(555) 123-4567',
      prayerTimes: {
        fajr: '5:30 AM',
        dhuhr: '12:45 PM',
        asr: '4:20 PM',
        maghrib: '6:45 PM',
        isha: '8:15 PM'
      },
      features: ['Parking', 'Wheelchair Access', 'Women\'s Section'],
      isOpen: true
    },
    {
      id: '2',
      name: 'Islamic Center of Peace',
      address: '456 Oak Avenue, Westside',
      distance: '1.2 miles',
      rating: 4.6,
      phone: '(555) 987-6543',
      prayerTimes: {
        fajr: '5:35 AM',
        dhuhr: '12:50 PM',
        asr: '4:25 PM',
        maghrib: '6:50 PM',
        isha: '8:20 PM'
      },
      features: ['Library', 'Quranic School', 'Community Hall'],
      isOpen: true
    },
    {
      id: '3',
      name: 'Masjid Ar-Rahman',
      address: '789 Elm Street, Northside',
      distance: '2.1 miles',
      rating: 4.5,
      phone: '(555) 456-7890',
      prayerTimes: {
        fajr: '5:25 AM',
        dhuhr: '12:40 PM',
        asr: '4:15 PM',
        maghrib: '6:40 PM',
        isha: '8:10 PM'
      },
      features: ['Youth Programs', 'Food Bank', 'Counseling'],
      isOpen: false
    }
  ];

  const getDirections = (mosque: Mosque) => {
    toast({
      title: "Opening Directions",
      description: `Getting directions to ${mosque.name}`,
    });
  };

  const callMosque = (mosque: Mosque) => {
    toast({
      title: "Calling Mosque",
      description: `Calling ${mosque.name} at ${mosque.phone}`,
    });
  };

  const findNearbyMosques = () => {
    toast({
      title: "Finding Mosques",
      description: "Searching for mosques in your area...",
    });
  };

  return (
    <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-teal-600" />
          Virtual Mosque Finder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="flex gap-2">
          <Input
            placeholder="Enter your location..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="flex-1"
          />
          <Button onClick={findNearbyMosques} className="bg-teal-600 hover:bg-teal-700">
            Search
          </Button>
        </div>

        {/* Current Location Button */}
        <Button variant="outline" className="w-full" onClick={findNearbyMosques}>
          <Navigation className="w-4 h-4 mr-2" />
          Use Current Location
        </Button>

        {/* Mosques List */}
        <div className="space-y-3">
          {mosques.map((mosque) => (
            <div 
              key={mosque.id} 
              className={`bg-white dark:bg-gray-800 p-4 rounded-lg border cursor-pointer transition-all ${
                selectedMosque?.id === mosque.id ? 'border-teal-300 bg-teal-50 dark:bg-teal-900/20' : 'hover:border-gray-300'
              }`}
              onClick={() => setSelectedMosque(mosque)}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                      {mosque.name}
                    </h4>
                    {mosque.isOpen ? (
                      <Badge className="bg-green-100 text-green-800 border-green-200">Open</Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800 border-red-200">Closed</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {mosque.address}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {mosque.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      {mosque.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-1 mb-3">
                {mosque.features.map((feature) => (
                  <Badge key={feature} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>

              {/* Prayer Times (when selected) */}
              {selectedMosque?.id === mosque.id && (
                <div className="bg-teal-50 dark:bg-teal-900/30 p-3 rounded mt-3">
                  <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-2 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Today's Prayer Times
                  </h5>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>Fajr: {mosque.prayerTimes.fajr}</div>
                    <div>Dhuhr: {mosque.prayerTimes.dhuhr}</div>
                    <div>Asr: {mosque.prayerTimes.asr}</div>
                    <div>Maghrib: {mosque.prayerTimes.maghrib}</div>
                    <div>Isha: {mosque.prayerTimes.isha}</div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 mt-3">
                <Button 
                  size="sm" 
                  onClick={(e) => { e.stopPropagation(); getDirections(mosque); }}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  <Navigation className="w-3 h-3 mr-1" />
                  Directions
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => { e.stopPropagation(); callMosque(mosque); }}
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Call
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Prayer Times */}
        <div className="bg-teal-100 dark:bg-teal-800/20 p-3 rounded-lg">
          <h4 className="font-medium text-teal-800 dark:text-teal-200 mb-2">
            📍 Quick Tip
          </h4>
          <p className="text-sm text-teal-700 dark:text-teal-300">
            Click on any mosque to see detailed prayer times and features. Use the call button to verify timings before visiting.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VirtualMosqueFinder;
