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

export async function getSomeUsers(amount: number) {
    try {
        /**
         * fetch all the users with the provided limit
         */

        const usersFromAdminListUsers: ListUsersResult = await admin.auth().listUsers(amount)
        /**
         * loop through the returned values and create a promise to fetch
         * Each of their document
         */
        const dbUsersPromises = usersFromAdminListUsers.users.map(user => {
            return admin
                .database()
                .ref("users/" + user.uid)
                .once("value")
        })
        /**
         * When all the user documents have been fetched, iterate through them and deduce their values
         */
        const parsedUsers = await Promise.all(dbUsersPromises).then(docSnapshots => {
            return docSnapshots.map(snapshot => {
                /**
                 * The records need to be matched with the original values
                 */
                const userFromAdminList = usersFromAdminListUsers.users.find(
                    u => u.uid === snapshot.key
                )
                const strippedUserFromAdminList = stripUserSensitiveInfo(userFromAdminList)

                console.log("begin______________")

                console.log(snapshot.val())
                console.log(snapshot)
                console.log("end______________")
                console.log("end______________")
                return snapshot.val()
                //return { ...strippedUserFromAdminList, username: snapshot.val().username }
            })
        })
        return parsedUsers
    } catch (error) {
        console.error("Error listing users:", error)
        throw new Error("Error users" + error)
    }
}
/**
 * We 100% don't want to return user emails!!
 */
const stripUserSensitiveInfo = function(user: UserRecord) {
    return { uid: user.uid, displayName: user.displayName }
}
