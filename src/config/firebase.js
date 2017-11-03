import firebase from 'react-native-firebase'
import _ from 'lodash'
import * as t from '../reducers/actionTypes'


const env = process.env.NODE_ENV;

export const recsRef = firebase.firestore().collection(`${env}_recommendations`)
export const friendsRef = firebase.firestore().collection(`${env}_friends`)
export const usersRef = firebase.firestore().collection(`${env}_users`)


// Firestore Listener (called on appInitialized)
export function addFirestoreListeners(uid) {
  return (dispatch, getState) => {
    console.log(getState().app)
    let myFriends = getState().friends // this might be empty
    // console.log('myFriends',myFriends)

    // MY FRIENDS
    friendsRef.where("owner", "==", uid)
    // or recs that ive given
      .onSnapshot(function(querySnapshot) {
          myFriends = []
          // console.log('friend listner fired!')
          querySnapshot.forEach(function(doc) {
              // console.log('PUSH FRIEND',doc.data())
              myFriends.push({...doc.data(),id: doc.id});
          });
          dispatch({type: t.REFRESH_FRIENDS, myFriends})
      });


    // MY RECS
    recsRef.where("to", "==", uid)
      .onSnapshot(querySnapshot => {
          var myRecs = []
          querySnapshot.forEach(doc => {
              myRecs.push({...doc.data(),id: doc.id});
              // console.log('myFriends in rec listener, could be from state or listener',myFriends)
          })
          const myRecsWithFriendData =  _.map(myRecs, rec => {return {...rec,friend: _.find(myFriends,friend => friend.id === rec.friendId) || {} } })
          dispatch({type: t.REFRESH_MY_RECS, myRecs: myRecsWithFriendData})
      })

      // GIVEN RECS
      recsRef.where("from", "==", uid)
        .onSnapshot(querySnapshot => {
            var givenRecs = [];
            querySnapshot.forEach(doc => {
                givenRecs.push({...doc.data(),id: doc.id});
            })
            // TODO join w friend data
            dispatch({type: t.REFRESH_GIVEN_RECS, givenRecs})
        });


      }
}
