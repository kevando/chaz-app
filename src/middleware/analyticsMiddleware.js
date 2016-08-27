// import GoogleAnalytics from 'react-native-google-analytics-bridge';
// GoogleAnalytics.setTrackerId('UA-74407622-2');

// import Fabric from 'react-native-fabric';
// var { Crashlytics, Answers } = Fabric;


var Mixpanel = require('react-native-mixpanel');
Mixpanel.sharedInstanceWithToken('9b9622cd380a69a91ac1b9b9e1cd6423'); // LOCAL
// Mixpanel.sharedInstanceWithToken('c71b319be23d48d206be21e92fd51f62'); // LIVE

const DeviceInfo = require('react-native-device-info');

var analyticsMiddleware = function(middlewareAPI){

    return function(next){
        return function(action){
          console.log('ANALYTICS MIDDLWARE', action.type);
          // var state = store.getState();
          switch (action.type) {

            // case 'CREATE_APP_USER': // only used for login
            //   Mixpanel.track("Initiated App");
            //   Mixpanel.identify(action.payload.uid);
            //   Mixpanel.set({"$device": action.payload.uid,"$name": action.payload.name});
            //   Mixpanel.registerSuperProperties({"App Version": DeviceInfo.getReadableVersion()});
            //   break;
            //
            // case 'ADD_REC':
            //   Mixpanel.trackWithProperties('Rec Added', { title: action.payload.title });
            //   Mixpanel.increment("Rec Count", 1);
            //   break;
            // case 'UPDATE_REC':
            //   Mixpanel.trackWithProperties('Rec Updated', action.payload);
            //   Mixpanel.increment("Rec Count", 1);
            //   break;
            // case 'DELETE_REC':
            //   Mixpanel.trackWithProperties('Rec Deleted', { title: action.payload.title });
            //   Mixpanel.increment("Rec Count", -1);
            // break;
            //
            // case 'ADD_RECR':
            //   Mixpanel.trackWithProperties('Recr Added', { name: action.payload.name });
            //   Mixpanel.increment("Recr Count", 1);
            // break;

            // case 'SHOW_ONBOARD_POPUP':
            //   Mixpanel.trackWithProperties('Onboard Popup', { step: action.payload });
            // break;
            //

              } // switch

            return next(action);
        }
    }
}
module.exports = analyticsMiddleware
