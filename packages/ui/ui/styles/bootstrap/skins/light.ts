import {css} from 'lit';

export default css`
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&family=Roboto+Serif:wght@400;700&family=Roboto:wght@400;700&display=swap');

  :root {
    /* fonts */
    --font-head: 'Roboto', sans-serif;
    --font-body: 'Roboto', sans-serif;
    --font-quote: 'Roboto Serif', serif;
    --font-code: 'Roboto Mono', monospace;
    /* colors */
    --color-primary: #3880ff;
    --color-primary-subtle: #3880ff33;
    --color-primary-contrast: #ffffff;
    --color-primary-shade: #3171e0;
    --color-primary-tint: #4c8dff;
    --color-secondary: #3dc2ff;
    --color-secondary-subtle: #3dc2ff33;
    --color-secondary-contrast: #ffffff;
    --color-secondary-shade: #36abe0;
    --color-secondary-tint: #50c8ff;
    --color-tertiary: #5260ff;
    --color-tertiary-subtle: #5260ff33;
    --color-tertiary-contrast: #ffffff;
    --color-tertiary-shade: #4854e0;
    --color-tertiary-tint: #6370ff;
    --color-success: #2dd36f;
    --color-success-subtle: #2dd36f33;
    --color-success-contrast: #ffffff;
    --color-success-shade: #28ba62;
    --color-success-tint: #42d77d;
    --color-warning: #ffc409;
    --color-warning-subtle: #ffc40933;
    --color-warning-contrast: #000000;
    --color-warning-shade: #e0ac08;
    --color-warning-tint: #ffca22;
    --color-danger: #eb445a;
    --color-danger-subtle: #eb445a33;
    --color-danger-contrast: #ffffff;
    --color-danger-shade: #cf3c4f;
    --color-danger-tint: #ed576b;
    --color-dark: #222428;
    --color-dark-subtle: #22242833;
    --color-dark-contrast: #ffffff;
    --color-dark-shade: #1e2023;
    --color-dark-tint: #383a3e;
    --color-medium: #92949c;
    --color-medium-subtle: #92949c33;
    --color-medium-contrast: #ffffff;
    --color-medium-shade: #808289;
    --color-medium-tint: #9d9fa6;
    --color-light: #f4f5f8;
    --color-light-subtle: #f4f5f833;
    --color-light-contrast: #000000;
    --color-light-shade: #d7d8da;
    --color-light-tint: #ffffff;
    --color-background: #f4f5f8;
    --color-background-subtle: #f4f5f833;
    --color-background-contrast: #000000;
    --color-background-shade: #d7d8da;
    --color-background-tint: #ffffff;
    --color-middleground: #92949c;
    --color-middleground-subtle: #92949c33;
    --color-middleground-contrast: #ffffff;
    --color-middleground-shade: #808289;
    --color-middleground-tint: #9d9fa6;
    --color-foreground: #222428;
    --color-foreground-subtle: #22242833;
    --color-foreground-contrast: #ffffff;
    --color-foreground-shade: #1e2023;
    --color-foreground-tint: #383a3e;
    /* gradients */
    --gradient-primary: linear-gradient(135deg, #4c8dff 0%, #194ca3 100%);
    --gradient-primary-subtle: linear-gradient(
      135deg,
      #4c8dff33 0%,
      #194ca333 100%
    );
    --gradient-primary-contrast: linear-gradient(
      135deg,
      #ffffff 0%,
      #9b9b9b 100%
    );
    --gradient-primary-shade: linear-gradient(135deg, #0060cb 0%, #002573 100%);
    --gradient-primary-tint: linear-gradient(135deg, #89bdff 0%, #5977d5 100%);
    --gradient-secondary: linear-gradient(135deg, #50c8ff 0%, #1376a4 100%);
    --gradient-secondary-subtle: linear-gradient(
      135deg,
      #50c8ff33 0%,
      #1376a433 100%
    );
    --gradient-secondary-contrast: linear-gradient(
      135deg,
      #000000 0%,
      #555555 100%
    );
    --gradient-secondary-shade: linear-gradient(
      135deg,
      #0097cc 0%,
      #004a75 100%
    );
    --gradient-secondary-tint: linear-gradient(
      135deg,
      #8dfbff 0%,
      #57a5d6 100%
    );
    --gradient-tertiary: linear-gradient(135deg, #6370ff 0%, #242e9e 100%);
    --gradient-tertiary-subtle: linear-gradient(
      135deg,
      #6370ff33 0%,
      #242e9e33 100%
    );
    --gradient-tertiary-contrast: linear-gradient(
      135deg,
      #ffffff 0%,
      #9b9b9b 100%
    );
    --gradient-tertiary-shade: linear-gradient(
      135deg,
      #1545cb 0%,
      #00096e 100%
    );
    --gradient-tertiary-tint: linear-gradient(135deg, #9c9eff 0%, #6058d0 100%);
    --gradient-success: linear-gradient(135deg, #42d77d 0%, #11833f 100%);
    --gradient-success-subtle: linear-gradient(
      135deg,
      #42d77d33 0%,
      #11833f33 100%
    );
    --gradient-success-contrast: linear-gradient(
      135deg,
      #000000 0%,
      #555555 100%
    );
    --gradient-success-shade: linear-gradient(135deg, #00a44f 0%, #005515 100%);
    --gradient-success-tint: linear-gradient(135deg, #7dffad 0%, #4fb46b 100%);
    --gradient-warning: linear-gradient(135deg, #ffca22 0%, #a68108 100%);
    --gradient-warning-subtle: linear-gradient(
      135deg,
      #ffca2233 0%,
      #a6810833 100%
    );
    --gradient-warning-contrast: linear-gradient(
      135deg,
      #000000 0%,
      #555555 100%
    );
    --gradient-warning-shade: linear-gradient(135deg, #c79a00 0%, #735500 100%);
    --gradient-warning-tint: linear-gradient(135deg, #fffd5d 0%, #dbb042 100%);
    --gradient-danger: linear-gradient(135deg, #ed576b 0%, #8e1f30 100%);
    --gradient-danger-subtle: linear-gradient(
      135deg,
      #ed576b33 0%,
      #8e1f3033 100%
    );
    --gradient-danger-contrast: linear-gradient(
      135deg,
      #ffffff 0%,
      #9b9b9b 100%
    );
    --gradient-danger-shade: linear-gradient(135deg, #b51f40 0%, #5b0008 100%);
    --gradient-danger-tint: linear-gradient(135deg, #ff8a99 0%, #c35159 100%);
    --gradient-dark: linear-gradient(135deg, #6b6b6b 0%, #212121 100%);
    --gradient-dark-subtle: linear-gradient(
      135deg,
      #6b6b6b33 0%,
      #21212133 100%
    );
    --gradient-dark-contrast: linear-gradient(135deg, #ffffff 0%, #9b9b9b 100%);
    --gradient-dark-shade: linear-gradient(135deg, #404040 0%, #000000 100%);
    --gradient-dark-tint: linear-gradient(135deg, #999999 0%, #484848 100%);
    --gradient-medium: linear-gradient(135deg, #c8c9cb 0%, #747781 100%);
    --gradient-medium-subtle: linear-gradient(
      135deg,
      #c8c9cb33 0%,
      #74778133 100%
    );
    --gradient-medium-contrast: linear-gradient(
      135deg,
      #000000 0%,
      #555555 100%
    );
    --gradient-medium-shade: linear-gradient(135deg, #97989a 0%, #484b55 100%);
    --gradient-medium-tint: linear-gradient(135deg, #fbfcfe 0%, #a3a6b0 100%);
    --gradient-light: linear-gradient(135deg, #ffffff 0%, #c8c8c8 100%);
    --gradient-light-subtle: linear-gradient(
      135deg,
      #ffffff33 0%,
      #c8c8c833 100%
    );
    --gradient-light-contrast: linear-gradient(
      135deg,
      #000000 0%,
      #555555 100%
    );
    --gradient-light-shade: linear-gradient(135deg, #cccccc 0%, #979797 100%);
    --gradient-light-tint: linear-gradient(135deg, #ffffff 0%, #fbfbfb 100%);
    --gradient-background: linear-gradient(135deg, #ffffff 0%, #c8c8c8 100%);
    --gradient-background-subtle: linear-gradient(
      135deg,
      #ffffff33 0%,
      #c8c8c833 100%
    );
    --gradient-background-contrast: linear-gradient(
      135deg,
      #000000 0%,
      #555555 100%
    );
    --gradient-background-shade: linear-gradient(
      135deg,
      #cccccc 0%,
      #979797 100%
    );
    --gradient-background-tint: linear-gradient(
      135deg,
      #ffffff 0%,
      #fbfbfb 100%
    );
    --gradient-middleground: linear-gradient(135deg, #c8c9cb 0%, #747781 100%);
    --gradient-middleground-subtle: linear-gradient(
      135deg,
      #c8c9cb33 0%,
      #74778133 100%
    );
    --gradient-middleground-contrast: linear-gradient(
      135deg,
      #000000 0%,
      #555555 100%
    );
    --gradient-middleground-shade: linear-gradient(
      135deg,
      #97989a 0%,
      #484b55 100%
    );
    --gradient-middleground-tint: linear-gradient(
      135deg,
      #fbfcfe 0%,
      #a3a6b0 100%
    );
    --gradient-foreground: linear-gradient(135deg, #6b6b6b 0%, #212121 100%);
    --gradient-foreground-subtle: linear-gradient(
      135deg,
      #6b6b6b33 0%,
      #21212133 100%
    );
    --gradient-foreground-contrast: linear-gradient(
      135deg,
      #ffffff 0%,
      #9b9b9b 100%
    );
    --gradient-foreground-shade: linear-gradient(
      135deg,
      #404040 0%,
      #000000 100%
    );
    --gradient-foreground-tint: linear-gradient(
      135deg,
      #999999 0%,
      #484848 100%
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
    --shadow-normal: 0 4px 6px -1px #0000001a, 0 2px 4px -1px #0000000f;
    --shadow-least: 0 1px 2px 0 #0000000d;
    --shadow-lesser: 0 1px 3px 0 #0000001a, 0 1px 2px 0 #0000000f;
    --shadow-greater: 0 10px 15px -3px #0000001a, 0 4px 6px -2px #0000000d;
    --shadow-greatest: 0 20px 25px -5px #0000001a, 0 10px 10px -5px #0000000a;
    --shadow-scarcity: 0 0 0 1px #0000000d;
    --shadow-excess: 0px 0px 0px 1px #0000001a, 0px 5px 10px #00000033,
      0px 15px 40px #00000066;
  }
`;
