import {unsafeCSS} from 'lit';

export function isGradient(name: string | undefined) {
  return !!name?.startsWith('gradient-');
}

export function isSubtle(name: string | undefined) {
  return name?.slice(-6) === '-subtle';
}

export interface RenderValues {
  name: string;
  prefixName: string;
  fullName: string;
  hostSelector: string;
  mainSelector: string;
}

export interface ColorRenderValues extends RenderValues {
  baseName: string;
  isSubtle: boolean;
  isContrast: boolean;
  baseColor: string;
  baseColorMore: string;
  baseColorLess: string;
  baseColorSemi: string;
  baseColorSubtle: string;
  baseColorDull: string;
  baseColorContrast: string;
  color: string;
  contrast: string;
}
export type ColorVariantRender = (values: ColorRenderValues) => string;
export interface GradientRenderValues extends ColorRenderValues {
  baseGradient: string;
  baseGradientMore: string;
  baseGradientLess: string;
  baseGradientSemi: string;
  baseGradientSubtle: string;
  baseGradientDull: string;
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
  Body = 'body',
  Medium = 'medium',
  Primary = 'primary',
  Secondary = 'secondary',
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
}
export enum SubtleColors {
  Body = 'body-subtle',
  Medium = 'medium-subtle',
  Primary = 'primary-subtle',
  Secondary = 'secondary-subtle',
  Info = 'info-subtle',
  Success = 'success-subtle',
  Warning = 'warning-subtle',
  Danger = 'danger-subtle',
}
export enum ContrastColors {
  Body = 'body-contrast',
  Medium = 'medium-contrast',
  Primary = 'primary-contrast',
  Secondary = 'secondary-contrast',
  Info = 'info-contrast',
  Success = 'success-contrast',
  Warning = 'warning-contrast',
  Danger = 'danger-contrast',
}
export const COLORS = Object.values(Colors);
export const SUBTLE_COLORS = Object.values(SubtleColors);
export const CONTRAST_COLORS = Object.values(ContrastColors);
export const ALL_COLORS = [...COLORS, ...SUBTLE_COLORS, ...CONTRAST_COLORS];

export enum Gradients {
  Body = 'gradient-body',
  Medium = 'gradient-medium',
  Primary = 'gradient-primary',
  Secondary = 'gradient-secondary',
  Info = 'gradient-info',
  Success = 'gradient-success',
  Warning = 'gradient-warning',
  Danger = 'gradient-danger',
}
export enum SubtleGradients {
  Body = 'gradient-body-subtle',
  Medium = 'gradient-medium-subtle',
  Primary = 'gradient-primary-subtle',
  Secondary = 'gradient-secondary-subtle',
  Info = 'gradient-info-subtle',
  Success = 'gradient-success-subtle',
  Warning = 'gradient-warning-subtle',
  Danger = 'gradient-danger-subtle',
}
export enum ContrastGradients {
  Body = 'gradient-body-contrast',
  Medium = 'gradient-medium-contrast',
  Primary = 'gradient-primary-contrast',
  Secondary = 'gradient-secondary-contrast',
  Info = 'gradient-info-contrast',
  Success = 'gradient-success-contrast',
  Warning = 'gradient-warning-contrast',
  Danger = 'gradient-danger-contrast',
}
export const GRADIENTS = Object.values(Gradients);
export const SUBTLE_GRADIENTS = Object.values(SubtleGradients);
export const CONTRAST_GRADIENTS = Object.values(ContrastGradients);
export const ALL_GRADIENTS = [
  ...GRADIENTS,
  ...SUBTLE_GRADIENTS,
  ...CONTRAST_GRADIENTS,
];

export enum Fonts {
  Title = 'title',
  Content = 'content',
  Code = 'code',
  Art = 'art',
}
export const FONTS = Object.values(Fonts);

