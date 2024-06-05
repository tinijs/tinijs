import chroma from 'chroma-js';

export const BLACK_HEX = '#000000';
export const BLACK_HSL = 'hsl(0, 0%, 0%)';
export const WHITE_HEX = '#ffffff';
export const WHITE_HSL = 'hsl(0, 0%, 100%)';

export function colorToHSLString(color: chroma.Color) {
  const hsl = color.hsl();
  const h = Number((isNaN(hsl[0]) ? 0 : hsl[0]).toFixed(2));
  const s = Number((hsl[1] * 100).toFixed(2));
  const l = Number((hsl[2] * 100).toFixed(2));
  const a = Number(((hsl as any)?.[3] || 1).toFixed(2));
  return a === 1 ? `hsl(${h}, ${s}%, ${l}%)` : `hsla(${h}, ${s}%, ${l}%, ${a})`;
}

export function colorToHexString(color: chroma.Color) {
  return color.hex();
}

export function buildColorVariants(baseColor: string) {
  const color = chroma(baseColor);
  const base = colorToHexString(color);
  const dim = colorToHexString(
    color.luminance() > 0.5 ? color.darken(0.25) : color.brighten(0.25)
  );
  const subtle = colorToHexString(color.alpha(0.25));
  const contrast = color.luminance() > 0.5 ? BLACK_HEX : WHITE_HEX;
  return {
    base,
    dim,
    subtle,
    contrast,
  };
}
