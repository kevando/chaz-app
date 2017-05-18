import _ from 'lodash';
var DeviceInfo = require('react-native-device-info');

import Mixpanel from 'react-native-mixpanel';
Mixpanel.sharedInstanceWithToken('976ab99070f5bcf9c9255e282330f0fe');

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

      Mixpanel.identify(DeviceInfo.getUniqueID());
      Mixpanel.set({"$name": DeviceInfo.getDeviceName()});
      Mixpanel.track("Notification Permission Enabled");

      return Object.assign({}, app, {
        notificationPermission: action.response
      })

    // -------------------------------------------
    default:
      return app;
  }
}
