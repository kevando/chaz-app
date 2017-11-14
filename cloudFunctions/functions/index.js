
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



// -----------------------------------
//  PRODUCTION
ENV = 'production_'
// -----------------------------------

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
