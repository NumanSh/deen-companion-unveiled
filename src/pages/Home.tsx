
import React from 'react';
import BottomTabBar from '@/components/BottomTabBar';
import EnhancedDashboard from '@/components/EnhancedDashboard';
import NewUserWelcome from '@/components/NewUserWelcome';
import CustomizableHomeWidgets from '@/components/CustomizableHomeWidgets';
import EnhancedFloatingActionSystem from '@/components/EnhancedFloatingActionSystem';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20 relative overflow-hidden">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
          <defs>
            <pattern id="islamic-pattern-home" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M25,0 L50,25 L25,50 L0,25 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              <circle cx="25" cy="25" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
              <path d="M25,15 L35,25 L25,35 L15,25 Z" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4"/>
              <path d="M12.5,12.5 L37.5,12.5 L37.5,37.5 L12.5,37.5 Z" fill="none" stroke="currentColor" strokeWidth="0.2" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern-home)"/>
        </svg>
      </div>

      <div className="flex-1 px-4 py-6 relative">
        <div className="max-w-6xl mx-auto space-y-8">
          <NewUserWelcome />
          
          {/* Customizable Home Widgets */}
          <CustomizableHomeWidgets />
          
          <EnhancedDashboard />
        </div>
      </div>
      
      <EnhancedFloatingActionSystem />
      <BottomTabBar />
    </div>
  );
};

export default Home;
