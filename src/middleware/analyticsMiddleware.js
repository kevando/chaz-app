// import GoogleAnalytics from 'react-native-google-analytics-bridge';
// GoogleAnalytics.setTrackerId('UA-74407622-2');

// import Fabric from 'react-native-fabric';
// var { Crashlytics, Answers } = Fabric;

//Require the module
var Mixpanel = require('react-native-mixpanel');

//Init Mixpanel SDK with your project token
Mixpanel.sharedInstanceWithToken('9b9622cd380a69a91ac1b9b9e1cd6423');

var analyticsMiddleware = function(middlewareAPI){

    return function(next){
        return function(action){
          switch (action.type) {

            case 'USER_LOGIN': // only used for login
              Mixpanel.track("Logged in");
              Mixpanel.identify(action.authData.uid);
              Mixpanel.set({"$device": action.authData.uid});

            case 'TRACK_REC_ADDED':
              Mixpanel.trackWithProperties('Rec Added', {title: action.payload.recTitle, type: action.payload.recType,recsTotal:action.payload.recsTotal});
              Mixpanel.set({"Total Recs" : action.payload.recsTotal });

            case 'TRACK_REC_DELETED':
               Mixpanel.track('Rec Deleted');

              } // switch

            return next(action);
        }
    }
}
module.exports = analyticsMiddleware
