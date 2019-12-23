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
//firebase.default.analytics();

const url = 'https://svelte-netlify-identity.netlify.com/'
const goTrueInstance =
    new GoTrue({
        APIUrl: `${url}/.netlify/identity`,
        setCookie: true,
    })

const user = firebase.auth().currentUser()

export const authUserStore = writable(goTrueUser);

//todo

export function logout () {
    goTrueUser.logout().then(() => {
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
        await firebase.auth().signInWithEmailAndPassword(email, password).then(user => {

            if (user.user.emailVerified) {

                authUserStore.update(() => userFromFireBase(user))
                navigate("/", { replace: true });

            } else {
                alert('User not found, if you registered before, have you checked your email?')
                throw new Error() // no message needed for the UI to stop the spinner
            }
            console.log(user)
        })
    } catch (e) {
        alert(e.message)
        throw e.message
    }
}

export async function register (email, password) {
    try {
        let newUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
        console.log('registered ' + newUser)
    } catch (e) {
        alert(e.message)
        throw e.message
    }

}

//todo
export function requestPasswordRecovery (email) {
    return goTrueInstance.requestPasswordRecovery(email)
}

//todo

export async function recover (token) {
    try {

        let existingUser = await goTrueInstance.recover(token)

        alert("Account recovered! You are now logged in. Please change your password immediately by updating your security settings.", JSON.stringify({ response }));
        console.log(`recovered account: ${existingUser}`)
        authUserStore.update(() => existingUser)
        window.location.assign("/settings");
    } catch (e) {
        console.log('something wrong with recovery')
        alert(e.message);
    }

}
