import * as types from './actionTypes';
import {Map,List} from 'immutable';

const initialState = Map({
  currentStep: 1, // step we are are currently at
  showPopup: false,
  steps: List.of(
    // 0 Not used
    Map({
      label: 'Open the App!'
    }),
    // 1
    Map({
      label: 'Add your first rec',
      condition: function(state){
        return (state.recs.size == 0 ? true : false);
      },
      trigger: 'ADD_REC',
      title: 'Awesome!',
      caption: 'You just saved your first recommendation.', //tagline
      instructions:'chaz helps you figure out which friends give you the best recommendations, so be sure and add the person who recommended this.',
      buttonText: 'I got it',
    }),
    // 2
    Map({
      label: 'Assign your first recomender',
      condition: function(state){
        return (state.recrs.size == 0 ? true : false);
      },
      trigger: 'ADD_RECR',
      title: 'Sweet',
      caption: 'You just gave credit for this recommendation',
      instructions:'Now lets categorize it. Click the paper in the top left to change what type of recommendation this is.',
      buttonText: 'Okay, I got it',
    }),
    // 3
    Map({
      label: 'Save Recs with multiple filters',
      condition: function(state){
        return (state.recs.size > 1 ? true : false);
      },
      trigger: 'ADD_REC',
      title: 'Congrats!',
      caption: 'You just unlocked filters!',
      instructions:'Use the filters at the top of your list to sort by category.',
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
      console.log('I WAS CALLED FROM ONBOARD MIDDLWARE!!')
      return onboard.merge({
        currentStep: onboard.get('currentStep') + 1,
        showPopup: false,
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
