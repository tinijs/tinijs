import {css} from 'lit';

/* eslint-disable prettier/prettier */
export default css`:root {
  /* fonts */
  --font-title: Geist, sans-serif;
  --font-content: Geist, sans-serif;
  --font-art: 'Brush Script MT', cursive;
  --font-code: "Geist Mono", monospace;
  /* colors */
  --color-back: #0a0a0b;
  --color-back-dim: #161617;
  --color-back-subtle: #0a0a0b40;
  --color-back-contrast: #ffffff;
  --color-middle: #a1a1aa;
  --color-middle-dim: #adadb6;
  --color-middle-subtle: #a1a1aa40;
  --color-middle-contrast: #ffffff;
  --color-front: #fafafa;
  --color-front-dim: #ededed;
  --color-front-subtle: #fafafa40;
  --color-front-contrast: #000000;
  --color-primary: #fafafa;
  --color-primary-dim: #ededed;
  --color-primary-subtle: #fafafa40;
  --color-primary-contrast: #000000;
  --color-secondary: #5c5e61;
  --color-secondary-dim: #67696c;
  --color-secondary-subtle: #5c5e6140;
  --color-secondary-contrast: #ffffff;
  --color-info: #0db9dd;
  --color-info-dim: #2fc5ea;
  --color-info-subtle: #0db9dd40;
  --color-info-contrast: #ffffff;
  --color-success: #1a8754;
  --color-success-dim: #2b935f;
  --color-success-subtle: #1a875440;
  --color-success-contrast: #ffffff;
  --color-warning: #fec00b;
  --color-warning-dim: #f0b400;
  --color-warning-subtle: #fec00b40;
  --color-warning-contrast: #000000;
  --color-danger: #dc3545;
  --color-danger-dim: #ea434f;
  --color-danger-subtle: #dc354540;
  --color-danger-contrast: #ffffff;
  /* gradients */
  --gradient-back: linear-gradient(to bottom, #71717b 0%, #0a0a0b 100%);
  --gradient-back-dim: linear-gradient(to bottom, #7c7c86 0%, #161617 100%);
  --gradient-back-subtle: linear-gradient(to bottom, #71717b40 0%, #0a0a0b40 100%);
  --gradient-back-contrast: linear-gradient(to bottom, #ffffff 0%, #9b9b9b 100%);
  --gradient-middle: linear-gradient(to bottom, #f4f4f5 0%, #71717b 100%);
  --gradient-middle-dim: linear-gradient(to bottom, #e7e7e8 0%, #7c7c86 100%);
  --gradient-middle-subtle: linear-gradient(to bottom, #f4f4f540 0%, #71717b40 100%);
  --gradient-middle-contrast: linear-gradient(to bottom, #000000 0%, #555555 100%);
  --gradient-front: linear-gradient(to bottom, #ffffff 0%, #f4f4f5 100%);
  --gradient-front-dim: linear-gradient(to bottom, #f2f2f2 0%, #e7e7e8 100%);
  --gradient-front-subtle: linear-gradient(to bottom, #ffffff40 0%, #f4f4f540 100%);
  --gradient-front-contrast: linear-gradient(to bottom, #000000 0%, #555555 100%);
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
  --shadow-xs: 0 0 0 1px #0a0a0b26;
  --shadow-sm: 0 1px 3px 0 #0a0a0b33, 0 1px 2px 0 #0a0a0b29;
  --shadow-md: 0 4px 6px -1px #0a0a0b33, 0 2px 4px -1px #0a0a0b29;
  --shadow-lg: 0 20px 25px -5px #0a0a0b33, 0 10px 10px -5px #0a0a0b24;
  --shadow-xl: 0px 0px 0px 1px #0a0a0b33, 0px 5px 10px #0a0a0b4d, 0px 15px 40px #0a0a0b80;
  --shadow-inset: inset 0 2px 4px 0 #0a0a0b26;
}`;
/* eslint-enable prettier/prettier */
