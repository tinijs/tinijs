import {unsafeCSS} from 'lit';

export enum VaryGroups {
  Scheme = 'scheme',
  Background = 'background',
  Color = 'color',
  Scale = 'scale',
  Space = 'space',
  Margin = 'margin',
  Padding = 'padding',
  FontSize = 'font-size',
  FontType = 'font-type',
  FontWeight = 'font-weight',
  TextAlign = 'text-align',
  TextTransform = 'text-transform',
  JustifyContent = 'justify-content',
  OutlineWidth = 'outline-width',
  OutlineStyle = 'outline-style',
  OutlineColor = 'outline-color',
  OutlineOffset = 'outline-offset',
  BorderWidth = 'border-width',
  BorderStyle = 'border-style',
  BorderColor = 'border-color',
  BorderRadius = 'border-radius',
  BoxShadow = 'box-shadow',
}

export interface RenderValues {
  name: string;
  groupName: string;
  fullName: string;
}

export interface ColorRenderValues extends RenderValues {
  baseName: string;
  suffixName: string;
  isContrast: boolean;
  color: string;
  contrast: string;
}
export type ColorVaryRender = (values: ColorRenderValues) => string;
export interface GradientRenderValues extends ColorRenderValues {
  gradient: string;
  gradientContrast: string;
}
export type GradientVaryRender = (values: GradientRenderValues) => string;

export interface ScaleRenderValues extends RenderValues {
  scale: string;
}
export type ScaleVaryRender = (values: ScaleRenderValues) => string;

export interface SpaceRenderValues extends RenderValues {
  space: string;
}
export type SpaceVaryRender = (values: SpaceRenderValues) => string;

export interface FontSizeRenderValues extends RenderValues {
  size: string;
}
export type FontSizeVaryRender = (values: FontSizeRenderValues) => string;
export interface FontTypeRenderValues extends RenderValues {
  type: string;
}
export type FontTypeVaryRender = (values: FontTypeRenderValues) => string;
export interface FontWeightRenderValues extends RenderValues {
  weight: string;
}
export type FontWeightVaryRender = (values: FontWeightRenderValues) => string;

export interface TextAlignRenderValues extends RenderValues {
  align: string;
}
export type TextAlignVaryRender = (values: TextAlignRenderValues) => string;
export interface TextTransformRenderValues extends RenderValues {
  transform: string;
}
export type TextTransformVaryRender = (
  values: TextTransformRenderValues
) => string;

export interface JustifyContentRenderValues extends RenderValues {
  justify: string;
}
export type JustifyContentVaryRender = (
  values: JustifyContentRenderValues
) => string;

export interface OutlineWidthRenderValues extends RenderValues {
  width: string;
}
export type OutlineWidthVaryRender = (
  values: OutlineWidthRenderValues
) => string;
export interface OutlineStyleRenderValues extends RenderValues {
  style: string;
}
export type OutlineStyleVaryRender = (
  values: OutlineStyleRenderValues
) => string;
export interface OutlineOffsetRenderValues extends RenderValues {
  offset: string;
}
export type OutlineOffsetVaryRender = (
  values: OutlineOffsetRenderValues
) => string;

export interface BorderWidthRenderValues extends RenderValues {
  width: string;
}
export type BorderWidthVaryRender = (values: BorderWidthRenderValues) => string;
export interface BorderStyleRenderValues extends RenderValues {
  style: string;
}
export type BorderStyleVaryRender = (values: BorderStyleRenderValues) => string;
export interface BorderRadiusRenderValues extends RenderValues {
  radius: string;
}
export type BorderRadiusVaryRender = (
  values: BorderRadiusRenderValues
) => string;

export interface BoxShadowRenderValues extends RenderValues {
  shadow: string;
}
export type BoxShadowVaryRender = (values: BoxShadowRenderValues) => string;

export enum ColorSuffixes {
  Contrast = 'contrast',
  Shade = 'shade',
  Tint = 'tint',
}
export const COLOR_SUFFIXES = Object.values(ColorSuffixes);

