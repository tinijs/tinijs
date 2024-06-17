import {UI} from '../classes/ui.js';

import type {ClientApp} from '../utils/app.js';
import type {DIRegistry} from '../utils/di.js';
import type {LHRegistry} from '../utils/hook.js';

export const GLOBAL_TINI = ((globalThis as Record<string, unknown>).TiniJS ||=
  {}) as {
  // ui
  ui?: UI;
  // app
  DIRegistry?: DIRegistry;
  LHRegistry?: LHRegistry;
  clientApp?: ClientApp;
};
