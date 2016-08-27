var onboardMiddleware = function(store){ // formerly middlewareAPI
    return function(next){
        return function(action){

          // HOW THIS WORKS
          //
          // Each redux save, check the current condition function,
          // if it evaluates true, immediately show the pop up
          // this might be bad considering we dont know what action generated the
          // condition to be true
          //
          //  SHOW_ONBOARD_POPUP = true gets triggered in chaz.js

          var state = store.getState();
          var onboard = state.onboard;
          var currentStep = onboard.get('currentStep');
          var stepData = onboard.getIn(['steps',currentStep]);
          var {condition} = stepData.toJS();

          switch (action.type) {
            // Check the conditions any time that data is saved to redux

            case 'CREATE_APP_USER': // Properly set the current onboard step
              var steps = onboard.get('steps');
              var currentStep = 0; // tmp
              steps.map(function(step){
                // console.log('step data in loop',step.toJS())
                var {condition} = step.toJS();
                if(condition(state))
                  store.dispatch({type: 'INCREMENT_CURRENT_STEP'});
              });

            break;

            case 'REDUX_STORAGE_SAVE':
              if(condition(state))
                next({type: 'SHOW_ONBOARD_POPUP',payload:true}); // this will immediately render the popup

            break;

          } // switch

            return next(action);
        }
    }
}
module.exports = onboardMiddleware;
