import { writable } from 'svelte/store';
import GoTrue from 'gotrue-js';

export const PENDING_VERIFICATION = 'PENDING_VERIFICATION'
const url = 'https://svelte-netlify-identity.netlify.com'
const goTrueInstance =
    new GoTrue({
        APIUrl: `${url}/.netlify/identity`,
        setCookie: true,
    })

const user = goTrueInstance.currentUser() || undefined

export const authUserStore = writable(user);

export function logout () {
    User.logout().then(() => authUserStore.update(undefined));
}

export function signin (email, password,remember) {
    goTrueInstance.login(email, password, remember).then(user => authUserStore.update(user));
}

export function register (email, password) {
    goTrueInstance.signup(email, password).then(newUser => {
        authUserStore.update(() => PENDING_VERIFICATION)
    }).catch(e => {
        console.log(e)
        alert(e.message)
    });
}

export function confirm(){
auth
    .confirm(token)
    .then(function(response) {
        console.log("Account confirmed!Welcome to the party!", JSON.stringify({ response }));
    })
    .catch(function(e) {
        console.log(e);
    });
}