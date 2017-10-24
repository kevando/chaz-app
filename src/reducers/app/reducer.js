import _ from 'lodash';
// var DeviceInfo = require('react-native-device-info');


import {
  SET_NOTIFICATION_PERMISSION,
  INITIALIZE_APP,
  USER_SIGNED_IN,
} from '../actionTypes';

const initialState = {
  isAuthenticated: false,
  uid: null,
  // version: DeviceInfo.getReadableVersion(),
  // deviceName: DeviceInfo.getDeviceName(),
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
    default:
      return app;
  }
}
