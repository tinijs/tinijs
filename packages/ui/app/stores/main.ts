import {createStore} from '@tinijs/store';

import {
  ConsumerPlatforms,
  ImportMethods,
  IconsImportMethods,
} from '../consts/main.js';

export const mainStore = createStore({
  activeSoulId: 'unknown',
  activeSkinId: 'unknown',
  referImport: ImportMethods.Tini,
  referPlatform: ConsumerPlatforms.Tini,
  referIconsImport: IconsImportMethods.Tini,
  skinEditorShown: false,
});
