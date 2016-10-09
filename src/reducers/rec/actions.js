import * as types from './actionTypes';
import uuid from 'react-native-uuid';
import ddpClient from '../../ddp';



export function addRec(title,note,uid) {
  const rec = {
    _id: uuid.v1(),
    title: title,
    note: note,
    created_at: Date.now(),
    uid: uid
  }
  return function(dispatch, getState) {
    dispatch(addRecOptimistic(rec));
    ddpClient.call('addRec', [rec], (err, res) => {
      if(err) alert('woah');
      console.log('added rec in meteor. possibly do some sort of optimistic return here')
      console.log(res)
      console.log(err)
    });
  }
}

function addRecOptimistic(rec) {
  return {
    type: types.ADD_REC,
    payload: rec
  };
}

export function setRecs(recs) {
  return {
    type: 'SET_RECS',
    payload: recs,
  };
}

export function updateRec(rec) {
  console.log('updateRec',rec)

  return function(dispatch, getState) {
    dispatch(updateRecOptimistic(rec));

    ddpClient.call('updateRec', [rec], (err, res) => {
      console.log('updasted rec in meteor. possibly do some sort of optimistic return here')
    });
  }
}

export function updateRecOptimistic(rec) {
  return {
    type: types.UPDATE_REC,
    payload: rec
  };
}

export function gradeRec(rec) {
  delete rec.recr; // STOP SENDNG FUCKING RECR
  return {
    type: types.GRADE_REC,
    payload: rec
  };
}


export function deleteRec(rec) {

  return function(dispatch, getState) {
    dispatch(deleteRecOptimistic(rec._id));

    ddpClient.call('deleteRec', [rec], (err, res) => {
      console.log('deleted rec in meteor. possibly do some sort of optimistic return here')
    });
  }
}

export function deleteRecOptimistic(recKey){
  return {
    type: types.DELETE_REC,
    payload: recKey
  }
}

// Replacing this with simply the recr_id
// export function assignRecr(rec,recr){
//   // console.log('assign rec',rec)
//   // console.log('assign recr',recr)
//   rec.recr = recr.toJS(); // simply add recr
//   return {
//     type: types.UPDATE_REC, // I can do this cause im not editing recr tree yet
//     payload: rec
//   }
// }


// export function setGrade(rec, grade) {                  // ADD NEW REC
//   return function(dispatch, getState) {
//     const currentState = getState();
//     const recsRef = fireRef.child(`users/${currentState.app.authData.uid}/recs`);
//     const recrRecrRef = fireRef.child(`users/${currentState.app.authData.uid}/recrs/${rec.recr._key}/recs`);
//
//     recsRef.child(rec._key).update({grade:grade});
//     // if recs get deleted or recr changed, the score will be wrong until the next update
//     dispatch(updateRecrScore(rec.recr._key))
//   }
// }
// export function updateRecrScore(recrKey) {
//   return function(dispatch, getState) {
//     const currentState = getState();
//     const recrRef = fireRef.child(`users/${currentState.app.authData.uid}/recrs/${recrKey}`);
//     var score = 666; // never used
//     var totalGradedRecs = 0;
//     var recGradeSum = 0;
//     // calculate score (this needs to become its own function. this us a huge part of the app)
//
//     recrRef.child('recs').once("value", function(snapshot) {
//       snapshot.forEach(function(childSnapshot) {
//         var rec = childSnapshot.val();
//         if(typeof rec.grade !== 'undefined'){
//           totalGradedRecs++;
//           recGradeSum += rec.grade;
//         }
//       });
//       console.log('1 recGradeSum',recGradeSum);
//       console.log('1 totalGradedRecs',totalGradedRecs);
//       if(totalGradedRecs > 0)
//         score = (recGradeSum/totalGradedRecs)*20;
//       else
//         score = 'No Score';
//
//       console.log('score',score)
//       recrRef.update({score: score});
//       dispatch(updateRecRecrScore(recrKey,score));
//     });
//   }
// }
// adding recr score to all recs. this is where that gets updateDisplayRecsList
// it gets dispatched after a new recr score is created
// export function updateRecRecrScore(recrKey, score) {
//   return function(dispatch, getState) {
//     console.log('updateRecRecrScore');
//     const currentState = getState();
//     const recsRef = fireRef.child(`users/${currentState.app.authData.uid}/recs`);
//     recsRef.once("value", function(snapshot) {
//
//       snapshot.forEach(function(childSnapshot) {
//
//         var rec = childSnapshot.val();
//         // this code is shit, but whatever.
//         if(rec.recr){ // shit bugs out when there is no recr
//           if(rec.recr._key == recrKey){
//             console.log('score',score)
//             var recRef = recsRef.child(childSnapshot.key())
//             recRef.update({recrScore: score})
//           }
//         }
//
//       });
//     });
//   }
//
// }
//
//
// //
// // Display functions
// //
// export function setCurrentRec(rec) {                  // SET CURRENT REC
//   return { type: types.UPDATE_CURRENT_REC, rec: rec }
// }
