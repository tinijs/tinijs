+++json
{
  "status": "publish",
  "title": "CLI Expansion",
  "category": "server"
}
+++

Expand [Tini CLI](/cli) with more server related commands.

## `server dev`

Run development server.

```bash
npx tini server dev
```

### Options

| Option            | Description                   |
| ----------------- | ----------------------------- |
| `--debug` or `-d` | Log output from all commands. |

## `server build`

Build the server for production.

```bash
npx tini server build
```

## `server preview`

Preview the production build.

```bash
npx tini server preview
```
