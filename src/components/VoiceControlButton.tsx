
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Mic, Volume2 } from 'lucide-react';
import VoiceControls from './VoiceControls';
import { useToast } from '@/hooks/use-toast';

const VoiceControlButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleOpenVoiceControls = () => {
    setIsOpen(true);
    toast({
      title: 'Voice Controls Opened',
      description: 'Configure voice reading and navigation settings',
    });
  };

  return (
    <>
      <Button
        onClick={handleOpenVoiceControls}
        className="rounded-full w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-lg"
        size="icon"
      >
        <div className="flex items-center">
          <Mic className="w-4 h-4 mr-1" />
          <Volume2 className="w-4 h-4" />
        </div>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Voice Interaction Controls</DialogTitle>
          </DialogHeader>
          <VoiceControls onClose={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VoiceControlButton;
