import {
  INITIALIZE_APP,
  USER_SIGNED_IN,
  USER_SIGNED_OUT,
  // SET_TOKEN,
  // USER_CREATED,
  // SIGN_IN_CONFIRM_RESULT,
  // SIGN_IN_ERROR,
  // SIGN_IN_ATTEMPT,
  // CONFIRM_CODE_SUCCESS,
  CONFIRM_CODE_ERROR,
  USERS_LINKED
} from '../actionTypes';

const initialState = {
  uid: null,
  // name: 'Default Test Name'
  // deviceId: DeviceInfo.getUniqueID(),
  // deviceName: DeviceInfo.getDeviceName(),
  // appVersion: DeviceInfo.getReadableVersion(),
};

export default function user(user = initialState, action = {}) {

  switch (action.type) {

    // -------------------------------------------
    case USER_SIGNED_IN:
      // console.log('USER_SIGNED_IN',action.user)
      // console.log('USER_SIGNED_IN',action.user.uid)
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
      // console.log('USER_SIGNED_IN',action.user.email)
      return {
        ...user,
        // uid: action.user.uid,
        isAnonymous: action.user.isAnonymous,
        email: action.user.email,
        // username: action.user.username,
        // displayName: action.user.displayName
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
