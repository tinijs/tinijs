import {Key} from 'path-to-regexp';

import {Router} from './router.js';

export interface Route {
  title?: string;
  path: string;
  component: string;
  action?: () => Promise<unknown>;
  children?: Omit<Route, 'children'>[];
  data?: Record<string, any>;
}

export interface FragmentManager {
  url: URL;
  container: HTMLElement;
  items: Record<string, HTMLElement>;
  options?: FragmentActivationOptions;
}

export interface FragmentActivationOptions extends ScrollIntoViewOptions {
  delay?: number;
  action?: (element: HTMLElement) => void;
}

export interface FragmentItem {
  id: string;
  title: string;
  level: number;
  element: HTMLElement;
}

export interface RegistryItem {
  page: Route;
  layout?: Route;
  regexp?: RegExp;
}

export interface RouterOptions {
  linkTrigger?: boolean;
  navIndicator?: boolean;
}

export interface MatchResult {
  url: URL;
  path: string;
  routePath?: string;
  regexp?: RegExp;
  keys?: Key[];
  params?: Record<string, any>;
  query?: Record<string, any>;
  fragment?: string;
  pageRoute?: Route;
  layoutRoute?: Route;
}

export type ActivatedRoute = MatchResult;

export interface NavIndicatorComponent extends HTMLElement {
  show?(): void;
  hide?(): void;
}

export type RouteCommand = () => void;

export type RouteHookResult =
  | void
  | null
  | string
  | RouteCommand
  | Promise<void | null | string | RouteCommand>;

export type RouteHook = (
  router: Router,
  activeRoute: MatchResult,
  newEl: HTMLElement,
  currentEl: null | HTMLElement
) => RouteHookResult;

export type ElemHook = undefined | RouteHook;

export interface AppWithRouter {
  router: Router;
}

export interface OnBeforeLeave {
  onBeforeLeave: RouteHook;
}

export interface OnBeforeEnter {
  onBeforeEnter: RouteHook;
}

export interface OnAfterEnter {
  onAfterEnter: RouteHook;
}

export interface OnAfterLeave {
  onAfterLeave: RouteHook;
}
