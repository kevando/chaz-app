
// Can I connect this to redux?

var onboardMiddleware = function(middlewareAPI){

    return function(next){
        return function(action){
          console.log('Onboarding Middleware Action:',action);
          switch (action.type) {

            case 'ADD_REC': // change this to something like check_queue
              console.log('ADD_REC caught in onboard middleware, how can I dispatch increment step from here')
              next({type: 'INCREMENT_CURRENT_STEP'});
               break;

              } // switch

            return next(action);
        }
    }
}
module.exports = onboardMiddleware;
