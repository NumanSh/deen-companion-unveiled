
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Play, 
  X, 
  Coffee, 
  Star,
  Zap,
  Gift
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SupportUsAdButtonProps {
  variant?: 'floating' | 'inline' | 'widget';
  size?: 'sm' | 'md' | 'lg';
}

const SupportUsAdButton: React.FC<SupportUsAdButtonProps> = ({ 
  variant = 'floating',
  size = 'md' 
}) => {
  const { toast } = useToast();
  const [isAdPlaying, setIsAdPlaying] = useState(false);
  const [adProgress, setAdProgress] = useState(0);
  const [hasWatchedAd, setHasWatchedAd] = useState(false);

  // Simulate ad playback
  const playAd = () => {
    setIsAdPlaying(true);
    setAdProgress(0);
    
    // Simulate 30-second ad
    const interval = setInterval(() => {
      setAdProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAdPlaying(false);
          setHasWatchedAd(true);
          
          toast({
            title: 'Thank You for Supporting Us! 💜',
            description: 'Your support helps us keep the app free and improve features.',
            duration: 4000,
          });
          
          return 100;
        }
        return prev + (100 / 30); // 30 seconds = 100%
      });
    }, 1000);
  };

  const skipAd = () => {
    setIsAdPlaying(false);
    setAdProgress(0);
    
    toast({
      title: 'Ad Skipped',
      description: 'Consider watching ads to support us! 🙏',
      duration: 2000,
    });
  };

  if (variant === 'widget') {
    return (
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-purple-800">Support Our App</p>
                <p className="text-xs text-purple-600">Watch a quick ad to help us</p>
              </div>
            </div>
            <Button
              size="sm"
              onClick={playAd}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              disabled={isAdPlaying}
            >
              <Play className="w-3 h-3 mr-1" />
              Watch Ad
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'inline') {
    return (
      <Button
        onClick={playAd}
        variant="outline"
        size={size === 'md' ? 'default' : size}
        className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300"
        disabled={isAdPlaying}
      >
        <Heart className="w-4 h-4 mr-2" />
        Support Us
        {hasWatchedAd && <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700">✓</Badge>}
      </Button>
    );
  }

  // Floating variant
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className={`
            relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95
            ${hasWatchedAd 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' 
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
            }
          `}
        >
          {hasWatchedAd ? <Star className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
          {hasWatchedAd && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-purple-600" />
            Support Our App
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {!isAdPlaying && !hasWatchedAd && (
            <>
              <div className="text-center space-y-3">
                <div className="p-4 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 w-fit mx-auto">
                  <Gift className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Help Us Keep This App Free</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Watch a short ad to support our development team. Your support helps us add new features and keep the app running.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={playAd}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Ad (30s)
                </Button>
              </div>
              
              <div className="text-xs text-gray-500 text-center">
                ✨ No personal data collected • Safe & secure
              </div>
            </>
          )}

          {isAdPlaying && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="p-6 rounded-xl bg-gray-100 mb-4">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Sample Advertisement</h3>
                  <p className="text-sm text-gray-600">
                    This is a demo ad. In a real app, this would display actual advertisements from ad networks.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${adProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600">
                    {Math.ceil((100 - adProgress) * 30 / 100)} seconds remaining
                  </p>
                </div>
              </div>
              
              {adProgress > 20 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={skipAd}
                  className="w-full"
                >
                  <X className="w-3 h-3 mr-2" />
                  Skip Ad
                </Button>
              )}
            </div>
          )}

          {hasWatchedAd && (
            <div className="text-center space-y-3">
              <div className="p-4 rounded-full bg-green-100 w-fit mx-auto">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800">Thank You! 🎉</h3>
                <p className="text-sm text-green-600 mt-2">
                  Your support means everything to us. You've helped us keep this app free for everyone!
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setHasWatchedAd(false);
                  setAdProgress(0);
                }}
                className="text-purple-600 border-purple-200 hover:bg-purple-50"
              >
                <Coffee className="w-3 h-3 mr-2" />
                Watch Another Ad
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupportUsAdButton;
