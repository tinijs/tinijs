+++json
{
  "status": "publish",
  "title": "Get Started",
  "category": "uncategorized"
}
+++

**Tini Server** offers you an optional [Nitro](https://nitro.unjs.io/) server for server/API routes and other server stuffs. For now, beside the server/API routes usage, it will just serve the client app `index.html` like it is a single page app (no SSR just yet).

To add Tini Server to an TiniJS project, you can use the [Tini CLI](/cli) (make sure you have it installed, if not run `npm i -D @tinijs/cli`).

And commit or stage any changes you have made to your project.

Then run the following command:

```bash
npx tini module add @tinijs/server
```

The above command does the following:
- Install the `@tinijs/server` package
- Copy starter assets to the `server` folder
- Config client app output and prepare Nitro
- Update `dev` and `build` scripts to `tini server dev` and `tini server build`

You can now run `npm run dev` to start the server and open your browser to `http://localhost:3000` to see your app.

Please note, by running `npm run dev` it will use `tini server dev` without hot reload for the client app during development, we must refresh browser after changes are made to the `app` folder. Therefore, you will likely want to run `npm run dev:app` during development instead, because it uses `tini dev` to serve and hot reload the client app.

To build the server for production, run `npm run build` and optionally run `npm run preview` to preview the production build.

The production build will be in the `.output` folder, depends on the deploy pipeline you are using, you can deploy the `.output` folder to your server and run `node server/index.mjs` or using [PM2](https://pm2.keymetrics.io/).

## CLI Expansion

The above `tini server ...` commands are available via [Tini CLI](/cli) expandable architect. Please see [Tini Server CLI expansion](/server/cli) for more details.

## Server Routes

Server routes are defined in the `server/routes` folder.

For example, create `server/routes/hello.ts` with the following content:

```ts
export default eventHandler(() => {
  return 'Hello World!';
});
```

Now new route is available at `http://localhost:3000/hello`. 

## API Routes

Similar to server routes, API routes are defined in the `server/api` folder.

For example, create `server/api/hello.ts` with the following content:

```ts
export default eventHandler(() => {
  return {
    message: 'Hello World!'
  };
});
```

Now new API route is available at `http://localhost:3000/api/hello`.

## More

For details how to config Nitro and other server stuffs, please visit <https://nitro.unjs.io/guide>.
