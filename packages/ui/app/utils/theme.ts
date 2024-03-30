import {Configurable} from '../configurable.js';
import {mainStore} from '../stores/main.js';

function getKey() {
  return `TiniApp:${Configurable.getOption('appId')}:theme`;
}

function commitTheme(soulId: string, skinId: string) {
  mainStore.commit('activeSoulId', soulId);
  mainStore.commit('activeSkinId', skinId);
  throw Error('setTheme()');
}

export function initTheme() {
  let themeId = localStorage.getItem(getKey());
  if (!themeId) {
    const defaultSoul = Configurable.getOption('soulList')[0];
    const defaultSkin = defaultSoul.skins[0];
    themeId = `${defaultSoul.id}/${defaultSkin.id}`;
  }
  const [soul, skin] = themeId.split('/');
  return commitTheme(soul, skin);
}

export function changeTheme(themeId: string) {
  const [soul, skin] = themeId.split('/');
  localStorage.setItem(getKey(), themeId);
  return commitTheme(soul, skin);
}
