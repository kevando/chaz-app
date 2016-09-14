import * as types from './actionTypes';
import { Map, List } from 'immutable';
import DeviceInfo from 'react-native-device-info';

const initialState = Map({
  signedIn: false,
  initialized: false,
  deviceId: DeviceInfo.getUniqueID(),
  deviceName: DeviceInfo.getDeviceName(),
  appVersion: DeviceInfo.getReadableVersion(),
});

export default function app(state = initialState, action = {}) {

  switch (action.type) {

    case types.APP_INITIALIZED:
      return state.merge({initialized: true})

    case types.CHANGE_SIGN_IN_STATUS:
      return state.merge({signedIn: action.status})

    default:
      return state;
  }
}
