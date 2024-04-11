import {SPLASHSCREEN_ID} from '../consts/common.js';

export interface SplashscreenComponent extends HTMLElement {
  hide?(): void;
}

export function getSplashscreen() {
  const node = document.getElementById(SPLASHSCREEN_ID);
  if (!node) throw new Error('Splashscreen not found');
  return node as SplashscreenComponent;
}

export function hideSplashscreen() {
  const node = getSplashscreen();
  if (node.hide instanceof Function) {
    node.hide();
  } else {
    node.remove();
  }
}
