import {css} from 'lit';

/* eslint-disable prettier/prettier */
export default css`:root {
  /* fonts */
  --font-title: "Ubuntu Sans", sans-serif;
  --font-content: "Ubuntu Sans", sans-serif;
  --font-art: 'Brush Script MT', cursive;
  --font-code: "Ubuntu Sans Mono", monospace;
  /* colors */
  --color-back: #0f0f0f;
  --color-back-dim: #191919;
  --color-back-subtle: #0f0f0f40;
  --color-back-contrast: #ffffff;
  --color-middle: #919191;
  --color-middle-dim: #9d9d9d;
  --color-middle-subtle: #91919140;
  --color-middle-contrast: #ffffff;
  --color-front: #ffffff;
  --color-front-dim: #f2f2f2;
  --color-front-subtle: #ffffff40;
  --color-front-contrast: #000000;
  --color-primary: #0369e3;
  --color-primary-dim: #2b74f0;
  --color-primary-subtle: #0369e340;
  --color-primary-contrast: #ffffff;
  --color-secondary: #017672;
  --color-secondary-dim: #1c827d;
  --color-secondary-subtle: #01767240;
  --color-secondary-contrast: #ffffff;
  --color-info: #3892f3;
  --color-info-dim: #4b9eff;
  --color-info-subtle: #3892f340;
  --color-info-contrast: #ffffff;
  --color-success: #018f5d;
  --color-success-dim: #1e9b68;
  --color-success-subtle: #018f5d40;
  --color-success-contrast: #ffffff;
  --color-warning: #f68524;
  --color-warning-dim: #ff9131;
  --color-warning-subtle: #f6852440;
  --color-warning-contrast: #ffffff;
  --color-danger: #ea3829;
  --color-danger-dim: #f94734;
  --color-danger-subtle: #ea382940;
  --color-danger-contrast: #ffffff;
  /* gradients */
  --gradient-back: linear-gradient(to bottom, #5e6164 0%, #121417 100%);
  --gradient-back-dim: linear-gradient(to bottom, #696c6f 0%, #1b1d20 100%);
  --gradient-back-subtle: linear-gradient(to bottom, #5e616440 0%, #12141740 100%);
  --gradient-back-contrast: linear-gradient(to bottom, #ffffff 0%, #9b9b9b 100%);
  --gradient-middle: linear-gradient(to bottom, #bfbfbf 0%, #6a6b6c 100%);
  --gradient-middle-dim: linear-gradient(to bottom, #b3b3b3 0%, #757677 100%);
  --gradient-middle-subtle: linear-gradient(to bottom, #bfbfbf40 0%, #6a6b6c40 100%);
  --gradient-middle-contrast: linear-gradient(to bottom, #000000 0%, #555555 100%);
  --gradient-front: linear-gradient(to bottom, #ffffff 0%, #cccccc 100%);
  --gradient-front-dim: linear-gradient(to bottom, #f2f2f2 0%, #c0c0c0 100%);
  --gradient-front-subtle: linear-gradient(to bottom, #ffffff40 0%, #cccccc40 100%);
  --gradient-front-contrast: linear-gradient(to bottom, #000000 0%, #555555 100%);
  --gradient-primary: linear-gradient(to bottom, #0369e3 0%, #0049a8 100%);
  --gradient-primary-dim: linear-gradient(to bottom, #2b74f0 0%, #2153b4 100%);
  --gradient-primary-subtle: linear-gradient(to bottom, #0369e340 0%, #0049a840 100%);
  --gradient-primary-contrast: linear-gradient(to bottom, #ffffff 0%, #9b9b9b 100%);
  --gradient-secondary: linear-gradient(to bottom, #017672 0%, #0a4746 100%);
  --gradient-secondary-dim: linear-gradient(to bottom, #1c827d 0%, #195250 100%);
  --gradient-secondary-subtle: linear-gradient(to bottom, #01767240 0%, #0a474640 100%);
  --gradient-secondary-contrast: linear-gradient(to bottom, #ffffff 0%, #9b9b9b 100%);
  --gradient-info: linear-gradient(to bottom, #3892f3 0%, #186dc9 100%);
  --gradient-info-dim: linear-gradient(to bottom, #4b9eff 0%, #3078d6 100%);
  --gradient-info-subtle: linear-gradient(to bottom, #3892f340 0%, #186dc940 100%);
  --gradient-info-contrast: linear-gradient(to bottom, #ffffff 0%, #9b9b9b 100%);
  --gradient-success: linear-gradient(to bottom, #018f5d 0%, #086848 100%);
  --gradient-success-dim: linear-gradient(to bottom, #1e9b68 0%, #1c7353 100%);
  --gradient-success-subtle: linear-gradient(to bottom, #018f5d40 0%, #08684840 100%);
  --gradient-success-contrast: linear-gradient(to bottom, #ffffff 0%, #9b9b9b 100%);
  --gradient-warning: linear-gradient(to bottom, #f68524 0%, #cb680b 100%);
  --gradient-warning-dim: linear-gradient(to bottom, #ff9131 0%, #d9741b 100%);
  --gradient-warning-subtle: linear-gradient(to bottom, #f6852440 0%, #cb680b40 100%);
  --gradient-warning-contrast: linear-gradient(to bottom, #ffffff 0%, #9b9b9b 100%);
  --gradient-danger: linear-gradient(to bottom, #ea3829 0%, #b72110 100%);
  --gradient-danger-dim: linear-gradient(to bottom, #f94734 0%, #c5301b 100%);
  --gradient-danger-subtle: linear-gradient(to bottom, #ea382940 0%, #b7211040 100%);
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
  --shadow-xs: 0 0 0 1px #0f0f0f26;
  --shadow-sm: 0 1px 3px 0 #0f0f0f33, 0 1px 2px 0 #0f0f0f29;
  --shadow-md: 0 4px 6px -1px #0f0f0f33, 0 2px 4px -1px #0f0f0f29;
  --shadow-lg: 0 20px 25px -5px #0f0f0f33, 0 10px 10px -5px #0f0f0f24;
  --shadow-xl: 0px 0px 0px 1px #0f0f0f33, 0px 5px 10px #0f0f0f4d, 0px 15px 40px #0f0f0f80;
  --shadow-inset: inset 0 2px 4px 0 #0f0f0f26;
}`;
/* eslint-enable prettier/prettier */
