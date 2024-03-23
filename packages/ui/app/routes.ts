import {Route} from '@tinijs/router';

import {TiniTableComponent} from '@tinijs/ui/components/table';
import {TiniCodeComponent} from '@tinijs/ui/components/code';

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
  action: () => import('./pages/home'),
  title: 'Introduction',
};

export const getStartedRoute: Route = {
  path: 'get-started',
  component: 'app-page-get-started',
  action: () => import('./pages/get-started'),
};

export const topRoutes = [introductionRoute, getStartedRoute];

/*
 * Guides Routes
 */

export const guidesCustomizationRoute: Route = {
  path: 'guides/customization',
  component: 'app-page-guides-customization',
  action: () => import('./pages/guides/customization'),
};

export const guidesRoutes = [guidesCustomizationRoute];

/*
 * Components Routes
 */

export const componentsBasesRoute: Route = {
  path: 'components/bases',
  component: 'app-page-components-bases',
  action: () => import('./pages/components/bases'),
};

export const componentsTextRoute: Route = {
  path: 'components/text',
  component: 'app-page-components-text',
  action: () => import('./pages/components/text'),
};

export const componentsLinkRoute: Route = {
  path: 'components/link',
  component: 'app-page-components-link',
  action: () => import('./pages/components/link'),
};

export const componentsHeadingRoute: Route = {
  path: 'components/heading',
  component: 'app-page-components-heading',
  action: () => import('./pages/components/heading'),
};

export const componentsImageRoute: Route = {
  path: 'components/image',
  component: 'app-page-components-image',
  action: () => import('./pages/components/image'),
};

export const componentsFigureRoute: Route = {
  path: 'components/figure',
  component: 'app-page-components-figure',
  action: () => import('./pages/components/figure'),
};

export const componentsEmbedRoute: Route = {
  path: 'components/embed',
  component: 'app-page-components-embed',
  action: () => import('./pages/components/embed'),
};

export const componentsTableRoute: Route = {
  path: 'components/table',
  component: 'app-page-components-table',
  action: () => import('./pages/components/table'),
  data: {
    component: TiniTableComponent,
  },
};

export const componentsCodeRoute: Route = {
  path: 'components/code',
  component: 'app-page-components-code',
  action: () => import('./pages/components/code'),
  data: {
    component: TiniCodeComponent,
  },
};

export const componentsGenericRoute: Route = {
  path: 'components/generic',
  component: 'app-page-components-generic',
  action: () => import('./pages/components/generic'),
};

export const componentsBoxRoute: Route = {
  path: 'components/box',
  component: 'app-page-components-box',
  action: () => import('./pages/components/box'),
};

export const componentsSkeletonRoute: Route = {
  path: 'components/skeleton',
  component: 'app-page-components-skeleton',
  action: () => import('./pages/components/skeleton'),
};

export const componentsIconRoute: Route = {
  path: 'components/icon',
  component: 'app-page-components-icon',
  action: () => import('./pages/components/icon'),
};

export const componentsButtonRoute: Route = {
  path: 'components/button',
  component: 'app-page-components-button',
  action: () => import('./pages/components/button'),
};

export const componentsBadgeRoute: Route = {
  path: 'components/badge',
  component: 'app-page-components-badge',
  action: () => import('./pages/components/badge'),
};

export const componentsBreadcrumbRoute: Route = {
  path: 'components/breadcrumb',
  component: 'app-page-components-breadcrumb',
  action: () => import('./pages/components/breadcrumb'),
};

export const componentsCardRoute: Route = {
  path: 'components/card',
  component: 'app-page-components-card',
  action: () => import('./pages/components/card'),
};

export const componentsCheckboxesRoute: Route = {
  path: 'components/checkboxes',
  component: 'app-page-components-checkboxes',
  action: () => import('./pages/components/checkboxes'),
};

export const componentsDialogRoute: Route = {
  path: 'components/dialog',
  component: 'app-page-components-dialog',
  action: () => import('./pages/components/dialog'),
};

export const componentsInputRoute: Route = {
  path: 'components/input',
  component: 'app-page-components-input',
  action: () => import('./pages/components/input'),
};

export const componentsTextareaRoute: Route = {
  path: 'components/textarea',
  component: 'app-page-components-textarea',
  action: () => import('./pages/components/textarea'),
};

