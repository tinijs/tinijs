import {pathToRegexp, type Key} from 'path-to-regexp';
import {PACKAGE_PREFIX} from '@tinijs/core';

import type {
  Route,
  RouterOptions,
  FragmentManager,
  FragmentActivationOptions,
  FragmentItem,
  RegistryItem,
  MatchResult,
  ActivatedRoute,
} from './types.js';
import {ROUTER_OUTLET_TAG_NAME, ROUTE_CHANGE_EVENT} from './consts.js';
import {go, redirect, back, forward, requestChange} from './methods.js';
import {RouterOutletComponent} from './router-outlet.js';

export class Router {
  private readonly NOT_FOUND_PATH = '/**';
  private readonly registry: Record<string, RegistryItem>;
  private readonly cache = new Map<string, MatchResult>();
  private callback?: (result: MatchResult) => void;

  indicatorSchedule: number | null = null;
  fragmentManager: FragmentManager | null = null;

  constructor(
    public readonly routes: Route[],
    public readonly options: RouterOptions = {}
  ) {
    this.registry = this.buildRegistry(routes);
  }

  init() {
    this.registerOutlet();
    this.registerTriggers();
    return this as Router;
  }

  setCallback(cb: (result: MatchResult) => void) {
    this.callback = cb;
    return this as Router;
  }

