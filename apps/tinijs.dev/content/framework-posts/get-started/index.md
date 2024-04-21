+++json
{
  "status": "publish",
  "order": 1,
  "title": "Get Started",
  "category": "uncategorized"
}
+++

To quickly create a TiniJS project, you can use the [Tini CLI](/cli) to initialize a template.

```bash
npx @tinijs/cli@latest new my-app -l
```

The above command creates an app by downloading the **Bare** template. In the future, I would like to provide several starter templates. You can also create your own templates and share them with the community or for your own private use. Currently, these templates available:

- [Bare](https://github.com/tinijs/bare-starter) (default) - minimum structure of a TiniJS app.
- [Blank](https://github.com/tinijs/blank-starter) (flag `-t blank`) - includes router, state management, meta tags management and the [Bootstrap theme family](/ui).

Now, inside the project you can run `npm run dev` to start the development server. You may start development by edit the file `./app/app.ts` which is the root component of the app.

For how to work with custom elements using Lit please visit [Lit component](https://lit.dev/docs/components/overview/), there are some differents between `LitElement` and `TiniComponent`, but for now you can modify `static styles` and `render()` as you would normally do.

To build the distribution, run `npm run build` and optionally run `npm run preview` to preview the production build. You can now deploy the `.output` folder to any static host.

- **Photo Gallery** App: [https://stackblitz.com/edit/try-tinijs](https://stackblitz.com/edit/try-tinijs?file=app%2Fapp.ts)
- **To Do** App: [https://stackblitz.com/edit/try-tinijs-todo-app](https://stackblitz.com/edit/try-tinijs-todo-app?file=app%2Fapp.ts)
