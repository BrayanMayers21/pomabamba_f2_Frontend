import React from 'react';

// Tipos para los props
interface NumberedListProps {
  items: string[];
  color?: string;
  startIndex?: number;
}

// Simulando el componente NumberedList con el diseño real
const NumberedList: React.FC<NumberedListProps> = ({ items, color = 'bg-green-600', startIndex = 0 }) => {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className={`w-6 h-6 flex items-center justify-center ${color} text-white text-sm rounded-full`}>
              {startIndex + index + 1}
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg text-justify">{item}</p>
        </div>
      ))}
    </div>
  );
};

export default NumberedList;
