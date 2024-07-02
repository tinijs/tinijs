import {html, css} from 'lit';

import {
  Component,
  TiniComponent,
  Output,
  UseUI,
  type UI,
  type EventEmitter,
} from '@tinijs/core';

import {
  TiniSelectComponent,
  type SelectOption,
} from '../ui/components/select.js';

@Component({
  components: [TiniSelectComponent],
})
export class AppThemeSelectorComponent extends TiniComponent {
  static readonly defaultTagName = 'app-theme-selector';

  @UseUI() readonly ui!: UI;

  @Output() change!: EventEmitter<string>;

  private buildThemeOptions(familyId: string, items: SelectOption[]) {
    return items.map(item => {
      item.value = `${familyId}/${item.value}`;
      if (item.value === this.ui.activeTheme.themeId) item.selected = true;
      return item;
    });
  }

  private changeTheme({detail}: CustomEvent<InputEvent>) {
    const themeId = (detail.target as HTMLInputElement).value as string;
    this.ui.setTheme(themeId);
    this.change.emit(themeId);
  }

  protected render() {
    return html`
      <tini-select
        wrap
        block
        label="Current theme"
        events="change"
        @change=${this.changeTheme}
        .items=${[
          {
            label: 'Bootstrap',
            options: this.buildThemeOptions('bootstrap', [
              {content: 'Bootstrap Light', value: 'light'},
              {content: 'Bootstrap Dark', value: 'dark'},
            ]),
          },
          {
            label: 'Shadcn',
            options: this.buildThemeOptions('shadcn', [
              {content: 'Shadcn Light', value: 'light'},
              {content: 'Shadcn Dark', value: 'dark'},
            ]),
          },
          {
            label: 'Material',
            options: this.buildThemeOptions('material', [
              {content: 'Material Light', value: 'light'},
              {content: 'Material Dark', value: 'dark'},
            ]),
          },
          {
            label: 'iOS',
            options: this.buildThemeOptions('ios', [
              {content: 'iOS Light', value: 'light'},
              {content: 'iOS Dark', value: 'dark'},
            ]),
          },
          {
            label: 'Fluent',
            options: this.buildThemeOptions('fluent', [
              {content: 'Fluent Light', value: 'light'},
              {content: 'Fluent Dark', value: 'dark'},
            ]),
          },
          {
            label: 'Radix',
            options: this.buildThemeOptions('radix', [
              {content: 'Radix Light', value: 'light'},
              {content: 'Radix Dark', value: 'dark'},
            ]),
          },
          {
            label: 'Chakra',
            options: this.buildThemeOptions('chakra', [
              {content: 'Chakra Light', value: 'light'},
              {content: 'Chakra Dark', value: 'dark'},
            ]),
          },
          {
            label: 'Daisy',
            options: this.buildThemeOptions('daisy', [
              {content: 'Daisy Light', value: 'light'},
              {content: 'Daisy Dark', value: 'dark'},
            ]),
          },
        ]}
      ></tini-select>
    `;
  }

  static styles = css``;
}
