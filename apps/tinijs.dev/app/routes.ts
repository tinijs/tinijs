import type {Route} from '@tinijs/router';

export const routes: Route[] = [
  {
    path: '',
    component: 'app-layout-default',
    children: [
      {
        path: '',
        component: 'app-page-home',
        action: () => import('./pages/home.js'),
      },
      {
        path: 'framework/:slug?',
        component: 'app-page-framework',
        action: () => import('./pages/framework.js'),
      },
      {
        path: 'ui/:slug/dev',
        component: 'app-page-ui-dev',
        action: () => import('./pages/ui-dev/index.js'),
      },
      {
        path: 'ui/:slug?',
        component: 'app-page-ui',
        action: () => import('./pages/ui.js'),
      },
      {
        path: 'module/:slug?',
        component: 'app-page-module',
        action: () => import('./pages/module.js'),
      },
      {
        path: 'toolbox/:slug?',
        component: 'app-page-toolbox',
        action: () => import('./pages/toolbox.js'),
      },
      {
        path: 'cli/:slug?',
        component: 'app-page-cli',
        action: () => import('./pages/cli.js'),
      },
      // 404
      {
        path: '**',
        component: 'app-page-404',
        action: () => import('./pages/404.js'),
      },
    ],
  },
];
