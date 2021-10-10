import { createStore, combineReducers } from "redux";

import notes from "./reuducers/notes";

const store = createStore(
  combineReducers({ notes }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
