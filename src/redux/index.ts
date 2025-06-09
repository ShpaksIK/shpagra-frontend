import { applyMiddleware, legacy_createStore, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';

import appReducer from './reducers/appReducer';
import searchReducer from './reducers/searchReducer';
import authReducer from './reducers/authReducer';
import articleReducer from './reducers/articleReducer';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  search: searchReducer,
  article: articleReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export default legacy_createStore(rootReducer, applyMiddleware(thunk));
