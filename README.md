# TiniJS 

The integrated package of the TiniJS framework.

## Install

```sh
npm i tinijs
```

For more, please visit: <https://tinijs.dev> (TODO)

## Usage

- `partAttrMap`

```ts
import {partAttrMap} from 'tinijs';

html`<div part=${partAttrMap({ a: true, b: false })}></div>`;
```

- `registerComponents()`

```ts
import {registerComponents} from 'tinijs';
import {TiniButtonComponent} from '@tinijs/ui-bootstrap/components/button';

// register Tini UI components
registerComponents([TiniButtonComponent]);
```

- `setTheme()`

```ts
import {setTheme} from 'tinijs';

setTheme({ skinId: 'dark' });
setTheme({ soulId: 'bootstrap' });
setTheme({ soulId: 'bootstrap', skinId: 'dark' });
```

- Varies generators

```ts
import {generateColorVaries, generateScaleVaries} from 'tinijs';

css`

  ${generateColorVaries(({fullName, color}) => `
    .${fullName} {
      background: ${color};
    }
  `)}

  ${generateScaleVaries(({fullName, scale}) => `
    .${fullName} {
      padding: ${scale};
    }
  `)}

`;
```

For more detail, please visit the docs: <https://tinijs.dev/docs> (TODO)

## Developement

- Create a home for TiniJS: `mkdir TiniJS && cd TiniJS`
- Fork the repo
- Install dependencies: `cd tinijs && npm i`
- Make changes & preview locally: `npm run build && npm pack`
- Push changes & create a PR 👌

## License

**tinijs** is released under the [MIT](https://github.com/tinijs/tinijs/blob/master/LICENSE) license.
