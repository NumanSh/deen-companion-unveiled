
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { resetAllCounters } from '@/utils/userDataUtils';

const GlobalCounterReset = () => {
  const { toast } = useToast();

  const handleResetAllCounters = () => {
    if (window.confirm('هل أنت متأكد من إعادة تعيين جميع العدادات؟ هذا الإجراء لا يمكن التراجع عنه.')) {
      try {
        resetAllCounters();
        toast({
          title: "تم إعادة التعيين بنجاح",
          description: "تم إعادة تعيين جميع العدادات والإحصائيات",
        });
      } catch (error) {
        toast({
          title: "خطأ في إعادة التعيين",
          description: "حدث خطأ أثناء إعادة تعيين البيانات",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-700">
          <RotateCcw className="w-5 h-5" />
          إعادة تعيين جميع العدادات
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">تحذير:</p>
            <p>سيؤدي هذا الإجراء إلى حذف جميع البيانات التالية:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>عدادات الذكر والتسبيح</li>
              <li>سلاسل القراءة والعبادة</li>
              <li>تتبع الحالة الروحية</li>
              <li>سجل الصدقات</li>
              <li>إحصائيات الصلاة</li>
              <li>جميع الأهداف والتحديات</li>
            </ul>
          </div>
        </div>

        <Button
          onClick={handleResetAllCounters}
          className="w-full bg-red-600 hover:bg-red-700 text-white"
          size="lg"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          إعادة تعيين جميع العدادات
        </Button>

        <p className="text-xs text-gray-500 text-center">
          هذا الإجراء سيؤدي إلى إعادة تحميل التطبيق تلقائياً
        </p>
      </CardContent>
    </Card>
  );
};

export default GlobalCounterReset;
