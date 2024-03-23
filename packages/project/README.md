# TiniJS Project

Utilities for working TiniJS projects in general.

- Get the project

```ts
import {getTiniProject} from '@tinijs/project';

const project = getTiniProject();
```

- Create a module

```ts
export default defineTiniModule({
  meta: {
    name: 'my-module',
  },
  setup() {
    // module setup
  },
});
```

## License

**@tinijs/project** is released under the [MIT](./LICENSE) license.
