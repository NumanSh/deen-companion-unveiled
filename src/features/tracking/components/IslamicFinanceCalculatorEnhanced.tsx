
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Calculator, 
  DollarSign, 
  PiggyBank, 
  TrendingUp,
  Heart,
  Gift,
  Calendar,
  Target,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const IslamicFinanceCalculatorEnhanced = () => {
  const { toast } = useToast();
  
  // Zakat Calculator State
  const [zakatInputs, setZakatInputs] = useState({
    cash: '',
    gold: '',
    silver: '',
    business: '',
    investments: ''
  });
  const [zakatResult, setZakatResult] = useState(0);

  // Charity Tracker State
  const [charityGoal, setCharityGoal] = useState(1000);
  const [charityGiven, setCharityGiven] = useState(350);
  const [monthlyCharities, setMonthlyCharities] = useState([
    { month: 'يناير', amount: 50, type: 'زكاة' },
    { month: 'فبراير', amount: 75, type: 'صدقة' },
    { month: 'مارس', amount: 100, type: 'زكاة الفطر' },
    { month: 'أبريل', amount: 125, type: 'صدقة' }
  ]);

  // Investment Calculator State
  const [investmentInputs, setInvestmentInputs] = useState({
    principal: '',
    years: '',
    expectedReturn: ''
  });

  const nisabThreshold = 85 * 4.25; // Approximate gold nisab in grams converted to cash

  const calculateZakat = () => {
    const total = Object.values(zakatInputs)
      .reduce((sum, value) => sum + (parseFloat(value) || 0), 0);
    
    if (total >= nisabThreshold) {
      const zakatAmount = total * 0.025;
      setZakatResult(zakatAmount);
      toast({
        title: 'تم حساب الزكاة',
        description: `المبلغ المستحق: ${zakatAmount.toFixed(2)} ريال`,
      });
    } else {
      setZakatResult(0);
      toast({
        title: 'لا تجب الزكاة',
        description: 'المبلغ أقل من النصاب المطلوب',
      });
    }
  };

  const calculateInvestment = () => {
    const principal = parseFloat(investmentInputs.principal) || 0;
    const years = parseFloat(investmentInputs.years) || 0;
    const rate = (parseFloat(investmentInputs.expectedReturn) || 0) / 100;
    
    // Simple compound interest calculation
    const futureValue = principal * Math.pow(1 + rate, years);
    const profit = futureValue - principal;
    
    toast({
      title: 'نتيجة الاستثمار المتوقعة',
      description: `القيمة المستقبلية: ${futureValue.toFixed(2)} ريال`,
    });
  };

  const addCharity = () => {
    const newCharity = {
      month: new Date().toLocaleDateString('ar-SA', { month: 'long' }),
      amount: 50,
      type: 'صدقة'
    };
    setMonthlyCharities(prev => [...prev, newCharity]);
    setCharityGiven(prev => prev + 50);
    
    toast({
      title: 'تم تسجيل الصدقة',
      description: 'بارك الله فيك على هذا العمل الخير',
    });
  };

  const charityProgress = (charityGiven / charityGoal) * 100;

  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-emerald-600" />
          حاسبة الشؤون المالية الإسلامية
          <Badge className="bg-emerald-100 text-emerald-800">
            شاملة
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="zakat" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="zakat" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              حاسبة الزكاة
            </TabsTrigger>
            <TabsTrigger value="charity" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              متتبع الصدقات
            </TabsTrigger>
            <TabsTrigger value="investment" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              حاسبة الاستثمار
            </TabsTrigger>
          </TabsList>

          {/* Zakat Calculator */}
          <TabsContent value="zakat" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">النقد (ريال)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={zakatInputs.cash}
                  onChange={(e) => setZakatInputs(prev => ({ ...prev, cash: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">الذهب (ريال)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={zakatInputs.gold}
                  onChange={(e) => setZakatInputs(prev => ({ ...prev, gold: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">الفضة (ريال)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={zakatInputs.silver}
                  onChange={(e) => setZakatInputs(prev => ({ ...prev, silver: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">التجارة (ريال)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={zakatInputs.business}
                  onChange={(e) => setZakatInputs(prev => ({ ...prev, business: e.target.value }))}
                />
              </div>
            </div>
            
            <Button onClick={calculateZakat} className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Calculator className="w-4 h-4 mr-2" />
              احسب الزكاة
            </Button>

            {zakatResult > 0 && (
              <div className="bg-emerald-100 p-4 rounded-lg text-center">
                <h3 className="font-bold text-emerald-800 mb-2">مبلغ الزكاة المستحق</h3>
                <p className="text-2xl font-bold text-emerald-600">{zakatResult.toFixed(2)} ريال</p>
                <p className="text-sm text-emerald-700 mt-2">
                  نسبة الزكاة: 2.5% من إجمالي المال
                </p>
              </div>
            )}

            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>النصاب:</strong> {nisabThreshold.toFixed(2)} ريال تقريباً
              </p>
            </div>
          </TabsContent>

          {/* Charity Tracker */}
          <TabsContent value="charity" className="space-y-4">
            <div className="bg-gradient-to-r from-rose-100 to-pink-100 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">هدف الصدقات السنوي</h3>
                <span className="text-sm text-gray-600">{charityGiven} / {charityGoal} ريال</span>
              </div>
              <Progress value={charityProgress} className="h-3 mb-2" />
              <p className="text-sm text-gray-600">
                تبقى {charityGoal - charityGiven} ريال لتحقيق الهدف
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">تحديث الهدف السنوي</label>
                <Input
                  type="number"
                  value={charityGoal}
                  onChange={(e) => setCharityGoal(parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={addCharity} className="w-full">
                  <Gift className="w-4 h-4 mr-2" />
                  إضافة صدقة
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">سجل الصدقات الشهرية</h4>
              {monthlyCharities.map((charity, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium">{charity.month}</span>
                    <Badge variant="outline">{charity.type}</Badge>
                  </div>
                  <span className="font-bold text-green-600">{charity.amount} ريال</span>
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 p-3 rounded-lg">
              <p className="text-sm text-yellow-800">
                🌟 <strong>نصيحة:</strong> الصدقة تطفئ غضب الرب وتدفع ميتة السوء
              </p>
            </div>
          </TabsContent>

          {/* Investment Calculator */}
          <TabsContent value="investment" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium">رأس المال الأولي (ريال)</label>
                <Input
                  type="number"
                  placeholder="10000"
                  value={investmentInputs.principal}
                  onChange={(e) => setInvestmentInputs(prev => ({ ...prev, principal: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">المدة (سنوات)</label>
                <Input
                  type="number"
                  placeholder="5"
                  value={investmentInputs.years}
                  onChange={(e) => setInvestmentInputs(prev => ({ ...prev, years: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">العائد المتوقع سنوياً (%)</label>
                <Input
                  type="number"
                  placeholder="7"
                  value={investmentInputs.expectedReturn}
                  onChange={(e) => setInvestmentInputs(prev => ({ ...prev, expectedReturn: e.target.value }))}
                />
              </div>
            </div>

            <Button onClick={calculateInvestment} className="w-full">
              <TrendingUp className="w-4 h-4 mr-2" />
              احسب العائد المتوقع
            </Button>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">مبادئ الاستثمار الإسلامي</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• تجنب الربا والفوائد المحرمة</li>
                <li>• الاستثمار في المشاريع الحلال</li>
                <li>• تجنب الغرر (عدم اليقين المفرط)</li>
                <li>• المشاركة في الربح والخسارة</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                📈 <strong>نصيحة:</strong> استشر خبير مالي إسلامي قبل اتخاذ قرارات استثمارية مهمة
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default IslamicFinanceCalculatorEnhanced;
