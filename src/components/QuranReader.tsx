
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Copy, Languages, Play, Pause, Heart } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

interface QuranReaderProps {
  arabicSurah: {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    ayahs: Array<{
      number: number;
      text: string;
      numberInSurah: number;
    }>;
  };
  translationSurah: {
    ayahs: Array<{
      number: number;
      text: string;
      numberInSurah: number;
    }>;
  };
  showTranslation: boolean;
  onToggleTranslation: () => void;
  onBack: () => void;
  onAddToBookmarks: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const QuranReader: React.FC<QuranReaderProps> = ({
  arabicSurah,
  translationSurah,
  showTranslation,
  onToggleTranslation,
  onBack,
  onAddToBookmarks,
  isPlaying,
  onTogglePlay
}) => {
  const { copyToClipboard } = useCopyToClipboard();

  const handleCopyFullSurah = () => {
    const fullText = arabicSurah.ayahs.map((ayah, index) => {
      const translation = translationSurah.ayahs[index]?.text;
      return translation ? `${ayah.text}\n${translation}` : ayah.text;
    }).join('\n\n');
    
    copyToClipboard(
      `Surah ${arabicSurah.englishName} (${arabicSurah.englishNameTranslation})\n\n${fullText}`,
      'Full surah copied to clipboard'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-amber-200 p-4 flex items-center justify-between shadow-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Surahs
        </Button>
        
        <div className="text-center">
          <h1 className="text-lg font-bold text-amber-800">سُورَةُ {arabicSurah.name}</h1>
          <p className="text-sm text-amber-600">{arabicSurah.englishNameTranslation}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTranslation}
            className="text-amber-700 hover:text-amber-900"
            title="Toggle translation"
          >
            <Languages className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onTogglePlay}
            className="text-amber-700 hover:text-amber-900"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopyFullSurah}
            className="text-amber-700 hover:text-amber-900"
          >
            <Copy className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onAddToBookmarks}
            className="text-amber-700 hover:text-amber-900"
          >
            <Heart className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Traditional Quran Page Layout */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-xl border-8 border-amber-300" 
             style={{
               background: 'linear-gradient(135deg, #fefdfb 0%, #fcf6e8 100%)',
               boxShadow: '0 20px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)'
             }}>
          
          {/* Decorative Header */}
          <div className="text-center py-6 border-b-4 border-amber-400" 
               style={{
                 background: 'linear-gradient(90deg, #f7931e 0%, #fbb040 50%, #f7931e 100%)',
                 borderTopLeftRadius: '8px',
                 borderTopRightRadius: '8px'
               }}>
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-1" dir="rtl">سُورَةُ {arabicSurah.name}</h2>
              <p className="text-amber-100 text-sm">{arabicSurah.englishNameTranslation}</p>
              <p className="text-amber-200 text-xs mt-1">{arabicSurah.numberOfAyahs} آیات</p>
            </div>
          </div>

          {/* Quran Text - Traditional Continuous Flow */}
          <div className="p-8" dir="rtl">
            <div className="leading-loose text-justify" 
                 style={{ 
                   fontFamily: 'Amiri, Scheherazade New, Arabic Typesetting, serif',
                   fontSize: '20px',
                   lineHeight: '2.2',
                   textAlign: 'justify'
                 }}>
              
              {/* Continuous Arabic text with verse markers */}
              <p className="text-gray-800">
                {arabicSurah.ayahs.map((ayah, index) => (
                  <span key={ayah.numberInSurah} className="inline">
                    {ayah.text}
                    {/* Verse number in circle - traditional style */}
                    <span className="inline-flex items-center justify-center w-8 h-8 mx-2 my-1 text-xs font-bold text-white bg-amber-500 rounded-full border-2 border-amber-600" 
                          style={{ 
                            background: 'radial-gradient(circle, #f7931e 0%, #e67e22 100%)',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                          }}>
                      {ayah.numberInSurah}
                    </span>
                    {index < arabicSurah.ayahs.length - 1 && ' '}
                  </span>
                ))}
              </p>
            </div>

            {/* Translation Section */}
            {showTranslation && (
              <div className="mt-8 pt-6 border-t-2 border-amber-200">
                <h3 className="text-lg font-semibold text-amber-800 mb-4 text-center" dir="ltr">
                  English Translation
                </h3>
                <div className="space-y-3" dir="ltr">
                  {translationSurah.ayahs.map((ayah) => (
                    <p key={ayah.numberInSurah} className="text-gray-700 leading-relaxed">
                      <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-xs font-bold text-white bg-amber-500 rounded-full">
                        {ayah.numberInSurah}
                      </span>
                      {ayah.text}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Decorative Footer */}
          <div className="text-center py-4 border-t-4 border-amber-400" 
               style={{
                 background: 'linear-gradient(90deg, #f7931e 0%, #fbb040 50%, #f7931e 100%)',
                 borderBottomLeftRadius: '8px',
                 borderBottomRightRadius: '8px'
               }}>
            <p className="text-white text-sm">
              صدق الله العظيم • {arabicSurah.englishName} • Page {arabicSurah.number}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuranReader;
