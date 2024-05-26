import {unsafeCSS, type CSSResult} from 'lit';

import {listify} from './common.js';

export type StyleBuilderInputEntry = CSSResult | ((data: any) => string);

export type StyleBuilderInputs = Record<string, StyleBuilderInputEntry>;

export type StyleBuilderBuildResult<
  Inputs extends StyleBuilderInputs,
  Outputs = Inputs,
> = (
  outputs: Outputs,
  builder: StyleBuilder<Inputs>
) => CSSResult | CSSResult[];

export class StyleBuilder<Inputs extends StyleBuilderInputs> {
  constructor(
    public buildResult: StyleBuilderBuildResult<Inputs>,
    public inputsRegistry: Record<string, StyleBuilderInputEntry[]> = {},
    public appendRegistry: CSSResult[] = []
  ) {}

  extends(inputs: Inputs) {
    const builder = new StyleBuilder<Inputs>(
      this.buildResult,
      {...this.inputsRegistry},
      [...this.appendRegistry]
    );
    Object.entries(inputs).forEach(([key, value]) => {
      const items = (builder.inputsRegistry[key] ||= []);
      items.push(value);
    });
    return builder;
  }

  append(css: CSSResult) {
    this.appendRegistry.push(css);
    return this as StyleBuilder<Inputs>;
  }

  toResult() {
    const outputs = Object.entries(this.inputsRegistry).reduce(
      (result, [key, items]) => {
        if (items[0] instanceof Function) {
          result[key] = (data: any) => {
            return (items as Array<(data: any) => string>)
              .map(item => item(data))
              .join('');
          };
        } else {
          result[key] = unsafeCSS(
            (items as CSSResult[]).map(css => css.cssText).join('')
          );
        }
        return result;
      },
      {} as any
    );
    return listify(this.buildResult(outputs, this));
  }
}

export function createStyleBuilder<Inputs extends StyleBuilderInputs>(
  buildResult: StyleBuilderBuildResult<Inputs>
) {
  return new StyleBuilder(buildResult);
}
