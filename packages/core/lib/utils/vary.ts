import {unsafeCSS} from 'lit';

export interface RenderValues {
  name: string;
  prefixName: string;
  fullName: string;
}

export interface ColorRenderValues extends RenderValues {
  baseName: string;
  isSubtle: boolean;
  baseColor: string;
  baseContrast: string;
  color: string;
  contrast: string;
}
export type ColorVaryRender = (values: ColorRenderValues) => string;
export interface GradientRenderValues extends ColorRenderValues {
  colorName: string;
  baseGradient: string;
  baseGradientContrast: string;
  gradient: string;
  gradientContrast: string;
}
export type GradientVaryRender = (values: GradientRenderValues) => string;

export interface ScaleRenderValues extends RenderValues {
  scale: string;
}
export type ScaleVaryRender = (values: ScaleRenderValues) => string;

export interface FontTypeRenderValues extends RenderValues {
  fontType: string;
}
export type FontTypeVaryRender = (values: FontTypeRenderValues) => string;

export interface FontSizeRenderValues extends RenderValues {
  fontSize: string;
}
export type FontSizeVaryRender = (values: FontSizeRenderValues) => string;

export interface FontWeightRenderValues extends RenderValues {
  fontWeight: string;
}
export type FontWeightVaryRender = (values: FontWeightRenderValues) => string;

export interface TextAlignRenderValues extends RenderValues {
  textAlign: string;
}
export type TextAlignVaryRender = (values: TextAlignRenderValues) => string;

export interface TextTransformRenderValues extends RenderValues {
  textTransform: string;
}
export type TextTransformVaryRender = (
  values: TextTransformRenderValues
) => string;

export enum Colors {
  Back = 'back',
  Front = 'front',
  Medium = 'medium',
  Primary = 'primary',
  Secondary = 'secondary',
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
  Black = 'black',
  White = 'white',
  Gray = 'gray',
  Zinc = 'zinc',
  Brown = 'brown',
  Orange = 'orange',
  Amber = 'amber',
  Yellow = 'yellow',
  Lime = 'lime',
  Green = 'green',
  Emerald = 'emerald',
  Teal = 'teal',
  Cyan = 'cyan',
  Sky = 'sky',
  Blue = 'blue',
  Navy = 'navy',
  Indigo = 'indigo',
  Violet = 'violet',
  Purple = 'purple',
  Fuchsia = 'fuchsia',
  Pink = 'pink',
  Rose = 'rose',
  Red = 'red',
}
export enum SubtleColors {
  Back = 'back-subtle',
  Front = 'front-subtle',
  Medium = 'medium-subtle',
  Primary = 'primary-subtle',
  Secondary = 'secondary-subtle',
  Info = 'info-subtle',
  Success = 'success-subtle',
  Warning = 'warning-subtle',
  Danger = 'danger-subtle',
  Black = 'black-subtle',
  White = 'white-subtle',
  Gray = 'gray-subtle',
  Zinc = 'zinc-subtle',
  Brown = 'brown-subtle',
  Orange = 'orange-subtle',
  Amber = 'amber-subtle',
  Yellow = 'yellow-subtle',
  Lime = 'lime-subtle',
  Green = 'green-subtle',
  Emerald = 'emerald-subtle',
  Teal = 'teal-subtle',
  Cyan = 'cyan-subtle',
  Sky = 'sky-subtle',
  Blue = 'blue-subtle',
  Navy = 'navy-subtle',
  Indigo = 'indigo-subtle',
  Violet = 'violet-subtle',
  Purple = 'purple-subtle',
  Fuchsia = 'fuchsia-subtle',
  Pink = 'pink-subtle',
  Rose = 'rose-subtle',
  Red = 'red-subtle',
}
export const COLORS = Object.values(Colors);
export const SUBTLE_COLORS = Object.values(SubtleColors);
export const ALL_COLORS = [...COLORS, ...SUBTLE_COLORS];

