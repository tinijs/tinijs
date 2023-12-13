# TiniJS 

The integrated package of the TiniJS framework.

## Install

```sh
npm i tinijs
```

For more, please visit: <https://tinijs.dev> (TODO)

## Usage

- `partMap`

```ts
import {partMap} from 'tinijs';

html`<div part=${partMap({ a: true, b: false })}></div>`;
```

- `useComponents()`

```ts
import {useComponents, importComponents} from 'tinijs';
import {TiniButtonComponent} from '@tinijs/ui-bootstrap/components/button';

// use Tini UI components
useComponents([TiniButtonComponent]);

// or (for React apps)
importComponents([TiniButtonComponent]);
```

- `changeTheme()`

```ts
import {changeTheme} from 'tinijs';

changeTheme({ skinId: 'dark' });
changeTheme({ soulId: 'bootstrap' });
changeTheme({ soulId: 'bootstrap', skinId: 'dark' });
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
