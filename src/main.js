import App from "./App.svelte"
import { backendInit } from "./firebaseBackend"

function getapp() {
    return new App({
        target: document.body,
        props: {},
    })
}

/**
 * Init all the data from firebase and set up our app stores
 * Log some info
 */
async function bootstrap() {
    if (process.env.EMULATION) console.log("Firebase Emulation being used")
    await backendInit()
    getapp()
}
bootstrap()
