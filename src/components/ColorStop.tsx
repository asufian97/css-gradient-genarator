import React from 'react';
import { X } from 'lucide-react';

interface ColorStopProps {
  color: string;
  position: number;
  opacity: number;
  onChange: (color: string, position: number, opacity: number) => void;
  onRemove: () => void;
  showRemove: boolean;
}

const ColorStop: React.FC<ColorStopProps> = ({
  color,
  position,
  opacity,
  onChange,
  onRemove,
  showRemove
}) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value, position, opacity)}
          className="w-12 h-8 p-0 border border-gray-300 rounded cursor-pointer"
        />
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={position}
            onChange={(e) => onChange(color, Math.min(100, Math.max(0, Number(e.target.value))), opacity)}
            min="0"
            max="100"
            className="block w-20 px-3 py-1.5 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          />
          <span className="text-gray-500">%</span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            value={opacity}
            onChange={(e) => onChange(color, position, Number(e.target.value))}
            min="0"
            max="100"
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-gray-500 w-12">{opacity}%</span>
        </div>
      </div>
      {showRemove && (
        <button
          onClick={onRemove}
          className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default ColorStop;