export enum Gradients {
  Back = 'gradient-back',
  Front = 'gradient-front',
  Medium = 'gradient-medium',
  Primary = 'gradient-primary',
  Secondary = 'gradient-secondary',
  Info = 'gradient-info',
  Success = 'gradient-success',
  Warning = 'gradient-warning',
  Danger = 'gradient-danger',
  PremiumDark = 'gradient-premium-dark',
  PerfectLight = 'gradient-perfect-light',
  VitalOcean = 'gradient-vital-ocean',
  KaleSalad = 'gradient-kale-salad',
  DiscoClub = 'gradient-disco-club',
  ShadyLane = 'gradient-shady-lane',
  RetroWagon = 'gradient-retro-wagon',
  FrescoCrush = 'gradient-fresco-crush',
  CucumberWater = 'gradient-cucumber-water',
  SeaSalt = 'gradient-sea-salt',
  ParFour = 'gradient-par-four',
  OoeyGooey = 'gradient-ooey-gooey',
  BloodyMimosa = 'gradient-bloody-mimosa',
  LovelyLilly = 'gradient-lovely-lilly',
  AquaSpray = 'gradient-aqua-spray',
  MelloYellow = 'gradient-mello-yellow',
  DustyCactus = 'gradient-dusty-cactus',
}
export enum SubtleGradients {
  Back = 'gradient-back-subtle',
  Front = 'gradient-front-subtle',
  Medium = 'gradient-medium-subtle',
  Primary = 'gradient-primary-subtle',
  Secondary = 'gradient-secondary-subtle',
  Info = 'gradient-info-subtle',
  Success = 'gradient-success-subtle',
  Warning = 'gradient-warning-subtle',
  Danger = 'gradient-danger-subtle',
  PremiumDark = 'gradient-premium-dark-subtle',
  PerfectLight = 'gradient-perfect-light-subtle',
  VitalOcean = 'gradient-vital-ocean-subtle',
  KaleSalad = 'gradient-kale-salad-subtle',
  DiscoClub = 'gradient-disco-club-subtle',
  ShadyLane = 'gradient-shady-lane-subtle',
  RetroWagon = 'gradient-retro-wagon-subtle',
  FrescoCrush = 'gradient-fresco-crush-subtle',
  CucumberWater = 'gradient-cucumber-water-subtle',
  SeaSalt = 'gradient-sea-salt-subtle',
  ParFour = 'gradient-par-four-subtle',
  OoeyGooey = 'gradient-ooey-gooey-subtle',
  BloodyMimosa = 'gradient-bloody-mimosa-subtle',
  LovelyLilly = 'gradient-lovely-lilly-subtle',
  AquaSpray = 'gradient-aqua-spray-subtle',
  MelloYellow = 'gradient-mello-yellow-subtle',
  DustyCactus = 'gradient-dusty-cactus-subtle',
}
export const GRADIENTS = Object.values(Gradients);
export const SUBTLE_GRADIENTS = Object.values(SubtleGradients);
export const ALL_GRADIENTS = [...GRADIENTS, ...SUBTLE_GRADIENTS];

