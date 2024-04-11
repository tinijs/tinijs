# TiniJS Framework

The TiniJS Framework is a family of tools for building modern web applications based on the [Lit library](https://lit.dev).

For more detail and usage, please visit <https://tinijs.dev>

> The experimetal packages (0.16.0 and below) were archived. Moving forward, this repo will be the new home of the TiniJS Framework.

## Introduction

The TiniJS Framework (meta-framework) is a collection of tools for building web applications from start to finish comparable to other frameworks like Next.js, Nuxt.js, SvelteKit, ... The difference is that it is based on the [Lit library](https://lit.dev) and aims to provide a native, lightweight, interoperable platform for building web applications.

I started the project as an experimental pet project back in December 2022, I worked for about a month mainly on the [Core](https://github.com/tinijs/core) package. But then have to pause for a while due to a tight work schedule.

I resumed the experiment in July 2023, and I have worked on the project in my free time since. Adding packages: [CLI](https://github.com/tinijs/cli), [UI](https://github.com/tinijs/ui), [Router](https://github.com/tinijs/router), [State management](https://github.com/tinijs/store), [PWA](https://github.com/tinijs/pwa), ...

I wrapped up the experiment in March 2024 and headed for the 1.0 version in 2024.

## Plan & Roadmap

I have many ideas for the project, but as a solo developer, there are limitations. So besides working on my own, **I am** also looking for sponsors, **adopters or **part-time** employers who** allow me to continue work on the project**.

If you are interested in the project, please consider contributing. Get in touch with me on [Discord](https://discord.gg/EABbZVbPAb) or [Email](hello@tinijs.dev), I am happy to discuss the project with you.

### Version 1.0

I hope that I can reach some candidate versions in 2024 and release the 1.0 version by 2025. The following is the plan for the first version:

- Core:
  - Homepage, documentation and examples
  - Core functionalities & unit test [@tinijs/core](https://github.com/tinijs/tinijs/tree/main/packages/core)
  - Verify implementation of [@tinijs/router](https://github.com/tinijs/tinijs/tree/main/packages/router), [@tinijs/store](https://github.com/tinijs/tinijs/tree/main/packages/store) and [@tinijs/meta](https://github.com/tinijs/tinijs/tree/main/packages/meta)
  - Re-implement the [@tinijs/pwa](https://github.com/tinijs/tinijs/tree/main/packages/pwa) module

- UI:
  - Optimize the [@tinijs/ui](https://github.com/tinijs/tinijs/tree/main/packages/ui) implementation
  - Implement the UI and Icons builder
  - Add some components: code, embed, table, image, figure, ...
  - Add Material V3 theme family
  - Add Fluent theme family (hopefully)

- Server & module:
  - Implement [@tinijs/server](https://github.com/tinijs/tinijs/tree/main/packages/server)
  - Implement [@tinijs/content](https://github.com/tinijs/tinijs/tree/main/packages/content) module
  - Recipes for adding different server solutions: Firebase, Strapi, tRPC, Nest, Tauri, Axum, ...

- CLI & tools
  - New [@tinijs/cli](https://github.com/tinijs/tinijs/tree/main/packages/cli) architecture supports expandable commands
  - Better `new` command
  - Implement [@tinijs/default-compiler](https://github.com/tinijs/tinijs/tree/main/packages/default-compiler)
  - Implement [@tinijs/parcel-builder](https://github.com/tinijs/tinijs/tree/main/packages/parcel-builder)
  - Implement [@tinijs/vite-builder](https://github.com/tinijs/tinijs/tree/main/packages/vite-builder)
  - Implement [@tinijs/webpack-builder](https://github.com/tinijs/tinijs/tree/main/packages/webpack-builder)
  - Unit test the CLI, compilers and builders

- Others:
  - Setup the monorepo
  - CI/CD pipeline
  - Release & Changelog

### Future versions?

If version 1.0 turns out to be useful, I will continue to work on the project and add more features and tools to the framework.

Something may be considered:

- UI components and theme families
  - More useful components and blocks
  - More theme families: Fluent, iOS, Ant, Spectrum, Shoelace, PrimeNG, Element Plus, ...
  - Supports server-side rendering
- Admin dashboard for managing content and other aspects of the application
- More modules for other purposes to extend the framework
- A collection of templates for different types of applications (similar to WordPress themes)
- A visual editor where we can drag and drop components, blocks, design skins, ...

## Development

- Fork the repository
- Install the dependencies: `npm i`
- Format: `npm run fix`
- Lint: `npm run lint`
- Test: `npm run test`
- Build:
  - All: `npm run build`
  - Specific: `npm run build -- --scope=@tinijs/<package-name>`
- Release: `npm run release`

## License

**The TiniJS Framework** is released under the [MIT](./LICENSE) license.
