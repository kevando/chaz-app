
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


// -------------------------------------------
let ENV = 'development_'
let DATA_VERSION = 'v1_'
// -------------------------------------------

exports.listenForDevMessages = functions.firestore
  .document(ENV+'messages/{messageId}')
  .onCreate(event => {

    var message = event.data.data();

    return admin.messaging().sendToDevice(message.token, message.payload).then(response => {

      // Save response to message
      return event.data.ref.set({
        response: response
      }, {merge: true});
    });
});
//
// // When a user accepts an invite, go and update all the other recs
// // with that uid in the from field
// exports.invitationAccepted = functions.firestore
//   .document(ENV+DATA_VERSION+'recommendations/{recId}')
//   .onUpdate(event => {
//
//     var newStatus = event.data.data().status;
//     var recType = event.data.data().type;
//
//     // ...or the previous value before this update
//     var oldStatus = event.data.previous.data().status;
//     if(recType == 'invite' && newStatus == 'accepted' && oldStatus != newStatus) {
//       // then we accepted a new chaz invitation!
//
//       // Now find all other recs and update friend id
//       admin.firestore().collection(`${ENV}recommendations`)
//
//     }
//
//     var message = event.data.data();
//
//     return admin.messaging().sendToDevice(message.token, message.payload).then(response => {
//
//       // Save response to message
//       return event.data.ref.set({
//         response: response
//       }, {merge: true});
//     });
// });
