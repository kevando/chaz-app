import _ from 'lodash';

import {
  SET_NOTIFICATION_PERMISSION,
  INITIALIZE_APP,
  USER_SIGNED_IN,
  SIGN_IN_CONFIRM_RESULT,
  SIGN_IN_ERROR,
  SIGN_IN_ATTEMPT,
  CONFIRM_CODE_ATTEMPT,
  CONFIRM_CODE_SUCCESS,
  CONFIRM_CODE_ERROR,
  SET_TOKEN,
  SET_APP_STATUS,
  SET_APP_ERROR,
} from '../actionTypes';

const initialState = {
  isAuthenticated: false,
  uid: null,
  notificationPermission: null,
};


export default function app(app = initialState, action = {}) {

  switch (action.type) {
    // -------------------------------------------
    case USER_SIGNED_IN:
      return {
        ...app,
        isAuthenticated: true,
        isAnonymous: action.user.isAnonymous,
        uid: action.user.uid,
      }

    // -------------------------------------------
    case SET_NOTIFICATION_PERMISSION:
      return Object.assign({}, app, {
        notificationPermission: action.response
      })

    // -------------------------------------------
    case SET_TOKEN:
      return {
        ...app,
        token: action.token,
      }

    // -------------------------------------------
    // Phone auth
    case SIGN_IN_ATTEMPT:
      return {
        ...app,
        status: 'Signing In..',
        activeStep: 1,
      }

    // -------------------------------------------
    case SIGN_IN_CONFIRM_RESULT:
      console.log(action)

      return {
        ...app,
        activeStep: 2,
        status: 'code has been sent!',
        confirmResult: action.confirmResult,
        formatedNumber: action.formatedNumber,
      }

    // -------------------------------------------
    case SIGN_IN_ERROR:
      return {
        ...app,
        status: action.status
      }
    // -------------------------------------------
    case CONFIRM_CODE_ATTEMPT:
      return {
        ...app,
        status: action.status,
        // error: action.error,
      }
    // -------------------------------------------
    case CONFIRM_CODE_ERROR:
      return {
        ...app,
        status: 'Confirm code error' + action.error.message,
        error: action.error,
      }
    // -------------------------------------------
    case CONFIRM_CODE_SUCCESS:
      return {
        ...app,
        status: action.status,
        error: null,
      }

    // -------------------------------------------
    case SET_APP_STATUS:
      return {
        ...app,
        status: action.status,
      }
    // -------------------------------------------
    case SET_APP_ERROR:
      return {
        ...app,
        error: action.error,
      }

    default:
      return app;
  }
}