export enum Colors {
  Primary = 'primary',
  PrimaryContrast = 'primary-contrast',
  PrimaryShade = 'primary-shade',
  PrimaryTint = 'primary-tint',
  Secondary = 'secondary',
  SecondaryContrast = 'secondary-contrast',
  SecondaryShade = 'secondary-shade',
  SecondaryTint = 'secondary-tint',
  Tertiary = 'tertiary',
  TertiaryContrast = 'tertiary-contrast',
  TertiaryShade = 'tertiary-shade',
  TertiaryTint = 'tertiary-tint',
  Success = 'success',
  SuccessContrast = 'success-contrast',
  SuccessShade = 'success-shade',
  SuccessTint = 'success-tint',
  Danger = 'danger',
  DangerContrast = 'danger-contrast',
  DangerShade = 'danger-shade',
  DangerTint = 'danger-tint',
  Warning = 'warning',
  WarningContrast = 'warning-contrast',
  WarningShade = 'warning-shade',
  WarningTint = 'warning-tint',
  Dark = 'dark',
  DarkContrast = 'dark-contrast',
  DarkShade = 'dark-shade',
  DarkTint = 'dark-tint',
  Medium = 'medium',
  MediumContrast = 'medium-contrast',
  MediumShade = 'medium-shade',
  MediumTint = 'medium-tint',
  Light = 'light',
  LightContrast = 'light-contrast',
  LightShade = 'light-shade',
  LightTint = 'light-tint',
  Background = 'background',
  BackgroundContrast = 'background-contrast',
  BackgroundShade = 'background-shade',
  BackgroundTint = 'background-tint',
  Middleground = 'middleground',
  MiddlegroundContrast = 'middleground-contrast',
  MiddlegroundShade = 'middleground-shade',
  MiddlegroundTint = 'middleground-tint',
  Foreground = 'foreground',
  ForegroundContrast = 'foreground-contrast',
  ForegroundShade = 'foreground-shade',
  ForegroundTint = 'foreground-tint',
}
export enum CommonColors {
  Gray = 'gray',
  GrayContrast = 'gray-contrast',
  GrayShade = 'gray-shade',
  GrayTint = 'gray-tint',
  Zinc = 'zinc',
  ZincContrast = 'zinc-contrast',
  ZincShade = 'zinc-shade',
  ZincTint = 'zinc-tint',
  Brown = 'brown',
  BrownContrast = 'brown-contrast',
  BrownShade = 'brown-shade',
  BrownTint = 'brown-tint',
  Amber = 'amber',
  AmberContrast = 'amber-contrast',
  AmberShade = 'amber-shade',
  AmberTint = 'amber-tint',
  Yellow = 'yellow',
  YellowContrast = 'yellow-contrast',
  YellowShade = 'yellow-shade',
  YellowTint = 'yellow-tint',
  Orange = 'orange',
  OrangeContrast = 'orange-contrast',
  OrangeShade = 'orange-shade',
  OrangeTint = 'orange-tint',
  Lime = 'lime',
  LimeContrast = 'lime-contrast',
  LimeShade = 'lime-shade',
  LimeTint = 'lime-tint',
  Green = 'green',
  GreenContrast = 'green-contrast',
  GreenShade = 'green-shade',
  GreenTint = 'green-tint',
  Teal = 'teal',
  TealContrast = 'teal-contrast',
  TealShade = 'teal-shade',
  TealTint = 'teal-tint',
  Cyan = 'cyan',
  CyanContrast = 'cyan-contrast',
  CyanShade = 'cyan-shade',
  CyanTint = 'cyan-tint',
  Blue = 'blue',
  BlueContrast = 'blue-contrast',
  BlueShade = 'blue-shade',
  BlueTint = 'blue-tint',
  Navy = 'navy',
  NavyContrast = 'navy-contrast',
  NavyShade = 'navy-shade',
  NavyTint = 'navy-tint',
  Indigo = 'indigo',
  IndigoContrast = 'indigo-contrast',
  IndigoShade = 'indigo-shade',
  IndigoTint = 'indigo-tint',
  Violet = 'violet',
  VioletContrast = 'violet-contrast',
  VioletShade = 'violet-shade',
  VioletTint = 'violet-tint',
  Purple = 'purple',
  PurpleContrast = 'purple-contrast',
  PurpleShade = 'purple-shade',
  PurpleTint = 'purple-tint',
  Pink = 'pink',
  PinkContrast = 'pink-contrast',
  PinkShade = 'pink-shade',
  PinkTint = 'pink-tint',
  Red = 'red',
  RedContrast = 'red-contrast',
  RedShade = 'red-shade',
  RedTint = 'red-tint',
}
export const COLORS = Object.values(Colors);
export const BASE_COLORS = COLORS.filter(item => !~item.indexOf('-'));
export const COMMON_COLORS = Object.values(CommonColors);
export const BASE_COMMON_COLORS = COMMON_COLORS.filter(
  item => !~item.indexOf('-')
);
export const ALL_COLORS = [...COLORS, ...COMMON_COLORS];
export const ALL_BASE_COLORS = [...BASE_COLORS, ...BASE_COMMON_COLORS];

