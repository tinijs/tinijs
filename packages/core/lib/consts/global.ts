import type {CSSResultOrNative} from 'lit';

import {UI} from '../classes/ui.js';

import type {ClientApp} from '../utils/app.js';
import type {DIRegistry} from '../utils/di.js';
import type {LHRegistry} from '../utils/hook.js';

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
