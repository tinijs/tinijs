import {unsafeCSS} from 'lit';

export function isGradient(name: string | undefined) {
  return !!name?.startsWith('gradient-');
}

export function isSubtle(name: string | undefined) {
  return name?.slice(-6) === '-subtle';
}

export function colorToGradient(name: string) {
  return COLORS_TO_GRADIENTS[name];
}

export function gradientToColor(name: string) {
  return GRADIENTS_TO_COLORS[name];
}

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
export type ColorVariantRender = (values: ColorRenderValues) => string;
export interface GradientRenderValues extends ColorRenderValues {
  colorName: string;
  baseGradient: string;
  baseGradientContrast: string;
  gradient: string;
  gradientContrast: string;
}
export type GradientVariantRender = (values: GradientRenderValues) => string;

export interface FontRenderValues extends RenderValues {
  font: string;
}
export type FontVariantRender = (values: FontRenderValues) => string;

export interface TextRenderValues extends RenderValues {
  text: string;
}
export type TextVariantRender = (values: TextRenderValues) => string;

export interface WeightRenderValues extends RenderValues {
  weight: string;
}
export type WeightVariantRender = (values: WeightRenderValues) => string;

export interface SizeRenderValues extends RenderValues {
  size: string;
}
export type SizeVariantRender = (values: SizeRenderValues) => string;

export interface RadiusRenderValues extends RenderValues {
  radius: string;
}
export type RadiusVariantRender = (values: RadiusRenderValues) => string;

export interface ShadowRenderValues extends RenderValues {
  shadow: string;
}
export type ShadowVariantRender = (values: ShadowRenderValues) => string;

