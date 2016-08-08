import * as types from './actionTypes';
import * as Immutable from 'immutable';

const initialState = Immutable.Map({
  step: 0,
  currentStep: 0,
  steps: Immutable.List.of(
    // 0 Not used
    {title: 'I should never be seen'},
    // 1
    {
      title: 'Welcome to chaz',
      caption: 'The best way to save recommendations.', //tagline
      instructions:'Lets get started by adding a rec. click the blue button below',
      buttonText: 'Lets get started',
      buttonColor:0,
      backgroundColor: "rgba(50, 50, 50, 0.8)"
    },
    // 2
    {
      title: 'Awesome!',
      caption: 'Lets start out by adding my favorite movie',
      instructions:'Enter Shawshank Redemption in the next screen',
      buttonText: 'Okay, got it',
      buttonColor:1,
      backgroundColor: "rgba(100, 100, 100, 0.8)"
    },
    // 3
    {
      title: 'Great Job!',
      caption: 'You just saved your first recommendation! Now lets mark who its from',
      instructions:'Click the button',
      buttonText: 'Okay, Okay I got it',
      buttonColor:2,
      backgroundColor: "rgba(100, 100, 100, 0.8)"
    },

  )

  // possibly pre-fill some of the inputs. figure out how to do note. "stephen king"
  // should each step include its action to proceed?

  // user types in my name, clicks save
  // 4 Great! I will show up on this screen in the future
  // user clicks back
  // 5 Whoops! Looks like we accidentally added shawshank to the random category, lets fix that
  // user edits recType
  //


});

export default function counter(state = initialState, action = {}) {

  switch (action.type) {
    case types.INCREMENT_CURRENT_STEP:
      return state.merge({
        currentStep: state.get('currentStep') + 1
      });
      case types.INCREMENT_STEP: // only dispatched in app.js
        return state.merge({
          step: state.get('step') + 1
        });
    default:
      return state;
  }
}
