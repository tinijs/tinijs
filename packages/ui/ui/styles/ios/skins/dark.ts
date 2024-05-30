import {css} from 'lit';

/* eslint-disable prettier/prettier */
export default css`:root {
  /* fonts */
  --font-head: "Helvetica Neue", sans-serif;
  --font-body: "Helvetica Neue", sans-serif;
  --font-art: 'Brush Script MT', cursive;
  --font-code: Lucida, monospace;
  /* colors */
  --color-back: #1c1c1e;
  --color-back-subtle: #1c1c1e33;
  --color-back-contrast: #ffffff;
  --color-back-shade: #000000;
  --color-back-tint: #39393b;
  --color-middle: #9898a0;
  --color-middle-subtle: #9898a033;
  --color-middle-contrast: #ffffff;
  --color-middle-shade: #75757d;
  --color-middle-tint: #bcbcc5;
  --color-front: #ffffff;
  --color-front-subtle: #ffffff33;
  --color-front-contrast: #000000;
  --color-front-shade: #d8d8d8;
  --color-front-tint: #ffffff;
  --color-primary: #007aff;
  --color-primary-subtle: #007aff33;
  --color-primary-contrast: #ffffff;
  --color-primary-shade: #005ad8;
  --color-primary-tint: #589cff;
  --color-secondary: #5856d7;
  --color-secondary-subtle: #5856d733;
  --color-secondary-contrast: #ffffff;
  --color-secondary-shade: #2837b1;
  --color-secondary-tint: #8177fe;
  --color-info: #7bc6f6;
  --color-info-subtle: #7bc6f633;
  --color-info-contrast: #000000;
  --color-info-shade: #53a1d0;
  --color-info-tint: #a2ecff;
  --color-success: #34c759;
  --color-success-subtle: #34c75933;
  --color-success-contrast: #ffffff;
  --color-success-shade: #00a136;
  --color-success-tint: #63ee7c;
  --color-warning: #ff9501;
  --color-warning-subtle: #ff950133;
  --color-warning-contrast: #ffffff;
  --color-warning-shade: #d47200;
  --color-warning-tint: #ffba3a;
  --color-danger: #ff3b30;
  --color-danger-subtle: #ff3b3033;
  --color-danger-contrast: #ffffff;
  --color-danger-shade: #d20010;
  --color-danger-tint: #ff6650;
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
  --size-md: 12px;
  --text-md: 16px;
  --space-md: 1rem;
  --radius-md: 6px;
  --border-md: 1px;
  --ring-md: 1px;
  --line-md: 1.5;
  --letter-md: normal;
  /* shadows */
  --shadow-scarcity: 0 0 0 1px #1c1c1e26;
  --shadow-tiny: 0 1px 2px 0 #1c1c1e26;
  --shadow-small: 0 1px 3px 0 #1c1c1e33, 0 1px 2px 0 #1c1c1e29;
  --shadow-medium: 0 4px 6px -1px #1c1c1e33, 0 2px 4px -1px #1c1c1e29;
  --shadow-big: 0 10px 15px -3px #1c1c1e33, 0 4px 6px -2px #1c1c1e26;
  --shadow-huge: 0 20px 25px -5px #1c1c1e33, 0 10px 10px -5px #1c1c1e24;
  --shadow-excess: 0px 0px 0px 1px #1c1c1e33, 0px 5px 10px #1c1c1e4d, 0px 15px 40px #1c1c1e80;
}`;
/* eslint-enable prettier/prettier */
