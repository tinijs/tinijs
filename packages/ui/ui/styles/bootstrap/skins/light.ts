import {css} from 'lit';

/* eslint-disable prettier/prettier */
export default css`:root {
  /* fonts */
  --font-title: Arial, sans-serif;
  --font-content: Arial, sans-serif;
  --font-art: 'Brush Script MT', cursive;
  --font-code: Monaco, monospace;
  /* colors */
  --color-back: #f8f9fa;
  --color-back-dim: #ebeced;
  --color-back-subtle: #f8f9fa40;
  --color-back-contrast: #000000;
  --color-middle: #909293;
  --color-middle-dim: #9c9e9f;
  --color-middle-subtle: #90929340;
  --color-middle-contrast: #ffffff;
  --color-front: #212428;
  --color-front-dim: #2a2d32;
  --color-front-subtle: #21242840;
  --color-front-contrast: #ffffff;
  --color-primary: #0d6efd;
  --color-primary-dim: #3279ff;
  --color-primary-subtle: #0d6efd40;
  --color-primary-contrast: #ffffff;
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
  --gradient-back: linear-gradient(to bottom, #ffffff 0%, #cccccc 100%);
  --gradient-back-dim: linear-gradient(to bottom, #f2f2f2 0%, #c0c0c0 100%);
  --gradient-back-subtle: linear-gradient(to bottom, #ffffff40 0%, #cccccc40 100%);
  --gradient-back-contrast: linear-gradient(to bottom, #000000 0%, #555555 100%);
  --gradient-middle: linear-gradient(to bottom, #bfbfbf 0%, #6a6b6c 100%);
  --gradient-middle-dim: linear-gradient(to bottom, #b3b3b3 0%, #757677 100%);
  --gradient-middle-subtle: linear-gradient(to bottom, #bfbfbf40 0%, #6a6b6c40 100%);
  --gradient-middle-contrast: linear-gradient(to bottom, #000000 0%, #555555 100%);
  --gradient-front: linear-gradient(to bottom, #5e6164 0%, #121417 100%);
  --gradient-front-dim: linear-gradient(to bottom, #696c6f 0%, #1b1d20 100%);
  --gradient-front-subtle: linear-gradient(to bottom, #5e616440 0%, #12141740 100%);
  --gradient-front-contrast: linear-gradient(to bottom, #ffffff 0%, #9b9b9b 100%);
  --gradient-primary: linear-gradient(to bottom, #2e7bff 0%, #003899 100%);
  --gradient-primary-dim: linear-gradient(to bottom, #4486ff 0%, #1f42a5 100%);
  --gradient-primary-subtle: linear-gradient(to bottom, #2e7bff40 0%, #00389940 100%);
  --gradient-primary-contrast: linear-gradient(to bottom, #ffffff 0%, #9b9b9b 100%);
  --gradient-secondary: linear-gradient(to bottom, #8a8b8f 0%, #23334d 100%);
  --gradient-secondary-dim: linear-gradient(to bottom, #96979b 0%, #2e3d58 100%);
  --gradient-secondary-subtle: linear-gradient(to bottom, #8a8b8f40 0%, #23334d40 100%);
  --gradient-secondary-contrast: linear-gradient(to bottom, #ffffff 0%, #9b9b9b 100%);
  --gradient-info: linear-gradient(to bottom, #0db9dd 0%, #004857 100%);
  --gradient-info-dim: linear-gradient(to bottom, #2fc5ea 0%, #145362 100%);
  --gradient-info-subtle: linear-gradient(to bottom, #0db9dd40 0%, #00485740 100%);
  --gradient-info-contrast: linear-gradient(to bottom, #ffffff 0%, #9b9b9b 100%);
  --gradient-success: linear-gradient(to bottom, #2db977 0%, #014b1f 100%);
  --gradient-success-dim: linear-gradient(to bottom, #3ec683 0%, #125629 100%);
  --gradient-success-subtle: linear-gradient(to bottom, #2db97740 0%, #014b1f40 100%);
  --gradient-success-contrast: linear-gradient(to bottom, #ffffff 0%, #9b9b9b 100%);
  --gradient-warning: linear-gradient(to bottom, #fbc42d 0%, #816108 100%);
  --gradient-warning-dim: linear-gradient(to bottom, #edb81c 0%, #8e6c17 100%);
  --gradient-warning-subtle: linear-gradient(to bottom, #fbc42d40 0%, #81610840 100%);
  --gradient-warning-contrast: linear-gradient(to bottom, #000000 0%, #555555 100%);
  --gradient-danger: linear-gradient(to bottom, #fb4b5d 0%, #9e0a19 100%);
  --gradient-danger-dim: linear-gradient(to bottom, #ff5968 0%, #ac1f23 100%);
  --gradient-danger-subtle: linear-gradient(to bottom, #fb4b5d40 0%, #9e0a1940 100%);
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
  --shadow-xs: 0 0 0 1px #0000000d;
  --shadow-sm: 0 1px 3px 0 #0000001a, 0 1px 2px 0 #0000000f;
  --shadow-md: 0 4px 6px -1px #0000001a, 0 2px 4px -1px #0000000f;
  --shadow-lg: 0 20px 25px -5px #0000001a, 0 10px 10px -5px #0000000a;
  --shadow-xl: 0px 0px 0px 1px #0000001a, 0px 5px 10px #00000033, 0px 15px 40px #00000066;
  --shadow-inset: inset 0 2px 4px 0 #0000000d;
}`;
/* eslint-enable prettier/prettier */
