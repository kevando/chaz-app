var onboardMiddleware = function(store){ // formerly middlewareAPI
    return function(next){
        return function(action){
          // Dont execute this middleware for the following actions
          if (['REDUX_STORAGE_LOAD','CREATE_APP_USER'].indexOf(action.type) >= 0) { return next(action);  }

          // console.log('check onboard')
          var onboard = store.getState().onboard;
          var stepData = onboard.getIn(['steps',onboard.get('currentStep')]);
          var {trigger,condition} = stepData.toJS();

          switch (action.type) {
            // Check the conditions any time that data is saved to redux

            case trigger: // action saved in onboard. null or undefined might cause a problem
              if(condition(store.getState()))
                next({type: 'SHOW_ONBOARD_POPUP',payload:true}); // this should immediately render the popup
            break;

          } // switch

            return next(action);
        }
    }
}
module.exports = onboardMiddleware;
