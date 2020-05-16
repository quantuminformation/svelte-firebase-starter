import { writable } from "svelte/store"
import { navigate } from "svelte-routing"

import * as firebaseOriginal from "firebase/app"

let firebase = firebaseOriginal.default
import "firebase/auth"
import "firebase/database"
import { userFromFireBase } from "./model/User"
import { post } from "./api"
//import "firebase/analytics";

//import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDgkLmjsLTLO8cnEhaZu-0o12wpdisCn5w",
    authDomain: "svelte-fullstack-starter.firebaseapp.com",
    databaseURL: "https://svelte-fullstack-starter.firebaseio.com",
    projectId: "svelte-fullstack-starter",
    storageBucket: "svelte-fullstack-starter.appspot.com",
    messagingSenderId: "684795141693",
    appId: "1:684795141693:web:bb22a3283361cfc381d454",
    measurementId: "G-Y1SRV3FGND",
}
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

// firebase specific
let userLoaded = false

function getCurrentUser() {
    return new Promise((resolve, reject) => {
        if (userLoaded) {
            resolve(firebase.auth().currentUser)
        }
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            userLoaded = true
            unsubscribe()
            resolve(user)
        }, reject)
    })
}

export let authUserStore = writable(null)

export async function logout() {
    // let user = await getCurrentUser()
    firebase
        .auth()
        .signOut()
        .then(() => {
            console.log(authUserStore)

            // we let the auth route handle this nav now so if they are in a non auth route the dont have to be moved
            // navigate("/", { replace: true });
            //change the store after nav to avoid template errors needing to read email
            authUserStore.update(() => null) //this will cause a redirect
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

export async function updateUserUsername(username) {
    try {
        await firebase
            .database()
            .ref("users/" + firebase.auth().currentUser.uid)
            .update({
                username: username,
            })

        authUserStore.update((user) => {
            return { ...user, username: username }
        })
    } catch (e) {
        alert(e.message)
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

        authUserStore.update((user) => {
            return { ...user, displayName: displayName }
        })
    } catch (e) {
        alert(e.message)
    }
}

/**
 * Signs in to firebase using basic authentication
 * @param email
 * @param password
 * @returns {Promise<void>}
 */
export async function signin(email, password) {
    try {
        let { user } = await firebase.auth().signInWithEmailAndPassword(email, password) // sometimes the user is wrapped in user, vs get currentUser which isn't wrapped
        if (user.emailVerified) {
            authUserStore.update(() => userFromFireBase(user))
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

export async function isUsernameFree(username) {
    try {
        let query = await firebase.database().ref(`usernames/${username}`).once("value")

        return query.val()
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
export async function register(email, password, username) {
    try {
        let userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
        const { user } = userCredential
        post("upsertUsername", { username: username, uid: user.uid })

        userCredential.user.sendEmailVerification()
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

export async function backendInit() {
    try {
        let user = await getCurrentUser()
        user && authUserStore.update(() => userFromFireBase(user))
    } catch (e) {
        throw e.message
    }
}
export async function getUserProfile() {
    try {
        let query = await firebase
            .database()
            .ref("users/" + firebase.auth().currentUser.uid)
            .once("value")

        const user = query.val()
        console.log(user)
        return user
    } catch (e) {
        throw e.message
    }
}

export async function amIFollowing(uid) {
    try {
        return await firebase.database().ref("users/" + uid)
    } catch (e) {
        throw e.message
    }
}
