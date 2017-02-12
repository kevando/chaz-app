import _ from 'lodash';
var DeviceInfo = require('react-native-device-info');

import {
  SET_NOTIFICATION_PERMISSION,
} from './actionTypes';

const initialState = {
  version: DeviceInfo.getReadableVersion(),
  deviceName: DeviceInfo.getDeviceName(),
  notificationPermission: null,
};


export default function recs(app = initialState, action = {}) {

  switch (action.type) {

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