export const GRADIENTS_TO_COLORS = [
  [Gradients.Back, Colors.Back],
  [Gradients.Front, Colors.Front],
  [Gradients.Medium, Colors.Medium],
  [Gradients.Primary, Colors.Primary],
  [Gradients.Secondary, Colors.Secondary],
  [Gradients.Info, Colors.Info],
  [Gradients.Success, Colors.Success],
  [Gradients.Warning, Colors.Warning],
  [Gradients.Danger, Colors.Danger],
  [Gradients.PremiumDark, Colors.Black],
  [Gradients.PerfectLight, Colors.White],
  [Gradients.VitalOcean, Colors.Blue],
  [Gradients.KaleSalad, Colors.Cyan],
  [Gradients.DiscoClub, Colors.Pink],
  [Gradients.ShadyLane, Colors.Indigo],
  [Gradients.RetroWagon, Colors.Lime],
  [Gradients.FrescoCrush, Colors.Brown],
  [Gradients.CucumberWater, Colors.Gray],
  [Gradients.SeaSalt, Colors.Navy],
  [Gradients.ParFour, Colors.Green],
  [Gradients.OoeyGooey, Colors.Blue],
  [Gradients.BloodyMimosa, Colors.Red],
  [Gradients.LovelyLilly, Colors.Gray],
  [Gradients.AquaSpray, Colors.Blue],
  [Gradients.MelloYellow, Colors.Lime],
  [Gradients.DustyCactus, Colors.Yellow],
].reduce(
  (result, [key, value]) => {
    result[key] = value;
    result[`${key}-subtle`] = `${value}-subtle`;
    return result;
  },
  {} as Record<string, string>
);
export const COLORS_TO_GRADIENTS = [
  [Colors.Back, Gradients.Back],
  [Colors.Front, Gradients.Front],
  [Colors.Medium, Gradients.Medium],
  [Colors.Primary, Gradients.Primary],
  [Colors.Secondary, Gradients.Secondary],
  [Colors.Info, Gradients.Info],
  [Colors.Success, Gradients.Success],
  [Colors.Warning, Gradients.Warning],
  [Colors.Danger, Gradients.Danger],
  [Colors.Black, Gradients.PremiumDark],
  [Colors.White, Gradients.PerfectLight],
  [Colors.Gray, Gradients.CucumberWater],
  [Colors.Zinc, Gradients.PremiumDark],
  [Colors.Brown, Gradients.SeaSalt],
  [Colors.Orange, Gradients.RetroWagon],
  [Colors.Amber, Gradients.FrescoCrush],
  [Colors.Yellow, Gradients.DustyCactus],
  [Colors.Lime, Gradients.MelloYellow],
  [Colors.Green, Gradients.ParFour],
  [Colors.Emerald, Gradients.ParFour],
  [Colors.Teal, Gradients.OoeyGooey],
  [Colors.Cyan, Gradients.KaleSalad],
  [Colors.Sky, Gradients.AquaSpray],
  [Colors.Blue, Gradients.AquaSpray],
  [Colors.Navy, Gradients.VitalOcean],
  [Colors.Indigo, Gradients.PerfectLight],
  [Colors.Violet, Gradients.ShadyLane],
  [Colors.Purple, Gradients.LovelyLilly],
  [Colors.Fuchsia, Gradients.LovelyLilly],
  [Colors.Pink, Gradients.DiscoClub],
  [Colors.Rose, Gradients.BloodyMimosa],
  [Colors.Red, Gradients.BloodyMimosa],
].reduce(
  (result, [key, value]) => {
    result[key] = value;
    result[`${key}-subtle`] = `${value}-subtle`;
    return result;
  },
  {} as Record<string, string>
);

export enum Scales {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}
export const SCALES = Object.values(Scales);

export enum FontTypes {
  Head = 'head',
  Body = 'body',
  Quote = 'quote',
  Code = 'code',
}
export const FONT_TYPES = Object.values(FontTypes);

export enum FontSizes {
  '3XS' = '3xs',
  '2XS' = '2xs',
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  '2XL' = '2xl',
  '3XL' = '3xl',
  '4XL' = '4xl',
  '5XL' = '5xl',
}
export const FONT_SIZES = Object.values(FontSizes);

export enum FontWeights {
  Thin = '100',
  Light = '300',
  Regular = '400',
  Medium = '500',
  Bold = '700',
  Black = '900',
}
export const FONT_WEIGHTS = Object.values(FontWeights);

export enum TextAligns {
  Start = 'start',
  End = 'end',
  Left = 'left',
  Right = 'right',
  Center = 'center',
  Justify = 'justify',
  JustifyAll = 'justify-all',
  MatchParent = 'match-parent',
}
export const TEXT_ALIGNS = Object.values(TextAligns);

export enum TextTransforms {
  Capitalize = 'capitalize',
  Lowercase = 'lowercase',
  Uppercase = 'uppercase',
}
export const TEXT_TRANSFORMS = Object.values(TextTransforms);

