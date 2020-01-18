import App from "./App.svelte"
import { backendInit } from "./stores/userStore"

function getapp() {
    return new App({
        target: document.body,
        props: {}
    })
}

/**
 * Some backends need some time to get up an running
 */
async function bootstrap() {
    await backendInit()
    getapp()
}
bootstrap()
