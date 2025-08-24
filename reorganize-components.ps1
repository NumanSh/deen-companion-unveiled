# Islamic Companion App - Component Reorganization Script
# This script reorganizes 200+ components into feature-based architecture

Write-Host "Starting component reorganization..." -ForegroundColor Green

# Create feature directories if they don't exist
$features = @(
    "src/features/quran/components",
    "src/features/quran/hooks", 
    "src/features/quran/services",
    "src/features/quran/types",
    "src/features/prayer/components",
    "src/features/prayer/services",
    "src/features/prayer/hooks",
    "src/features/hadith/components",
    "src/features/hadith/services",
    "src/features/hadith/types",
    "src/features/athkar/components",
    "src/features/athkar/services",
    "src/features/athkar/data",
    "src/features/calendar/components",
    "src/features/calendar/services",
    "src/features/learning/components",
    "src/features/learning/services",
    "src/features/community/components",
    "src/features/community/services",
    "src/features/tracking/components",
    "src/features/tracking/services",
    "src/shared/components",
    "src/shared/hooks",
    "src/shared/utils",
    "src/shared/types",
    "src/layout"
)

foreach ($dir in $features) {
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "Created directory: $dir" -ForegroundColor Yellow
    }
}

# Define component mappings
$componentMappings = @{
    # Quran Feature
    "Quran" = @(
        "QuranReader.tsx", "QuranReaderFooter.tsx", "QuranReaderHeader.tsx",
        "QuranReaderTraditionalContent.tsx", "QuranReaderTraditionalHeader.tsx",
        "QuranSearchControls.tsx", "QuranStats.tsx", "QuranSurahGrid.tsx",
        "QuranTranslationComparison.tsx", "QuranVerseContextExplorer.tsx",
        "QuranVerseDisplay.tsx", "QuranVerseMoodMatcher.tsx", "QuranWordSearch.tsx",
        "SurahGrid.tsx", "SurahList.tsx", "VerseShareCard.tsx", "QuranicVerseOfDay.tsx",
        "QuranicWordLearning.tsx", "QuranLoadingStates.tsx", "QuranMemorizationTracker.tsx",
        "ReadingMode.tsx", "ReadingProgressTracker.tsx", "ReadingProgressVisualization.tsx",
        "ReadingSessionTimer.tsx", "ReadingStreakCounter.tsx", "TafsirComparisonTool.tsx",
        "BookmarkManager.tsx", "SmartQuranCompanion.tsx", "SmartReadingAnalytics.tsx",
        "AIQuranStudyCompanion.tsx", "EnhancedQuranReader.tsx", "EnhancedQuranSearch.tsx",
        "EnhancedVisualQuranReader.tsx", "AdvancedQuranSearch.tsx"
    )
    
    # Prayer Feature
    "Prayer" = @(
        "PrayerTimesWidget.tsx", "PrayerTimeTracker.tsx", "PrayerNotifications.tsx",
        "PersonalizedPrayerNotifications.tsx", "SmartSalahReminder.tsx",
        "SmartPrayerWeatherIntegration.tsx", "SmartQiblaCompassAR.tsx", "QiblaCompass.tsx",
        "IslamicPrayerTracker.tsx", "IntelligentPrayerAnalytics.tsx",
        "WeatherPrayerBanner.tsx", "WeatherGif.tsx", "CommunityPrayerRequests.tsx",
        "CommunityPrayerRequestsSystem.tsx", "CommunityPrayerTimeSync.tsx",
        "IslamicPrayerTimeAlerts.tsx", "IslamicWeatherWidget.tsx"
    )
    
    # Hadith Feature
    "Hadith" = @(
        "HadithSection.tsx", "HadithLoadingState.tsx", "HadithSearchEngine.tsx",
        "HadithSearchFilters.tsx", "HadithSearchResults.tsx", "SmartHadithAuthenticityChecker.tsx"
    )
    
    # Athkar Feature
    "Athkar" = @(
        "AthkarCard.tsx", "AthkarCollectionBrowser.tsx", "AthkarCounter.tsx",
        "AthkarFilters.tsx", "AthkarList.tsx", "TasbihCounter.tsx", "DhikrCounter.tsx",
        "DuasSection.tsx", "MorningEveningAdhkar.tsx", "AIPersonalizedDhikr.tsx"
    )
    
    # Calendar Feature
    "Calendar" = @(
        "IslamicCalendar.tsx", "IslamicCalendarEvents.tsx", "HijriCalendarWidget.tsx",
        "HijriDateConverter.tsx", "IslamicDateEventsTracker.tsx", "IslamicEventCountdown.tsx"
    )
    
    # Learning Feature
    "Learning" = @(
        "AIIslamicCalendar.tsx", "AIIslamicChatbot.tsx", "AIIslamicDreamAnalysis.tsx",
        "AIIslamicLearningAssistant.tsx", "AIIslamicLifeCoach.tsx", "AIIslamicNewsInsights.tsx",
        "AIIslamicScholarChat.tsx", "AISpiritualAdvisor.tsx", "AIPersonalizedLearningPath.tsx",
        "SmartIslamicGoalSetter.tsx", "SmartIslamicLearningAssistant.tsx", "SmartLearningDashboard.tsx",
        "SmartLearningPathSuggestions.tsx", "SmartContentDiscovery.tsx", "SmartDailyRecommendations.tsx",
        "SmartBookmarksCollections.tsx", "SmartPersonalizationDashboard.tsx", "SmartNotificationCenter.tsx",
        "SmartNotificationDashboard.tsx", "SmartNotificationSystem.tsx", "IslamicKnowledgeQuiz.tsx",
        "IslamicLearningPath.tsx", "AudioFirstLearningMode.tsx", "AdvancedCommunityLearningDashboard.tsx",
        "AdvancedAnalyticsDashboard.tsx", "EnhancedCommunityLearningFeatures.tsx"
    )
    
    # Community Feature
    "Community" = @(
        "VirtualStudyCircle.tsx", "VirtualIslamicStudyGroup.tsx", "VirtualMosqueFinder.tsx",
        "VirtualHajjPreparation.tsx", "CommunityChallenge.tsx", "CommunityEngagementHub.tsx",
        "CommunityMentorshipSystem.tsx", "EnhancedVirtualStudyCircle.tsx"
    )
    
    # Tracking Feature
    "Tracking" = @(
        "HabitTracker.tsx", "IntelligentHabitTracker.tsx", "IslamicHabitBuilder.tsx",
        "IslamicHabitVisualization.tsx", "SpiritualHabitStreaks.tsx", "ProgressAnalytics.tsx",
        "DailyProgress.tsx", "IslamicMilestoneTracker.tsx", "IslamicGoalsTracker.tsx",
        "ReadingProgressTracker.tsx", "ReadingProgressVisualization.tsx", "ReadingStreakCounter.tsx",
        "ReadingSessionTimer.tsx", "QuranMemorizationTracker.tsx", "PerformanceDashboard.tsx",
        "PersonalDashboard.tsx", "EnhancedDashboard.tsx", "SmartReadingAnalytics.tsx"
    )
    
    # Shared Components
    "Shared" = @(
        "ModernCard.tsx", "EnhancedModernCard.tsx", "ErrorBoundary.tsx", "ApiErrorBoundary.tsx",
        "EnhancedLoadingStates.tsx", "QuranLoadingStates.tsx", "HadithLoadingState.tsx",
        "IslamicLoadingStates.tsx", "FloatingActionButton.tsx", "FloatingActionMenu.tsx",
        "FloatingHelpSystem.tsx", "FloatingQuickAccess.tsx", "FloatingQuickActions.tsx",
        "EnhancedFloatingActions.tsx", "EnhancedFloatingActionsSystem.tsx", "EnhancedFloatingActionSystem.tsx",
        "EnhancedFloatingSystem.tsx", "UnifiedFloatingActions.tsx", "OfflineIndicator.tsx",
        "AccessibilityEnhancements.tsx", "SupportUsAdButton.tsx", "LazyWrapper.tsx",
        "EnhancedOnboarding.tsx", "NewUserWelcome.tsx", "EnhancedSearchExperience.tsx",
        "EnhancedTypographyControls.tsx", "EnhancedContextMenu.tsx", "UniversalSearch.tsx",
        "VoiceControlButton.tsx", "VoiceControls.tsx", "VoiceReadingMode.tsx",
        "KeyboardShortcutsManager.tsx", "MicroInteractionFeedback.tsx", "CustomizableHomeWidgets.tsx"
    )
    
    # Layout Components
    "Layout" = @(
        "MainHeader.tsx", "ModernHeader.tsx", "BottomTabBar.tsx", "TabNavigation.tsx",
        "TabContent.tsx", "ContentDiscovery.tsx"
    )
}

