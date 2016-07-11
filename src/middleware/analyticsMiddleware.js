import GoogleAnalytics from 'react-native-google-analytics-bridge';
GoogleAnalytics.setTrackerId('UA-74407622-2');


var analyticsMiddleware = function(middlewareAPI){

    return function(next){
        return function(action){
          console.log('ANALYTICS',action);
          if(action.track){ // only run this if action has track object
              console.log('Middleware Logging action',action);
              switch (action.type) {

                case 'SET_USER':
                  console.log('authDAta',action.track.authData)
                  GoogleAnalytics.setUser(action.track.authData.uid);

                case 'TRACK_EVENT':
                  console.log('track',action.track);
                  GoogleAnalytics.trackEvent(action.track.category, action.track.action, action.track.values);

              } // switch
          }

            return next(action);
        }
    }
}
module.exports = analyticsMiddleware
