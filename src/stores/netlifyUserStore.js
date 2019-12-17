import { writable } from 'svelte/store';
import GoTrue from 'gotrue-js';
import { navigate } from "svelte-routing";


const url = 'https://svelte-netlify-identity.netlify.com/'
const goTrueInstance =
    new GoTrue({
        APIUrl: `${url}/.netlify/identity`,
        setCookie: true,
    })

const user = goTrueInstance.currentUser() || undefined

export const authUserStore = writable(user);

export function logout () {
    user.logout().then(() => {
        console.log(authUserStore)
        authUserStore.update((user) => undefined)
        navigate("/", { replace: true });
    }).catch((e) => {
        alert(e.message)
    });
}

export function updateUserSecuritySettings (email, password) {
    return new Promise(
        function (resolve, reject) {

            user.update({ email: email, password: password }).then(user => {
                console.log(user)

                authUserStore.update(() => user)
                resolve()
            }).catch((e) => {
                alert(e.message)
                reject()
            });
        })
}

export function signin (email, password) {
    return new Promise(
        function (resolve, reject) {
            goTrueInstance.login(email, password, true).then(user => {
                authUserStore.update(() => user)
                window.location.assign("/");

            }).catch((e) => {
                alert(e.message)
                reject()
            });
        })
}

export function register (email, password) {
    return goTrueInstance.signup(email, password)
}

export function requestPasswordRecovery (email) {
    return goTrueInstance.requestPasswordRecovery(email)
}

export function confirm (token) {
    goTrueInstance.confirm(token)
        .then(function (response) {
            alert("Account confirmed! Welcome to the party! You can now login with your details", JSON.stringify({ response }));
        })
        .catch(function (e) {
            alert(e.message);
        });
}


export function recover (token) {
    goTrueInstance.recover(token)
        .then(function (response) {
            alert("Account recovered!", JSON.stringify({ response }));
        })
        .catch(function (e) {
            alert(e.message);
        });
}
