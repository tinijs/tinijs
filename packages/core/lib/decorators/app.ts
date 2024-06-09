import {customElement} from 'lit/decorators/custom-element.js';

import {TiniComponent, ComponentTypes} from '../classes/component.js';

import {GLOBAL_TINI} from '../consts/global.js';
import {APP_ROOT} from '../consts/common.js';
import {DUPLICATED_APP_ERROR, NO_REGISTER_ERROR} from '../consts/error.js';

import {isClass} from '../utils/common.js';
import type {AppOptions} from '../utils/app.js';
import {
  getDIRegistry,
  type DependencyProvider,
  type DependencyDef,
} from '../utils/di.js';
import {LifecycleHooks, registerGlobalHook} from '../utils/hook.js';
import {hideSplashscreen} from '../utils/splashscreen.js';

function ___checkForDIMissingDependencies(
  id: string,
  dependency: any,
  instance: any
) {
  const paramsMatching = !isClass(dependency)
    ? null
    : dependency.toString?.().match(/(constructor\()([\s\S]*?)\)/);
  if (paramsMatching?.[2]) {
    const params = (paramsMatching[2] as string)
      .split(',')
      .map(item => item.trim());
    const missingIds = [];
    for (let j = 0; j < params.length; j++) {
      const param = params[j];
      const memberValue = instance[param];
      if (memberValue === undefined) {
        missingIds.push(param);
      }
    }
    if (missingIds.length) {
      console.error(
        new Error(`
Dependencies are missing from the service [${id}] or provided in a wrong order.
Please provide them in 'app/providers.ts' or correcting its order:
      {
        ${id}: {
          provider: () => import('...'),
          deps: ['${params.join("', '")}']
        }
      }
`)
      );
    }
  }
}

export function App(options: AppOptions = {}) {
  return function (target: any) {
    // register the exit of the app splashscreen
    if (options.splashscreen) {
      registerGlobalHook(
        ComponentTypes.Page,
        LifecycleHooks.OnChildrenReady,
        ({app}) => {
          if (app.options?.splashscreen !== 'auto') return;
          hideSplashscreen();
        }
      );
    }

    // dependencies management
    const dependencyRegistry = getDIRegistry();
    const providers = options.providers || {};
    const providerIds = Object.keys(providers);
    for (let i = 0; i < providerIds.length; i++) {
      const id = providerIds[i];
      const value = providers[id] as any;
      // extract the provider and deps
      const {provider, deps} = !value?.provider
        ? {provider: value as DependencyProvider, deps: []}
        : (value as DependencyDef);
      // the register
      let theRegister = dependencyRegistry.registers.get(id);
      if (theRegister) return; // already registered
      theRegister = async () => {
        let result = dependencyRegistry.instances.get(id);
        // already initialized
        if (result) return;
        // resolve deps
        const depInstances: unknown[] = [];
        if (deps?.length) {
          for (let j = 0; j < deps.length; j++) {
            const depIdOrGetter = deps[j];
            if (depIdOrGetter instanceof Function) {
              depInstances.push(depIdOrGetter());
            } else {
              let depInstance = dependencyRegistry.instances.get(depIdOrGetter);
              if (!depInstance) {
                const theDepRegister =
                  dependencyRegistry.registers.get(depIdOrGetter);
                if (!theDepRegister) throw NO_REGISTER_ERROR(depIdOrGetter);
                depInstance = await theDepRegister();
              }
              depInstances.push(depInstance);
            }
          }
        }
        // result
        const m = await provider();
        const dependency = !m.default ? m : m.default;
        result = !isClass(dependency)
          ? dependency
          : new dependency(...depInstances);
        if (process.env.NODE_ENV === 'development') {
          ___checkForDIMissingDependencies(id, dependency, result);
        }
        return dependencyRegistry.instances.set(id, result).get(id);
      };
      dependencyRegistry.registers.set(id, theRegister).get(id);
    }
    // digest the await queue
    if (dependencyRegistry.awaiters?.length) {
      for (let i = 0; i < dependencyRegistry.awaiters.length; i++) {
        dependencyRegistry.awaiters[i]();
      }
    }

    // target modifications
    const result = class extends target {
      static readonly componentType = ComponentTypes.App;
      static readonly components = options.components;

      readonly options = options;

      constructor(...args: unknown[]) {
        super(...args);
        if (GLOBAL_TINI.clientApp) {
          throw DUPLICATED_APP_ERROR;
        } else {
          GLOBAL_TINI.clientApp = this as unknown as TiniComponent;
        }
      }
    } as any;

    // forward the target
    return customElement(APP_ROOT)(result);
  };
}
