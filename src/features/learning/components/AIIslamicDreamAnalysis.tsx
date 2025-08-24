
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Moon, Brain, BookOpen, Star, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DreamAnalysis {
  interpretation: string;
  islamicMeaning: string;
  symbolicElements: string[];
  recommendations: string[];
  quranicReference?: string;
  hadithReference?: string;
  spiritualGuidance: string;
}

const AIIslamicDreamAnalysis = () => {
  const [dreamText, setDreamText] = useState('');
  const [analysis, setAnalysis] = useState<DreamAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const analyzeDream = async () => {
    if (!dreamText.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));

    const mockAnalyses: DreamAnalysis[] = [
      {
        interpretation: 'رؤيا النور والأنوار في المنام تدل على الهداية والاستقامة على دين الله. وقد تكون بشارة بالخير والبركة في الدين والدنيا.',
        islamicMeaning: 'النور في الإسلام رمز للإيمان والتقوى. قال تعالى: "الله نور السماوات والأرض". هذه الرؤيا قد تكون دلالة على قوة الإيمان وزيادة التقوى.',
        symbolicElements: ['النور: الهداية والإيمان', 'الضوء الساطع: البركة والخير', 'الطمأنينة: راحة البال والسكينة'],
        recommendations: [
          'أكثر من الذكر والتسبيح',
          'حافظ على الصلوات في أوقاتها',
          'اقرأ القرآن بتدبر وخشوع',
          'ادع الله أن يزيدك هداية ونوراً'
        ],
        quranicReference: 'قال تعالى: "فَآمِنُوا بِاللَّهِ وَرَسُولِهِ وَالنُّورِ الَّذِي أَنزَلْنَا" (التغابن: 8)',
        hadithReference: 'قال رسول الله ﷺ: "الرؤيا الصالحة من الله والحلم من الشيطان"',
        spiritualGuidance: 'هذه الرؤيا تحمل بشارة خير، فاحمد الله واشكره على نعمه. واستعذ بالله من الشيطان الرجيم واستمر على طاعة الله.'
      },
      {
        interpretation: 'رؤيا الماء الطاهر في المنام تدل على الطهارة والتطهر من الذنوب، وقد تكون دلالة على التوبة النصوح والرجوع إلى الله.',
        islamicMeaning: 'الماء في الإسلام رمز للطهارة والحياة. وقد يدل على التوبة والاستغفار، أو على العلم والحكمة.',
        symbolicElements: ['الماء النظيف: التوبة والطهارة', 'الشرب من الماء: الروي الروحي', 'جريان الماء: استمرار الخير'],
        recommendations: [
          'أكثر من الاستغفار والتوبة',
          'توضأ بخشوع واستحضار نية التطهر',
          'تصدق واعمل الخيرات',
          'اطلب العلم الشرعي'
        ],
        quranicReference: 'قال تعالى: "وَأَنزَلْنَا مِنَ السَّمَاءِ مَاءً طَهُورًا" (الفرقان: 48)',
        spiritualGuidance: 'اشكر الله على هذه البشارة، وابدأ صفحة جديدة مع الله بالتوبة النصوح والعمل الصالح.'
      }
    ];

    const randomAnalysis = mockAnalyses[Math.floor(Math.random() * mockAnalyses.length)];
    setAnalysis(randomAnalysis);
    setIsAnalyzing(false);

    toast({
      title: "تم تحليل الرؤيا",
      description: "تم تفسير رؤياك وفقاً للتراث الإسلامي",
    });
  };

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border-indigo-200 dark:border-indigo-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <Moon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <Brain className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
          </div>
          <span className="bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            تحليل الأحلام الإسلامي بالذكاء الاصطناعي
          </span>
        </CardTitle>
        <p className="text-sm text-indigo-700 dark:text-indigo-300">
          تفسير الرؤى والأحلام وفقاً للقرآن والسنة بمساعدة الذكاء الاصطناعي
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Area */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
            اكتب رؤياك أو حلمك:
          </label>
          <Textarea
            placeholder="صف رؤياك بالتفصيل... مثال: رأيت نوراً ساطعاً يضيء السماء..."
            value={dreamText}
            onChange={(e) => setDreamText(e.target.value)}
            className="min-h-[120px] border-indigo-200 dark:border-indigo-700 text-right"
            dir="rtl"
          />
          <Button 
            onClick={analyzeDream}
            disabled={!dreamText.trim() || isAnalyzing}
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            {isAnalyzing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                جاري تحليل الرؤيا...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                فسر الرؤيا
              </div>
            )}
          </Button>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-4">
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg border border-indigo-200 dark:border-indigo-700">
              {/* Main Interpretation */}
              <div className="bg-indigo-50 dark:bg-indigo-900/50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  التفسير الرئيسي
                </h4>
                <p className="text-indigo-600 dark:text-indigo-400 text-right leading-relaxed">
                  {analysis.interpretation}
                </p>
              </div>

              {/* Islamic Meaning */}
              <div className="bg-green-50 dark:bg-green-900/50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  المعنى الإسلامي
                </h4>
                <p className="text-green-600 dark:text-green-400 text-right leading-relaxed">
                  {analysis.islamicMeaning}
                </p>
              </div>

              {/* Symbolic Elements */}
              <div className="bg-purple-50 dark:bg-purple-900/50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-3">
                  العناصر الرمزية:
                </h4>
                <div className="space-y-2">
                  {analysis.symbolicElements.map((element, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-purple-500">•</span>
                      <span className="text-purple-600 dark:text-purple-400 text-sm text-right">
                        {element}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-amber-50 dark:bg-amber-900/50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-3">
                  التوصيات الروحية:
                </h4>
                <div className="space-y-2">
                  {analysis.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      <span className="text-amber-600 dark:text-amber-400 text-sm text-right">
                        {rec}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Religious References */}
              {(analysis.quranicReference || analysis.hadithReference) && (
                <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">
                    الأدلة الشرعية:
                  </h4>
                  {analysis.quranicReference && (
                    <div className="mb-2">
                      <Badge className="bg-green-100 text-green-800 mb-1">قرآني</Badge>
                      <p className="text-blue-600 dark:text-blue-400 text-sm text-right">
                        {analysis.quranicReference}
                      </p>
                    </div>
                  )}
                  {analysis.hadithReference && (
                    <div>
                      <Badge className="bg-orange-100 text-orange-800 mb-1">حديث</Badge>
                      <p className="text-blue-600 dark:text-blue-400 text-sm text-right">
                        {analysis.hadithReference}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Spiritual Guidance */}
              <div className="bg-rose-50 dark:bg-rose-900/50 p-4 rounded-lg">
                <h4 className="font-semibold text-rose-700 dark:text-rose-300 mb-2">
                  الإرشاد الروحي:
                </h4>
                <p className="text-rose-600 dark:text-rose-400 text-right leading-relaxed text-sm">
                  {analysis.spiritualGuidance}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Important Note */}
        <div className="bg-yellow-50 dark:bg-yellow-900/50 p-4 rounded-lg">
          <h5 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">
            تنبيه مهم:
          </h5>
          <p className="text-yellow-600 dark:text-yellow-400 text-sm text-right">
            هذا التفسير اجتهادي ويستند على التراث الإسلامي في تفسير الرؤى. 
            الرؤيا الصالحة من الله والحلم من الشيطان. استشر أهل العلم للأمور المهمة.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIIslamicDreamAnalysis;
