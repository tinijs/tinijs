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
      // hello-world
      {
        path: '/hello-world',
        component: 'app-page-hello-world',
        action: () => import('./pages/subjects/hello-world.js'),
      },
      // ui
      {
        path: '/ui/box',
        component: 'app-page-ui-box',
        action: () => import('./pages/subjects/ui-box.js'),
      },
      {
        path: '/ui/flex',
        component: 'app-page-ui-flex',
        action: () => import('./pages/subjects/ui-flex.js'),
      },
      {
        path: '/ui/grid',
        component: 'app-page-ui-grid',
        action: () => import('./pages/subjects/ui-grid.js'),
      },
      {
        path: '/ui/container',
        component: 'app-page-ui-container',
        action: () => import('./pages/subjects/ui-container.js'),
      },
      {
        path: '/ui/heading',
        component: 'app-page-ui-heading',
        action: () => import('./pages/subjects/ui-heading.js'),
      },
      {
        path: '/ui/link',
        component: 'app-page-ui-link',
        action: () => import('./pages/subjects/ui-link.js'),
      },
      {
        path: '/ui/image',
        component: 'app-page-ui-image',
        action: () => import('./pages/subjects/ui-image.js'),
      },
      {
        path: '/ui/text',
        component: 'app-page-ui-text',
        action: () => import('./pages/subjects/ui-text.js'),
      },
      {
        path: '/ui/text-class',
        component: 'app-page-ui-text-class',
        action: () => import('./pages/subjects/ui-text-class.js'),
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
