import { navigate } from "svelte-routing"

import * as firebaseOriginal from "firebase/app"

let firebase = firebaseOriginal.default
import "firebase/auth"
import "firebase/database"
import { userDataStore } from "./stores/userDataStore"
import { log } from "./util/logging"

var firebaseConfig = {
    apiKey: "AIzaSyDgkLmjsLTLO8cnEhaZu-0o12wpdisCn5w",
    authDomain: "svelte-fullstack-starter.firebaseapp.com",
    databaseURL: process.env.EMULATION
        ? "http://localhost:9000/?ns=svelte-fullstack-starter"
        : "https://svelte-fullstack-starter.firebaseio.com",
    projectId: "svelte-fullstack-starter",
    storageBucket: "svelte-fullstack-starter.appspot.com",
    messagingSenderId: "684795141693",
    appId: "1:684795141693:web:bb22a3283361cfc381d454",
    measurementId: "G-Y1SRV3FGND",
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

// firebase specific
let userLoaded = false

/**
 * checks local data if a user is logged in
 * @returns {Promise<user>}
 */
function getCurrentUser() {
    log("Attempting to get the current user locally")
    return new Promise((resolve, reject) => {
        if (userLoaded) {
            resolve(firebase.auth().currentUser)
        }
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            userLoaded = true
            unsubscribe()
            log("Current user found successfully")
            log(user)

            resolve(user)
        }, reject)
    })
}

export async function logout() {
    // let user = await getCurrentUser()
    firebase
        .auth()
        .signOut()
        .then(() => {
            console.log("logged out")

            // we let the auth route handle this nav now so if they are in a non auth route the dont have to be moved
            // navigate("/", { replace: true });
            //change the store after nav to avoid template errors needing to read email
            userDataStore.update(() => null) //this will cause a redirect
        })
        .catch((e) => {
            alert(e.message)
        })
}

/**
 * Updates the email in the firebase Authentication table
 * @param email
 * @returns {Promise<void>}
 */
export async function updateUserEmail(email) {
    try {
        // let updatedUser = if need access
        await firebase.auth().currentUser.updateEmail(email)
    } catch (e) {
        alert(e.message)
        throw new Error()
    }
}

/**
 * Updates the password used with firebase basic authentication
 * @param password
 * @returns {Promise<void>}
 */
export async function updateUserPassword(password) {
    try {
        await firebase.auth().currentUser.updatePassword(password)
    } catch (e) {
        alert(e.message)
        throw new Error()
    }
}

/**
 * updates Custom data in the realtime datastore users object, except for the username
 * @param data
 * @returns {Promise<void>}
 */
export async function updatePersonalData(data) {
    const { displayName } = data
    try {
        await firebase
            .database()
            .ref("users/" + firebase.auth().currentUser.uid)
            .update({
                displayName: displayName,
            })

        userDataStore.update((user) => {
            return { ...user, displayName: displayName }
        })
    } catch (e) {
        alert(e.message)
    }
}

/**
 * Signs in to firebase using basic authentication
 * Then loads the custom data
 * @param email
 * @param password
 * @returns {Promise<void>}
 */
export async function signin(email, password) {
    try {
        log(`Attempting to sign in`)

        let { user } = await firebase.auth().signInWithEmailAndPassword(email, password) // sometimes the user is wrapped in user, vs get currentUser which isn't wrapped

        log("User from signInWithEmailAndPassword:")
        log(user)

        if (user.emailVerified) {
            await getUserDataAndStore()
            navigate("/", { replace: true })
        } else {
            alert("User not found, if you registered before, have you checked your email?")
            throw new Error() // no message needed for the UI to stop the spinner
        }
        console.log(user)
    } catch (e) {
        alert(e.message)
        throw e.message
    }
}

/**
 * Runs a query to see if any child of users contains the username
 * @param username
 * @returns {Promise<string>}
 */
export async function isUsernameFree(username) {
    try {
        let user = await getDBUserByUsername(username)

        return !!user
    } catch (e) {
        throw e.message
    }
}

