import type {Workbox} from 'workbox-window/Workbox.js';

export type SW = Workbox;

export interface AppWithSW {
  sw: SW;
}
