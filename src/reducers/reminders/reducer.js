import * as t from '../actionTypes';

const initialState = {
  localReminders: [],
  remoteNotifications: [],
  newRemoteNotifications: [],
};

export default function reminders(reminders = initialState, action = {}) {

  switch (action.type) {

    // ==========================================
    case t.PUSH_LOCAL_REMINDERS:
      return {
        ...reminders,
        localReminders: action.localReminders
      }
    // ==========================================
    case t.ADD_REMOTE_REMINDER:
      return {
        ...reminders,
        remoteNotifications: reminders.remoteNotifications.concat([action.notification]),
        newRemoteNotifications: reminders.newRemoteNotifications.concat([action.notification]),
      }
    // ==========================================
    case t.CLEAR_NEW_REMOTE_NOTIFICATIONS:
      return {
        ...reminders,
        newRemoteNotifications: [],
      }
    // ==========================================

    default:
      return reminders;
  }
}