export enum Texts {
  XS3 = 'xs-3',
  XS2 = 'xs-2',
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XL2 = 'xl-2',
  XL3 = 'xl-3',
  XL4 = 'xl-4',
  XL5 = 'xl-5',
  XL6 = 'xl-6',
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
export const WEIGHTS = Object.values(Weights);

export enum Sizes {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}
export const SIZES = Object.values(Sizes);

export enum Spaces {
  Zero = 'zero',
  XS3 = 'xs-3',
  XS2 = 'xs-2',
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XL2 = 'xl-2',
  XL3 = 'xl-3',
  XL4 = 'xl-4',
  XL5 = 'xl-5',
  XL6 = 'xl-6',
}
export const SPACES = Object.values(Spaces);

export enum Radiuses {
  Zero = 'zero',
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  Quarter = 'quarter',
  Third = 'third',
  Half = 'half',
  Full = 'full',
}
export const RADIUSES = Object.values(Radiuses);

export enum Borders {
  Zero = 'zero',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}
export const BORDERS = Object.values(Borders);

export enum Rings {
  Zero = 'zero',
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
  XS6 = 'xs-6',
  XS5 = 'xs-5',
  XS4 = 'xs-4',
  XS3 = 'xs-3',
  XS2 = 'xs-2',
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XL2 = 'xl-2',
  XL3 = 'xl-3',
  XL4 = 'xl-4',
  XL5 = 'xl-5',
  XL6 = 'xl-6',
}
export const WIDES = Object.values(Wides);

export enum Shadows {
  None = 'none',
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  Inset = 'inset',
}
export const SHADOWS = Object.values(Shadows);

function buildNamesAndSelectors(prefixName: string, name: string) {
  const fullName = `${prefixName}-${name}`;
  const hostSelector = `:host([${prefixName}='${name}'])`;
  const mainSelector = `.${fullName}`;
  return {prefixName, fullName, hostSelector, mainSelector};
}

function generateColorVariant(
  render: ColorVariantRender,
  name: Colors | SubtleColors | ContrastColors,
  prefixName?: string
) {
  prefixName ||= 'scheme';
  const nameArr = name.split('-');
  const isSubtle = nameArr[nameArr.length - 1] === 'subtle';
  const isContrast = nameArr[nameArr.length - 1] === 'contrast';
  const baseName = nameArr
    .slice(0, isSubtle || isContrast ? nameArr.length - 1 : nameArr.length)
    .join('-');
  // colors
  const baseColor = `var(--color-${baseName})`;
  const baseColorMore = `var(--color-${baseName}-more)`;
  const baseColorLess = `var(--color-${baseName}-less)`;
  const baseColorSemi = `var(--color-${baseName}-semi)`;
  const baseColorSubtle = `var(--color-${baseName}-subtle)`;
  const baseColorDull = `var(--color-${baseName}-dull)`;
  const baseColorContrast = `var(--color-${baseName}-contrast)`;
  const color = `var(--color-${name})`;
  const contrast = isSubtle || isContrast ? baseColor : baseColorContrast;
  // names and selectors
  const {fullName, hostSelector, mainSelector} = buildNamesAndSelectors(
    prefixName,
    name
  );
  // render
  return render({
    name,
    prefixName,
    baseName,
    isSubtle,
    isContrast,
    baseColor,
    baseColorMore,
    baseColorLess,
    baseColorSemi,
    baseColorSubtle,
    baseColorDull,
    baseColorContrast,
    color,
    contrast,
    fullName,
    hostSelector,
    mainSelector,
  });
}
export function generateColorVariants(
  render: ColorVariantRender,
  prefixName?: string
) {
  return unsafeCSS(
    COLORS.map(name => generateColorVariant(render, name, prefixName)).join('')
  );
}
export function generateSubtleColorVariants(
  render: ColorVariantRender,
  prefixName?: string
) {
  return unsafeCSS(
    SUBTLE_COLORS.map(name =>
      generateColorVariant(render, name, prefixName)
    ).join('')
  );
}
export function generateContrastColorVariants(
  render: ColorVariantRender,
  prefixName?: string
) {
  return unsafeCSS(
    CONTRAST_COLORS.map(name =>
      generateColorVariant(render, name, prefixName)
    ).join('')
  );
}
export function generateAllColorVariants(
  render: ColorVariantRender,
  prefixName?: string
) {
  return unsafeCSS(
    ALL_COLORS.map(name => generateColorVariant(render, name, prefixName)).join(
      ''
    )
  );
}

function generateGradientVariant(
  render: GradientVariantRender,
  name: Gradients | SubtleGradients | ContrastGradients,
  prefixName?: string
) {
  prefixName ||= 'scheme';
  const nameArr = name.replace('gradient-', '').split('-');
  const isSubtle = nameArr[nameArr.length - 1] === 'subtle';
  const isContrast = nameArr[nameArr.length - 1] === 'contrast';
  const baseName = nameArr
    .slice(0, isSubtle || isContrast ? nameArr.length - 1 : nameArr.length)
    .join('-');
  // colors
  const baseColor = `var(--color-${baseName})`;
  const baseColorMore = `var(--color-${baseName}-more)`;
  const baseColorLess = `var(--color-${baseName}-less)`;
  const baseColorSemi = `var(--color-${baseName}-semi)`;
  const baseColorSubtle = `var(--color-${baseName}-subtle)`;
  const baseColorDull = `var(--color-${baseName}-dull)`;
  const baseColorContrast = `var(--color-${baseName}-contrast)`;
  const color = `var(--color-${baseName}${!isSubtle ? '' : '-subtle'})`;
  const contrast = isSubtle || isContrast ? baseColor : baseColorContrast;
  // gradients
  const baseGradient = `var(--gradient-${baseName})`;
  const baseGradientMore = `var(--gradient-${baseName}-more)`;
  const baseGradientLess = `var(--gradient-${baseName}-less)`;
  const baseGradientSemi = `var(--gradient-${baseName}-semi)`;
  const baseGradientSubtle = `var(--gradient-${baseName}-subtle)`;
  const baseGradientDull = `var(--gradient-${baseName}-dull)`;
  const baseGradientContrast = `var(--gradient-${baseName}-contrast)`;
  const gradient = `var(--${name})`;
  const gradientContrast =
    isSubtle || isContrast ? baseGradient : baseGradientContrast;
  // names and selectors
  const {fullName, hostSelector, mainSelector} = buildNamesAndSelectors(
    prefixName,
    name
  );
  // render
  return render({
    name,
    prefixName,
    baseName,
    isSubtle,
    isContrast,
    baseColor,
    baseColorMore,
    baseColorLess,
    baseColorSemi,
    baseColorSubtle,
    baseColorDull,
    baseColorContrast,
    color,
    contrast,
    baseGradient,
    baseGradientMore,
    baseGradientLess,
    baseGradientSemi,
    baseGradientSubtle,
    baseGradientDull,
    baseGradientContrast,
    gradient,
    gradientContrast,
    fullName,
    hostSelector,
    mainSelector,
  });
}
export function generateGradientVariants(
  render: GradientVariantRender,
  prefixName?: string
) {
  return unsafeCSS(
    GRADIENTS.map(name =>
      generateGradientVariant(render, name, prefixName)
    ).join('')
  );
}
export function generateSubtleGradientVariants(
  render: GradientVariantRender,
  prefixName?: string
) {
  return unsafeCSS(
    SUBTLE_GRADIENTS.map(name =>
      generateGradientVariant(render, name, prefixName)
    ).join('')
  );
}
export function generateContrastGradientVariants(
  render: GradientVariantRender,
  prefixName?: string
) {
  return unsafeCSS(
    CONTRAST_GRADIENTS.map(name =>
      generateGradientVariant(render, name, prefixName)
    ).join('')
  );
}
export function generateAllGradientVariants(
  render: GradientVariantRender,
  prefixName?: string
) {
  return unsafeCSS(
    ALL_GRADIENTS.map(name =>
      generateGradientVariant(render, name, prefixName)
    ).join('')
  );
}

export function generateFontVariants(
  render: FontVariantRender,
  prefixName?: string
) {
  return unsafeCSS(
    FONTS.map(name => {
      prefixName ||= 'font';
      const font = `var(--font-${name})`;
      const {fullName, hostSelector, mainSelector} = buildNamesAndSelectors(
        prefixName,
        name
      );
      return render({
        name,
        prefixName,
        font,
        fullName,
        hostSelector,
        mainSelector,
      });
    }).join('')
  );
}

export function generateTextVariants(
  render: TextVariantRender,
  prefixName?: string
) {
  return unsafeCSS(
    TEXTS.map(name => {
      prefixName ||= 'text';
      const text = `var(--text-${name})`;
      const {fullName, hostSelector, mainSelector} = buildNamesAndSelectors(
        prefixName,
        name
      );
      return render({
        name,
        prefixName,
        text,
        fullName,
        hostSelector,
        mainSelector,
      });
    }).join('')
  );
}

export function generateWeightVariants(
  render: WeightVariantRender,
  prefixName?: string
) {
  return unsafeCSS(
    WEIGHTS.map(name => {
      prefixName ||= 'weight';
      const weight = `var(--weight-${name})`;
      const {fullName, hostSelector, mainSelector} = buildNamesAndSelectors(
        prefixName,
        name
      );
      return render({
        name,
        prefixName,
        weight,
        fullName,
        hostSelector,
        mainSelector,
      });
    }).join('')
  );
}

export function generateSizeVariants(
  render: SizeVariantRender,
  prefixName?: string
) {
  return unsafeCSS(
    SIZES.map(name => {
      prefixName ||= 'size';
      const size = `var(--size-${name})`;
      const {fullName, hostSelector, mainSelector} = buildNamesAndSelectors(
        prefixName,
        name
      );
      return render({
        name,
        prefixName,
        size,
        fullName,
        hostSelector,
        mainSelector,
      });
    }).join('')
  );
}

export function generateRadiusVariants(
  render: RadiusVariantRender,
  prefixName?: string
) {
  return unsafeCSS(
    RADIUSES.map(name => {
      prefixName ||= 'radius';
      const radius = `var(--radius-${name})`;
      const {fullName, hostSelector, mainSelector} = buildNamesAndSelectors(
        prefixName,
        name
      );
      return render({
        name,
        prefixName,
        radius,
        fullName,
        hostSelector,
        mainSelector,
      });
    }).join('')
  );
}

export function generateShadowVariants(
  render: ShadowVariantRender,
  prefixName?: string
) {
  return unsafeCSS(
    SHADOWS.map(name => {
      prefixName ||= 'shadow';
      const shadow = `var(--shadow-${name})`;
      const {fullName, hostSelector, mainSelector} = buildNamesAndSelectors(
        prefixName,
        name
      );
      return render({
        name,
        prefixName,
        shadow,
        fullName,
        hostSelector,
        mainSelector,
      });
    }).join('')
  );
}
