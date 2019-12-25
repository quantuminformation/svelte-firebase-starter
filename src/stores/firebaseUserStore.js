import { writable } from 'svelte/store';
import GoTrue from 'gotrue-js';
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

async function init () {
    let user = await getCurrentUser()
    user && authUserStore.update(store => userFromFireBase(user));
}

init()

//todo
export async function logout () {

    // let user = await getCurrentUser()
    firebase.auth().signOut().then(() => {
        console.log(authUserStore)
        authUserStore.update((user) => undefined)
        navigate("/", { replace: true });
    }).catch((e) => {
        alert(e.message)
    });
}

//todo

export async function updateUserSecuritySettings (email, password) {
    try {
        const updatedUser = await goTrueUser.update({ email: email, password: password })
        console.log(updatedUser)

        authUserStore.update(() => updatedUser)
    } catch (e) {
        alert(e.message)
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
        let {user} = await firebase.auth().signInWithEmailAndPassword(email, password) // sometimes the user is wrapped in user, vs get currentUser which isn't wrapped
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

