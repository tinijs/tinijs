import {minifyCSS} from '@tinijs/cli';

function generateCommonColorVars() {
  const COMMON_COLORS = {
    black: {
      base: '#000000',
      subtle: '#00000033',
      contrast: '#ffffff',
      shade: '#000000',
      tint: '#222428',
    },
    white: {
      base: '#ffffff',
      subtle: '#ffffff33',
      contrast: '#000000',
      shade: '#f4f5f8',
      tint: '#ffffff',
    },
    gray: {
      base: '#71717a',
      subtle: '#71717a33',
      contrast: '#ffffff',
      shade: '#52525b',
      tint: '#a1a1aa',
    },
    zinc: {
      base: '#bac4c8',
      subtle: '#bac4c833',
      contrast: '#ffffff',
      shade: '#969fa2',
      tint: '#e0eaed',
    },
    brown: {
      base: '#795c34',
      subtle: '#795c3433',
      contrast: '#ffffff',
      shade: '#4b371c',
      tint: '#9a7b4f',
    },
    orange: {
      base: '#f97316',
      subtle: '#f9731633',
      contrast: '#ffffff',
      shade: '#ea580c',
      tint: '#fb923c',
    },
    amber: {
      base: '#f59e0b',
      subtle: '#f59e0b33',
      contrast: '#000000',
      shade: '#d97706',
      tint: '#fbbf24',
    },
    yellow: {
      base: '#eab308',
      subtle: '#eab30833',
      contrast: '#000000',
      shade: '#ca8a04',
      tint: '#facc15',
    },
    lime: {
      base: '#84cc16',
      subtle: '#84cc1633',
      contrast: '#000000',
      shade: '#65a30d',
      tint: '#a3e635',
    },
    green: {
      base: '#22c55e',
      subtle: '#22c55e33',
      contrast: '#ffffff',
      shade: '#16a34a',
      tint: '#4ade80',
    },
    emerald: {
      base: '#10b981',
      subtle: '#10b98133',
      contrast: '#ffffff',
      shade: '#059669',
      tint: '#34d399',
    },
    teal: {
      base: '#14b8a6',
      subtle: '#14b8a633',
      contrast: '#ffffff',
      shade: '#0d9488',
      tint: '#2dd4bf',
    },
    cyan: {
      base: '#06b6d4',
      subtle: '#06b6d433',
      contrast: '#ffffff',
      shade: '#0891b2',
      tint: '#22d3ee',
    },
    sky: {
      base: '#0ea5e9',
      subtle: '#0ea5e933',
      contrast: '#ffffff',
      shade: '#0284c7',
      tint: '#38bdf8',
    },
    blue: {
      base: '#3b82f6',
      subtle: '#3b82f633',
      contrast: '#ffffff',
      shade: '#2563eb',
      tint: '#60a5fa',
    },
    navy: {
      base: '#1b3bbb',
      subtle: '#1b3bbb33',
      contrast: '#ffffff',
      shade: '#24388a',
      tint: '#3652ba',
    },
    indigo: {
      base: '#6366f1',
      subtle: '#6366f133',
      contrast: '#ffffff',
      shade: '#4f46e5',
      tint: '#818cf8',
    },
    violet: {
      base: '#8b5cf6',
      subtle: '#8b5cf633',
      contrast: '#ffffff',
      shade: '#7c3aed',
      tint: '#a78bfa',
    },
    purple: {
      base: '#a855f7',
      subtle: '#a855f733',
      contrast: '#ffffff',
      shade: '#9333ea',
      tint: '#c084fc',
    },
    fuchsia: {
      base: '#d946ef',
      subtle: '#d946ef33',
      contrast: '#ffffff',
      shade: '#c026d3',
      tint: '#e879f9',
    },
    pink: {
      base: '#ec4899',
      subtle: '#ec489933',
      contrast: '#ffffff',
      shade: '#db2777',
      tint: '#f472b6',
    },
    rose: {
      base: '#f43f5e',
      subtle: '#f43f5e33',
      contrast: '#ffffff',
      shade: '#e11d48',
      tint: '#fb7185',
    },
    red: {
      base: '#e53e3e',
      subtle: '#e53e3e33',
      contrast: '#ffffff',
      shade: '#ba021f',
      tint: '#ff665d',
    },
  };
  return Object.keys(COMMON_COLORS)
    .map(name => {
      const color = COMMON_COLORS[name as keyof typeof COMMON_COLORS];
      return `--color-${name}: ${color.base};
  --color-${name}-subtle: ${color.subtle};
  --color-${name}-contrast: ${color.contrast};
  --color-${name}-shade: ${color.shade};
  --color-${name}-tint: ${color.tint};`;
    })
    .join('\n  ');
}

