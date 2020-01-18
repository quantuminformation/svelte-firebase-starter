import * as admin from "firebase-admin"

export async function listAllUsers(nextPageToken: string) {
    let totalUsers = []
    try {
        // List batch of users, 1000 at a time.
        let listUsersResult = await admin.auth().listUsers(1000, nextPageToken)

        totalUsers.push(listUsersResult)
        listUsersResult.users.forEach(function(userRecord) {
            console.log("user", userRecord.toJSON())
        })
        if (listUsersResult.pageToken) {
            // List next batch of users.
            listAllUsers(listUsersResult.pageToken)
        }
        return totalUsers
    } catch (error) {
        console.log("Error listing users:", error)
        throw "Error users"
    }
}

export async function getSomeUsers(amount: number) {
    try {
        // List batch of users, 1000 at a time.
        let listUsersResult = await admin.auth().listUsers(amount)
        return listUsersResult
    } catch (error) {
        console.log("Error listing users:", error)
        throw "Error users"
    }
}
