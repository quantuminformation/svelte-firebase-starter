// todo temping to switch to TS, iwll prob need need some logic at some point

export function userFromFireBase(serverUser) {
    return getUser(serverUser)
}

export function userFromNetlify(serverUser) {
    return getUser(serverUser)
}

function getUser(user) {
    return { email: user.email, displayName: user.displayName }
}
