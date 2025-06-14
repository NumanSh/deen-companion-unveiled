
import React from "react";
import WeatherGif from "./WeatherGif";
import { Card, CardContent } from "@/components/ui/card";

// Helper: Get user's coordinates with browser geolocation, fallback to IP-based if denied
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
        // fallback: fetch IP-based location via API
        fetch("https://ipapi.co/json/")
          .then(res => res.json())
          .then(data => setLocation({ lat: data.latitude, lon: data.longitude }))
          .catch(() => setError("Could not detect location"));
      }
    );
  }, []);

  return { location, error };
}

// Helper: Fetch weather for coordinates
function useWeather(lat: number | null, lon: number | null) {
  const [weather, setWeather] = React.useState<{
    temp: number | null, code: number | null, city: string, condition: string
  }>({ temp: null, code: null, city: "", condition: "" });

  React.useEffect(() => {
    if (lat == null || lon == null) return;
    const fetchWeather = async () => {
      // Open-Meteo API has city reverse-geocoding as well
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
      const placeUrl = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`;
      Promise.all([
        fetch(url)
          .then(res => res.json())
          .then(data => ({
            temp: data.current_weather.temperature,
            code: data.current_weather.weathercode,
            condition: "",
          })),
        fetch(placeUrl).then(res => res.json()).then(place => place.address?.city || place.display_name || ""),
      ]).then(([w, city]) => {
        setWeather({
          ...w,
          city: typeof city === "string" ? city : "",
        });
      });
    };
    fetchWeather();
  }, [lat, lon]);

  return weather;
}

// Helper: Fetch prayer times and derive next prayer
function usePrayerTimes(lat: number | null, lon: number | null) {
  const [prayer, setPrayer] = React.useState<{
    nextPrayer: string;
    time: string;
    all: Record<string, string>;
  } | null>(null);

  React.useEffect(() => {
    if (lat == null || lon == null) return;
    const today = new Date();
    const dateStr = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
    fetch(`https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lon}&method=2`)
      .then(res => res.json())
      .then(data => {
        const timings: Record<string, string> = data.data.timings;
        // Prayer order (filter out Sunrise/Sunset/Imsak/Midnight) 
        const prayerOrder = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
        const now = today.getHours() * 60 + today.getMinutes();
        let nextPrayer = "Fajr"; let time = timings["Fajr"];
        for (let i = 0; i < prayerOrder.length; i++) {
          const t = timings[prayerOrder[i]].split(":");
          const mins = parseInt(t[0]) * 60 + parseInt(t[1]);
          if (mins > now) {
            nextPrayer = prayerOrder[i];
            time = timings[prayerOrder[i]];
            break;
          }
          // If passed all, next after Isha is next Fajr (for now, just show Fajr)
        }
        setPrayer({
          nextPrayer,
          time,
          all: timings,
        });
      });
  }, [lat, lon]);

  return prayer;
}

// Live clock hook
function useClock() {
  const [time, setTime] = React.useState<string>(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

const WeatherPrayerBanner: React.FC = () => {
  const { location, error } = useUserLocation();
  const weather = useWeather(location?.lat ?? null, location?.lon ?? null);
  const prayer = usePrayerTimes(location?.lat ?? null, location?.lon ?? null);
  const clock = useClock();

  return (
    <Card className="max-w-2xl mx-auto mt-8 mb-6 shadow-xl bg-gradient-to-bl from-blue-100/40 via-sky-100/80 to-blue-200/80 dark:from-slate-900/90 dark:to-[#00172e] animate-fade-in">
      <CardContent className="p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start md:w-1/3">
          <WeatherGif code={weather.code} />
          <div className="mt-2 font-medium text-lg text-blue-900 dark:text-blue-100">
            {weather.city ? weather.city : "Locating..."}
          </div>
          <div className="text-blue-700 dark:text-blue-200 text-sm mt-1">
            {weather.temp !== null ? `${weather.temp}°C` : "--"}
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="text-4xl font-mono font-semibold text-gray-900 dark:text-white tracking-widest">
            {clock}
          </div>
          <div className="mt-2 p-3 rounded-xl bg-gradient-to-r from-blue-200/60 to-blue-400/80 dark:from-blue-900 dark:to-blue-800 shadow">
            <span className="text-blue-900 dark:text-blue-100 font-semibold text-lg">
              {prayer ? `Next: ${prayer.nextPrayer}` : "Loading prayers..."}
            </span>
            <span className="ml-2 text-blue-600 dark:text-blue-200 font-bold text-lg">
              {prayer?.time}
            </span>
          </div>
        </div>
      </CardContent>
      {/* Error state */}
      {error && (
        <div className="p-2 bg-red-100 text-red-900 rounded-b-lg text-center text-sm">
          {error}
        </div>
      )}
    </Card>
  );
};

export default WeatherPrayerBanner;
