import {RenderData} from '@tinijs/core';
import {createStore} from '@tinijs/store';

export interface Task {
  id: string;
  content: string;
  done: boolean;
}

export const mainStore = createStore({
  tasks: undefined as RenderData<Task[]>,
});

const TASKS_KEY = 'tasks';

export function loadTasks() {
  const data = localStorage.getItem(TASKS_KEY);
  if (!data) mainStore.tasks = [];
  else mainStore.tasks = JSON.parse(data);
}

export function addTask(content: string) {
  const tasks = [
    {
      id: Date.now() + String(Math.random() * 10000).slice(0, 3),
      content,
      done: false,
    },
    ...(mainStore.tasks || []),
  ];
  mainStore.commit('tasks', tasks);
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export function updateTask(id: string, done: boolean) {
  const tasks = (mainStore.tasks || [])
    .map(task => {
      if (task.id !== id) return task;
      return {...task, done};
    })
    .sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1));
  mainStore.commit('tasks', tasks);
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export function deleteTask(id: string) {
  const tasks = (mainStore.tasks || []).filter(task => task.id !== id);
  mainStore.commit('tasks', tasks);
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}