# Move components to their respective feature folders
foreach ($feature in $componentMappings.Keys) {
    $destination = switch ($feature) {
        "Quran" { "src/features/quran/components" }
        "Prayer" { "src/features/prayer/components" }
        "Hadith" { "src/features/hadith/components" }
        "Athkar" { "src/features/athkar/components" }
        "Calendar" { "src/features/calendar/components" }
        "Learning" { "src/features/learning/components" }
        "Community" { "src/features/community/components" }
        "Tracking" { "src/features/tracking/components" }
        "Shared" { "src/shared/components" }
        "Layout" { "src/layout" }
    }
    
    foreach ($component in $componentMappings[$feature]) {
        $sourcePath = "src/components/$component"
        if (Test-Path $sourcePath) {
            Move-Item $sourcePath $destination -Force
            Write-Host "Moved $component to $destination" -ForegroundColor Green
        } else {
            Write-Host "Component not found: $component" -ForegroundColor Red
        }
    }
}

# Move hooks
$hookMappings = @{
    "Quran" = @("useQuranData.ts", "useSurahContent.ts", "useOfflineQuran.ts", "useTafsir.ts")
    "Shared" = @("use-mobile.tsx", "useOfflineStatus.ts", "useCopyToClipboard.ts", "usePerformanceOptimizations.ts", "useHijriDate.ts")
}

