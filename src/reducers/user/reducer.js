
import * as t from '../actionTypes'

const initialState = {
  uid: null,
  displayName: '',
};

export default function user(user = initialState, action = {}) {
  // console.log(action)
  switch (action.type) {

    // -------------------------------------------
    case t.USER_IS_AUTHENTICATED:
      return {
        ...user,
        uid: action.user.uid,
        displayName: action.user.displayName || 'NO NAME',
        providerData: action.user.providerData,
      }

    // -------------------------------------------
    case t.USERS_LINKED:
      return {
        ...user,
        // isAnonymous: isAnon, // doesnt work w phone auth
        linked: true,
        providerData: action.user.providerData,
        displayName: action.user.displayName,
      }

    // -------------------------------------------
    case t.USER_SIGNED_OUT:
    // console.log('signed out user')
      return {
        uid: null,
        isAuthenticated: false,
      }

    // -------------------------------------------
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
