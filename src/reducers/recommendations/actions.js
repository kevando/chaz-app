import {
  SET_TITLE,
  SET_FRIEND,
  SAVE_RECOMMENDATION,
  SET_REMINDER,
} from './actionTypes';

export function setTitle(title) {
  return { type: SET_TITLE, title }
}

export function setFriend(friend) {
  return { type: SET_FRIEND, friend }
}

export function saveRecommendation() {
  return { type: SAVE_RECOMMENDATION }
}

export function setReminder(recId,reminderDate) {
  return { type: SET_REMINDER, recId, reminderDate }
}
