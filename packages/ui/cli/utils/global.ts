import {minifyCSS} from '@tinijs/cli';
import {Colors} from '@tinijs/core';

const JOIN = '\n  ';

function generateColorVars() {
  return Object.values(Colors)
    .map(name =>
      [
        `--color-${name}-more: ${
          name === 'body'
            ? 'var(--color-body)'
            : `color-mix(in oklab, var(--color-${name}), var(--color-body-contrast) 15%)`
        };`,
        `--color-${name}-less: color-mix(in oklab, var(--color-${name}), ${
          name === 'body'
            ? 'var(--color-body-contrast) 3%'
            : 'var(--color-body) 15%'
        });`,
        `--color-${name}-semi: color-mix(in oklab, var(--color-${name}), ${
          name === 'body'
            ? 'var(--color-body-contrast) 10%'
            : 'var(--color-body) 40%'
        });`,
        `--color-${name}-subtle: color-mix(in oklab, var(--color-${name}), ${
          name === 'body'
            ? 'var(--color-body-contrast) 15%'
            : 'var(--color-body) 80%'
        });`,
        `--color-${name}-dull: color-mix(in oklab, var(--color-${name}), ${
          name === 'body'
            ? 'var(--color-body-contrast) 25%'
            : 'var(--color-body-semi) 90%'
        });`,
      ].join(JOIN)
    )
    .join(JOIN);
}

function generateGradientVars() {
  return Object.values(Colors)
    .map(name =>
      ['more', '', 'less', 'semi', 'subtle', 'dull', 'contrast']
        .map(suffix => {
          const fullName = `${name}${!suffix ? '' : `-${suffix}`}`;
          return `--gradient-${fullName}: linear-gradient(var(--config-gradir, 180deg), color-mix(in oklab, var(--color-${fullName}), white 15%), color-mix(in oklab, var(--color-${fullName}), black 15%));`;
        })
        .join(JOIN)
    )
    .join(JOIN);
}

function generateFontVars() {
  return "--font-art: 'Brush Script MT', cursive;";
}

function generateTextVars() {
  const items: [string, number][] = [
    ['xs-3', 0.5],
    ['xs-2', 0.625],
    ['xs', 0.75],
    ['sm', 0.875],
    ['md', 1],
    ['lg', 1.25],
    ['xl', 1.5],
    ['xl-2', 2.25],
    ['xl-3', 3],
    ['xl-4', 4.5],
    ['xl-5', 6],
    ['xl-6', 7],
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
    ['xs-3', 0.125],
    ['xs-2', 0.25],
    ['xs', 0.5],
    ['sm', 0.75],
    ['md', 1],
    ['lg', 1.25],
    ['xl', 1.75],
    ['xl-2', 2.25],
    ['xl-3', 3],
    ['xl-4', 4.5],
    ['xl-5', 6],
    ['xl-6', 8],
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

function generateRingVars() {
  const items: [string, number][] = [
    ['sm', 0.5],
    ['md', 1],
    ['lg', 2],
    ['xl', 3],
  ];
  return (
    '--ring-zero: 0;\n  ' +
    items
      .map(
        ([name, value]) => `--ring-${name}: calc(var(--size-ring) * ${value});`
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
    ['xs-6', 48],
    ['xs-5', 72],
    ['xs-4', 96],
    ['xs-3', 150],
    ['xs-2', 320],
    ['xs', 480],
    ['sm', 576],
    ['md', 768],
    ['lg', 992],
    ['xl', 1024],
    ['xl-2', 1200],
    ['xl-3', 1400],
    ['xl-4', 1920],
    ['xl-5', 2560],
    ['xl-6', 3840],
  ];
  return items.map(([name, value]) => `--wide-${name}: ${value}px;`).join(JOIN);
}

function generateShadowVars() {
  return '--shadow-none: none;';
}

export function getSkinUtils() {
  const colorVars = generateColorVars();
  const gradientVars = generateGradientVars();
  const fontVars = generateFontVars();
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
  ${colorVars}
  ${gradientVars}
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
