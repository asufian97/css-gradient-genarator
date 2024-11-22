export type GradientType = 'linear' | 'radial';
export type RadialShape = 'circle' | 'ellipse';
export type RadialSize = 'closest-side' | 'closest-corner' | 'farthest-side' | 'farthest-corner';

export interface ColorStopType {
  color: string;
  position: number;
  opacity: number;
}