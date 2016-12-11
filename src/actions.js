import { NetInfo } from 'react-native';

//tmp?
import Meteor, { Accounts } from 'react-native-meteor';

export const requestPerson = ({ index = 1 }) => {
  return (dispatch, getState) => {
    const { isConnected } = getState();

    dispatch({ type: 'INC_PERSON_INDEX' });
    const url = `https://swapi.co/api/people/${index}?format=json`;
    if (isConnected) {
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          dispatch({ type: 'SAVE_PERSON', person: res });
          dispatch({ type: 'REMOVE_FROM_ACTION_QUEUE', payload: url });
        });
    } else {
      dispatch({ type: 'ADD_TO_ACTION_QUEUE', payload: url });
    }
  };
};

export const requestPersonByUrl = ({ url }) => {
  return (dispatch, getState) => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: 'SAVE_PERSON', person: res });
        dispatch({ type: 'REMOVE_FROM_ACTION_QUEUE', payload: url });
      });
  };
};

export const connectionState = ({ status }) => {
  return { type: 'CHANGE_CONNECTION_STATUS', isConnected: status };
};


// New actions (split this out later)

export const setUserId = ({ uid }) => {
  return { type: 'SET_USER_ID', uid };
};

export const saveRecommendation = ( recommendation ) => {
  return (dispatch, getState) => {


    // dispatch({ type: 'SAVE_RECOMMENDATION', recommendation });

    // This will not run if DDP is disconnected
    console.log('Meteor Status',Meteor.status());
    Meteor.call('addRec',recommendation,function(err,res){
      //res is the rec ID
      // recommendation._id = res; // better way to do this?
      // navigator.replace(Routes.getRecRoute(rec));
      // dismissing the route back to the widgets page
      // navigator.pop();
      // Toast.show('Recommendation Saved', { position: Toast.positions.TOP });
      console.log('Meteor call returned',err);
      console.log('Meteor call returned',res);
    });



  };
};
