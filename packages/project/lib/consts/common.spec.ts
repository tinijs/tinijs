import {test, expect} from 'vitest';

import {PACKAGE_NAME} from './common.js';

test('PACKAGE_NAME', () => {
  expect(PACKAGE_NAME).toBe('@tinijs/project');
});
