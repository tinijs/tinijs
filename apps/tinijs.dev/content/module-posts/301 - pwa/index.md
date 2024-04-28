+++json
{
  "status": "publish",
  "title": "Get Started",
  "category": "pwa"
}
+++

Tini PWA module is a simple way to add Progressive Web App features to your TiniJS app.

- One command to turn TiniJS app into a PWA
- Affinity Design icon templates for quickly generate icons

## Installation

Make sure you have [Tini CLI](/cli) installed, if not run `npm i -D @tinijs/cli`.

Also, commit any change before adding the module.

```sh
npx tini module add @tinijs/pwa
```

The above command will:
  - Install the `@tinijs/pwa` package
  - Config the `modules` section in `tini.config.json`
  - Copy assets
  - Modify `index.html` and `app.ts` files

## Usage

The module will be add to the `tini.config.ts` file automatically.

You can continue to `npm run dev` and `npm run build` as usual.

If you need to config the module further, use below syntax.

```ts
import type {PWAModuleOptions} from '@tinijs/pwa/module';

export default defineTiniConfig({
  modules: [

    [
      '@tinijs/pwa',
      {
        // config workbox-build: https://developer.chrome.com/docs/workbox/modules/workbox-build#type-GetManifestOptions
        precaching: {
          globPatterns: [],
        }
      } as PWAModuleOptions
    ]

  ]
});
```

You can also use the `./app/sw.ts` for advanced use cases.

- Expose an API endpoint-ish in the service worker.

```ts
addEventListener('message', event => {
  if (event.data.type === 'endpoint-1') {
    event.ports[0].postMessage({ data: 'a payload' });
  }
});
```

- Communicate with the Service Worker

```ts
import {UseSW, type SW} from '@tinijs/pwa';

@Page({})
export class AppPageXXX extends TiniComponent {
  @UseSW() sw!: SW;

  onReady() {
    this.sw
      .messageSW({type: 'endpoint-1'})
      .then(value => {
        // do something with the value returned from the SW
      });
  }
}
```
