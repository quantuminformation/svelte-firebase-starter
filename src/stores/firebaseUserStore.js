import { writable } from 'svelte/store';
import { navigate } from "svelte-routing";

import * as firebaseOriginal from "firebase/app";

let firebase = firebaseOriginal.default
import "firebase/auth";
import { userFromFireBase } from '../model/User'
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
    measurementId: "G-Y1SRV3FGND"
};
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

// firebase specific
let userLoaded = false;

function getCurrentUser () {
    return new Promise((resolve, reject) => {
        if (userLoaded) {
            resolve(firebase.auth().currentUser);
        }
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            userLoaded = true;
            unsubscribe();
            resolve(user);
        }, reject);
    });
}

export let authUserStore = writable(null);


export async function logout () {

    // let user = await getCurrentUser()
    firebase.auth().signOut().then(() => {
        console.log(authUserStore)

        // we let the auth route handle this nav now so if they are in a non auth route the dont have to be moved
        // navigate("/", { replace: true });
        //change the store after nav to avoid template errors needing to read email
        authUserStore.update(() => null) //this will cause a redirect
    }).catch((e) => {
        alert(e.message)
    });
}


export async function updateUserEmail (email) {


    try {
        let updatedUser = await firebase.auth().currentUser.updateEmail(email)

    } catch (e) {
        alert(e.message)
        throw new Error()
    }
}

export async function updateUserPassword (password) {
    try {
        await firebase.auth().currentUser.updatePassword(password)

    } catch (e) {
        alert(e.message)
        throw new Error()
    }
}

//todo
export async function updateUserCustomSettings (fullname) {
    try {
        const updatedUser = await goTrueUser.update({ data: { fullname: fullname } })
        console.log(updatedUser)

        authUserStore.update(() => updatedUser)
    } catch (e) {
        alert(e.message)
    }
}


export async function signin (email, password) {
    try {
        let { user } = await firebase.auth().signInWithEmailAndPassword(email, password) // sometimes the user is wrapped in user, vs get currentUser which isn't wrapped
        if (user.emailVerified) {

            authUserStore.update(() => userFromFireBase(user))
            navigate("/", { replace: true });

        } else {
            alert('User not found, if you registered before, have you checked your email?')
            throw new Error() // no message needed for the UI to stop the spinner
        }
        console.log(user)
    } catch (e) {
        alert(e.message)
        throw e.message
    }
}

export async function register (email, password) {
    try {
        let newUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
        newUser.user.sendEmailVerification()
        console.log('registered ' + newUser)
    } catch (e) {
        alert(e.message)
        throw e.message
    }

}

export function requestPasswordRecovery (email) {
    return firebase.auth().sendPasswordResetEmail(email)
}

export async function backendInit () {
    try {
        let user = await getCurrentUser()
        user && authUserStore.update(() => userFromFireBase(user));

    } catch (e) {
        throw e.message
    }
}

export async function getUsers (nextPageToken) {

    let uid = firebase.auth().currentUser.uid


    // List batch of users, 1000 at a time.
    /*    firebase.auth().listUsers(1000, nextPageToken)
            .then(function (listUsersResult) {
                listUsersResult.users.forEach(function (userRecord) {
                    console.log('user', userRecord.toJSON());
                });
                if (listUsersResult.pageToken) {
                    // List next batch of users.
                    listAllUsers(listUsersResult.pageToken);
                }
            })
            .catch(function (error) {
                console.log('Error listing users:', error);
            });*/
}

