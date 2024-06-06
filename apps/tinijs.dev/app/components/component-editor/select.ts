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
  ContrastColors,
  Gradients,
  SubtleGradients,
  ContrastGradients,
  Sizes,
  Fonts,
  Texts,
  Weights,
  Radiuses,
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
  @Input() value?: string;
  @Input() preset?: string;
  @Input({type: Object}) items?: Array<SelectOption | SelectOptgroup>;

  @Output() change!: EventEmitter<string>;

  private colors: SelectOptgroup[] = [
    {
      label: 'COLORS',
      options: this.buildPresetItems(Colors),
    },
  ];
  private subtleColors: SelectOptgroup[] = [
    {
      label: 'SUBTLE COLORS',
      options: this.buildPresetItems(SubtleColors),
    },
  ];
  private contrastColors: SelectOptgroup[] = [
    {
      label: 'CONTRAST COLORS',
      options: this.buildPresetItems(ContrastColors),
    },
  ];
  private allColors = [
    this.colors[0],
    this.subtleColors[0],
    this.contrastColors[0],
  ];

  private gradients: SelectOptgroup[] = [
    {
      label: 'GRADIENTS',
      options: this.buildPresetItems(Gradients),
    },
  ];
  private subtleGradients: SelectOptgroup[] = [
    {
      label: 'SUBTLE GRADIENTS',
      options: this.buildPresetItems(SubtleGradients),
    },
  ];
  private contrastGradients: SelectOptgroup[] = [
    {
      label: 'CONTRAST GRADIENTS',
      options: this.buildPresetItems(ContrastGradients),
    },
  ];
  private allGradients = [
    this.gradients[0],
    this.subtleGradients[0],
    this.contrastGradients[0],
  ];

  private colorsAndGradients: SelectOptgroup[] = [
    this.colors[0],
    this.gradients[0],
  ];
  private subtleColorsAndSubtleGradients: SelectOptgroup[] = [
    this.subtleColors[0],
    this.subtleGradients[0],
  ];
  private contrastColorsAndContrastGradients: SelectOptgroup[] = [
    this.contrastColors[0],
    this.contrastGradients[0],
  ];
  private allColorsAndAllGradients: SelectOptgroup[] = [
    ...this.allColors,
    ...this.allGradients,
  ];

  private presetDefaultItem: SelectOption = {
    content: 'Default',
    value: '_default',
    selected: true,
  };
  private presets: Record<string, Array<SelectOption | SelectOptgroup>> = {
    colors: this.colors,
    subtleColors: this.subtleColors,
    contrastColors: this.contrastColors,
    allColors: this.allColors,
    gradients: this.gradients,
    subtleGradients: this.subtleGradients,
    contrastGradients: this.contrastGradients,
    allGradients: this.allGradients,
    colorsAndGradients: this.colorsAndGradients,
    subtleColorsAndSubtleGradients: this.subtleColorsAndSubtleGradients,
    contrastColorsAndContrastGradients: this.contrastColorsAndContrastGradients,
    allColorsAndAllGradients: this.allColorsAndAllGradients,
    sizes: this.buildPresetItems(Sizes, value => value.toUpperCase()),
    fonts: this.buildPresetItems(Fonts),
    texts: this.buildPresetItems(Texts, value => value.toUpperCase()),
    weights: this.buildPresetItems(Weights),
    radiuses: this.buildPresetItems(Radiuses, value => value.toUpperCase()),
  };

  onCreate() {
    if (!this.label) throw new Error('label is required');
    if (!this.preset && !this.items)
      throw new Error('preset or items is required');
  }

  private buildPresetItems(
    list: Record<string, string>,
    contentBuilder?: (value: string) => string
  ) {
    return Object.values(list).map(value => {
      const content = contentBuilder
        ? contentBuilder(value)
        : parseName(value)
            .noCase.split(' ')
            .map(word => word.replace(/^\w/, c => c.toUpperCase()))
            .join(' ');
      return {
        content,
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
