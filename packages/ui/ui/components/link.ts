import {html, css, type CSSResult} from 'lit';
import {property} from 'lit/decorators/property.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import normalizeUrl from 'normalize-url';
import {pathToRegexp} from 'path-to-regexp';

import {TiniElement, createStyleBuilder} from '@tinijs/core';
import {ROUTE_CHANGE_EVENT} from '@tinijs/router';

type ComponentConstructor = typeof import('./link.js').default;

export enum LinkParts {
  A = 'a',
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
  @property({type: Boolean, reflect: true}) activeFull = false;
  @property({type: Boolean, reflect: true}) activeStartsAuto = false;
  @property({type: String, reflect: true}) activeStartsWith?: string;
  @property({type: String, reflect: true}) activeEndsWith?: string;
  @property({type: Array, reflect: true}) activePatterns?: string[];
  @property({type: Boolean, reflect: true}) activeIncludesSearchParams = false;
  /* eslint-enable prettier/prettier */

  private static cachedActiveStatuses: Record<string, Record<string, boolean>> =
    {};
  private getActiveStatus() {
    // 0. turned off (default)
    if (
      !this.activeFull &&
      !this.activeStartsAuto &&
      !this.activeStartsWith &&
      !this.activeEndsWith &&
      !this.activePatterns?.length
    )
      return false;
    // 1. ignore
    const locationURL = new URL(location.href);
    const linkURL = new URL(
      this.href,
      `${location.origin}${location.pathname}`
    );
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
    // 2. from cache
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
          : this.activeStartsAuto
            ? ['$starts$'] // D. default starts
            : ['$full$']; // E. full
    const cacheKey = [normalizedLink, ...modeArr].join('///');
    if (cachedActiveStatuses[cacheKey]?.[normalizedLocation] !== undefined) {
      return cachedActiveStatuses[cacheKey][normalizedLocation];
    }
    // 3. no cache
    const normalizedLocationURL = new URL(normalizedLocation);
    const normalizedLinkURL = new URL(
      normalizedLink,
      `${location.origin}${location.pathname}`
    );
    const locationValue = `${normalizedLocationURL.pathname}${
      !this.activeIncludesSearchParams ? '' : normalizedLocationURL.search
    }`;
    const linkValue = `${normalizedLinkURL.pathname}${
      !this.activeIncludesSearchParams ? '' : normalizedLinkURL.search
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
          : this.activeStartsAuto
            ? locationValue.startsWith(normalizedLinkURL.pathname) // D. default starts
            : linkValue === locationValue &&
              (!normalizedLinkURL.hash ||
                normalizedLinkURL.hash === normalizedLocationURL.hash)); // E. full
  }

  private handleRouteChanged = () => {
    this.updateActiveStatus(); // update active status on route change
  };

  connectedCallback() {
    super.connectedCallback();
    addEventListener(ROUTE_CHANGE_EVENT, this.handleRouteChanged);
    // update initial active status
    this.updateActiveStatus();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    removeEventListener(ROUTE_CHANGE_EVENT, this.handleRouteChanged);
  }

  protected beforeUpdate() {
    if (!this.href) throw new Error('href is required');
  }

  private updateActiveStatus() {
    const isActive = this.getActiveStatus();
    if (isActive) {
      this.setAttribute('linkIsActive', '');
    } else {
      this.removeAttribute('linkIsActive');
    }
  }

  protected render() {
    return html`
      <a
        class=${LinkParts.A}
        part=${LinkParts.A}
        href=${this.href}
        target=${ifDefined(this.target)}
        rel=${ifDefined(this.rel)}
        download=${ifDefined(this.download)}
        referrerpolicy=${ifDefined(this.referrerpolicy)}
        hreflang=${ifDefined(this.hreflang)}
        type=${ifDefined(this.type)}
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
      >
        <slot></slot>
      </a>
    `;
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
}>(outputs => [
  css`
    a[aria-disabled='true'] {
      cursor: not-allowed;
      pointer-events: none;
    }
  `,

  outputs.statics,
]);
