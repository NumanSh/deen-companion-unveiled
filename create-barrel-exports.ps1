# Create Barrel Exports for All Features

Write-Host "Creating barrel exports..." -ForegroundColor Green

# Prayer Feature
$prayerExports = @"
// Prayer Feature - Barrel Exports

// Components
export { default as PrayerTimesWidget } from './components/PrayerTimesWidget';
export { default as PrayerTimeTracker } from './components/PrayerTimeTracker';
export { default as PrayerNotifications } from './components/PrayerNotifications';
export { default as PersonalizedPrayerNotifications } from './components/PersonalizedPrayerNotifications';
export { default as SmartSalahReminder } from './components/SmartSalahReminder';
export { default as SmartPrayerWeatherIntegration } from './components/SmartPrayerWeatherIntegration';
export { default as SmartQiblaCompassAR } from './components/SmartQiblaCompassAR';
export { default as QiblaCompass } from './components/QiblaCompass';
export { default as IslamicPrayerTracker } from './components/IslamicPrayerTracker';
export { default as IntelligentPrayerAnalytics } from './components/IntelligentPrayerAnalytics';
export { default as WeatherPrayerBanner } from './components/WeatherPrayerBanner';
export { default as WeatherGif } from './components/WeatherGif';
export { default as CommunityPrayerRequests } from './components/CommunityPrayerRequests';
export { default as CommunityPrayerRequestsSystem } from './components/CommunityPrayerRequestsSystem';
export { default as CommunityPrayerTimeSync } from './components/CommunityPrayerTimeSync';
export { default as IslamicPrayerTimeAlerts } from './components/IslamicPrayerTimeAlerts';
export { default as IslamicWeatherWidget } from './components/IslamicWeatherWidget';

// Services
export * from './services/prayerTimesApi';
export * from './services/prayerTimesService';
export * from './services/prayerTimesCacheService';
export * from './services/prayerNotificationService';
export * from './services/locationService';
export * from './services/enhancedPrayerTimesService';

// Hooks
export * from './hooks';
"@

Set-Content -Path "src/features/prayer/index.ts" -Value $prayerExports

# Hadith Feature
$hadithExports = @"
// Hadith Feature - Barrel Exports

// Components
export { default as HadithSection } from './components/HadithSection';
export { default as HadithLoadingState } from './components/HadithLoadingState';
export { default as HadithSearchEngine } from './components/HadithSearchEngine';
export { default as HadithSearchFilters } from './components/HadithSearchFilters';
export { default as HadithSearchResults } from './components/HadithSearchResults';
export { default as SmartHadithAuthenticityChecker } from './components/SmartHadithAuthenticityChecker';

// Services
export * from './services/hadithApi';
export * from './services/hadithService';
export * from './services/hadithSearchService';
export * from './services/hadithApiClient';
export * from './services/hadithDataProcessor';
export * from './services/enhancedHadithService';

// Types
export * from './types/hadith';
export * from './types/hadithData';
"@

Set-Content -Path "src/features/hadith/index.ts" -Value $hadithExports

# Athkar Feature
$athkarExports = @"
// Athkar Feature - Barrel Exports

// Components
export { default as AthkarCard } from './components/AthkarCard';
export { default as AthkarCollectionBrowser } from './components/AthkarCollectionBrowser';
export { default as AthkarCounter } from './components/AthkarCounter';
export { default as AthkarFilters } from './components/AthkarFilters';
export { default as AthkarList } from './components/AthkarList';
export { default as TasbihCounter } from './components/TasbihCounter';
export { default as DhikrCounter } from './components/DhikrCounter';
export { default as DuasSection } from './components/DuasSection';
export { default as MorningEveningAdhkar } from './components/MorningEveningAdhkar';
export { default as AIPersonalizedDhikr } from './components/AIPersonalizedDhikr';
export { default as DuaCollectionsManager } from './components/DuaCollectionsManager';

// Services
export * from './services/athkarService';
export * from './services/enhancedAthkarService';

