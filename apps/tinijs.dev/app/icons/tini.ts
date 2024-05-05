import {TiniIconComponent} from '../ui/components/icon.js';

export class IconTiniComponent extends TiniIconComponent {
  static readonly defaultTagName = 'icon-tini';
  static readonly src = new URL(
    '../assets/logo.svg?width=24&height=24',
    import.meta.url
  ).href;
}
