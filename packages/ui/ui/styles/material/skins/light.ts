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
  --color-middle: #909293;
  --color-middle-subtle: #90929333;
  --color-middle-contrast: #ffffff;
  --color-middle-shade: #6e7070;
  --color-middle-tint: #b4b6b7;
  --color-front: #212428;
  --color-front-subtle: #21242833;
  --color-front-contrast: #ffffff;
  --color-front-shade: #00040b;
  --color-front-tint: #3e4247;
  --color-primary: #0d6efd;
  --color-primary-subtle: #0d6efd33;
  --color-primary-contrast: #ffffff;
  --color-primary-shade: #004ed6;
  --color-primary-tint: #5b90ff;
  --color-secondary: #5c5e61;
  --color-secondary-subtle: #5c5e6133;
  --color-secondary-contrast: #ffffff;
  --color-secondary-shade: #3d3e41;
  --color-secondary-tint: #7d8083;
  --color-info: #0db9dd;
  --color-info-subtle: #0db9dd33;
  --color-info-contrast: #ffffff;
  --color-info-shade: #0095b7;
  --color-info-tint: #56dfff;
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
  --gradient-middle: linear-gradient(180deg, #bfbfbf 0%, #6a6b6c 100%);
  --gradient-middle-subtle: linear-gradient(180deg, #bfbfbf33 0%, #6a6b6c33 100%);
  --gradient-middle-contrast: linear-gradient(180deg, #000000 0%, #555555 100%);
  --gradient-middle-shade: linear-gradient(180deg, #9b9b9b 0%, #4a4b4c 100%);
  --gradient-middle-tint: linear-gradient(180deg, #e5e5e5 0%, #8c8d8e 100%);
  --gradient-front: linear-gradient(180deg, #5e6164 0%, #121417 100%);
  --gradient-front-subtle: linear-gradient(180deg, #5e616433 0%, #12141733 100%);
  --gradient-front-contrast: linear-gradient(180deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-front-shade: linear-gradient(180deg, #3e4144 0%, #000000 100%);
  --gradient-front-tint: linear-gradient(180deg, #808386 0%, #2e3033 100%);
  --gradient-primary: linear-gradient(180deg, #2e7bff 0%, #003899 100%);
  --gradient-primary-subtle: linear-gradient(180deg, #2e7bff33 0%, #00389933 100%);
  --gradient-primary-contrast: linear-gradient(180deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-primary-shade: linear-gradient(180deg, #005ad8 0%, #001c75 100%);
  --gradient-primary-tint: linear-gradient(180deg, #679eff 0%, #4157be 100%);
  --gradient-secondary: linear-gradient(180deg, #8a8b8f 0%, #23334d 100%);
  --gradient-secondary-subtle: linear-gradient(180deg, #8a8b8f33 0%, #23334d33 100%);
  --gradient-secondary-contrast: linear-gradient(180deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-secondary-shade: linear-gradient(180deg, #68696d 0%, #03172e 100%);
  --gradient-secondary-tint: linear-gradient(180deg, #aeafb3 0%, #43526e 100%);
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
  --scale-md: 15px;
  --text-md: 16px;
  --space-md: 1rem;
  --outline-md: 1px;
  --border-md: 1px;
  --radius-md: 4px;
  /* shadows */
  --shadow-scarcity: 0 0 0 1px #0000000d;
  --shadow-tiny: 0 1px 2px 0 #0000000d;
  --shadow-small: 0 1px 3px 0 #0000001a, 0 1px 2px 0 #0000000f;
  --shadow-medium: 0 4px 6px -1px #0000001a, 0 2px 4px -1px #0000000f;
  --shadow-big: 0 10px 15px -3px #0000001a, 0 4px 6px -2px #0000000d;
  --shadow-huge: 0 20px 25px -5px #0000001a, 0 10px 10px -5px #0000000a;
  --shadow-excess: 0px 0px 0px 1px #0000001a, 0px 5px 10px #00000033, 0px 15px 40px #00000066;
}`;
/* eslint-enable prettier/prettier */
