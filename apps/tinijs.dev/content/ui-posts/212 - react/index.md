+++json
{
  "status": "publish",
  "title": "React",
  "category": "guides"
}
+++

To use Tini UI with React, it is similar to what mentioned in [Get Started](/ui/get-started), but the different is package names will be suffixed with `-react` (for example `@tinijs/ui-bootstrap-react`). Or if you are using Tini CLI, set the option `{ framework: 'react' }` to output components with React wrappers.

Try an online example: [Tini UI - React Playground](https://stackblitz.com/edit/tini-ui-react-playground?file=src%2FApp.tsx)

- **Step 1**: setup UI in `main.tsx` or `App.tsx`

```ts
import { setupUI, availableSkins } from '@tinijs/ui-bootstrap-react/setup.js';
import { availableComponents } from '@tinijs/ui-bootstrap-react/component.js';

setupUI({
  skins: availableSkins,
  components: availableComponents,
});
```

- **Step 2**: import and use components

```ts
import { TiniText } from '@tinijs/ui-bootstrap-react/components/text.js';
import { TiniButton } from '@tinijs/ui-bootstrap-react/components/button.js';

function App() {
  return (
    <>
      <TiniText color="success">A text</TiniText>
      <TiniButton>A button</TiniButton>
    </>
  );
}
```
