interface ColorDef {
  base: string;
  subtle: string;
  contrast: string;
  shade: string;
  tint: string;
}

type GradientDef = ColorDef;

enum CommonColorsNames {
  Gray = 'gray',
  Zinc = 'zinc',
  Brown = 'brown',
  Amber = 'amber',
  Yellow = 'yellow',
  Orange = 'orange',
  Lime = 'lime',
  Green = 'green',
  Teal = 'teal',
  Cyan = 'cyan',
  Blue = 'blue',
  Navy = 'navy',
  Indigo = 'indigo',
  Violet = 'violet',
  Purple = 'purple',
  Pink = 'pink',
  Red = 'red',
}

const COMMON_COLORS_MAP = {
  [CommonColorsNames.Gray]: {
    base: '#b5bed9',
    subtle: '#b5bed933',
    contrast: '#000000',
    shade: '#a3aed0',
    tint: '#c9d0e3',
  },
  [CommonColorsNames.Zinc]: {
    base: '#71717a',
    subtle: '#71717a33',
    contrast: '#ffffff',
    shade: '#52525b',
    tint: '#a1a1aa',
  },
  [CommonColorsNames.Brown]: {
    base: '#795c34',
    subtle: '#795c3433',
    contrast: '#ffffff',
    shade: '#4b371c',
    tint: '#9a7b4f',
  },
  [CommonColorsNames.Amber]: {
    base: '#fbbf24',
    subtle: '#fbbf2433',
    contrast: '#000000',
    shade: '#f59e0b',
    tint: '#fcd34d',
  },
  [CommonColorsNames.Yellow]: {
    base: '#fbcf33',
    subtle: '#fbcf3333',
    contrast: '#000000',
    shade: '#eab308',
    tint: '#fde047',
  },
  [CommonColorsNames.Orange]: {
    base: '#fb923c',
    subtle: '#fb923c33',
    contrast: '#ffffff',
    shade: '#f97316',
    tint: '#fdba74',
  },
  [CommonColorsNames.Lime]: {
    base: '#98ec2d',
    subtle: '#98ec2d33',
    contrast: '#000000',
    shade: '#82d616',
    tint: '#bef264',
  },
  [CommonColorsNames.Green]: {
    base: '#4ade80',
    subtle: '#4ade8033',
    contrast: '#ffffff',
    shade: '#22c55e',
    tint: '#86efac',
  },
  [CommonColorsNames.Teal]: {
    base: '#2dd4bf',
    subtle: '#2dd4bf33',
    contrast: '#ffffff',
    shade: '#14b8a6',
    tint: '#5eead4',
  },
  [CommonColorsNames.Cyan]: {
    base: '#21d4fd',
    subtle: '#21d4fd33',
    contrast: '#000000',
    shade: '#17c1e8',
    tint: '#67e8f9',
  },
  [CommonColorsNames.Blue]: {
    base: '#42a5f5',
    subtle: '#42a5f533',
    contrast: '#ffffff',
    shade: '#2196f3',
    tint: '#64b5f6',
  },
  [CommonColorsNames.Navy]: {
    base: '#1b3bbb',
    subtle: '#1b3bbb33',
    contrast: '#ffffff',
    shade: '#24388a',
    tint: '#3652ba',
  },
  [CommonColorsNames.Indigo]: {
    base: '#818cf8',
    subtle: '#818cf833',
    contrast: '#ffffff',
    shade: '#6366f1',
    tint: '#a5b4fc',
  },
  [CommonColorsNames.Violet]: {
    base: '#7f00ff',
    subtle: '#7f00ff33',
    contrast: '#ffffff',
    shade: '#710193',
    tint: '#8f00ff',
  },
  [CommonColorsNames.Purple]: {
    base: '#c084fc',
    subtle: '#c084fc33',
    contrast: '#ffffff',
    shade: '#a855f7',
    tint: '#d8b4fe',
  },
  [CommonColorsNames.Pink]: {
    base: '#f472b6',
    subtle: '#f472b633',
    contrast: '#ffffff',
    shade: '#ff0080',
    tint: '#f9a8d4',
  },
  [CommonColorsNames.Red]: {
    base: '#f87171',
    subtle: '#f8717133',
    contrast: '#ffffff',
    shade: '#f53939',
    tint: '#fca5a5',
  },
} as Record<string, ColorDef>;

