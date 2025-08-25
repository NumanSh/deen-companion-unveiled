import { lazy } from 'react';

export const LazyAdvancedQuranSearch = lazy(() => import('./AdvancedQuranSearch'));
export const LazyIslamicBookLibrary = lazy(() => import('@/features/learning/components/IslamicBookLibrary'));
export const LazyAIQuranStudyCompanion = lazy(() => import('./AIQuranStudyCompanion'));
export const LazyAIHadithCompanion = lazy(() => import('@/features/hadith/components/AIHadithCompanion'));
export const LazyAIIslamicScholarChat = lazy(() => import('@/features/learning/components/AIIslamicScholarChat'));
export const LazyAIPersonalizedLearningPath = lazy(() => import('@/features/learning/components/AIPersonalizedLearningPath'));
export const LazyVirtualStudyCircle = lazy(() => import('@/features/community/components/VirtualStudyCircle'));
export const LazyAdvancedReadingAnalyticsDashboard = lazy(() => import('@/features/tracking/components/AdvancedReadingAnalyticsDashboard'));
export const LazySmartLearningDashboard = lazy(() => import('@/features/learning/components/AdvancedAnalyticsDashboard'));
export const LazyAdvancedCommunityLearningDashboard = lazy(() => import('@/features/learning/components/AdvancedCommunityLearningDashboard'));