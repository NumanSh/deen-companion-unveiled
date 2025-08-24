
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, successMessage?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Copied!",
        description: successMessage || "Text copied to clipboard",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy text to clipboard",
        variant: "destructive",
      });
    }
  };

  return { copyToClipboard, copied };
};
