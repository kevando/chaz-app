import * as types from './actionTypes';
import {Map,List} from 'immutable';

const initialState = Map({
  step: 0,
  currentStep: 0,
  queue: '',
  steps: List.of(
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

export default function counter(onboard = initialState, action = {}) {

  switch (action.type) {
    case types.INCREMENT_CURRENT_STEP:
      console.log('I WAS CALLED FROM ONBOARD MIDDLWARE!!')
      return onboard.merge({
        currentStep: onboard.get('currentStep') + 1
      });
      case types.INCREMENT_STEP: // only dispatched in app.js

        return onboard.merge({
          step: onboard.get('step') + 1
        });

      case types.SET_QUEUE: // preps app for next onboarding step
        return onboard.merge({
          queue: action.payload
        });

    default:
      return onboard;
  }
}
