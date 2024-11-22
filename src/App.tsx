import React, { useState } from 'react';
import { Copy, RotateCcw, ChevronDown } from 'lucide-react';
import GradientPreview from './components/GradientPreview';
import ColorStop from './components/ColorStop';
import AngleSelector from './components/AngleSelector';
import RadialControls from './components/RadialControls';
import Newsletter from './components/Newsletter';
import { GradientType, ColorStopType, RadialShape, RadialSize } from './types';

function App() {
  const [gradientType, setGradientType] = useState<GradientType>('linear');
  const [angle, setAngle] = useState(90);
  const [radialShape, setRadialShape] = useState<RadialShape>('circle');
  const [radialSize, setRadialSize] = useState<RadialSize>('farthest-corner');
  const [colorStops, setColorStops] = useState<ColorStopType[]>([
    { color: '#FF6B6B', position: 0, opacity: 100 },
    { color: '#4ECDC4', position: 100, opacity: 100 }
  ]);
  const [copied, setCopied] = useState(false);

  const generateGradientCSS = () => {
    const stops = colorStops
      .map(stop => {
        const rgba = hexToRGBA(stop.color, stop.opacity / 100);
        return `${rgba} ${stop.position}%`;
      })
      .join(', ');
    
    return gradientType === 'linear'
      ? `background: linear-gradient(${angle}deg, ${stops});`
      : `background: radial-gradient(${radialShape} ${radialSize}, ${stops});`;
  };

  const hexToRGBA = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateGradientCSS());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setGradientType('linear');
    setAngle(90);
    setRadialShape('circle');
    setRadialSize('farthest-corner');
    setColorStops([
      { color: '#FF6B6B', position: 0, opacity: 100 },
      { color: '#4ECDC4', position: 100, opacity: 100 }
    ]);
  };

  const addColorStop = () => {
    if (colorStops.length < 5) {
      const newPosition = 50;
      const newColor = '#' + Math.floor(Math.random()*16777215).toString(16);
      setColorStops([...colorStops, { color: newColor, position: newPosition, opacity: 100 }]);
    }
  };

  const updateColorStop = (index: number, color: string, position: number, opacity: number) => {
    const newStops = [...colorStops];
    newStops[index] = { color, position, opacity };
    setColorStops(newStops);
  };

  const removeColorStop = (index: number) => {
    if (colorStops.length > 2) {
      setColorStops(colorStops.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">CSS Gradient Generator</h1>
          <p className="text-gray-600">Create beautiful gradients for your projects</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <GradientPreview
            gradientCSS={generateGradientCSS()}
            className="h-48 rounded-lg mb-6"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gradient Type
                </label>
                <div className="relative">
                  <select
                    value={gradientType}
                    onChange={(e) => setGradientType(e.target.value as GradientType)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                  >
                    <option value="linear">Linear</option>
                    <option value="radial">Radial</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {gradientType === 'linear' ? (
                <AngleSelector angle={angle} onChange={setAngle} />
              ) : (
                <RadialControls
                  shape={radialShape}
                  size={radialSize}
                  onShapeChange={setRadialShape}
                  onSizeChange={setRadialSize}
                />
              )}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Color Stops
                </label>
                {colorStops.length < 5 && (
                  <button
                    onClick={addColorStop}
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    Add Color Stop
                  </button>
                )}
              </div>
              
              <div className="space-y-3">
                {colorStops.map((stop, index) => (
                  <ColorStop
                    key={index}
                    color={stop.color}
                    position={stop.position}
                    opacity={stop.opacity}
                    onChange={(color, position, opacity) => updateColorStop(index, color, position, opacity)}
                    onRemove={() => removeColorStop(index)}
                    showRemove={colorStops.length > 2}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t">
            <div className="flex space-x-4">
              <button
                onClick={handleCopy}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? 'Copied!' : 'Copy CSS'}
              </button>
              <button
                onClick={handleReset}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </button>
            </div>
            <div className="text-sm text-gray-500">
              {colorStops.length}/5 colors
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Generated CSS</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <code className="text-sm text-gray-800 break-all">
              {generateGradientCSS()}
            </code>
          </div>
        </div>

        <Newsletter />
      </div>
    </div>
  );
}

export default App;