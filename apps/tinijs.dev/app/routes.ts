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
        path: 'framework',
        component: 'app-page-framework',
        action: () => import('./pages/framework.js'),
      },
      {
        path: 'ui',
        component: 'app-page-ui',
        action: () => import('./pages/ui.js'),
      },
      {
        path: 'content',
        component: 'app-page-content',
        action: () => import('./pages/content.js'),
      },
      {
        path: 'server',
        component: 'app-page-server',
        action: () => import('./pages/server.js'),
      },
      {
        path: 'cli',
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
