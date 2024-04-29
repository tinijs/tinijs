// @ts-ignore
import {createNitro} from 'nitropack';

// https://github.com/unjs/nitro/blob/main/src/types/nitro.ts
export interface Nitro {
  options: NitroConfig;
}

export interface NitroConfig {
  output: {
    dir: string;
  };
}

export async function loadNitro() {
  return createNitro({
    rootDir: 'server',
    dev: false,
  }) as Nitro;
}

export async function loadNitroConfig() {
  const {options: nitroConfig} = await loadNitro();
  return nitroConfig;
}
