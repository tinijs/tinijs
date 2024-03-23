import {SPLASHSCREEN_ID} from '../consts/common.js';

export interface SplashscreenComponent extends HTMLElement {
  hide?(): void;
}

export function getSplashscreen() {
  return document.getElementById(SPLASHSCREEN_ID) || undefined;
}

export function hideSplashscreen() {
  const node = getSplashscreen() as SplashscreenComponent;
  if (!node) return;
  if (node.hide instanceof Function) {
    node.hide();
  } else {
    node.remove();
  }
}
