import {combineReducers} from 'redux';
import {types} from '../types';
import user from './user';
import app from './app';

const reducer = combineReducers({
  user,
  app,
});

const rootReducer = (state, action) => {
  if (action.type === types.LOGOUT) {
    const { app } = state;
    state = { app };
  }

  if (action.type === types.RESET_APP) {
    state = undefined;
  }

  return reducer(state, action);
};

export default rootReducer;
