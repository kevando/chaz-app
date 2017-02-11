import {
  SAVE_FRIEND,
} from './actionTypes';

export function saveFriend(friend) {
  return { type: SAVE_FRIEND, friend }
}
