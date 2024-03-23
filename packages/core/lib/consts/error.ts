export const NO_APP_ERROR = new Error(
  'No TiniJS app available, please init via @App() decorator first.'
);
export const DUPLICATED_APP_ERROR = new Error(
  'A TiniJS app is already available, you must init @App() only once.'
);
export const NO_REGISTER_ERROR = (id: string) =>
  new Error(`No register for the dependency "${id}".`);
