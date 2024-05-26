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
  SubtleColors,
  Gradients,
  SubtleGradients,
  Scales,
  FontTypes,
  FontSizes,
  FontWeights,
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

  private colors: SelectOptgroup[] = [
    {
      label: 'COLORS',
      children: this.buildPresetItems(Colors),
    },
  ];
  private subtleColors: SelectOptgroup[] = [
    {
      label: 'SUBTLE COLORS',
      children: this.buildPresetItems(SubtleColors),
    },
  ];
  private allColors = [this.colors[0], this.subtleColors[0]];

  private gradients: SelectOptgroup[] = [
    {
      label: 'GRADIENTS',
      children: this.buildPresetItems(Gradients),
    },
  ];
  private subtleGradients: SelectOptgroup[] = [
    {
      label: 'SUBTLE GRADIENTS',
      children: this.buildPresetItems(SubtleGradients),
    },
  ];
  private allGradients = [this.gradients[0], this.subtleGradients[0]];

  private colorsAndGradients: SelectOptgroup[] = [
    this.colors[0],
    this.gradients[0],
  ];
  private subtleColorsAndSubtleGradients: SelectOptgroup[] = [
    this.subtleColors[0],
    this.subtleGradients[0],
  ];
  private allColorsAndAllGradients: SelectOptgroup[] = [
    ...this.allColors,
    ...this.allGradients,
  ];

  private presetDefaultItem: SelectOption = {
    label: 'Default',
    value: '_default',
    selected: true,
  };
  private presets: Record<string, Array<SelectOption | SelectOptgroup>> = {
    colors: this.colors,
    subtleColors: this.subtleColors,
    allColors: this.allColors,
    gradients: this.gradients,
    subtleGradients: this.subtleGradients,
    allGradients: this.allGradients,
    colorsAndGradients: this.colorsAndGradients,
    subtleColorsAndSubtleGradients: this.subtleColorsAndSubtleGradients,
    allColorsAndAllGradients: this.allColorsAndAllGradients,
    scales: this.buildPresetItems(Scales, value => value.toUpperCase()),
    fontTypes: this.buildPresetItems(FontTypes),
    fontSizes: this.buildPresetItems(FontSizes, value => value.toUpperCase()),
    fontWeights: this.buildPresetItems(FontWeights),
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
        font-size: var(--text-xs);
        text-transform: uppercase;
      }
    }
  `;
}
