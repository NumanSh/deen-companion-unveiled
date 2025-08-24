
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { GraduationCap, BookOpen, CheckCircle, Lock, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: string;
  title: string;
  description: string;
  lessons: number;
  completed: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: 'fiqh' | 'aqidah' | 'quran' | 'hadith' | 'seerah';
  unlocked: boolean;
  certificate: boolean;
}

const IslamicLearningPath: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [userProgress, setUserProgress] = useState<Record<string, number>>({});
  const { toast } = useToast();

  const initialCourses: Course[] = [
    {
      id: 'basic-islam',
      title: 'Foundations of Islam',
      description: 'Learn the five pillars and basic concepts of Islam',
      lessons: 12,
      completed: 0,
      level: 'beginner',
      category: 'aqidah',
      unlocked: true,
      certificate: false
    },
    {
      id: 'prayer-guide',
      title: 'Complete Prayer Guide',
      description: 'Master the art of Salah with proper etiquette',
      lessons: 15,
      completed: 0,
      level: 'beginner',
      category: 'fiqh',
      unlocked: true,
      certificate: false
    },
    {
      id: 'quran-basics',
      title: 'Quran Reading Basics',
      description: 'Learn Tajweed and proper Quran recitation',
      lessons: 20,
      completed: 0,
      level: 'intermediate',
      category: 'quran',
      unlocked: false,
      certificate: false
    },
    {
      id: 'prophet-stories',
      title: 'Stories of the Prophets',
      description: 'Journey through the lives of Islamic prophets',
      lessons: 25,
      completed: 0,
      level: 'intermediate',
      category: 'seerah',
      unlocked: false,
      certificate: false
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('learning-progress');
    const progress = saved ? JSON.parse(saved) : {};
    setUserProgress(progress);

    const updatedCourses = initialCourses.map(course => ({
      ...course,
      completed: progress[course.id] || 0,
      unlocked: course.unlocked || (progress[course.id] || 0) > 0
    }));

    setCourses(updatedCourses);
  }, []); // TODO: Add missing dependencies

  const startLesson = (course: Course) => {
    if (!course.unlocked) {
      toast({
        title: "Course Locked",
        description: "Complete previous courses to unlock this one.",
        variant: "destructive",
      });
      return;
    }

    const newProgress = Math.min(course.completed + 1, course.lessons);
    const updated = { ...userProgress, [course.id]: newProgress };
    
    setUserProgress(updated);
    localStorage.setItem('learning-progress', JSON.stringify(updated));

    const updatedCourses = courses.map(c => 
      c.id === course.id 
        ? { ...c, completed: newProgress, certificate: newProgress === c.lessons }
        : c
    );
    setCourses(updatedCourses);

    if (newProgress === course.lessons) {
      toast({
        title: "🎉 Course Completed!",
        description: `Congratulations! You've earned a certificate for ${course.title}`,
      });
    } else {
      toast({
        title: "Lesson Completed",
        description: `Progress: ${newProgress}/${course.lessons} lessons`,
      });
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      fiqh: 'blue',
      aqidah: 'green',
      quran: 'purple',
      hadith: 'orange',
      seerah: 'red'
    };
    return colors[category as keyof typeof colors] || 'gray';
  };

  const getLevelBadge = (level: string) => {
    const badges = {
      beginner: { color: 'bg-green-100 text-green-800', label: 'Beginner' },
      intermediate: { color: 'bg-yellow-100 text-yellow-800', label: 'Intermediate' },
      advanced: { color: 'bg-red-100 text-red-800', label: 'Advanced' }
    };
    return badges[level as keyof typeof badges] || badges.beginner;
  };

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-indigo-600" />
          Islamic Learning Path
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Overview */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-2xl font-bold text-indigo-600">
              {Object.values(userProgress).reduce((a, b) => a + b, 0)}
            </div>
            <div className="text-sm text-gray-600">Lessons Completed</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-2xl font-bold text-indigo-600">
              {courses.filter(c => c.certificate).length}
            </div>
            <div className="text-sm text-gray-600">Certificates Earned</div>
          </div>
        </div>

        {/* Course List */}
        <div className="space-y-4">
          {courses.map((course) => {
            const progress = (course.completed / course.lessons) * 100;
            const levelBadge = getLevelBadge(course.level);
            const categoryColor = getCategoryColor(course.category);

            return (
              <div
                key={course.id}
                className={`p-4 rounded-lg border transition-all ${
                  course.unlocked
                    ? 'bg-white dark:bg-gray-800 hover:border-indigo-300 cursor-pointer'
                    : 'bg-gray-100 dark:bg-gray-700 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{course.title}</h3>
                      {course.certificate && (
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      )}
                      {!course.unlocked && (
                        <Lock className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${levelBadge.color}`}>
                        {levelBadge.label}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs bg-${categoryColor}-100 text-${categoryColor}-800`}>
                        {course.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{course.completed} / {course.lessons} lessons</span>
                    <span>{progress.toFixed(0)}% complete</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="flex justify-between items-center mt-3">
                  <div className="text-sm text-gray-500">
                    {course.lessons} lessons • {course.category}
                  </div>
                  <Button
                    onClick={() => startLesson(course)}
                    disabled={!course.unlocked}
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    {course.completed === 0 ? 'Start Course' : 'Continue'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicLearningPath;
