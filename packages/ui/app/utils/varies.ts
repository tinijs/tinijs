import {html, nothing, HTMLTemplateResult} from 'lit';
import {styleMap, StyleInfo} from 'lit/directives/style-map.js';
import {
  BASE_COLORS,
  BASE_COMMON_COLORS,
  BASE_GRADIENTS,
  BASE_COMMON_GRADIENTS,
  SCALES,
  FACTORS,
  FONT_TYPES,
  FONT_WEIGHTS,
  TEXT_TRANSFORMS,
  BOX_SHADOWS,
  Colors,
  CommonColors,
  Gradients,
  CommonGradients,
  Scales,
  Factors,
  FontTypes,
  FontWeights,
  TextTransforms,
  BoxShadows,
} from '@tinijs/core';
import {
  AppSectionComponent,
  SectionCodeGroup,
  WRAPPER_CLASS_NAME,
} from '../components/section';

export interface RenderSectionOptions {
  className?: string;
  title?: string;
  content?: HTMLTemplateResult;
  // <section> props
  noCodeSample?: AppSectionComponent['noCodeSample'];
  preprocessCode?: AppSectionComponent['preprocessCode'];
  codeBuilders?: AppSectionComponent['codeBuilders'];
  codeBuildContext?: AppSectionComponent['codeBuildContext'];
  codePostFormat?: AppSectionComponent['codePostFormat'];
  styleRecord?: Record<string, StyleInfo>;
}

function internalStyleMap(styleInfo: StyleInfo) {
  return styleMap({
    '--mode': 'internal',
    ...styleInfo,
  });
}

function codeWithWrapper(styleInfo: StyleInfo, code: HTMLTemplateResult) {
  return html`<div
    class=${WRAPPER_CLASS_NAME}
    style=${internalStyleMap(styleInfo)}
  >
    ${code}
  </div>`;
}

function render(
  defaultClassName: string,
  defaultTitle: string,
  contentSlot: null | HTMLTemplateResult,
  codeSlotOrCodeGroups: HTMLTemplateResult | Array<null | SectionCodeGroup>,
  {
    className,
    title,
    noCodeSample,
    content,
    preprocessCode,
    codeBuilders,
    codeBuildContext,
    codePostFormat,
  }: RenderSectionOptions = {}
) {
  const isGrouping = codeSlotOrCodeGroups instanceof Array;
  const codeSlot = isGrouping ? undefined : codeSlotOrCodeGroups;
  const codeGroups = !isGrouping ? undefined : codeSlotOrCodeGroups;
  return html`
    <app-section
      class=${className || defaultClassName}
      .noCodeSample=${noCodeSample}
      .codeGroups=${codeGroups}
      .preprocessCode=${preprocessCode}
      .codeBuildContext=${codeBuildContext}
      .codeBuilders=${codeBuilders}
      .codePostFormat=${codePostFormat}
    >
      <h2 slot="title">${title || defaultTitle}</h2>
      <div slot="content">
        ${!content ? nothing : content} ${!contentSlot ? nothing : contentSlot}
      </div>
      ${!codeSlot ? nothing : html`<div slot="code">${codeSlot}</div>`}
    </app-section>
  `;
}

export function renderSection(
  className: string,
  title: string,
  content: null | HTMLTemplateResult,
  code: HTMLTemplateResult,
  options: RenderSectionOptions = {}
) {
  const styleCommon = options.styleRecord?.['common'] || {};
  const styleAny =
    options.styleRecord?.[
      className
        .split('-')
        .map((item, i) =>
          i === 0 ? item : item[0].toUpperCase() + item.slice(1)
        )
        .join('')
    ] || styleCommon;
  return render(
    className,
    title,
    content,
    codeWithWrapper(styleAny, code),
    options
  );
}

export function renderDefaultSection(
  content: null | HTMLTemplateResult,
  code: HTMLTemplateResult,
  options: RenderSectionOptions = {}
) {
  const styleCommon = options.styleRecord?.['common'] || {};
  const styleDefault = options.styleRecord?.['default'] || styleCommon;
  return render(
    'default',
    'Default',
    content,
    codeWithWrapper(styleDefault, code),
    options
  );
}

