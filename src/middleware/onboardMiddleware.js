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

          // probly dont need full middleware for this, but keeping for now cause im lazy




          switch (action.type) {
            // Check the conditions any time that data is saved to redux

            case 'INIT_ONBOARD': // Properly set the current onboard step
              var state = store.getState();
              var onboard = state.onboard;
              var currentStep = onboard.get('currentStep');
              var stepData = onboard.getIn(['steps',currentStep]);
              var {dataCondition} = stepData.toJS();
              console.log('currentStep',currentStep);
              console.log('dataCondition',dataCondition);
              console.log('init onboard?');
              var steps = onboard.get('steps');
              var currentStep = 0; // tmp
              steps.map(function(step){
                var {dataCondition} = step.toJS();
                if(dataCondition(state)){
                  console.log('iterating thru steps and returned true for step: ',step);
                  store.dispatch({type: 'INCREMENT_CURRENT_STEP'});
                }

              });


            break;

          } // switch

            return next(action);
        }
    }
}
module.exports = onboardMiddleware;
