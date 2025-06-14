
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar } from "lucide-react";

// Helper: Get user's coordinates
function useUserLocation() {
  const [location, setLocation] = React.useState<{ lat: number, lon: number } | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      () => {
        // fallback: fetch IP-based location
        fetch("https://ipapi.co/json/")
          .then(res => res.json())
          .then(data => setLocation({ lat: data.latitude, lon: data.longitude }))
          .catch(() => setError("Could not detect location"));
      }
    );
  }, []);

  return { location, error };
}

// Helper: Fetch prayer times and calculate next prayer
function usePrayerTimes(lat: number | null, lon: number | null) {
  const [prayerData, setPrayerData] = React.useState<{
    prayers: Record<string, string>;
    nextPrayer: string;
    nextTime: string;
    timeUntilNext: string;
  } | null>(null);

  React.useEffect(() => {
    if (lat == null || lon == null) return;
    
    const today = new Date();
    const dateStr = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
    
    fetch(`https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lon}&method=2`)
      .then(res => res.json())
      .then(data => {
        const timings: Record<string, string> = data.data.timings;
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
        });
      })
      .catch(console.error);
  }, [lat, lon]);

  return prayerData;
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
  const { location, error } = useUserLocation();
  const prayerData = usePrayerTimes(location?.lat ?? null, location?.lon ?? null);
  const currentDate = useCurrentDate();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4 w-full max-w-2xl mx-auto">
      {/* Current Date */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-lg font-semibold text-blue-900 dark:text-blue-100">
              Today
            </span>
          </div>
          <p className="text-blue-800 dark:text-blue-200 font-medium">
            {formatDate(currentDate)}
          </p>
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
          {prayerData ? (
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
                {error ? error : "Loading prayer times..."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PrayerTimesWidget;