export function renderColorsSection(
  handler: (color: Colors | CommonColors) => HTMLTemplateResult,
  options: RenderSectionOptions = {}
) {
  const styleCommon = options.styleRecord?.['common'] || {};
  const styleSchemes = options.styleRecord?.['schemes'] || styleCommon;
  const styleContrasts = options.styleRecord?.['contrasts'] || styleCommon;
  const styleContrastBoxes =
    options.styleRecord?.['contrastBoxes'] || styleCommon;
  const styleColors = options.styleRecord?.['colors'] || styleSchemes;
  const styleColorContrasts =
    options.styleRecord?.['colorContrasts'] || styleContrasts;
  const styleColorContrastBoxes =
    options.styleRecord?.['colorContrastBoxes'] || styleContrastBoxes;
  const codeGroups: Array<null | SectionCodeGroup> = [
    {
      name: 'Colors',
      code: codeWithWrapper(
        styleColors,
        html`${BASE_COLORS.map(color => handler(color))}`
      ),
    },
    {
      name: 'Shades',
      code: codeWithWrapper(
        styleColors,
        html`${BASE_COLORS.map(color => handler(`${color}-shade` as Colors))}`
      ),
    },
    {
      name: 'Tints',
      code: codeWithWrapper(
        styleColors,
        html`${BASE_COLORS.map(color => handler(`${color}-tint` as Colors))}`
      ),
    },
    {
      name: 'Subtles',
      code: codeWithWrapper(
        styleColors,
        html`${BASE_COLORS.map(color => handler(`${color}-subtle` as Colors))}`
      ),
    },
    {
      name: 'Contrasts',
      code: codeWithWrapper(
        styleColorContrasts,
        html`
          ${BASE_COLORS.map(
            color =>
              html`<tini-box
                style=${internalStyleMap(styleColorContrastBoxes)}
                scheme=${color}
              >
                ${handler(`${color}-contrast` as Colors)}
              </tini-box>`
          )}
        `
      ),
    },
    {
      name: 'Commons',
      code: codeWithWrapper(
        styleColors,
        html`${BASE_COMMON_COLORS.map(color => handler(color))}`
      ),
    },
    {
      name: 'Shades',
      code: codeWithWrapper(
        styleColors,
        html`
          ${BASE_COMMON_COLORS.map(color =>
            handler(`${color}-shade` as CommonColors)
          )}
        `
      ),
    },
    {
      name: 'Tints',
      code: codeWithWrapper(
        styleColors,
        html`
          ${BASE_COMMON_COLORS.map(color =>
            handler(`${color}-tint` as CommonColors)
          )}
        `
      ),
    },
    {
      name: 'Subtles',
      code: codeWithWrapper(
        styleColors,
        html`
          ${BASE_COMMON_COLORS.map(color =>
            handler(`${color}-subtle` as CommonColors)
          )}
        `
      ),
    },
    {
      name: 'Contrasts',
      code: codeWithWrapper(
        styleColorContrasts,
        html`
          ${BASE_COMMON_COLORS.map(
            color =>
              html`<tini-box
                style=${internalStyleMap(styleColorContrastBoxes)}
                scheme=${color}
              >
                ${handler(`${color}-contrast` as CommonColors)}
              </tini-box>`
          )}
        `
      ),
    },
  ];
  return render(
    'colors',
    'Colors',
    html`
      <p>
        Contrasts are used against schemed backgrounds. Common colors remain the
        same between themes.
      </p>
    `,
    codeGroups,
    options
  );
}

