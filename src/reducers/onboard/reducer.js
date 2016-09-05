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
      label: 'Save a recommendation',
      condition: function(state){
        return (state.recs.size > 0 ? true : false);
      },
      title: 'Awesome!',
      caption: 'You just saved your first recommendation.', //tagline
      instructions:'chaz helps you understand which friends are giving you the best recommendations. On the next page, add who recommended this.',
      buttonText: 'I got it',
    }),
    // 2
    Map({
      label: 'Add a friend',
      condition: function(state){
        return (state.recrs.size > 0 ? true : false);
      },
      title: 'Sweet.',
      caption: 'You just added your first friend to chaz.',
      instructions:'Finally, lets categorize this recommendation. Tap the paper in the top left.',
      buttonText: 'I will do that',
    }),
    // 3
    Map({
      label: 'Unlock filters',
      condition: function(state){
        return (state.recs.size > 2 ? true : false);
      },
      title: 'Hey,',
      caption: 'You just unlocked filters!',
      instructions:'chaz works great when you want to do something specific, so now you can filter by category. ',
      buttonText: 'Okay, cool',
    }),
    // 4
    Map({
      label: 'Save 4 recommendations',
      condition: function(state){
        return (state.recs.size > 3 ? true : false);
      },
      title: 'A+',
      caption: 'chaz is the best app to follow up with your friends',
      instructions:'Now you can grade recommendations after you enjoy it.',
      buttonText: 'Okay, okay, I get it',
    }),
    // 5
    Map({
      label: 'Grade a recommendation',
      condition: function(state){
        var hasGrade = state.recs.map((rec) => rec.get('grade') != undefined );
        console.log('hasGrade',hasGrade);
        return (hasGrade.size > 0 ? true : false);
        // return true if at least 1 rec has a grade
      },
      title: 'Cool',
      caption: 'You now have a graded recommendation.',
      instructions:'This also means that your friend has a score. Go check it out.',
      buttonText: 'Got it',
    }),
    // 6
    Map({
      label: 'Start your squad',
      condition: function(state){
        return (state.recrs.size > 4 ? true : false);
      },
      title: 'Heyo',
      caption: 'You added so many people.',
      instructions:'If you navigate back to your queue, you should see a link to view all your friends in one page',
      buttonText: 'Got it',
    }),
    // 7
    Map({
      label: 'Start chatting',
      condition: function(state){
        return (false);
      },
    }),

  ),

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
