import {defineTiniConfig} from '@tinijs/project';

export default defineTiniConfig({
  modules: ['@tinijs/content'],

  cli: {
    expand: ['@tinijs/content'],
  },
});
