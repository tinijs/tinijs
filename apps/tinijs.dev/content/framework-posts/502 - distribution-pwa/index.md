+++json
{
  "status": "publish",
  "title": "Progessive Web Apps",
  "category": "distributions"
}
+++

You can turn a TiniJS app into a Progressive Web App (PWA) with a single CLI command using the [PWA module](/module/pwa) module.

Create a TiniJS app if you haven't already (details at [Get started](/framework/get-started)):

```bash
npx @tinijs/cli@latest new my-app -t blank
```

Add the PWA module by running the following command:

```bash
npx tini module add @tinijs/pwa
```

After setup app icons and configurations if any as seen in [PWA module](/module/pwa). Run the build command:

```bash
npm run build
```

Finally, deploy the `.output` folder to any static server, see more at [deploy web apps](/framework/distribution-web).
