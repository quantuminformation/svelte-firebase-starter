import { writable } from 'svelte/store';
import GoTrue from 'gotrue-js';

const url = 'https://svelte-netlify-identity.netlify.com'
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
        window.location.assign("/");

    }).catch((e) => {
        alert(e.message)
    });
}

export function signin (email, password, remember) {
    goTrueInstance.login(email, password, remember).then(user => {
        authUserStore.update(() => user)
        window.location.assign("/");

    }).catch((e) => {
        alert(e.message)
    });
}

export function register (email, password) {
    return goTrueInstance.signup(email, password)
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