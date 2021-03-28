import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import auth from './auth/reducer';
import movies from './movies/reducer';
import streaming from './streaming/reducer';
import search from './search/reducer';
import rooms from './rooms/reducer';
import modal from './modal/reducer';
import animation from './animation/reducer';

const reducer = combineReducers({
  auth,
  movies,
  streaming,
  search,
  rooms,
  modal,
  animation,
});

export default (initialState) =>
  createStore(
    reducer,
    { ...initialState },
    composeWithDevTools(applyMiddleware(thunk))
  );
