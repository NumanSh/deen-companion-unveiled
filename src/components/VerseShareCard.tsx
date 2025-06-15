
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Copy, Download, X } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useToast } from '@/hooks/use-toast';

interface VerseShareCardProps {
  verse: {
    text: string;
    number: number;
    surahName: string;
    surahNumber: number;
    translation?: string;
  };
  onClose: () => void;
}

const VerseShareCard: React.FC<VerseShareCardProps> = ({ verse, onClose }) => {
  const { copyToClipboard } = useCopyToClipboard();
  const { toast } = useToast();

  const shareText = `${verse.text}

"${verse.translation || 'Quran verse'}"

— سورة ${verse.surahName}، الآية ${verse.number}
— Surah ${verse.surahName}, Verse ${verse.number}

#Quran #Islam #Verse`;

  const handleCopy = () => {
    copyToClipboard(shareText, 'Verse copied to clipboard!');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Quran - Surah ${verse.surahName}`,
          text: shareText
        });
      } catch (error) {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const handleDownload = () => {
    // Create a beautiful image card (this would typically use canvas or a service)
    toast({
      title: 'Feature Coming Soon',
      description: 'Image download will be available in the next update',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-emerald-800">Share Verse</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Preview Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-emerald-100 mb-6">
            {/* Decorative Islamic Pattern */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 text-emerald-600">
                <div className="w-8 h-0.5 bg-emerald-300"></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <div className="w-8 h-0.5 bg-emerald-300"></div>
              </div>
            </div>

            {/* Arabic Text */}
            <div
              className="text-right mb-4 text-gray-800 leading-loose"
              style={{ 
                fontSize: '18px',
                fontFamily: 'Amiri, Scheherazade New, Arabic Typesetting, serif',
                lineHeight: '1.8'
              }}
              dir="rtl"
            >
              {verse.text}
            </div>

            {/* Translation */}
            {verse.translation && (
              <div className="text-gray-600 italic text-sm mb-4 leading-relaxed">
                "{verse.translation}"
              </div>
            )}

            {/* Reference */}
            <div className="text-center border-t border-emerald-100 pt-4">
              <div className="text-emerald-700 font-semibold text-sm" dir="rtl">
                سورة {verse.surahName}، الآية {verse.number}
              </div>
              <div className="text-emerald-600 text-xs">
                Surah {verse.surahName}, Verse {verse.number}
              </div>
            </div>

            {/* App Attribution */}
            <div className="text-center mt-3 text-xs text-gray-400">
              Islamic Library App
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <Button
              onClick={handleShare}
              className="bg-blue-500 hover:bg-blue-600 text-white"
              size="sm"
            >
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
            >
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
            <Button
              onClick={handleDownload}
              variant="outline"
              size="sm"
            >
              <Download className="w-4 h-4 mr-1" />
              Image
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerseShareCard;
