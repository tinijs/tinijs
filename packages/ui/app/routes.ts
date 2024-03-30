import {Route} from '@tinijs/router';

import {TiniTableComponent, TiniCodeComponent} from '@ui';

/*
 * Layouts
 */

export const defaultLayoutRoute: Route = {
  path: '',
  component: 'app-layout-default',
};

/*
 * Top Routes
 */

export const introductionRoute: Route = {
  path: '',
  component: 'app-page-home',
  action: () => import('./pages/home.js'),
  title: 'Introduction',
};

export const getStartedRoute: Route = {
  path: 'get-started',
  component: 'app-page-get-started',
  action: () => import('./pages/get-started.js'),
};

export const topRoutes = [introductionRoute, getStartedRoute];

/*
 * Guides Routes
 */

export const guidesCustomizationRoute: Route = {
  path: 'guides/customization',
  component: 'app-page-guides-customization',
  action: () => import('./pages/guides/customization.js'),
};

export const guidesRoutes = [guidesCustomizationRoute];

/*
 * Components Routes
 */

export const componentsBasesRoute: Route = {
  path: 'components/bases',
  component: 'app-page-components-bases',
  action: () => import('./pages/components/bases.js'),
};

export const componentsTextRoute: Route = {
  path: 'components/text',
  component: 'app-page-components-text',
  action: () => import('./pages/components/text.js'),
};

export const componentsLinkRoute: Route = {
  path: 'components/link',
  component: 'app-page-components-link',
  action: () => import('./pages/components/link.js'),
};

export const componentsHeadingRoute: Route = {
  path: 'components/heading',
  component: 'app-page-components-heading',
  action: () => import('./pages/components/heading.js'),
};

export const componentsImageRoute: Route = {
  path: 'components/image',
  component: 'app-page-components-image',
  action: () => import('./pages/components/image.js'),
};

export const componentsFigureRoute: Route = {
  path: 'components/figure',
  component: 'app-page-components-figure',
  action: () => import('./pages/components/figure.js'),
};

export const componentsEmbedRoute: Route = {
  path: 'components/embed',
  component: 'app-page-components-embed',
  action: () => import('./pages/components/embed.js'),
};

export const componentsTableRoute: Route = {
  path: 'components/table',
  component: 'app-page-components-table',
  action: () => import('./pages/components/table.js'),
  data: {
    component: TiniTableComponent,
  },
};

export const componentsCodeRoute: Route = {
  path: 'components/code',
  component: 'app-page-components-code',
  action: () => import('./pages/components/code.js'),
  data: {
    component: TiniCodeComponent,
  },
};

// export const componentsGenericRoute: Route = {
//   path: 'components/generic',
//   component: 'app-page-components-generic',
//   action: () => import('./pages/components/generic.js'),
// };

export const componentsBoxRoute: Route = {
  path: 'components/box',
  component: 'app-page-components-box',
  action: () => import('./pages/components/box.js'),
};

export const componentsSkeletonRoute: Route = {
  path: 'components/skeleton',
  component: 'app-page-components-skeleton',
  action: () => import('./pages/components/skeleton.js'),
};

export const componentsIconRoute: Route = {
  path: 'components/icon',
  component: 'app-page-components-icon',
  action: () => import('./pages/components/icon.js'),
};

export const componentsButtonRoute: Route = {
  path: 'components/button',
  component: 'app-page-components-button',
  action: () => import('./pages/components/button.js'),
};

export const componentsBadgeRoute: Route = {
  path: 'components/badge',
  component: 'app-page-components-badge',
  action: () => import('./pages/components/badge.js'),
};

export const componentsBreadcrumbRoute: Route = {
  path: 'components/breadcrumb',
  component: 'app-page-components-breadcrumb',
  action: () => import('./pages/components/breadcrumb.js'),
};

export const componentsCardRoute: Route = {
  path: 'components/card',
  component: 'app-page-components-card',
  action: () => import('./pages/components/card.js'),
};

export const componentsCheckboxesRoute: Route = {
  path: 'components/checkboxes',
  component: 'app-page-components-checkboxes',
  action: () => import('./pages/components/checkboxes.js'),
};

export const componentsDialogRoute: Route = {
  path: 'components/dialog',
  component: 'app-page-components-dialog',
  action: () => import('./pages/components/dialog.js'),
};

export const componentsInputRoute: Route = {
  path: 'components/input',
  component: 'app-page-components-input',
  action: () => import('./pages/components/input.js'),
};

export const componentsTextareaRoute: Route = {
  path: 'components/textarea',
  component: 'app-page-components-textarea',
  action: () => import('./pages/components/textarea.js'),
};

export const componentsLabelRoute: Route = {
  path: 'components/label',
  component: 'app-page-components-label',
  action: () => import('./pages/components/label.js'),
};

export const componentsMessageRoute: Route = {
  path: 'components/message',
  component: 'app-page-components-message',
  action: () => import('./pages/components/message.js'),
};

export const componentsModalRoute: Route = {
  path: 'components/modal',
  component: 'app-page-components-modal',
  action: () => import('./pages/components/modal.js'),
};

export const componentsPaginationRoute: Route = {
  path: 'components/pagination',
  component: 'app-page-components-pagination',
  action: () => import('./pages/components/pagination.js'),
};

export const componentsRadiosRoute: Route = {
  path: 'components/radios',
  component: 'app-page-components-radios',
  action: () => import('./pages/components/radios.js'),
};

export const componentsSelectRoute: Route = {
  path: 'components/select',
  component: 'app-page-components-select',
  action: () => import('./pages/components/select.js'),
};

export const componentsSpinnerRoute: Route = {
  path: 'components/spinner',
  component: 'app-page-components-spinner',
  action: () => import('./pages/components/spinner.js'),
};

export const componentsSwitchRoute: Route = {
  path: 'components/switch',
  component: 'app-page-components-switch',
  action: () => import('./pages/components/switch.js'),
};

export const componentsRoutes = [
  componentsBasesRoute,
  componentsTextRoute,
  componentsLinkRoute,
  componentsHeadingRoute,
  componentsImageRoute,
  componentsFigureRoute,
  componentsEmbedRoute,
  componentsTableRoute,
  componentsCodeRoute,
  // componentsGenericRoute,
  componentsBoxRoute,
  componentsSkeletonRoute,
  componentsIconRoute,
  componentsButtonRoute,
  componentsBadgeRoute,
  componentsLabelRoute,
  componentsMessageRoute,
  componentsSpinnerRoute,
  componentsCardRoute,
  componentsBreadcrumbRoute,
  componentsPaginationRoute,
  componentsDialogRoute,
  componentsModalRoute,
  componentsInputRoute,
  componentsTextareaRoute,
  componentsSelectRoute,
  componentsCheckboxesRoute,
  componentsRadiosRoute,
  componentsSwitchRoute,
];

/*
 * 404
 */

export const notFoundRoute: Route = {
  path: '**',
  component: 'app-page-404',
  action: () => import('./pages/404.js'),
};

/*
 * All Routes
 */

export default [
  {
    ...defaultLayoutRoute,
    children: [
      ...topRoutes,
      // guides
      ...guidesRoutes,
      // components
      ...componentsRoutes,
      // 404
      notFoundRoute,
    ],
  },
] as Route[];
