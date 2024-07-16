+++json
{
  "status": "publish",
  "title": "Web Apps",
  "category": "distributions"
}
+++

A TiniJS app can be started as a static web no matter big or small without a need of a server or database. You can always use SaaS services for many backend needs.

An [optional Nitro server](/module/server) for server/API routes and other server stuffs if you need to handle backend tasks and refer to serve the web app from a Node server instead of a static host.

This guide will focus on distributing a TiniJS web app as a static web. After you have built your web app, you can run `npm run build` to generate the distribution package. The generated files are located in the `.output` folder by default. You can now upload the files to a static web host like GitHub Pages, Cloudflare Pages, Netlify, Firebase Hosting, etc.

## GitHub Pages

Config `tini.config.ts` to output to `docs` folder:

```ts
export default defineTiniConfig({
  outDir: 'docs',
});
```

Add a CNAME file to the `app/public` folder if you want to use a custom domain.

Build the app using the `npm run build` command.

Commit and push to GitHub, then go to the repository settings, scroll down to the GitHub Pages section, and select the `docs` folder as the source.

## Cloudflare Pages

You can setup a CD pipeline to deploy your TiniJS apps to Cloudflare Pages, please see [Git Integration](https://developers.cloudflare.com/pages/get-started/git-integration/) for details.

But in a simple way, you can just [drag and drop](https://developers.cloudflare.com/pages/get-started/direct-upload/#drag-and-drop) the `.output` folder to the Cloudflare Pages deployment dashboard.

## Netlify

Using Netlify, you can setup [Git Integration](https://docs.netlify.com/site-deploys/create-deploys/#deploy-with-git).

Or, [drag and drop](https://docs.netlify.com/site-deploys/create-deploys/#drag-and-drop) the `.output` folder to the Netlify dashboard.

## Firebase Hosting

To deploy to Firebase Hosting, please see [Git Integration](https://firebase.google.com/docs/hosting/github-integration) guide for details.

## Others

You can deploy to any static web host that supports HTML, CSS, and JS files.
