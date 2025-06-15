
import React from "react";
import BottomTabBar from "@/components/BottomTabBar";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import UserSettingsPanel from "@/components/UserSettingsPanel";

const Settings = () => {
  const { isRTL } = useLanguage();

  return (
    <div className={cn("min-h-screen flex flex-col bg-background pb-20 relative overflow-hidden", isRTL && "rtl")}>
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

      <div className="flex-1 relative">
        <UserSettingsPanel />
      </div>
      
      <BottomTabBar />
    </div>
  );
};

export default Settings;
