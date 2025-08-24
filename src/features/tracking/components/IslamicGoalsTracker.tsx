
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Target, Plus, Calendar, Star, Trophy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IslamicGoal {
  id: string;
  title: string;
  description: string;
  category: 'worship' | 'knowledge' | 'character' | 'community';
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  createdAt: string;
}

const IslamicGoalsTracker = () => {
  const { toast } = useToast();
  
  const [goals, setGoals] = useState<IslamicGoal[]>([
    {
      id: '1',
      title: 'ختم القرآن الكريم',
      description: 'قراءة القرآن الكريم كاملاً',
      category: 'worship',
      targetValue: 30,
      currentValue: 18,
      unit: 'جزء',
      deadline: '2024-12-31',
      priority: 'high',
      completed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'حفظ 10 أحاديث نبوية',
      description: 'حفظ وفهم أحاديث من صحيح البخاري',
      category: 'knowledge',
      targetValue: 10,
      currentValue: 6,
      unit: 'حديث',
      deadline: '2024-08-31',
      priority: 'medium',
      completed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      title: 'الصدقة اليومية',
      description: 'التصدق يومياً ولو بالقليل',
      category: 'character',
      targetValue: 365,
      currentValue: 120,
      unit: 'يوم',
      deadline: '2024-12-31',
      priority: 'high',
      completed: false,
      createdAt: new Date().toISOString()
    }
  ]);

  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'worship',
    targetValue: 1,
    unit: '',
    deadline: '',
    priority: 'medium'
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors = {
      worship: 'bg-green-100 text-green-800',
      knowledge: 'bg-blue-100 text-blue-800',
      character: 'bg-purple-100 text-purple-800',
      community: 'bg-orange-100 text-orange-800'
    };
    return colors[category];
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      worship: 'عبادة',
      knowledge: 'علم',
      character: 'أخلاق',
      community: 'مجتمع'
    };
    return labels[category];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'border-red-300 text-red-700',
      medium: 'border-yellow-300 text-yellow-700',
      low: 'border-green-300 text-green-700'
    };
    return colors[priority];
  };

  const addProgress = (goalId: string, increment: number) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const newValue = Math.min(goal.currentValue + increment, goal.targetValue);
        const isCompleted = newValue === goal.targetValue;
        
        if (isCompleted && !goal.completed) {
          toast({
            title: '🎉 تم إنجاز الهدف!',
            description: `مبارك! تم تحقيق هدف "${goal.title}"`,
          });
        }
        
        return { ...goal, currentValue: newValue, completed: isCompleted };
      }
      return goal;
    }));
  };

  const addNewGoal = () => {
    if (newGoal.title && newGoal.unit && newGoal.deadline) {
      const goal: IslamicGoal = {
        id: Date.now().toString(),
        title: newGoal.title,
        description: newGoal.description,
        category: newGoal.category as any,
        targetValue: newGoal.targetValue,
        currentValue: 0,
        unit: newGoal.unit,
        deadline: newGoal.deadline,
        priority: newGoal.priority as any,
        completed: false,
        createdAt: new Date().toISOString()
      };
      
      setGoals(prev => [...prev, goal]);
      setNewGoal({
        title: '',
        description: '',
        category: 'worship',
        targetValue: 1,
        unit: '',
        deadline: '',
        priority: 'medium'
      });
      setShowAddForm(false);
      
      toast({
        title: '✅ تم إضافة الهدف',
        description: 'تم إضافة هدف إسلامي جديد بنجاح',
      });
    }
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const completedGoals = goals.filter(g => g.completed).length;
  const totalGoals = goals.length;
  const overallProgress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-6 h-6 text-blue-500" />
          متتبع الأهداف الإسلامية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Trophy className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-blue-800">{completedGoals}</div>
            <div className="text-xs text-blue-600">أهداف مكتملة</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <Target className="w-6 h-6 text-orange-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-orange-800">{totalGoals - completedGoals}</div>
            <div className="text-xs text-orange-600">أهداف نشطة</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <Star className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-green-800">{Math.round(overallProgress)}%</div>
            <div className="text-xs text-green-600">معدل الإنجاز</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-purple-800">{goals.filter(g => getDaysRemaining(g.deadline) <= 7 && !g.completed).length}</div>
            <div className="text-xs text-purple-600">أهداف عاجلة</div>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">التقدم العام</h4>
          <Progress value={overallProgress} className="h-3 mb-2" />
          <div className="text-sm text-blue-600">
            {completedGoals} من {totalGoals} أهداف مكتملة ({Math.round(overallProgress)}%)
          </div>
        </div>

        {/* Add New Goal Button */}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">أهدافي الإسلامية</h3>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-500 hover:bg-green-600"
          >
            <Plus className="w-4 h-4 mr-1" />
            هدف جديد
          </Button>
        </div>

        {/* Add Goal Form */}
        {showAddForm && (
          <div className="p-4 bg-gray-50 rounded-lg border space-y-3">
            <h4 className="font-semibold">إضافة هدف إسلامي جديد</h4>
            <div className="grid gap-3">
              <Input
                placeholder="عنوان الهدف"
                value={newGoal.title}
                onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
              />
              <Input
                placeholder="وصف الهدف"
                value={newGoal.description}
                onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value }))}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="worship">عبادة</option>
                  <option value="knowledge">علم</option>
                  <option value="character">أخلاق</option>
                  <option value="community">مجتمع</option>
                </select>
                <select
                  value={newGoal.priority}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, priority: e.target.value }))}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="high">عالية</option>
                  <option value="medium">متوسطة</option>
                  <option value="low">منخفضة</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  placeholder="القيمة المستهدفة"
                  value={newGoal.targetValue}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, targetValue: parseInt(e.target.value) || 1 }))}
                />
                <Input
                  placeholder="الوحدة (مثال: صفحة، حديث)"
                  value={newGoal.unit}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, unit: e.target.value }))}
                />
              </div>
              <Input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
              />
              <div className="flex gap-2">
                <Button onClick={addNewGoal} className="bg-green-500 hover:bg-green-600">
                  إضافة الهدف
                </Button>
                <Button onClick={() => setShowAddForm(false)} variant="outline">
                  إلغاء
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Goals List */}
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className={`p-4 border rounded-lg ${goal.completed ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className={`font-semibold ${goal.completed ? 'text-green-800' : 'text-gray-800'} mb-1`}>
                    {goal.title}
                    {goal.completed && <Check className="w-5 h-5 text-green-600 inline ml-2" />}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">{goal.description}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getCategoryColor(goal.category)}>
                      {getCategoryLabel(goal.category)}
                    </Badge>
                    <Badge variant="outline" className={getPriorityColor(goal.priority)}>
                      {goal.priority === 'high' ? 'عالية' : 
                       goal.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                    </Badge>
                    {getDaysRemaining(goal.deadline) <= 7 && !goal.completed && (
                      <Badge className="bg-red-500 text-white">عاجل</Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-800">
                    {goal.currentValue} / {goal.targetValue} {goal.unit}
                  </div>
                  <div className="text-xs text-gray-500">
                    الموعد النهائي: {new Date(goal.deadline).toLocaleDateString('ar-SA')}
                  </div>
                  <div className="text-xs text-gray-500">
                    متبقي: {getDaysRemaining(goal.deadline)} يوم
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Progress value={(goal.currentValue / goal.targetValue) * 100} className="h-3" />
                <div className="flex justify-between text-sm">
                  <span>{Math.round((goal.currentValue / goal.targetValue) * 100)}% مكتمل</span>
                  <span>باقي: {goal.targetValue - goal.currentValue} {goal.unit}</span>
                </div>
              </div>
              
              {!goal.completed && (
                <div className="mt-3 flex gap-2">
                  <Button 
                    onClick={() => addProgress(goal.id, 1)}
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    +1 {goal.unit}
                  </Button>
                  <Button 
                    onClick={() => addProgress(goal.id, 5)}
                    size="sm"
                    variant="outline"
                  >
                    +5 {goal.unit}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {goals.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            لا توجد أهداف إسلامية حالياً. ابدأ بإضافة هدف جديد!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IslamicGoalsTracker;
