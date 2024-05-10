import {TiniElement} from '../classes/element.js';

export type RegisterComponentsList = Array<
  CustomElementConstructor | [CustomElementConstructor, string]
>;

export enum UnstableStates {
  Experimental = 'experimental',
  Deprecated = 'deprecated',
}

export type ComponentLoaderRegistryEntry =
  () => Promise<CustomElementConstructor>;

export type ComponentLoaderRegistry = Record<
  string,
  | ComponentLoaderRegistryEntry
  | {load: ComponentLoaderRegistryEntry; tagName: string}
>;

export type ComponentLoaderExtractLookup = {
  prefixes?: Array<string | {prefix: string; keep?: boolean}>;
};

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

export function registerComponents(items: RegisterComponentsList) {
  return items.forEach(item => {
    const useCustomTagName = item instanceof Array;
    const [constructor, tagName] = useCustomTagName
      ? item
      : [item, (item as any).defaultTagName];
    if (!tagName || !constructor || customElements.get(tagName)) return;
    customElements.define(
      tagName,
      !useCustomTagName ? constructor : class extends constructor {}
    );
    if (process.env.NODE_ENV === 'development') {
      ___checkForUnstableComponent(tagName, constructor as typeof TiniElement);
    }
  });
}

export function createComponentLoader(registry?: ComponentLoaderRegistry) {
  return new ComponentLoader(registry);
}

export class ComponentLoader {
  constructor(private readonly registry: ComponentLoaderRegistry = {}) {}

  async load(names: string[]) {
    const registerList: RegisterComponentsList = [];
    for (const name of names) {
      const entry = this.registry[name];
      if (!entry) throw new Error(`No entry found for component ${name}`);
      const {load, tagName: customTagName} =
        entry instanceof Function ? {load: entry, tagName: undefined} : entry;
      // load the component and register it
      const component = await load();
      const tagName = customTagName || (component as any).defaultTagName;
      if (!tagName)
        throw new Error('No tag name available for component ${name}');
      registerList.push(!customTagName ? component : [component, tagName]);
    }
    registerComponents(registerList);
  }

  async extractAndLoad(
    sources: string | Array<string | string[]>,
    lookup: ComponentLoaderExtractLookup
  ) {
    const sourceArr = sources instanceof Array ? sources : [sources];
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
