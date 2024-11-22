import React from 'react';

interface AngleSelectorProps {
  angle: number;
  onChange: (angle: number) => void;
}

const AngleSelector: React.FC<AngleSelectorProps> = ({ angle, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Angle: {angle}°
      </label>
      <input
        type="range"
        min="0"
        max="360"
        value={angle}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>0°</span>
        <span>90°</span>
        <span>180°</span>
        <span>270°</span>
        <span>360°</span>
      </div>
    </div>
  );
};

export default AngleSelector;