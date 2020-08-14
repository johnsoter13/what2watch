import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import init from "../state/init/reducer";

const reducer = combineReducers({
  init,
});

export default (initialState) =>
  createStore(
    reducer,
    { ...initialState },
    composeWithDevTools(applyMiddleware(thunk))
  );
