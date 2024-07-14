+++json
{
  "status": "publish",
  "title": "Vanilla and Servers",
  "category": "guides"
}
+++

Using Tini UI with vanilla Javascript and server rendered (WordPress, Rails, ...) are as simple as using native HTML elements, follow the [CDN](/ui/get-started) setup guide to add Tini UI to your project.

See an online example: [Tini UI - Vanilla Playground](https://stackblitz.com/edit/tini-ui-vanilla-playground?file=index.html)

- **Step 1**: setup the UI in the head tag

```html
<script type="module">

  import { setupUI, availableSkins } from 'https://cdn.jsdelivr.net/npm/@tinijs/ui-bootstrap@0.21.0/bundled/setup.js';
  import { availableComponents } from 'https://cdn.jsdelivr.net/npm/@tinijs/ui-bootstrap@0.21.0/bundled/component.js';

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

To prevent Flash of Unstyled Content (FOUC), you can add the attribute `hidden` to the body and turn on the `resolvePending` option.

```html
<script type="module">

  setupUI({
    resolvePending: true // remove hidden attribute from body after setup
  });

</script>

<body hidden></body>
```
