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
      // blank
      {
        path: '/blank',
        component: 'app-page-blank',
        action: () => import('./pages/blank.js'),
      },
      // ui
      {
        path: '/ui/text',
        component: 'app-page-ui-text',
        action: () => import('./pages/ui-text.js'),
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
