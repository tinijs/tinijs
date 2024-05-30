import {css} from 'lit';

/* eslint-disable prettier/prettier */
export default css`:root {
  /* fonts */
  --font-head: Geist, sans-serif;
  --font-body: Geist, sans-serif;
  --font-art: 'Brush Script MT', cursive;
  --font-code: "Geist Mono", monospace;
  /* colors */
  --color-back: #fafafa;
  --color-back-subtle: #fafafa33;
  --color-back-contrast: #000000;
  --color-back-shade: #d4d4d4;
  --color-back-tint: #ffffff;
  --color-middle: #71717b;
  --color-middle-subtle: #71717b33;
  --color-middle-contrast: #ffffff;
  --color-middle-shade: #50505a;
  --color-middle-tint: #94949e;
  --color-front: #0a0a0b;
  --color-front-subtle: #0a0a0b33;
  --color-front-contrast: #ffffff;
  --color-front-shade: #000000;
  --color-front-tint: #282829;
  --color-primary: #18181a;
  --color-primary-subtle: #18181a33;
  --color-primary-contrast: #ffffff;
  --color-primary-shade: #000000;
  --color-primary-tint: #343436;
  --color-secondary: #64748b;
  --color-secondary-subtle: #64748b33;
  --color-secondary-contrast: #ffffff;
  --color-secondary-shade: #435369;
  --color-secondary-tint: #8697af;
  --color-info: #2563eb;
  --color-info-subtle: #2563eb33;
  --color-info-contrast: #ffffff;
  --color-info-shade: #0044c4;
  --color-info-tint: #6084ff;
  --color-success: #17a34a;
  --color-success-subtle: #17a34a33;
  --color-success-contrast: #ffffff;
  --color-success-shade: #007f29;
  --color-success-tint: #4cc96c;
  --color-warning: #facc15;
  --color-warning-subtle: #facc1533;
  --color-warning-contrast: #000000;
  --color-warning-shade: #d0a700;
  --color-warning-tint: #fff249;
  --color-danger: #e11e49;
  --color-danger-subtle: #e11e4933;
  --color-danger-contrast: #ffffff;
  --color-danger-shade: #b6002b;
  --color-danger-tint: #ff5069;
  /* gradients */
  --gradient-back: linear-gradient(90deg, #ffffff 0%, #f4f4f5 100%);
  --gradient-back-subtle: linear-gradient(90deg, #ffffff33 0%, #f4f4f533 100%);
  --gradient-back-contrast: linear-gradient(90deg, #000000 0%, #555555 100%);
  --gradient-back-shade: linear-gradient(90deg, #d8d8d8 0%, #cececf 100%);
  --gradient-back-tint: linear-gradient(90deg, #ffffff 0%, #ffffff 100%);
  --gradient-middle: linear-gradient(90deg, #f4f4f5 0%, #71717b 100%);
  --gradient-middle-subtle: linear-gradient(90deg, #f4f4f533 0%, #71717b33 100%);
  --gradient-middle-contrast: linear-gradient(90deg, #000000 0%, #555555 100%);
  --gradient-middle-shade: linear-gradient(90deg, #cececf 0%, #50505a 100%);
  --gradient-middle-tint: linear-gradient(90deg, #ffffff 0%, #94949e 100%);
  --gradient-front: linear-gradient(90deg, #71717b 0%, #0a0a0b 100%);
  --gradient-front-subtle: linear-gradient(90deg, #71717b33 0%, #0a0a0b33 100%);
  --gradient-front-contrast: linear-gradient(90deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-front-shade: linear-gradient(90deg, #50505a 0%, #000000 100%);
  --gradient-front-tint: linear-gradient(90deg, #94949e 0%, #282829 100%);
  --gradient-primary: linear-gradient(90deg, #71717b 0%, #18181a 100%);
  --gradient-primary-subtle: linear-gradient(90deg, #71717b33 0%, #18181a33 100%);
  --gradient-primary-contrast: linear-gradient(90deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-primary-shade: linear-gradient(90deg, #50505a 0%, #000000 100%);
  --gradient-primary-tint: linear-gradient(90deg, #94949e 0%, #343436 100%);
  --gradient-secondary: linear-gradient(90deg, #64748b 0%, #6b7280 100%);
  --gradient-secondary-subtle: linear-gradient(90deg, #64748b33 0%, #6b728033 100%);
  --gradient-secondary-contrast: linear-gradient(90deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-secondary-shade: linear-gradient(90deg, #435369 0%, #4a515e 100%);
  --gradient-secondary-tint: linear-gradient(90deg, #8697af 0%, #8d95a3 100%);
  --gradient-info: linear-gradient(90deg, #11caf0 0%, #3880ff 100%);
  --gradient-info-subtle: linear-gradient(90deg, #11caf033 0%, #3880ff33 100%);
  --gradient-info-contrast: linear-gradient(90deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-info-shade: linear-gradient(90deg, #00a5ca 0%, #005fd8 100%);
  --gradient-info-tint: linear-gradient(90deg, #5bf0ff 0%, #6da3ff 100%);
  --gradient-success: linear-gradient(90deg, #2dd36f 0%, #17a34a 100%);
  --gradient-success-subtle: linear-gradient(90deg, #2dd36f33 0%, #17a34a33 100%);
  --gradient-success-contrast: linear-gradient(90deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-success-shade: linear-gradient(90deg, #00ad4d 0%, #007f29 100%);
  --gradient-success-tint: linear-gradient(90deg, #61fa93 0%, #4cc96c 100%);
  --gradient-warning: linear-gradient(90deg, #facc15 0%, #f0b400 100%);
  --gradient-warning-subtle: linear-gradient(90deg, #facc1533 0%, #f0b40033 100%);
  --gradient-warning-contrast: linear-gradient(90deg, #000000 0%, #555555 100%);
  --gradient-warning-shade: linear-gradient(90deg, #d0a700 0%, #c69000 100%);
  --gradient-warning-tint: linear-gradient(90deg, #fff249 0%, #ffd93e 100%);
  --gradient-danger: linear-gradient(90deg, #eb445a 0%, #dc2626 100%);
  --gradient-danger-subtle: linear-gradient(90deg, #eb445a33 0%, #dc262633 100%);
  --gradient-danger-contrast: linear-gradient(90deg, #ffffff 0%, #9b9b9b 100%);
  --gradient-danger-shade: linear-gradient(90deg, #c00f3b 0%, #b00007 100%);
  --gradient-danger-tint: linear-gradient(90deg, #ff6c7b 0%, #ff5345 100%);
  /* sizes */
  --size-md: 14px;
  --text-md: 16px;
  --space-md: 1rem;
  --radius-md: 6px;
  --border-md: 1px;
  --ring-md: 1px;
  --line-md: 1.75;
  --letter-md: normal;
  /* shadows */
  --shadow-scarcity: 0 0 0 1px #0a0a0b0d;
  --shadow-tiny: 0 1px 2px 0 #0a0a0b0d;
  --shadow-small: 0 1px 3px 0 #0a0a0b1a, 0 1px 2px 0 #0a0a0b0f;
  --shadow-medium: 0 4px 6px -1px #0a0a0b1a, 0 2px 4px -1px #0a0a0b0f;
  --shadow-big: 0 10px 15px -3px #0a0a0b1a, 0 4px 6px -2px #0a0a0b0d;
  --shadow-huge: 0 20px 25px -5px #0a0a0b1a, 0 10px 10px -5px #0a0a0b0a;
  --shadow-excess: 0px 0px 0px 1px #0a0a0b1a, 0px 5px 10px #0a0a0b33, 0px 15px 40px #0a0a0b66;
}`;
/* eslint-enable prettier/prettier */
