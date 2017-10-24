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

// 
// exports.createRec = functions.firestore
//   .document('recommendations/{recId}')
//   .onCreate(event => {
//     // Get an object representing the document
//     // e.g. {'name': 'Marie', 'age': 66}
//     var newRec = event.data.data();
//
//     // check if this rec has an attached user
//     console.log(newRec)
//     var myToken = "fQMeVoPava0:APA91bFM34A61IDjC3j_llXtFDYiRVZsS-PtzEWbludjUedY3ksRqP3gc2Mr9lrVWS2qG2uLVXZH8F_Uj2yTvcQS3iwULMp-GQCXf8AlpGkc0gz7VHaQONinB_7ppnP6vwAWADKyw_mn"
//
//     // Notification details.
//     const payload = {
//       notification: {
//         title: 'You have a notif from firebase Cloud!',
//         body: `now following you.`,
//       }
//     };
//
//     admin.messaging().sendToDevice(myToken, payload).then(response => {
//       console.log('response',response)
//       // For each message check if there was an error.
//     });
//
//     // perform desired operations ...
// });