// Data
export * from './data/authenticAthkarData';
"@

Set-Content -Path "src/features/athkar/index.ts" -Value $athkarExports

# Calendar Feature
$calendarExports = @"
// Calendar Feature - Barrel Exports

// Components
export { default as IslamicCalendar } from './components/IslamicCalendar';
export { default as IslamicCalendarEvents } from './components/IslamicCalendarEvents';
export { default as HijriCalendarWidget } from './components/HijriCalendarWidget';
export { default as HijriDateConverter } from './components/HijriDateConverter';
export { default as IslamicDateEventsTracker } from './components/IslamicDateEventsTracker';
export { default as IslamicEventCountdown } from './components/IslamicEventCountdown';

// Services
export * from './services/islamicCalendarService';
"@

Set-Content -Path "src/features/calendar/index.ts" -Value $calendarExports

# Learning Feature
$learningExports = @"
// Learning Feature - Barrel Exports

// Components
export { default as AIIslamicCalendar } from './components/AIIslamicCalendar';
export { default as AIIslamicChatbot } from './components/AIIslamicChatbot';
export { default as AIIslamicDreamAnalysis } from './components/AIIslamicDreamAnalysis';
export { default as AIIslamicLearningAssistant } from './components/AIIslamicLearningAssistant';
export { default as AIIslamicLifeCoach } from './components/AIIslamicLifeCoach';
export { default as AIIslamicNewsInsights } from './components/AIIslamicNewsInsights';
export { default as AIIslamicScholarChat } from './components/AIIslamicScholarChat';
export { default as AISpiritualAdvisor } from './components/AISpiritualAdvisor';
export { default as AIPersonalizedLearningPath } from './components/AIPersonalizedLearningPath';
export { default as SmartIslamicGoalSetter } from './components/SmartIslamicGoalSetter';
export { default as SmartIslamicLearningAssistant } from './components/SmartIslamicLearningAssistant';
export { default as SmartLearningDashboard } from './components/SmartLearningDashboard';
export { default as SmartLearningPathSuggestions } from './components/SmartLearningPathSuggestions';
export { default as SmartContentDiscovery } from './components/SmartContentDiscovery';
export { default as SmartDailyRecommendations } from './components/SmartDailyRecommendations';
export { default as SmartBookmarksCollections } from './components/SmartBookmarksCollections';
export { default as SmartPersonalizationDashboard } from './components/SmartPersonalizationDashboard';
export { default as SmartNotificationCenter } from './components/SmartNotificationCenter';
export { default as SmartNotificationDashboard } from './components/SmartNotificationDashboard';
export { default as SmartNotificationSystem } from './components/SmartNotificationSystem';
export { default as IslamicKnowledgeQuiz } from './components/IslamicKnowledgeQuiz';
export { default as IslamicLearningPath } from './components/IslamicLearningPath';
export { default as AudioFirstLearningMode } from './components/AudioFirstLearningMode';
export { default as AdvancedCommunityLearningDashboard } from './components/AdvancedCommunityLearningDashboard';
export { default as AdvancedAnalyticsDashboard } from './components/AdvancedAnalyticsDashboard';
export { default as EnhancedCommunityLearningFeatures } from './components/EnhancedCommunityLearningFeatures';
export { default as AIHadithCompanion } from './components/AIHadithCompanion';
export { default as IslamicDreamInterpretation } from './components/IslamicDreamInterpretation';
export { default as IslamicDreamJournal } from './components/IslamicDreamJournal';
export { default as IslamicFatwaDatabase } from './components/IslamicFatwaDatabase';
export { default as IslamicNameMeanings } from './components/IslamicNameMeanings';
export { default as IslamicPodcastLibrary } from './components/IslamicPodcastLibrary';
export { default as IslamicQuoteWidget } from './components/IslamicQuoteWidget';
export { default as IslamicScholarQuotes } from './components/IslamicScholarQuotes';
export { default as IslamicStoriesHub } from './components/IslamicStoriesHub';
export { default as IslamicWisdomCollection } from './components/IslamicWisdomCollection';