export enum GradientSuffixes {
  Contrast = ColorSuffixes.Contrast,
  Shade = ColorSuffixes.Shade,
  Tint = ColorSuffixes.Tint,
}

export const GRADIENT_SUFFIXES = Object.values(GradientSuffixes);

export enum Gradients {
  Primary = 'gradient-primary',
  PrimaryContrast = 'gradient-primary-contrast',
  PrimaryShade = 'gradient-primary-shade',
  PrimaryTint = 'gradient-primary-tint',
  Secondary = 'gradient-secondary',
  SecondaryContrast = 'gradient-secondary-contrast',
  SecondaryShade = 'gradient-secondary-shade',
  SecondaryTint = 'gradient-secondary-tint',
  Tertiary = 'gradient-tertiary',
  TertiaryContrast = 'gradient-tertiary-contrast',
  TertiaryShade = 'gradient-tertiary-shade',
  TertiaryTint = 'gradient-tertiary-tint',
  Success = 'gradient-success',
  SuccessContrast = 'gradient-success-contrast',
  SuccessShade = 'gradient-success-shade',
  SuccessTint = 'gradient-success-tint',
  Danger = 'gradient-danger',
  DangerContrast = 'gradient-danger-contrast',
  DangerShade = 'gradient-danger-shade',
  DangerTint = 'gradient-danger-tint',
  Warning = 'gradient-warning',
  WarningContrast = 'gradient-warning-contrast',
  WarningShade = 'gradient-warning-shade',
  WarningTint = 'gradient-warning-tint',
  Dark = 'gradient-dark',
  DarkContrast = 'gradient-dark-contrast',
  DarkShade = 'gradient-dark-shade',
  DarkTint = 'gradient-dark-tint',
  Medium = 'gradient-medium',
  MediumContrast = 'gradient-medium-contrast',
  MediumShade = 'gradient-medium-shade',
  MediumTint = 'gradient-medium-tint',
  Light = 'gradient-light',
  LightContrast = 'gradient-light-contrast',
  LightShade = 'gradient-light-shade',
  LightTint = 'gradient-light-tint',
  Background = 'gradient-background',
  BackgroundContrast = 'gradient-background-contrast',
  BackgroundShade = 'gradient-background-shade',
  BackgroundTint = 'gradient-background-tint',
  Middleground = 'gradient-middleground',
  MiddlegroundContrast = 'gradient-middleground-contrast',
  MiddlegroundShade = 'gradient-middleground-shade',
  MiddlegroundTint = 'gradient-middleground-tint',
  Foreground = 'gradient-foreground',
  ForegroundContrast = 'gradient-foreground-contrast',
  ForegroundShade = 'gradient-foreground-shade',
  ForegroundTint = 'gradient-foreground-tint',
}
export enum CommonGradients {
  VitalOcean = 'gradient-vital-ocean',
  VitalOceanContrast = 'gradient-vital-ocean-contrast',
  VitalOceanShade = 'gradient-vital-ocean-shade',
  VitalOceanTint = 'gradient-vital-ocean-tint',
  KaleSalad = 'gradient-kale-salad',
  KaleSaladContrast = 'gradient-kale-salad-contrast',
  KaleSaladShade = 'gradient-kale-salad-shade',
  KaleSaladTint = 'gradient-kale-salad-tint',
  DiscoClub = 'gradient-disco-club',
  DiscoClubContrast = 'gradient-disco-club-contrast',
  DiscoClubShade = 'gradient-disco-club-shade',
  DiscoClubTint = 'gradient-disco-club-tint',
  ShadyLane = 'gradient-shady-lane',
  ShadyLaneContrast = 'gradient-shady-lane-contrast',
  ShadyLaneShade = 'gradient-shady-lane-shade',
  ShadyLaneTint = 'gradient-shady-lane-tint',
  RetroWagon = 'gradient-retro-wagon',
  RetroWagonContrast = 'gradient-retro-wagon-contrast',
  RetroWagonShade = 'gradient-retro-wagon-shade',
  RetroWagonTint = 'gradient-retro-wagon-tint',
  FrescoCrush = 'gradient-fresco-crush',
  FrescoCrushContrast = 'gradient-fresco-crush-contrast',
  FrescoCrushShade = 'gradient-fresco-crush-shade',
  FrescoCrushTint = 'gradient-fresco-crush-tint',
  CucumberWater = 'gradient-cucumber-water',
  CucumberWaterContrast = 'gradient-cucumber-water-contrast',
  CucumberWaterShade = 'gradient-cucumber-water-shade',
  CucumberWaterTint = 'gradient-cucumber-water-tint',
  SeaSalt = 'gradient-sea-salt',
  SeaSaltContrast = 'gradient-sea-salt-contrast',
  SeaSaltShade = 'gradient-sea-salt-shade',
  SeaSaltTint = 'gradient-sea-salt-tint',
  ParFour = 'gradient-par-four',
  ParFourContrast = 'gradient-par-four-contrast',
  ParFourShade = 'gradient-par-four-shade',
  ParFourTint = 'gradient-par-four-tint',
  OoeyGooey = 'gradient-ooey-gooey',
  OoeyGooeyContrast = 'gradient-ooey-gooey-contrast',
  OoeyGooeyShade = 'gradient-ooey-gooey-shade',
  OoeyGooeyTint = 'gradient-ooey-gooey-tint',
  BloodyMimosa = 'gradient-bloody-mimosa',
  BloodyMimosaContrast = 'gradient-bloody-mimosa-contrast',
  BloodyMimosaShade = 'gradient-bloody-mimosa-shade',
  BloodyMimosaTint = 'gradient-bloody-mimosa-tint',
  LovelyLilly = 'gradient-lovely-lilly',
  LovelyLillyContrast = 'gradient-lovely-lilly-contrast',
  LovelyLillyShade = 'gradient-lovely-lilly-shade',
  LovelyLillyTint = 'gradient-lovely-lilly-tint',
  AquaSpray = 'gradient-aqua-spray',
  AquaSprayContrast = 'gradient-aqua-spray-contrast',
  AquaSprayShade = 'gradient-aqua-spray-shade',
  AquaSprayTint = 'gradient-aqua-spray-tint',
  MelloYellow = 'gradient-mello-yellow',
  MelloYellowContrast = 'gradient-mello-yellow-contrast',
  MelloYellowShade = 'gradient-mello-yellow-shade',
  MelloYellowTint = 'gradient-mello-yellow-tint',
  DustyCactus = 'gradient-dusty-cactus',
  DustyCactusContrast = 'gradient-dusty-cactus-contrast',
  DustyCactusShade = 'gradient-dusty-cactus-shade',
  DustyCactusTint = 'gradient-dusty-cactus-tint',
  PremiumDark = 'gradient-premium-dark',
  PremiumDarkContrast = 'gradient-premium-dark-contrast',
  PremiumDarkShade = 'gradient-premium-dark-shade',
  PremiumDarkTint = 'gradient-premium-dark-tint',
  PerfectWhite = 'gradient-perfect-white',
  PerfectWhiteContrast = 'gradient-perfect-white-contrast',
  PerfectWhiteShade = 'gradient-perfect-white-shade',
  PerfectWhiteTint = 'gradient-perfect-white-tint',
}
export const GRADIENTS = Object.values(Gradients);
export const BASE_GRADIENTS = GRADIENTS.filter(
  item => item.split('-').length <= 2
);
export const COMMON_GRADIENTS = Object.values(CommonGradients);
export const BASE_COMMON_GRADIENTS = COMMON_GRADIENTS.filter(
  item => item.split('-').length <= 3
);
export const ALL_GRADIENTS = [...GRADIENTS, ...COMMON_GRADIENTS];
export const ALL_BASE_GRADIENTS = [...BASE_GRADIENTS, ...BASE_COMMON_GRADIENTS];

