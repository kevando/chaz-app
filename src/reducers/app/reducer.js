import * as types from './actionTypes';
import { Map, List } from 'immutable';

import DeviceInfo from 'react-native-device-info';

// const initialState = Map({
//   user: {},
//   activeFilter: 'all',
//   filters: List(['all','movie','tv','podcast','book','music','food','place','other']),
//   signedIn: false, // new meteor
// });
const initialState = Map({

  signedIn: false, // new meteor
  deviceId: DeviceInfo.getUniqueID(),
  deviceName: DeviceInfo.getDeviceName(),
  appVersion: DeviceInfo.getReadableVersion(),
});

export default function app(state = initialState, action = {}) {

  switch (action.type) {


    case types.SET_FILTER: // remove filters from app
      return state.merge({
        activeFilter: action.payload
      });

    // new meteor
    case types.CHANGE_SIGN_IN_STATUS:
    // console.log('state',state); // doesnt work with the other app objects
      return state.merge({signedIn: action.status})
      // return Object.assign({}, state, { signedIn: action.status });

    default:
      return state;
  }
}
