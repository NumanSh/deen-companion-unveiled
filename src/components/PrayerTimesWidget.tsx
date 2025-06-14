
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, MapPin, RefreshCw } from "lucide-react";
import { useHijriDate } from "@/hooks/useHijriDate";
import { useToast } from "@/hooks/use-toast";

// Helper: Get user's coordinates
function useUserLocation() {
  const [location, setLocation] = React.useState<{ lat: number, lon: number } | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const getCurrentLocation = React.useCallback(() => {
    setLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setLoading(false);
        localStorage.setItem('userLocation', JSON.stringify({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          timestamp: Date.now()
        }));
      },
      (err) => {
        console.log('Geolocation error:', err);
        // Fallback: try IP-based location
        fetch("https://ipapi.co/json/")
          .then(res => res.json())
          .then(data => {
            if (data.latitude && data.longitude) {
              setLocation({ lat: data.latitude, lon: data.longitude });
              localStorage.setItem('userLocation', JSON.stringify({
                lat: data.latitude,
                lon: data.longitude,
                timestamp: Date.now()
              }));
            } else {
              setError("Could not detect location");
            }
          })
          .catch(() => setError("Could not detect location"))
          .finally(() => setLoading(false));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  }, []);

  React.useEffect(() => {
    // Try to load saved location first
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      try {
        const parsed = JSON.parse(savedLocation);
        // Use saved location if it's less than 1 hour old
        if (Date.now() - parsed.timestamp < 3600000) {
          setLocation({ lat: parsed.lat, lon: parsed.lon });
          return;
        }
      } catch (e) {
        console.error('Error parsing saved location:', e);
      }
    }
    
    // Get fresh location
    getCurrentLocation();
  }, [getCurrentLocation]);

  return { location, error, loading, refresh: getCurrentLocation };
}

// Helper: Fetch prayer times and calculate next prayer
function usePrayerTimes(lat: number | null, lon: number | null) {
  const [prayerData, setPrayerData] = React.useState<{
    prayers: Record<string, string>;
    nextPrayer: string;
    nextTime: string;
    timeUntilNext: string;
    city: string;
  } | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (lat == null || lon == null) return;
    
    setLoading(true);
    const today = new Date();
    const dateStr = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
    
    Promise.all([
      fetch(`https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lon}&method=2`),
      fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
    ])
      .then(([prayerRes, locationRes]) => Promise.all([prayerRes.json(), locationRes.json()]))
      .then(([prayerData, locationData]) => {
        const timings: Record<string, string> = prayerData.data.timings;
        const prayerOrder = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
        const now = today.getHours() * 60 + today.getMinutes();
        
        let nextPrayer = "Fajr";
        let nextTime = timings["Fajr"];
        
        for (let i = 0; i < prayerOrder.length; i++) {
          const t = timings[prayerOrder[i]].split(":");
          const mins = parseInt(t[0]) * 60 + parseInt(t[1]);
          if (mins > now) {
            nextPrayer = prayerOrder[i];
            nextTime = timings[prayerOrder[i]];
            break;
          }
        }
        
        // Calculate time until next prayer
        const [nextHour, nextMin] = nextTime.split(":").map(n => parseInt(n));
        const nextPrayerMins = nextHour * 60 + nextMin;
        let minsUntil = nextPrayerMins - now;
        
        if (minsUntil <= 0) {
          // Next prayer is tomorrow's Fajr
          minsUntil += 24 * 60;
        }
        
        const hoursUntil = Math.floor(minsUntil / 60);
        const minutesUntil = minsUntil % 60;
        const timeUntilNext = `${hoursUntil}h ${minutesUntil}m`;
        
        const city = locationData.city || locationData.locality || locationData.principalSubdivision || 'Unknown Location';
        
        setPrayerData({
          prayers: {
            Fajr: timings.Fajr,
            Dhuhr: timings.Dhuhr,
            Asr: timings.Asr,
            Maghrib: timings.Maghrib,
            Isha: timings.Isha,
          },
          nextPrayer,
          nextTime,
          timeUntilNext,
          city
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [lat, lon]);

  return { prayerData, loading };
}

// Current date hook
function useCurrentDate() {
  const [date, setDate] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return date;
}

const PrayerTimesWidget: React.FC = () => {
  const { location, error, loading: locationLoading, refresh } = useUserLocation();
  const { prayerData, loading: prayerLoading } = usePrayerTimes(location?.lat ?? null, location?.lon ?? null);
  const currentDate = useCurrentDate();
  const hijriDate = useHijriDate();
  const { toast } = useToast();

  const handleRefreshLocation = () => {
    refresh();
    toast({
      title: "Refreshing Location",
      description: "Getting your current location for accurate prayer times...",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatHijriDate = (hijri: { year: number; month: string; day: number }) => {
    return `${hijri.day} ${hijri.month} ${hijri.year} AH`;
  };

  const isLoading = locationLoading || prayerLoading;

  return (
    <div className="space-y-4 w-full max-w-2xl mx-auto">
      {/* Current Date with Hijri */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-lg font-semibold text-blue-900 dark:text-blue-100">
              Today
            </span>
          </div>
          <p className="text-blue-800 dark:text-blue-200 font-medium mb-1">
            {formatDate(currentDate)}
          </p>
          <p className="text-blue-700 dark:text-blue-300 text-sm font-medium">
            {formatHijriDate(hijriDate)}
          </p>
        </CardContent>
      </Card>

      {/* Location Status */}
      <Card className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900 dark:to-green-900">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-900 dark:text-emerald-100 font-medium">
                {isLoading ? 'Getting location...' : 
                 error ? 'Location unavailable' : 
                 prayerData?.city || 'Location detected'}
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleRefreshLocation}
              disabled={isLoading}
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-100"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Next Prayer Countdown */}
      {prayerData && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-emerald-900 dark:to-green-900">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-lg font-semibold text-green-900 dark:text-green-100">
                Next Prayer
              </span>
            </div>
            <p className="text-2xl font-bold text-green-800 dark:text-green-200 mb-1">
              {prayerData.nextPrayer}
            </p>
            <p className="text-green-700 dark:text-green-300 font-medium">
              {prayerData.nextTime} ({prayerData.timeUntilNext} remaining)
            </p>
          </CardContent>
        </Card>
      )}

      {/* All Prayer Times */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl">Today's Prayer Times</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-500" />
              <p className="text-muted-foreground">Loading prayer times...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={handleRefreshLocation} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          ) : prayerData ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(prayerData.prayers).map(([prayer, time]) => (
                <div
                  key={prayer}
                  className={`flex justify-between items-center p-3 rounded-lg ${
                    prayer === prayerData.nextPrayer
                      ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-300 dark:border-blue-600'
                      : 'bg-gray-50 dark:bg-gray-800'
                  }`}
                >
                  <span className={`font-medium ${
                    prayer === prayerData.nextPrayer
                      ? 'text-blue-900 dark:text-blue-100'
                      : 'text-gray-900 dark:text-gray-100'
                  }`}>
                    {prayer}
                  </span>
                  <span className={`font-mono ${
                    prayer === prayerData.nextPrayer
                      ? 'text-blue-800 dark:text-blue-200 font-bold'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {time}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Prayer times will appear once location is detected
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PrayerTimesWidget;
