import {info} from './utils/subject.js';

export const HELLO_WORLD_SUBJECT = info({
  title: 'Hello world',
  desc: 'A hello world page.',
  path: '/hello-world',
  docPath: '/framework/get-started',
  batches: [1],
});

export const BOX_SUBJECT = info({
  title: 'tini-box',
  desc: 'The tini-box component.',
  path: '/ui/box',
  docPath: '/ui/box',
  batches: [1, 1000, 10000],
});

export const BOX_OVERLOAD_SUBJECT = info({
  title: 'tini-box (overloaded)',
  desc: 'The tini-box component (overloaded).',
  path: '/ui/box-overload',
  docPath: '/ui/box',
  batches: [1, 100, 1000],
});

export const FLEX_SUBJECT = info({
  title: 'tini-flex',
  desc: 'The tini-flex component.',
  path: '/ui/flex',
  docPath: '/ui/flex',
  batches: [1, 500, 5000],
});

export const GRID_SUBJECT = info({
  title: 'tini-grid',
  desc: 'The tini-grid component.',
  path: '/ui/grid',
  docPath: '/ui/grid',
  batches: [1, 100, 1000],
});

export const CONTAINER_SUBJECT = info({
  title: 'tini-container',
  desc: 'The tini-container component.',
  path: '/ui/container',
  docPath: '/ui/container',
  batches: [1, 100, 1000],
});

export const HEADING_SUBJECT = info({
  title: 'tini-heading',
  desc: 'The tini-heading component.',
  path: '/ui/heading',
  docPath: '/ui/heading',
  batches: [6, 100, 1000],
});

export const LINK_SUBJECT = info({
  title: 'tini-link',
  desc: 'The tini-link component.',
  path: '/ui/link',
  docPath: '/ui/link',
  batches: [8, 100, 1000],
});

export const IMAGE_SUBJECT = info({
  title: 'tini-image',
  desc: 'The tini-image component.',
  path: '/ui/image',
  docPath: '/ui/image',
  batches: [3, 100, 1000],
});

export const TEXT_SUBJECT = info({
  title: 'tini-text',
  desc: 'The tini-text component.',
  path: '/ui/text',
  docPath: '/ui/text',
  batches: [15, 1000, 10000],
});

export const TEXT_CLASS_SUBJECT = info({
  title: 'Class-styled texts',
  desc: 'Texts using classes.',
  path: '/ui/text-class',
  docPath: '/ui/design-tokens#typography',
  batches: [15, 1000, 10000],
});

export const TEXT_INLINE_SUBJECT = info({
  title: 'Inline-styled texts',
  desc: 'Texts using inline styles.',
  path: '/ui/text-inline',
  docPath: '/ui/design-tokens#typography',
  batches: [15, 1000, 10000],
});

export default [
  HELLO_WORLD_SUBJECT,
  BOX_SUBJECT,
  BOX_OVERLOAD_SUBJECT,
  FLEX_SUBJECT,
  GRID_SUBJECT,
  CONTAINER_SUBJECT,
  HEADING_SUBJECT,
  LINK_SUBJECT,
  IMAGE_SUBJECT,
  TEXT_SUBJECT,
  TEXT_CLASS_SUBJECT,
  TEXT_INLINE_SUBJECT,
];
