/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Moving to a messages driven system

exports.createRec = functions.firestore
  .document('messages/{messageId}')
  .onCreate(event => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    var message = event.data.data();

    // check if this rec has an attached user
    console.log(message)

    // Notification details.
    // const payload = {
    //   notification: {
    //     title: message.title,
    //     body: message.body,
    //   }
    // };

    return admin.messaging().sendToDevice(message.token, message.payload).then(response => {
      console.log('response',response)
      // For each message check if there was an error.

      // Was save response to object
      return event.data.ref.set({
        response: response
      }, {merge: true});

    });

    // perform desired operations ...
});
