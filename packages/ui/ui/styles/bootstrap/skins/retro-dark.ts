import {css} from 'lit';

export default css`
  :root {
    /* fonts */
    --font-head: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    --font-body: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    --font-quote: 'Times New Roman', Georgia, Baskerville, serif;
    --font-code: Monaco, Consolas, 'Courier New', monospace;
    /* colors */
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
    --color-tertiary: #7330f9;
    --color-tertiary-subtle: #7330f933;
    --color-tertiary-contrast: #ffffff;
    --color-tertiary-shade: #4300d2;
    --color-tertiary-tint: #9e56ff;
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
    --color-dark: #212529;
    --color-dark-subtle: #21252933;
    --color-dark-contrast: #ffffff;
    --color-dark-shade: #00040b;
    --color-dark-tint: #3e4247;
    --color-medium: #909293;
    --color-medium-subtle: #90929333;
    --color-medium-contrast: #ffffff;
    --color-medium-shade: #6e7070;
    --color-medium-tint: #b4b6b7;
    --color-light: #f8f9fa;
    --color-light-subtle: #f8f9fa33;
    --color-light-contrast: #000000;
    --color-light-shade: #d2d3d4;
    --color-light-tint: #ffffff;
    --color-background: #212428;
    --color-background-subtle: #21242833;
    --color-background-contrast: #ffffff;
    --color-background-shade: #00040b;
    --color-background-tint: #3e4247;
    --color-middleground: #909293;
    --color-middleground-subtle: #90929333;
    --color-middleground-contrast: #ffffff;
    --color-middleground-shade: #6e7070;
    --color-middleground-tint: #b4b6b7;
    --color-foreground: #f8f9fa;
    --color-foreground-subtle: #f8f9fa33;
    --color-foreground-contrast: #000000;
    --color-foreground-shade: #d2d3d4;
    --color-foreground-tint: #ffffff;
    /* gradients */
    --gradient-primary: linear-gradient(180deg, #2e7bff 0%, #003899 100%);
    --gradient-primary-subtle: linear-gradient(
      180deg,
      #2e7bff33 0%,
      #00389933 100%
    );
    --gradient-primary-contrast: linear-gradient(
      180deg,
      #ffffff 0%,
      #9b9b9b 100%
    );
    --gradient-primary-shade: linear-gradient(180deg, #005ad8 0%, #001c75 100%);
    --gradient-primary-tint: linear-gradient(180deg, #679eff 0%, #4157be 100%);
    --gradient-secondary: linear-gradient(180deg, #34d8f9 0%, #007b94 100%);
    --gradient-secondary-subtle: linear-gradient(
      180deg,
      #34d8f933 0%,
      #007b9433 100%
    );
    --gradient-secondary-contrast: linear-gradient(
      180deg,
      #000000 0%,
      #555555 100%
    );
    --gradient-secondary-shade: linear-gradient(
      180deg,
      #00b2d3 0%,
      #005971 100%
    );
    --gradient-secondary-tint: linear-gradient(
      180deg,
      #6cffff 0%,
      #419eb8 100%
    );
    --gradient-tertiary: linear-gradient(180deg, #8849fd 0%, #3900a3 100%);
    --gradient-tertiary-subtle: linear-gradient(
      180deg,
      #8849fd33 0%,
      #3900a333 100%
    );
    --gradient-tertiary-contrast: linear-gradient(
      180deg,
      #ffffff 0%,
      #9b9b9b 100%
    );
    --gradient-tertiary-shade: linear-gradient(
      180deg,
      #5e24d6 0%,
      #00007f 100%
    );
    --gradient-tertiary-tint: linear-gradient(180deg, #b16dff 0%, #642cc9 100%);
    --gradient-success: linear-gradient(180deg, #2db977 0%, #014b1f 100%);
    --gradient-success-subtle: linear-gradient(
      180deg,
      #2db97733 0%,
      #014b1f33 100%
    );
    --gradient-success-contrast: linear-gradient(
      180deg,
      #ffffff 0%,
      #9b9b9b 100%
    );
    --gradient-success-shade: linear-gradient(180deg, #009455 0%, #002c00 100%);
    --gradient-success-tint: linear-gradient(180deg, #5cdf9a 0%, #2c6c3d 100%);
    --gradient-warning: linear-gradient(180deg, #fbc42d 0%, #816108 100%);
    --gradient-warning-subtle: linear-gradient(
      180deg,
      #fbc42d33 0%,
      #81610833 100%
    );
    --gradient-warning-contrast: linear-gradient(
      180deg,
      #000000 0%,
      #555555 100%
    );
    --gradient-warning-shade: linear-gradient(180deg, #d1a000 0%, #5d4100 100%);
    --gradient-warning-tint: linear-gradient(180deg, #ffea56 0%, #a7832f 100%);
    --gradient-danger: linear-gradient(180deg, #fb4b5d 0%, #9e0a19 100%);
    --gradient-danger-subtle: linear-gradient(
      180deg,
      #fb4b5d33 0%,
      #9e0a1933 100%
    );
    --gradient-danger-contrast: linear-gradient(
      180deg,
      #ffffff 0%,
      #9b9b9b 100%
    );
    --gradient-danger-shade: linear-gradient(180deg, #d0193e 0%, #750000 100%);
    --gradient-danger-tint: linear-gradient(180deg, #ff737e 0%, #c83b36 100%);
    --gradient-dark: linear-gradient(180deg, #5e6164 0%, #121417 100%);
    --gradient-dark-subtle: linear-gradient(
      180deg,
      #5e616433 0%,
      #12141733 100%
    );
    --gradient-dark-contrast: linear-gradient(180deg, #ffffff 0%, #9b9b9b 100%);
    --gradient-dark-shade: linear-gradient(180deg, #3e4144 0%, #000000 100%);
    --gradient-dark-tint: linear-gradient(180deg, #808386 0%, #2e3033 100%);
    --gradient-medium: linear-gradient(180deg, #bcbdbd 0%, #555758 100%);
    --gradient-medium-subtle: linear-gradient(
      180deg,
      #bcbdbd33 0%,
      #55575833 100%
    );
    --gradient-medium-contrast: linear-gradient(
      180deg,
      #000000 0%,
      #555555 100%
    );
    --gradient-medium-shade: linear-gradient(180deg, #989999 0%, #363839 100%);
    --gradient-medium-tint: linear-gradient(180deg, #e2e3e3 0%, #767879 100%);
    --gradient-light: linear-gradient(180deg, #ffffff 0%, #cccccc 100%);
    --gradient-light-subtle: linear-gradient(
      180deg,
      #ffffff33 0%,
      #cccccc33 100%
    );
    --gradient-light-contrast: linear-gradient(
      180deg,
      #000000 0%,
      #555555 100%
    );
    --gradient-light-shade: linear-gradient(180deg, #d8d8d8 0%, #a7a7a7 100%);
    --gradient-light-tint: linear-gradient(180deg, #ffffff 0%, #f2f2f2 100%);
    --gradient-background: linear-gradient(180deg, #5e6164 0%, #121417 100%);
    --gradient-background-subtle: linear-gradient(
      180deg,
      #5e616433 0%,
      #12141733 100%
    );
    --gradient-background-contrast: linear-gradient(
      180deg,
      #ffffff 0%,
      #9b9b9b 100%
    );
    --gradient-background-shade: linear-gradient(
      180deg,
      #3e4144 0%,
      #000000 100%
    );
    --gradient-background-tint: linear-gradient(
      180deg,
      #808386 0%,
      #2e3033 100%
    );
    --gradient-middleground: linear-gradient(180deg, #bcbdbd 0%, #555758 100%);
    --gradient-middleground-subtle: linear-gradient(
      180deg,
      #bcbdbd33 0%,
      #55575833 100%
    );
    --gradient-middleground-contrast: linear-gradient(
      180deg,
      #000000 0%,
      #555555 100%
    );
    --gradient-middleground-shade: linear-gradient(
      180deg,
      #989999 0%,
      #363839 100%
    );
    --gradient-middleground-tint: linear-gradient(
      180deg,
      #e2e3e3 0%,
      #767879 100%
    );
    --gradient-foreground: linear-gradient(180deg, #ffffff 0%, #cccccc 100%);
    --gradient-foreground-subtle: linear-gradient(
      180deg,
      #ffffff33 0%,
      #cccccc33 100%
    );
    --gradient-foreground-contrast: linear-gradient(
      180deg,
      #000000 0%,
      #555555 100%
    );
    --gradient-foreground-shade: linear-gradient(
      180deg,
      #d8d8d8 0%,
      #a7a7a7 100%
    );
    --gradient-foreground-tint: linear-gradient(
      180deg,
      #ffffff 0%,
      #f2f2f2 100%
    );
    /* sizes */
    --size-text: 16px;
    --size-space: 1rem;
    --size-outline: 1px;
    --size-border: 1px;
    --size-radius: 5px;
    /* scales */
    --scale-xxxs: 3px;
    --scale-xxs: 5px;
    --scale-xs: 7px;
    --scale-ss: 9px;
    --scale-sm: 12px;
    --scale-md: 15px;
    --scale-ml: 18px;
    --scale-lg: 21px;
    --scale-sl: 24px;
    --scale-xl: 27px;
    --scale-xxl: 30px;
    --scale-xxxl: 34px;
    /* wides */
    --wide-xxxs: 150px;
    --wide-xxs: 240px;
    --wide-xs: 320px;
    --wide-ss: 425px;
    --wide-sm: 576px;
    --wide-md: 768px;
    --wide-ml: 992px;
    --wide-lg: 1024px;
    --wide-sl: 1200px;
    --wide-xl: 1440px;
    --wide-xxl: 2560px;
    --wide-xxxl: 3840px;
    /* shadows */
    --shadow-normal: 0 4px 6px -1px #00000033, 0 2px 4px -1px #00000029;
    --shadow-least: 0 1px 2px 0 #00000026;
    --shadow-lesser: 0 1px 3px 0 #00000033, 0 1px 2px 0 #00000029;
    --shadow-greater: 0 10px 15px -3px #00000033, 0 4px 6px -2px #00000026;
    --shadow-greatest: 0 20px 25px -5px #00000033, 0 10px 10px -5px #00000024;
    --shadow-scarcity: 0 0 0 1px #00000026;
    --shadow-excess: 0px 0px 0px 1px #00000033, 0px 5px 10px #0000004d,
      0px 15px 40px #00000080;
  }
`;
