import {html, css} from 'lit';
import {Page, TiniComponent, stylingWithBases} from '@tinijs/core';
import {codeBases, headingsBases, linkBases, textBases} from '@tinijs/ui/bases';
import {TiniLinkComponent} from '@tinijs/ui/components/link';

@Page({
  name: 'app-page-404',
  components: [TiniLinkComponent],
  theming: {
    styling: stylingWithBases([codeBases, headingsBases, linkBases, textBases]),
  },
})
export class AppPage404 extends TiniComponent {
  protected render() {
    return html`
      <img
        alt="Not found!"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNDggNDgiIHdpZHRoPSIyNTZweCIgaGVpZ2h0PSIyNTZweCIgYmFzZVByb2ZpbGU9ImJhc2ljIj48cGF0aCBmaWxsPSIjM2RkYWI0IiBkPSJNMzcuNjg4LDEwLjE4TDM2LjY5Miw3Ljc1QzM1LjQyNyw0LjY2LDMyLDMuMjI3LDI4LjY4OCw0LjU0N0wyMy4zODMsNi42OQljLTEuMjc4LTAuNzQzLTIuODY2LTAuOTIyLTQuMzQtMC4zMTljLTIuMjY1LDAuOTI4LTMuNDUyLDMuMzQ2LTIuOTIzLDUuNjU2Yy0yLjUwOSw0Ljg2NS0zLjY1NiwxMS4zOS0zLjM2MywxOC4wMzVsMTMuNTg2LDAuMjg5CWMtMC4xMTMtMC4yNDYtMC4yMjYtMC41MjYtMC4zNC0wLjgxOGwwLjk2OSwwLjg4OFYxOS45NzVoNi4xNTZjMi4wNzUsMC4wMDgsMy45MDMtMS45LDMuOTEtMy45NzVIMjQuMDA4TDM3LjY4OCwxMC4xOHoiLz48Y2lyY2xlIGN4PSIzMi4wMSIgY3k9IjcuMDE4IiByPSIxIiBmaWxsPSIjMDBiNTY5Ii8+PGNpcmNsZSBjeD0iMjAuNDg4IiBjeT0iMTAuNTA0IiByPSIxLjUiIGZpbGw9IiNmYWRiMDAiLz48cGF0aCBmaWxsPSIjZjViYzAwIiBkPSJNMzcuOTEzLDMwLjI2MmwtNS4zODMtNS4yNzRsLTUuMjM1LDUuMjc0bC01LjIzNS01LjI3NGwtNS4zODMsNS4yNzRsLTUuMjM1LTUuMjc0bC01LjM2OSw1LjI2MQlDNi44MDIsMzcuNTI2LDEyLDQ0LjkzNSwyMiw0NWM5LjQ3NywwLjA2MSwxNS4xOTgtNy40NzQsMTUuOTI4LTE0Ljc1MkwzNy45MTMsMzAuMjYyeiIvPjxwYXRoIGZpbGw9IiNmNWJjMDAiIGQ9Ik00NC4wNjMsMzcuMDM4bC0zLjc4My0zLjAzMmwtNC42LDMuMDQxbC00LjE2Ny0zLjAyM2wtNC4xNzYsMy4wMDcJYzAuMzgzLDMuOTY2LDMuMTM3LDcuOTYxLDguMzkxLDcuOTk3YzQuOTc4LDAuMDMzLDcuOTYxLTQuMDMxLDguMzQ0LTcuOTk3TDQ0LjA2MywzNy4wMzh6Ii8+PHBhdGggZmlsbD0iI2ViNzkwMCIgZD0iTTM1LjcwMywzN2wtNC4xNTYtMi45OTRsLTQuMTc2LDMuMDZjMC4yMDUsMi4xMTYsMS4xMSw0LjI3OSwyLjY3OCw1LjgxNwlDMzIuNDE1LDQxLjQxNywzNC4zOTEsMzkuMzQ5LDM1LjcwMywzN3oiLz48cG9seWdvbiBmaWxsPSIjZWI3OTAwIiBwb2ludHM9IjE2LjY3NywzMy4yMDUgMjIuMDYsMjcuOTMxIDI2Ljk4NCwzMi44OTIgMjYuOTg0LDI5Ljk0OSAyMi4wNiwyNC45ODggMTYuNjc3LDMwLjI2MiAxMi43ODEsMjYuMzM4IDEyLjc4MSwyOS4yODEiLz48L3N2Zz4="
      />
      <h2>You broke an egg!</h2>
      <p>
        The page you are looking is not available, please head
        <tini-link href="/">home</tini-link>.
      </p>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      width: 100%;
      height: 75%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    h2 {
      margin-bottom: 0.5rem;
    }
  `;
}
