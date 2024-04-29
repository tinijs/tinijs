import {app} from '../app.js';

export default eventHandler(() => {
  return app.serve();
});