function generateCommonGradientVars() {
  const COMMON_GRADIENTS = {
    'premium-dark': {
      base: 'linear-gradient(90deg, #434343 0%, #000000 100%)',
      subtle: 'linear-gradient(90deg, #43434333 0%, #00000033 100%)',
      contrast: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
      shade: 'linear-gradient(90deg, #272424 0%, #000000 100%)',
      tint: 'linear-gradient(90deg, #767676 0%, #272424 100%)',
    },
    'perfect-light': {
      base: 'linear-gradient(-225deg, #e3fdf5 0%, #ffe6fa 100%)',
      subtle: 'linear-gradient(-225deg, #e3fdf533 0%, #ffe6fa33 100%)',
      contrast: 'linear-gradient(60deg, #29323c 0%, #485563 100%)',
      shade: 'linear-gradient(-225deg, #afd0c6 0%, #d0b2ca 100%)',
      tint: 'linear-gradient(-225deg, #f5fcfa 0%, #fbf5fa 100%)',
    },
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
  };
  return Object.keys(COMMON_GRADIENTS)
    .map(name => {
      const gradient = COMMON_GRADIENTS[name as keyof typeof COMMON_GRADIENTS];
      return `--gradient-${name}: ${gradient.base};
  --gradient-${name}-subtle: ${gradient.subtle};
  --gradient-${name}-contrast: ${gradient.contrast};
  --gradient-${name}-shade: ${gradient.shade};
  --gradient-${name}-tint: ${gradient.tint};`;
    })
    .join('\n  ');
}

function generateTextVars() {
  const items: [string, number][] = [
    ['xs3', 0.5],
    ['xs2', 0.625],
    ['xs', 0.75],
    ['sm', 0.875],
    // md = 1
    ['lg', 1.25],
    ['xl', 1.5],
    ['xl2', 2.25],
    ['xl3', 3],
    ['xl4', 4.5],
    ['xl5', 6],
    ['xl6', 7],
  ];
  return items
    .map(([name, value]) => `--text-${name}: calc(var(--text-md) * ${value});`)
    .join('\n  ');
}

function generateWeightVars() {
  const items: [string, number][] = [
    ['thin', 100],
    ['light', 300],
    ['normal', 400],
    ['medium', 500],
    ['bold', 700],
    ['black', 900],
  ];
  return items
    .map(([name, value]) => `--weight-${name}: ${value};`)
    .join('\n  ');
}

function generateSizeVars() {
  const items: [string, number][] = [
    ['xs2', 0.35],
    ['xs', 0.5],
    ['sm', 0.75],
    // md = 1p
    ['lg', 1.25],
    ['xl', 1.5],
    ['xl2', 1.75],
  ];
  return items
    .map(([name, value]) => `--size-${name}: calc(var(--size-md) * ${value});`)
    .join('\n  ');
}

function generateSpaceVars() {
  const items: [string, number][] = [
    ['xs3', 0.125],
    ['xs2', 0.25],
    ['xs', 0.5],
    ['sm', 0.75],
    // md = 1
    ['lg', 1.25],
    ['xl', 1.75],
    ['xl2', 2.25],
    ['xl3', 3],
    ['xl4', 4.5],
    ['xl5', 6],
    ['xl6', 8],
  ];
  return items
    .map(
      ([name, value]) => `--space-${name}: calc(var(--space-md) * ${value});`
    )
    .join('\n  ');
}

