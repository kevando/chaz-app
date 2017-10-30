import {
  INITIALIZE_APP,
  USER_SIGNED_IN,
  USER_SIGNED_OUT,
  CONFIRM_CODE_ERROR,
  USERS_LINKED
} from '../actionTypes';

const initialState = {
  uid: null,
};

export default function user(user = initialState, action = {}) {

  switch (action.type) {

    // -------------------------------------------
    case USER_SIGNED_IN:
      // console.log('USER_SIGNED_IN',action.user)
      return {
        ...user,
        uid: action.user.uid,
        isAnonymous: action.user.isAnonymous,
        // email: action.user.email,
        // username: action.user.displayName,
        // displayName: action.user.displayName
      }

    // -------------------------------------------
    case USERS_LINKED:
      console.log('USERS_LINKED',action.user)
      return {
        ...user,
        isAnonymous: action.user.isAnonymous,
        email: action.user.email,
        
      }

    // -------------------------------------------
    case USER_SIGNED_OUT:
    console.log('signed out user')
      return {
        uid: null,
        isAuthenticated: false,
      }

    // -------------------------------------------
    default:
      return user;
  }
}
