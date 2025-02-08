import {TiniIconElement} from '../ui/elements/icon.js';

export class IconTiniElement extends TiniIconElement {
  static readonly defaultTagName = 'icon-tini';
  static readonly src = new URL(
    '../assets/logo.svg?width=24&height=24',
    import.meta.url
  ).href;
}
