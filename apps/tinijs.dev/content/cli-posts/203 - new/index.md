+++json
{
  "status": "publish",
  "title": "new",
  "category": "commands"
}
+++

Create a new project using one of the [Starters](/framework/get-started).

```bash
npx tini new <NAME> [OPTIONS]
```

## Options

| Option | Description |
| --- | --- |
| `--template` or `-t` | The template to be used, default to **Bare**. |
| `--latest` or `-l` | Install the latest released tag. |
| `--version <value>` or `-v` | Use a custom released tag. |
| `--skipInstall` or `-i` | Skip npm install. |
| `--skipGit` or `-g` | Skip git init. |
