+++json
{
  "status": "publish",
  "title": "Family Skins",
  "category": "guides"
}
+++

Skin is the look of a theme family, they provide the colors, fonts, sizes and other variables.

```ts
export default css`
  :root {
    --font-title: 'Roboto', sans-serif;
    --color-primary: #007bff;
    --size-radius: .25;
  }
`;
```

Example **iOS light skin**: [ios/skins/light.ts](https://github.com/tinijs/tinijs/blob/main/packages/ui/ui/styles/ios/skins/light.ts)

Example **Fluent dark skin**: [fluent/skins/dark.ts](https://github.com/tinijs/tinijs/blob/main/packages/ui/ui/styles/fluent/skins/dark.ts)

## Skin levels

Skins are available in 3 levels:

### Level 1 - Basic variables

At the basic level, a skin contains a fundamental set of variables, includes:

| Variable                          | Description                                      |
| --------------------------------- | ------------------------------------------------ |
| _Font group_                      |
| `--font-title`                    | Title font                                       |
| `--font-content`                  | Content font                                     |
| `--font-code`                     | Code font                                        |
| _Color group_                     |
| `--color-body`, `*-contrast`      | Body color and its contrast                      |
| `--color-medium`, `*-contrast`    | Medium color and its contrast                    |
| `--color-primary`, `*-contrast`   | Primary color and its contrast                   |
| `--color-secondary`, `*-contrast` | Secondary color and its contrast                 |
| `--color-info`, `*-contrast`      | Info color and its contrast                      |
| `--color-success`, `*-contrast`   | Success color and its contrast                   |
| `--color-warning`, `*-contrast`   | Warning color and its contrast                   |
| `--color-danger`, `*-contrast`    | Danger color and its contrast                    |
| _Grandient group_                 |
| `--gradient-direction`            | Config the direction of auto-generated gradients |
| _Size group_                      |
| `--size-base`                     | Base size                                        |
| `--size-text`                     | Text size                                        |
| `--size-space`                    | Space size                                       |
| `--size-radius`                   | Border radius                                    |
| `--size-border`                   | Border size                                      |
| `--size-outline`                  | Outline size                                     |
| `--size-line`                     | Line height                                      |
| `--size-letter`                   | Letter spacing                                   |
| _Shadow group_                    |
| `--shadow-xs`                     | Extra small shadow                               |
| `--shadow-sm`                     | Small shadow                                     |
| `--shadow-md`                     | Medium shadow                                    |
| `--shadow-lg`                     | Large shadow                                     |
| `--shadow-xl`                     | Extra large shadow                               |
| `--shadow-inset`                  | Inset shadow                                     |

You can use the **Skin Editor** to modify or create level 1 skins.

### Level 2 - Override auto-generated variables

Based on the basic variables above, the system will generate other variables automatically as seen in the [Design Tokens](/ui/design-token).

- Each color will has 5 more variants
- 8 gradients coresponding to the colors
- `--font-art` variable
- 12 text sizes
- 6 font weights
- 5 line heights
- 5 letter spacings
- 5 object sizes
- 12 space sizes
- 10 border radiuses
- 5 border sizes
- 5 outline sizes
- `--shadow-none` variable
- 15 wide variables

At this level, you can fine tune a skin futher by providing above variables manually.

### Level 3 - Component variables

Skins can also provide variables for specific components.
