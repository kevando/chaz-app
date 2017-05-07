import {
  SET_TITLE,
  SET_FRIEND,
  SAVE_RECOMMENDATION,
  SET_REMINDER,
  DELETE_RECOMMENDATION,
  SET_STATUS,
  SET_FILTER,
  SET_GRADE,
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

export function deleteRecommendation(recId) {
  return { type: DELETE_RECOMMENDATION, recId }
}

export function setStatus(recId,status) {
  return { type: SET_STATUS, recId, status }
}

export function setFilter(filter) {
  return { type: SET_FILTER, filter }
}

export function setGrade(recId,grade) {
  return { type: SET_GRADE, recId, grade }
}
