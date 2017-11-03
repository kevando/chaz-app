// import {
//   INITIALIZE_APP,
//   USER_SIGNED_IN,
//   USER_SIGNED_OUT,
//   CONFIRM_CODE_ERROR,
//   USERS_LINKED,
//   SET_USER_PHONE,
//   USER_IS_AUTHENTICATED
// } from '../actionTypes';
import * as t from '../actionTypes'

const initialState = {
  uid: null,
};

export default function user(user = initialState, action = {}) {

  switch (action.type) {

    // -------------------------------------------
    case t.USER_IS_AUTHENTICATED:
      return {
        ...user,
        uid: action.user.uid,
        displayName: action.user.displayName,
        providerData: action.user.providerData,
      }

    // -------------------------------------------
    case t.USERS_LINKED:
      console.log('USERS_LINKED',action.user)

      // TMP!!
      // right now isAnon not working quite right
      // hardcoding displayname on auth link
      var isAnon = action.user.providerData.length ? false : true
      return {
        ...user,
        // isAnonymous: action.user.isAnonymous, // tmp
        isAnonymous: isAnon,
        // email: action.user.email,

      }

    // -------------------------------------------
    case t.USER_SIGNED_OUT:
    console.log('signed out user')
      return {
        uid: null,
        isAuthenticated: false,
      }

    case t.SET_USER_DATA:
      return {
        ...user,
        ...action.data,
      }

    // -------------------------------------------
    default:
      return user;
  }
}