/**
 * @param username
 * @returns {Promise<user>}
 */
export async function getDBUserByUsername(username) {
    try {
        let dbUser = await firebase
            .database()
            .ref(`users`)
            .orderByChild("username")
            .equalTo(username)
            .once("value")

        //todo clean this

        let dbUserVal = dbUser.val()
        if (!dbUserVal) {
            return null
        }

        let key = [Object.keys(dbUserVal)[0]][0]
        const user = dbUserVal[key]
        log("DBuser found: ")
        log(user)
        return { ...user, uid: key }
    } catch (e) {
        throw e.message
    }
}

/**
 * Create an account on firebase which will not be using a 3rd party auth provider
 * @param email
 * @param password
 * @param username
 * @param displayName
 * @returns {Promise<void>}
 */
export async function register(email, password) {
    try {
        let userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
        const { user } = userCredential
        await userCredential.user.sendEmailVerification()
        console.log("registered " + userCredential)
        return userCredential
    } catch (e) {
        alert(e.message)
        throw e.message
    }
}

export function requestPasswordRecovery(email) {
    return firebase.auth().sendPasswordResetEmail(email)
}

/**
 * updates username, note there are very specific rules in database.rules.json to stop people having same username
 * @param username
 * @returns {Promise<void>}
 */
export async function updateUserUsername(username) {
    try {
        await firebase
            .database()
            .ref("users/" + firebase.auth().currentUser.uid)
            .update({
                username: username,
            })

        userDataStore.update((user) => {
            return { ...user, username: username }
        })
    } catch (e) {
        alert(e.message)
    }
}

/**
 * Get a user stored locally if logged in and verified then load custom data
 * @returns {Promise<void>}
 */
export async function backendInit() {
    try {
        let user = await getCurrentUser()
        if (user && user.emailVerified) {
            await getUserDataAndStore()
        }
    } catch (e) {
        throw e.message
    }
}

/**
 * Loads user data for authenticated user and persists in the svelte store
 * @returns {Promise<any|{}|Object>}
 */
export async function getUserDataAndStore() {
    try {
        const uid = firebase.auth().currentUser.uid
        log(`Attempting to get the user data stored on Realtime Database for user ${uid}`)

        let query = await firebase.database().ref(`users/${uid}`).once("value")

        const user = query.val()
        log("User DB query returned:")
        log(user)
        if (!user) {
            log(
                "realtime DB data for user not found, so only storing uid from login info. This can happen if you switch environment or are using emulation"
            )
            userDataStore.update(() => {
                return {
                    uid: uid,
                }
            })

            return null
        } else {
            userDataStore.update(() => user)
            return user
        }
    } catch (e) {
        throw e.message
    }
}
//WIP

/**
 * Follows a user
 * @param username
 * @returns {Promise<void>}
 */
export async function followUser(user) {
    try {
        const myUid = firebase.auth().currentUser.uid
            log(`${myUid} to follow user ${user.username}`)
        await firebase
            .database()
            .ref(`following/${myUid}/userFollowing`)
            .update({
                [user.uid]: true,
            })
        return true
    } catch (e) {
        alert(e.message)
    }
}
/**
 * UnFollows a user
 * @param username
 * @returns {Promise<void>}
 */
export async function unFollowUser(user) {
    try {
        const myUid = firebase.auth().currentUser.uid
        log(`${myUid} to unfollow user ${user.username}`)
        await firebase.database().ref(`following/${myUid}/userFollowing/${user.uid}`).remove()
        return true
    } catch (e) {
        alert(e.message)
    }
}

/**
 * Checks userFollowing for the current user to see if following profile user
 * @param uid profile user to check
 * @returns {Promise<any>}
 */
export async function amIFollowing(uid) {
    try {
        const myUid = firebase.auth().currentUser.uid
        log(`is ${myUid} following user ${uid}`)
        const result = await firebase
            .database()
            .ref(`following/${myUid}/userFollowing/${uid}`)
            .once("value")
            .val()

        return result
    } catch (e) {
        throw e.message
    }
}
