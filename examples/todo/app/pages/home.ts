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
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 512 512'%3E%3Cpath fill='%23000' d='M400 48H112a64.07 64.07 0 0 0-64 64v288a64.07 64.07 0 0 0 64 64h288a64.07 64.07 0 0 0 64-64V112a64.07 64.07 0 0 0-64-64m-35.75 138.29l-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32l122.59-145.91a16 16 0 0 1 24.5 20.58'/%3E%3C/svg%3E"
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
