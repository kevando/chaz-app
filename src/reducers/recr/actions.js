import * as types from './actionTypes';

const Firebase = require('firebase'); // v 2.4.1  (i guess v3 doesnt work well w rn)
const fireRef = new Firebase('https://chaz1.firebaseio.com/');
const _ = require('lodash');

export function listenForRecrs() {
  return (dispatch, getState) => {
    const currentState = getState();
    const recsRef = fireRef.child(`users/${currentState.app.authData.uid}/recrs`);
    recsRef.on('value', (snap) => {
      console.log('listen FOR RECRS')
        dispatch(getRecrList(snap));
    });
  }
}
export function getRecrList(snap) { // runs after basically any change to any rec
  return (dispatch, getState) => {

      var items = [];
      snap.forEach((child) => {
        items.push({
          name: child.val().name,
          _key: child.key(),
          recs: child.val().recs,
        });
      });
        // console.log('items',items);
      dispatch(updateRecrList(items)); // reducer call
  }
}
export function updateRecrList(recrs) {
  return { type: types.UPDATE_RECR_LIST,payload: recrs }
}

export function createRecr(recrName) {
  return(dispatch,getState) => {

    const currentState = getState();
    const recrsRef = fireRef.child(`users/${currentState.app.authData.uid}/recrs`);
    // FIRST CHECK if recr exists
    recrsRef.orderByChild("name").equalTo(recrName).once('value', (snapshot) => {
      if(snapshot.exists()){
        var recr = snapshot.val();
        console.log('EXISTING RECR');
        _.findKey(recr, function(recr,recrKey) {
          console.log(recrKey); // should only ever return once
          dispatch(assignRecr({_key:recrKey,name:recrName}));
        });
      } else {
        console.log('CREATE NEW RECR');
        var newRecr = recrsRef.push({ name: recrName, createdAt: Firebase.ServerValue.TIMESTAMP, });

        // I would like a listener to hear this push, but i dont think thats possible
        // dispatch this new recr and add it to the rec
        dispatch(assignRecr({_key:newRecr.key(),name:recrName}));
      }

    });

  }

}

export function assignRecr(recr) {
  // console.log('DUDE',recr);
  // this does three things
  // 1) recr to rec in list, rec to recr
  return(dispatch,getState) => {
    const currentState = getState();
    var rec = currentState.rec.current;
    // before doing anything, remove any rec from previous recr (if so)
    if(currentState.rec.current.recr){
      console.log('then we gotta clear an old recr')
      const prevRecrRecsRef = fireRef.child(`users/${currentState.app.authData.uid}/recrs/${currentState.rec.current.recr._key}/recs/${rec._key}`);
      prevRecrRecsRef.remove();
    }

    const recrRecsRef = fireRef.child(`users/${currentState.app.authData.uid}/recrs/${recr._key}/recs/${rec._key}`);
    const recRef = fireRef.child(`users/${currentState.app.authData.uid}/recs/${rec._key}`);



    // 1 Assign Recr to rec in list (fires listener that also updates current rec display)
    recRef.update({recr: {name: recr.name, _key:recr._key } });
    // 2 add the rec to the recrs reclist
    recrRecsRef.set( {title: rec.title,_key:rec._key});
  }

}

export function listenForNewRecrs() {
  return (dispatch, getState) => {
    const currentState = getState();
    const recsRef = fireRef.child(`users/${currentState.app.authData.uid}/recrs`);
    recsRef.on('child_added', (snap) => {
      console.log('Listener hear a new RECR!!!! now assign this rer to the current rec',snap);
        // dispatch(getRecrList(snap));
    });
  }
}

export function setCurrentRecrByKey(recrKey) {                  // SET CURRENT REC
  return(dispatch,getState) => {
    const currentState = getState();
    const recrRef = fireRef.child(`users/${currentState.app.authData.uid}/recrs/${recrKey}`);
    recrRef.once('value', (snapshot) => {
      dispatch(setCurrentRecr(snapshot.val() ) );
    });
  };
}

export function setCurrentRecr(recr) {                  // SET CURRENT REC
  return { type: types.UPDATE_CURRENT_RECR, recr: recr }
}
