import React, { useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

interface AccessibilityEnhancementsProps {
  onQuickSearch?: () => void;
  onGoToTop?: () => void;
  onToggleTheme?: () => void;
  onNextSection?: () => void;
  onPrevSection?: () => void;
}

const AccessibilityEnhancements: React.FC<AccessibilityEnhancementsProps> = ({
  onQuickSearch,
  onGoToTop,
  onToggleTheme,
  onNextSection,
  onPrevSection
}) => {
  // Keyboard shortcuts
  useHotkeys('ctrl+k', (e) => {
    e.preventDefault();
    onQuickSearch?.();
  }, { enableOnFormTags: true });

  useHotkeys('ctrl+shift+t', (e) => {
    e.preventDefault();
    onToggleTheme?.();
  });

  useHotkeys('ctrl+home', (e) => {
    e.preventDefault();
    onGoToTop?.();
  });

  useHotkeys('ctrl+shift+n', (e) => {
    e.preventDefault();
    onNextSection?.();
  });

  useHotkeys('ctrl+shift+p', (e) => {
    e.preventDefault();
    onPrevSection?.();
  });

  // Add skip link for screen readers
  useEffect(() => {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 z-50 bg-primary text-primary-foreground p-2 rounded-br-md';
    skipLink.textContent = 'Skip to main content';
    skipLink.setAttribute('aria-label', 'Skip to main content');
    
    if (document.body.firstChild) {
      document.body.insertBefore(skipLink, document.body.firstChild);
    } else {
      document.body.appendChild(skipLink);
    }

    return () => {
      skipLink.remove();
    };
  }, []);

  // Announce keyboard shortcuts to screen readers
  useEffect(() => {
    const announceShortcuts = () => {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = 'Keyboard shortcuts available: Ctrl+K for quick search, Ctrl+Shift+T for theme toggle, Ctrl+Home to go to top';
      document.body.appendChild(announcement);

      setTimeout(() => {
        announcement.remove();
      }, 3000);
    };

    // Announce shortcuts after a delay to avoid overwhelming screen readers
    const timer = setTimeout(announceShortcuts, 2000);
    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default AccessibilityEnhancements;