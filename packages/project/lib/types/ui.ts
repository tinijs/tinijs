import {PackageJson} from 'type-fest';

export interface UIConfig {
  sources?: string[];
  pick?: {
    families: Record<
      string,
      {
        skins: string[];
      }
    >;
    bases?: string[];
  };
  icons?: Array<
    | string
    | {
        dir: string;
        subs?: Array<string | {name: string; suffix?: boolean | string}>;
        filterPaths?: (paths: string[]) => string[];
        transformName?: (name: string) => string;
      }
  >;
  outDir?: string;
  react?: boolean;
  distributable?:
    | true
    | {
        packageJSON?: string | PackageJson;
      };
  outPacks?: Array<
    Partial<Omit<UIConfig, 'outPacks'>> & {outDir: string; extends?: false}
  >;
}
