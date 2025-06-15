
import React from 'react';

interface VerseDisplayProps {
  verse: string;
  translation: string;
  surah: string;
  ayah: number;
  theme: string;
}

const VerseDisplay: React.FC<VerseDisplayProps> = ({
  verse,
  translation,
  surah,
  ayah,
  theme
}) => {
  return (
    <>
      {/* Theme Badge */}
      <div className="inline-block">
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
          {theme}
        </span>
      </div>

      {/* Arabic Verse */}
      <div 
        className="text-xl font-arabic text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg"
        dir="rtl"
        style={{ fontFamily: 'Amiri, Arabic Typesetting, serif' }}
      >
        {verse}
      </div>

      {/* Translation */}
      <div className="text-center italic text-gray-700 dark:text-gray-300 border-l-4 border-blue-300 pl-4">
        "{translation}"
      </div>

      {/* Reference */}
      <div className="text-center text-sm text-blue-600 dark:text-blue-400 font-medium">
        Surah {surah}, Ayah {ayah}
      </div>
    </>
  );
};

export default VerseDisplay;
