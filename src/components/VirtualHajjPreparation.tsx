
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MapPin, CheckCircle, Clock, Users, Plane, Heart } from 'lucide-react';

const VirtualHajjPreparation = () => {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const preparationSteps = [
    { id: 'niyyah', title: 'Make Sincere Niyyah', category: 'spiritual', completed: false },
    { id: 'documents', title: 'Prepare Travel Documents', category: 'logistics', completed: false },
    { id: 'vaccinations', title: 'Get Required Vaccinations', category: 'health', completed: false },
    { id: 'duas', title: 'Learn Essential Duas', category: 'spiritual', completed: false },
    { id: 'ihram', title: 'Understand Ihram Rules', category: 'ritual', completed: false },
    { id: 'tawaf', title: 'Learn Tawaf Procedure', category: 'ritual', completed: false },
    { id: 'financial', title: 'Arrange Halal Finances', category: 'logistics', completed: false },
    { id: 'repentance', title: 'Seek Forgiveness (Tawbah)', category: 'spiritual', completed: false },
  ];

  const hajjRituals = [
    { name: 'Ihram', description: 'Enter state of consecration', day: 'Day 1' },
    { name: 'Tawaf al-Qudum', description: 'Arrival circumambulation', day: 'Day 1' },
    { name: 'Mina', description: 'Stay in Mina', day: 'Day 2' },
    { name: 'Arafat', description: 'Standing at Arafat', day: 'Day 3' },
    { name: 'Muzdalifah', description: 'Night in Muzdalifah', day: 'Day 3-4' },
    { name: 'Jamarat', description: 'Stone the pillars', day: 'Day 4-6' },
    { name: 'Tawaf al-Ifadah', description: 'Pilgrimage circumambulation', day: 'Day 4' },
    { name: 'Sa\'i', description: 'Walk between Safa and Marwa', day: 'Day 4' },
  ];

  const toggleStep = (stepId: string) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const progress = (completedSteps.size / preparationSteps.length) * 100;

  return (
    <Card className="bg-gradient-to-br from-green-50 to-amber-50 dark:from-green-950 dark:to-amber-950 border-green-200 dark:border-green-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <MapPin className="w-6 h-6 text-green-600 dark:text-green-400" />
            <Heart className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
          </div>
          <span className="bg-gradient-to-r from-green-700 to-amber-700 dark:from-green-400 dark:to-amber-400 bg-clip-text text-transparent">
            Virtual Hajj Preparation
          </span>
        </CardTitle>
        <p className="text-sm text-green-700 dark:text-green-300">
          Complete pilgrimage preparation guide and ritual planner
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preparation" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preparation">Preparation</TabsTrigger>
            <TabsTrigger value="rituals">Rituals</TabsTrigger>
            <TabsTrigger value="duas">Essential Duas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preparation" className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-green-700 dark:text-green-300">Preparation Progress</span>
                <span className="text-green-600 dark:text-green-400 font-medium">
                  {completedSteps.size}/{preparationSteps.length} completed
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-3">
              {preparationSteps.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                    completedSteps.has(step.id)
                      ? 'bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700'
                      : 'bg-white/70 dark:bg-gray-800/70 border-gray-200 dark:border-gray-700 hover:border-green-300'
                  }`}
                  onClick={() => toggleStep(step.id)}
                >
                  <CheckCircle 
                    className={`w-5 h-5 ${
                      completedSteps.has(step.id) 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-gray-400'
                    }`} 
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">{step.title}</h4>
                  </div>
                  <Badge variant={completedSteps.has(step.id) ? "default" : "secondary"}>
                    {step.category}
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rituals" className="space-y-4">
            <div className="grid gap-3">
              {hajjRituals.map((ritual, index) => (
                <div key={index} className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-green-200 dark:border-green-700">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">{ritual.name}</h4>
                    <Badge variant="outline" className="text-amber-600 border-amber-300">
                      {ritual.day}
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{ritual.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="duas" className="space-y-4">
            <div className="space-y-4">
              <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-green-200 dark:border-green-700">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Talbiyah</h4>
                <div className="space-y-2">
                  <p className="text-2xl font-arabic text-right text-green-800 dark:text-green-200">
                    لَبَّيْكَ اللَّهُمَّ لَبَّيْك
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Labbayk Allahumma labbayk...
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    "Here I am, O Allah, here I am..."
                  </p>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-green-200 dark:border-green-700">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Dua at Arafat</h4>
                <div className="space-y-2">
                  <p className="text-xl font-arabic text-right text-green-800 dark:text-green-200">
                    رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Rabbana atina fi'd-dunya hasanatan wa fi'l-akhirati hasanatan wa qina 'adhab an-nar
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    "Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire."
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VirtualHajjPreparation;
