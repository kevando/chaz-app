// import GoogleAnalytics from 'react-native-google-analytics-bridge';
// GoogleAnalytics.setTrackerId('UA-74407622-2');

// import Fabric from 'react-native-fabric';
// var { Crashlytics, Answers } = Fabric;
import Mixpanel from 'react-native-mixpanel';
import config from '../reducers/config';
Mixpanel.sharedInstanceWithToken(config.mixpanel_token); // based off ENV

var analyticsMiddleware = function(middlewareAPI){

    return function(next){
        return function(action){
          console.log('ANALYTICS MIDDLWARE', action.type);
          // var state = store.getState();
          switch (action.type) {

            case 'CREATE_APP_USER': // only used for login
              Mixpanel.identify(action.payload.uid);
              Mixpanel.set({"$device": action.payload.uid,"$name": action.payload.name});
              Mixpanel.registerSuperProperties({"App Version": action.payload.appVersion});
              Mixpanel.track("Initiated App");
            break;

            case 'ADD_REC':
              Mixpanel.trackWithProperties('Rec Added', { title: action.payload.title });
              Mixpanel.increment("Rec Count", 1);
              break;
            case 'UPDATE_REC':
              Mixpanel.trackWithProperties('Rec Updated', action.payload);
              break;
            case 'DELETE_REC':
              Mixpanel.trackWithProperties('Rec Deleted', { title: action.payload.title });
              Mixpanel.increment("Rec Count", -1);
            break;

            case 'ADD_RECR':
              Mixpanel.trackWithProperties('Recr Added', { name: action.payload.name });
              Mixpanel.increment("Recr Count", 1);
            break;

            case 'SHOW_ONBOARD_POPUP':
              Mixpanel.trackWithProperties('Onboard Popup', { step: action.payload });
            break;


              } // switch

            return next(action);
        }
    }
}
module.exports = analyticsMiddleware
