+++json
{
  "status": "publish",
  "title": "Desktop Apps",
  "category": "distributions"
}
+++

You can use **Tauri** or **Electron** to build desktop apps.

## Tauri

**Tauri** is an app construction toolkit that lets you build software for all major desktop operating systems using web technologies.

First, check if you have Rust installed by running `rustc --version`, if not, please follow the [system setup guide](https://tauri.app/v1/guides/getting-started/prerequisites/) to prepare your system.

### Create TiniJS app

Create a TiniJS app if you haven't already (details at [Get started](/framework/get-started)):

```bash
npx @tinijs/cli@latest new my-app -t blank
```

### Add Tauri

Install Tauri CLI (details at [integrate Tauri into existing project](https://tauri.app/v1/guides/getting-started/setup/integrate#create-the-rust-project)):

```bash
npm i -D @tauri-apps/cli
```

Modify `package.json`:
- Rename client app `dev`, `build` and `preview` scripts to `dev:app`, `build:app` and `preview:app`
- Add Tauri `dev` and `build` scripts

```json
{
  "scripts": {
    "dev:app": "tini dev",
    "build:app": "tini build",
    "preview:app": "tini preview",
    "dev": "tauri dev",
    "build": "tauri build"
  }
}
```

Init Tauri project and follow the prompts:

```bash
npx tauri init
```

- App name: `My App`
- Window title: `My TiniJS x Tauri App`
- Assets: `../.output`
- Dev server: `http://localhost:3000`
- Dev command: `npm run dev:app`
- Build command: `npm run build:app`

Ignore the `src-tauri` directory in `.eslintrc.json`:

```json
{
  "ignorePatterns": ["src-tauri"]
}
```

### App development

The new Tauri app is available at `src-tauri`, now you can run the app in development mode:

```bash
npm run dev
```

### Build distribution package

Configure the app identifier, icons, window size, and other settings in `src-tauri/tauri.conf.json`, for details, please see [Tauri Configuration](https://tauri.app/v1/api/config). To build the distribution package:

```bash
npm run build
```

For details about target platforms, please see:
- [Windows Installer](https://tauri.app/v1/guides/building/windows)
- [macOS Bundle](https://tauri.app/v1/guides/building/macos)
- [Linux Bundle](https://tauri.app/v1/guides/building/linux)

## Electron

**Electron** is a framework for building desktop applications using JavaScript, HTML, and CSS.

### Create TiniJS app

Create a TiniJS app if you haven't already (details at [Get started](/framework/get-started)):

```bash
npx @tinijs/cli@latest new my-app -t blank
```

### Add Electron

Install Electron:

```bash
npm i -D electron electron-serve @electron-forge/cli concurrently wait-on
```

Modify `package.json`:
- Add `main` entry
- Rename client app `dev`, `build` and `preview` scripts to `dev:app`, `build:app` and `preview:app`
- Add Electron `dev` and `build` scripts

```json
{
  "main": "electron/main.js",
  "scripts": {
    "dev:app": "tini dev",
    "build:app": "tini build",
    "preview:app": "tini preview",
    "dev": "concurrently -k \"npm run dev:app\" \"wait-on tcp:3000 && electron electron/dev.js\"",
    "build": "npm run build:app && electron-forge make"
  }
}
```

Create `electron/main.js` (details at [building your first Electron app](https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app#loading-a-web-page-into-a-browserwindow)):

```js
import {app, BrowserWindow} from 'electron';
import serve from 'electron-serve';

const loadURL = serve({directory: '.output'});

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  loadURL(win);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
```

And create `electron/dev.js` for development:

```js
import {app, BrowserWindow} from 'electron';

(async () => {
	await app.whenReady();
	const win = new BrowserWindow();
  win.loadURL('http://localhost:3000');
})();
```

Add `electron` and `electron-serve` to `.eslintrc.json`:

```json
{
  "rules": {
    "node/no-unpublished-import": ["error", {
      "allowModules": ["electron", "electron-serve"]
    }]
  }
}
```

### App development

Now you can run the app in development mode:

```bash
npm run dev
```

### Build distribution package

Import Electron Forge:

```bash
npx electron-forge import
```

Modify scripts:
- Remove the `make` script (use `build` instead)
- Remove the `package` script if not needed
- Remove the `start` script if not needed

Rename `forge.config.js` to `forge.config.cjs` and update [Electron Forge configuration](https://www.electronforge.io/config/configuration) as needed.

```js
module.exports = {
  packagerConfig: {
    ignore: [
      '.tini',
      'app',
      'node_modules',
      // ... and other unnecessary files and folders
    ],
  }
};
```

Add the `out` folder to `.gitignore`.

Finally, to build the distribution package:

```bash
npm run build
```

For more details, please visit [packaging Electron application](https://www.electronjs.org/docs/latest/tutorial/tutorial-packaging).