export enum Scales {
  XXXS = 'xxxs',
  XXS = 'xxs',
  XS = 'xs',
  SS = 'ss',
  SM = 'sm',
  MD = 'md',
  ML = 'ml',
  LG = 'lg',
  SL = 'sl',
  XL = 'xl',
  XXL = 'xxl',
  XXXL = 'xxxl',
}
export const SCALES = Object.values(Scales);

export enum Factors {
  X0 = '0x',
  X0_1 = '0_1x',
  X0_2 = '0_2x',
  X0_25 = '0_25x',
  X0_3 = '0_3x',
  X0_4 = '0_4x',
  X0_5 = '0_5x',
  X0_6 = '0_6x',
  X0_7 = '0_7x',
  X0_75 = '0_75x',
  X0_8 = '0_8x',
  X0_9 = '0_9x',
  X1 = '1x',
  X1_25 = '1_25x',
  X1_5 = '1_5x',
  X1_75 = '1_75x',
  X2 = '2x',
  X3 = '3x',
  X4 = '4x',
  X5 = '5x',
  X6 = '6x',
  X7 = '7x',
  X8 = '8x',
  X9 = '9x',
  X10 = '10x',
}
export const FACTORS = Object.values(Factors);

export enum FontTypes {
  Head = 'head',
  Body = 'body',
  Quote = 'quote',
  Code = 'code',
}
export const FONT_TYPES = Object.values(FontTypes);

