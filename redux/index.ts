import { applyMiddleware, legacy_createStore, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';

import appReducer from './reducers/appReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export default legacy_createStore(rootReducer, applyMiddleware(thunk));
