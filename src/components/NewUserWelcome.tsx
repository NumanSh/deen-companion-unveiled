
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Star, Heart, Target, BookOpen, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { isNewUser, initializeNewUserData, resetUserDataForNewUser } from '@/utils/userDataUtils';

interface NewUserWelcomeProps {
  onComplete?: () => void;
}

const NewUserWelcome: React.FC<NewUserWelcomeProps> = ({ onComplete }) => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const { t } = useLanguage();

  const steps = [
    {
      title: t('welcome-islamic-journey'),
      description: t('assalamu-alaikum-start-journey'),
      icon: <Heart className="w-8 h-8 text-emerald-600" />,
      content: t('app-help-track-prayers')
    },
    {
      title: t('daily-islamic-challenges-title'),
      description: t('complete-daily-challenges-strengthen'),
      icon: <Target className="w-8 h-8 text-blue-600" />,
      content: t('start-simple-challenges')
    },
    {
      title: t('achievement-system-title'),
      description: t('earn-achievements-progress'),
      icon: <Star className="w-8 h-8 text-yellow-600" />,
      content: t('unlock-badges-consistency')
    },
    {
      title: t('islamic-milestones-title'),
      description: t('track-progress-phases'),
      icon: <BookOpen className="w-8 h-8 text-purple-600" />,
      content: t('progress-foundation-advanced')
    }
  ];

  useEffect(() => {
    if (isNewUser()) {
      setShowWelcome(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    initializeNewUserData();
    setShowWelcome(false);
    setCurrentStep(0);
    
    toast({
      title: t('welcome-celebration'),
      description: t('islamic-journey-starts-now'),
    });
    
    onComplete?.();
  };

  const handleResetData = () => {
    resetUserDataForNewUser();
    initializeNewUserData();
    
    toast({
      title: t('data-reset-title'),
      description: t('progress-reset-fresh'),
    });
    
    setShowWelcome(false);
  };

  const currentStepData = steps[currentStep];

  if (!showWelcome) {
    return (
      <Card className="mb-4 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-emerald-600" />
              <div>
                <h3 className="font-semibold text-emerald-800 dark:text-emerald-200">
                  {t('new-user-experience')}
                </h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  {t('want-start-fresh')}
                </p>
              </div>
            </div>
            <Button
              onClick={() => setShowWelcome(true)}
              variant="outline"
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-100"
            >
              {t('start-fresh')}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Dialog open={showWelcome} onOpenChange={() => {}}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {currentStepData.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-4">
          <div className="text-center">
            {currentStepData.icon}
          </div>
          
          <div className="text-center space-y-2">
            <p className="font-medium text-gray-700 dark:text-gray-300">
              {currentStepData.description}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentStepData.content}
            </p>
          </div>
          
          {/* Progress indicator */}
          <div className="flex justify-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? 'bg-emerald-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <div className="flex gap-3">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1"
              >
                {t('previous')}
              </Button>
            )}
            
            <Button
              onClick={handleNext}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {t('start-journey')}
                </>
              ) : (
                t('next')
              )}
            </Button>
          </div>
          
          {currentStep === 0 && (
            <div className="text-center">
              <Button
                variant="link"
                onClick={handleResetData}
                className="text-xs text-gray-500"
              >
                {t('returning-reset-data')}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewUserWelcome;
