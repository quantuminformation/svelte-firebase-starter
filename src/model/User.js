// todo temping to switch to TS

export function userFromFireBase (serverUser) {
    return getUser(serverUser.user.email)
}

export function userFromNetlify (serverUser) {
    return getUser(serverUser.email)
}

function getUser (email) {
    const user = { email: email }
    console.log(user)
    return user
}
