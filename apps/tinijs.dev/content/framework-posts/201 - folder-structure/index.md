+++json
{
  "status": "publish",
  "title": "Folder Structure",
  "category": "core"
}
+++

For a quick note about the term `Projects` in the **TiniJS** platform. Since the TiniJS platform is designed to be as versatile as possible, which means it is able to work with many favorite tools and other frameworks or no frameworks. Therefore, **a TiniJS project could be literally any project as long as it involves one or more TiniJS aspects**. For example: a Vue app using [Tini UI](/ui), a React app using [Tini Content](/module/content), a project using [Tini CLI expansion](/cli), ... More about interoperable will be discussed along the way with future articles.

For this article, we will focus on **projects involving an app built using TiniJS core framework**. That's being said, let explore TiniJS apps.

## Mandatory files

A TiniJS app may have any folder structure as you see fit for what you are comfortable to work with. But as a convention, I recommend you use the below structure for most of the case. At the very basic, an app **must have two files**:

| Item             | Description                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| app/`index.html` | The entry point of the single page app, where you define: title, meta tags, includes fonts, init app root, ... |
| app/`app.ts`     | The `app-root` element is where you create a TiniJS client app, register config, setup router, setup UI, ...   |

## Suggested conventions

As your app grows, we will add different types of code, there are places for different things inside a TiniJS app, we can organize them into these files and folders:

| Item               | Description                                                                                                                                                                                                                                                                                               |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tini.config.ts`   | The main configuration source for various purposes across the TiniJS platform.                                                                                                                                                                                                                            |
| app/`routes.ts`    | For [Tini Router](https://github.com/tinijs/tinijs/tree/main/packages/router), where you define routing behavior of the app.                                                                                                                                                                              |
| app/`providers.ts` | Working with services, utils, ... depend on the pattern, you may choose to provide dependencies at the app level, then lazy load them later and inject to pages and components.                                                                                                                           |
| app/`assets`       | For static assets such as images, SVG icons, ...                                                                                                                                                                                                                                                          |
| app/`public`       | For assets which will be copied as is upon build time and can be accessed from public URLs.                                                                                                                                                                                                               |
| app/`types`        | Shared Typescript types.                                                                                                                                                                                                                                                                                  |
| app/`configs`      | Client app configuration files based on environments: _development.ts_, _qa.ts_, _stage.ts_, _production.ts_, ... when using with the [Default Compiler](https://github.com/tinijs/tinijs/tree/main/packages/default-compiler), depend on the target environment, a specific config file will be applied. |
| app/`components`   | Reusable app components implement the `TiniComponent` class.                                                                                                                                                                                                                                              |
| app/`pages`        | App pages for routing purpose.                                                                                                                                                                                                                                                                            |
| app/`layouts`      | Layouts for pages.                                                                                                                                                                                                                                                                                        |
| app/`icons`        | Reusable icon components.                                                                                                                                                                                                                                                                                 |
| app/`partials`     | Small re-usable [html](https://lit.dev/docs/api/templates/#html) templates which can be included in components and pages.                                                                                                                                                                                 |
| app/`utils`        | Any type of shareable logic functions, depend on the pattern, you can either import or inject them.                                                                                                                                                                                                       |
| app/`services`     | Groups of similar utilities, you can either import or inject them.                                                                                                                                                                                                                                        |
| app/`consts`       | Shared constants.                                                                                                                                                                                                                                                                                         |
| app/`classes`      | Constructors which are intended to be used to construct objects.                                                                                                                                                                                                                                          |
| app/`stores`       | Stores for global states management.                                                                                                                                                                                                                                                                      |
| app/`contexts`     | Consumable contexts for mitigating prop-drilling.                                                                                                                                                                                                                                                         |

## Intergations

When integrate with other tools and frameworks, the specific integrated code will live in its own folder at the same level as the `app` folder.
