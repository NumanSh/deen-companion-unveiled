
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
import PersonalDashboard from "@/components/PersonalDashboard";
import QuranicVerseOfDay from "@/components/QuranicVerseOfDay";
import IslamicQuoteWidget from "@/components/IslamicQuoteWidget";
import PrayerTimesWidget from "@/components/PrayerTimesWidget";
import FloatingQuickAccess from "@/components/FloatingQuickAccess";
import SmartNotificationCenter from "@/components/SmartNotificationCenter";
import { cn } from "@/lib/utils";

const Index = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "The Quran",
      icon: Book,
      action: () => navigate("/books"),
      color: "bg-emerald-500"
    },
    {
      title: "Prayer Times",
      icon: Clock,
      action: () => navigate("/calendar"),
      color: "bg-blue-500"
    },
    {
      title: "Qibla",
      icon: Compass,
      action: () => navigate("/calendar"),
      color: "bg-purple-500"
    },
    {
      title: "Duas",
      icon: Heart,
      action: () => navigate("/books"),
      color: "bg-rose-500"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-700 pt-12 pb-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Menu className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-2">
            <SmartNotificationCenter />
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={() => navigate("/settings")}
            >
              <Settings className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-2">Deen Companion</h1>
          <p className="text-teal-100 text-sm">Your spiritual journey dashboard</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6 space-y-6 -mt-4">
        <div className="max-w-md mx-auto space-y-6">
          {/* Personal Dashboard */}
          <PersonalDashboard />
          
          {/* Quick Actions */}
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      onClick={action.action}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center gap-2 hover:shadow-md transition-all"
                    >
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white", action.color)}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium text-center">{action.title}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Daily Content */}
          <div className="space-y-4">
            <QuranicVerseOfDay />
            <IslamicQuoteWidget />
          </div>

          {/* Prayer Times */}
          <PrayerTimesWidget />
        </div>
      </div>
      
      {/* Floating Quick Access Widget */}
      <FloatingQuickAccess />
      
      <BottomTabBar />
    </div>
  );
};

export default Index;
