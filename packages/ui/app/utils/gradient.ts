import {parse} from 'gradient-parser';
import * as chroma from 'chroma-js';

export function parseGradient(value: string) {
  // parse
  const [gradientNode] = parse(value);
  // process
  const type = ~gradientNode.type.indexOf('radial') ? 'radial' : 'linear';
  let direction = 'bottom';
  let radialDirection = 'center center';
  if (gradientNode.orientation) {
    const orientation = gradientNode.orientation as any;
    if (orientation.type === 'angular') {
      const angle = orientation.value;
      if (angle >= 0 && angle < 45) {
        direction = 'top';
      } else if (angle >= 45 && angle < 135) {
        direction = 'right';
      } else if (angle >= 135 && angle < 225) {
        direction = 'bottom';
      } else if (angle >= 225 && angle < 315) {
        direction = 'left';
      } else {
        direction = 'top';
      }
    } else if (orientation.type === 'directional') {
      direction = orientation.value;
    } else if (orientation[0].type === 'shape') {
      const x = orientation[0].at?.value?.x?.value || 'center';
      const y = orientation[0].at?.value?.y?.value || 'center';
      direction = y;
      radialDirection = `${x} ${y}`;
    }
  }
  const colors = gradientNode.colorStops.map(({type, value, length}) => {
    const color = type === 'hex' ? `#${value}` : value;
    return {color, position: +(length?.value || 0)};
  });
  // result
  return {type, direction, radialDirection, colors};
}

export function constructGradient(
  parsedResult: ReturnType<typeof parseGradient>
) {
  const {type, direction, radialDirection, colors} = parsedResult;
  const linearDirectionMap: Record<string, string> = {
    top: 'to top',
    right: 'to right',
    center: 'to right',
    bottom: 'to bottom',
    left: 'to left',
  };
  return `${type}-gradient(${
    type === 'radial'
      ? `circle at ${radialDirection}`
      : linearDirectionMap[direction]
  }, ${colors.map(({color, position}) => `${color} ${position}%`).join(', ')})`;
}

export function buildGradientVariants(baseGradient: string) {
  const parsedResult = parseGradient(baseGradient);
  // base
  const baseColors = parsedResult.colors.map(({color, position}) => ({
    color: chroma(color as string).hex(),
    position,
  }));
  const base = constructGradient({...parsedResult, colors: baseColors});
  // subtle
  const subtleColors = parsedResult.colors.map(({color, position}) => ({
    color: chroma(color as string)
      .alpha(0.2)
      .hex(),
    position,
  }));
  const subtle = constructGradient({...parsedResult, colors: subtleColors});
  // contrast
  const allContrastColors = parsedResult.colors.map(({color, position}) => ({
    color: chroma(color as string).luminance() > 0.5 ? '#000000' : '#ffffff',
    position,
  }));
  const contrastColors = allContrastColors.map(({position}, i) => {
    const base = allContrastColors[0];
    if (i === 0) {
      return base;
    } else {
      const color = base.color;
      const chromeColor = chroma(color);
      const offsetColor =
        color === '#000000'
          ? chromeColor.brighten(i + 1).hex()
          : chromeColor.darken(i + 1).hex();
      return {color: offsetColor, position};
    }
  });
  const contrast = constructGradient({...parsedResult, colors: contrastColors});
  // shade
  const shadeColors = parsedResult.colors.map(({color, position}) => ({
    color: chroma(color as string)
      .darken(0.75)
      .hex(),
    position,
  }));
  const shade = constructGradient({...parsedResult, colors: shadeColors});
  // tint
  const tintColors = parsedResult.colors.map(({color, position}) => ({
    color: chroma(color as string)
      .brighten(0.75)
      .hex(),
    position,
  }));
  const tint = constructGradient({...parsedResult, colors: tintColors});
  // result
  return {base, subtle, contrast, shade, tint};
}
