import {minifyCSS} from '@tinijs/cli';

const JOIN = '\n  ';

function generateFontVars() {
  return "--font-art: 'Brush Script MT', cursive;";
}

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
    .join(JOIN);
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
  return items.map(([name, value]) => `--weight-${name}: ${value};`).join(JOIN);
}

function generateSizeVars() {
  const items: [string, number][] = [
    ['xs', 0.5],
    ['sm', 0.75],
    ['md', 1],
    ['lg', 1.25],
    ['xl', 1.5],
  ];
  return items
    .map(
      ([name, value]) => `--size-${name}: calc(var(--size-base) * ${value});`
    )
    .join(JOIN);
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
    '--space-zero: 0;\n  ' +
    items
      .map(
        ([name, value]) =>
          `--space-${name}: calc(var(--size-base) * var(--size-space) * ${value});`
      )
      .join(JOIN)
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
    '--radius-zero: 0;\n  ' +
    items
      .map(
        ([name, value]) =>
          `--radius-${name}: ${
            typeof value === 'string'
              ? value
              : `calc(var(--size-base) * var(--size-radius) * ${value})`
          };`
      )
      .join(JOIN)
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
    '--border-zero: 0;\n  ' +
    items
      .map(
        ([name, value]) =>
          `--border-${name}: calc(var(--size-border) * ${value});`
      )
      .join(JOIN)
  );
}

function generateOutlineVars() {
  const items: [string, number][] = [
    ['sm', 0.5],
    ['md', 1],
    ['lg', 2],
    ['xl', 3],
  ];
  return (
    '--outline-zero: 0;\n  ' +
    items
      .map(
        ([name, value]) =>
          `--outline-${name}: calc(var(--size-outline) * ${value});`
      )
      .join(JOIN)
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
    .join(JOIN);
}

function generateLetterVars() {
  const items: [string, string][] = [
    ['xs', '-0.03em'],
    ['sm', '-0.015em'],
    ['md', 'var(--size-letter)'],
    ['lg', '0.075em'],
    ['xl', '0.15em'],
  ];
  return items.map(([name, value]) => `--letter-${name}: ${value};`).join(JOIN);
}

function generateWideVars() {
  const items: [string, number][] = [
    ['xs3', 240],
    ['xs2', 320],
    ['xs', 480],
    ['sm', 576],
    ['md', 768],
    ['lg', 1024],
    ['xl', 1280],
    ['xl2', 1440],
    ['xl3', 1640],
    ['xl4', 1920],
    ['xl5', 2560],
    ['xl6', 3840],
    ['xl7', 4096],
  ];
  return items.map(([name, value]) => `--wide-${name}: ${value}px;`).join(JOIN);
}

function generateShadowVars() {
  return '--shadow-none: none;';
}

export function getSkinUtils() {
  const fontVars = generateFontVars();
  const textVars = generateTextVars();
  const weightVars = generateWeightVars();
  const sizeVars = generateSizeVars();
  const spaceVars = generateSpaceVars();
  const radiusVars = generateRadiusVars();
  const borderVars = generateBorderVars();
  const ringVars = generateOutlineVars();
  const lineVars = generateLineVars();
  const letterVars = generateLetterVars();
  const wideVars = generateWideVars();
  const shadowVars = generateShadowVars();
  return (
    '${generateOfficialColorTokens()}' +
    '\n' +
    '${generateOfficialGradientTokens()}' +
    '\n' +
    minifyCSS(`:root {
  ${fontVars}
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
}`)
  );
}

export function getCommonStyles() {
  return minifyCSS(`
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--color-body);
  color: var(--color-body-contrast);
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
