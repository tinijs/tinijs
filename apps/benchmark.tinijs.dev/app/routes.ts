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
      // hello-world
      {
        path: '/hello-world',
        element: 'app-page-hello-world',
        action: () => import('./pages/subjects/hello-world.js'),
      },
      // ui
      {
        path: '/ui/box',
        element: 'app-page-ui-box',
        action: () => import('./pages/subjects/ui-box.js'),
      },
      {
        path: '/ui/box-full',
        element: 'app-page-ui-box-full',
        action: () => import('./pages/subjects/ui-box-full.js'),
      },
      {
        path: '/ui/box-overload',
        element: 'app-page-ui-box-overload',
        action: () => import('./pages/subjects/ui-box-overload.js'),
      },
      {
        path: '/ui/flex',
        element: 'app-page-ui-flex',
        action: () => import('./pages/subjects/ui-flex.js'),
      },
      {
        path: '/ui/grid',
        element: 'app-page-ui-grid',
        action: () => import('./pages/subjects/ui-grid.js'),
      },
      {
        path: '/ui/container',
        element: 'app-page-ui-container',
        action: () => import('./pages/subjects/ui-container.js'),
      },
      {
        path: '/ui/heading',
        element: 'app-page-ui-heading',
        action: () => import('./pages/subjects/ui-heading.js'),
      },
      {
        path: '/ui/link',
        element: 'app-page-ui-link',
        action: () => import('./pages/subjects/ui-link.js'),
      },
      {
        path: '/ui/image',
        element: 'app-page-ui-image',
        action: () => import('./pages/subjects/ui-image.js'),
      },
      {
        path: '/ui/text',
        element: 'app-page-ui-text',
        action: () => import('./pages/subjects/ui-text.js'),
      },
      {
        path: '/ui/text-class',
        element: 'app-page-ui-text-class',
        action: () => import('./pages/subjects/ui-text-class.js'),
      },
      {
        path: '/ui/text-inline',
        element: 'app-page-ui-text-inline',
        action: () => import('./pages/subjects/ui-text-inline.js'),
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
