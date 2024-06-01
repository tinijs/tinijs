import {css} from 'lit';

/* eslint-disable prettier/prettier */
export default css`:root {
  /* fonts */
  --font-title: Inter, sans-serif;
  --font-content: Inter, sans-serif;
  --font-art: 'Brush Script MT', cursive;
  --font-code: Menlo, monospace;
  /* colors */
  --color-back: #2a2a2a;
  --color-back-subtle: #2a2a2a33;
  --color-back-contrast: #ffffff;
  --color-back-shade: #0d0d0d;
  --color-back-tint: #484848;
  --color-middle: #7e7e7e;
  --color-middle-subtle: #7e7e7e33;
  --color-middle-contrast: #ffffff;
  --color-middle-shade: #5d5d5d;
  --color-middle-tint: #a1a1a1;
  --color-front: #dedede;
  --color-front-subtle: #dedede33;
  --color-front-contrast: #000000;
  --color-front-shade: #b9b9b9;
  --color-front-tint: #ffffff;
  --color-primary: #4f46e5;
  --color-primary-subtle: #4f46e533;
  --color-primary-contrast: #ffffff;
  --color-primary-shade: #0826be;
  --color-primary-tint: #7c67ff;
  --color-secondary: #0fa4e7;
  --color-secondary-subtle: #0fa4e733;
  --color-secondary-contrast: #ffffff;
  --color-secondary-shade: #0081c1;
  --color-secondary-tint: #56c9ff;
  --color-info: #07b5d3;
  --color-info-subtle: #07b5d333;
  --color-info-contrast: #ffffff;
  --color-info-shade: #0091ae;
  --color-info-tint: #52dbf9;
  --color-success: #01b96b;
  --color-success-subtle: #01b96b33;
  --color-success-contrast: #ffffff;
  --color-success-shade: #00944a;
  --color-success-tint: #4adf8e;
  --color-warning: #f2bd27;
  --color-warning-subtle: #f2bd2733;
  --color-warning-contrast: #000000;
  --color-warning-shade: #c99900;
  --color-warning-tint: #ffe251;
  --color-danger: #e0282e;
  --color-danger-subtle: #e0282e33;
  --color-danger-contrast: #ffffff;
  --color-danger-shade: #b40010;
  --color-danger-tint: #ff554d;
  /* gradients */
  --gradient-back: linear-gradient(180deg, #5e6164 0%, #121417 100%);
  --gradient-back-subtle: linear-gradient(180deg, #5e616433 0%, #12141733 100%);
  --gradient-back-contrast: linear-gradient(180deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-back-shade: linear-gradient(180deg, #3e4144 0%, #000000 100%);
  --gradient-back-tint: linear-gradient(180deg, #808386 0%, #2e3033 100%);
  --gradient-middle: linear-gradient(180deg, #bfbfbf 0%, #6a6b6c 100%);
  --gradient-middle-subtle: linear-gradient(180deg, #bfbfbf33 0%, #6a6b6c33 100%);
  --gradient-middle-contrast: linear-gradient(180deg, #000000 0%, #555555 100%);
  --gradient-middle-shade: linear-gradient(180deg, #9b9b9b 0%, #4a4b4c 100%);
  --gradient-middle-tint: linear-gradient(180deg, #e5e5e5 0%, #8c8d8e 100%);
  --gradient-front: linear-gradient(180deg, #ffffff 0%, #cccccc 100%);
  --gradient-front-subtle: linear-gradient(180deg, #ffffff33 0%, #cccccc33 100%);
  --gradient-front-contrast: linear-gradient(180deg, #000000 0%, #555555 100%);
  --gradient-front-shade: linear-gradient(180deg, #d8d8d8 0%, #a7a7a7 100%);
  --gradient-front-tint: linear-gradient(180deg, #ffffff 0%, #f2f2f2 100%);
  --gradient-primary: linear-gradient(180deg, #4f46e5 0%, #3127b4 100%);
  --gradient-primary-subtle: linear-gradient(180deg, #4f46e533 0%, #3127b433 100%);
  --gradient-primary-contrast: linear-gradient(180deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-primary-shade: linear-gradient(180deg, #0826be 0%, #00068f 100%);
  --gradient-primary-tint: linear-gradient(180deg, #7c67ff 0%, #5f47da 100%);
  --gradient-secondary: linear-gradient(180deg, #0fa4e7 0%, #0373ab 100%);
  --gradient-secondary-subtle: linear-gradient(180deg, #0fa4e733 0%, #0373ab33 100%);
  --gradient-secondary-contrast: linear-gradient(180deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-secondary-shade: linear-gradient(180deg, #0081c1 0%, #005287 100%);
  --gradient-secondary-tint: linear-gradient(180deg, #56c9ff 0%, #4596d0 100%);
  --gradient-info: linear-gradient(180deg, #0db9dd 0%, #004857 100%);
  --gradient-info-subtle: linear-gradient(180deg, #0db9dd33 0%, #00485733 100%);
  --gradient-info-contrast: linear-gradient(180deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-info-shade: linear-gradient(180deg, #0095b7 0%, #002a38 100%);
  --gradient-info-tint: linear-gradient(180deg, #56dfff 0%, #2f6878 100%);
  --gradient-success: linear-gradient(180deg, #2db977 0%, #014b1f 100%);
  --gradient-success-subtle: linear-gradient(180deg, #2db97733 0%, #014b1f33 100%);
  --gradient-success-contrast: linear-gradient(180deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-success-shade: linear-gradient(180deg, #009455 0%, #002c00 100%);
  --gradient-success-tint: linear-gradient(180deg, #5cdf9a 0%, #2c6c3d 100%);
  --gradient-warning: linear-gradient(180deg, #fbc42d 0%, #816108 100%);
  --gradient-warning-subtle: linear-gradient(180deg, #fbc42d33 0%, #81610833 100%);
  --gradient-warning-contrast: linear-gradient(180deg, #000000 0%, #555555 100%);
  --gradient-warning-shade: linear-gradient(180deg, #d1a000 0%, #5d4100 100%);
  --gradient-warning-tint: linear-gradient(180deg, #ffea56 0%, #a7832f 100%);
  --gradient-danger: linear-gradient(180deg, #fb4b5d 0%, #9e0a19 100%);
  --gradient-danger-subtle: linear-gradient(180deg, #fb4b5d33 0%, #9e0a1933 100%);
  --gradient-danger-contrast: linear-gradient(180deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-danger-shade: linear-gradient(180deg, #d0193e 0%, #750000 100%);
  --gradient-danger-tint: linear-gradient(180deg, #ff737e 0%, #c83b36 100%);
  /* sizes */
  --text-md: 16px;
  --size-md: 1rem;
  --space-md: 1rem;
  --radius-md: 6px;
  --border-md: 1px;
  --ring-md: 1px;
  --line-md: 1.8;
  --letter-md: normal;
  /* shadows */
  --shadow-tiny: 0 0 0 1px #2a2a2a26;
  --shadow-small: 0 1px 3px 0 #2a2a2a33, 0 1px 2px 0 #2a2a2a29;
  --shadow-medium: 0 4px 6px -1px #2a2a2a33, 0 2px 4px -1px #2a2a2a29;
  --shadow-big: 0 20px 25px -5px #2a2a2a33, 0 10px 10px -5px #2a2a2a24;
  --shadow-huge: 0px 0px 0px 1px #2a2a2a33, 0px 5px 10px #2a2a2a4d, 0px 15px 40px #2a2a2a80;
  --shadow-inset: inset 0 2px 4px 0 #2a2a2a26;
}`;
/* eslint-enable prettier/prettier */
