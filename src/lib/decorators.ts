import {adoptStyles, ReactiveElement, CSSResult, getCompatibleStyle} from 'lit';

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
    const unstyleKey = Symbol();
    const applyStyles = (host: any, soulId?: Themes) => {
      soulId ||= getSoulId() as Themes;
      // retrieve theme styles
      host.themeStyles = (
        !styling
          ? []
          : !soulId || !styling[soulId]
          ? Object.values(styling)[0]
          : (styling[soulId] as any)
      ).map((style: CSSResult) => getCompatibleStyle(style));
      // affect
      const renderRoot = (host.shadowRoot || host) as ShadowRoot;
      if (host.customAdoptStyles) {
        host.customAdoptStyles(renderRoot);
      } else {
        adoptStyles(renderRoot, [
          ...host.themeStyles,
          ...(host.constructor as typeof ReactiveElement).elementStyles,
          ...(!host.extraStyle ? [] : [host.extraStyle]),
        ]);
      }
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

    // createRenderRoot
    target.prototype.createRenderRoot = function () {
      const renderRoot =
        this.shadowRoot ??
        this.attachShadow(
          (this.constructor as typeof ReactiveElement).shadowRootOptions
        );
      applyStyles(this);
      return renderRoot;
    };

    // connectedCallback / disconnectedCallback
    target.prototype.connectedCallback = function () {
      originalConnectedCallback?.bind(this)();
      // watch for soul change
      if (!GLOBAL_TINI.themingSubscriptions) {
        GLOBAL_TINI.themingSubscriptions = new Map();
      }
      GLOBAL_TINI.themingSubscriptions.set(
        unstyleKey,
        ({soulId, prevSoulId}) => {
          if (soulId === prevSoulId) return;
          applyStyles(this, soulId as Themes);
          applyScripts(this, soulId as Themes);
        }
      );
      this[unstyleKey] = () =>
        GLOBAL_TINI.themingSubscriptions?.delete(unstyleKey);
    };
    target.prototype.disconnectedCallback = function () {
      originalDisconnectedCallback?.bind(this)();
      // unwatch for soul change
      this[unstyleKey]?.();
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
