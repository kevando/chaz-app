import {
  INITIALIZE_APP,
  USER_SIGNED_IN,
  USER_SIGNED_OUT,
  CONFIRM_CODE_ERROR,
  USERS_LINKED,
  SET_USER_PHONE
} from '../actionTypes';

const initialState = {
  uid: null,
};

export default function user(user = initialState, action = {}) {

  switch (action.type) {

    // -------------------------------------------
    case USER_SIGNED_IN:

      // TMP!!
      // right now isAnon not working quite right
      // hardcoding displayname on auth link
      var isAnon = action.user.displayName === null ? true : false

      return {
        ...user,
        uid: action.user.uid,
        // isAnonymous: action.user.isAnonymous, // tmp
        isAnonymous: isAnon,
        // email: action.user.email,
        // username: action.user.displayName,
        displayName: action.user.displayName
      }

    // -------------------------------------------
    case USERS_LINKED:
      console.log('USERS_LINKED',action.user)

      // TMP!!
      // right now isAnon not working quite right
      // hardcoding displayname on auth link
      var isAnon = action.user.displayName === null ? true : false
      return {
        ...user,
        // isAnonymous: action.user.isAnonymous, // tmp
        isAnonymous: isAnon,
        // email: action.user.email,

      }

    // -------------------------------------------
    case USER_SIGNED_OUT:
    console.log('signed out user')
      return {
        uid: null,
        isAuthenticated: false,
      }

    case SET_USER_PHONE:
      return {
        ...user,
        phoneNumber: action.phoneNumber,
      }

    // -------------------------------------------
    default:
      return user;
  }
}
