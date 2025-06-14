
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Brain, User, Bot, Send, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  type: 'user' | 'scholar';
  content: string;
  timestamp: Date;
  scholar?: string;
  reference?: string;
}

const AIIslamicScholarChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedScholar, setSelectedScholar] = useState('Ibn Taymiyyah');
  const { toast } = useToast();

  const scholars = [
    'Ibn Taymiyyah',
    'Imam Al-Nawawi',
    'Ibn Kathir',
    'Imam Malik',
    'Imam Al-Shafi\'i',
    'Ibn Hazm',
    'Al-Ghazali'
  ];

  const generateScholarResponse = async (question: string) => {
    setIsLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const responses = [
      {
        content: `According to the Quran and Sunnah, ${question.toLowerCase()} requires careful consideration. The Prophet ﷺ said: "Whoever is asked about knowledge and conceals it, will be bridled with fire on the Day of Judgment." Therefore, I must provide you with accurate guidance based on authentic sources.`,
        reference: 'Sunan Abu Dawud 3658'
      },
      {
        content: `In Islamic jurisprudence, this matter falls under the principles of Maqasid al-Shariah. The scholars have established that ${question.toLowerCase()} should be approached with wisdom and following the methodology of the righteous predecessors (Salaf).`,
        reference: 'Al-Muwafaqat by Al-Shatibi'
      },
      {
        content: `The correct understanding of this issue requires returning to the Quran and authentic Sunnah. As Allah says: "And We sent down to you the message that you may make clear to the people what was sent down to them." The scholars have consensus on the importance of following authentic guidance.`,
        reference: 'Quran 16:44'
      }
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];
    
    const newMessage: Message = {
      id: Date.now(),
      type: 'scholar',
      content: response.content,
      timestamp: new Date(),
      scholar: selectedScholar,
      reference: response.reference
    };

    setMessages(prev => [...prev, newMessage]);
    setIsLoading(false);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const question = input;
    setInput('');

    await generateScholarResponse(question);

    toast({
      title: "Scholar Response",
      description: `${selectedScholar} has provided guidance on your question.`,
    });
  };

  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border-emerald-200 dark:border-emerald-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <MessageCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <Brain className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
          </div>
          <span className="bg-gradient-to-r from-emerald-700 to-teal-700 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
            AI Islamic Scholar Chat
          </span>
        </CardTitle>
        <p className="text-sm text-emerald-700 dark:text-emerald-300">
          Ask questions and receive guidance from classical Islamic scholars powered by AI
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Scholar Selection */}
        <div>
          <label className="text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-2 block">
            Select Scholar:
          </label>
          <div className="flex flex-wrap gap-2">
            {scholars.map((scholar) => (
              <Button
                key={scholar}
                variant={selectedScholar === scholar ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedScholar(scholar)}
                className={selectedScholar === scholar ? "bg-emerald-600 hover:bg-emerald-700" : "border-emerald-200"}
              >
                {scholar}
              </Button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="h-64 w-full border border-emerald-200 dark:border-emerald-700 rounded-lg p-4 bg-white/50 dark:bg-gray-800/50">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Ask a question to begin your scholarly consultation</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-emerald-100 dark:bg-emerald-900' 
                      : 'bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-700'
                  }`}>
                    <div className="flex items-start gap-2 mb-2">
                      {message.type === 'user' ? (
                        <User className="w-4 h-4 text-emerald-600 mt-1" />
                      ) : (
                        <Bot className="w-4 h-4 text-emerald-600 mt-1" />
                      )}
                      <div className="flex-1">
                        {message.type === 'scholar' && (
                          <Badge className="bg-emerald-100 text-emerald-800 mb-1">
                            {message.scholar}
                          </Badge>
                        )}
                        <p className="text-sm text-gray-800 dark:text-gray-200">{message.content}</p>
                        {message.reference && (
                          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
                            Reference: {message.reference}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-700 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-emerald-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            placeholder="Ask about Islamic jurisprudence, theology, or spiritual guidance..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="border-emerald-200 dark:border-emerald-700"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="bg-emerald-100 dark:bg-emerald-900/50 p-3 rounded-lg">
          <p className="text-xs text-emerald-700 dark:text-emerald-300">
            <strong>Disclaimer:</strong> This AI provides educational guidance based on classical Islamic texts. 
            Always consult qualified scholars for important religious matters.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIIslamicScholarChat;
