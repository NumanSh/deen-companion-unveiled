
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp,
  PiggyBank,
  Coins,
  Building,
  Gem,
  Car,
  Home,
  Briefcase,
  Target,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ZakatableAsset {
  id: string;
  name: string;
  value: number;
  category: 'cash' | 'gold' | 'silver' | 'business' | 'investments' | 'property';
  zakatRate: number;
  isExempt: boolean;
}

const EnhancedZakatCalculator = () => {
  const { toast } = useToast();
  const [nisabThreshold] = useState(4000); // Current Nisab in USD
  const [assets, setAssets] = useState<ZakatableAsset[]>([
    { id: '1', name: 'Cash in Bank', value: 0, category: 'cash', zakatRate: 2.5, isExempt: false },
    { id: '2', name: 'Cash at Home', value: 0, category: 'cash', zakatRate: 2.5, isExempt: false },
    { id: '3', name: 'Gold Jewelry', value: 0, category: 'gold', zakatRate: 2.5, isExempt: false },
    { id: '4', name: 'Silver Items', value: 0, category: 'silver', zakatRate: 2.5, isExempt: false },
    { id: '5', name: 'Business Inventory', value: 0, category: 'business', zakatRate: 2.5, isExempt: false },
    { id: '6', name: 'Stock Investments', value: 0, category: 'investments', zakatRate: 2.5, isExempt: false },
    { id: '7', name: 'Mutual Funds', value: 0, category: 'investments', zakatRate: 2.5, isExempt: false },
    { id: '8', name: 'Rental Property Value', value: 0, category: 'property', zakatRate: 2.5, isExempt: false }
  ]);

  const [debts, setDebts] = useState(0);
  const [personalExpenses, setPersonalExpenses] = useState(0);
  const [zakatDue, setZakatDue] = useState(0);
  const [totalWealth, setTotalWealth] = useState(0);

  const categoryIcons = {
    cash: DollarSign,
    gold: Gem,
    silver: Coins,
    business: Briefcase,
    investments: TrendingUp,
    property: Home
  };

  const categoryColors = {
    cash: 'bg-green-100 text-green-800',
    gold: 'bg-yellow-100 text-yellow-800',
    silver: 'bg-gray-100 text-gray-800',
    business: 'bg-blue-100 text-blue-800',
    investments: 'bg-purple-100 text-purple-800',
    property: 'bg-indigo-100 text-indigo-800'
  };

  useEffect(() => {
    calculateZakat();
  }, [assets, debts, personalExpenses]);

  const calculateZakat = () => {
    const totalAssetValue = assets.reduce((sum, asset) => 
      asset.isExempt ? sum : sum + asset.value, 0
    );
    
    const netWealth = totalAssetValue - debts - personalExpenses;
    setTotalWealth(totalAssetValue);

    if (netWealth >= nisabThreshold) {
      const calculatedZakat = netWealth * 0.025; // 2.5%
      setZakatDue(calculatedZakat);
    } else {
      setZakatDue(0);
    }
  };

  const handleAssetValueChange = (assetId: string, value: number) => {
    setAssets(prev => prev.map(asset => 
      asset.id === assetId ? { ...asset, value } : asset
    ));
  };

  const toggleAssetExemption = (assetId: string) => {
    setAssets(prev => prev.map(asset => 
      asset.id === assetId ? { ...asset, isExempt: !asset.isExempt } : asset
    ));
  };

  const handlePayZakat = () => {
    toast({
      title: 'Zakat Payment Initiated',
      description: `$${zakatDue.toFixed(2)} ready for distribution to eligible recipients`,
      duration: 3000,
    });
  };

  const nisabProgress = (totalWealth / nisabThreshold) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calculator className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Enhanced Zakat Calculator</h2>
                <p className="text-amber-200">Complete Wealth Assessment & Tracking</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">${zakatDue.toFixed(0)}</div>
              <div className="text-amber-200">Zakat Due</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Nisab Threshold Indicator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            Nisab Threshold Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Current Wealth: ${totalWealth.toFixed(2)}</span>
              <span>Nisab: ${nisabThreshold.toFixed(2)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${
                  nisabProgress >= 100 ? 'bg-green-500' : 'bg-amber-500'
                }`}
                style={{ width: `${Math.min(nisabProgress, 100)}%` }}
              />
            </div>
            <div className="flex items-center gap-2 text-sm">
              {nisabProgress >= 100 ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700">Zakat is obligatory - {((nisabProgress - 100)).toFixed(1)}% above Nisab</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-amber-700">Need ${(nisabThreshold - totalWealth).toFixed(2)} more to reach Nisab</span>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assets Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-blue-600" />
            Zakatable Assets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assets.map((asset) => {
              const Icon = categoryIcons[asset.category];
              return (
                <div key={asset.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">{asset.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={categoryColors[asset.category]}>
                        {asset.category}
                      </Badge>
                      <Button
                        variant={asset.isExempt ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleAssetExemption(asset.id)}
                        className="text-xs"
                      >
                        {asset.isExempt ? 'Exempt' : 'Include'}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Value (USD)</Label>
                    <Input
                      type="number"
                      value={asset.value || ''}
                      onChange={(e) => handleAssetValueChange(asset.id, parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="mt-1"
                      disabled={asset.isExempt}
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    Zakat Rate: {asset.zakatRate}% • 
                    {asset.isExempt ? ' Excluded from calculation' : ` Zakat: $${((asset.value * asset.zakatRate) / 100).toFixed(2)}`}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Deductions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Deductions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Outstanding Debts</Label>
              <Input
                type="number"
                value={debts || ''}
                onChange={(e) => setDebts(parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Credit cards, loans, mortgages due within one year
              </p>
            </div>
            <div>
              <Label>Essential Personal Expenses</Label>
              <Input
                type="number"
                value={personalExpenses || ''}
                onChange={(e) => setPersonalExpenses(parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Basic living expenses for one year
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculation Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5 text-purple-600" />
            Zakat Calculation Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Assets:</span>
                  <span className="font-semibold">${totalWealth.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Less: Debts:</span>
                  <span className="text-red-600">-${debts.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Less: Essential Expenses:</span>
                  <span className="text-red-600">-${personalExpenses.toFixed(2)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Net Zakatable Wealth:</span>
                  <span className="font-semibold">${(totalWealth - debts - personalExpenses).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Zakat Rate:</span>
                  <span>2.5%</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-green-600">
                  <span>Zakat Due:</span>
                  <span>${zakatDue.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {zakatDue > 0 && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-green-800">Zakat Payment Due</div>
                    <div className="text-sm text-green-600">
                      Your wealth exceeds Nisab threshold. Zakat payment is obligatory.
                    </div>
                  </div>
                  <Button 
                    onClick={handlePayZakat}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Distribute Zakat
                  </Button>
                </div>
              </div>
            )}

            {zakatDue === 0 && totalWealth > 0 && (
              <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                <div className="font-semibold text-amber-800">No Zakat Due</div>
                <div className="text-sm text-amber-600">
                  Your net wealth is below the Nisab threshold. Zakat is not obligatory at this time.
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Investment Tracking Hint */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <span>
              <strong>Pro Tip:</strong> Update your investment values monthly for accurate Zakat calculations. 
              Include profits from halal investments and exclude unknown haram income sources.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedZakatCalculator;
