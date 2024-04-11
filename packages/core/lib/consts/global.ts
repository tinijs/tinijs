import {CSSResultOrNative} from 'lit';

import {UI} from '../classes/ui.js';

import {ClientApp} from '../utils/app.js';
import {DIRegistry} from '../utils/di.js';
import {LHRegistry} from '../utils/hook.js';

export const GLOBAL_TINI = ((globalThis as Record<string, unknown>).TiniJS ||=
  {}) as {
  // ui
  cachedGenericStyles?: Record<string, undefined | CSSResultOrNative[]>;
  cachedGenericUnscopedStyles?: Record<string, undefined | string[]>;
  ui?: UI;
  // app
  DIRegistry?: DIRegistry;
  LHRegistry?: LHRegistry;
  clientApp?: ClientApp;
};
