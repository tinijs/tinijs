import {html, css, nothing} from 'lit';
import {UnstableStates} from '@tinijs/core';
import {Component, TiniComponent} from '@tinijs/core';
import {Route} from '@tinijs/router';
import {TiniIconComponent, TiniLinkComponent} from '@ui';

import {Configurable} from '../configurable.js';

import {ICON_EXPERIMENTAL} from '../consts/icons.js';

interface NavItem {
  title: string;
  href: string;
  unstable?: UnstableStates;
}

@Component({
  components: [TiniIconComponent, TiniLinkComponent],
})
export class AppMenuComponent extends TiniComponent {
  static readonly defaultTagName = 'app-menu';

  private readonly ROUTES = Configurable.getOption('routes');
  private readonly GROUP_NAMES = ['top', 'guides', 'components', 'icons'];

  private groups: Record<string, {title?: string; items: NavItem[]}> = {};

  private buildMenu() {
    const processRoute = ({path, title, data}: Route) => {
      const pathSegments = path.split('/').filter(Boolean);
      const linkTitle =
        title ||
        (pathSegments[pathSegments.length - 1] || 'untitled')
          .replace(/-|_/g, ' ')
          .split(' ')
          .map(word => word[0].toUpperCase() + word.slice(1))
          .join(' ');
      for (const groupName of this.GROUP_NAMES) {
        if (!this.groups[groupName])
          this.groups[groupName] = {
            title: groupName === 'top' ? undefined : groupName.toUpperCase(),
            items: [],
          };
        if (
          path !== '**' &&
          (~path.indexOf(`${groupName}/`) ||
            (groupName === 'top' && pathSegments.length < 2))
        ) {
          this.groups[groupName]?.items.push({
            title: linkTitle,
            href: !path ? '/' : `/${path}`,
            unstable: data?.component?.componentMetadata?.unstable,
          });
          break;
        }
      }
    };
    this.ROUTES.forEach(route => {
      if (!route.children?.length) {
        processRoute(route);
      } else {
        route.children.forEach(child => processRoute(child));
      }
    });
  }

  onCreate() {
    this.buildMenu();
  }

  protected render() {
    return html`
      <h4>Documentation</h4>
      <ul>
        ${Object.entries(this.groups).map(([groupName, {title, items}]) => {
          return !title
            ? html` ${items.map(item => this.renderItem(item))} `
            : html`
                <li>
                  <strong class="title">${title}</strong>
                  <ul>
                    ${items.map(item => this.renderItem(item))}
                  </ul>
                </li>
              `;
        })}
      </ul>
    `;
  }

  private renderItem({title, href, unstable}: NavItem) {
    return html`
      <li>
        <tini-link href=${href} active="active">${title}</tini-link>
        ${!unstable
          ? nothing
          : html`<tini-icon
              src=${unstable === UnstableStates.Deprecated
                ? ''
                : ICON_EXPERIMENTAL}
            ></tini-icon>`}
      </li>
    `;
  }

  static styles = css`
    :host {
      padding: 1rem;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li {
      padding: 0.75rem 1rem;

      .title {
        display: block;
        margin-bottom: 0.5rem;
        color: var(--color-medium);
      }
    }

    tini-link {
      &::part(root) {
        color: var(--color-foreground);
      }

      &.active::part(root) {
        font-weight: bold;
        text-decoration: underline;
      }
    }
  `;
}