const COMMON_GRADIENTS_MAP = {
  'vital-ocean': {
    base: 'linear-gradient(90deg, #1cb5e0 0%, #000851 100%)',
    subtle: 'linear-gradient(90deg, #1cb5e033 0%, #00085133 100%)',
    contrast: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
    shade: 'linear-gradient(90deg, #0d93b8 0%, #00031e 100%)',
    tint: 'linear-gradient(90deg, #31cdf8 0%, #051181 100%)',
  },
  'kale-salad': {
    base: 'linear-gradient(90deg, #00c9ff 0%, #92fe9d 100%)',
    subtle: 'linear-gradient(90deg, #00c9ff33 0%, #92fe9d33 100%)',
    contrast: 'linear-gradient(60deg, #29323c 0%, #485563 100%)',
    shade: 'linear-gradient(90deg, #0098c2 0%, #68c972 100%)',
    tint: 'linear-gradient(90deg, #14c6f7 0%, #a5faae 100%)',
  },
  'disco-club': {
    base: 'linear-gradient(90deg, #fc466b 0%, #3f5efb 100%)',
    subtle: 'linear-gradient(90deg, #fc466b33 0%, #3f5efb33 100%)',
    contrast: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
    shade: 'linear-gradient(90deg, #d43151 0%, #2a46d2 100%)',
    tint: 'linear-gradient(90deg, #fb5a7a 0%, #5570f8 100%)',
  },
  'shady-lane': {
    base: 'linear-gradient(90deg, #3f2b96 0%, #a8c0ff 100%)',
    subtle: 'linear-gradient(90deg, #3f2b9633 0%, #a8c0ff33 100%)',
    contrast: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
    shade: 'linear-gradient(90deg, #291a6c 0%, #7f97d4 100%)',
    tint: 'linear-gradient(90deg, #5741bb 0%, #bbcdfb 100%)',
  },
  'retro-wagon': {
    base: 'linear-gradient(90deg, #fdbb2d 0%, #22c1c3 100%)',
    subtle: 'linear-gradient(90deg, #fdbb2d33 0%, #22c1c333 100%)',
    contrast: 'linear-gradient(60deg, #29323c 0%, #485563 100%)',
    shade: 'linear-gradient(90deg, #d39819 0%, #119194 100%)',
    tint: 'linear-gradient(90deg, #fac044 0%, #3be3e6 100%)',
  },
  'fresco-crush': {
    base: 'linear-gradient(90deg, #fdbb2d 0%, #3a1c71 100%)',
    subtle: 'linear-gradient(90deg, #fdbb2d33 0%, #3a1c7133 100%)',
    contrast: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
    shade: 'linear-gradient(90deg, #ce9416 0%, #210d47 100%)',
    tint: 'linear-gradient(90deg, #fdc345 0%, #533094 100%)',
  },
  'cucumber-water': {
    base: 'linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)',
    subtle: 'linear-gradient(90deg, #e3ffe733 0%, #d9e7ff33 100%)',
    contrast: 'linear-gradient(60deg, #29323c 0%, #485563 100%)',
    shade: 'linear-gradient(90deg, #b0d7b6 0%, #a3b5d2 100%)',
    tint: 'linear-gradient(90deg, #f2fbf3 0%, #eaf0fb 100%)',
  },
  'sea-salt': {
    base: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)',
    subtle: 'linear-gradient(90deg, #4b6cb733 0%, #18284833 100%)',
    contrast: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
    shade: 'linear-gradient(90deg, #2f4b8f 0%, #091224 100%)',
    tint: 'linear-gradient(90deg, #698ad6 0%, #304672 100%)',
  },
  'par-four': {
    base: 'linear-gradient(90deg, #9ebd13 0%, #008552 100%)',
    subtle: 'linear-gradient(90deg, #9ebd1333 0%, #00855233 100%)',
    contrast: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
    shade: 'linear-gradient(90deg, #789205 0%, #00472c 100%)',
    tint: 'linear-gradient(90deg, #bbdc28 0%, #0bc57d 100%)',
  },
  'ooey-gooey': {
    base: 'linear-gradient(90deg, #0700b8 0%, #00ff88 100%)',
    subtle: 'linear-gradient(90deg, #0700b833 0%, #00ff8833 100%)',
    contrast: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
    shade: 'linear-gradient(90deg, #04006e 0%, #00af5e 100%)',
    tint: 'linear-gradient(90deg, #140dec 0%, #17fa90 100%)',
  },
  'bloody-mimosa': {
    base: 'linear-gradient(90deg, #d53369 0%, #daae51 100%)',
    subtle: 'linear-gradient(90deg, #d5336933 0%, #daae5133 100%)',
    contrast: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
    shade: 'linear-gradient(90deg, #a41b49 0%, #ad8631 100%)',
    tint: 'linear-gradient(90deg, #f85189 0%, #facf72 100%)',
  },
  'lovely-lilly': {
    base: 'linear-gradient(90deg, #efd5ff 0%, #515ada 100%)',
    subtle: 'linear-gradient(90deg, #efd5ff33 0%, #515ada33 100%)',
    contrast: 'linear-gradient(60deg, #29323c 0%, #485563 100%)',
    shade: 'linear-gradient(90deg, #c0a1d3 0%, #343cb2 100%)',
    tint: 'linear-gradient(90deg, #f6e8fe 0%, #727af6 100%)',
  },
  'aqua-spray': {
    base: 'linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)',
    subtle: 'linear-gradient(90deg, #00d2ff33 0%, #3a47d533 100%)',
    contrast: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
    shade: 'linear-gradient(90deg, #0091b1 0%, #202ba7 100%)',
    tint: 'linear-gradient(90deg, #1ad2fb 0%, #5e6bf9 100%)',
  },
  'mello-yellow': {
    base: 'linear-gradient(90deg, #f8ff00 0%, #3ad59f 100%)',
    subtle: 'linear-gradient(90deg, #f8ff0033 0%, #3ad59f33 100%)',
    contrast: 'linear-gradient(60deg, #29323c 0%, #485563 100%)',
    shade: 'linear-gradient(90deg, #a5aa01 0%, #1fa173 100%)',
    tint: 'linear-gradient(90deg, #f7ff1c 0%, #5ffac4 100%)',
  },
  'dusty-cactus': {
    base: 'linear-gradient(90deg, #fcff9e 0%, #c67700 100%)',
    subtle: 'linear-gradient(90deg, #fcff9e33 0%, #c6770033 100%)',
    contrast: 'linear-gradient(60deg, #29323c 0%, #485563 100%)',
    shade: 'linear-gradient(90deg, #cbce6d 0%, #774700 100%)',
    tint: 'linear-gradient(90deg, #fdffb8 0%, #fea115 100%)',
  },
  'premium-dark': {
    base: 'linear-gradient(90deg, #434343 0%, #000000 100%)',
    subtle: 'linear-gradient(90deg, #43434333 0%, #00000033 100%)',
    contrast: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
    shade: 'linear-gradient(90deg, #272424 0%, #000000 100%)',
    tint: 'linear-gradient(90deg, #767676 0%, #272424 100%)',
  },
  'perfect-white': {
    base: 'linear-gradient(-225deg, #e3fdf5 0%, #ffe6fa 100%)',
    subtle: 'linear-gradient(-225deg, #e3fdf533 0%, #ffe6fa33 100%)',
    contrast: 'linear-gradient(60deg, #29323c 0%, #485563 100%)',
    shade: 'linear-gradient(-225deg, #afd0c6 0%, #d0b2ca 100%)',
    tint: 'linear-gradient(-225deg, #f5fcfa 0%, #fbf5fa 100%)',
  },
} as Record<string, GradientDef>;

