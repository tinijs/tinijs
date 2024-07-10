+++json
{
  "status": "publish",
  "title": "Web Apps",
  "category": "distributions"
}
+++

A TiniJS app can be started as a static web no matter big or small without a need of a server or database. You can always use SaaS services for almost any backend needs.

An [optional Nitro server](/module/server) for server/API routes and other server stuffs if you need to handle backend tasks and refer to serve the web app from a Node server instead of a static host.

This guide will focus on distributing a TiniJS web app as a static web. After you have built your web app, you can run `npm run build` to generate the distribution files. The distribution files are located by default in the `.output` folder. You can now upload the files to a static web host like GitHub Pages, Cloudflare Pages, Netlify, Firebase Hosting, etc.

## GitHub Pages

Config `tini.config.ts` to output to `docs` folder:

```ts
export default defineTiniConfig({
  outDir: 'docs',
});
```

Add CNAME file to `docs` the `app/public` folder if you want to use a custom domain.

Commit and push to GitHub, then go to the repository settings, scroll down to the GitHub Pages section, and select the `docs` folder as the source.

## Cloudflare Pages

You can setup a CD pipeline to deploy your TiniJS app to Cloudflare Pages. The pipeline can be configured to build the app and deploy it to Cloudflare Pages.

But in a simple way, you can just drag and drop the `.output` folder to the Cloudflare Pages dashboard.

## Netlify

Similar to Cloudflare Pages, you can drag and drop the `.output` folder to the Netlify dashboard.

## Others

You can deploy to any static web host that supports HTML, CSS, and JS files.
