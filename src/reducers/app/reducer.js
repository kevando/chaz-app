import _ from 'lodash';
//
// import {
//   SET_NOTIFICATION_PERMISSION,
//   INITIALIZE_APP,
//   USER_SIGNED_IN,
//   SIGN_IN_CONFIRM_RESULT,
//   SIGN_IN_ERROR,
//   SIGN_IN_ATTEMPT,
//   CONFIRM_CODE_ATTEMPT,
//   CONFIRM_CODE_SUCCESS,
//   CONFIRM_CODE_ERROR,
//   SET_TOKEN,
//   SET_APP_STATUS,
//   SET_APP_ERROR,
//   USER_SIGNED_OUT,
//   USERS_LINKED
// } from '../actionTypes';

import * as t from '../actionTypes'

const initialState = {
  isAuthenticated: false,
  uid: null,
  notificationPermission: null,
  // isAnon: true,
};


export default function app(app = initialState, action = {}) {

  switch (action.type) {

    // -------------------------------------------
    case t.USER_IS_AUTHENTICATED:
      return {
        ...app,
        isAuthenticated: true,
        providerData: action.user.providerData,
        providerId: action.user.providerId,
        uid: action.user.uid,
        isAnon: action.user.providerData.length == 0 ? true : false,
      }

    // -------------------------------------------
    case t.USER_SIGNED_OUT:
    // console.log('signed out app')
      return {
        ...app,
        isAuthenticated: false,
        isAnonymous: false,
        uid: null,
      }

    // -------------------------------------------
    case t.USERS_LINKED:
      // console.log('USERS_LINKED',action.user)
      // console.log('USER_SIGNED_IN',action.user.email)
      return {
        ...app,
        linked: true,
        activeStep: 3,
        isAnon: action.user.providerData.length == 0 ? true : false,
      }
    // -------------------------------------------
    case t.SET_NOTIFICATION_PERMISSION:
      return Object.assign({}, app, {
        notificationPermission: action.response
      })

    // -------------------------------------------
    case t.SET_TOKEN:
      return {
        ...app,
        token: action.token,
      }

    // -------------------------------------------
    // Phone auth
    case t.SIGN_IN_ATTEMPT:
      return {
        ...app,
        status: 'Signing In..',
        activeStep: 1,
      }

    // -------------------------------------------
    case t.SIGN_IN_CONFIRM_RESULT:

      return {
        ...app,
        activeStep: 2,
        status: 'code has been sent!',
        // confirmResult: action.confirmResult,
        verificationId: action.verificationId,
        formatedNumber: action.formatedNumber,
      }

    // -------------------------------------------
    case t.SIGN_IN_ERROR:
      return {
        ...app,
        status: action.status
      }
    // -------------------------------------------
    case t.CONFIRM_CODE_ATTEMPT:
      return {
        ...app,
        status: action.status,
        // error: action.error,
      }
    // -------------------------------------------
    case t.CONFIRM_CODE_ERROR:
      return {
        ...app,
        status: 'Confirm code error' + action.error.message,
        error: action.error,
      }
    // -------------------------------------------
    case t.CONFIRM_CODE_SUCCESS:
      return {
        ...app,
        status: action.status,
        error: null,
      }

    // -------------------------------------------
    case t.SET_APP_STATUS:
      return {
        ...app,
        status: action.status,
      }
    // -------------------------------------------
    case t.SET_APP_ERROR:
      console.log(action)
      console.warn(action.error.message)
      return {
        ...app,
        error: action.error,
      }

    default:
      return app;
  }
}
