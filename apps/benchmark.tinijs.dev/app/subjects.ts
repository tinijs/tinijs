import {info} from './utils/subject.js';

export const HELLO_WORLD_SUBJECT = info({
  title: 'Hello world',
  path: '/hello-world',
  docPath: '/framework/get-started',
  batches: [1],
});

export const BOX_SUBJECT = info({
  title: 'tini-box',
  path: '/ui/box',
  docPath: '/ui/box',
  batches: [1, 1000, 10000],
});

export const FLEX_SUBJECT = info({
  title: 'tini-flex',
  path: '/ui/flex',
  docPath: '/ui/flex',
  batches: [1, 1000, 10000],
});

export const GRID_SUBJECT = info({
  title: 'tini-grid',
  path: '/ui/grid',
  docPath: '/ui/grid',
  batches: [1, 100, 1000],
});

export const CONTAINER_SUBJECT = info({
  title: 'tini-container',
  path: '/ui/container',
  docPath: '/ui/container',
  batches: [1, 100, 1000],
});

export const HEADING_SUBJECT = info({
  title: 'tini-heading',
  path: '/ui/heading',
  docPath: '/ui/heading',
  batches: [6, 100, 1000],
});

export const LINK_SUBJECT = info({
  title: 'tini-link',
  path: '/ui/link',
  docPath: '/ui/link',
  batches: [8, 100, 1000],
});

export const IMAGE_SUBJECT = info({
  title: 'tini-image',
  path: '/ui/image',
  docPath: '/ui/image',
  batches: [3, 100, 1000],
});

export const TEXT_SUBJECT = info({
  title: 'tini-text',
  path: '/ui/text',
  docPath: '/ui/text',
  batches: [10, 1000, 10000],
});

export const TEXT_NATIVE_SUBJECT = info({
  title: 'Native texts',
  path: '/ui/text-native',
  docPath: '/ui/token',
  batches: [10, 1000, 10000],
});

export default [
  HELLO_WORLD_SUBJECT,
  BOX_SUBJECT,
  FLEX_SUBJECT,
  GRID_SUBJECT,
  CONTAINER_SUBJECT,
  HEADING_SUBJECT,
  LINK_SUBJECT,
  IMAGE_SUBJECT,
  TEXT_SUBJECT,
  TEXT_NATIVE_SUBJECT,
];
