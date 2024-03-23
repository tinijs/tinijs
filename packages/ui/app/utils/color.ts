import * as chroma from 'chroma-js';

type RGB = [number, number, number];
type RGBA = [number, number, number, number];

export function rgbaToRGB(rgba: RGBA, rgb?: RGB) {
  const result: RGB = [0, 0, 0];
  // default
  rgb = rgb || ([255, 255, 255] as RGB);
  rgba[3] = rgba[3] || 1;
  // calculate
  result[0] = (1 - rgba[3]) * rgb[0] + rgba[3] * rgba[0];
  result[1] = (1 - rgba[3]) * rgb[1] + rgba[3] * rgba[1];
  result[2] = (1 - rgba[3]) * rgb[2] + rgba[3] * rgba[2];
  // validate
  result[0] = result[0] > 255 ? 255 : result[0];
  result[1] = result[1] > 255 ? 255 : result[1];
  result[2] = result[2] > 255 ? 255 : result[2];
  // result
  return chroma.rgb(result[0], result[1], result[2]);
}

export function buildColorVariants(baseColor: string) {
  const color = chroma(baseColor);
  const base = color.hex();
  const subtle = color.alpha(0.2).hex();
  const contrast = color.luminance() > 0.5 ? '#000000' : '#ffffff';
  const shade = color.darken(0.75).hex();
  const tint = color.brighten(0.75).hex();
  return {
    base,
    subtle,
    contrast,
    shade,
    tint,
  };
}
