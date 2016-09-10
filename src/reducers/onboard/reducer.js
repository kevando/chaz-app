import * as types from './actionTypes';
import {Map,List} from 'immutable';

const initialState = Map({
  currentStep: 0, // step we are are currently at
  showPopup: false,
  steps: List.of(

    // Step 0
    Map({
      label: 'Save a recommendation',
      actionCondition: function(action) {
        if(action.scene)
          return ( (action.type == types.FOCUS && action.scene.name == "recommendationFromAdd") ? true : false);
        else
          return false;
      },
      dataCondition: function(state) {
        return (state.recs.size > 0 ? true : false);
      },
      title: 'Awesome!',
      caption: 'You just saved your first recommendation.', //tagline
      instructions:'chaz helps you understand which friends are giving you the best recommendations. On the next page, add who recommended this.',
      buttonText: 'Okay, I will do that',
    }),

    // Step 1
    Map({
      label: 'Add a friend',
      actionCondition: function(action) {
        return ( (action.type == types.BACK ) ? true : false);
      },
      dataCondition: function(state) {
        return (state.recrs.size > 0 ? true : false);
      },
      title: 'Sweet.',
      caption: 'You just added your first friend to chaz.',
      instructions:'Finally, lets categorize this recommendation. Tap the paper in the top left.',
      buttonText: 'I will do that',
    }),
    // Step 2
    Map({
      label: 'Unlock filters',
      actionCondition: function(action) {
        if(action.scene)
          return ( (action.scene.name == "recommendations" ) ? true : false);
        else
          return false;
      },
      dataCondition: function(state) {
        // console.log('recs size for unlock filters check?',state.recs.size )
        return (state.recs.size > 2 ? true : false);
      },
      title: 'Hey,',
      caption: 'You just unlocked filters!',
      instructions:'chaz works great when you want to do something specific, so now you can filter by category. ',
      buttonText: 'Okay, cool',
    }),
    // Step 3
    Map({
      label: 'Unlock grades',
      actionCondition: function(action) {
        if(action.scene)
          return ( (action.type == types.FOCUS && action.scene.name == "recommendationFromAdd") ? true : false);
        else
          return false;
      },
      dataCondition: function(state) {
        return (state.recs.size > 3 ? true : false);
      },
      title: 'A+',
      caption: 'chaz is the best app to follow up with your friends',
      instructions:'Now you can grade recommendations after you enjoy it.',
      buttonText: 'Okay, okay, I get it',
    }),
    // Step 4
    Map({
      label: 'Grade a recommendation',
      actionCondition: function(action) {
        if(action.scene)
          return ( (action.type == types.FOCUS && action.scene.name == "recommendationFromAdd") ? true : false);
        else
          return false;
      },
      dataCondition: function(state){
        recsWithGrades = 0

        state.recs.map(function(rec){ if(!(typeof rec.get('grade') === "undefined")){recsWithGrades++} } );
        console.log('recsWithGrades',recsWithGrades);
        return (recsWithGrades.size > 0 ? true : false);
        // return true if at least 1 rec has a grade
      },
      title: 'Cool',
      caption: 'You now have a graded recommendation.',
      instructions:'This also means that your friend has a score. Go check it out.',
      buttonText: 'Got it',
    }),
    // Step 5 (removing for this version)
    // Map({
    //   label: 'Start your squad',
    //   actionCondition: function(action) {
    //     return ( (action.type == types.BACK ) ? true : false);
    //   },
    //   dataCondition: function(state) {
    //     return (state.recrs.size > 4 ? true : false);
    //   },
    //   title: 'Heyo',
    //   caption: 'You added so many people.',
    //   instructions:'If you navigate back to your queue, you should see a link to view all your friends in one page',
    //   buttonText: 'Got it',
    // }),


  ),

});

export default function counter(onboard = initialState, action = {}) {

  switch (action.type) {
    case types.INCREMENT_CURRENT_STEP:
      return onboard.merge({
        currentStep: onboard.get('currentStep') + 1,
      });


    default:
      return onboard;
  }
}
