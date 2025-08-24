
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calculator, DollarSign, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const IslamicFinanceCalculator = () => {
  const [zakatData, setZakatData] = useState({
    cash: '',
    gold: '',
    silver: '',
    investments: '',
    businessAssets: ''
  });
  
  const [zakatResult, setZakatResult] = useState<number | null>(null);
  const [murabaha, setMurabaha] = useState({
    cost: '',
    markup: '',
    months: ''
  });
  const [murabahaResult, setMurabahaResult] = useState<unknown>(null);

  const calculateZakat = () => {
    const total = Object.values(zakatData)
      .reduce((sum, value) => sum + (parseFloat(value) || 0), 0);
    
    const nisab = 85 * 4.87; // Approximate nisab in USD (85g gold × current price)
    
    if (total >= nisab) {
      const zakatAmount = total * 0.025; // 2.5%
      setZakatResult(zakatAmount);
    } else {
      setZakatResult(0);
    }
  };

  const calculateMurabaha = () => {
    const cost = parseFloat(murabaha.cost) || 0;
    const markupPercent = parseFloat(murabaha.markup) || 0;
    const months = parseInt(murabaha.months) || 1;
    
    const totalAmount = cost + (cost * markupPercent / 100);
    const monthlyPayment = totalAmount / months;
    
    setMurabahaResult({
      totalAmount,
      monthlyPayment,
      totalMarkup: totalAmount - cost
    });
  };

  const islamicInvestmentOptions = [
    {
      name: 'Sukuk (Islamic Bonds)',
      description: 'Asset-backed securities compliant with Sharia',
      riskLevel: 'Low',
      returns: '3-6%'
    },
    {
      name: 'Islamic Mutual Funds',
      description: 'Diversified portfolios of Sharia-compliant stocks',
      riskLevel: 'Medium',
      returns: '6-12%'
    },
    {
      name: 'Real Estate Investment',
      description: 'Property investments avoiding interest-based financing',
      riskLevel: 'Medium-High',
      returns: '8-15%'
    },
    {
      name: 'Islamic Commodities',
      description: 'Gold, silver, and other Sharia-compliant commodities',
      riskLevel: 'High',
      returns: 'Variable'
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border-emerald-200 dark:border-emerald-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <Calculator className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <DollarSign className="w-3 h-3 text-teal-500 absolute -top-1 -right-1" />
          </div>
          <span className="bg-gradient-to-r from-emerald-700 to-teal-700 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
            Islamic Finance Calculator
          </span>
        </CardTitle>
        <p className="text-sm text-emerald-700 dark:text-emerald-300">
          Halal financial calculations and Islamic investment guidance
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="zakat" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="zakat">Zakat Calculator</TabsTrigger>
            <TabsTrigger value="financing">Islamic Financing</TabsTrigger>
            <TabsTrigger value="investments">Halal Investments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="zakat" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Cash & Bank Savings ($)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={zakatData.cash}
                    onChange={(e) => setZakatData(prev => ({ ...prev, cash: e.target.value }))}
                    className="border-emerald-200 dark:border-emerald-700"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Gold Value ($)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={zakatData.gold}
                    onChange={(e) => setZakatData(prev => ({ ...prev, gold: e.target.value }))}
                    className="border-emerald-200 dark:border-emerald-700"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Silver Value ($)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={zakatData.silver}
                    onChange={(e) => setZakatData(prev => ({ ...prev, silver: e.target.value }))}
                    className="border-emerald-200 dark:border-emerald-700"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Investments ($)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={zakatData.investments}
                    onChange={(e) => setZakatData(prev => ({ ...prev, investments: e.target.value }))}
                    className="border-emerald-200 dark:border-emerald-700"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Business Assets ($)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={zakatData.businessAssets}
                    onChange={(e) => setZakatData(prev => ({ ...prev, businessAssets: e.target.value }))}
                    className="border-emerald-200 dark:border-emerald-700"
                  />
                </div>
                
                <Button onClick={calculateZakat} className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Calculate Zakat
                </Button>
              </div>
              
              {zakatResult !== null && (
                <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Zakat Calculation
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Wealth:</span>
                      <span className="font-medium">
                        ${Object.values(zakatData).reduce((sum, value) => sum + (parseFloat(value) || 0), 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Nisab Threshold:</span>
                      <span className="text-gray-600">~$413.75</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Zakat Due:</span>
                        <span className="text-emerald-600 dark:text-emerald-400">
                          ${zakatResult.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    {zakatResult === 0 && (
                      <p className="text-xs text-gray-500 mt-2">
                        Your wealth is below the nisab threshold. No zakat is due.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="financing" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Murabaha Calculator</h4>
                <div>
                  <label className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Asset Cost ($)</label>
                  <Input
                    type="number"
                    placeholder="10000"
                    value={murabaha.cost}
                    onChange={(e) => setMurabaha(prev => ({ ...prev, cost: e.target.value }))}
                    className="border-emerald-200 dark:border-emerald-700"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Markup (%)</label>
                  <Input
                    type="number"
                    placeholder="10"
                    value={murabaha.markup}
                    onChange={(e) => setMurabaha(prev => ({ ...prev, markup: e.target.value }))}
                    className="border-emerald-200 dark:border-emerald-700"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Payment Period (Months)</label>
                  <Input
                    type="number"
                    placeholder="12"
                    value={murabaha.months}
                    onChange={(e) => setMurabaha(prev => ({ ...prev, months: e.target.value }))}
                    className="border-emerald-200 dark:border-emerald-700"
                  />
                </div>
                
                <Button onClick={calculateMurabaha} className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Calculate Payment
                </Button>
              </div>
              
              {murabahaResult && (
                <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3">Payment Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Amount:</span>
                      <span className="font-medium">${murabahaResult.totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Payment:</span>
                      <span className="font-medium">${murabahaResult.monthlyPayment.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Markup:</span>
                      <span className="font-medium">${murabahaResult.totalMarkup.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-emerald-100 dark:bg-emerald-900 rounded text-xs text-emerald-700 dark:text-emerald-300">
                    This is a Sharia-compliant cost-plus financing structure.
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="investments" className="space-y-4">
            <div className="grid gap-4">
              {islamicInvestmentOptions.map((option, index) => (
                <div key={index} className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">{option.name}</h4>
                    <div className="flex gap-2">
                      <Badge 
                        variant={option.riskLevel === 'Low' ? 'default' : option.riskLevel === 'Medium' ? 'secondary' : 'destructive'}
                      >
                        {option.riskLevel} Risk
                      </Badge>
                      <Badge variant="outline" className="text-teal-600 border-teal-300">
                        {option.returns}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{option.description}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-1">Important Reminder</h4>
                  <p className="text-amber-600 dark:text-amber-400 text-sm">
                    Always consult with qualified Islamic finance scholars and certified financial advisors before making investment decisions. Ensure all investments comply with Sharia principles.
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

export default IslamicFinanceCalculator;
