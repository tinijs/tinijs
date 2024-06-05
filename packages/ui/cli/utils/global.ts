import {minifyCSS} from '@tinijs/cli';

function generateTextVars() {
  const items: [string, number][] = [
    ['xs3', 0.5],
    ['xs2', 0.625],
    ['xs', 0.75],
    ['sm', 0.875],
    ['md', 1],
    ['lg', 1.25],
    ['xl', 1.5],
    ['xl2', 2.25],
    ['xl3', 3],
    ['xl4', 4.5],
    ['xl5', 6],
    ['xl6', 7],
  ];
  return items
    .map(
      ([name, value]) =>
        `--text-${name}: calc(var(--size-base) * var(--size-text) * ${value});`
    )
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
    ['md', 1],
    ['lg', 1.25],
    ['xl', 1.5],
    ['xl2', 1.75],
  ];
  return items
    .map(
      ([name, value]) => `--size-${name}: calc(var(--size-base) * ${value});`
    )
    .join('\n  ');
}

function generateSpaceVars() {
  const items: [string, number][] = [
    ['xs3', 0.125],
    ['xs2', 0.25],
    ['xs', 0.5],
    ['sm', 0.75],
    ['md', 1],
    ['lg', 1.25],
    ['xl', 1.75],
    ['xl2', 2.25],
    ['xl3', 3],
    ['xl4', 4.5],
    ['xl5', 6],
    ['xl6', 8],
  ];
  return (
    '--space-none: 0;\n  ' +
    items
      .map(
        ([name, value]) =>
          `--space-${name}: calc(var(--size-base) * var(--size-space) * ${value});`
      )
      .join('\n  ')
  );
}

function generateRadiusVars() {
  const items: [string, string | number][] = [
    ['xs', 0.5],
    ['sm', 0.75],
    ['md', 1],
    ['lg', 2],
    ['xl', 4],
    ['quarter', '25%'],
    ['third', '33.33%'],
    ['half', '50%'],
    ['full', '9999px'],
  ];
  return (
    '--radius-none: none;\n  ' +
    items
      .map(
        ([name, value]) =>
          `--radius-${name}: ${
            typeof value === 'string'
              ? value
              : `calc(var(--size-base) * var(--size-radius) * ${value})`
          };`
      )
      .join('\n  ')
  );
}

function generateBorderVars() {
  const items: [string, number][] = [
    ['sm', 0.5],
    ['md', 1],
    ['lg', 2],
    ['xl', 3],
  ];
  return (
    '--border-none: 0;\n  ' +
    items
      .map(
        ([name, value]) =>
          `--border-${name}: calc(var(--size-border) * ${value});`
      )
      .join('\n  ')
  );
}

function generateRingVars() {
  const items: [string, number][] = [
    ['sm', 0.5],
    ['md', 1],
    ['lg', 2],
    ['xl', 3],
  ];
  return (
    '--ring-none: 0;\n  ' +
    items
      .map(
        ([name, value]) => `--ring-${name}: calc(var(--size-ring) * ${value});`
      )
      .join('\n  ')
  );
}

function generateLineVars() {
  const items: [string, number][] = [
    ['xs', 0.5],
    ['sm', 0.75],
    ['md', 1],
    ['lg', 1.25],
    ['xl', 1.5],
  ];
  return items
    .map(
      ([name, value]) => `--line-${name}: calc(var(--size-line) * ${value});`
    )
    .join('\n  ');
}

function generateLetterVars() {
  const items: [string, string][] = [
    ['xs', '-0.03em'],
    ['sm', '-0.015em'],
    ['md', 'var(--size-letter)'],
    ['lg', '0.075em'],
    ['xl', '0.15em'],
  ];
  return items
    .map(([name, value]) => `--letter-${name}: ${value};`)
    .join('\n  ');
}

function generateWideVars() {
  const items: [string, number][] = [
    ['xs6', 48],
    ['xs5', 72],
    ['xs4', 96],
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

function generateShadowVars() {
  return '--shadow-none: none;';
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
  const shadowVars = generateShadowVars();
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
  ${shadowVars}
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
  font-family: var(--font-content);
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
