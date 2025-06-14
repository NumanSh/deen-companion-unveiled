
import WeatherPrayerBanner from "@/components/WeatherPrayerBanner";
import PrayerTimesWidget from "@/components/PrayerTimesWidget";
import QiblaCompass from "@/components/QiblaCompass";
import BottomTabBar from "@/components/BottomTabBar";
import { useState, useEffect } from "react";

const Index = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      () => {
        // Fallback: fetch IP-based location
        fetch("https://ipapi.co/json/")
          .then(res => res.json())
          .then(data => setUserLocation({ lat: data.latitude, lon: data.longitude }))
          .catch(console.error);
      }
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20">
      <WeatherPrayerBanner />
      
      <div className="flex-1 px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-center mb-8">Deen Companion</h1>
          
          <PrayerTimesWidget />
          
          <QiblaCompass userLocation={userLocation} />
        </div>
      </div>
      
      <BottomTabBar />
    </div>
  );
};

export default Index;
