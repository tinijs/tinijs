import {unsafeCSS} from 'lit';

export enum VaryGroups {
  Mode = 'mode',
  Scheme = 'scheme',
  Background = 'background',
  Color = 'color',
  Scale = 'scale',
  Wide = 'wide',
  Breakpoint = 'breakpoint',
  Space = 'space',
  Margin = 'margin',
  Padding = 'padding',
  FontSize = 'font-size',
  FontType = 'font-type',
  FontWeight = 'font-weight',
  TextAlign = 'text-align',
  TextTransform = 'text-transform',
  Display = 'display',
  Position = 'position',
  AlignItems = 'align-items',
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
  ContainerType = 'container-type',
  Visibility = 'visibility',
  MixBlendMode = 'mix-blend-mode',
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

export interface WideRenderValues extends RenderValues {
  wide: string;
}
export type WideVaryRender = (values: WideRenderValues) => string;

export interface BreakpointRenderValues extends RenderValues {
  breakpoint: string;
}
export type BreakpointVaryRender = (values: BreakpointRenderValues) => string;

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
  Subtle = 'subtle',
  Contrast = 'contrast',
  Shade = 'shade',
  Tint = 'tint',
}
export const COLOR_SUFFIXES = Object.values(ColorSuffixes);

export enum Colors {
  Primary = 'primary',
  PrimarySubtle = 'primary-subtle',
  PrimaryContrast = 'primary-contrast',
  PrimaryShade = 'primary-shade',
  PrimaryTint = 'primary-tint',
  Secondary = 'secondary',
  SecondarySubtle = 'secondary-subtle',
  SecondaryContrast = 'secondary-contrast',
  SecondaryShade = 'secondary-shade',
  SecondaryTint = 'secondary-tint',
  Tertiary = 'tertiary',
  TertiarySubtle = 'tertiary-subtle',
  TertiaryContrast = 'tertiary-contrast',
  TertiaryShade = 'tertiary-shade',
  TertiaryTint = 'tertiary-tint',
  Success = 'success',
  SuccessSubtle = 'success-subtle',
  SuccessContrast = 'success-contrast',
  SuccessShade = 'success-shade',
  SuccessTint = 'success-tint',
  Danger = 'danger',
  DangerSubtle = 'danger-subtle',
  DangerContrast = 'danger-contrast',
  DangerShade = 'danger-shade',
  DangerTint = 'danger-tint',
  Warning = 'warning',
  WarningSubtle = 'warning-subtle',
  WarningContrast = 'warning-contrast',
  WarningShade = 'warning-shade',
  WarningTint = 'warning-tint',
  Dark = 'dark',
  DarkSubtle = 'dark-subtle',
  DarkContrast = 'dark-contrast',
  DarkShade = 'dark-shade',
  DarkTint = 'dark-tint',
  Medium = 'medium',
  MediumSubtle = 'medium-subtle',
  MediumContrast = 'medium-contrast',
  MediumShade = 'medium-shade',
  MediumTint = 'medium-tint',
  Light = 'light',
  LightSubtle = 'light-subtle',
  LightContrast = 'light-contrast',
  LightShade = 'light-shade',
  LightTint = 'light-tint',
  Background = 'background',
  BackgroundSubtle = 'background-subtle',
  BackgroundContrast = 'background-contrast',
  BackgroundShade = 'background-shade',
  BackgroundTint = 'background-tint',
  Middleground = 'middleground',
  MiddlegroundSubtle = 'middleground-subtle',
  MiddlegroundContrast = 'middleground-contrast',
  MiddlegroundShade = 'middleground-shade',
  MiddlegroundTint = 'middleground-tint',
  Foreground = 'foreground',
  ForegroundSubtle = 'foreground-subtle',
  ForegroundContrast = 'foreground-contrast',
  ForegroundShade = 'foreground-shade',
  ForegroundTint = 'foreground-tint',
}
export enum CommonColors {
  Gray = 'gray',
  GraySubtle = 'gray-subtle',
  GrayContrast = 'gray-contrast',
  GrayShade = 'gray-shade',
  GrayTint = 'gray-tint',
  Zinc = 'zinc',
  ZincSubtle = 'zinc-subtle',
  ZincContrast = 'zinc-contrast',
  ZincShade = 'zinc-shade',
  ZincTint = 'zinc-tint',
  Brown = 'brown',
  BrownSubtle = 'brown-subtle',
  BrownContrast = 'brown-contrast',
  BrownShade = 'brown-shade',
  BrownTint = 'brown-tint',
  Amber = 'amber',
  AmberSubtle = 'amber-subtle',
  AmberContrast = 'amber-contrast',
  AmberShade = 'amber-shade',
  AmberTint = 'amber-tint',
  Yellow = 'yellow',
  YellowSubtle = 'yellow-subtle',
  YellowContrast = 'yellow-contrast',
  YellowShade = 'yellow-shade',
  YellowTint = 'yellow-tint',
  Orange = 'orange',
  OrangeSubtle = 'orange-subtle',
  OrangeContrast = 'orange-contrast',
  OrangeShade = 'orange-shade',
  OrangeTint = 'orange-tint',
  Lime = 'lime',
  LimeSubtle = 'lime-subtle',
  LimeContrast = 'lime-contrast',
  LimeShade = 'lime-shade',
  LimeTint = 'lime-tint',
  Green = 'green',
  GreenSubtle = 'green-subtle',
  GreenContrast = 'green-contrast',
  GreenShade = 'green-shade',
  GreenTint = 'green-tint',
  Teal = 'teal',
  TealSubtle = 'teal-subtle',
  TealContrast = 'teal-contrast',
  TealShade = 'teal-shade',
  TealTint = 'teal-tint',
  Cyan = 'cyan',
  CyanSubtle = 'cyan-subtle',
  CyanContrast = 'cyan-contrast',
  CyanShade = 'cyan-shade',
  CyanTint = 'cyan-tint',
  Blue = 'blue',
  BlueSubtle = 'blue-subtle',
  BlueContrast = 'blue-contrast',
  BlueShade = 'blue-shade',
  BlueTint = 'blue-tint',
  Navy = 'navy',
  NavySubtle = 'navy-subtle',
  NavyContrast = 'navy-contrast',
  NavyShade = 'navy-shade',
  NavyTint = 'navy-tint',
  Indigo = 'indigo',
  IndigoSubtle = 'indigo-subtle',
  IndigoContrast = 'indigo-contrast',
  IndigoShade = 'indigo-shade',
  IndigoTint = 'indigo-tint',
  Violet = 'violet',
  VioletSubtle = 'violet-subtle',
  VioletContrast = 'violet-contrast',
  VioletShade = 'violet-shade',
  VioletTint = 'violet-tint',
  Purple = 'purple',
  PurpleSubtle = 'purple-subtle',
  PurpleContrast = 'purple-contrast',
  PurpleShade = 'purple-shade',
  PurpleTint = 'purple-tint',
  Pink = 'pink',
  PinkSubtle = 'pink-subtle',
  PinkContrast = 'pink-contrast',
  PinkShade = 'pink-shade',
  PinkTint = 'pink-tint',
  Red = 'red',
  RedSubtle = 'red-subtle',
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
  Subtle = ColorSuffixes.Subtle,
  Contrast = ColorSuffixes.Contrast,
  Shade = ColorSuffixes.Shade,
  Tint = ColorSuffixes.Tint,
}

