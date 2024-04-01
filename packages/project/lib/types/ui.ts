import {PackageJson} from 'type-fest';

export interface UIConfig {
  sources?: string[];
  families?: Record<string, string[]>;
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
  packageJSON?:
    | string
    | PackageJson
    | ((projectPackageJSON: PackageJson) => PackageJson);
  outPacks?: Array<
    Partial<Omit<UIConfig, 'outPacks'>> & {outDir: string; extends?: false}
  >;
}
