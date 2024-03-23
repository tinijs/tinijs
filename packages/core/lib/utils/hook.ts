import {PropertyValues} from 'lit';

import {GLOBAL_TINI} from '../consts/global.js';

import {TiniComponent, ComponentTypes} from '../classes/component.js';

import {ClientApp, getApp} from './app.js';

export enum LifecycleHooks {
  OnCreate = 'onCreate',
  OnDestroy = 'onDestroy',
  OnInit = 'onInit',
  OnReady = 'onReady',
  OnChanges = 'onChanges',
  OnFirstRender = 'onFirstRender',
  OnRenders = 'onRenders',
  OnChildrenRender = 'onChildrenRender',
  OnChildrenReady = 'onChildrenReady',
}

export interface OnCreate {
  onCreate(): void; // connectedCallback()
}
export interface OnDestroy {
  onDestroy(): void; // disconnectedCallback()
}
export interface OnInit {
  onInit(): void | Promise<void>;
}
export interface OnReady {
  onReady(): void;
}
export interface OnChanges {
  onChanges(changedProperties: PropertyValues<unknown>): void; // willUpdate()
}
export interface OnFirstRender {
  onFirstRender(changedProperties: PropertyValues<unknown>): void; // firstUpdated()
}
export interface OnRenders {
  onRenders(changedProperties: PropertyValues<unknown>): void; // updated()
}
export interface OnChildrenRender {
  onChildrenRender(): void; // children first render
}
export interface OnChildrenReady {
  onChildrenReady(): void;
}

export type GlobalLifecycleHook = (data: {
  source: TiniComponent;
  app: ClientApp;
}) => void;

export type LHRegistry = Record<
  ComponentTypes,
  Record<LifecycleHooks, GlobalLifecycleHook[]>
>;

export function registerGlobalHook(
  componentTypeOrTypes: ComponentTypes | ComponentTypes[],
  hookCycleOrCycles: LifecycleHooks | LifecycleHooks[],
  hookAction: GlobalLifecycleHook
) {
  // init the registry
  const registry = (GLOBAL_TINI.LHRegistry ||= {} as LHRegistry);
  // cycles & types
  const componentTypes =
    typeof componentTypeOrTypes === 'string'
      ? [componentTypeOrTypes]
      : componentTypeOrTypes;
  const hookCycles =
    typeof hookCycleOrCycles === 'string'
      ? [hookCycleOrCycles]
      : hookCycleOrCycles;
  // organize
  for (let i = 0; i < componentTypes.length; i++) {
    const type = componentTypes[i];
    if (!registry[type]) registry[type] = {} as any;
    for (let j = 0; j < hookCycles.length; j++) {
      const cycle = hookCycles[j];
      if (!registry[type][cycle]) registry[type][cycle] = [];
      registry[type][cycle].push(hookAction);
    }
  }
  // result
  return registry;
}

export function getGlobalHooks(type: ComponentTypes, cycle: LifecycleHooks) {
  return GLOBAL_TINI.LHRegistry?.[type]?.[cycle];
}

export function runGlobalHooks(
  cycle: LifecycleHooks,
  component: TiniComponent
) {
  const globalHooks = getGlobalHooks(
    (component.constructor as any).componentType as ComponentTypes,
    cycle
  );
  const data = {
    source: component,
    app: getApp(),
  };
  globalHooks?.forEach(action => action(data));
  return globalHooks;
}