const SCALES = [
  '--scale-xxxs',
  '--scale-xxs',
  '--scale-xs',
  '--scale-ss',
  '--scale-sm',
  '--scale-md',
  '--scale-ml',
  '--scale-lg',
  '--scale-sl',
  '--scale-xl',
  '--scale-xxl',
  '--scale-xxxl',
];

const FACTORS = [
  0, 0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9, 1, 1.25, 1.5,
  1.75, 2, 3, 4, 5, 6, 7, 8, 9, 10,
];

const OUTLINES_MAP = {
  zero: 0,
  tiny: 0.25,
  small: 0.5,
  base: 1,
  big: 2,
  huge: 2.5,
  massive: 3,
} as Record<string, number>;

const BORDERS_MAP = OUTLINES_MAP;

const RADIUSES_MAP = {
  ...OUTLINES_MAP,
  quarter: '25%',
  half: '50%',
  'three-quarters': '75%',
  full: '100%',
  max: '100vmax',
} as Record<string, string | number>;

function generateFactorVars(keys: string[]) {
  return keys
    .map(key =>
      FACTORS.map(
        factor =>
          `${key}-${factor
            .toString()
            .replace(/\.|,/g, '_')}x: calc(var(${key}) * ${factor});`
      ).join('\n  ')
    )
    .join('\n  ');
}

