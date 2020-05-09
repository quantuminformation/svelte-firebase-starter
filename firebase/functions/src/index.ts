import * as functions from "firebase-functions"

import * as admin from "firebase-admin"
import { getSomeUsers } from "./users"

admin.initializeApp()

export const listUsers = functions.https.onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*")
    const data = await getSomeUsers(10)
    res.json(data)
})

export const upsertUsername = functions.https.onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*")
    const { username, uid } = req.body
    try {
        await admin.database().ref(`usernames/${username}`).set({ uid: uid })
    } catch (e) {
        console.log(e.message)
    }
})
