import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import auth from './auth/reducer';
import movies from './movies/reducer';
import streaming from './streaming/reducer';
import search from './search/reducer';

const reducer = combineReducers({
  auth,
  movies,
  streaming,
  search,
});

export default (initialState) =>
  createStore(
    reducer,
    { ...initialState },
    composeWithDevTools(applyMiddleware(thunk))
  );
