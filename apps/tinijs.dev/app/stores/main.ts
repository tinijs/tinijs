import {createStore} from '@tinijs/store';

import {UIConsumerTargets} from '../consts/common.js';

export const MAIN_STORE = createStore({
  uiConsumerTarget: UIConsumerTargets.Tini,
  skinEditorShown: false,
});
