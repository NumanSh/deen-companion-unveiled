export const resetUserDataForNewUser = () => {
  // Clear all user progress data
  const keysToRemove = [
    'daily-challenges-progress',
    'islamic-achievements',
    'islamic-milestones',
    'qada-counter',
    'prayer-history',
    'prayer-streak',
    'reading-streak-data',
    'dhikr-count',
    'lifetime-stats',
    'personal-dashboard-stats'
  ];

  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
  });

  // Clear daily tasks for all dates
  const allKeys = Object.keys(localStorage);
  allKeys.forEach(key => {
    if (key.startsWith('dailyTasks_') || 
        key.startsWith('dailyGoals_') || 
        key.startsWith('prayers-')) {
      localStorage.removeItem(key);
    }
  });

  console.log('User data reset for new user experience');
};

export const resetAllCounters = () => {
  // Reset all counter-related data
  const counterKeys = [
    'dhikr-settings',
    'dhikr-count',
    'reading-streak-data',
    'readingStreakData',
    'spiritual-mood-history',
    'sadaqah-entries',
    'sadaqah-monthly-goal',
    'athkar-progress',
    'tasbih-counter',
    'prayer-streak',
    'prayer-history',
    'spiritual-habits-streaks'
  ];

  counterKeys.forEach(key => {
    localStorage.removeItem(key);
  });

  // Clear all daily tasks and goals
  const allKeys = Object.keys(localStorage);
  allKeys.forEach(key => {
    if (key.startsWith('dailyTasks_') || 
        key.startsWith('dailyGoals_') || 
        key.startsWith('prayers-') ||
        key.includes('counter') ||
        key.includes('streak') ||
        key.includes('progress')) {
      localStorage.removeItem(key);
    }
  });

  console.log('All counters have been reset');
  
  // Reload the page to reflect changes
  window.location.reload();
};

export const initializeNewUserData = () => {
  // Set initial data for new users
  const initialChallenges = {
    currentLevel: 1,
    completedChallenges: [],
    streak: 0,
    lastCompletionDate: null
  };

  const initialAchievements = {
    unlockedAchievements: [],
    totalPoints: 0,
    currentLevel: 'Beginner'
  };

  const initialMilestones = {
    completedMilestones: [],
    currentPhase: 'foundation',
    totalProgress: 0
  };

  localStorage.setItem('daily-challenges-progress', JSON.stringify(initialChallenges));
  localStorage.setItem('islamic-achievements', JSON.stringify(initialAchievements));
  localStorage.setItem('islamic-milestones', JSON.stringify(initialMilestones));
  localStorage.setItem('qada-counter', JSON.stringify({
    fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0
  }));
  localStorage.setItem('prayer-streak', '0');
  localStorage.setItem('dhikr-count', JSON.stringify({ total: 0, today: 0 }));

  console.log('New user data initialized');
};

export const isNewUser = () => {
  // Check if user has any existing progress
  const hasProgress = localStorage.getItem('daily-challenges-progress') ||
                     localStorage.getItem('islamic-achievements') ||
                     localStorage.getItem('islamic-milestones') ||
                     localStorage.getItem('prayer-history');
  
  return !hasProgress;
};
