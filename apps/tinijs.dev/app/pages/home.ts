import {html, css} from 'lit';

import {Page, TiniComponent, Colors, CommonGradients} from '@tinijs/core';
import {UseRouter, Router} from '@tinijs/router';
import {TiniTextComponent} from '@tinijs/ui-bootstrap/components/text.js';
import {TiniButtonComponent} from '@tinijs/ui-bootstrap/components/button.js';

@Page({
  name: 'app-page-home',
  components: [TiniTextComponent, TiniButtonComponent],
})
export class AppPageHome extends TiniComponent {
  @UseRouter() router!: Router;

  private logoURL = new URL('../assets/logo.svg', import.meta.url).toString();

  protected render() {
    return html`
      <section class="featured">
        <div class="logo">
          <img src=${this.logoURL} alt="TiniJS Logo" />
        </div>

        <div class="headline">
          <h2 style="margin-bottom: 0">
            <tini-text
              fontSize="3x"
              fontWeight="700"
              color=${CommonGradients.KaleSalad}
              >Tini</tini-text
            ><br />A tiny Javascript framework
          </h2>
          <p>Small, fast and interoperable!</p>
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
            <h3>Core</h3>
            <p>A framework for building web apps.</p>
          </li>

          <li>
            <div class="icon">🎨</div>
            <h3>UI</h3>
            <p>An UI system.</p>
          </li>

          <li>
            <div class="icon">📝</div>
            <h3>Content</h3>
            <p>A file-based content management system.</p>
          </li>

          <li>
            <div class="icon">🎛️</div>
            <h3>Server</h3>
            <p>An optional web server.</p>
          </li>

          <li>
            <div class="icon">⌨️</div>
            <h3>CLI</h3>
            <p>An expandable CLI.</p>
          </li>
        </ul>
      </section>
    `;
  }

  static styles = css`
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
    }
  `;
}