export const GRADIENT_SUFFIXES = Object.values(GradientSuffixes);

export enum Gradients {
  Primary = 'gradient-primary',
  PrimarySubtle = 'gradient-primary-subtle',
  PrimaryContrast = 'gradient-primary-contrast',
  PrimaryShade = 'gradient-primary-shade',
  PrimaryTint = 'gradient-primary-tint',
  Secondary = 'gradient-secondary',
  SecondarySubtle = 'gradient-secondary-subtle',
  SecondaryContrast = 'gradient-secondary-contrast',
  SecondaryShade = 'gradient-secondary-shade',
  SecondaryTint = 'gradient-secondary-tint',
  Tertiary = 'gradient-tertiary',
  TertiarySubtle = 'gradient-tertiary-subtle',
  TertiaryContrast = 'gradient-tertiary-contrast',
  TertiaryShade = 'gradient-tertiary-shade',
  TertiaryTint = 'gradient-tertiary-tint',
  Success = 'gradient-success',
  SuccessSubtle = 'gradient-success-subtle',
  SuccessContrast = 'gradient-success-contrast',
  SuccessShade = 'gradient-success-shade',
  SuccessTint = 'gradient-success-tint',
  Danger = 'gradient-danger',
  DangerSubtle = 'gradient-danger-subtle',
  DangerContrast = 'gradient-danger-contrast',
  DangerShade = 'gradient-danger-shade',
  DangerTint = 'gradient-danger-tint',
  Warning = 'gradient-warning',
  WarningSubtle = 'gradient-warning-subtle',
  WarningContrast = 'gradient-warning-contrast',
  WarningShade = 'gradient-warning-shade',
  WarningTint = 'gradient-warning-tint',
  Dark = 'gradient-dark',
  DarkSubtle = 'gradient-dark-subtle',
  DarkContrast = 'gradient-dark-contrast',
  DarkShade = 'gradient-dark-shade',
  DarkTint = 'gradient-dark-tint',
  Medium = 'gradient-medium',
  MediumSubtle = 'gradient-medium-subtle',
  MediumContrast = 'gradient-medium-contrast',
  MediumShade = 'gradient-medium-shade',
  MediumTint = 'gradient-medium-tint',
  Light = 'gradient-light',
  LightSubtle = 'gradient-light-subtle',
  LightContrast = 'gradient-light-contrast',
  LightShade = 'gradient-light-shade',
  LightTint = 'gradient-light-tint',
  Background = 'gradient-background',
  BackgroundSubtle = 'gradient-background-subtle',
  BackgroundContrast = 'gradient-background-contrast',
  BackgroundShade = 'gradient-background-shade',
  BackgroundTint = 'gradient-background-tint',
  Middleground = 'gradient-middleground',
  MiddlegroundSubtle = 'gradient-middleground-subtle',
  MiddlegroundContrast = 'gradient-middleground-contrast',
  MiddlegroundShade = 'gradient-middleground-shade',
  MiddlegroundTint = 'gradient-middleground-tint',
  Foreground = 'gradient-foreground',
  ForegroundSubtle = 'gradient-foreground-subtle',
  ForegroundContrast = 'gradient-foreground-contrast',
  ForegroundShade = 'gradient-foreground-shade',
  ForegroundTint = 'gradient-foreground-tint',
}
export enum CommonGradients {
  VitalOcean = 'gradient-vital-ocean',
  VitalOceanSubtle = 'gradient-vital-ocean-subtle',
  VitalOceanContrast = 'gradient-vital-ocean-contrast',
  VitalOceanShade = 'gradient-vital-ocean-shade',
  VitalOceanTint = 'gradient-vital-ocean-tint',
  KaleSalad = 'gradient-kale-salad',
  KaleSaladSubtle = 'gradient-kale-salad-subtle',
  KaleSaladContrast = 'gradient-kale-salad-contrast',
  KaleSaladShade = 'gradient-kale-salad-shade',
  KaleSaladTint = 'gradient-kale-salad-tint',
  DiscoClub = 'gradient-disco-club',
  DiscoClubSubtle = 'gradient-disco-club-subtle',
  DiscoClubContrast = 'gradient-disco-club-contrast',
  DiscoClubShade = 'gradient-disco-club-shade',
  DiscoClubTint = 'gradient-disco-club-tint',
  ShadyLane = 'gradient-shady-lane',
  ShadyLaneSubtle = 'gradient-shady-lane-subtle',
  ShadyLaneContrast = 'gradient-shady-lane-contrast',
  ShadyLaneShade = 'gradient-shady-lane-shade',
  ShadyLaneTint = 'gradient-shady-lane-tint',
  RetroWagon = 'gradient-retro-wagon',
  RetroWagonSubtle = 'gradient-retro-wagon-subtle',
  RetroWagonContrast = 'gradient-retro-wagon-contrast',
  RetroWagonShade = 'gradient-retro-wagon-shade',
  RetroWagonTint = 'gradient-retro-wagon-tint',
  FrescoCrush = 'gradient-fresco-crush',
  FrescoCrushSubtle = 'gradient-fresco-crush-subtle',
  FrescoCrushContrast = 'gradient-fresco-crush-contrast',
  FrescoCrushShade = 'gradient-fresco-crush-shade',
  FrescoCrushTint = 'gradient-fresco-crush-tint',
  CucumberWater = 'gradient-cucumber-water',
  CucumberWaterSubtle = 'gradient-cucumber-water-subtle',
  CucumberWaterContrast = 'gradient-cucumber-water-contrast',
  CucumberWaterShade = 'gradient-cucumber-water-shade',
  CucumberWaterTint = 'gradient-cucumber-water-tint',
  SeaSalt = 'gradient-sea-salt',
  SeaSaltSubtle = 'gradient-sea-salt-subtle',
  SeaSaltContrast = 'gradient-sea-salt-contrast',
  SeaSaltShade = 'gradient-sea-salt-shade',
  SeaSaltTint = 'gradient-sea-salt-tint',
  ParFour = 'gradient-par-four',
  ParFourSubtle = 'gradient-par-four-subtle',
  ParFourContrast = 'gradient-par-four-contrast',
  ParFourShade = 'gradient-par-four-shade',
  ParFourTint = 'gradient-par-four-tint',
  OoeyGooey = 'gradient-ooey-gooey',
  OoeyGooeySubtle = 'gradient-ooey-gooey-subtle',
  OoeyGooeyContrast = 'gradient-ooey-gooey-contrast',
  OoeyGooeyShade = 'gradient-ooey-gooey-shade',
  OoeyGooeyTint = 'gradient-ooey-gooey-tint',
  BloodyMimosa = 'gradient-bloody-mimosa',
  BloodyMimosaSubtle = 'gradient-bloody-mimosa-subtle',
  BloodyMimosaContrast = 'gradient-bloody-mimosa-contrast',
  BloodyMimosaShade = 'gradient-bloody-mimosa-shade',
  BloodyMimosaTint = 'gradient-bloody-mimosa-tint',
  LovelyLilly = 'gradient-lovely-lilly',
  LovelyLillySubtle = 'gradient-lovely-lilly-subtle',
  LovelyLillyContrast = 'gradient-lovely-lilly-contrast',
  LovelyLillyShade = 'gradient-lovely-lilly-shade',
  LovelyLillyTint = 'gradient-lovely-lilly-tint',
  AquaSpray = 'gradient-aqua-spray',
  AquaSpraySubtle = 'gradient-aqua-spray-subtle',
  AquaSprayContrast = 'gradient-aqua-spray-contrast',
  AquaSprayShade = 'gradient-aqua-spray-shade',
  AquaSprayTint = 'gradient-aqua-spray-tint',
  MelloYellow = 'gradient-mello-yellow',
  MelloYellowSubtle = 'gradient-mello-yellow-subtle',
  MelloYellowContrast = 'gradient-mello-yellow-contrast',
  MelloYellowShade = 'gradient-mello-yellow-shade',
  MelloYellowTint = 'gradient-mello-yellow-tint',
  DustyCactus = 'gradient-dusty-cactus',
  DustyCactusSubtle = 'gradient-dusty-cactus-subtle',
  DustyCactusContrast = 'gradient-dusty-cactus-contrast',
  DustyCactusShade = 'gradient-dusty-cactus-shade',
  DustyCactusTint = 'gradient-dusty-cactus-tint',
  PremiumDark = 'gradient-premium-dark',
  PremiumDarkSubtle = 'gradient-premium-dark-subtle',
  PremiumDarkContrast = 'gradient-premium-dark-contrast',
  PremiumDarkShade = 'gradient-premium-dark-shade',
  PremiumDarkTint = 'gradient-premium-dark-tint',
  PerfectWhite = 'gradient-perfect-white',
  PerfectWhiteSubtle = 'gradient-perfect-white-subtle',
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

export const COMMON_GRADIENTS_TO_COMMON_COLORS = [
  [CommonGradients.VitalOcean, CommonColors.Blue],
  [CommonGradients.KaleSalad, CommonColors.Cyan],
  [CommonGradients.DiscoClub, CommonColors.Pink],
  [CommonGradients.ShadyLane, CommonColors.Indigo],
  [CommonGradients.RetroWagon, CommonColors.Lime],
  [CommonGradients.FrescoCrush, CommonColors.Brown],
  [CommonGradients.CucumberWater, CommonColors.Gray],
  [CommonGradients.SeaSalt, CommonColors.Navy],
  [CommonGradients.ParFour, CommonColors.Green],
  [CommonGradients.OoeyGooey, CommonColors.Blue],
  [CommonGradients.BloodyMimosa, CommonColors.Red],
  [CommonGradients.LovelyLilly, CommonColors.Gray],
  [CommonGradients.AquaSpray, CommonColors.Blue],
  [CommonGradients.MelloYellow, CommonColors.Lime],
  [CommonGradients.DustyCactus, CommonColors.Yellow],
  [CommonGradients.PremiumDark, CommonColors.Zinc],
  [CommonGradients.PerfectWhite, CommonColors.Gray],
].reduce(
  (result, [key, value]) => {
    result[key] = value;
    GRADIENT_SUFFIXES.forEach(
      suffix => (result[`${key}-${suffix}`] = `${value}-${suffix}`)
    );
    return result;
  },
  {} as Record<string, string>
);
export const COMMON_COLORS_TO_COMMON_GRADIENTS = [
  [CommonColors.Gray, CommonGradients.CucumberWater],
  [CommonColors.Zinc, CommonGradients.PremiumDark],
  [CommonColors.Brown, CommonGradients.SeaSalt],
  [CommonColors.Amber, CommonGradients.FrescoCrush],
  [CommonColors.Yellow, CommonGradients.DustyCactus],
  [CommonColors.Orange, CommonGradients.RetroWagon],
  [CommonColors.Lime, CommonGradients.MelloYellow],
  [CommonColors.Green, CommonGradients.ParFour],
  [CommonColors.Teal, CommonGradients.OoeyGooey],
  [CommonColors.Cyan, CommonGradients.KaleSalad],
  [CommonColors.Blue, CommonGradients.AquaSpray],
  [CommonColors.Navy, CommonGradients.VitalOcean],
  [CommonColors.Indigo, CommonGradients.PerfectWhite],
  [CommonColors.Violet, CommonGradients.ShadyLane],
  [CommonColors.Purple, CommonGradients.LovelyLilly],
  [CommonColors.Pink, CommonGradients.DiscoClub],
  [CommonColors.Red, CommonGradients.BloodyMimosa],
].reduce(
  (result, [key, value]) => {
    result[key] = value;
    COLOR_SUFFIXES.forEach(
      suffix => (result[`${key}-${suffix}`] = `${value}-${suffix}`)
    );
    return result;
  },
  {} as Record<string, string>
);

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

export enum Wides {
  XXXS = Scales.XXXS,
  XXS = Scales.XXS,
  XS = Scales.XS,
  SS = Scales.SS,
  SM = Scales.SM,
  MD = Scales.MD,
  ML = Scales.ML,
  LG = Scales.LG,
  SL = Scales.SL,
  XL = Scales.XL,
  XXL = Scales.XXL,
  XXXL = Scales.XXXL,
}
export const WIDES = Object.values(Wides);

export enum Breakpoints {
  XXXS = '150px',
  XXS = '240px',
  XS = '320px',
  SS = '425px',
  SM = '576px',
  MD = '768px',
  ML = '992px',
  LG = '1024px',
  SL = '1200px',
  XL = '1440px',
  XXL = '2560px',
  XXXL = '3840px',
}
export const BREAKPOINTS = Object.values(Breakpoints);

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

export enum AlignItems {
  Normal = 'normal',
  Center = 'center',
  Start = 'start',
  End = 'end',
  FlexStart = 'flex-start',
  FlexEnd = 'flex-end',
  SelfStart = 'self-start',
  SelfEnd = 'self-end',
  Baseline = 'baseline',
  Stretch = 'stretch',
}
export const ALIGN_ITEMS = Object.values(AlignItems);

export enum JustifyContents {
  Normal = 'normal',
  Center = 'center',
  Left = 'left',
  Right = 'right',
  Start = 'start',
  End = 'end',
  FlexStart = 'flex-start',
  FlexEnd = 'flex-end',
  SpaceBetween = 'space-between',
  SpaceEvenly = 'space-evenly',
  SpaceAround = 'space-around',
  Stretch = 'stretch',
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

export enum ContainerTypes {
  Normal = 'normal',
  Size = 'size',
  InlineSize = 'inline-size',
}
export const CONTAINER_TYPES = Object.values(ContainerTypes);

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

export enum Visibilities {
  Visible = 'visible',
  Hidden = 'hidden',
  Collapse = 'collapse',
}
export const VISIBILITIES = Object.values(Visibilities);

export enum MixBlendModes {
  Normal = 'normal',
  Multiply = 'multiply',
  Screen = 'screen',
  Overlay = 'overlay',
  Darken = 'darken',
  Lighten = 'lighten',
  ColorDodge = 'color-dodge',
  ColorBurn = 'color-burn',
  HardLight = 'hard-light',
  SoftLight = 'soft-light',
  Difference = 'difference',
  Exclusion = 'exclusion',
  Hue = 'hue',
  Saturation = 'saturation',
  Color = 'color',
  Luminosity = 'luminosity',
}
export const MIX_BLEND_MODES = Object.values(MixBlendModes);

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
        const isContrast = suffixName === ColorSuffixes.Contrast;
        const isSubtle = suffixName === ColorSuffixes.Subtle;
        // colors
        const color = `var(--color-${name})`;
        const baseColor = `var(--color-${baseName})`;
        const baseContrast = `var(--color-${baseName}-contrast)`;
        const contrast = isSubtle
          ? 'var(--color-foreground)'
          : isContrast
          ? baseColor
          : baseContrast;
        // render
        return render({
          name,
          groupName,
          fullName,
          baseName,
          suffixName,
          isContrast,
          isSubtle,
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
        const isSubtle = suffixName === GradientSuffixes.Subtle;
        // colors
        const fallbackColorName = (
          COMMON_GRADIENTS_TO_COMMON_COLORS as Record<string, string>
        )[`gradient-${baseName}`] as string;
        const colorName = fallbackColorName || baseName;
        const color = isSubtle
          ? `var(--color-${colorName}-subtle)`
          : `var(--color-${colorName})`;
        const baseColor = `var(--color-${colorName})`;
        const baseContrast = `var(--color-${colorName}-contrast)`;
        const contrast = isSubtle
          ? 'var(--color-foreground)'
          : isContrast
          ? baseColor
          : baseContrast;
        // gradients
        const gradient = `var(--${name})`;
        const baseGradient = `var(--${name})`;
        const baseGradientContrast = `var(--${name}-contrast)`;
        const gradientContrast = isSubtle
          ? 'var(--gradient-foreground)'
          : isContrast
          ? baseGradient
          : baseGradientContrast;
        // render
        return render({
          name,
          groupName,
          fullName,
          baseName,
          colorName,
          suffixName,
          isContrast,
          isSubtle,
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

export function generateWideVaries(render: WideVaryRender) {
  return unsafeCSS(
    WIDES.map(name => {
      const groupName = VaryGroups.Wide;
      const fullName = `${groupName}-${name}`;
      const wide = `var(--wide-${name})`;
      return render({
        name,
        groupName,
        fullName,
        wide,
      });
    }).join('')
  );
}

export function generateBreakpointVaries(render: BreakpointVaryRender) {
  return unsafeCSS(
    Object.entries(Breakpoints)
      .map(([name, breakpoint]) => {
        const groupName = VaryGroups.Breakpoint;
        const fullName = `${groupName}-${name}`;
        return render({
          name,
          groupName,
          fullName,
          breakpoint,
        });
      })
      .join('')
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