function generateBorderVars() {
  return Object.keys(BORDERS_MAP)
    .map(
      name =>
        `--size-border-${name}: calc(var(--size-border) * ${BORDERS_MAP[name]});`
    )
    .join('\n  ');
}

function generateOutlineVars() {
  return Object.keys(OUTLINES_MAP)
    .map(
      name =>
        `--size-outline-${name}: calc(var(--size-outline) * ${OUTLINES_MAP[name]});`
    )
    .join('\n  ');
}

function generateRadiusVars() {
  return Object.keys(RADIUSES_MAP)
    .map(name => {
      const value =
        typeof RADIUSES_MAP[name] === 'string'
          ? (RADIUSES_MAP[name] as string)
          : `calc(var(--size-radius) * ${RADIUSES_MAP[name]})`;
      return `--size-radius-${name}: ${value};`;
    })
    .join('\n  ');
}

function generateCommonColorVars() {
  return Object.keys(COMMON_COLORS_MAP)
    .map(name => {
      const color = COMMON_COLORS_MAP[name];
      return `--color-${name}: ${color.base};
  --color-${name}-subtle: ${color.subtle};
  --color-${name}-contrast: ${color.contrast};
  --color-${name}-shade: ${color.shade};
  --color-${name}-tint: ${color.tint};`;
    })
    .join('\n  ');
}

function generateCommonGradientVars() {
  return Object.keys(COMMON_GRADIENTS_MAP)
    .map(name => {
      const gradient = COMMON_GRADIENTS_MAP[name];
      return `--gradient-${name}: ${gradient.base};
  --gradient-${name}-subtle: ${gradient.subtle};
  --gradient-${name}-contrast: ${gradient.contrast};
  --gradient-${name}-shade: ${gradient.shade};
  --gradient-${name}-tint: ${gradient.tint};`;
    })
    .join('\n  ');
}

export function getSkinCommon() {
  const commonColors = generateCommonColorVars();
  const commonGradients = generateCommonGradientVars();
  const scales = generateFactorVars(SCALES);
  const textSizes = generateFactorVars(['--size-text']);
  const spaceSizes = generateFactorVars(['--size-space']);
  const outlineSizes = generateOutlineVars();
  const borderSizes = generateBorderVars();
  const radiusSizes = generateRadiusVars();
  const shadows = '--shadow-none: none;';
  return `
:root {
  ${commonColors}
  ${commonGradients}
  ${scales}
  ${textSizes}
  ${spaceSizes}
  ${outlineSizes}
  ${borderSizes}
  ${radiusSizes}
  ${shadows}
}
`;
}

export function getDefaultGlobal() {
  return `
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
  font-family: var(--font-body);
  font-size: var(--size-text);
  background: var(--color-background);
  color: var(--color-foreground);
}
`;
}
