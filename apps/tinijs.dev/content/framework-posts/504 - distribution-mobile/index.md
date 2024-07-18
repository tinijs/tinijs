+++json
{
  "status": "publish",
  "title": "Mobile Apps",
  "category": "distributions"
}
+++

You can use **Tauri 2** or **Capacitor** to build and distribute mobile apps.

## Capacitor

**Capacitor** is a cross-platform native runtime that makes it easy to build performant mobile applications that run natively on iOS, Android, and more using modern web tooling.

First, please follow the [system setup guide](https://capacitorjs.com/docs/getting-started/environment-setup) to prepare the system.

### Create TiniJS app

Create a TiniJS app if you haven't already (details at [Get started](/framework/get-started)):

```bash
npx @tinijs/cli@latest new my-app -t blank
```

### Add Capacitor

Install Capacitor Core and CLI:

```bash
npm i @capacitor/core
npm i -D @capacitor/cli
```

Then, initialize Capacitor using the CLI questionnaire:

```bash
npx cap init
```

- App name: `My App`
- Package ID: `dev.tinijs.myapp`
- Web asset directory: `.output`

Create Android and iOS projects

```bash
# Android
npm i @capacitor/android
npx cap add android

# iOS
npm i @capacitor/ios
npx cap add ios
```

### Run projects

To sync the web app with the native projects:

```bash
npx cap sync
```

Open and run projects:
- [Android](https://capacitorjs.com/docs/android)
- [iOS](https://capacitorjs.com/docs/ios)

## Tauri 2

**Tauri 2** supports building mobile apps using the same codebase as desktop apps. It is currently in [beta](https://v2.tauri.app/blog/tauri-2-0-0-beta/) and supports Android and iOS platforms.

For more details please visit the [Tauri 2 setup guide](https://v2.tauri.app/start/create-project/#manual-setup-tauri-cli)
