+++json
{
  "status": "publish",
  "title": "Vanilla and Servers",
  "category": "guide"
}
+++

## Vanilla

Using Tini UI with Vanilla Javascript is as simple as using native HTML elements, follow the [CDN](/ui/get-started) setup guide to add Tini UI to your project.

See an online example: [Tini UI - Vanilla Playground](https://stackblitz.com/edit/tini-ui-vanilla-playground?file=index.html)

- **Step 1**: setup the UI in the head tag

```html
<script type="module">

  import { setupUI, availableSkins } from 'https://cdn.jsdelivr.net/npm/@tinijs/ui-bootstrap/bundled/setup.js';
  import { availableComponents } from 'https://cdn.jsdelivr.net/npm/@tinijs/ui-bootstrap/bundled/component.js';

  setupUI({
    skins: availableSkins,
    components: availableComponents,
  });

</script>
```

- **Step 2**: use the components

```html
<tini-text color="success">Lorem ipsum</tini-text>
<tini-button>A button</tini-button>
```

## Server rendered (WordPress, Rails, ...)

For server rendered pages, you can apply the same way as using Tini UI with Vanilla Javascript.

To prevent FOUC, you can add attribute `hidden` to the body.

```html
<script type="module">

  setupUI({
    pendingBody: true // remove hidden attribute from body after setup
  });

</script>

<body hidden></body>
```
