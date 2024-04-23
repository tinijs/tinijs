+++json
{
  "status": "publish",
  "title": "CLI expansion",
  "category": "content"
}
+++

Expanding [Tini CLI](/cli) with more content related commands.

```ts
export default defineTiniConfig({
  cli: {
    expand: ['@tinijs/content'],
  }
});
```

## `content build`

The build content of the [Tini Content](/module/content) module.

```bash
npx tini content build
```

| Option | Description |
| --- | --- |
| `--dir <value>` or `-d` | Custom source dir, default to `content`. |
| `--outDir <value>` or `-o` | Custom out dir, default to `app/public`. |
