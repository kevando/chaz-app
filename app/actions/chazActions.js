import * as types from './actionTypes';

export function setAuthData(authData) {

  return {
    type: types.SET_AUTH_DATA,
    payload: authData
  };
}
