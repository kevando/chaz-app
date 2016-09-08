import * as types from './actionTypes';
var uuid = require('react-native-uuid');

export function addRecr(name) {
  return {
    type: types.ADD_RECR,
    payload: {
      id: uuid.v1(),
      name: name,
      created_at: Date.now(),
      stats: {},
    }
  };
}

export function updateRecrStats(rec) {

  var recr_id = rec.recr_id;

  return function(dispatch, getState) {
    var recs = getState().recs;
    var score = 0;
    var totalRecs = 0;
    var totalGradedRecs = 0;
    var totalGrade = 0;
    recs.map(function(rec){ // could consolidate this better
        if(rec.get('recr_id') == recr_id) {
          totalRecs++;
          if(rec.get('grade') != undefined){
              totalGradedRecs++;
              totalGrade += rec.get('grade');
          }
        }
    });
    // score = Math.round((totalGradedRecs/totalGrade)*200);
    score = (totalGrade/(totalGradedRecs*5))*100;
    dispatch({
      type: types.UPDATE_RECR_STATS,
      payload: {
        id: recr_id,
        stats: {
          score: score,
          totalRecs: totalRecs,
          totalGrade: totalGrade,
          totalGradedRecs: totalGradedRecs,
        }

      }
    });
  }
}



//
// export function removeRecr(recrKey){                  // REMOVE REC
//   return function(dispatch, getState) {
//     console.log('remove recr',recrKey)
//     const currentState = getState();
//     const recrsRef = fireRef.child(`users/${currentState.app.authData.uid}/recrs`);
//     recrsRef.child(recrKey).remove();
//     // todo dispatch upgrade recr score and recs recr score
//     // consider if I need to do any other checks
//     // I feel like properly structred data would help alot here
//   }
// }

// export function assignRecr(recKey,recr) {
//   console.log('recKey',recKey)
//   console.log('recr',recr);
//   // Firebase bugs out with undefined data, but its probly good to
//   // clear recs from recr before assigning it to rec list
//   delete recr.recs; // this works even if recs is not there
//
//   return(dispatch,getState) => {
//     const currentState = getState();
//     const uid = currentState.app.getIn(["authData","uid"]);
//
//     // 1 assign recKey to recr recs list
//     const recrRecsRef = fireRef.child(`users/${uid}/recrs/${recr._key}/recs/${recKey}`);
//     recrRecsRef.set( {recKey:recKey}); // set entire rec objrect?
//
//     // 2 assign recr to rec
//     const recRef = fireRef.child(`users/${uid}/recs/${recKey}`);
//     recRef.update({recr: recr });
//
//   }
//
// }

// export function listenForNewRecrs() {
//   return (dispatch, getState) => {
//     const currentState = getState();
//     const recsRef = fireRef.child(`users/${currentState.app.authData.uid}/recrs`);
//     recsRef.on('child_added', (snap) => {
//       console.log('Listener hear a new RECR!!!! now assign this rer to the current rec',snap);
//         // dispatch(getRecrList(snap));
//     });
//   }
// }
//
// export function setCurrentRecrByKey(recrKey) {                  // SET CURRENT REC
//   return(dispatch,getState) => {
//     const currentState = getState();
//     const recrRef = fireRef.child(`users/${currentState.app.authData.uid}/recrs/${recrKey}`);
//     recrRef.once('value', (snapshot) => {
//       var recr = snapshot.val();
//       recr._key = snapshot.key();
//       dispatch(setCurrentRecr(recr ) );
//     });
//   };
// }
//
// export function setCurrentRecr(recr) {                  // SET CURRENT REC
//   return { type: types.UPDATE_CURRENT_RECR, recr: recr }
// }
