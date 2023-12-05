import {adoptStyles} from 'lit';

import {GLOBAL_TINI} from './consts';
import {UseComponentsList, ThemingOptions} from './types';
import {useComponents, getSoulId} from './methods';

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
      soulId ||= getSoulId() as Themes;
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
      adoptStyles(host.shadowRoot || host, styles);
    };
    // scripts
    const unscriptKey = Symbol();
    const applyScripts = (host: any, soulId?: Themes) => {
      soulId ||= getSoulId() as Themes;
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
      if (!GLOBAL_TINI.themingSubscriptions) {
        GLOBAL_TINI.themingSubscriptions = new Map();
      }
      GLOBAL_TINI.themingSubscriptions.set(
        unsubscribeKey,
        ({soulId, prevSoulId}) => {
          if (soulId === prevSoulId) return;
          applyStyles(this, soulId as Themes);
          applyScripts(this, soulId as Themes);
        }
      );
      this[unsubscribeKey] = () =>
        GLOBAL_TINI.themingSubscriptions?.delete(unsubscribeKey);
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