export function generateColorVaries(
  render: ColorVaryRender,
  excludeCommon = false
) {
  return unsafeCSS(
    (excludeCommon ? COLORS : ALL_COLORS)
      .map(name => {
        const nameArr = name.split('-');
        const isSubtle = nameArr[nameArr.length - 1] === 'subtle';
        const prefixName = 'scheme';
        const fullName = `${prefixName}-${name}`;
        const baseName = nameArr
          .slice(0, !isSubtle ? nameArr.length : nameArr.length - 1)
          .join('-');
        // colors
        const color = `var(--color-${name})`;
        const baseColor = `var(--color-${baseName})`;
        const baseContrast = `var(--color-${baseName}-contrast)`;
        const contrast = isSubtle ? 'var(--color-front)' : baseContrast;
        // render
        return render({
          name,
          isSubtle,
          prefixName,
          fullName,
          baseName,
          baseColor,
          baseContrast,
          color,
          contrast,
        });
      })
      .join('')
  );
}
export function generateGradientVaries(
  render: GradientVaryRender,
  excludeCommon = false
) {
  return unsafeCSS(
    (excludeCommon ? GRADIENTS : ALL_GRADIENTS)
      .map(name => {
        const nameArr = name.replace('gradient-', '').split('-');
        const isSubtle = nameArr[nameArr.length - 1] === 'subtle';
        const prefixName = 'scheme';
        const fullName = `${prefixName}-${name}`;
        const baseName = nameArr
          .slice(0, !isSubtle ? nameArr.length : nameArr.length - 1)
          .join('-');
        // colors
        const colorName = (GRADIENTS_TO_COLORS as Record<string, string>)[
          `gradient-${baseName}`
        ];
        const color = isSubtle
          ? `var(--color-${colorName}-subtle)`
          : `var(--color-${colorName})`;
        const baseColor = `var(--color-${colorName})`;
        const baseContrast = `var(--color-${colorName}-contrast)`;
        const contrast = isSubtle ? 'var(--color-front)' : baseContrast;
        // gradients
        const gradient = `var(--${name})`;
        const baseGradient = `var(--${name})`;
        const baseGradientContrast = `var(--${name}-contrast)`;
        const gradientContrast = isSubtle
          ? 'var(--gradient-front)'
          : baseGradientContrast;
        // render
        return render({
          name,
          isSubtle,
          prefixName,
          fullName,
          baseName,
          colorName,
          baseColor,
          baseContrast,
          color,
          contrast,
          baseGradient,
          baseGradientContrast,
          gradient,
          gradientContrast,
        });
      })
      .join('')
  );
}

export function generateScaleVaries(render: ScaleVaryRender) {
  return unsafeCSS(
    SCALES.map(name => {
      const prefixName = 'scale';
      const fullName = `${prefixName}-${name}`;
      const scale = `var(--scale-${name})`;
      return render({
        name,
        prefixName,
        fullName,
        scale,
      });
    }).join('')
  );
}

export function generateFontTypeVaries(render: FontTypeVaryRender) {
  return unsafeCSS(
    FONT_TYPES.map(name => {
      const prefixName = 'font-type';
      const fullName = `${prefixName}-${name}`;
      const fontType = `var(--font-${name})`;
      return render({
        name,
        prefixName,
        fullName,
        fontType,
      });
    }).join('')
  );
}

export function generateFontSizeVaries(render: FontSizeVaryRender) {
  return unsafeCSS(
    FONT_SIZES.map(name => {
      const prefixName = 'font-size';
      const fullName = `${prefixName}-${name}`;
      const fontSize = `var(--text-${name})`;
      return render({
        name,
        prefixName,
        fullName,
        fontSize,
      });
    }).join('')
  );
}

export function generateFontWeightVaries(render: FontWeightVaryRender) {
  return unsafeCSS(
    FONT_WEIGHTS.map(name => {
      const prefixName = 'font-weight';
      const fullName = `${prefixName}-${name}`;
      const fontWeight = name;
      return render({
        name,
        prefixName,
        fullName,
        fontWeight,
      });
    }).join('')
  );
}

export function generateTextAlignVaries(render: TextAlignVaryRender) {
  return unsafeCSS(
    TEXT_ALIGNS.map(name => {
      const prefixName = 'text-align';
      const fullName = `${prefixName}-${name}`;
      const textAlign = name;
      return render({
        name,
        prefixName,
        fullName,
        textAlign,
      });
    }).join('')
  );
}

export function generateTextTransformVaries(render: TextTransformVaryRender) {
  return unsafeCSS(
    TEXT_TRANSFORMS.map(name => {
      const prefixName = 'text-transform';
      const fullName = `${prefixName}-${name}`;
      const textTransform = name;
      return render({
        name,
        prefixName,
        fullName,
        textTransform,
      });
    }).join('')
  );
}
