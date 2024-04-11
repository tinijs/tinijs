import {html} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import {styleMap} from 'lit/directives/style-map.js';
import {ref, createRef, type Ref} from 'lit/directives/ref.js';
import autoAnimate from '@formkit/auto-animate';

import {CommonColors, CommonGradients, Scales} from '@tinijs/core';
import {
  Component,
  TiniComponent,
  Input,
  Output,
  EventEmitter,
  type OnReady,
} from '@tinijs/core';

import {TiniIconComponent} from '@tinijs/ui-bootstrap/components/icon.js';
import {TiniCheckboxesComponent} from '@tinijs/ui-bootstrap/components/checkboxes.js';

import type {Task} from '../stores/main.js';

export interface ToggleEventDetail {
  task: Task;
  done: boolean;
}

@Component({
  components: [TiniIconComponent, TiniCheckboxesComponent],
})
export class AppTasksComponent extends TiniComponent implements OnReady {
  static readonly defaultTagName = 'app-tasks';

  @Input() tasks: Task[] = [];

  @Output() toggle!: EventEmitter<ToggleEventDetail>;
  @Output() delete!: EventEmitter<Task>;

  private containerRef: Ref<HTMLDivElement> = createRef();

  onReady() {
    if (this.containerRef.value) {
      autoAnimate(this.containerRef.value);
    }
  }

  protected render() {
    return html`
      <div ${ref(this.containerRef)}>
        ${repeat(
          this.tasks,
          task => task.id,
          task => html`
            <div
              style=${styleMap({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'var(--color-background-tint)',
                padding: 'var(--size-space-0_75x) var(--size-space)',
                border: '1px solid var(--color-background-shade)',
                borderRadius: 'var(--size-radius)',
                marginBottom: 'var(--size-space)',
                gap: 'var(--size-space)',
                transition: 'opacity 0.5s ease-in-out',
                opacity: !task.done ? 1 : 0.5,
              })}
            >
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  gap: var(--size-space);
                "
              >
                <tini-checkboxes
                  events="change"
                  styleDeep=${`
                    .input {
                      min-width: var(--checkbox-scale);
                      min-height: var(--checkbox-scale);
                    }
                    .label {
                      color: ${
                        !task.done
                          ? 'var(--color-foreground)'
                          : 'var(--color-medium)'
                      };
                      text-decoration: ${!task.done ? 'none' : 'line-through'};
                    }
                  `}
                  .items=${[
                    {
                      'checked:scheme': CommonColors.Teal,
                      scale: Scales.XL,
                      label: task.content,
                      checked: task.done,
                    },
                  ]}
                  @change=${(e: CustomEvent<InputEvent>) =>
                    this.toggle.emit({
                      task,
                      done: (e.detail.target as HTMLInputElement).checked,
                    })}
                ></tini-checkboxes>
              </div>
              <div>
                <button
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: none;
                    border: none;
                    padding: 0;
                    cursor: pointer;
                  "
                  @click=${() => this.delete.emit(task)}
                >
                  <tini-icon
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z'/%3E%3Cpath fill='%23000' d='m12 13.414l5.657 5.657a1 1 0 0 0 1.414-1.414L13.414 12l5.657-5.657a1 1 0 0 0-1.414-1.414L12 10.586L6.343 4.929A1 1 0 0 0 4.93 6.343L10.586 12l-5.657 5.657a1 1 0 1 0 1.414 1.414z'/%3E%3C/g%3E%3C/svg%3E"
                    scheme=${CommonGradients.BloodyMimosa}
                  ></tini-icon>
                </button>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }
}
