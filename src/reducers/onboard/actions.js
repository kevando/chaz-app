import * as types from './actionTypes';


export function incrementStep() {
  return {type: types.INCREMENT_STEP};
}

export function incrementCurrentStep() {
  return {type: types.INCREMENT_CURRENT_STEP};
}
