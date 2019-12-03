import { writable } from 'svelte/store';
import GoTrue, { User, Settings } from 'gotrue-js';

export const authUser = writable(undefined);

export function logout () {
    User.logout().then(() => authUser.update(undefined));
}
export  function register () {
    goTrueInstance.createUser()
    goTrueInstance.signup(authUser.email, authUser.password).then(newUser=>authUser.update(newUser));

}
