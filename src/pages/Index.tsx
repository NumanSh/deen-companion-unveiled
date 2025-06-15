
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
import { useToast } from '@/hooks/use-toast';
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
  const { toast } = useToast();

  const quickActions = [
    {
      title: "The Quran",
      icon: Book,
      action: () => navigate("/books"),
      color: "bg-emerald-500 hover:bg-emerald-600",
      description: "Read & Study"
    },
    {
      title: "Prayer Times",
      icon: Clock,
      action: () => navigate("/calendar"),
      color: "bg-blue-500 hover:bg-blue-600",
      description: "Times & Tracker"
    },
    {
      title: "Qibla",
      icon: Compass,
      action: () => navigate("/calendar"),
      color: "bg-purple-500 hover:bg-purple-600",
      description: "Find Direction"
    },
    {
      title: "Duas",
      icon: Heart,
      action: () => navigate("/books"),
      color: "bg-rose-500 hover:bg-rose-600",
      description: "Supplications"
    }
  ];

  const handleQuickAction = (action: any) => {
    // Instant feedback principle
    toast({
      title: `Opening ${action.title}`,
      description: action.description,
      duration: 1000,
    });
    
    // Slight delay for better UX
    setTimeout(() => {
      action.action();
    }, 150);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      {/* Enhanced Header with better touch targets */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-700 pt-12 pb-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20 h-12 w-12 rounded-xl transition-all duration-200 active:scale-90"
          >
            <Menu className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-3">
            <SmartNotificationCenter />
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20 h-12 w-12 rounded-xl transition-all duration-200 active:scale-90"
              onClick={() => {
                toast({
                  title: "Opening Settings",
                  description: "Customize your experience",
                  duration: 1000,
                });
                setTimeout(() => navigate("/settings"), 150);
              }}
            >
              <Settings className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-2">Deen Companion</h1>
          <p className="text-teal-100 text-base">Your spiritual journey dashboard</p>
        </div>
      </div>

      {/* Main Content with improved spacing */}
      <div className="flex-1 px-4 py-6 space-y-6 -mt-4">
        <div className="max-w-md mx-auto space-y-6">
          {/* Personal Dashboard */}
          <PersonalDashboard />
          
          {/* Quick Actions with enhanced UX */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl border-gray-200/50">
            <CardContent className="p-6">
              <h3 className="font-bold text-xl text-gray-800 dark:text-gray-200 mb-6 text-center">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      onClick={() => handleQuickAction(action)}
                      variant="outline"
                      className="h-24 p-4 flex flex-col items-center gap-3 hover:shadow-lg transition-all duration-200 border-2 hover:border-gray-300 active:scale-95 group"
                    >
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white transition-transform duration-200 group-hover:scale-110", action.color)}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-center">
                        <span className="text-sm font-semibold block">{action.title}</span>
                        <span className="text-xs text-gray-500 block mt-1">{action.description}</span>
                      </div>
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
