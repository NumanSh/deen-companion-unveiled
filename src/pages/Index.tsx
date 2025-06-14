// Update this page (the content is just a fallback if you fail to update the page)

import WeatherPrayerBanner from "@/components/WeatherPrayerBanner";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-background">
      <WeatherPrayerBanner />
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Your Blank App</h1>
          <p className="text-xl text-muted-foreground">Start building your amazing project here!</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
