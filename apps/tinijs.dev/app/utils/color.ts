import chroma from 'chroma-js';

export const LIGHT_HEX = '#f4f5f8';
export const DARK_HEX = '#222428';
export const LIGHT_HSL = 'hsl(225 22.22% 96.47%)';
export const DARK_HSL = 'hsl(220 8.11% 14.51%)';

export function colorToHexCode(color: chroma.Color) {
  return color.hex();
}

export function colorToHSLCode(color: chroma.Color) {
  const hsl = color.hsl();
  const h = Number((isNaN(hsl[0]) ? 0 : hsl[0]).toFixed(2));
  const s = Number((hsl[1] * 100).toFixed(2));
  const l = Number((hsl[2] * 100).toFixed(2));
  const a = Number((((hsl as any)?.[3] || 1) * 100).toFixed(2));
  return `hsl(${h} ${s}% ${l}%${a === 100 ? '' : ` / ${a}%`})`;
}

export function buildColorVariants(baseColor: string) {
  const color = chroma(baseColor);
  const base = colorToHexCode(color);
  const contrast = color.luminance() > 0.5 ? DARK_HEX : LIGHT_HEX;
  return {
    base,
    contrast,
  };
}