export enum Colors {
  Back = 'back',
  Middle = 'middle',
  Front = 'front',
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
  Middle = 'middle-subtle',
  Front = 'front-subtle',
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
  Middle = 'gradient-middle',
  Front = 'gradient-front',
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
  Middle = 'gradient-middle-subtle',
  Front = 'gradient-front-subtle',
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
  [Gradients.Middle, Colors.Middle],
  [Gradients.Front, Colors.Front],
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
  [Gradients.CucumberWater, Colors.White],
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
  [Colors.Middle, Gradients.Middle],
  [Colors.Front, Gradients.Front],
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

export enum Fonts {
  Head = 'head',
  Body = 'body',
  Art = 'art',
  Code = 'code',
}
export const FONT_TYPES = Object.values(Fonts);

export enum Texts {
  XS3 = 'xs3',
  XS2 = 'xs2',
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XL2 = 'xl2',
  XL3 = 'xl3',
  XL4 = 'xl4',
  XL5 = 'xl5',
  XL6 = 'xl6',
}
export const TEXTS = Object.values(Texts);

export enum Weights {
  Thin = 'thin',
  Light = 'light',
  Normal = 'normal',
  Medium = 'medium',
  Bold = 'bold',
  Black = 'black',
}
export const FONT_WEIGHTS = Object.values(Weights);

export enum Sizes {
  XS2 = 'xs2',
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XL2 = 'xl2',
}
export const SIZES = Object.values(Sizes);

export enum Spaces {
  XS3 = 'xs3',
  XS2 = 'xs2',
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XL2 = 'xl2',
  XL3 = 'xl3',
  XL4 = 'xl4',
  XL5 = 'xl5',
  XL6 = 'xl6',
}
export const SPACES = Object.values(Spaces);

export enum Radiuses {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  Circle = 'circle',
  Pill = 'pill',
}
export const RADIUSES = Object.values(Radiuses);

export enum Borders {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}
export const BORDERS = Object.values(Borders);

export enum Rings {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}
export const RINGS = Object.values(Rings);

export enum Lines {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}
export const LINES = Object.values(Lines);

export enum Letters {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}
export const LETTERS = Object.values(Letters);

export enum Wides {
  XS3 = 'xs3',
  XS2 = 'xs2',
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XL2 = 'xl2',
  XL3 = 'xl3',
  XL4 = 'xl4',
  XL5 = 'xl5',
  XL6 = 'xl6',
}
export const WIDES = Object.values(Wides);

export enum Shadows {
  Scarcity = 'scarcity',
  Tiny = 'tiny',
  Small = 'small',
  Medium = 'medium',
  Big = 'big',
  Huge = 'huge',
  Excess = 'excess',
}
export const SHADOWS = Object.values(Shadows);

function generateColorVariant(
  render: ColorVariantRender,
  name: Colors | SubtleColors
) {
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
}
export function generateColorVaries(render: ColorVariantRender) {
  return unsafeCSS(
    COLORS.map(name => generateColorVariant(render, name)).join('')
  );
}
export function generateSubtleColorVaries(render: ColorVariantRender) {
  return unsafeCSS(
    SUBTLE_COLORS.map(name => generateColorVariant(render, name)).join('')
  );
}
export function generateAllColorVaries(render: ColorVariantRender) {
  return unsafeCSS(
    ALL_COLORS.map(name => generateColorVariant(render, name)).join('')
  );
}

function generateGradientVariant(
  render: GradientVariantRender,
  name: Gradients | SubtleGradients
) {
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
}
export function generateGradientVaries(render: GradientVariantRender) {
  return unsafeCSS(
    GRADIENTS.map(name => generateGradientVariant(render, name)).join('')
  );
}
export function generateSubtleGradientVaries(render: GradientVariantRender) {
  return unsafeCSS(
    SUBTLE_GRADIENTS.map(name => generateGradientVariant(render, name)).join('')
  );
}
export function generateAllGradientVaries(render: GradientVariantRender) {
  return unsafeCSS(
    ALL_GRADIENTS.map(name => generateGradientVariant(render, name)).join('')
  );
}

export function generateFontVaries(render: FontVariantRender) {
  return unsafeCSS(
    FONT_TYPES.map(name => {
      const prefixName = 'font';
      const fullName = `${prefixName}-${name}`;
      const font = `var(--font-${name})`;
      return render({
        name,
        prefixName,
        fullName,
        font,
      });
    }).join('')
  );
}

export function generateTextVaries(render: TextVariantRender) {
  return unsafeCSS(
    TEXTS.map(name => {
      const prefixName = 'text';
      const fullName = `${prefixName}-${name}`;
      const text = `var(--text-${name})`;
      return render({
        name,
        prefixName,
        fullName,
        text,
      });
    }).join('')
  );
}

export function generateWeightVaries(render: WeightVariantRender) {
  return unsafeCSS(
    FONT_WEIGHTS.map(name => {
      const prefixName = 'weight';
      const fullName = `${prefixName}-${name}`;
      const weight = `var(--weight-${name})`;
      return render({
        name,
        prefixName,
        fullName,
        weight,
      });
    }).join('')
  );
}

export function generateSizeVaries(render: SizeVariantRender) {
  return unsafeCSS(
    SIZES.map(name => {
      const prefixName = 'size';
      const fullName = `${prefixName}-${name}`;
      const size = `var(--size-${name})`;
      return render({
        name,
        prefixName,
        fullName,
        size,
      });
    }).join('')
  );
}

export function generateRadiusVaries(render: RadiusVariantRender) {
  return unsafeCSS(
    RADIUSES.map(name => {
      const prefixName = 'radius';
      const fullName = `${prefixName}-${name}`;
      const radius = `var(--radius-${name})`;
      return render({
        name,
        prefixName,
        fullName,
        radius,
      });
    }).join('')
  );
}

export function generateShadowVaries(render: ShadowVariantRender) {
  return unsafeCSS(
    SHADOWS.map(name => {
      const prefixName = 'shadow';
      const fullName = `${prefixName}-${name}`;
      const shadow = `var(--shadow-${name})`;
      return render({
        name,
        prefixName,
        fullName,
        shadow,
      });
    }).join('')
  );
}
