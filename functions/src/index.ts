import * as functions from "firebase-functions"

const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors({ origin: true }))

import * as admin from "firebase-admin"
import { getSomeUsers } from "./users"

admin.initializeApp()

app.post("/", async (req, res) => {
    const { username, uid } = req.body
    try {
        await admin.database().ref(`usernames/${username}`).set({ uid: uid })
        res.send("operation save username complete")
    } catch (e) {
        console.log(e.message)
    }
})

export const upsertUsername = functions.https.onRequest(app)


//todo figure out the best way to have multiple firebase functions (multiple express apps?)
export const listUsers = functions.https.onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*")
    const data = await getSomeUsers(10)
    res.json(data)
})
