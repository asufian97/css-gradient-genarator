import React from 'react';

interface GradientPreviewProps {
  gradientCSS: string;
  className?: string;
}

const GradientPreview: React.FC<GradientPreviewProps> = ({ gradientCSS, className = '' }) => {
  const style = {
    [gradientCSS.split(':')[0]]: gradientCSS.split(':')[1].trim().slice(0, -1)
  };

  return (
    <div 
      className={`w-full ${className}`}
      style={style}
    />
  );
};

export default GradientPreview;