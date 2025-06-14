
import WeatherPrayerBanner from "@/components/WeatherPrayerBanner";
import PrayerTimesWidget from "@/components/PrayerTimesWidget";
import BottomTabBar from "@/components/BottomTabBar";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background pb-20">
      <WeatherPrayerBanner />
      
      <div className="flex-1 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Islamic Companion</h1>
          <PrayerTimesWidget />
        </div>
      </div>
      
      <BottomTabBar />
    </div>
  );
};

export default Index;
