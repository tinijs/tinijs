import type {Route} from '@tinijs/router';

export const routes: Route[] = [
  {
    path: '',
    element: 'app-layout-default',
    children: [
      {
        path: '',
        element: 'app-page-home',
        action: () => import('./pages/home.js'),
      },
      {
        path: 'framework/:slug?',
        element: 'app-page-framework',
        action: () => import('./pages/framework.js'),
      },
      {
        path: 'ui/:slug/dev',
        element: 'app-page-ui-dev',
        action: () => import('./pages/ui-dev/index.js'),
      },
      {
        path: 'ui/:slug?',
        element: 'app-page-ui',
        action: () => import('./pages/ui.js'),
      },
      {
        path: 'module/:slug?',
        element: 'app-page-module',
        action: () => import('./pages/module.js'),
      },
      {
        path: 'toolbox/:slug?',
        element: 'app-page-toolbox',
        action: () => import('./pages/toolbox.js'),
      },
      {
        path: 'cli/:slug?',
        element: 'app-page-cli',
        action: () => import('./pages/cli.js'),
      },
      // 404
      {
        path: '**',
        element: 'app-page-404',
        action: () => import('./pages/404.js'),
      },
    ],
  },
];