foreach ($feature in $hookMappings.Keys) {
    $destination = switch ($feature) {
        "Quran" { "src/features/quran/hooks" }
        "Shared" { "src/shared/hooks" }
    }
    
    foreach ($hook in $hookMappings[$feature]) {
        $sourcePath = "src/hooks/$hook"
        if (Test-Path $sourcePath) {
            Move-Item $sourcePath $destination -Force
            Write-Host "Moved hook $hook to $destination" -ForegroundColor Green
        }
    }
}

# Move services
$serviceMappings = @{
    "Quran" = @("quranApi.ts", "quranService.ts", "offlineQuranStorage.ts", "quranWordSearchService.ts", "tafsirService.ts", "enhancedQuranService.ts")
    "Prayer" = @("prayerTimesApi.ts", "prayerTimesService.ts", "prayerTimesCacheService.ts", "prayerNotificationService.ts", "locationService.ts", "enhancedPrayerTimesService.ts")
    "Hadith" = @("hadithApi.ts", "hadithService.ts", "hadithSearchService.ts", "hadithApiClient.ts", "hadithDataProcessor.ts", "enhancedHadithService.ts")
    "Athkar" = @("athkarService.ts", "enhancedAthkarService.ts")
    "Calendar" = @("islamicCalendarService.ts")
    "Learning" = @("aiPersonalizationEngine.ts", "smartLearningService.ts", "advancedLearningAnalytics.ts")
    "Community" = @("voiceGuidedPrayerService.ts", "voiceNavigationService.ts", "voiceReadingService.ts")
    "Tracking" = @("performanceMonitoring.ts")
    "Shared" = @("inputValidation.ts", "apiErrorHandler.ts", "userDataUtils.ts")
}

foreach ($feature in $serviceMappings.Keys) {
    $destination = switch ($feature) {
        "Quran" { "src/features/quran/services" }
        "Prayer" { "src/features/prayer/services" }
        "Hadith" { "src/features/hadith/services" }
        "Athkar" { "src/features/athkar/services" }
        "Calendar" { "src/features/calendar/services" }
        "Learning" { "src/features/learning/services" }
        "Community" { "src/features/community/services" }
        "Tracking" { "src/features/tracking/services" }
        "Shared" { "src/shared/utils" }
    }
    
    foreach ($service in $serviceMappings[$feature]) {
        $sourcePath = "src/services/$service"
        if (Test-Path $sourcePath) {
            Move-Item $sourcePath $destination -Force
            Write-Host "Moved service $service to $destination" -ForegroundColor Green
        }
    }
}

# Move data files
Move-Item "src/data/authenticAthkarData.ts" "src/features/athkar/data/" -Force
Move-Item "src/data/hadithData.ts" "src/features/hadith/types/" -Force

# Move types
Move-Item "src/types/hadith.ts" "src/features/hadith/types/" -Force
Move-Item "src/types/speechRecognition.ts" "src/shared/types/" -Force

# Move UI components (keep as-is)
Write-Host "Keeping UI components in src/components/ui/" -ForegroundColor Yellow

# Create index.ts files for barrel exports
$features = @("quran", "prayer", "hadith", "athkar", "calendar", "learning", "community", "tracking", "shared", "layout")

foreach ($feature in $features) {
    $indexPath = "src/features/$feature/index.ts"
    if (Test-Path "src/features/$feature") {
        New-Item -ItemType File -Path $indexPath -Force | Out-Null
        Write-Host "Created index.ts for $feature" -ForegroundColor Yellow
    }
}

Write-Host "Component reorganization completed!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Update import statements in all files" -ForegroundColor Cyan
Write-Host "2. Create barrel exports in index.ts files" -ForegroundColor Cyan
Write-Host "3. Test the application" -ForegroundColor Cyan
