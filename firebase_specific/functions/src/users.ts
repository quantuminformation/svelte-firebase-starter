import * as admin from "firebase-admin"
import UserRecord = admin.auth.UserRecord
import ListUsersResult = admin.auth.ListUsersResult

const totalUsers: any = []
/*export async function listAllUsers(nextPageToken: string) {
    try {
        // List batch of users, 1000 at a time.
        const listUsersResult = await admin.auth().listUsers(1000, nextPageToken)

        totalUsers.push(listUsersResult)
        listUsersResult.users.forEach(function(userRecord) {
            console.log("user", userRecord.toJSON())
        })
        if (listUsersResult.pageToken) {
            // List next batch of users.
            await listAllUsers(listUsersResult.pageToken)
        }
        const parsedUsers = totalUsers.users.map(stripUserSensitiveInfo)

        return parsedUsers
    } catch (error) {
        console.log("Error listing users:", error)
        throw new Error("Error users")
    }
}*/

// thx to
export async function getSomeUsers(amount: number) {
    try {
        /** Cached reference to '/users' in the database. */
        const allUsersRef = admin.database().ref("users")
        /** An array of {uid, displayName} objects for each existing user */
        const strippedUserRecords = await getStrippedUserRecords(amount)
        /** An array of Promises that resolve with a user's username */
        const usernamePromises = strippedUserRecords.map(user => {
            return allUsersRef
                .child(user.uid)
                .child("username")
                .once("value")
                .then<string | null>(extractSnapshotValue)
        })
        // When all the usernames have been fetched, iterate each one and combine them with the relevant user record
        /** An array of filtered user data objects for each existing user */
        const parsedUsers = await Promise.all(usernamePromises).then(usernameArray => {
            // combine each username with the relevant user record
            return usernameArray.map((username, i) => {
                const userRecord = strippedUserRecords[i]
                return { ...userRecord, username }
            })
        })
        return parsedUsers
    } catch (error) {
        console.error("Error listing users:", error)
        throw new Error("Error listing users: " + error) // or just rethrow error?
    }
}
/**
 * Memory-friendly function to retrieve only select fields of a user's UserRecord
 */
const getStrippedUserRecords = async function(amount: number) {
    const response = await admin.auth().listUsers(amount)
    return response.users.map(user => {
        return { uid: user.uid, displayName: user.displayName }
    })
    // original response should be now marked for disposal from memory
}
const extractSnapshotValue = (snapshot: admin.database.DataSnapshot) => snapshot.val()
