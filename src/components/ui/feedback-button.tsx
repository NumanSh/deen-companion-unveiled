
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface FeedbackButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  feedbackMessage?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  children,
  onClick,
  variant = "default",
  size = "default",
  className = "",
  feedbackMessage,
  disabled = false,
  type = "button",
  ...props
}) => {
  const { toast } = useToast();
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    
    // Visual feedback
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    
    // Toast feedback if message provided
    if (feedbackMessage) {
      toast({
        title: feedbackMessage,
        duration: 1000,
      });
    }
    
    // Execute the actual onClick
    if (onClick) {
      setTimeout(() => onClick(), 100);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      disabled={disabled}
      type={type}
      className={`transition-all duration-150 active:scale-95 ${
        isPressed ? 'scale-95' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

export default FeedbackButton;
