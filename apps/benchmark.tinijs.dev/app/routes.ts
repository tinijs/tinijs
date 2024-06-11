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
      {
        path: '/ui/heading',
        component: 'app-page-ui-heading',
        action: () => import('./pages/ui-heading.js'),
      },
      {
        path: '/ui/link',
        component: 'app-page-ui-link',
        action: () => import('./pages/ui-link.js'),
      },
      {
        path: '/ui/image',
        component: 'app-page-ui-image',
        action: () => import('./pages/ui-image.js'),
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
