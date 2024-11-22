import React from 'react';
import { ChevronDown } from 'lucide-react';
import { RadialShape, RadialSize } from '../types';

interface RadialControlsProps {
  shape: RadialShape;
  size: RadialSize;
  onShapeChange: (shape: RadialShape) => void;
  onSizeChange: (size: RadialSize) => void;
}

const RadialControls: React.FC<RadialControlsProps> = ({
  shape,
  size,
  onShapeChange,
  onSizeChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Shape
        </label>
        <div className="relative">
          <select
            value={shape}
            onChange={(e) => onShapeChange(e.target.value as RadialShape)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          >
            <option value="circle">Circle</option>
            <option value="ellipse">Ellipse</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Size
        </label>
        <div className="relative">
          <select
            value={size}
            onChange={(e) => onSizeChange(e.target.value as RadialSize)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          >
            <option value="farthest-corner">Farthest Corner</option>
            <option value="farthest-side">Farthest Side</option>
            <option value="closest-corner">Closest Corner</option>
            <option value="closest-side">Closest Side</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default RadialControls;