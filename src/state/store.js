import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import auth from "./auth/reducer";
import movies from "./movies/reducer";

const reducer = combineReducers({
  auth,
  movies,
});

export default (initialState) =>
  createStore(
    reducer,
    { ...initialState },
    composeWithDevTools(applyMiddleware(thunk))
  );
