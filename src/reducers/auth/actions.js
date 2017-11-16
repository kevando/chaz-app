import firebase from 'react-native-firebase';

import * as t from '../actionTypes'

const Auth = firebase.auth()


// --------------------------------
//    SIGN OUT
// --------------------------------

export const signOut = () => dispatch =>
  new Promise((resolve,reject) =>
    Auth.signOut().then(() => {
      dispatch({type: t.USER_SIGNED_OUT})
      dispatch({type: 'PURGE_DATA'}) // resets state to undefined

      // might not be needed but this is fucking annoying
      // removing this fn call since migrating this to own action file
      // dispatch(setToken())
    })
    .catch(error =>  dispatch({type: t.SET_APP_ERROR, error })  )
  )
      