// Services
export * from './services/aiPersonalizationEngine';
export * from './services/smartLearningService';
export * from './services/advancedLearningAnalytics';
"@

Set-Content -Path "src/features/learning/index.ts" -Value $learningExports

# Community Feature
$communityExports = @"
// Community Feature - Barrel Exports

// Components
export { default as VirtualStudyCircle } from './components/VirtualStudyCircle';
export { default as VirtualIslamicStudyGroup } from './components/VirtualIslamicStudyGroup';
export { default as VirtualMosqueFinder } from './components/VirtualMosqueFinder';
export { default as VirtualHajjPreparation } from './components/VirtualHajjPreparation';
export { default as CommunityChallenge } from './components/CommunityChallenge';
export { default as CommunityEngagementHub } from './components/CommunityEngagementHub';
export { default as CommunityMentorshipSystem } from './components/CommunityMentorshipSystem';
export { default as EnhancedVirtualStudyCircle } from './components/EnhancedVirtualStudyCircle';

// Services
export * from './services/voiceGuidedPrayerService';
export * from './services/voiceNavigationService';
export * from './services/voiceReadingService';
"@

Set-Content -Path "src/features/community/index.ts" -Value $communityExports

# Tracking Feature
$trackingExports = @"
// Tracking Feature - Barrel Exports

// Components
export { default as HabitTracker } from './components/HabitTracker';
export { default as IntelligentHabitTracker } from './components/IntelligentHabitTracker';
export { default as IslamicHabitBuilder } from './components/IslamicHabitBuilder';
export { default as IslamicHabitVisualization } from './components/IslamicHabitVisualization';
export { default as SpiritualHabitStreaks } from './components/SpiritualHabitStreaks';
export { default as ProgressAnalytics } from './components/ProgressAnalytics';
export { default as DailyProgress } from './components/DailyProgress';
export { default as IslamicMilestoneTracker } from './components/IslamicMilestoneTracker';
export { default as IslamicGoalsTracker } from './components/IslamicGoalsTracker';
export { default as PerformanceDashboard } from './components/PerformanceDashboard';
export { default as PersonalDashboard } from './components/PersonalDashboard';
export { default as EnhancedDashboard } from './components/EnhancedDashboard';
export { default as DailyIslamicCalendar } from './components/DailyIslamicCalendar';
export { default as DailyIslamicChallenges } from './components/DailyIslamicChallenges';
export { default as DailyIslamicGoals } from './components/DailyIslamicGoals';
export { default as DailyReminders } from './components/DailyReminders';
export { default as DailyVerseReflection } from './components/DailyVerseReflection';
export { default as IslamicArticleLibrary } from './components/IslamicArticleLibrary';
export { default as IslamicAudioLibrary } from './components/IslamicAudioLibrary';
export { default as IslamicBookLibrary } from './components/IslamicBookLibrary';
export { default as IslamicContentWrapper } from './components/IslamicContentWrapper';
export { default as IslamicFinanceCalculator } from './components/IslamicFinanceCalculator';
export { default as IslamicFinanceCalculatorEnhanced } from './components/IslamicFinanceCalculatorEnhanced';
export { default as IslamicFinanceTracker } from './components/IslamicFinanceTracker';
export { default as EnhancedZakatCalculator } from './components/EnhancedZakatCalculator';
export { default as CharityImpactTracker } from './components/CharityImpactTracker';
export { default as SadaqahTracker } from './components/SadaqahTracker';

// Services
export * from './services/performanceMonitoring';
"@

Set-Content -Path "src/features/tracking/index.ts" -Value $trackingExports

# Shared Feature
$sharedExports = @"
// Shared Feature - Barrel Exports

