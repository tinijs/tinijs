import {html, css} from 'lit';

import {
  TiniSelectComponent,
  type SelectOption,
  type SelectOptgroup,
} from '../../ui/components/select.js';

import {
  Component,
  TiniComponent,
  Input,
  Output,
  Colors,
  Gradients,
  CommonColors,
  CommonGradients,
  Scales,
  Factors,
  FontTypes,
  FontWeights,
  TextTransforms,
  BoxShadows,
  BorderWidths,
  BorderStyles,
  BorderRadiuses,
  JustifyContents,
  type EventEmitter,
  type OnCreate,
} from '@tinijs/core';

import {parseName} from '../../utils/name.js';

@Component({
  components: [TiniSelectComponent],
})
export class AppComponentEditorSelectComponent
  extends TiniComponent
  implements OnCreate
{
  static readonly defaultTagName = 'app-component-editor-select';

  @Input() label!: string;
  @Input() preset?: string;
  @Input({type: Object}) items?: Array<SelectOption | SelectOptgroup>;
  @Input() value?: string;
  @Output() change!: EventEmitter<string>;

  private presetDefaultItem: SelectOption = {
    label: 'Default',
    value: '_default',
    selected: true,
  };
  private colors: SelectOptgroup[] = [
    {
      label: 'APP COLORS',
      children: this.buildPresetItems(Colors),
    },
    {
      label: 'COMMON COLORS',
      children: this.buildPresetItems(CommonColors),
    },
  ];
  private gradients: SelectOptgroup[] = [
    {
      label: 'APP GREADIENTS',
      children: this.buildPresetItems(Gradients),
    },
    {
      label: 'COMMON GRADIENTS',
      children: this.buildPresetItems(CommonGradients),
    },
  ];
  private presets: Record<string, Array<SelectOption | SelectOptgroup>> = {
    colors: this.colors,
    gradients: this.gradients,
    colorsAndGradients: [...this.colors, ...this.gradients],
    scales: this.buildPresetItems(Scales, value => value.toUpperCase()),
    factors: this.buildPresetItems(Factors, value => value),
    fontTypes: this.buildPresetItems(FontTypes),
    fontWeights: this.buildPresetItems(FontWeights),
    textTransforms: this.buildPresetItems(TextTransforms),
    boxShadows: this.buildPresetItems(BoxShadows),
    borderWidths: this.buildPresetItems(BorderWidths),
    borderStyles: this.buildPresetItems(BorderStyles),
    borderRadiuses: this.buildPresetItems(BorderRadiuses),
    justifyContents: this.buildPresetItems(JustifyContents),
  };

  onCreate() {
    if (!this.label) throw new Error('label is required');
    if (!this.preset && !this.items)
      throw new Error('preset or items is required');
  }

  private buildPresetItems(
    list: Record<string, string>,
    labelBuilder?: (value: string) => string
  ) {
    return Object.values(list).map(value => {
      const label = labelBuilder
        ? labelBuilder(value)
        : parseName(value)
            .noCase.split(' ')
            .map(word => word.replace(/^\w/, c => c.toUpperCase()))
            .join(' ');
      return {
        label,
        value,
        selected: value === this.value,
      };
    });
  }

  protected render() {
    return html`
      <tini-select
        wrap
        block
        .label=${this.label}
        .items=${!this.preset
          ? this.items
          : [this.presetDefaultItem, ...this.presets[this.preset]]}
        events="change"
        @change=${({detail}: CustomEvent<InputEvent>) =>
          this.change.emit((detail as any).target.value)}
      ></tini-select>
    `;
  }

  static styles = css`
    tini-select {
      &::part(label) {
        font-weight: bold;
        font-size: var(--size-text-0_8x);
        text-transform: uppercase;
      }
    }
  `;
}
