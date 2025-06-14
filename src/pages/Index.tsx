
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Compass, 
  Book, 
  Menu, 
  Settings,
  Star,
  Heart,
  Search
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "@/components/BottomTabBar";
import { cn } from "@/lib/utils";

const Index = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "The Quran",
      icon: Book,
      action: () => navigate("/books"),
      size: "large"
    },
    {
      title: "Promises of Allah",
      icon: Star,
      action: () => navigate("/books"),
      size: "small"
    },
    {
      title: "Prayer Times",
      icon: Clock,
      action: () => navigate("/calendar"),
      size: "small"
    },
    {
      title: "Duas",
      icon: Heart,
      action: () => navigate("/books"),
      size: "small"
    },
    {
      title: "Explore By Topic",
      icon: Search,
      action: () => navigate("/books"),
      size: "small"
    },
    {
      title: "Qibla",
      icon: Compass,
      action: () => navigate("/calendar"),
      size: "small"
    },
    {
      title: "Favourites",
      icon: Heart,
      action: () => navigate("/books"),
      size: "small"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 pb-20 relative overflow-hidden">
      {/* Header with teal gradient and Arabic text */}
      <div className="relative bg-gradient-to-br from-teal-600 to-teal-700 pt-12 pb-8 px-4">
        {/* Top navigation */}
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Menu className="w-6 h-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20"
            onClick={() => navigate("/settings")}
          >
            <Settings className="w-6 h-6" />
          </Button>
        </div>

        {/* Arabic text and verse */}
        <div className="text-center text-white space-y-4">
          <div className="text-4xl font-bold mb-2" style={{ fontFamily: 'serif' }}>
            الرَّحْمَٰنُ
          </div>
          <div className="text-3xl font-bold mb-4" style={{ fontFamily: 'serif' }}>
            عَلَّمَ الْقُرْآنَ
          </div>
          <div className="text-lg font-medium mb-2 leading-relaxed">
            (Allah) Most Gracious! It is He<br />
            Who has taught the Qur'an.
          </div>
          <div className="text-sm opacity-90 mb-6">
            Surah Ar Rahman 1 - 2
          </div>
          
          {/* Start Reading Button */}
          <Button 
            onClick={() => navigate("/books")}
            className="bg-teal-500 hover:bg-teal-400 text-white px-8 py-3 rounded-xl font-medium text-lg border border-teal-400/50"
          >
            Start Reading the Quran
          </Button>
        </div>
      </div>

      {/* Content area with cards */}
      <div className="flex-1 px-4 py-6 relative -mt-4">
        <div className="max-w-md mx-auto space-y-4">
          {/* Large Quran card */}
          <Card 
            className="bg-white shadow-lg rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
            onClick={quickActions[0].action}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                  <Book className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {quickActions[0].title}
                </h3>
              </div>
            </CardContent>
          </Card>

          {/* Grid of smaller cards */}
          <div className="grid grid-cols-2 gap-4">
            {quickActions.slice(1).map((action, index) => {
              const Icon = action.icon;
              return (
                <Card
                  key={index}
                  className="bg-white shadow-lg rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                  onClick={action.action}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-start gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-teal-600" />
                      </div>
                      <h3 className="text-base font-semibold text-gray-800 leading-tight">
                        {action.title}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      
      <BottomTabBar />
    </div>
  );
};

export default Index;
