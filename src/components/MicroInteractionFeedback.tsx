
import React, { useState, useEffect } from 'react';
import { CheckCircle, Heart, Star, Zap } from 'lucide-react';

interface FeedbackAnimation {
  id: string;
  type: 'success' | 'like' | 'achievement' | 'action';
  x: number;
  y: number;
  timestamp: number;
}

const MicroInteractionFeedback = () => {
  const [animations, setAnimations] = useState<FeedbackAnimation[]>([]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Only trigger on interactive elements
      if (target.tagName === 'BUTTON' || target.closest('button') || target.closest('[role="button"]')) {
        const rect = target.getBoundingClientRect();
        const animation: FeedbackAnimation = {
          id: Math.random().toString(36).substr(2, 9),
          type: getAnimationType(target),
          x: event.clientX,
          y: event.clientY,
          timestamp: Date.now()
        };

        setAnimations(prev => [...prev, animation]);

        // Remove animation after 1 second
        setTimeout(() => {
          setAnimations(prev => prev.filter(a => a.id !== animation.id));
        }, 1000);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const getAnimationType = (element: HTMLElement): FeedbackAnimation['type'] => {
    const text = element.textContent?.toLowerCase() || '';
    const className = element.className.toLowerCase();
    
    if (text.includes('bookmark') || text.includes('save') || className.includes('bookmark')) {
      return 'like';
    }
    if (text.includes('complete') || text.includes('done') || className.includes('success')) {
      return 'success';
    }
    if (text.includes('achievement') || text.includes('goal') || className.includes('achievement')) {
      return 'achievement';
    }
    return 'action';
  };

  const getIcon = (type: FeedbackAnimation['type']) => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'like':
        return Heart;
      case 'achievement':
        return Star;
      default:
        return Zap;
    }
  };

  const getColor = (type: FeedbackAnimation['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-500';
      case 'like':
        return 'text-red-500';
      case 'achievement':
        return 'text-yellow-500';
      default:
        return 'text-blue-500';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {animations.map((animation) => {
        const Icon = getIcon(animation.type);
        const colorClass = getColor(animation.type);
        
        return (
          <div
            key={animation.id}
            className={`absolute ${colorClass} animate-ping`}
            style={{
              left: animation.x - 12,
              top: animation.y - 12,
              animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) 1'
            }}
          >
            <Icon className="w-6 h-6" />
          </div>
        );
      })}
    </div>
  );
};

export default MicroInteractionFeedback;
