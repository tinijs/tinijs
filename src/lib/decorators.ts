import {adoptStyles} from 'lit';

import {GLOBAL} from './consts';
import {UseComponentsList, ThemingOptions} from './types';
import {useComponents} from './methods';

export function Components(items: UseComponentsList) {
  return function (target: any) {
    return class extends target {
      readonly constructorName = target.name;
      constructor(...args: unknown[]) {
        super(...args);
        useComponents(items);
      }
    };
  };
}

export function Theming<Themes extends string>({
  styling,
  scripting,
}: ThemingOptions<Themes>) {
  return function (target: any) {
    // originals
    const originalConnectedCallback = target.prototype.connectedCallback;
    const originalDisconnectedCallback = target.prototype.disconnectedCallback;
    const originalUpdated = target.prototype.updated;
    // styles
    const unsubscribeKey = Symbol();
    const applyStyles = (host: any, soulId?: Themes) => {
      soulId ||= document.body.dataset.theme?.split('/')[0] as Themes;
      // retrieve styles
      const originalStyles = target.styles || [];
      const styles = (
        !styling
          ? []
          : !soulId || !styling[soulId]
          ? Object.values(styling)[0]
          : (styling[soulId] as any)
      ).concat(
        originalStyles instanceof Array ? originalStyles : [originalStyles]
      );
      // affect
      adoptStyles(host.shadowRoot, styles);
    };
    // scripts
    const unscriptKey = Symbol();
    const applyScripts = (host: any, soulId?: Themes) => {
      soulId ||= document.body.dataset.theme?.split('/')[0] as Themes;
      // retrieve scripts
      const scripts: any = !scripting
        ? {}
        : !soulId || !scripting[soulId]
        ? Object.values(scripting)[0]
        : scripting[soulId];
      // affect
      if (host[unscriptKey]) host[unscriptKey](host);
      if (scripts?.unscript) host[unscriptKey] = scripts.unscript;
      if (scripts?.script) scripts.script(host);
    };

    // connected/disconnected
    target.prototype.connectedCallback = function () {
      originalConnectedCallback?.bind(this)();
      // watch for soul change
      if (!GLOBAL.$tiniThemingSubscriptions) {
        GLOBAL.$tiniThemingSubscriptions = new Map();
      }
      GLOBAL.$tiniThemingSubscriptions.set(unsubscribeKey, soul => {
        applyStyles(this, soul as Themes);
        applyScripts(this, soul as Themes);
      });
      this[unsubscribeKey] = () =>
        GLOBAL.$tiniThemingSubscriptions?.delete(unsubscribeKey);
      // apply styles
      applyStyles(this);
    };
    target.prototype.disconnectedCallback = function () {
      originalDisconnectedCallback?.bind(this)();
      // unwatch for soul change
      this[unsubscribeKey]?.();
    };

    // updated
    target.prototype.updated = function (...params: any[]) {
      originalUpdated?.bind(this)(...params);
      // apply scripts
      applyScripts(this);
    };

    return target;
  };
}
