
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Keyboard, 
  Search, 
  BookOpen, 
  Clock, 
  Heart, 
  Compass,
  Settings,
  Home,
  Calendar,
  Copy,
  Share2,
  BookmarkPlus,
  Zap,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface KeyboardShortcut {
  id: string;
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  description: string;
  action: () => void;
  category: 'navigation' | 'content' | 'actions' | 'system';
  isEnabled: boolean;
}

const KeyboardShortcutsManager: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [shortcuts, setShortcuts] = useState<KeyboardShortcut[]>([]);

  useEffect(() => {
    const defaultShortcuts: KeyboardShortcut[] = [
      // Navigation shortcuts
      {
        id: 'home',
        key: 'h',
        ctrlKey: true,
        description: 'Go to Home',
        action: () => navigate('/'),
        category: 'navigation',
        isEnabled: true
      },
      {
        id: 'books',
        key: 'b',
        ctrlKey: true,
        description: 'Open Books/Quran',
        action: () => navigate('/books'),
        category: 'navigation',
        isEnabled: true
      },
      {
        id: 'calendar',
        key: 'p',
        ctrlKey: true,
        description: 'Prayer Times & Calendar',
        action: () => navigate('/calendar'),
        category: 'navigation',
        isEnabled: true
      },
      {
        id: 'settings',
        key: 's',
        ctrlKey: true,
        altKey: true,
        description: 'Open Settings',
        action: () => navigate('/settings'),
        category: 'navigation',
        isEnabled: true
      },
      
      // Content shortcuts
      {
        id: 'search',
        key: 'f',
        ctrlKey: true,
        description: 'Quick Search',
        action: () => {
          const searchElement = document.querySelector('input[type="search"], input[placeholder*="search" i]') as HTMLInputElement;
          if (searchElement) {
            searchElement.focus();
          } else {
            toast({
              title: 'Search',
              description: 'Opening search functionality...',
            });
          }
        },
        category: 'content',
        isEnabled: true
      },
      {
        id: 'bookmark',
        key: 'm',
        ctrlKey: true,
        description: 'Add Bookmark',
        action: () => {
          toast({
            title: 'Bookmark Added',
            description: 'Current content bookmarked',
          });
        },
        category: 'actions',
        isEnabled: true
      },
      {
        id: 'copy',
        key: 'c',
        ctrlKey: true,
        shiftKey: true,
        description: 'Copy Current Content',
        action: () => {
          const selectedText = window.getSelection()?.toString();
          if (selectedText) {
            navigator.clipboard.writeText(selectedText);
            toast({
              title: 'Copied',
              description: 'Selected text copied to clipboard',
            });
          }
        },
        category: 'actions',
        isEnabled: true
      },
      {
        id: 'share',
        key: 's',
        ctrlKey: true,
        shiftKey: true,
        description: 'Share Current Content',
        action: () => {
          toast({
            title: 'Share',
            description: 'Opening share options...',
          });
        },
        category: 'actions',
        isEnabled: true
      },
      
      // System shortcuts
      {
        id: 'help',
        key: '?',
        shiftKey: true,
        description: 'Show Keyboard Shortcuts',
        action: () => setIsHelpOpen(true),
        category: 'system',
        isEnabled: true
      },
      {
        id: 'quick-actions',
        key: 'q',
        ctrlKey: true,
        description: 'Open Quick Actions',
        action: () => {
          toast({
            title: 'Quick Actions',
            description: 'Use the floating action button on the bottom right',
          });
        },
        category: 'system',
        isEnabled: true
      }
    ];

    setShortcuts(defaultShortcuts);
  }, []); // Remove dependencies that cause infinite loops

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeShortcut = shortcuts.find(shortcut => {
        if (!shortcut.isEnabled) return false;
        
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch = !!shortcut.ctrlKey === event.ctrlKey;
        const altMatch = !!shortcut.altKey === event.altKey;
        const shiftMatch = !!shortcut.shiftKey === event.shiftKey;
        
        return keyMatch && ctrlMatch && altMatch && shiftMatch;
      });

      if (activeShortcut) {
        event.preventDefault();
        activeShortcut.action();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);

  const getShortcutDisplay = (shortcut: KeyboardShortcut) => {
    const parts = [];
    if (shortcut.ctrlKey) parts.push('Ctrl');
    if (shortcut.altKey) parts.push('Alt');
    if (shortcut.shiftKey) parts.push('Shift');
    parts.push(shortcut.key.toUpperCase());
    return parts.join(' + ');
  };

  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) acc[shortcut.category] = [];
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<string, KeyboardShortcut[]>);

  const categoryIcons = {
    navigation: Home,
    content: BookOpen,
    actions: Zap,
    system: Settings
  };

  const categoryLabels = {
    navigation: 'Navigation',
    content: 'Content',
    actions: 'Actions', 
    system: 'System'
  };

  return (
    <>
      {/* Help Dialog */}
      <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Keyboard className="w-5 h-5" />
              Keyboard Shortcuts
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons];
              return (
                <div key={category}>
                  <h3 className="flex items-center gap-2 font-semibold text-lg mb-3">
                    <Icon className="w-4 h-4" />
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </h3>
                  <div className="grid gap-2">
                    {categoryShortcuts
                      .filter(shortcut => shortcut.isEnabled)
                      .map((shortcut) => (
                        <div key={shortcut.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                          <span className="text-sm">{shortcut.description}</span>
                          <Badge variant="outline" className="font-mono text-xs">
                            {getShortcutDisplay(shortcut)}
                          </Badge>
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
            
            <div className="pt-4 border-t">
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <Info className="w-3 h-3" />
                Press <Badge variant="outline" className="font-mono text-xs">Shift + ?</Badge> to open this help at any time
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating Help Button */}
      <div className="fixed bottom-24 left-4 z-40">
        <Button
          onClick={() => setIsHelpOpen(true)}
          size="sm"
          variant="outline"
          className="h-10 w-10 rounded-full shadow-lg bg-white/90 backdrop-blur-sm hover:bg-white border-gray-200"
        >
          <Keyboard className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
};

export default KeyboardShortcutsManager;
