+++json
{
  "status": "publish",
  "title": "Design Tokens",
  "category": "guide"
}
+++

## Colors

There are 8 colors from 3 groups:
- **Body**: `body`, `medium`
- **Brand**: `primary`, `secondary`
- **Semantic**: `info`, `success`, `warning`, `danger`

Each colors has total 7 values for different usage:
- **Base**: main value
- **Contrast**: in contrast of the base value
- **Hard**: stronger than base
- **Soft**: weaker than base
- **Semi**: half the base strength
- **Subtle**: very soft
- **Dull**: very soft and pale

The above `hard`, `soft`, `semi`, `subtle`, `dull` are called color strengths in relation to the body color. Those additional colors are generated automatically by the system based on their base colors, but you can also define them manually in [level 2 skins](/ui/skin).

<content-ui-post-token block="color"></content-ui-post-token>

## Gradients

Gradients are similar to colors, for [level 1 skins](/ui/skin) all gradients are generated automatically based on the app colors.

To create 2-color gradients which are not based on the app colors, you can define them in pairs, for example:

```css
--gradient-primary-start: colorA;
--gradient-primary-end: colorB;
--gradient-primary-contrast-start: contrastA;
--gradient-primary-contrast-end: contrastB;
```

To create more advance gradients, define them manually one by one, for example:

```css
--gradient-primary: linear-gradient(...);
--gradient-primary-subtle: linear-gradient(...);
--gradient-primary-contrast: linear-gradient(...);
```

<content-ui-post-token block="gradient"></content-ui-post-token>

## Typography

### Font families

<content-ui-post-token block="font"></content-ui-post-token>

### Font sizes

<content-ui-post-token block="text"></content-ui-post-token>

### Font weights

<content-ui-post-token block="weight"></content-ui-post-token>

### Line heights

<content-ui-post-token block="line"></content-ui-post-token>

### Letter spacings

<content-ui-post-token block="letter"></content-ui-post-token>

## Sizes

### Variant sizes

<content-ui-post-token block="size"></content-ui-post-token>

### Spaces

<content-ui-post-token block="space"></content-ui-post-token>

### Radiuses

<content-ui-post-token block="radius"></content-ui-post-token>

### Borders

<content-ui-post-token block="border"></content-ui-post-token>

### Outlines

<content-ui-post-token block="outline"></content-ui-post-token>

## Shadows

<content-ui-post-token block="shadow"></content-ui-post-token>

## Wides

<content-ui-post-token block="wide"></content-ui-post-token>

## Breakpoints

<content-ui-post-token block="breakpoint"></content-ui-post-token>