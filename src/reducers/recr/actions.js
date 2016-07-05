import * as types from './actionTypes';

const Firebase = require('firebase'); // v 2.4.1  (i guess v3 doesnt work well w rn)
const fireRef = new Firebase('https://chaz1.firebaseio.com/');


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
          // title: child.val().title,
          _key: child.key(),
          // recr: child.val().recr,
          // grade: child.val().grade,
          // createdAt: child.val().createdAt,
          // recrScore: child.val().recrScore
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
    // going to assume recr does not exist
    const currentState = getState();
    const recrsRef = fireRef.child(`users/${currentState.app.authData.uid}/recrs`);
    console.log('CREATE NEW RECR');
    var newRecr = recrsRef.push({ name: recrName, createdAt: Firebase.ServerValue.TIMESTAMP, });

    // I would like a listener to hear this push, but i dont think thats possible
    // dispatch this new recr and add it to the rec
    dispatch(assignRecr({_key:newRecr.key(),name:recrName}));
  }

}

export function assignRecr(recr) {
  console.log('DUDE',recr);
  // this does three things
  // 1) recr to rec in list, rec to recr
  return(dispatch,getState) => {
    const currentState = getState();
    console.log('assign this recr',recr)
    console.log('to current rec',currentState.rec.current)
    var rec = currentState.rec.current;
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
