
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  Settings, 
  Bell, 
  Star,
  Zap,
  Heart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import SmartNotificationCenter from '@/components/SmartNotificationCenter';

interface ModernHeaderProps {
  timeOfDay: string;
  onMenuClick?: () => void;
}

const ModernHeader: React.FC<ModernHeaderProps> = ({ timeOfDay, onMenuClick }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const getGreeting = () => {
    switch (timeOfDay) {
      case 'morning': return { arabic: 'صباح الخير', english: 'Good Morning' };
      case 'afternoon': return { arabic: 'مساء الخير', english: 'Good Afternoon' };
      case 'evening': return { arabic: 'مساء النور', english: 'Good Evening' };
      default: return { arabic: 'السلام عليكم', english: 'Peace be upon you' };
    }
  };

  const greeting = getGreeting();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-emerald-600 to-green-700">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M30 0l30 30-30 30L0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />

      {/* Header Content */}
      <div className="relative z-10 px-4 pt-12 pb-8">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20 h-11 w-11 rounded-xl transition-all duration-200 active:scale-90"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <SmartNotificationCenter />
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20 h-11 w-11 rounded-xl transition-all duration-200 active:scale-90"
              onClick={() => {
                toast({
                  title: "Opening Settings",
                  description: "Customize your experience",
                  duration: 1000,
                });
                setTimeout(() => navigate("/settings"), 150);
              }}
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center space-y-4">
          {/* Greeting */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {greeting.arabic}
            </h1>
            <p className="text-teal-100 text-lg font-medium">
              {greeting.english}
            </p>
          </div>

          {/* App Title */}
          <div className="flex items-center justify-center gap-3">
            <div className="relative">
              <Heart className="w-6 h-6 text-rose-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-400 rounded-full animate-pulse" />
            </div>
            <h2 className="text-xl text-white/90 font-semibold">Deen Companion</h2>
            <div className="relative">
              <Star className="w-6 h-6 text-yellow-300" />
              <Zap className="w-3 h-3 text-yellow-200 absolute top-0 right-0 animate-pulse" />
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-teal-200 text-sm max-w-xs mx-auto leading-relaxed">
            Your personalized spiritual journey towards closeness to Allah
          </p>

          {/* Status Badge */}
          <div className="flex justify-center">
            <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors">
              ✨ Active Today
            </Badge>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/10 to-transparent" />
    </div>
  );
};

export default ModernHeader;
