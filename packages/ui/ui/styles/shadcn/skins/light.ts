import {css} from 'lit';

/* eslint-disable prettier/prettier */
export default css`:root {
  /* fonts */
  --font-title: Geist, sans-serif;
  --font-content: Geist, sans-serif;
  --font-art: 'Brush Script MT', cursive;
  --font-code: "Geist Mono", monospace;
  /* colors */
  --color-back: #fafafa;
  --color-back-dim: #ededed;
  --color-back-subtle: #fafafa40;
  --color-back-contrast: #000000;
  --color-middle: #71717b;
  --color-middle-dim: #7c7c86;
  --color-middle-subtle: #71717b40;
  --color-middle-contrast: #ffffff;
  --color-front: #0a0a0b;
  --color-front-dim: #161617;
  --color-front-subtle: #0a0a0b40;
  --color-front-contrast: #ffffff;
  --color-primary: #18181a;
  --color-primary-dim: #212123;
  --color-primary-subtle: #18181a40;
  --color-primary-contrast: #ffffff;
  --color-secondary: #64748b;
  --color-secondary-dim: #6f7f97;
  --color-secondary-subtle: #64748b40;
  --color-secondary-contrast: #ffffff;
  --color-info: #2563eb;
  --color-info-dim: #3c6ef8;
  --color-info-subtle: #2563eb40;
  --color-info-contrast: #ffffff;
  --color-success: #17a34a;
  --color-success-dim: #2caf55;
  --color-success-subtle: #17a34a40;
  --color-success-contrast: #ffffff;
  --color-warning: #facc15;
  --color-warning-dim: #ecc000;
  --color-warning-subtle: #facc1540;
  --color-warning-contrast: #000000;
  --color-danger: #e11e49;
  --color-danger-dim: #ef3253;
  --color-danger-subtle: #e11e4940;
  --color-danger-contrast: #ffffff;
  /* gradients */
  --gradient-back: linear-gradient(to bottom, #ffffff 0%, #f4f4f5 100%);
  --gradient-back-dim: linear-gradient(to bottom, #f2f2f2 0%, #e7e7e8 100%);
  --gradient-back-subtle: linear-gradient(to bottom, #ffffff40 0%, #f4f4f540 100%);
  --gradient-back-contrast: linear-gradient(to bottom, #000000 0%, #555555 100%);
  --gradient-middle: linear-gradient(to bottom, #f4f4f5 0%, #71717b 100%);
  --gradient-middle-dim: linear-gradient(to bottom, #e7e7e8 0%, #7c7c86 100%);
  --gradient-middle-subtle: linear-gradient(to bottom, #f4f4f540 0%, #71717b40 100%);
  --gradient-middle-contrast: linear-gradient(to bottom, #000000 0%, #555555 100%);
  --gradient-front: linear-gradient(to bottom, #71717b 0%, #0a0a0b 100%);
  --gradient-front-dim: linear-gradient(to bottom, #7c7c86 0%, #161617 100%);
  --gradient-front-subtle: linear-gradient(to bottom, #71717b40 0%, #0a0a0b40 100%);
  --gradient-front-contrast: linear-gradient(to bottom, #ffffff 0%, #9b9b9b 100%);
  --gradient-primary: linear-gradient(to bottom, #71717b 0%, #18181a 100%);
  --gradient-primary-dim: linear-gradient(to bottom, #7c7c86 0%, #212123 100%);
  --gradient-primary-subtle: linear-gradient(to bottom, #71717b40 0%, #18181a40 100%);
  --gradient-primary-contrast: linear-gradient(to bottom, #ffffff 0%, #9b9b9b 100%);
  --gradient-secondary: linear-gradient(to bottom, #64748b 0%, #6b7280 100%);
  --gradient-secondary-dim: linear-gradient(to bottom, #6f7f97 0%, #767d8c 100%);
  --gradient-secondary-subtle: linear-gradient(to bottom, #64748b40 0%, #6b728040 100%);
  --gradient-secondary-contrast: linear-gradient(to bottom, #ffffff 0%, #9b9b9b 100%);
  --gradient-info: linear-gradient(to bottom, #11caf0 0%, #3880ff 100%);
  --gradient-info-dim: linear-gradient(to bottom, #33d7fd 0%, #4c8bff 100%);
  --gradient-info-subtle: linear-gradient(to bottom, #11caf040 0%, #3880ff40 100%);
  --gradient-info-contrast: linear-gradient(to bottom, #ffffff 0%, #9b9b9b 100%);
  --gradient-success: linear-gradient(to bottom, #2dd36f 0%, #17a34a 100%);
  --gradient-success-dim: linear-gradient(to bottom, #40e07b 0%, #2caf55 100%);
  --gradient-success-subtle: linear-gradient(to bottom, #2dd36f40 0%, #17a34a40 100%);
  --gradient-success-contrast: linear-gradient(to bottom, #ffffff 0%, #9b9b9b 100%);
  --gradient-warning: linear-gradient(to bottom, #facc15 0%, #f0b400 100%);
  --gradient-warning-dim: linear-gradient(to bottom, #ecc000 0%, #e2a800 100%);
  --gradient-warning-subtle: linear-gradient(to bottom, #facc1540 0%, #f0b40040 100%);
  --gradient-warning-contrast: linear-gradient(to bottom, #000000 0%, #555555 100%);
  --gradient-danger: linear-gradient(to bottom, #eb445a 0%, #dc2626 100%);
  --gradient-danger-dim: linear-gradient(to bottom, #f95265 0%, #eb3730 100%);
  --gradient-danger-subtle: linear-gradient(to bottom, #eb445a40 0%, #dc262640 100%);
  --gradient-danger-contrast: linear-gradient(to bottom, #ffffff 0%, #9b9b9b 100%);
  /* sizes */
  --size-base: 16px;
  --size-text: 1;
  --size-space: 1;
  --size-radius: .25;
  --size-border: 1px;
  --size-ring: 1px;
  --size-line: 1.5;
  --size-letter: normal;
  /* shadows */
  --shadow-xs: 0 0 0 1px #0a0a0b0d;
  --shadow-sm: 0 1px 3px 0 #0a0a0b1a, 0 1px 2px 0 #0a0a0b0f;
  --shadow-md: 0 4px 6px -1px #0a0a0b1a, 0 2px 4px -1px #0a0a0b0f;
  --shadow-lg: 0 20px 25px -5px #0a0a0b1a, 0 10px 10px -5px #0a0a0b0a;
  --shadow-xl: 0px 0px 0px 1px #0a0a0b1a, 0px 5px 10px #0a0a0b33, 0px 15px 40px #0a0a0b66;
  --shadow-inset: inset 0 2px 4px 0 #0a0a0b0d;
}`;
/* eslint-enable prettier/prettier */
