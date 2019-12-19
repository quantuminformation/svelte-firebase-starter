import { writable } from 'svelte/store';
import GoTrue from 'gotrue-js';
import { navigate } from "svelte-routing";


const url = 'https://svelte-netlify-identity.netlify.com/'
const goTrueInstance =
    new GoTrue({
        APIUrl: `${url}/.netlify/identity`,
        setCookie: true,
    })

const goTrueUser = goTrueInstance.currentUser() || undefined

export const authUserStore = writable(goTrueUser);

export function logout () {
    goTrueUser.logout().then(() => {
        console.log(authUserStore)
        authUserStore.update((user) => undefined)
        navigate("/", { replace: true });
    }).catch((e) => {
        alert(e.message)
    });
}

export async function updateUserSecuritySettings (email, password) {
    try {
        const updatedUser = await goTrueUser.update({ email: email, password: password })
        console.log(updatedUser)

        authUserStore.update(() => updatedUser)
    } catch (e) {
        alert(e.message)
    }
}

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
        await goTrueInstance.login(email, password, true).then(user => {
            authUserStore.update(() => user)
            window.location.assign("/");
        })
    } catch (e) {
        alert(e.message)
        throw e.message
    }
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
