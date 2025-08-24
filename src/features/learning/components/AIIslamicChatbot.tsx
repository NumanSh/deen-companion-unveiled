
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  Send, 
  Bot,
  User,
  BookOpen,
  Star,
  Lightbulb,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  category?: string;
}

const AIIslamicChatbot = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: 'السلام عليكم! أنا مساعدك الذكي للأسئلة الإسلامية. كيف يمكنني مساعدتك اليوم؟',
      timestamp: new Date(),
      category: 'greeting'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    { text: 'ما هي أركان الإسلام؟', category: 'basics' },
    { text: 'كيف أتوضأ بطريقة صحيحة؟', category: 'worship' },
    { text: 'ما هو حكم الزكاة؟', category: 'fiqh' },
    { text: 'أدعية من القرآن والسنة', category: 'duas' }
  ];

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateResponse(message),
        timestamp: new Date(),
        category: 'response'
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateResponse = (question: string): string => {
    const responses = {
      'أركان الإسلام': 'أركان الإسلام خمسة: 1) شهادة أن لا إله إلا الله وأن محمداً رسول الله 2) إقام الصلاة 3) إيتاء الزكاة 4) صوم رمضان 5) حج البيت لمن استطاع إليه سبيلا',
      'الوضوء': 'الوضوء له فرائض وسنن. الفرائض: النية، وغسل الوجه، وغسل اليدين إلى المرفقين، ومسح الرأس، وغسل الرجلين إلى الكعبين، والترتيب، والموالاة.',
      'الزكاة': 'الزكاة ركن من أركان الإسلام، وهي حق مالي يجب على من ملك نصاباً وحال عليه الحول. مقدارها 2.5% في الذهب والفضة والنقود.',
      'default': 'شكراً لسؤالك. هذا موضوع مهم في الإسلام. أنصحك بمراجعة العلماء المختصين للحصول على إجابة مفصلة ودقيقة.'
    };

    for (const [key, value] of Object.entries(responses)) {
      if (question.includes(key)) {
        return value;
      }
    }
    return responses.default;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">المساعد الإسلامي الذكي</h2>
                <p className="text-emerald-200">اسأل عن أي موضوع إسلامي</p>
              </div>
            </div>
            <Badge className="bg-white text-emerald-600">متاح 24/7</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            أسئلة سريعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 text-right justify-start"
                onClick={() => handleSendMessage(question.text)}
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>{question.text}</span>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            المحادثة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-96 p-4 border rounded-lg">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.type === 'bot' && <Bot className="w-4 h-4 mt-1 flex-shrink-0" />}
                      <div className="flex-1">
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      {message.type === 'user' && <User className="w-4 h-4 mt-1 flex-shrink-0" />}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
              placeholder="اكتب سؤالك هنا..."
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button 
              onClick={() => handleSendMessage(inputMessage)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIIslamicChatbot;
