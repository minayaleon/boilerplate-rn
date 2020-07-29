import {types} from '../types';

export function changeTheme(payload) {
  return {
    type: types.CHANGE_THEME,
    payload,
  };
}

export function setManageTheme(payload) {
  return {
    type: types.MANAGE_THEME,
    payload,
  };
}