  renewFragments(
    container: HTMLElement,
    activation?: false | FragmentActivationOptions
  ) {
    const url = new URL(location.href);
    this.fragmentManager = {
      url,
      container,
      items: Array.from(container.querySelectorAll('[id]')).reduce(
        (result, element) => {
          if (element instanceof HTMLElement && element.id) {
            result[element.id] = element;
          }
          return result;
        },
        {} as Record<string, HTMLElement>
      ),
      options: activation === false ? undefined : activation,
    } as FragmentManager;
    if (activation !== false) {
      setTimeout(
        () => this.goFragment(url.hash.replace(/^#/, '')),
        activation?.delay || 0
      );
    }
    return this as Router;
  }

  retrieveFragments(
    symbolOrExtractor?: string | ((element: HTMLElement) => string)
  ) {
    return Object.entries(this.fragmentManager?.items || {})
      .map(([id, element]) => {
        let title = '';
        if (symbolOrExtractor instanceof Function) {
          title = symbolOrExtractor(element);
        } else {
          title = element?.textContent || '';
          const symbol = symbolOrExtractor || '#';
          if (title.slice(0, symbol.length) === symbol) {
            title = title.slice(symbol.length).trim();
          } else if (title.slice(-symbol.length) === symbol) {
            title = title.slice(0, -symbol.length).trim();
          }
        }
        const level = Number(element.tagName.replace(/^H/i, ''));
        return {
          id,
          title,
          level: isNaN(level) ? 0 : level,
          element,
        } as FragmentItem;
      })
      .filter(item => !!item.title);
  }

  setState(key: string, state: string) {
    sessionStorage.setItem(`${PACKAGE_PREFIX}:router-state-${key}`, state);
    return this as Router;
  }

  getState(key: string) {
    return sessionStorage.getItem(`${PACKAGE_PREFIX}:router-state-${key}`);
  }

  go(to: string, replace?: boolean) {
    return go(to, replace);
  }

  goFragment(to: string, options?: Omit<FragmentActivationOptions, 'delay'>) {
    const {items, options: currentOptions} = this.fragmentManager || {};
    const element = items?.[to];
    if (!element) return false;
    const {
      action,
      behavior = 'smooth',
      block,
      inline,
    } = options || currentOptions || {};
    element.scrollIntoView({behavior, block, inline});
    action?.(element);
    return true;
  }

  redirect(to: string) {
    return redirect(to);
  }

  back() {
    return back();
  }

  forward() {
    return forward();
  }

  requestChange() {
    return requestChange();
  }

  getActiveRoute(): ActivatedRoute {
    return this.match(new URL(location.href));
  }

  getParams() {
    return this.getActiveRoute()?.params || {};
  }

  getQuery() {
    return this.getActiveRoute()?.query || {};
  }

  getFragment() {
    return this.getActiveRoute()?.fragment || '';
  }

  match(url: URL): MatchResult {
    const path = url.pathname;

    /*
     * 1. check cache
     */
    const cachedResult = this.cache.get(path);
    if (cachedResult) return cachedResult;

    /*
     * 2. check routes
     */
    const pathSegments = path.split('/');
    let matched: undefined | RegistryItem;
    let matchedRoutePath: undefined | string;
    let matchedExecResult: null | RegExpExecArray = null;

    // root
    if (!pathSegments[1] && this.registry['/']) {
      matched = this.registry['/'];
    }
    // exact
    else if (this.registry[path]) {
      matched = this.registry[path];
    }
    // route
    else {
      for (const routePath in this.registry) {
        const route = this.registry[routePath];
        const execResult = !route.regexp ? null : route.regexp.exec(path);
        if (execResult) {
          matched = route;
          matchedRoutePath = routePath;
          matchedExecResult = execResult;
          break;
        }
      }
    }

    // 404
    if (!matched) {
      const notFoundPath =
        (!pathSegments[1] ? '/' : `/${pathSegments[1]}/`) +
        this.NOT_FOUND_PATH.replace(/^\//, '');
      matched =
        this.registry[notFoundPath] || this.registry[this.NOT_FOUND_PATH];
    }

    /*
     * 3. result
     */
    const {
      regexp,
      keys,
      params = {},
    } = !matchedRoutePath || !matchedExecResult
      ? ({} as ReturnType<Router['extractParams']>)
      : this.extractParams(matchedRoutePath, matchedExecResult);
    const query = {} as Record<string, any>;
    url.searchParams.forEach((value, key) => {
      if (!/\[\]$/.test(key)) {
        query[key] = value;
      } else {
        key = key.slice(0, -2);
        if (!query[key]) {
          query[key] = [value];
        } else {
          query[key] = Array.isArray(query[key])
            ? query[key].concat(value)
            : [query[key], value];
        }
      }
    });
    const fragment = url.hash.replace(/^#/, '');
    const result: MatchResult = {
      url,
      path,
      routePath: matchedRoutePath,
      regexp,
      keys,
      params,
      query,
      fragment,
      layoutRoute: matched?.layout,
      pageRoute: matched?.page,
    };
    if (matched) this.cache.set(path, result);
    return result;
  }

  private extractParams(routePath: string, execResult: string[]) {
    const keys: Key[] = [];
    const regexp = pathToRegexp(routePath, keys);
    // extract params
    const params = {} as Record<string, any>;
    for (let i = 1; i < execResult.length; i++) {
      const key = keys[i - 1];
      const prop = key.name;
      const value = execResult[i];
      if (value !== undefined || !Object.hasOwnProperty.call(params, prop)) {
        if (key.modifier === '+' || key.modifier === '*') {
          params[prop] = value
            ? value.split(/[/?#]/).map(item => this.decodeParam(item))
            : [];
        } else {
          params[prop] = value ? this.decodeParam(value) : value;
        }
      }
    }
    // result
    return {regexp, keys, params};
  }

  private registerOutlet() {
    if (customElements.get(ROUTER_OUTLET_TAG_NAME)) return;
    customElements.define(ROUTER_OUTLET_TAG_NAME, RouterOutletComponent);
  }

  private registerTriggers() {
    // link trigger
    if (this.options.linkTrigger) {
      addEventListener('click', e => {
        const {
          origin: locationOrigin,
          pathname: locationPathname,
          href: locationHref,
        } = location;
        // pre-check
        if (
          e.defaultPrevented || // the default action is prevented
          e.button !== 0 || // not with the primary mouse button
          // a modifier key is pressed
          e.shiftKey ||
          e.ctrlKey ||
          e.altKey ||
          e.metaKey
        )
          return;
        // process anchor
        let anchor: null | HTMLAnchorElement = null;
        const paths = (
          !e.composedPath ? (e as any).path || [] : e.composedPath()
        ) as HTMLElement[];
        for (let i = 0; i < paths.length; i++) {
          if (paths[i]?.tagName?.toLowerCase() === 'a') {
            anchor = paths[i] as HTMLAnchorElement;
            break;
          }
        }
        // validation
        const testTarget = anchor?.target?.toLowerCase() || '';
        const testHref = anchor?.href?.toLowerCase() || '';
        if (
          !anchor || // no anchor
          (testTarget && testTarget !== '_self') || // has target
          /^javascript:(void\(0\);?)|;$/.test(testHref) || // js void
          testHref.startsWith('mailto:') || // mailto protocol
          testHref.startsWith('tel:') || // tel protocol
          anchor.hasAttribute('download') || // has download
          anchor.hasAttribute('router-ignore') || // has router-ignore
          (anchor.origin || this.getAnchorOrigin(anchor)) !== locationOrigin // cross origin
        )
          return;
        // do navigation
        if (anchor.href !== locationHref) {
          const url = new URL(anchor.href);
          history.pushState({}, '', url.href);
          this.onRouteChanges(url);
        }
        if (anchor.pathname === locationPathname && anchor.hash !== '') {
          this.goFragment(anchor.hash.replace(/^#/, ''));
        } else {
          scrollTo(0, 0);
        }
        e.preventDefault();
      });
    }
    // popstate trigger
    addEventListener('popstate', e => {
      this.onRouteChanges(new URL(location.href));
      e.preventDefault();
    });
  }

  private onRouteChanges(url: URL) {
    if (this.fragmentManager?.url.pathname !== url.pathname) {
      this.fragmentManager = null;
    }
    const detail = this.match(url);
    if (this.callback) this.callback(detail);
    return dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT, {detail}));
  }

  private getAnchorOrigin(anchor: HTMLAnchorElement) {
    const port = anchor.port;
    const protocol = anchor.protocol;
    const defaultHttp = protocol === 'http:' && port === '80';
    const defaultHttps = protocol === 'https:' && port === '443';
    const host =
      defaultHttp || defaultHttps
        ? anchor.hostname // without port
        : anchor.host; // with port
    return `${protocol}//${host}`;
  }

  private decodeParam(val: string) {
    try {
      return decodeURIComponent(val);
    } catch (err) {
      return val;
    }
  }

  private buildRegistry(routes: Route[]) {
    const processPath = (path: string) => path.replace(/^\/|\/$/g, '');
    const is404Path = (id: string) =>
      id.substring(id.length - 3, id.length) === this.NOT_FOUND_PATH;
    return routes.reduce(
      (result, route) => {
        if (!route.children?.length) {
          const id = `/${processPath(route.path)}`;
          result[id] = {
            regexp: is404Path(id) ? undefined : pathToRegexp(id),
            page: route,
          };
        } else {
          route.children.forEach(child => {
            let id =
              (!route.path ? '' : `/${processPath(route.path)}`) +
              (!child.path ? '' : `/${processPath(child.path)}`);
            id ||= '/';
            result[id] = {
              regexp: is404Path(id) ? undefined : pathToRegexp(id),
              page: child,
              layout: route,
            };
          });
        }
        return result;
      },
      {} as Router['registry']
    );
  }
}
