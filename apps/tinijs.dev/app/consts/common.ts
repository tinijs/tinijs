export const LOGO_URL = new URL('../assets/logo.svg', import.meta.url).href;

export const GITHUB_CONTENT_PATH =
  'https://github.com/tinijs/tinijs/tree/main/apps/tinijs.dev/content';

export enum UIConsumerTargets {
  Tini = 'Tini',
  Vue = 'Vue',
  React = 'React',
  Angular = 'Angular',
  Svelte = 'Svelte',
  Vanilla = 'Vanilla',
}
