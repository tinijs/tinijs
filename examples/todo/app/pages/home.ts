import {html} from 'lit';

import {
  Page,
  TiniComponent,
  OnCreate,
  render,
  CommonColors,
  CommonGradients,
  Scales,
} from '@tinijs/core';
import {Subscribe} from '@tinijs/store';

import {TiniIconComponent} from '@tinijs/ui-bootstrap/components/icon.js';
import {TiniSpinnerComponent} from '@tinijs/ui-bootstrap/components/spinner.js';

import {
  Task,
  mainStore,
  loadTasks,
  addTask,
  updateTask,
  deleteTask,
} from '../stores/main.js';

import {AppComposeComponent} from '../components/compose.js';
import {AppTasksComponent, ToggleEventDetail} from '../components/tasks.js';

@Page({
  name: 'app-page-home',
  components: [
    TiniIconComponent,
    TiniSpinnerComponent,
    AppComposeComponent,
    AppTasksComponent,
  ],
})
export class AppPageHome extends TiniComponent implements OnCreate {
  @Subscribe(mainStore) private tasks = mainStore.tasks;

  onCreate() {
    loadTasks();
  }

  protected render() {
    return html`
      <div
        style="
          padding: var(--size-space-2x);
          display: flex;
          flex-flow: column;
          justify-content: center;
          max-width: var(--wide-sm);
          margin: auto;
        "
      >
        <app-compose
          @commit=${(e: CustomEvent<string>) => addTask(e.detail)}
        ></app-compose>

        <div style="margin-top: 2rem">
          ${render([this.tasks], {
            loading: () => this.loadingTemplate,
            empty: () => this.emptyTemplate,
            main: () => this.tasksTemplate,
          })}
        </div>
      </div>
    `;
  }

  private get loadingTemplate() {
    return html`
      <div
        style="
          padding: var(--size-space-2x);
          display: flex;
          justify-content: center;
          max-width: var(--wide-sm);
          margin: auto;
        "
      >
        <tini-spinner
          scheme=${CommonColors.Teal}
          scale=${Scales.ML}
        ></tini-spinner>
      </div>
    `;
  }

  private get emptyTemplate() {
    return html`
      <div style="margin-top: 3rem; text-align: center">
        <tini-icon
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3.5 5.5L5 7l2.5-2.5m-4 7L5 13l2.5-2.5m-4 7L5 19l2.5-2.5M11 6h9m-9 6h9m-9 6h9'/%3E%3C/svg%3E"
          scheme=${CommonGradients.KaleSalad}
          scale=${Scales.XXXL}
        ></tini-icon>
        <p style="color: var(--color-medium)">No tasks yet!</p>
      </div>
    `;
  }

  private get tasksTemplate() {
    return html`
      <app-tasks
        .tasks=${this.tasks}
        @toggle=${(e: CustomEvent<ToggleEventDetail>) =>
          updateTask(e.detail.task.id, e.detail.done)}
        @delete=${(e: CustomEvent<Task>) => deleteTask(e.detail.id)}
      ></app-tasks>
    `;
  }
}
