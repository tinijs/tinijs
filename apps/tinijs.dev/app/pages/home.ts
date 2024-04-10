import {html, css} from 'lit';

import {Page, TiniComponent, Colors, CommonGradients} from '@tinijs/core';
import {UseRouter, Router} from '@tinijs/router';
import {TiniTextComponent} from '@tinijs/ui-bootstrap/components/text.js';
import {TiniButtonComponent} from '@tinijs/ui-bootstrap/components/button.js';

import {IconHeartComponent} from '../icons/heart.js';

import {LOGO_URL} from '../consts/common.js';

@Page({
  name: 'app-page-home',
  components: [TiniTextComponent, TiniButtonComponent, IconHeartComponent],
})
export class AppPageHome extends TiniComponent {
  @UseRouter() router!: Router;

  protected render() {
    return html`
      <section class="featured">
        <div class="logo">
          <img src=${LOGO_URL} alt="TiniJS Logo" />
        </div>

        <div class="headline">
          <h2 style="margin-bottom: 0">
            <tini-text
              fontSize="3x"
              fontWeight="700"
              color=${CommonGradients.KaleSalad}
              >Tini</tini-text
            ><br />A Javascript framework
          </h2>
          <p>
            A small, fast and interoperable framework for building
            <strong>Single Page Apps</strong> or
            <strong>Progressive Web Apps</strong> or <strong>Desktop</strong> or
            <strong>Mobile</strong> Apps.
          </p>
          <div class="actions">
            <tini-button
              scheme=${Colors.Primary}
              @click=${() => this.router.go('/framework')}
              >Get started</tini-button
            >
            <tini-button
              scheme=${Colors.Medium}
              @click=${() =>
                open('https://github.com/tinijs/tinijs', '_blank')?.focus()}
              >View on Github</tini-button
            >
          </div>
        </div>
      </section>

      <section class="members">
        <ul>
          <li>
            <div class="icon">🏗️</div>
            <h3>Framework</h3>
            <p>
              A conventional structure with router, state management, extendable
              modules, ...
            </p>
          </li>

          <li>
            <div class="icon">🎨</div>
            <h3>UI</h3>
            <p>
              A huge collection of reusable components, blocks, layouts, pages,
              ... with many design flavors.
            </p>
          </li>

          <li>
            <div class="icon">📝</div>
            <h3>Content</h3>
            <p>
              A file-based content management system for all kind of content
              without a server or database.
            </p>
          </li>

          <li>
            <div class="icon">🎛️</div>
            <h3>Server</h3>
            <p>
              An optional web server for semi-SSR, server routes, API routes and
              other server side stuffs.
            </p>
          </li>

          <li>
            <div class="icon">⌨️</div>
            <h3>CLI</h3>
            <p>
              An unified CLI tool for working with Tini apps and expandable to
              support other automation tasks.
            </p>
          </li>
        </ul>
      </section>

      <section class="sponsors">
        <div class="foreword">
          <icon-heart></icon-heart>
          <p>
            The <strong>Tini Project</strong> is free and open source. It's
            currently at the very early stage, please consider sponsor me if you
            see it's useful.
          </p>
        </div>

        <div class="special-sponsors">
          <div class="title">Special Sponsors</div>
          <ul>
            <li class="item-1"><a href="javascript:void(0)">Your Logo</a></li>
            <li class="item-2"><a href="javascript:void(0)">Your Logo</a></li>
            <li class="item-3"><a href="javascript:void(0)">Your Logo</a></li>
          </ul>
        </div>

        <div class="actions">
          <tini-button
            scheme=${CommonGradients.DiscoClub}
            @click=${() => open('mailto:tinijs@lamnhan.com', '_blank')?.focus()}
            >Sponsor Tini</tini-button
          >
        </div>
      </section>
    `;
  }

  static styles = css`
    section {
      margin: auto;
      max-width: var(--wide-sl);
    }

    .featured {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--size-space-2x) var(--size-space);
    }

    .logo img {
      width: 150px;
    }

    .headline {
      text-align: center;
    }

    .actions {
      display: flex;
      gap: var(--size-space);
      margin-top: var(--size-space);
      justify-content: center;
    }

    .members {
      padding: var(--size-space-2x);
    }

    .members ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: var(--size-space);
    }

    .members li {
      padding: var(--size-space);
      border-radius: var(--size-radius);
      background: var(--color-background);
    }

    .members li .icon {
      font-size: 2rem;
      padding: var(--size-space-0_75x);
      background: var(--color-background-shade);
      width: 55px;
      height: 50px;
      line-height: 25px;
      border-radius: var(--size-radius);
    }

    .members li h3 {
      margin: var(--size-space) 0 0;
      font-size: 1.5rem;
    }

    .members li p {
      margin: 0;
      color: var(--color-medium);
    }

    .sponsors {
      padding: var(--size-space-2x);
      margin: var(--size-space-2x) auto;
    }

    .sponsors .foreword {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-bottom: var(--size-space-2x);
    }

    .special-sponsors .title {
      background: var(--color-background);
      margin-bottom: var(--size-space-0_5x);
      padding: var(--size-space-0_5x) var(--size-space);
      border-radius: var(--size-radius) var(--size-radius) 0 0;
      text-align: center;
      font-weight: 700;
      color: var(--color-medium);
      font-size: 0.9rem;
    }
    .special-sponsors ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: var(--size-space-0_5x);
    }
    .special-sponsors li {
      background: var(--color-background);
    }
    .special-sponsors a {
      display: block;
      color: var(--color-medium);
      text-decoration: none;
      font-size: 1.5rem;
      padding: var(--size-space-2x);
      width: 100%;
      text-align: center;
    }

    .sponsors .actions {
      display: flex;
      gap: var(--size-space);
      margin-top: var(--size-space-2x);
      justify-content: center;
    }

    @media (min-width: 768px) {
      .featured {
        padding: var(--size-space-3x) var(--size-space-2x);
        flex-direction: row;
      }

      .logo {
        width: 40%;
        text-align: right;
      }
      .logo img {
        width: 200px;
      }

      .headline {
        order: -1;
        text-align: left;
      }
      .headline h2 {
        font-size: 2.5rem;
        margin-top: 0;
      }

      .actions {
        justify-content: flex-start;
      }

      .special-sponsors ul {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `;
}