export function renderGradientsSection(
  handler: (gradient: Gradients | CommonGradients) => HTMLTemplateResult,
  options: RenderSectionOptions = {}
) {
  const styleCommon = options.styleRecord?.['common'] || {};
  const styleSchemes = options.styleRecord?.['schemes'] || styleCommon;
  const styleContrasts = options.styleRecord?.['contrasts'] || styleCommon;
  const styleContrastBoxes =
    options.styleRecord?.['contrastBoxes'] || styleCommon;
  const styleGradients = options.styleRecord?.['gradients'] || styleSchemes;
  const styleGradientContrasts =
    options.styleRecord?.['gradientContrasts'] || styleContrasts;
  const styleGradientContrastBoxes =
    options.styleRecord?.['gradientContrastBoxes'] || styleContrastBoxes;
  const codeGroups: Array<null | SectionCodeGroup> = [
    {
      name: 'Gradients',
      code: codeWithWrapper(
        styleGradients,
        html`${BASE_GRADIENTS.map(gradient => handler(gradient))}`
      ),
    },
    {
      name: 'Shades',
      code: codeWithWrapper(
        styleGradients,
        html`
          ${BASE_GRADIENTS.map(gradient =>
            handler(`${gradient}-shade` as Gradients)
          )}
        `
      ),
    },
    {
      name: 'Tints',
      code: codeWithWrapper(
        styleGradients,
        html`
          ${BASE_GRADIENTS.map(gradient =>
            handler(`${gradient}-tint` as Gradients)
          )}
        `
      ),
    },
    {
      name: 'Subtles',
      code: codeWithWrapper(
        styleGradients,
        html`
          ${BASE_GRADIENTS.map(gradient =>
            handler(`${gradient}-subtle` as Gradients)
          )}
        `
      ),
    },
    {
      name: 'Contrasts',
      code: codeWithWrapper(
        styleGradientContrasts,
        html`
          ${BASE_GRADIENTS.map(
            gradient =>
              html`<tini-box
                style=${internalStyleMap(styleGradientContrastBoxes)}
                scheme=${gradient}
              >
                ${handler(`${gradient}-contrast` as Gradients)}
              </tini-box>`
          )}
        `
      ),
    },
    {
      name: 'Commons',
      code: codeWithWrapper(
        styleGradients,
        html`${BASE_COMMON_GRADIENTS.map(gradient => handler(gradient))}`
      ),
    },
    {
      name: 'Shades',
      code: codeWithWrapper(
        styleGradients,
        html`
          ${BASE_COMMON_GRADIENTS.map(gradient =>
            handler(`${gradient}-shade` as CommonGradients)
          )}
        `
      ),
    },
    {
      name: 'Tints',
      code: codeWithWrapper(
        styleGradients,
        html`
          ${BASE_COMMON_GRADIENTS.map(gradient =>
            handler(`${gradient}-tint` as CommonGradients)
          )}
        `
      ),
    },
    {
      name: 'Subtles',
      code: codeWithWrapper(
        styleGradients,
        html`
          ${BASE_COMMON_GRADIENTS.map(gradient =>
            handler(`${gradient}-subtle` as CommonGradients)
          )}
        `
      ),
    },
    {
      name: 'Contrasts',
      code: codeWithWrapper(
        styleGradientContrasts,
        html`
          ${BASE_COMMON_GRADIENTS.map(
            gradient =>
              html`<tini-box
                style=${internalStyleMap(styleGradientContrastBoxes)}
                scheme=${gradient}
              >
                ${handler(`${gradient}-contrast` as CommonGradients)}
              </tini-box>`
          )}
        `
      ),
    },
  ];
  return render(
    'gradients',
    'Gradients',
    html`
      <p>
        Contrasts are used against schemed backgrounds. Common gradients remain
        the same between themes.
      </p>
    `,
    codeGroups,
    options
  );
}

export function renderScalesSection(
  handler: (scale: Scales) => HTMLTemplateResult,
  options: RenderSectionOptions = {}
) {
  const styleCommon = options.styleRecord?.['common'] || {};
  const styleScales = options.styleRecord?.['scales'] || styleCommon;
  return render(
    'scales',
    'Scales',
    null,
    codeWithWrapper(styleScales, html`${SCALES.map(scale => handler(scale))}`),
    options
  );
}

export function renderFontColorsSection(
  schemes: (Colors | Gradients)[],
  handler: (scheme: Colors | Gradients) => HTMLTemplateResult,
  options: RenderSectionOptions = {}
) {
  const styleCommon = options.styleRecord?.['common'] || {};
  const styleFontColors = options.styleRecord?.['fontColors'] || styleCommon;
  return render(
    'text-colors',
    'Text colors',
    html`
      <p>
        You can combine any text colors with any background colors. Below are
        just some examples.
      </p>
    `,
    codeWithWrapper(
      styleFontColors,
      html`${schemes.map(scheme => handler(scheme))}`
    ),
    options
  );
}

export function renderFontTypesSection(
  handler: (fontType: FontTypes) => HTMLTemplateResult,
  options: RenderSectionOptions = {}
) {
  const styleCommon = options.styleRecord?.['common'] || {};
  const styleFontTypes = options.styleRecord?.['fontTypes'] || styleCommon;
  return render(
    'fonts',
    'Fonts',
    null,
    codeWithWrapper(
      styleFontTypes,
      html`${FONT_TYPES.map(fontType => handler(fontType))}`
    ),
    options
  );
}

export function renderFontSizesSection(
  full: boolean,
  handler: (factor: Factors) => HTMLTemplateResult,
  options: RenderSectionOptions = {}
) {
  const styleCommon = options.styleRecord?.['common'] || {};
  const styleFontSizes = options.styleRecord?.['fontSizes'] || styleCommon;
  return render(
    'font-sizes',
    'Font sizes',
    html` <p>Font size from 0.1x to 10x.</p> `,
    codeWithWrapper(
      styleFontSizes,
      html`
        ${(full ? FACTORS : (['0_5x', '1x', '3x'] as Factors[])).map(factor =>
          handler(factor)
        )}
      `
    ),
    options
  );
}

