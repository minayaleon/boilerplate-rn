import {types} from '../types';
import {coreState} from '../state';

const initialState = {...coreState.app};

function app(state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_THEME:
    case types.MANAGE_THEME:{
      return {...state, ...action.payload};
    }
    default:
      return state;
  }
}

export default app;
