import * as firebaseActions from '../reducers/firebase/actions';

const firebaseSyncMiddleware = store => next => action => {

  // Only certain actions are white listed to save to storage
  if (action.type === 'REDUX_STORAGE_SAVE') {
    store.dispatch(firebaseActions.syncFirebase());
  }

  // next() passes an action to the next middleware, or to the reducer if
  // console.log('go to next action')
  next(action);
};

module.exports = firebaseSyncMiddleware;
