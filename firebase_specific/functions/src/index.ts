import * as functions from "firebase-functions"

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

import * as admin from "firebase-admin"
import { DataSnapshot } from "firebase-functions/lib/providers/database"
import { getSomeUsers } from "./users"

admin.initializeApp()

export const addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    const snapshot = await admin
        .database()
        .ref("/messages")
        .push({ original: original })
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref.toString())
})

export const makeUppercase = functions.database
    .ref("/messages/{pushId}/original")
    .onCreate((snapshot: DataSnapshot, context) => {
        // Grab the current value of what was written to the Realtime Database.
        const original = snapshot.val()
        console.log("Uppercasing", context.params.pushId, original)
        const uppercase = original.toUpperCase()
        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to the Firebase Realtime Database.
        // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
        return snapshot.ref.parent.child("uppercase").set(uppercase)
    })

export const createUserCustomDataRow = functions.auth.user().onCreate(async user => {
    const snapshot = await admin
        .database()
        .ref("/usersCustomData")
        .push({ uid: user.uid })
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    console.log(snapshot)
})

export const listUsers = functions.https.onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*")
    const data = await getSomeUsers(10)
    //res.end('Retrieved users list successfully.' + data);
    res.json(data)
})
