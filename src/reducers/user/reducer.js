import {
  INITIALIZE_APP,
  USER_SIGNED_IN,
  USER_SIGNED_OUT,
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
    // case INITIALIZE_APP:
    //   return {
    //     ...user,
    //     uid: action.uid
    //   }

    // -------------------------------------------
    case USER_SIGNED_IN:
      // console.log('reducer',action.user)
      return {
        ...user,
        uid: action.user.uid,
        isAnonymous: action.user.isAnonymous,
        email: action.user.email,
        // token: action.user.refreshToken,
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
