+++json
{
  "status": "publish",
  "title": "generate",
  "category": "commands"
}
+++

Generate assets for a new project.

```bash
npx tini generate <TYPE> <NAME> [OPTIONS]
```

Support these types:

- `const` - Shared constants.
- `store` - Stores for global states management.
- `context` - Consumable contexts.
- `class` - Constructors which are intended to be used to construct objects.
- `service` - Groups of similar utilities, you can either import or inject them.
- `layout` - Layouts for pages.
- `page` - App pages for routing purpose.
- `element` - Reusable app elements implement the TiniElement class.
- `icon` - Reusable icon elements.
- `partial` - Small re-usable html tagged templates which can be included in elements and pages.
- `util` - Any type of shareable logic functions, depend on the pattern, you can either import or inject them.
- `type` - Shared Typescript types.

## Options

| Option                   | Description                                 |
| ------------------------ | ------------------------------------------- |
| `--dir <value>` or `-d`  | Custom client app srcDir, default to `app`. |
| `--typePrefixed` or `-t` | Use format `name.type.ext`.                 |
| `--nested` or `-n`       | Nested under the folder with the same name. |
