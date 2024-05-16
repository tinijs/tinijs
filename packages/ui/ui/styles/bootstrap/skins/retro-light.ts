import {css} from 'lit';

/* eslint-disable prettier/prettier */
export default css`:root {
  /* fonts */
  --font-head: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  --font-body: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  --font-quote: 'Times New Roman', Georgia, Baskerville, serif;
  --font-code: Monaco, Consolas, "Courier New", monospace;
  /* colors */
  --color-back: #f8f9fa;
  --color-back-subtle: #f8f9fa33;
  --color-back-contrast: #000000;
  --color-back-shade: #d2d3d4;
  --color-back-tint: #ffffff;
  --color-front: #212428;
  --color-front-subtle: #21242833;
  --color-front-contrast: #ffffff;
  --color-front-shade: #00040b;
  --color-front-tint: #3e4247;
  --color-medium: #909293;
  --color-medium-subtle: #90929333;
  --color-medium-contrast: #ffffff;
  --color-medium-shade: #6e7070;
  --color-medium-tint: #b4b6b7;
  --color-primary: #0d6efd;
  --color-primary-subtle: #0d6efd33;
  --color-primary-contrast: #ffffff;
  --color-primary-shade: #004ed6;
  --color-primary-tint: #5b90ff;
  --color-secondary: #11caf0;
  --color-secondary-subtle: #11caf033;
  --color-secondary-contrast: #ffffff;
  --color-secondary-shade: #00a5ca;
  --color-secondary-tint: #5bf0ff;
  --color-info: #17a2b8;
  --color-info-subtle: #17a2b833;
  --color-info-contrast: #ffffff;
  --color-info-shade: #0c8595;
  --color-info-tint: #2abed1;
  --color-success: #1a8754;
  --color-success-subtle: #1a875433;
  --color-success-contrast: #ffffff;
  --color-success-shade: #006435;
  --color-success-tint: #47ab75;
  --color-warning: #fec00b;
  --color-warning-subtle: #fec00b33;
  --color-warning-contrast: #000000;
  --color-warning-shade: #d49c00;
  --color-warning-tint: #ffe643;
  --color-danger: #dc3545;
  --color-danger-subtle: #dc354533;
  --color-danger-contrast: #ffffff;
  --color-danger-shade: #b10027;
  --color-danger-tint: #ff5e65;
  /* gradients */
  --gradient-back: linear-gradient(180deg, #ffffff 0%, #cccccc 100%);
  --gradient-back-subtle: linear-gradient(180deg, #ffffff33 0%, #cccccc33 100%);
  --gradient-back-contrast: linear-gradient(180deg, #000000 0%, #555555 100%);
  --gradient-back-shade: linear-gradient(180deg, #d8d8d8 0%, #a7a7a7 100%);
  --gradient-back-tint: linear-gradient(180deg, #ffffff 0%, #f2f2f2 100%);
  --gradient-front: linear-gradient(180deg, #5e6164 0%, #121417 100%);
  --gradient-front-subtle: linear-gradient(180deg, #5e616433 0%, #12141733 100%);
  --gradient-front-contrast: linear-gradient(180deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-front-shade: linear-gradient(180deg, #3e4144 0%, #000000 100%);
  --gradient-front-tint: linear-gradient(180deg, #808386 0%, #2e3033 100%);
  --gradient-medium: linear-gradient(180deg, #bcbdbd 0%, #555758 100%);
  --gradient-medium-subtle: linear-gradient(180deg, #bcbdbd33 0%, #55575833 100%);
  --gradient-medium-contrast: linear-gradient(180deg, #000000 0%, #555555 100%);
  --gradient-primary: linear-gradient(180deg, #2e7bff 0%, #003899 100%);
  --gradient-primary-subtle: linear-gradient(180deg, #2e7bff33 0%, #00389933 100%);
  --gradient-primary-contrast: linear-gradient(180deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-secondary: linear-gradient(180deg, #34d8f9 0%, #007b94 100%);
  --gradient-secondary-subtle: linear-gradient(180deg, #34d8f933 0%, #007b9433 100%);
  --gradient-secondary-contrast: linear-gradient(180deg, #000000 0%, #555555 100%);
  --gradient-info: linear-gradient(180deg, #17a2b8 0%, #0d5f6f 100%);
  --gradient-info-subtle: linear-gradient(180deg, #17a2b833 0%, #0d5f6f33 100%);
  --gradient-info-contrast: linear-gradient(180deg, #000000 0%, #555555 100%);
  --gradient-success: linear-gradient(180deg, #2db977 0%, #014b1f 100%);
  --gradient-success-subtle: linear-gradient(180deg, #2db97733 0%, #014b1f33 100%);
  --gradient-success-contrast: linear-gradient(180deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-warning: linear-gradient(180deg, #fbc42d 0%, #816108 100%);
  --gradient-warning-subtle: linear-gradient(180deg, #fbc42d33 0%, #81610833 100%);
  --gradient-warning-contrast: linear-gradient(180deg, #000000 0%, #555555 100%);
  --gradient-danger: linear-gradient(180deg, #fb4b5d 0%, #9e0a19 100%);
  --gradient-danger-subtle: linear-gradient(180deg, #fb4b5d33 0%, #9e0a1933 100%);
  --gradient-danger-contrast: linear-gradient(180deg, #ffffff 0%, #9b9b9b 100%);
  /* sizes */
  --size-text: 16px;
  --size-space: 1rem;
  --size-outline: 1px;
  --size-border: 1px;
  --size-radius: 5px;
  /* scales */
  --scale-xxs: 6px;
  --scale-xs: 9px;
  --scale-sm: 12px;
  --scale-md: 15px;
  --scale-lg: 18px;
  --scale-xl: 21px;
  --scale-xxl: 24px;
  /* wides */
  --wide-xxs: 320px;
  --wide-xs: 480px;
  --wide-sm: 576px;
  --wide-md: 768px;
  --wide-lg: 992px;
  --wide-xl: 1024px;
  --wide-xxl: 1440px;
  /* shadows */
  --shadow-main: none;
  --shadow-less: 0 1px 3px 0 #0000001a, 0 1px 2px 0 #0000000f;
  --shadow-great: 0 10px 15px -3px #0000001a, 0 4px 6px -2px #0000000d;
  --shadow-scarcity: 0 0 0 1px #0000000d;
  --shadow-excess: 0px 0px 0px 1px #0000001a, 0px 5px 10px #00000033, 0px 15px 40px #00000066;
}`;
/* eslint-enable prettier/prettier */
