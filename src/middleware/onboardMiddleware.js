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
          console.log('currentStep',currentStep);
          console.log('condition',condition);

          switch (action.type) {
            // Check the conditions any time that data is saved to redux

            case 'INIT_ONBOARD': // Properly set the current onboard step
              console.log('init onboard?');
              var steps = onboard.get('steps');
              var currentStep = 0; // tmp
              steps.map(function(step){
                var {condition} = step.toJS();
                if(condition(state)){
                  console.log('iterating thru steps and returned true for step: ',step);
                  store.dispatch({type: 'INCREMENT_CURRENT_STEP'});
                }

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
