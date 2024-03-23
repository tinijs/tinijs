import {TiniBoxComponent} from '@tinijs/ui/components/box';

export type CodeBuilder = (
  builder: CodeBuilderHelper
) => string | CodeBuilderHelper;

export type ReactPropBuilder = (
  tiniValue: string,
  potentialEnumKey: string
) => string | [string, string];
export interface ReactProp {
  name: string;
  enumName?: string;
  builder?: ReactPropBuilder;
}

export enum ReactCommonProps {
  Scheme = 'scheme',
  SchemeButColorsOnly = 'scheme_but_colors_only',
  Color = 'color',
  ColorButGradientsSupported = 'color_but_gradients_supported',
  LinkColor = 'linkColor',
  Scale = 'scale',
  FontSize = 'fontSize',
  BorderRadius = 'borderRadius',
  JustifyContent = 'justifyContent',
}

const reactColorsGradientsPropBuilder: ReactPropBuilder = (
  tiniValue,
  potentialEnumKey
) =>
  tiniValue.startsWith('gradient-')
    ? ['Gradients', potentialEnumKey.replace('Gradient', '')]
    : 'Colors';

export const REACT_COMMON_PROPS: Record<ReactCommonProps, ReactProp> = {
  [ReactCommonProps.Scheme]: {
    name: ReactCommonProps.Scheme,
    builder: reactColorsGradientsPropBuilder,
  },
  [ReactCommonProps.SchemeButColorsOnly]: {
    name: ReactCommonProps.Scheme,
    builder: reactColorsGradientsPropBuilder,
  },
  [ReactCommonProps.Color]: {
    name: ReactCommonProps.Color,
    builder: reactColorsGradientsPropBuilder,
  },
  [ReactCommonProps.ColorButGradientsSupported]: {
    name: ReactCommonProps.Color,
    builder: reactColorsGradientsPropBuilder,
  },
  [ReactCommonProps.LinkColor]: {
    name: ReactCommonProps.LinkColor,
    builder: reactColorsGradientsPropBuilder,
  },
  [ReactCommonProps.Scale]: {
    name: ReactCommonProps.Scale,
    enumName: 'Scales',
  },
  [ReactCommonProps.FontSize]: {
    name: ReactCommonProps.FontSize,
    builder: tiniValue => ['Factors', `X${tiniValue.replace('x', '')}`],
  },
  [ReactCommonProps.BorderRadius]: {
    name: ReactCommonProps.BorderRadius,
    enumName: 'BorderRadiuses',
  },
  [ReactCommonProps.JustifyContent]: {
    name: ReactCommonProps.JustifyContent,
    enumName: 'JustifyContents',
  },
};

export class CodeBuilderHelper {
  private result = '';

  constructor(
    public originalCode: string,
    public context?: unknown
  ) {
    this.result = originalCode;
  }

  toString() {
    // post-processing
    this.result = this.result.replace(/=""/g, '');
    // result
    return this.result;
  }

  customModifier(modifier: (code: string, context?: unknown) => string) {
    this.result = modifier(this.result, this.context);
    return this as CodeBuilderHelper;
  }

  attrCasing(items: string[]) {
    items.forEach(item => {
      const itemSplit = item.split(' ');
      const from = itemSplit.join('');
      const to =
        itemSplit[0] + itemSplit.slice(1).map(this.capitalize).join('');
      this.result = this.result.replace(new RegExp(`${from}=`, 'g'), `${to}=`);
    });
    return this as CodeBuilderHelper;
  }

  addPropsAndEvents(tagName: string, propsAndEvents: string[]) {
    const tagRegex = new RegExp(`<${tagName}`, 'g');
    this.result = this.result.replace(
      tagRegex,
      `<${tagName} ${propsAndEvents.join(' ')}`
    );
    return this as CodeBuilderHelper;
  }

  reactConverter(
    tagNames: string[],
    props: Array<ReactCommonProps | ReactProp>
  ) {
    // tag names
    [TiniBoxComponent.defaultTagName, ...tagNames].forEach(tagName => {
      const openingTagRegex = new RegExp(`<${tagName}`, 'g');
      const closingTagRegex = new RegExp(`</${tagName}`, 'g');
      const reactTagName = tagName.split('-').map(this.capitalize).join('');
      this.result = this.result
        .replace(openingTagRegex, `<${reactTagName}`)
        .replace(closingTagRegex, `</${reactTagName}`);
    });
    // props
    [ReactCommonProps.Scheme, ...props].forEach(prop => {
      const {
        name,
        enumName: prioritizedEnumName,
        builder,
      } = typeof prop === 'string' ? REACT_COMMON_PROPS[prop] : prop;
      const regexpContent = `${name}="([\\s\\S]*?)"`;
      const matchingArr = this.result.match(new RegExp(regexpContent, 'g'));
      if (!matchingArr || (!prioritizedEnumName && !builder)) return;
      matchingArr.forEach(matching => {
        const tiniValue = matching.split('=')[1].replace(/"/g, '');
        const potentialEnumKey = tiniValue
          .split('-')
          .map(this.capitalize)
          .join('');
        // build enum name and key
        let enumName: undefined | string;
        let enumKey: undefined | string;
        if (!prioritizedEnumName) {
          const buildResult = builder!(tiniValue, potentialEnumKey);
          if (typeof buildResult === 'string') {
            enumName = buildResult;
            enumKey = potentialEnumKey;
          } else {
            enumName = buildResult[0];
            enumKey = buildResult[1];
          }
        } else {
          enumName = prioritizedEnumName;
          enumKey = potentialEnumKey;
        }
        // replace
        this.result = this.result.replace(
          new RegExp(regexpContent),
          `${name}={${enumName}.${enumKey}}`
        );
      });
    });
    // result
    return this as CodeBuilderHelper;
  }

  private capitalize(str: string) {
    return str[0].toUpperCase() + str.slice(1);
  }
}
