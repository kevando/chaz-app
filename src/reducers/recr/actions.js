import * as types from './actionTypes';

// const Firebase = require('firebase'); // v 2.4.1  (i guess v3 doesnt work well w rn)
// const fireRef = new Firebase('https://chaz1.firebaseio.com/');
// const _ = require('lodash');

export function listenForRecrs() { // called from RecsScreen
  return (dispatch, getState) => {
    const currentState = getState();
    const uid = currentState.app.getIn(["authData","uid"]);
    const recsRef = fireRef.child(`users/${uid}/recrs`);
    recsRef.on('value', (snap) => {
      console.log('listened FOR RECRS');
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

export function addRecr(name,recKey) {
  return(dispatch,getState) => {

    const currentState = getState();
    const uid = currentState.app.getIn(["authData","uid"]);
    const recrsRef = fireRef.child(`users/${uid}/recrs`);

    // Name should have already been validated by this point
    console.log('CREATE NEW RECR');
    var newRecr = recrsRef.push({ name: name, createdAt: Firebase.ServerValue.TIMESTAMP, });
    console.log('newRecr',newRecr)
    if(recKey) {
      // Also assign this new recr to the rec
      // in both the recs and recrs firebase list
      // console.log('now assign recr to recKey',recKey)
      dispatch(assignRecr(recKey,{_key:newRecr.key(),name:name}));
    }



    // OLD Code
    // recrsRef.orderByChild("name").equalTo(recrName).once('value', (snapshot) => {
    //   if(snapshot.exists()){
    //     var recr = snapshot.val();
    //     console.log('EXISTING RECR');
    //     _.findKey(recr, function(recr,recrKey) {
    //       console.log(recrKey); // should only ever return once
    //       dispatch(assignRecr({_key:recrKey,name:recrName}));
    //     });
    //   } else {
    //     console.log('CREATE NEW RECR');
    //     var newRecr = recrsRef.push({ name: recrName, createdAt: Firebase.ServerValue.TIMESTAMP, });
    //
    //     // I would like a listener to hear this push, but i dont think thats possible
    //     // dispatch this new recr and add it to the rec
    //     dispatch(assignRecr({_key:newRecr.key(),name:recrName}));
    //   }
    //
    // });

  }

}
export function removeRecr(recrKey){                  // REMOVE REC
  return function(dispatch, getState) {
    console.log('remove recr',recrKey)
    const currentState = getState();
    const recrsRef = fireRef.child(`users/${currentState.app.authData.uid}/recrs`);
    recrsRef.child(recrKey).remove();
    // todo dispatch upgrade recr score and recs recr score
    // consider if I need to do any other checks
    // I feel like properly structred data would help alot here
  }
}

export function assignRecr(recKey,recr) {
  console.log('recKey',recKey)
  console.log('recr',recr);
  // Firebase bugs out with undefined data, but its probly good to
  // clear recs from recr before assigning it to rec list
  delete recr.recs; // this works even if recs is not there

  return(dispatch,getState) => {
    const currentState = getState();
    const uid = currentState.app.getIn(["authData","uid"]);

    // 1 assign recKey to recr recs list
    const recrRecsRef = fireRef.child(`users/${uid}/recrs/${recr._key}/recs/${recKey}`);
    recrRecsRef.set( {recKey:recKey}); // set entire rec objrect?

    // 2 assign recr to rec
    const recRef = fireRef.child(`users/${uid}/recs/${recKey}`);
    recRef.update({recr: recr });

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
      var recr = snapshot.val();
      recr._key = snapshot.key();
      dispatch(setCurrentRecr(recr ) );
    });
  };
}

export function setCurrentRecr(recr) {                  // SET CURRENT REC
  return { type: types.UPDATE_CURRENT_RECR, recr: recr }
}
