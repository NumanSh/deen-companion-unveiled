// Shared Feature - Barrel Exports

// Components
export { default as ModernCard } from './components/ModernCard';
export { default as EnhancedModernCard } from './components/EnhancedModernCard';
export { default as ErrorBoundary } from './components/ErrorBoundary';
export { default as ApiErrorBoundary } from './components/ApiErrorBoundary';
export { default as EnhancedLoadingStates } from './components/EnhancedLoadingStates';
export { default as IslamicLoadingStates } from './components/IslamicLoadingStates';
// Removed complex floating action systems - simplified UI
export { default as OfflineIndicator } from './components/OfflineIndicator';
export { default as AccessibilityEnhancements } from './components/AccessibilityEnhancements';
export { default as SupportUsAdButton } from './components/SupportUsAdButton';
export { useOfflinePrayerTimes } from './hooks/useOfflinePrayerTimes';
export { useApiCache } from './hooks/useApiCache';
export { default as LazyWrapper } from './components/LazyWrapper';
export { default as EnhancedOnboarding } from './components/EnhancedOnboarding';
export { default as NewUserWelcome } from './components/NewUserWelcome';
export { default as EnhancedSearchExperience } from './components/EnhancedSearchExperience';
export { default as EnhancedTypographyControls } from './components/EnhancedTypographyControls';
export { default as EnhancedContextMenu } from './components/EnhancedContextMenu';
export { default as UniversalSearch } from './components/UniversalSearch';
export { default as VoiceControlButton } from './components/VoiceControlButton';
export { default as VoiceControls } from './components/VoiceControls';
export { default as VoiceReadingMode } from './components/VoiceReadingMode';
export { default as KeyboardShortcutsManager } from './components/KeyboardShortcutsManager';
export { default as MicroInteractionFeedback } from './components/MicroInteractionFeedback';
export { default as CustomizableHomeWidgets } from './components/CustomizableHomeWidgets';
// export { default as AdaptiveUIPreferences } from './components/AdaptiveUIPreferences';
// Removed complex analytics components - focusing on core functionality
export { default as ProgressIndicator } from './components/ProgressIndicator';
export { default as QuickAccessWidget } from './components/QuickAccessWidget';
export { default as QuickActionShortcuts } from './components/QuickActionShortcuts';
export { default as SpiritualJournal } from './components/SpiritualJournal';
export { default as SpiritualMoodTracker } from './components/SpiritualMoodTracker';
export { default as InteractiveAchievementSystem } from './components/InteractiveAchievementSystem';
// export { default as InteractiveIslamicAchievements } from './components/InteractiveIslamicAchievements';
export { default as IslamicAchievementSystem } from './components/IslamicAchievementSystem';
export { default as FastingTracker } from './components/FastingTracker';
export { default as FiqhQASection } from './components/FiqhQASection';
export { default as SmartBookmarksCollections } from './components/SmartBookmarksCollections';
export * from './hooks/useOptimizedSearch';

// Hooks  
export { useIsMobile as useMobile } from './hooks/use-mobile';
export { useCopyToClipboard } from './hooks/useCopyToClipboard';
export { default as useOfflineStatus } from './hooks/useOfflineStatus';
export { default as useHijriDate } from './hooks/useHijriDate';
export { useToast } from './hooks/use-toast';

// Utils
export * from './utils/inputValidation';
export * from './utils/apiErrorHandler';
export * from './utils/userDataUtils';

// Types
export * from './types/speechRecognition';
