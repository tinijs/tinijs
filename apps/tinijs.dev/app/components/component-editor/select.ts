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

  @Input() preset!: string;
  @Input() label!: string;
  @Input() value?: string;
  @Output() change!: EventEmitter<string>;

  private buildSelectOptions(list: Record<string, string>) {
    return Object.entries(list).map(([key, value]) => {
      const names = parseName(key);
      const label = names.noCase
        .split(' ')
        .map(word => word.replace(/^\w/, c => c.toUpperCase()))
        .join(' ');
      return {
        label,
        value,
        selected: value === this.value,
      };
    });
  }
  private defaultItem: SelectOption = {
    label: 'Default',
    selected: true,
    value: '_default',
  };
  private colors: SelectOptgroup[] = [
    {
      label: 'APP COLORS',
      children: this.buildSelectOptions(Colors),
    },
    {
      label: 'COMMON COLORS',
      children: this.buildSelectOptions(CommonColors),
    },
  ];
  private gradients: SelectOptgroup[] = [
    {
      label: 'APP GREADIENTS',
      children: this.buildSelectOptions(Gradients),
    },
    {
      label: 'COMMON GRADIENTS',
      children: this.buildSelectOptions(CommonGradients),
    },
  ];
  private scales: SelectOption[] = this.buildSelectOptions(Scales);
  private presets = {
    colors: this.colors,
    gradients: this.gradients,
    colorsAndGradients: [...this.colors, ...this.gradients],
    scales: this.scales,
  } as Record<string, SelectOptgroup[]>;

  onCreate() {
    if (!this.label) throw new Error('label is required');
    if (!this.preset) throw new Error('preset is required');
  }

  protected render() {
    return html`
      <tini-select
        wrap
        .label=${this.label}
        .items=${[this.defaultItem, ...this.presets[this.preset]]}
        events="change"
        @change=${({detail}: CustomEvent<InputEvent>) =>
          this.change.emit((detail as any).target.value)}
      ></tini-select>
    `;
  }

  static styles = css``;
}