// Components
export { default as ModernCard } from './components/ModernCard';
export { default as EnhancedModernCard } from './components/EnhancedModernCard';
export { default as ErrorBoundary } from './components/ErrorBoundary';
export { default as ApiErrorBoundary } from './components/ApiErrorBoundary';
export { default as EnhancedLoadingStates } from './components/EnhancedLoadingStates';
export { default as IslamicLoadingStates } from './components/IslamicLoadingStates';
export { default as FloatingActionButton } from './components/FloatingActionButton';
export { default as FloatingActionMenu } from './components/FloatingActionMenu';
export { default as FloatingHelpSystem } from './components/FloatingHelpSystem';
export { default as FloatingQuickAccess } from './components/FloatingQuickAccess';
export { default as FloatingQuickActions } from './components/FloatingQuickActions';
export { default as EnhancedFloatingActions } from './components/EnhancedFloatingActions';
export { default as EnhancedFloatingActionsSystem } from './components/EnhancedFloatingActionsSystem';
export { default as EnhancedFloatingActionSystem } from './components/EnhancedFloatingActionSystem';
export { default as EnhancedFloatingSystem } from './components/EnhancedFloatingSystem';
export { default as UnifiedFloatingActions } from './components/UnifiedFloatingActions';
export { default as OfflineIndicator } from './components/OfflineIndicator';
export { default as AccessibilityEnhancements } from './components/AccessibilityEnhancements';
export { default as SupportUsAdButton } from './components/SupportUsAdButton';
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
export { default as AdaptiveUIPreferences } from './components/AdaptiveUIPreferences';
export { default as AdvancedCommunityAnalytics } from './components/AdvancedCommunityAnalytics';
export { default as AdvancedIslamicLocationServices } from './components/AdvancedIslamicLocationServices';
export { default as AdvancedReadingAnalyticsDashboard } from './components/AdvancedReadingAnalyticsDashboard';
export { default as PersonalizedContentEngine } from './components/PersonalizedContentEngine';
export { default as PersonalizedRecommendations } from './components/PersonalizedRecommendations';
export { default as ProgressIndicator } from './components/ProgressIndicator';
export { default as QuickAccessWidget } from './components/QuickAccessWidget';
export { default as QuickActionShortcuts } from './components/QuickActionShortcuts';
export { default as SpiritualJournal } from './components/SpiritualJournal';
export { default as SpiritualMoodTracker } from './components/SpiritualMoodTracker';
export { default as InteractiveAchievementSystem } from './components/InteractiveAchievementSystem';
export { default as InteractiveIslamicAchievements } from './components/InteractiveIslamicAchievements';
export { default as IslamicAchievementSystem } from './components/IslamicAchievementSystem';
export { default as FastingTracker } from './components/FastingTracker';
export { default as FiqhQASection } from './components/FiqhQASection';
export { default as GlobalCounterReset } from './components/GlobalCounterReset';

// Hooks
export { default as useMobile } from './hooks/use-mobile';
export { default as useOfflineStatus } from './hooks/useOfflineStatus';
export { default as useCopyToClipboard } from './hooks/useCopyToClipboard';
export { default as usePerformanceOptimizations } from './hooks/usePerformanceOptimizations';
export { default as useHijriDate } from './hooks/useHijriDate';

// Utils
export * from './utils/inputValidation';
export * from './utils/apiErrorHandler';
export * from './utils/userDataUtils';

// Types
export * from './types/speechRecognition';
"@

Set-Content -Path "src/shared/index.ts" -Value $sharedExports

# Layout Feature
$layoutExports = @"
// Layout Feature - Barrel Exports

// Components
export { default as MainHeader } from './MainHeader';
export { default as ModernHeader } from './ModernHeader';
export { default as BottomTabBar } from './BottomTabBar';
export { default as TabNavigation } from './TabNavigation';
export { default as TabContent } from './TabContent';
export { default as ContentDiscovery } from './ContentDiscovery';
"@

Set-Content -Path "src/layout/index.ts" -Value $layoutExports

Write-Host "Barrel exports created successfully!" -ForegroundColor Green
