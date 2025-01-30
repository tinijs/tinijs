import {html, css, type CSSResult} from 'lit';
import {property} from 'lit/decorators/property.js';
import normalizeUrl from 'normalize-url';
import {pathToRegexp} from 'path-to-regexp';

import {
  TiniElement,
  createStyleBuilder,
  parseColorValue,
  parseSingleSpaceValue,
} from '@tinijs/core';
import {ROUTE_CHANGE_EVENT} from '@tinijs/router';

import {parseDecorationValue} from './text.js';

type ComponentConstructor = typeof import('./link.js').default;

export interface LinkStyleProps {
  block?: boolean;
  color?: string;
  decoration?: string;
  underlineOffset?: string;
  opacity?: string;
}

export default class extends TiniElement {
  static readonly componentMetadata = {
    restyleAtUpdate: true,
  };

  role = 'link';

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) href!: string;
  @property({type: String, reflect: true}) target?: string;
  @property({type: String, reflect: true}) rel?: string;
  @property({type: String, reflect: true}) download?: string;
  @property({type: String, reflect: true}) referrerpolicy?: string;
  @property({type: String, reflect: true}) hreflang?: string;
  @property({type: String, reflect: true}) type?: string;
  @property({type: Boolean, reflect: true}) disabled = false;
  // active
  @property({type: Boolean, reflect: true}) activeStarts = false;
  @property({type: String, reflect: true}) activeStartsWith?: string;
  @property({type: String, reflect: true}) activeEndsWith?: string;
  @property({type: Array, reflect: true}) activePatterns?: string[];
  @property({type: Boolean, reflect: true}) activeIncludeQuery = false;
  // styles
  @property({type: Boolean, reflect: true}) block: LinkStyleProps['block'] = false;
  @property({type: String, reflect: true}) color?: LinkStyleProps['color'];
  @property({type: String, reflect: true}) decoration?: LinkStyleProps['decoration'];
  @property({type: String, reflect: true}) underlineOffset?: LinkStyleProps['underlineOffset'];
  @property({type: String, reflect: true}) opacity?: LinkStyleProps['opacity'];
  // pseudo
  @property({type: Object, reflect: true}) hover?: LinkStyleProps;
  @property({type: Object, reflect: true}) active?: LinkStyleProps & {hover?: LinkStyleProps};
  /* eslint-enable prettier/prettier */

  private anchorElement?: HTMLAnchorElement;
  private renewLinkElement() {
    const a = document.createElement('a');
    a.href = this.href;
    if (this.target) a.target = this.target;
    if (this.rel) a.rel = this.rel;
    if (this.download) a.download = this.download;
    if (this.referrerpolicy) a.referrerPolicy = this.referrerpolicy;
    if (this.hreflang) a.hreflang = this.hreflang;
    if (this.type) a.type = this.type;
    return (this.anchorElement = a);
  }

  private static cachedActiveStatuses: Record<string, Record<string, boolean>> =
    {};
  private getActiveStatus() {
    const locationURL = new URL(location.href);
    const linkURL = new URL(
      this.href,
      `${location.origin}${location.pathname}`
    );
    // 0. ignore
    if (
      this.href === '#' || // empty hash
      (this.target && this.target !== '_self') || // has target
      /^javascript:(void\(0\);?)|;$/.test(linkURL.href) || // js void
      linkURL.href.startsWith('mailto:') || // mailto protocol
      linkURL.href.startsWith('tel:') || // tel protocol
      this.download || // has download
      linkURL.origin !== locationURL.origin // cross origin
    )
      return false;
    // 1. from cache
    const normalizedLocation = normalizeUrl(locationURL.href);
    const normalizedLink = normalizeUrl(linkURL.href);
    const cachedActiveStatuses = (this.constructor as ComponentConstructor)
      .cachedActiveStatuses;
    const modeArr = this.activePatterns?.length
      ? this.activePatterns // A. patterns
      : this.activeEndsWith
        ? [this.activeStartsWith || '$starts$', this.activeEndsWith] // B. ends with & starts with (or default starts)
        : this.activeStartsWith
          ? [this.activeStartsWith] // C. starts with
          : this.activeStarts
            ? ['$starts$'] // D. default starts
            : ['$full$']; // E. full
    const cacheKey = [normalizedLink, ...modeArr].join('///');
    if (cachedActiveStatuses[cacheKey]?.[normalizedLocation] !== undefined) {
      return cachedActiveStatuses[cacheKey][normalizedLocation];
    }
    // 2. no cache
    const normalizedLocationURL = new URL(normalizedLocation);
    const normalizedLinkURL = new URL(
      normalizedLink,
      `${location.origin}${location.pathname}`
    );
    const locationValue = `${normalizedLocationURL.pathname}${
      !this.activeIncludeQuery ? '' : normalizedLocationURL.search
    }`;
    const linkValue = `${normalizedLinkURL.pathname}${
      !this.activeIncludeQuery ? '' : normalizedLinkURL.search
    }`;
    return ((cachedActiveStatuses[cacheKey] ||= {})[normalizedLocation] = this
      .activePatterns?.length
      ? this.activePatterns.some(
          item => !!pathToRegexp(item).exec(locationValue)
        ) // A. patterns
      : this.activeEndsWith
        ? locationValue.endsWith(this.activeEndsWith) &&
          locationValue.startsWith(
            this.activeStartsWith || normalizedLinkURL.pathname
          ) // B. ends with & starts with (or default starts)
        : this.activeStartsWith
          ? locationValue.startsWith(this.activeStartsWith) // C. starts with
          : this.activeStarts
            ? locationValue.startsWith(normalizedLinkURL.pathname) // D. default starts
            : linkValue === locationValue &&
              (!normalizedLinkURL.hash ||
                normalizedLinkURL.hash === normalizedLocationURL.hash)); // E. full
  }

  private handleRouteChanged = () => {
    if (!this.active) return;
    this.requestUpdate();
  };

  private handleHostClicked = (e: MouseEvent) => {
    if (!this.anchorElement) return;
    if ((this.target && this.target !== '_self') || this.download) {
      this.anchorElement.dispatchEvent(
        new MouseEvent('click', {
          bubbles: false,
          cancelable: true,
        })
      );
    } else {
      const url = new URL(this.anchorElement.href);
      history.pushState({}, '', url.href);
      dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this.renewLinkElement();
    // events
    this.addEventListener('click', this.handleHostClicked);
    addEventListener(ROUTE_CHANGE_EVENT, this.handleRouteChanged);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    removeEventListener(ROUTE_CHANGE_EVENT, this.handleRouteChanged);
  }

  protected beforeUpdate() {
    if (!this.href) throw new Error('href is required');
  }

  protected computedStyles(props: LinkStyleProps) {
    const isActive = !this.active ? false : this.getActiveStatus();
    console.log({isActive});

    const items: string[] = [];
    const hoverItems: string[] = [];
    /* eslint-disable prettier/prettier */
    if (props.block !== undefined) items.push(`display: ${props.block ? 'block' : 'inline'};`);
    if (props.color) items.push(`color: ${parseColorValue(props.color)};`);
    if (props.decoration) {
      const decoration = parseDecorationValue(props.decoration);
      items.push(
        `-webkit-text-decoration: ${decoration};`,
        `text-decoration: ${decoration};`
      );
    }
    if (props.underlineOffset) {
      items.push(`text-underline-offset: ${parseSingleSpaceValue(props.underlineOffset)};`);
    }
    if (props.opacity) items.push(`opacity: ${props.opacity};`);
    /* eslint-enable prettier/prettier */
    // set active status
    if (isActive) {
      this.setAttribute('activeLink', '');
    } else {
      this.removeAttribute('activeLink');
    }
    // result
    return `:host { ${items.join('')} }`;
  }

  protected render() {
    return html`<slot></slot>`;
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
}>(outputs => [
  css`
    :host {
      cursor: pointer;
    }

    :host([disabled]) {
      cursor: not-allowed;
      pointer-events: none;
      opacity: 0.5;
    }
  `,

  outputs.statics,
]);
