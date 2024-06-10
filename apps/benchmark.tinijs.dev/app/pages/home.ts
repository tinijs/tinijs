import {html} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';

import {
  TEXT_VARIANTS,
  TEXT_SUGGESTED_ITEMS,
  TEXT_SUGGESTED_REPEATS,
} from './ui-text.js';

@Page({
  name: 'app-page-home',
})
export class AppPageHome extends TiniComponent {
  protected render() {
    return html`
      <article style="max-width: 1024px; margin: 0 auto; padding: 2rem;">
        <h1>Benchmark TiniJS Framework and UI</h1>
        <p>
          Homepage:
          <a href="https://tinijs.dev" target="_blank">https://tinijs.dev</a
          >&nbsp;&middot;&nbsp;Host:
          <a href="https://pages.cloudflare.com/" target="_blank"
            >Cloudflare Pages</a
          >&nbsp;&middot;&nbsp;Theme:
          <a href="https://tinijs.dev/ui/bootstrap" target="_blank"
            >Bootstrap Light</a
          >
        </p>
        <p>
          A simple dashboard for testing real world
          <strong>performance</strong>, <strong>accessibility</strong> and
          <strong>best practices</strong> using Lighthouse.
        </p>
        <ul>
          <li>
            Open the below subjects in
            <strong>Incognito window</strong> (optionaly setting the
            <code>?repeat=x</code> if available)
          </li>
          <li>
            Go to the <strong>Lighthouse</strong> tab in the DevTools and run
            <strong>Analyze page load</strong> (or using
            <a href="https://pagespeed.web.dev/" target="_blank"
              >PageSpeed Insights</a
            >)
          </li>
        </ul>
        <hr />
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Variants</th>
              <th>Suggested loads</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td><a href="/blank" target="_blank">Blank page</a></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>
                <a
                  href=${`/ui/text?repeat=${TEXT_SUGGESTED_REPEATS}`}
                  target="_blank"
                  >tini-text</a
                >
              </td>
              <td>${TEXT_VARIANTS}</td>
              <td>
                ${TEXT_SUGGESTED_ITEMS} items (${TEXT_SUGGESTED_REPEATS}
                repeats)
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    `;
  }
}
