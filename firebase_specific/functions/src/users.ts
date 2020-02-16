import * as admin from "firebase-admin"
import UserRecord = admin.auth.UserRecord

const totalUsers: any = []
export async function listAllUsers(nextPageToken: string) {
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
}

export async function getSomeUsers(amount: number) {
    try {
        const listUsersResult = await admin.auth().listUsers(amount)
        const parsedUsers = listUsersResult.users.map(stripUserSensitiveInfo).map(async user => {
            console.log("try read_______________" + user.uid)
            let userProfileSnapshot = await admin
                .database()
                .ref("users/" + user.uid)
                .once("value")

            console.log("end try read_______________" + user.uid)
            return { ...user, userProfileSnapshot }
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
