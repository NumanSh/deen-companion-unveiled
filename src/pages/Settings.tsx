
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Settings as SettingsIcon, 
  MapPin, 
  Bell, 
  Moon, 
  Sun, 
  Volume2,
  Star,
  Palette,
  Globe,
  Shield
} from "lucide-react";
import BottomTabBar from "@/components/BottomTabBar";
import { cn } from "@/lib/utils";

const Settings = () => {
  const [location, setLocation] = useState("New York, NY");
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [prayerAlerts, setPrayerAlerts] = useState(true);
  const [adhanSound, setAdhanSound] = useState(true);

  const settingsSections = [
    {
      title: "Location",
      icon: MapPin,
      gradient: "from-emerald-500 to-blue-500",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="location" className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
              Current Location
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-2 border-emerald-200 dark:border-emerald-700 focus:ring-emerald-500"
              placeholder="Enter your city"
            />
          </div>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
            <MapPin className="w-4 h-4 mr-2" />
            Update Location
          </Button>
        </div>
      )
    },
    {
      title: "Notifications",
      icon: Bell,
      gradient: "from-blue-500 to-purple-500",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                Prayer Notifications
              </Label>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                Get notified for prayer times
              </p>
            </div>
            <Switch 
              checked={prayerAlerts} 
              onCheckedChange={setPrayerAlerts}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                Adhan Sound
              </Label>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                Play Adhan for prayer times
              </p>
            </div>
            <Switch 
              checked={adhanSound} 
              onCheckedChange={setAdhanSound}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                General Notifications
              </Label>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                App updates and reminders
              </p>
            </div>
            <Switch 
              checked={notifications} 
              onCheckedChange={setNotifications}
            />
          </div>
        </div>
      )
    },
    {
      title: "Appearance",
      icon: Palette,
      gradient: "from-purple-500 to-pink-500",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {darkMode ? <Moon className="w-5 h-5 text-purple-600" /> : <Sun className="w-5 h-5 text-purple-600" />}
                <Label className="text-sm font-semibold text-purple-800 dark:text-purple-200">
                  Dark Mode
                </Label>
              </div>
              <p className="text-xs text-purple-600 dark:text-purple-400">
                Toggle dark theme
              </p>
            </div>
            <Switch 
              checked={darkMode} 
              onCheckedChange={setDarkMode}
            />
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20 relative overflow-hidden">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-600"></div>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
          <defs>
            <pattern id="islamic-pattern-settings" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20,0 L40,20 L20,40 L0,20 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern-settings)"/>
        </svg>
      </div>

      <div className="flex-1 px-4 py-6 relative">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Enhanced Header */}
          <div className="text-center space-y-4 mb-8">
            <div className="relative inline-flex items-center gap-3">
              <div className="relative">
                <SettingsIcon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                <Star className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-blue-700 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
                Settings
              </h1>
              <div className="relative">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="text-emerald-700 dark:text-emerald-300 font-medium text-lg">
              Customize your spiritual journey
            </p>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {settingsSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Card key={index} className="relative backdrop-blur-sm bg-white/95 dark:bg-gray-900/95 border-emerald-200 dark:border-emerald-800 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 border-b border-emerald-100 dark:border-emerald-800">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className={cn(
                        "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
                        section.iconBg
                      )}>
                        <Icon className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />
                      </div>
                      <span className="bg-gradient-to-r from-emerald-700 to-blue-700 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent font-bold">
                        {section.title}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {/* Decorative Corner Elements */}
                    <div className="absolute top-4 right-4 w-6 h-6 opacity-20">
                      <svg viewBox="0 0 24 24" className="w-full h-full text-emerald-600">
                        <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
                      </svg>
                    </div>
                    {section.content}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* App Info Section */}
          <Card className="relative backdrop-blur-sm bg-white/95 dark:bg-gray-900/95 border-emerald-200 dark:border-emerald-800 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 border-b border-emerald-100 dark:border-emerald-800">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-amber-100 dark:bg-amber-900/30">
                  <Star className="w-5 h-5 text-amber-700 dark:text-amber-300" />
                </div>
                <span className="bg-gradient-to-r from-emerald-700 to-blue-700 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent font-bold">
                  About Deen Companion
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/50 dark:to-blue-950/50 p-6 rounded-xl border border-emerald-200 dark:border-emerald-700">
                  <p className="text-emerald-800 dark:text-emerald-200 font-medium">
                    Version 1.0.0
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400 text-sm mt-2">
                    Your companion for Islamic practices and spiritual growth
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <BottomTabBar />
    </div>
  );
};

export default Settings;