function generateRadiusVars() {
  const items: [string, string | number][] = [
    ['xs', 0.5],
    ['sm', 0.75],
    // md = 1
    ['lg', 2],
    ['xl', 4],
    ['circle', '50%'],
    ['pill', '9999px'],
  ];
  return items
    .map(
      ([name, value]) =>
        `--radius-${name}: ${
          typeof value === 'string'
            ? value
            : `calc(var(--radius-md) * ${value})`
        };`
    )
    .join('\n  ');
}

function generateBorderVars() {
  const items: [string, number][] = [
    ['sm', 0.5],
    // md = 1
    ['lg', 2],
    ['xl', 3],
  ];
  return items
    .map(
      ([name, value]) => `--border-${name}: calc(var(--border-md) * ${value});`
    )
    .join('\n  ');
}

function generateRingVars() {
  const items: [string, number][] = [
    ['sm', 0.5],
    // md = 1
    ['lg', 2],
    ['xl', 3],
  ];
  return items
    .map(([name, value]) => `--ring-${name}: calc(var(--ring-md) * ${value});`)
    .join('\n  ');
}

function generateLineVars() {
  const items: [string, number][] = [
    ['xs', 0.5],
    ['sm', 0.75],
    // md = 1
    ['lg', 1.25],
    ['xl', 1.5],
  ];
  return items
    .map(([name, value]) => `--line-${name}: calc(var(--line-md) * ${value});`)
    .join('\n  ');
}

function generateLetterVars() {
  const items: [string, string][] = [
    ['xs', '-0.03em'],
    ['sm', '-0.015em'],
    // md = normal
    ['lg', '0.075em'],
    ['xl', '0.15em'],
  ];
  return items
    .map(([name, value]) => `--letter-${name}: ${value};`)
    .join('\n  ');
}

function generateWideVars() {
  const items: [string, number][] = [
    ['xs3', 150],
    ['xs2', 320],
    ['xs', 480],
    ['sm', 576],
    ['md', 768],
    ['lg', 992],
    ['xl', 1024],
    ['xl2', 1200],
    ['xl3', 1400],
    ['xl4', 1920],
    ['xl5', 2560],
    ['xl6', 3840],
  ];
  return items
    .map(([name, value]) => `--wide-${name}: ${value}px;`)
    .join('\n  ');
}

export function getCommonColors() {
  const commonColors = generateCommonColorVars();
  return minifyCSS(`
:root {
  ${commonColors}
}
`);
}

export function getCommonGradients() {
  const commonGradients = generateCommonGradientVars();
  return minifyCSS(`
:root {
  ${commonGradients}
}
`);
}

export function getSkinUtils() {
  const textVars = generateTextVars();
  const weightVars = generateWeightVars();
  const sizeVars = generateSizeVars();
  const spaceVars = generateSpaceVars();
  const radiusVars = generateRadiusVars();
  const borderVars = generateBorderVars();
  const ringVars = generateRingVars();
  const lineVars = generateLineVars();
  const letterVars = generateLetterVars();
  const wideVars = generateWideVars();
  return minifyCSS(`
:root {
  ${textVars}
  ${weightVars}
  ${sizeVars}
  ${spaceVars}
  ${radiusVars}
  ${borderVars}
  ${ringVars}
  ${lineVars}
  ${letterVars}
  ${wideVars}
}
`);
}

export function getCommonStyles() {
  return minifyCSS(`
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--color-back);
  color: var(--color-front);
  font-family: var(--font-body);
  font-size: var(--text-md);
  line-height: var(--line-md);
  letter-spacing: var(--letter-md);
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, select, optgroup, textarea {
  margin: 0;
  font: inherit;
  color: inherit;
  line-height: inherit;
  letter-spacing: inherit;
}

h1, h2, h3, h4, h5, h6, p {
  overflow-wrap: break-word;
}

app-root {
  isolation: isolate;
}
`);
}
