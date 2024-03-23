import {LitElement} from 'lit';
import {property} from 'lit/decorators.js';

import {NO_OUTLET_ROUTER_ERROR} from './consts.js';
import {ActivatedRoute, RouteHook, ElemHook} from './types.js';
import {Router} from './router.js';

export class RouterOutletComponent extends LitElement {
  @property({type: Object}) declare readonly router: Router;
  private currentLayout?: string;
  private currentPage?: string;

  connectedCallback() {
    super.connectedCallback();
    if (!this.router) throw new Error(NO_OUTLET_ROUTER_ERROR);
    this.router.setCallback(this.handleRoute.bind(this));
    this.handleRoute(this.router.match(new URL(location.href)));
  }

  private async handleRoute(activeRoute: ActivatedRoute) {
    const {layoutRoute, pageRoute} = activeRoute;
    // lazy load
    if (layoutRoute?.action) await layoutRoute.action();
    if (pageRoute?.action) await pageRoute.action();
    // render
    const layoutTagName = layoutRoute?.component;
    const pageTagName = pageRoute?.component;
    if (
      layoutTagName === this.currentLayout &&
      pageTagName === this.currentPage
    )
      return;
    if (layoutTagName === this.currentLayout)
      return this.renderPage(activeRoute, pageTagName);
    return this.renderFull(activeRoute, pageTagName, layoutTagName);
  }

  private async renderPage(activeRoute: ActivatedRoute, pageTagName?: string) {
    this.currentPage = pageTagName;
    const rootEl = !this.currentLayout
      ? this.renderRoot
      : this.renderRoot.querySelector(this.currentLayout) || this.renderRoot;
    if (!pageTagName || !rootEl) return;
    return this.renderer(activeRoute, rootEl, pageTagName);
  }

  private async renderFull(
    activeRoute: ActivatedRoute,
    pageTagName?: string,
    layoutTagName?: string
  ) {
    this.currentLayout = layoutTagName;
    this.currentPage = pageTagName;
    let rootEl = this.renderRoot;
    if (!pageTagName || !rootEl) return;
    // layout
    if (layoutTagName) {
      const layoutEl = await this.renderer(activeRoute, rootEl, layoutTagName);
      if (layoutEl) rootEl = layoutEl;
    }
    // page
    return this.renderer(activeRoute, rootEl, pageTagName);
  }

  private async renderer(
    activeRoute: ActivatedRoute,
    rootEl: Element | DocumentFragment,
    newTagName: string
  ) {
    const currentEl = rootEl.firstElementChild as null | HTMLElement;
    const newEl = document.createElement(newTagName);
    // hooks
    const currentBeforeLeave = (currentEl as any)?.onBeforeLeave as ElemHook;
    const currentAfterLeave = (currentEl as any)?.onAfterLeave as ElemHook;
    const newBeforeEnter = (newEl as any)?.onBeforeEnter as ElemHook;
    const newAfterEnter = (newEl as any)?.onAfterEnter as ElemHook;
    // stage 1
    if (
      await this.runBeforeHook(
        currentBeforeLeave,
        activeRoute,
        newEl,
        currentEl
      )
    )
      return;
    if (await this.runBeforeHook(newBeforeEnter, activeRoute, newEl, currentEl))
      return;
    // main action
    rootEl.replaceChildren(newEl);
    // stage 2
    await this.runAfterHook(newAfterEnter, activeRoute, newEl, currentEl);
    await this.runAfterHook(currentAfterLeave, activeRoute, newEl, currentEl);
    // continue
    return newEl;
  }

  private async runBeforeHook(
    hook: undefined | RouteHook,
    activeRoute: ActivatedRoute,
    newEl: HTMLElement,
    currentEl: null | HTMLElement
  ) {
    const hookCommand = !hook
      ? undefined
      : await hook.call(newEl, this.router, activeRoute, newEl, currentEl);
    if (!hookCommand) return false;
    if (typeof hookCommand === 'string') {
      this.router.redirect(hookCommand);
    } else {
      hookCommand();
    }
    return true;
  }

  private async runAfterHook(
    hook: undefined | RouteHook,
    activeRoute: ActivatedRoute,
    newEl: HTMLElement,
    currentEl: null | HTMLElement
  ) {
    if (hook)
      await hook.call(newEl, this.router, activeRoute, newEl, currentEl);
    return false;
  }
}
