import type {PackageJson} from 'type-fest';

export interface UIConfig {
  outDir?: string;
  sources?: string[];
  families?: Record<string, true | string[]>;
  icons?: Array<
    | string
    | {
        dir: string;
        subs?: Array<string | {name: string; suffix?: true | string}>;
        filterPaths?: (paths: string[]) => string[];
        transformName?: (name: string) => string;
      }
  >;
  outputIconsIndex?: string;
  manualSkinSelection?: true;
  framework?: 'react';
  transpile?: true;
  bundled?: true;
  rewritePath?: true | ((path: string) => string | null | undefined);
  packageJSON?:
    | true
    | string
    | PackageJson
    | ((projectPackageJSON: PackageJson) => PackageJson);
  outPacks?: Array<
    Partial<Omit<UIConfig, 'outPacks'>> & {outDir: string; extends?: false}
  >;
}
