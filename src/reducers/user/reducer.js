import {
  INITIALIZE_APP,
  USER_SIGNED_IN,
  USER_SIGNED_OUT,
  SET_TOKEN
} from '../actionTypes';

const initialState = {
  uid: null,
  name: 'Default Test Name'
  // deviceId: DeviceInfo.getUniqueID(),
  // deviceName: DeviceInfo.getDeviceName(),
  // appVersion: DeviceInfo.getReadableVersion(),
};

export default function user(user = initialState, action = {}) {

  switch (action.type) {

    // -------------------------------------------
    case SET_TOKEN:
      return {
        ...user,
        token: action.token,
      }

    // -------------------------------------------
    case USER_SIGNED_IN:
      // console.log('USER_SIGNED_IN',action.user)
      return {
        ...user,
        uid: action.user.uid,
        isAnonymous: action.user.isAnonymous,
        email: action.user.email,
        username: action.user.username,
      }

    // -------------------------------------------
    case USER_SIGNED_OUT:
      return {
        ...user,
        uid: null,
        isAnonymous: true,
        email: null,
        // token: action.user.refreshToken,
      }

    default:
      return user;
  }
}
