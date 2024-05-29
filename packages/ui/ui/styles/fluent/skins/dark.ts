import {css} from 'lit';

/* eslint-disable prettier/prettier */
export default css`:root {
  /* fonts */
  --font-head: Roboto, sans-serif;
  --font-body: Roboto, sans-serif;
  --font-art: Roboto, sans-serif;
  --font-code: "Roboto Mono", monospace;
  /* colors */
  --color-back: #202020;
  --color-back-subtle: #20202033;
  --color-back-contrast: #ffffff;
  --color-back-shade: #000000;
  --color-back-tint: #3d3d3d;
  --color-middle: #adadad;
  --color-middle-subtle: #adadad33;
  --color-middle-contrast: #ffffff;
  --color-middle-shade: #898989;
  --color-middle-tint: #d2d2d2;
  --color-front: #ffffff;
  --color-front-subtle: #ffffff33;
  --color-front-contrast: #000000;
  --color-front-shade: #d8d8d8;
  --color-front-tint: #ffffff;
  --color-primary: #0e6cbd;
  --color-primary-subtle: #0e6cbd33;
  --color-primary-contrast: #ffffff;
  --color-primary-shade: #004c98;
  --color-primary-tint: #4c8ee3;
  --color-secondary: #02bcf2;
  --color-secondary-subtle: #02bcf233;
  --color-secondary-contrast: #ffffff;
  --color-secondary-shade: #0098cc;
  --color-secondary-tint: #57e2ff;
  --color-info: #0979d3;
  --color-info-subtle: #0979d333;
  --color-info-contrast: #ffffff;
  --color-info-shade: #0058ad;
  --color-info-tint: #509cfa;
  --color-success: #31a85c;
  --color-success-subtle: #31a85c33;
  --color-success-contrast: #ffffff;
  --color-success-shade: #00843b;
  --color-success-tint: #5cce7e;
  --color-warning: #f68a4b;
  --color-warning-subtle: #f68a4b33;
  --color-warning-contrast: #ffffff;
  --color-warning-shade: #cc6729;
  --color-warning-tint: #ffae6d;
  --color-danger: #ef4e84;
  --color-danger-subtle: #ef4e8433;
  --color-danger-contrast: #ffffff;
  --color-danger-shade: #c52062;
  --color-danger-tint: #ff76a7;
  /* gradients */
  --gradient-back: linear-gradient(180deg, #0a0a0a 0%, #2a2a2a 100%);
  --gradient-back-subtle: linear-gradient(180deg, #0a0a0a33 0%, #2a2a2a33 100%);
  --gradient-back-contrast: linear-gradient(180deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-back-shade: linear-gradient(180deg, #000000 0%, #0d0d0d 100%);
  --gradient-back-tint: linear-gradient(180deg, #282828 0%, #484848 100%);
  --gradient-middle: linear-gradient(180deg, #999999 0%, #d6d6d6 100%);
  --gradient-middle-subtle: linear-gradient(180deg, #99999933 0%, #d6d6d633 100%);
  --gradient-middle-contrast: linear-gradient(180deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-middle-shade: linear-gradient(180deg, #767676 0%, #b1b1b1 100%);
  --gradient-middle-tint: linear-gradient(180deg, #bdbdbd 0%, #fcfcfc 100%);
  --gradient-front: linear-gradient(180deg, #d6d6d6 0%, #ffffff 100%);
  --gradient-front-subtle: linear-gradient(180deg, #d6d6d633 0%, #ffffff33 100%);
  --gradient-front-contrast: linear-gradient(180deg, #000000 0%, #555555 100%);
  --gradient-front-shade: linear-gradient(180deg, #b1b1b1 0%, #d8d8d8 100%);
  --gradient-front-tint: linear-gradient(180deg, #fcfcfc 0%, #ffffff 100%);
  --gradient-primary: linear-gradient(180deg, #185abd 0%, #0e6cbd 100%);
  --gradient-primary-subtle: linear-gradient(180deg, #185abd33 0%, #0e6cbd33 100%);
  --gradient-primary-contrast: linear-gradient(180deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-primary-shade: linear-gradient(180deg, #003b98 0%, #004c98 100%);
  --gradient-primary-tint: linear-gradient(180deg, #507be3 0%, #4c8ee3 100%);
  --gradient-secondary: linear-gradient(180deg, #0078d4 0%, #02bcf2 100%);
  --gradient-secondary-subtle: linear-gradient(180deg, #0078d433 0%, #02bcf233 100%);
  --gradient-secondary-contrast: linear-gradient(180deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-secondary-shade: linear-gradient(180deg, #0057ae 0%, #0098cc 100%);
  --gradient-secondary-tint: linear-gradient(180deg, #4e9afb 0%, #57e2ff 100%);
  --gradient-info: linear-gradient(180deg, #0078d4 0%, #0979d5 100%);
  --gradient-info-subtle: linear-gradient(180deg, #0078d433 0%, #0979d533 100%);
  --gradient-info-contrast: linear-gradient(180deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-info-shade: linear-gradient(180deg, #0057ae 0%, #0058af 100%);
  --gradient-info-tint: linear-gradient(180deg, #4e9afb 0%, #509cfc 100%);
  --gradient-success: linear-gradient(180deg, #0f7c41 0%, #31a75b 100%);
  --gradient-success-subtle: linear-gradient(180deg, #0f7c4133 0%, #31a75b33 100%);
  --gradient-success-contrast: linear-gradient(180deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-success-shade: linear-gradient(180deg, #005a22 0%, #00833a 100%);
  --gradient-success-tint: linear-gradient(180deg, #3fa062 0%, #5ccd7d 100%);
  --gradient-warning: linear-gradient(180deg, #c43e1c 0%, #f68a4d 100%);
  --gradient-warning-subtle: linear-gradient(180deg, #c43e1c33 0%, #f68a4d33 100%);
  --gradient-warning-contrast: linear-gradient(180deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-warning-shade: linear-gradient(180deg, #9a1300 0%, #cc672c 100%);
  --gradient-warning-tint: linear-gradient(180deg, #ef633c 0%, #ffae6f 100%);
  --gradient-danger: linear-gradient(180deg, #bc1948 0%, #f14d86 100%);
  --gradient-danger-subtle: linear-gradient(180deg, #bc194833 0%, #f14d8633 100%);
  --gradient-danger-contrast: linear-gradient(180deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-danger-shade: linear-gradient(180deg, #93002a 0%, #c71e64 100%);
  --gradient-danger-tint: linear-gradient(180deg, #e64868 0%, #ff75a9 100%);
  /* sizes */
  --size-md: 13px;
  --text-md: 16px;
  --space-md: 1rem;
  --radius-md: 4px;
  --border-md: 1px;
  --ring-md: 1px;
  --line-md: 1.5;
  --letter-md: normal;
  /* shadows */
  --shadow-scarcity: 0 0 0 1px #20202026;
  --shadow-tiny: 0 1px 2px 0 #20202026;
  --shadow-small: 0 1px 3px 0 #20202033, 0 1px 2px 0 #20202029;
  --shadow-medium: 0 4px 6px -1px #20202033, 0 2px 4px -1px #20202029;
  --shadow-big: 0 10px 15px -3px #20202033, 0 4px 6px -2px #20202026;
  --shadow-huge: 0 20px 25px -5px #20202033, 0 10px 10px -5px #20202024;
  --shadow-excess: 0px 0px 0px 1px #20202033, 0px 5px 10px #2020204d, 0px 15px 40px #20202080;
}`;
/* eslint-enable prettier/prettier */
