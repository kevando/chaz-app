import * as types from './actionTypes';
import {Map,List} from 'immutable';

const initialState = Map({
  step: 1666, // Step we should be at
  currentStep: 1, // step we are are currently at
  queue: '',
  showPopup: false,
  steps: List.of(
    // 0 Not used
    {title: 'I should never be seen'},
    // 1
    {
      condition: function(state){
        console.log('I AM A PASSED CONDTION FUNCTION',state);
        return (state.recs.size == 0 ? true : false);
      },
      trigger: 'ADD_REC',
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
      case types.SHOW_ONBOARD_POPUP: // only dispatched in app.js
        console.log('show pop up')
        return onboard.merge({
          showPopup: action.payload
        });

      case types.SET_ACTION_QUEUE: // preps app for next onboarding step
        return onboard.merge({
          queue: action.payload
        });

    default:
      return onboard;
  }
}