export const componentsLabelRoute: Route = {
  path: 'components/label',
  component: 'app-page-components-label',
  action: () => import('./pages/components/label'),
};

export const componentsMessageRoute: Route = {
  path: 'components/message',
  component: 'app-page-components-message',
  action: () => import('./pages/components/message'),
};

export const componentsModalRoute: Route = {
  path: 'components/modal',
  component: 'app-page-components-modal',
  action: () => import('./pages/components/modal'),
};

export const componentsPaginationRoute: Route = {
  path: 'components/pagination',
  component: 'app-page-components-pagination',
  action: () => import('./pages/components/pagination'),
};

export const componentsRadiosRoute: Route = {
  path: 'components/radios',
  component: 'app-page-components-radios',
  action: () => import('./pages/components/radios'),
};

export const componentsSelectRoute: Route = {
  path: 'components/select',
  component: 'app-page-components-select',
  action: () => import('./pages/components/select'),
};

export const componentsSpinnerRoute: Route = {
  path: 'components/spinner',
  component: 'app-page-components-spinner',
  action: () => import('./pages/components/spinner'),
};

export const componentsSwitchRoute: Route = {
  path: 'components/switch',
  component: 'app-page-components-switch',
  action: () => import('./pages/components/switch'),
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
  componentsGenericRoute,
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
 * Icons Routes
 */

export const iconsRoutes: Route[] = [
  {
    path: 'icons/bootstrap',
    component: 'app-page-icons-bootstrap',
    action: () => import('./pages/icons/bootstrap'),
  },
  {
    path: 'icons/material-filled',
    component: 'app-page-icons-material-filled',
    action: () => import('./pages/icons/material-filled'),
  },
  {
    path: 'icons/material-outlined',
    component: 'app-page-icons-material-outlined',
    action: () => import('./pages/icons/material-outlined'),
  },
  {
    path: 'icons/material-round',
    component: 'app-page-icons-material-round',
    action: () => import('./pages/icons/material-round'),
  },
  {
    path: 'icons/material-sharp',
    component: 'app-page-icons-material-sharp',
    action: () => import('./pages/icons/material-sharp'),
  },
  {
    path: 'icons/material-two-tone',
    component: 'app-page-icons-material-two-tone',
    action: () => import('./pages/icons/material-two-tone'),
  },
  {
    path: 'icons/mdi',
    component: 'app-page-icons-mdi',
    action: () => import('./pages/icons/mdi'),
  },
  {
    path: 'icons/ionic',
    component: 'app-page-icons-ionic',
    action: () => import('./pages/icons/ionic'),
  },
  {
    path: 'icons/fluent',
    component: 'app-page-icons-fluent',
    action: () => import('./pages/icons/fluent'),
  },
  {
    path: 'icons/ant-filled',
    component: 'app-page-icons-ant-filled',
    action: () => import('./pages/icons/ant-filled'),
  },
  {
    path: 'icons/ant-outlined',
    component: 'app-page-icons-ant-outlined',
    action: () => import('./pages/icons/ant-outlined'),
  },
  {
    path: 'icons/ant-twotone',
    component: 'app-page-icons-ant-twotone',
    action: () => import('./pages/icons/ant-twotone'),
  },
  {
    path: 'icons/fontawesome-brands',
    component: 'app-page-icons-fontawesome-brands',
    action: () => import('./pages/icons/fontawesome-brands'),
    title: 'Font Awesome Brands',
  },
  {
    path: 'icons/fontawesome-regular',
    component: 'app-page-icons-fontawesome-regular',
    action: () => import('./pages/icons/fontawesome-regular'),
    title: 'Font Awesome Regular',
  },
  {
    path: 'icons/fontawesome-solid',
    component: 'app-page-icons-fontawesome-solid',
    action: () => import('./pages/icons/fontawesome-solid'),
    title: 'Font Awesome Solid',
  },
];

/*
 * 404
 */

export const notFoundRoute: Route = {
  path: '**',
  component: 'app-page-404',
  action: () => import('./pages/404'),
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
      // icons
      ...iconsRoutes,
      // 404
      notFoundRoute,
    ],
  },
] as Route[];
