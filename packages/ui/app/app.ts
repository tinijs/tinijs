import {App} from '@tinijs/core';

// import {TiniCodeComponent} from '../.ui/components/code.js';

import {AppRootTemplate} from './root-template.js';

import {
  prismHighlight,
  prismThemeLight,
  prismThemeDark,
} from './utils/prism.js';
import {
  hljsHighlight,
  hljsThemeLight,
  hljsThemeDark,
} from './utils/highlight.js';

@App({
  // uiOptions: {
  //   // '*': {
  //   //   [TiniCodeComponent.componentName]: {
  //   //     engine: 'hljs',
  //   //     highlight: hljsHighlight,
  //   //     theme: hljsThemeLight,
  //   //   },
  //   // },
  //   'bootstrap/light': {
  //     [TiniCodeComponent.componentName]: {
  //       engine: 'hljs',
  //       highlight: hljsHighlight,
  //       theme: hljsThemeLight,
  //     },
  //   },
  //   'bootstrap/dark': {
  //     // referGradientScheme: true,
  //     // [TiniButtonComponent.componentName]: {
  //     //   referGradientSchemeOnHover: true,
  //     // },
  //     [TiniCodeComponent.componentName]: {
  //       engine: 'hljs',
  //       highlight: hljsHighlight,
  //       theme: hljsThemeDark,
  //     },
  //   },
  //   'bootstrap/retro-light': {
  //     [TiniCodeComponent.componentName]: {
  //       engine: 'prism',
  //       highlight: prismHighlight,
  //       theme: prismThemeLight,
  //     },
  //   },
  //   'bootstrap/retro-dark': {
  //     [TiniCodeComponent.componentName]: {
  //       engine: 'prism',
  //       highlight: prismHighlight,
  //       theme: prismThemeDark,
  //     },
  //   },
  // },
})
export class AppRoot extends AppRootTemplate {}
