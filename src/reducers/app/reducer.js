import _ from 'lodash';
//

import * as t from '../actionTypes'

const initialState = {
  isAuthenticated: false,
  uid: null,
  notificationPermission: null,
  // isAnon: true,
  signInAttempts: 0,
  invites: [],
  devMode: false,
  onboarding: true,
};


export default function app(app = initialState, action = {}) {
  // console.log(action)
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
      return {
        ...app,
        linked: true,
        activeStep: 3,
        isAnon: action.user.providerData.length == 0 ? true : false,
        onboarding: false,
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
        // status: 'Signing In..',
        activeStep: 1,
        signInAttempts: ++app.signInAttempts,
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
    case t.RESET_PHONE:
      return {
          ...app,
          phoneNumber: null,
          activeStep: 1,
      }
    // -------------------------------------------
    case t.APP_SHOULD_SIGN_IN:
      return {
          ...app,
          shouldSignIn: true,
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
    case t.SET_APP_DATA:
    // console.warn(action.data)
      return {
        ...app,
        ...action.data,
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
