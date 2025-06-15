
import React from 'react';

interface QuranReaderTraditionalContentProps {
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
}

const QuranReaderTraditionalContent: React.FC<QuranReaderTraditionalContentProps> = ({
  arabicSurah,
  translationSurah,
  showTranslation
}) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-white rounded-lg shadow-xl border-8 border-teal-300" 
           style={{
             background: 'linear-gradient(135deg, #fefdfb 0%, #f0fdfa 100%)',
             boxShadow: '0 20px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)'
           }}>
        
        {/* Decorative Header */}
        <div className="text-center py-6 border-b-4 border-teal-400" 
             style={{
               background: 'linear-gradient(90deg, #14b8a6 0%, #5eead4 50%, #14b8a6 100%)',
               borderTopLeftRadius: '8px',
               borderTopRightRadius: '8px'
             }}>
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-1" dir="rtl">سُورَةُ {arabicSurah.name}</h2>
            <p className="text-teal-100 text-sm">{arabicSurah.englishNameTranslation}</p>
            <p className="text-teal-200 text-xs mt-1">{arabicSurah.numberOfAyahs} آیات</p>
          </div>
        </div>

        {/* Quran Text - Traditional Continuous Flow */}
        <div className="p-8" dir="rtl">
          <div className="leading-loose text-justify" 
               style={{ 
                 fontFamily: 'Amiri, Scheherazade New, Arabic Typesetting, serif',
                 fontSize: '22px',
                 lineHeight: '2.5',
                 textAlign: 'justify'
               }}>
            
            {/* Continuous Arabic text with verse markers */}
            <p className="text-gray-800">
              {arabicSurah.ayahs.map((ayah, index) => (
                <span key={ayah.numberInSurah} className="inline">
                  {ayah.text}
                  {/* Verse number in decorative circle - traditional style */}
                  <span className="inline-flex items-center justify-center w-7 h-7 mx-2 text-xs font-bold text-white rounded-full border-2 border-teal-600 relative" 
                        style={{ 
                          background: 'radial-gradient(circle, #14b8a6 0%, #0d9488 100%)',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          fontSize: '11px',
                          verticalAlign: 'middle'
                        }}>
                    {ayah.numberInSurah}
                    {/* Decorative dots around number */}
                    <span className="absolute inset-0 rounded-full border border-white opacity-50"></span>
                  </span>
                  {/* Add space between verses */}
                  {index < arabicSurah.ayahs.length - 1 && ' '}
                </span>
              ))}
            </p>
          </div>

          {/* Translation Section */}
          {showTranslation && (
            <div className="mt-8 pt-6 border-t-2 border-teal-200">
              <h3 className="text-lg font-semibold text-teal-800 mb-4 text-center" dir="ltr">
                English Translation
              </h3>
              <div className="space-y-3" dir="ltr">
                {translationSurah.ayahs.map((ayah) => (
                  <p key={ayah.numberInSurah} className="text-gray-700 leading-relaxed">
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-xs font-bold text-white bg-teal-500 rounded-full">
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
        <div className="text-center py-4 border-t-4 border-teal-400" 
             style={{
               background: 'linear-gradient(90deg, #14b8a6 0%, #5eead4 50%, #14b8a6 100%)',
               borderBottomLeftRadius: '8px',
               borderBottomRightRadius: '8px'
             }}>
          <p className="text-white text-sm">
            صدق الله العظيم • {arabicSurah.englishName} • Page {arabicSurah.number}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuranReaderTraditionalContent;
