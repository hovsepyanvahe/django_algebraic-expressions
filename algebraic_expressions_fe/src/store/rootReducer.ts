import {combineReducers} from 'redux';
import {appReducer as mainReducer, resetStore} from '~/modules/app';
import {authReducer} from "~/modules/auth";
import {expressionReducer} from "~/modules/expression";

const appReducer = combineReducers({
  app: mainReducer,
  auth: authReducer,
  expression:expressionReducer
});

export const rootReducer: typeof appReducer = (state, action) => {
  if (action.type === resetStore.type) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
