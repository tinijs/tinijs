import {TiniElement} from '../classes/element.js';

export type RegisterComponentsList = Array<
  CustomElementConstructor | [CustomElementConstructor, string]
>;

export enum UnstableStates {
  Experimental = 'experimental',
  Deprecated = 'deprecated',
}

export type ComponentLoaderRegistryEntry = () => Promise<
  CustomElementConstructor | Record<string, any>
>;

export type ComponentLoaderRegistry = Record<
  string,
  | ComponentLoaderRegistryEntry
  | {load: ComponentLoaderRegistryEntry; tagName: string}
>;

export type ComponentLoaderExtractLookup = {
  prefixes?: Array<string | {prefix: string; keep?: boolean}>;
};

export function isCustomElementConstructor(
  input: any
): input is CustomElementConstructor {
  return input?.prototype instanceof HTMLElement;
}

export function getFirstCustomElementConstructor(m: Record<string, any>) {
  return Object.values(m).find(isCustomElementConstructor);
}

export function ___checkForUnstableComponent(
  tagName: string,
  {
    componentName = 'unknown',
    componentMetadata: {unstable, unstableMessage},
  }: typeof TiniElement
) {
  if (unstable) {
    const messages = [
      `The "${componentName}" (<${tagName}>) component is ${unstable.toUpperCase()}.`,
    ];
    messages.push(
      {
        [UnstableStates.Experimental]:
          'Its API is not stable and may change in the future.',
        [UnstableStates.Deprecated]:
          'It is no longer recommended and will be removed in the future.',
      }[unstable]
    );
    if (unstableMessage) messages.push(unstableMessage);
    console.warn(messages.filter(Boolean).join(' '));
  }
}

export function registerComponents(
  list: RegisterComponentsList,
  resolvePending?: true | (() => void)
) {
  const result: Record<string, CustomElementConstructor> = {};
  // register components
  list.forEach(item => {
    const useCustomTagName = item instanceof Array;
    const [originalConstructor, tagName] = useCustomTagName
      ? item
      : [item, (item as any).defaultTagName];
    if (!tagName || !originalConstructor) return;
    const constructor = !useCustomTagName
      ? originalConstructor
      : class extends originalConstructor {};
    result[tagName] = constructor;
    if (customElements.get(tagName)) return;
    customElements.define(tagName, constructor);
    if (process.env.NODE_ENV === 'development') {
      ___checkForUnstableComponent(
        tagName,
        originalConstructor as typeof TiniElement
      );
    }
  });
  // resolve pending components
  if (resolvePending === true) {
    document.body.removeAttribute('hidden');
  } else if (resolvePending instanceof Function) {
    resolvePending();
  }
  // result
  return result;
}

export async function resolvePendingComponents(
  tagNames: string[],
  customResolver?: () => void
) {
  await Promise.allSettled(
    tagNames.map(tagName => customElements.whenDefined(tagName))
  );
  if (customResolver) return customResolver();
  return document.body.removeAttribute('hidden');
}

export function createComponentLoader(
  registry?: ComponentLoaderRegistry,
  extractLookup?: ComponentLoaderExtractLookup
) {
  return new ComponentLoader(registry, extractLookup);
}

export class ComponentLoader {
  constructor(
    private readonly registry: ComponentLoaderRegistry = {},
    private readonly extractLookup?: ComponentLoaderExtractLookup
  ) {}

  async load(names: string[]) {
    const registerList: RegisterComponentsList = [];
    for (const name of names) {
      const entry = this.registry[name];
      if (!entry) throw new Error(`No entry found for component ${name}`);
      const {load, tagName: customTagName} =
        entry instanceof Function ? {load: entry, tagName: undefined} : entry;
      // load the component and register it
      const constructorOrModule = await load();
      const component = isCustomElementConstructor(constructorOrModule)
        ? constructorOrModule
        : getFirstCustomElementConstructor(constructorOrModule);
      if (!component) throw new Error(`No constructor found for ${name}`);
      const tagName = customTagName || (component as any).defaultTagName;
      if (!tagName)
        throw new Error('No tag name available for component ${name}');
      registerList.push(!customTagName ? component : [component, tagName]);
    }
    registerComponents(registerList);
  }

  async extractAndLoad(
    sources: string | Array<string | string[]>,
    customLookup?: ComponentLoaderExtractLookup
  ) {
    const sourceArr = sources instanceof Array ? sources : [sources];
    const lookup = customLookup || this.extractLookup || {};
    const result: string[] = [];
    for (const source of sourceArr) {
      if (source instanceof Array) {
        result.push(...source);
      } else {
        // prefix strategy
        if (lookup.prefixes) {
          const names = lookup.prefixes.reduce((result, item) => {
            const {prefix, keep} =
              item instanceof Object ? item : {prefix: item, keep: false};
            const tagPrefix =
              prefix.slice(-1) !== '-' ? prefix : prefix.slice(0, -1);
            const matchArray = source.match(
              new RegExp(`(<${tagPrefix}-)([\\s\\S]*?)( |>)`, 'g')
            );
            if (matchArray) {
              result.push(
                ...matchArray.map(matchItem =>
                  matchItem.slice(keep ? 1 : tagPrefix.length + 2, -1)
                )
              );
            }
            return result;
          }, [] as string[]);
          result.push(...names);
        }
      }
    }
    return this.load(result);
  }
}
