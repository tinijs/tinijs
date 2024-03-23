import {HookCallback} from 'hookable';

import {TiniProject} from '../classes/project.js';

export interface Builder {
  dev:
    | (() => Promise<void>)
    | {
        command: string;
        onServerStart?: () => void;
      };
  build:
    | (() => Promise<void>)
    | {
        command: string;
      };
}

export enum OfficialBuilders {
  Parcel = 'parcel',
  Vite = 'vite',
  Webpack = 'webpack',
}

export interface BuildConfig {
  builder?: OfficialBuilders;
  options?: Record<string, any>;
}

export type CustomBuildConfig = (tiniProject: TiniProject) => Builder;

export interface BuildHooks {
  'build:before': () => ReturnType<HookCallback>;
  'build:after': () => ReturnType<HookCallback>;
}