export enum FontWeights {
  Thin = '100',
  ExtraLight = '200',
  Light = '300',
  Regular = '400',
  Medium = '500',
  SemiBold = '600',
  Bold = '700',
  ExtraBold = '800',
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

export enum JustifyContents {
  Center = 'center',
  Left = 'left',
  Right = 'right',
  SpaceBetween = 'space-between',
  SpaceEvenly = 'space-evenly',
  SpaceAround = 'space-around',
}
export const JUSTIFY_CONTENTS = Object.values(JustifyContents);

export enum OutlineWidths {
  Zero = 'zero',
  Tiny = 'tiny',
  Small = 'small',
  Base = 'base',
  Big = 'big',
  Huge = 'huge',
  Massive = 'massive',
}
export const OUTLINE_WIDTHS = Object.values(OutlineWidths);

export enum OutlineStyles {
  Solid = 'solid',
  Dashed = 'dashed',
  Dotted = 'dotted',
  Double = 'double',
  Groove = 'groove',
  Ridge = 'ridge',
  Inset = 'inset',
  Outset = 'outset',
  Hidden = 'hidden',
  None = 'none',
}
export const OUTLINE_STYLES = Object.values(OutlineStyles);

export enum OutlineOffsets {
  Zero = OutlineWidths.Zero,
  Tiny = OutlineWidths.Tiny,
  Small = OutlineWidths.Small,
  Base = OutlineWidths.Base,
  Big = OutlineWidths.Big,
  Huge = OutlineWidths.Huge,
  Massive = OutlineWidths.Massive,
}
export const OUTLINE_OFFSETS = Object.values(OutlineOffsets);

export enum BorderWidths {
  Zero = OutlineWidths.Zero,
  Tiny = OutlineWidths.Tiny,
  Small = OutlineWidths.Small,
  Base = OutlineWidths.Base,
  Big = OutlineWidths.Big,
  Huge = OutlineWidths.Huge,
  Massive = OutlineWidths.Massive,
}
export const BORDER_WIDTHS = Object.values(BorderWidths);

export enum BorderStyles {
  Solid = OutlineStyles.Solid,
  Dashed = OutlineStyles.Dashed,
  Dotted = OutlineStyles.Dotted,
  Double = OutlineStyles.Double,
  Groove = OutlineStyles.Groove,
  Ridge = OutlineStyles.Ridge,
  Inset = OutlineStyles.Inset,
  Outset = OutlineStyles.Outset,
  Hidden = OutlineStyles.Hidden,
  None = OutlineStyles.None,
}
export const BORDER_STYLES = Object.values(BorderStyles);

export enum BorderRadiuses {
  Zero = OutlineWidths.Zero,
  Tiny = OutlineWidths.Tiny,
  Small = OutlineWidths.Small,
  Base = OutlineWidths.Base,
  Big = OutlineWidths.Big,
  Huge = OutlineWidths.Huge,
  Massive = OutlineWidths.Massive,
  Quarter = 'quarter',
  Half = 'half',
  ThreeQuarters = 'three-quarters',
  Full = 'full',
  Max = 'max',
}
export const BORDER_RADIUSES = Object.values(BorderRadiuses);

export enum BoxShadows {
  None = 'none',
  Normal = 'normal',
  Least = 'least',
  Lesser = 'lesser',
  Greater = 'greater',
  Greatest = 'greatest',
  Scarcity = 'scarcity',
  Excess = 'excess',
}
export const BOX_SHADOWS = Object.values(BoxShadows);

export enum Displays {
  None = 'none',
  Block = 'block',
  Inline = 'inline',
  InlineBlock = 'inline-block',
  Flex = 'flex',
  InlineFlex = 'inline-flex',
  Grid = 'grid',
  InlineGrid = 'inline-grid',
  FlowRoot = 'flow-root',
  Contents = 'contents',
}
export const DISPLAYS = Object.values(Displays);

export enum Positions {
  Static = 'static',
  Relative = 'relative',
  Absolute = 'absolute',
  Fixed = 'fixed',
  Sticky = 'sticky',
}
export const POSITIONS = Object.values(Positions);

export function generateColorVaries(
  render: ColorVaryRender,
  excludeCommon = false
) {
  return unsafeCSS(
    (excludeCommon ? COLORS : ALL_COLORS)
      .map(name => {
        const nameSplits = name.split('-');
        const lastSegment = nameSplits[nameSplits.length - 1];
        const suffixName =
          nameSplits.length < 2 ||
          !~COLOR_SUFFIXES.indexOf(lastSegment as ColorSuffixes)
            ? ''
            : lastSegment;
        const groupName = VaryGroups.Scheme;
        const fullName = `${groupName}-${name}`;
        const baseName = nameSplits
          .slice(0, !suffixName ? nameSplits.length : nameSplits.length - 1)
          .join('-');
        const isContrast = suffixName === GradientSuffixes.Contrast;
        // colors
        const color = `var(--color-${name})`;
        const contrast = `var(${
          isContrast ? `--color-${baseName}` : `--color-${baseName}-contrast`
        })`;
        // render
        return render({
          name,
          groupName,
          fullName,
          baseName,
          suffixName,
          isContrast,
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
        const nameSplits = name.replace('gradient-', '').split('-');
        const lastSegment = nameSplits[nameSplits.length - 1];
        const suffixName =
          nameSplits.length < 2 ||
          !~GRADIENT_SUFFIXES.indexOf(lastSegment as GradientSuffixes)
            ? ''
            : lastSegment;
        const groupName = VaryGroups.Scheme;
        const fullName = `${groupName}-${name}`;
        const baseName = nameSplits
          .slice(0, !suffixName ? nameSplits.length : nameSplits.length - 1)
          .join('-');
        const isContrast = suffixName === GradientSuffixes.Contrast;
        // colors
        const color = `var(--color-${baseName})`;
        const contrast = `var(${
          isContrast ? `--color-${baseName}` : `--color-${baseName}-contrast`
        })`;
        // gradients
        const gradient = `var(--${name})`;
        const gradientContrast = `var(${
          isContrast ? `--${name}` : `--${name}-contrast`
        })`;
        // render
        return render({
          name,
          groupName,
          fullName,
          baseName,
          suffixName,
          isContrast,
          color,
          contrast,
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
      const groupName = VaryGroups.Scale;
      const fullName = `${groupName}-${name}`;
      const scale = `var(--scale-${name})`;
      return render({
        name,
        groupName,
        fullName,
        scale,
      });
    }).join('')
  );
}

export function generateSpaceVaries(render: SpaceVaryRender) {
  return unsafeCSS(
    FACTORS.map(name => {
      const groupName = VaryGroups.Space;
      const fullName = `${groupName}-${name}`;
      const space = `var(--size-space-${name})`;
      return render({
        name,
        groupName,
        fullName,
        space,
      });
    }).join('')
  );
}

export function generateFontSizeVaries(render: FontSizeVaryRender) {
  return unsafeCSS(
    FACTORS.map(name => {
      const groupName = VaryGroups.FontSize;
      const fullName = `${groupName}-${name}`;
      const size = `var(--size-text-${name})`;
      return render({
        name,
        groupName,
        fullName,
        size,
      });
    }).join('')
  );
}
export function generateFontTypeVaries(render: FontTypeVaryRender) {
  return unsafeCSS(
    FONT_TYPES.map(name => {
      const groupName = VaryGroups.FontType;
      const fullName = `${groupName}-${name}`;
      const type = `var(--font-${name})`;
      return render({
        name,
        groupName,
        fullName,
        type,
      });
    }).join('')
  );
}
export function generateFontWeightVaries(render: FontWeightVaryRender) {
  return unsafeCSS(
    FONT_WEIGHTS.map(name => {
      const groupName = VaryGroups.FontWeight;
      const fullName = `${groupName}-${name}`;
      const weight = name;
      return render({
        name,
        groupName,
        fullName,
        weight,
      });
    }).join('')
  );
}

export function generateTextAlignVaries(render: TextAlignVaryRender) {
  return unsafeCSS(
    TEXT_ALIGNS.map(name => {
      const groupName = VaryGroups.TextAlign;
      const fullName = `${groupName}-${name}`;
      const align = name;
      return render({
        name,
        groupName,
        fullName,
        align,
      });
    }).join('')
  );
}

export function generateTextTransformVaries(render: TextTransformVaryRender) {
  return unsafeCSS(
    TEXT_TRANSFORMS.map(name => {
      const groupName = VaryGroups.TextTransform;
      const fullName = `${groupName}-${name}`;
      const transform = name;
      return render({
        name,
        groupName,
        fullName,
        transform,
      });
    }).join('')
  );
}

export function generateJustifyContentVaries(render: JustifyContentVaryRender) {
  return unsafeCSS(
    JUSTIFY_CONTENTS.map(name => {
      const groupName = VaryGroups.JustifyContent;
      const fullName = `${groupName}-${name}`;
      const justify = name;
      return render({
        name,
        groupName,
        fullName,
        justify,
      });
    }).join('')
  );
}

export function generateOutlineWidthVaries(render: OutlineWidthVaryRender) {
  return unsafeCSS(
    OUTLINE_WIDTHS.map(name => {
      const groupName = VaryGroups.OutlineWidth;
      const fullName = `${groupName}-${name}`;
      const width = `var(--size-outline-${name})`;
      return render({
        name,
        groupName,
        fullName,
        width,
      });
    }).join('')
  );
}
export function generateOutlineStyleVaries(render: OutlineStyleVaryRender) {
  return unsafeCSS(
    OUTLINE_STYLES.map(name => {
      const groupName = VaryGroups.OutlineStyle;
      const fullName = `${groupName}-${name}`;
      const style = name;
      return render({
        name,
        groupName,
        fullName,
        style,
      });
    }).join('')
  );
}
export function generateOutlineOffsetVaries(render: OutlineOffsetVaryRender) {
  return unsafeCSS(
    OUTLINE_OFFSETS.map(name => {
      const groupName = VaryGroups.OutlineOffset;
      const fullName = `${groupName}-${name}`;
      const offset = `var(--size-outline-${name})`;
      return render({
        name,
        groupName,
        fullName,
        offset,
      });
    }).join('')
  );
}

export function generateBorderWidthVaries(render: BorderWidthVaryRender) {
  return unsafeCSS(
    BORDER_WIDTHS.map(name => {
      const groupName = VaryGroups.BorderWidth;
      const fullName = `${groupName}-${name}`;
      const width = `var(--size-border-${name})`;
      return render({
        name,
        groupName,
        fullName,
        width,
      });
    }).join('')
  );
}
export function generateBorderStyleVaries(render: BorderStyleVaryRender) {
  return unsafeCSS(
    BORDER_STYLES.map(name => {
      const groupName = VaryGroups.BorderStyle;
      const fullName = `${groupName}-${name}`;
      const style = name;
      return render({
        name,
        groupName,
        fullName,
        style,
      });
    }).join('')
  );
}
export function generateBorderRadiusVaries(render: BorderRadiusVaryRender) {
  return unsafeCSS(
    BORDER_RADIUSES.map(name => {
      const groupName = VaryGroups.BorderRadius;
      const fullName = `${groupName}-${name}`;
      const radius = `var(--size-radius-${name})`;
      return render({
        name,
        groupName,
        fullName,
        radius,
      });
    }).join('')
  );
}

export function generateBoxShadowVaries(render: BoxShadowVaryRender) {
  return unsafeCSS(
    BOX_SHADOWS.map(name => {
      const groupName = VaryGroups.BoxShadow;
      const fullName = `${groupName}-${name}`;
      const shadow = `var(--shadow-${name})`;
      return render({
        name,
        groupName,
        fullName,
        shadow,
      });
    }).join('')
  );
}
