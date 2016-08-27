import * as types from './actionTypes';
import {Map,List} from 'immutable';

const initialState = Map({
  currentStep: 0, // step we are are currently at
  showPopup: false,
  steps: List.of(
    // 0 Not used
    Map({
      label: 'Open the App!',
      condition: function(state){
        return (true);
      },
      title: 'Welcome!',
      caption: 'Thank you for being part of the beta test', //tagline
      instructions:'Let Kevin know what you think :)',
      buttonText: 'Will do',
    }),
    // 1
    Map({
      label: 'Add your first rec',
      condition: function(state){
        // console.log('recr size',state.recrs.size)
        return (state.recs.size > 0 ? true : false);
      },
      title: 'Awesome!',
      caption: 'You just saved your first recommendation.', //tagline
      instructions:'chaz also helps you understand which friends give you the best recommendations, so include who recommended this.',
      buttonText: 'I got it',
    }),
    // 2
    Map({
      label: 'Assign your first recomender',
      condition: function(state){
        // console.log('recr size',state.recs.size)
        return (state.recrs.size > 0 ? true : false);
      },
      title: 'Sweet',
      caption: 'You just gave credit for this recommendation',
      instructions:'Now lets categorize it. Click the paper in the top left to change what type of recommendation this is.',
      buttonText: 'Okay, I got it',
    }),
    // 3
    Map({
      label: 'Save Recs with multiple filters',
      condition: function(state){
        // console.log('rec size',state.recs.size)
        return (state.recs.size > 5 ? true : false);
      },
      title: 'Congrats!',
      caption: 'You just unlocked filters!',
      instructions:'You saved enough recommendations where it makes sense to filter them.',
      buttonText: 'Okay, I got it',
    }),
    // 4
    Map({
      label: 'Grade a Recommendation',
      condition: function(state){
        return (false);
      },
      trigger: 'GRADE_REC',
      // title: 'Congrats!',
      // caption: 'You just unlocked filters!',
      // instructions:'Use the filters at the top of your list to sort by category.',
      // buttonText: 'Okay, I got it',
    }),

  ),


  // rec type, recr

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
      return onboard.merge({
        currentStep: onboard.get('currentStep') + 1,
        showPopup: false, // probly not needed
      });
      case types.SET_STEP:
        return onboard.merge({
          currentStep: action.payload,
        });
      case types.SHOW_ONBOARD_POPUP: // only dispatched in app.js
        console.log('show pop up')
        return onboard.merge({
          showPopup: action.payload
        });

    default:
      return onboard;
  }
}
