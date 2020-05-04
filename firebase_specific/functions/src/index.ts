import * as functions from "firebase-functions"

import * as admin from "firebase-admin"
import { getSomeUsers } from "./users"

admin.initializeApp()

export const listUsers = functions.https.onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*")
    const data = await getSomeUsers(10)
    res.json(data)
})
