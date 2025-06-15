
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  BookOpen, 
  Clock, 
  Target, 
  Star,
  ArrowRight,
  Check,
  Sparkles,
  Gift
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  action: string;
  route?: string;
  color: string;
  completed: boolean;
}

const EnhancedOnboarding = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 'welcome',
      title: 'Welcome to Your Spiritual Journey',
      description: 'Discover the beauty of Islamic knowledge with personalized content and guidance',
      icon: Heart,
      action: 'Get Started',
      color: 'from-rose-500 to-pink-600',
      completed: false
    },
    {
      id: 'quran',
      title: 'Explore the Quran',
      description: 'Read, listen, and reflect on the holy verses with multiple translations',
      icon: BookOpen,
      action: 'Open Quran',
      route: '/books?tab=quran',
      color: 'from-emerald-500 to-teal-600',
      completed: false
    },
    {
      id: 'prayers',
      title: 'Never Miss Prayer Times',
      description: 'Get accurate prayer times and qibla direction for your location',
      icon: Clock,
      action: 'Set Prayer Times',
      route: '/calendar',
      color: 'from-blue-500 to-indigo-600',
      completed: false
    },
    {
      id: 'goals',
      title: 'Set Your Spiritual Goals',
      description: 'Track your daily dhikr, reading progress, and spiritual habits',
      icon: Target,
      action: 'Create Goals',
      route: '/home',
      color: 'from-purple-500 to-violet-600',
      completed: false
    }
  ]);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    const completedSteps = localStorage.getItem('onboardingSteps');
    
    if (!hasSeenOnboarding) {
      setIsVisible(true);
    }
    
    if (completedSteps) {
      const completed = JSON.parse(completedSteps);
      setSteps(prevSteps => 
        prevSteps.map(step => ({
          ...step,
          completed: completed.includes(step.id)
        }))
      );
    }
  }, []);

  const completedCount = steps.filter(step => step.completed).length;
  const progressPercentage = (completedCount / steps.length) * 100;

  const handleStepComplete = (stepId: string, route?: string) => {
    setSteps(prevSteps =>
      prevSteps.map(step =>
        step.id === stepId ? { ...step, completed: true } : step
      )
    );

    const completedSteps = steps
      .map(step => step.id === stepId ? { ...step, completed: true } : step)
      .filter(step => step.completed)
      .map(step => step.id);

    localStorage.setItem('onboardingSteps', JSON.stringify(completedSteps));

    toast({
      title: 'Step Completed! ✨',
      description: 'Great progress on your spiritual journey',
      duration: 2000,
    });

    if (route) {
      setTimeout(() => navigate(route), 500);
    }

    if (currentStep < steps.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 1000);
    } else {
      setTimeout(() => {
        localStorage.setItem('hasSeenOnboarding', 'true');
        setIsVisible(false);
        toast({
          title: 'Onboarding Complete! 🎉',
          description: 'You\'re ready to begin your journey',
          duration: 3000,
        });
      }, 1500);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg mx-auto shadow-2xl border-0 overflow-hidden">
        {/* Progress Header */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Getting Started</span>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {currentStep + 1} of {steps.length}
            </Badge>
          </div>
          <Progress value={(currentStep / (steps.length - 1)) * 100} className="h-2 bg-teal-700" />
        </div>

        <CardContent className="p-8">
          {/* Current Step */}
          <div className="text-center space-y-6">
            {/* Icon */}
            <div className={`relative mx-auto w-20 h-20 rounded-full bg-gradient-to-br ${currentStepData.color} flex items-center justify-center shadow-lg`}>
              <Icon className="w-8 h-8 text-white" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                {currentStepData.completed ? (
                  <Check className="w-3 h-3 text-white" />
                ) : (
                  <Star className="w-3 h-3 text-white" />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-800">
                {currentStepData.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {currentStepData.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => handleStepComplete(currentStepData.id, currentStepData.route)}
                className={`w-full h-12 bg-gradient-to-r ${currentStepData.color} hover:opacity-90 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl group`}
                disabled={currentStepData.completed}
              >
                {currentStepData.completed ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Completed
                  </>
                ) : (
                  <>
                    {currentStepData.action}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>

              {currentStep === steps.length - 1 && (
                <Button
                  variant="outline"
                  onClick={handleSkip}
                  className="w-full"
                >
                  Complete Onboarding
                </Button>
              )}
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'bg-teal-500 scale-125'
                      : step.completed
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </CardContent>

        {/* Skip Button */}
        <div className="px-8 pb-6">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="w-full text-gray-500 hover:text-gray-700"
            size="sm"
          >
            Skip for now
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EnhancedOnboarding;
