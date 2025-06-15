
import React from 'react';

interface ReflectionContentProps {
  reflection: string;
  date: string;
}

const ReflectionContent: React.FC<ReflectionContentProps> = ({
  reflection,
  date
}) => {
  return (
    <>
      {/* Reflection */}
      <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Reflection:</h4>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {reflection}
        </p>
      </div>

      {/* Date */}
      <div className="text-center text-xs text-gray-500 dark:text-gray-400">
        {date}
      </div>
    </>
  );
};

export default ReflectionContent;
