import App from "./App.svelte"
import { backendInit } from "./firebaseBackend"

function getapp() {
    return new App({
        target: document.body,
        props: {}
    })
}

/**
 * Init all the data from firebase and set up our app stores
 */
async function bootstrap() {
    await backendInit()
    getapp()
}
bootstrap()
