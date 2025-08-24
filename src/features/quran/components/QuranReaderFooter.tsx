
import React from 'react';

interface QuranReaderFooterProps {
  arabicSurah: {
    number: number;
    englishName: string;
  };
}

const QuranReaderFooter: React.FC<QuranReaderFooterProps> = ({
  arabicSurah
}) => {
  return (
    <div className="text-center py-4 border-t-4 border-teal-400 dark:border-teal-600 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-b-lg">
      <p className="text-white text-sm">
        صدق الله العظيم • {arabicSurah.englishName} • Page {arabicSurah.number}
      </p>
    </div>
  );
};

export default QuranReaderFooter;
