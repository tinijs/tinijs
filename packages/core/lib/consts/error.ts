export const NO_APP_ERROR = new Error(
  'No TiniJS app available, please init via @App() decorator first.'
);
export const DUPLICATED_APP_ERROR = new Error(
  'A TiniJS app is already available, you must init @App() only once.'
);

export const NO_REGISTER_ERROR = (id: string) =>
  new Error(`No register for the dependency "${id}".`);

export const NO_UI_ERROR = new Error(
  'No UI instance available, please setupUI() or initUI() first!'
);
export const DUPLICATED_UI_ERROR = new Error(
  'An UI instance already exists, you must trigger setupUI() or initUI() only once!'
);
