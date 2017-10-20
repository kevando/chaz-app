import _ from 'lodash';
// var DeviceInfo = require('react-native-device-info');


import {
  SET_NOTIFICATION_PERMISSION,
  INITIALIZE_APP,
} from './actionTypes';

const initialState = {
  isAuthenticated: false,
  uid: null,
  // version: DeviceInfo.getReadableVersion(),
  // deviceName: DeviceInfo.getDeviceName(),
  notificationPermission: null,
};


export default function recs(app = initialState, action = {}) {

  switch (action.type) {
    // -------------------------------------------
    case INITIALIZE_APP:
      return {
        ...app,
        isAuthenticated: true,
        uid: action.uid
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
