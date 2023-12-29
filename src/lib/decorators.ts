import {RegisterComponentsList, ThemingOptions} from './types';
import {registerComponents} from './methods';
import {TiniElement} from './main';

export function TiniElementComponents(items: RegisterComponentsList) {
  return function (target: typeof TiniElement) {
    return class extends target {
      connectedCallback() {
        registerComponents(items);
        super.connectedCallback();
      }
    } as any;
  };
}

export function TiniElementTheming<ThemeId extends string>(
  theming: ThemingOptions<ThemeId>
) {
  return function (target: typeof TiniElement) {
    return class extends target {
      static readonly theming = theming;
    } as any;
  };
}
