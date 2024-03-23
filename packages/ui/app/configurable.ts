import routes from './routes';

export class Configurable {
  static options = {
    appId: 'ui',
    appName: 'Tini UI',
    logoUrl: new URL('./assets/logo.svg', import.meta.url).toString(),
    repoUrl: 'https://github.com/tinijs/tinijs',
    iconsRepoUrl: 'https://github.com/tinijs/tinijs',
    packagePrefix: '@tinijs/ui',
    soulUrlResolver: undefined as
      | undefined
      | ((soulId: string, name: string) => string),
    skinUrlResolver: undefined as
      | undefined
      | ((soulId: string, skinId: string) => string),
    componentUrlResolver: undefined as undefined | ((name: string) => string),
    soulList: [
      {
        id: 'bootstrap',
        name: 'Bootstrap',
        skins: [
          {id: 'light', name: 'Light'},
          {id: 'dark', name: 'Dark'},
          {id: 'retro-light', name: 'Retro Light'},
          {id: 'retro-dark', name: 'Retro Dark'},
        ],
      },
    ],
    routes,
  };

  static setOptions(options: Partial<typeof Configurable.options>) {
    return (Configurable.options = {...Configurable.options, ...options});
  }

  static getOption<Key extends keyof typeof Configurable.options>(key: Key) {
    return Configurable.options[key];
  }
}
