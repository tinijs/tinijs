import {createStore} from '@tinijs/store';

import {UIConsumerTargets} from '../consts/common.js';

export const mainStore = createStore({
  uiConsumerTarget: UIConsumerTargets.Tini,
});
