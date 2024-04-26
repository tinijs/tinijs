import {Workbox} from 'workbox-window';

export type SW = Workbox;

export interface AppWithSW {
  sw: SW;
}
