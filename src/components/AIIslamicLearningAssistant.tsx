
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  BookOpen, 
  Brain, 
  Lightbulb, 
  Send,
  Bot,
  User,
  Star,
  Heart
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  category?: 'quran' | 'hadith' | 'fiqh' | 'general';
}

const AIIslamicLearningAssistant = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'السلام عليكم! أنا مساعدك الذكي للتعلم الإسلامي. يمكنني مساعدتك في فهم القرآن، الأحاديث، الفقه، والعلوم الإسلامية. ما هو سؤالك؟',
      timestamp: new Date(),
      category: 'general'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    { text: 'ما معنى هذه الآية؟', category: 'quran' },
    { text: 'اشرح لي هذا الحديث', category: 'hadith' },
    { text: 'ما حكم الصيام في السفر؟', category: 'fiqh' },
    { text: 'كيف أحسن خشوعي في الصلاة؟', category: 'general' }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: getAIResponse(inputMessage),
        timestamp: new Date(),
        category: detectCategory(inputMessage)
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      toast({
        title: 'إجابة جديدة',
        description: 'تم توليد إجابة من المساعد الذكي',
      });
    }, 2000);
  };

  const getAIResponse = (question: string): string => {
    const responses = [
      'هذا سؤال ممتاز! بناءً على فهم علماء الإسلام المعتبرين، يمكنني أن أشرح لك أن...',
      'جزاك الله خيراً على هذا السؤال المهم. وفقاً للمصادر الإسلامية الموثقة...',
      'بارك الله فيك! هذا موضوع يحتاج إلى تفصيل دقيق. من خلال دراسة النصوص الشرعية...',
      'سؤال رائع! دعني أوضح لك هذا الأمر بالتفصيل استناداً إلى القرآن والسنة...'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const detectCategory = (text: string): 'quran' | 'hadith' | 'fiqh' | 'general' => {
    if (text.includes('آية') || text.includes('قرآن')) return 'quran';
    if (text.includes('حديث') || text.includes('سنة')) return 'hadith';
    if (text.includes('حكم') || text.includes('فقه')) return 'fiqh';
    return 'general';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'quran': return 'bg-green-100 text-green-800';
      case 'hadith': return 'bg-blue-100 text-blue-800';
      case 'fiqh': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-indigo-600" />
          المساعد الذكي للتعلم الإسلامي
          <Badge className="bg-indigo-100 text-indigo-800">
            <Bot className="w-3 h-3 mr-1" />
            AI مدعوم بـ
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Chat Messages */}
        <ScrollArea className="h-64 w-full border rounded-lg p-4 bg-white/50">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.type === 'assistant' && (
                      <Bot className="w-4 h-4 text-indigo-600 mt-1 flex-shrink-0" />
                    )}
                    {message.type === 'user' && (
                      <User className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.content}</p>
                      {message.category && (
                        <Badge className={`mt-2 text-xs ${getCategoryColor(message.category)}`}>
                          {message.category}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-indigo-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Questions */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">أسئلة سريعة:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickQuestions.map((q, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInputMessage(q.text)}
                className="text-xs text-right justify-start"
              >
                <Lightbulb className="w-3 h-3 mr-1" />
                {q.text}
              </Button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="اكتب سؤالك هنا..."
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{messages.length} رسالة</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>دقة عالية</span>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Heart className="w-4 h-4 mr-1" />
            تقييم المساعد
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIIslamicLearningAssistant;
