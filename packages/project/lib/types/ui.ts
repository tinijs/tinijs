export interface UIConfig {
  sources: string[];
  pick: {
    families: Record<
      string,
      {
        skins: string[];
      }
    >;
    bases: string[];
  };
  icons?: Array<
    | string
    | {
        dir: string;
        subs?: Array<string | {name: string; suffix?: boolean | string}>;
        transform?: () => any;
      }
  >;
  outDir?: string;
  react?: boolean;
}
