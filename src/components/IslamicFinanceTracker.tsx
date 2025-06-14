
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { DollarSign, TrendingUp, PiggyBank, Heart, Calculator, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface FinancialGoal {
  id: string;
  type: 'zakat' | 'hajj' | 'sadaqah' | 'investment';
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  priority: 'high' | 'medium' | 'low';
}

interface Transaction {
  id: string;
  type: 'income' | 'zakat' | 'sadaqah' | 'halal_investment' | 'expense';
  amount: number;
  description: string;
  date: string;
  category: string;
}

const IslamicFinanceTracker = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [financialGoals, setFinancialGoals] = useState<FinancialGoal[]>([
    {
      id: '1',
      type: 'zakat',
      title: 'زكاة المال السنوية',
      targetAmount: 5000,
      currentAmount: 3500,
      deadline: '2024-12-31',
      priority: 'high'
    },
    {
      id: '2',
      type: 'hajj',
      title: 'ادخار للحج',
      targetAmount: 25000,
      currentAmount: 8500,
      deadline: '2026-06-01',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'sadaqah',
      title: 'صدقة شهرية',
      targetAmount: 1000,
      currentAmount: 750,
      deadline: '2024-07-31',
      priority: 'high'
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'income',
      amount: 15000,
      description: 'راتب شهري',
      date: new Date().toISOString(),
      category: 'salary'
    },
    {
      id: '2',
      type: 'zakat',
      amount: 500,
      description: 'زكاة الفطر',
      date: new Date(Date.now() - 86400000).toISOString(),
      category: 'religious'
    },
    {
      id: '3',
      type: 'sadaqah',
      amount: 250,
      description: 'صدقة للفقراء',
      date: new Date(Date.now() - 172800000).toISOString(),
      category: 'charity'
    }
  ]);

  const [zakatCalculation, setZakatCalculation] = useState({
    totalWealth: 50000,
    goldValue: 10000,
    silverValue: 5000,
    cashSavings: 35000,
    zakatDue: 1250,
    nisabThreshold: 4375
  });

  const [newTransaction, setNewTransaction] = useState({
    type: 'income',
    amount: '',
    description: '',
    category: ''
  });

  const calculateZakat = () => {
    const { totalWealth, nisabThreshold } = zakatCalculation;
    if (totalWealth >= nisabThreshold) {
      const zakatAmount = totalWealth * 0.025; // 2.5%
      setZakatCalculation(prev => ({ ...prev, zakatDue: zakatAmount }));
      
      toast({
        title: '💰 تم حساب الزكاة',
        description: `زكاتك المستحقة: ${zakatAmount.toFixed(2)} ريال`,
      });
    } else {
      toast({
        title: 'ℹ️ لا توجد زكاة مستحقة',
        description: 'مالك أقل من النصاب المطلوب',
      });
    }
  };

  const addTransaction = () => {
    if (newTransaction.amount && newTransaction.description) {
      const transaction: Transaction = {
        id: Date.now().toString(),
        type: newTransaction.type as any,
        amount: parseFloat(newTransaction.amount),
        description: newTransaction.description,
        date: new Date().toISOString(),
        category: newTransaction.category || 'general'
      };
      
      setTransactions(prev => [transaction, ...prev]);
      setNewTransaction({ type: 'income', amount: '', description: '', category: '' });
      
      toast({
        title: '✅ تم إضافة المعاملة',
        description: 'تم تسجيل المعاملة المالية بنجاح',
      });
    }
  };

  const addToGoal = (goalId: string, amount: number) => {
    setFinancialGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const newAmount = Math.min(goal.currentAmount + amount, goal.targetAmount);
        if (newAmount === goal.targetAmount) {
          toast({
            title: '🎉 تم تحقيق الهدف!',
            description: `مبارك! تم الوصول لهدف ${goal.title}`,
          });
        }
        return { ...goal, currentAmount: newAmount };
      }
      return goal;
    }));
  };

  const getGoalTypeColor = (type: string) => {
    const colors = {
      zakat: 'bg-green-100 text-green-800',
      hajj: 'bg-purple-100 text-purple-800',
      sadaqah: 'bg-blue-100 text-blue-800',
      investment: 'bg-orange-100 text-orange-800'
    };
    return colors[type];
  };

  const getTransactionTypeColor = (type: string) => {
    const colors = {
      income: 'text-green-600',
      zakat: 'text-purple-600',
      sadaqah: 'text-blue-600',
      halal_investment: 'text-orange-600',
      expense: 'text-red-600'
    };
    return colors[type];
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalZakat = transactions.filter(t => t.type === 'zakat').reduce((sum, t) => sum + t.amount, 0);
  const totalSadaqah = transactions.filter(t => t.type === 'sadaqah').reduce((sum, t) => sum + t.amount, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-green-500" />
          متتبع المال الإسلامي
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Financial Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-green-800">{totalIncome.toLocaleString()}</div>
            <div className="text-xs text-green-600">إجمالي الدخل</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <Calculator className="w-6 h-6 text-purple-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-purple-800">{totalZakat.toLocaleString()}</div>
            <div className="text-xs text-purple-600">زكاة مدفوعة</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Heart className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-blue-800">{totalSadaqah.toLocaleString()}</div>
            <div className="text-xs text-blue-600">صدقات</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <PiggyBank className="w-6 h-6 text-orange-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-orange-800">{zakatCalculation.zakatDue.toLocaleString()}</div>
            <div className="text-xs text-orange-600">زكاة مستحقة</div>
          </div>
        </div>

        {/* Zakat Calculator */}
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            حاسبة الزكاة
          </h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-green-700">إجمالي المال</label>
              <Input
                type="number"
                value={zakatCalculation.totalWealth}
                onChange={(e) => setZakatCalculation(prev => ({ 
                  ...prev, 
                  totalWealth: parseFloat(e.target.value) || 0 
                }))}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-green-700">النصاب</label>
              <Input
                type="number"
                value={zakatCalculation.nisabThreshold}
                disabled
                className="mt-1 bg-gray-100"
              />
            </div>
          </div>
          <Button onClick={calculateZakat} className="bg-green-500 hover:bg-green-600 w-full">
            احسب الزكاة المستحقة
          </Button>
          {zakatCalculation.totalWealth >= zakatCalculation.nisabThreshold && (
            <div className="mt-3 p-3 bg-green-100 rounded border">
              <p className="text-green-800 font-semibold">
                الزكاة المستحقة: {zakatCalculation.zakatDue.toFixed(2)} ريال (2.5%)
              </p>
            </div>
          )}
        </div>

        {/* Financial Goals */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">الأهداف المالية الإسلامية</h3>
          {financialGoals.map((goal) => (
            <div key={goal.id} className="p-4 border rounded-lg bg-white">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">{goal.title}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getGoalTypeColor(goal.type)}>
                      {goal.type === 'zakat' ? 'زكاة' : 
                       goal.type === 'hajj' ? 'حج' :
                       goal.type === 'sadaqah' ? 'صدقة' : 'استثمار'}
                    </Badge>
                    <Badge variant="outline" className={
                      goal.priority === 'high' ? 'border-red-300 text-red-700' :
                      goal.priority === 'medium' ? 'border-yellow-300 text-yellow-700' :
                      'border-gray-300 text-gray-700'
                    }>
                      {goal.priority === 'high' ? 'عالي' : 
                       goal.priority === 'medium' ? 'متوسط' : 'منخفض'}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-800">
                    {goal.currentAmount.toLocaleString()} / {goal.targetAmount.toLocaleString()} ريال
                  </div>
                  {goal.deadline && (
                    <div className="text-xs text-gray-500">
                      الموعد النهائي: {new Date(goal.deadline).toLocaleDateString('ar-SA')}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Progress value={(goal.currentAmount / goal.targetAmount) * 100} className="h-3" />
                <div className="flex justify-between text-sm">
                  <span>{Math.round((goal.currentAmount / goal.targetAmount) * 100)}% مكتمل</span>
                  <span>باقي: {(goal.targetAmount - goal.currentAmount).toLocaleString()} ريال</span>
                </div>
              </div>
              
              <div className="mt-3 flex gap-2">
                <Button 
                  onClick={() => addToGoal(goal.id, 100)}
                  size="sm"
                  variant="outline"
                >
                  إضافة 100 ريال
                </Button>
                <Button 
                  onClick={() => addToGoal(goal.id, 500)}
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  إضافة 500 ريال
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Transaction */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-3">إضافة معاملة مالية</h4>
          <div className="grid gap-3">
            <select 
              value={newTransaction.type}
              onChange={(e) => setNewTransaction(prev => ({ ...prev, type: e.target.value }))}
              className="px-3 py-2 border rounded-md"
            >
              <option value="income">دخل</option>
              <option value="zakat">زكاة</option>
              <option value="sadaqah">صدقة</option>
              <option value="halal_investment">استثمار حلال</option>
              <option value="expense">مصروف</option>
            </select>
            <Input
              type="number"
              placeholder="المبلغ"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: e.target.value }))}
            />
            <Input
              placeholder="الوصف"
              value={newTransaction.description}
              onChange={(e) => setNewTransaction(prev => ({ ...prev, description: e.target.value }))}
            />
            <Button onClick={addTransaction} className="bg-green-500 hover:bg-green-600">
              إضافة معاملة
            </Button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="space-y-3">
          <h4 className="font-semibold">المعاملات الأخيرة</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-white rounded border">
                <div>
                  <div className="font-medium text-gray-800">{transaction.description}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(transaction.date).toLocaleDateString('ar-SA')}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${getTransactionTypeColor(transaction.type)}`}>
                    {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString()} ريال
                  </div>
                  <div className="text-xs text-gray-500 capitalize">
                    {transaction.type === 'income' ? 'دخل' :
                     transaction.type === 'zakat' ? 'زكاة' :
                     transaction.type === 'sadaqah' ? 'صدقة' :
                     transaction.type === 'halal_investment' ? 'استثمار' : 'مصروف'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Islamic Finance Tips */}
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            نصائح للمال الحلال
          </h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• تجنب الربا في جميع المعاملات المالية</li>
            <li>• ادفع زكاتك بانتظام إذا بلغ مالك النصاب</li>
            <li>• استثمر في المشاريع الحلال فقط</li>
            <li>• تصدق من مالك ولو بالقليل</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicFinanceTracker;