export function renderFontWeightsSection(
  handler: (weight: FontWeights) => HTMLTemplateResult,
  options: RenderSectionOptions = {}
) {
  const styleCommon = options.styleRecord?.['common'] || {};
  const styleFontWeights = options.styleRecord?.['fontWeights'] || styleCommon;
  return render(
    'font-weights',
    'Font weights',
    html`<p>
      Please note that the active font must support the respective weights.
    </p>`,
    codeWithWrapper(
      styleFontWeights,
      html`${FONT_WEIGHTS.map(weight => handler(weight))}`
    ),
    options
  );
}

export function renderTextTransformsSection(
  handler: (transform: TextTransforms) => HTMLTemplateResult,
  options: RenderSectionOptions = {}
) {
  const styleCommon = options.styleRecord?.['common'] || {};
  const styleTextTransforms =
    options.styleRecord?.['textTransforms'] || styleCommon;
  return render(
    'text-transforms',
    'Text transforms',
    null,
    codeWithWrapper(
      styleTextTransforms,
      html`${TEXT_TRANSFORMS.map(transform => handler(transform))}`
    ),
    options
  );
}

export function renderSpacesSection(
  type: 'padding' | 'margin',
  handler: (value: string) => HTMLTemplateResult,
  options: RenderSectionOptions = {}
) {
  const styleCommon = options.styleRecord?.['common'] || {};
  const styleSpaces = options.styleRecord?.['spaces'] || styleCommon;
  return render(
    `${type}s`,
    `${type[0].toUpperCase() + type.slice(1)}s`,
    null,
    codeWithWrapper(
      styleSpaces,
      html`
        ${['0x', '0_5x', '1x 2x', '1x 2x 3x', '1x 2x 3x 4x'].map(value =>
          handler(value)
        )}
      `
    ),
    options
  );
}

export function renderItalicUnderlineSection(
  code: HTMLTemplateResult,
  options: RenderSectionOptions = {}
) {
  const styleCommon = options.styleRecord?.['common'] || {};
  const styleItalicUnderline =
    options.styleRecord?.['italicUnderline'] || styleCommon;
  return render(
    'italic-underline',
    'Italic and Underline',
    null,
    codeWithWrapper(styleItalicUnderline, code),
    options
  );
}

export function renderTransformsSection(
  code: HTMLTemplateResult,
  options: RenderSectionOptions = {}
) {
  const styleCommon = options.styleRecord?.['common'] || {};
  const styleTransforms = options.styleRecord?.['transforms'] || styleCommon;
  return render(
    'transforms',
    'Transforms',
    html`
      <p>
        Supports standard
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform"
          target="_blank"
          rel="noopener"
          >CSS tranforms</a
        >.
      </p>
    `,
    codeWithWrapper(styleTransforms, code),
    options
  );
}

export function renderFiltersSection(
  code: HTMLTemplateResult,
  options: RenderSectionOptions = {}
) {
  const styleCommon = options.styleRecord?.['common'] || {};
  const styleFilters = options.styleRecord?.['filters'] || styleCommon;
  return render(
    'filters',
    'Filters',
    html`
      <p>
        Supports standard
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/filter"
          target="_blank"
          rel="noopener"
          >CSS filters</a
        >.
      </p>
    `,
    codeWithWrapper(styleFilters, code),
    options
  );
}

export function renderBoxShadowsSection(
  handler: (shadow: BoxShadows) => HTMLTemplateResult,
  options: RenderSectionOptions = {}
) {
  const styleCommon = options.styleRecord?.['common'] || {};
  const styleShadow = options.styleRecord?.['shadows'] || styleCommon;
  return render(
    'shadows',
    'Shadows',
    null,
    codeWithWrapper(
      styleShadow,
      html`${BOX_SHADOWS.map(shadow => handler(shadow))}`
    ),
    options
  );
}

export function renderStyleDeepSection(
  code: HTMLTemplateResult,
  options: RenderSectionOptions = {}
) {
  const styleCommon = options.styleRecord?.['common'] || {};
  const styleStyleDeep = options.styleRecord?.['styleDeep'] || styleCommon;
  return render(
    'style-deep',
    'Style deep',
    html`
      <p>
        You can also provide custom styles via the
        <code>styleDeep</code> attribute.
      </p>
      <p>
        IMPORTANT! Please <strong>DON'T use user input</strong> to avoid XSS
        attacks.
      </p>
    `,
    codeWithWrapper(styleStyleDeep, code),
    options
  );
}
