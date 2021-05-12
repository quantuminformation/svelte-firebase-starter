/**
 * Logs message if in devmode
 * @param message
 */
export function log(message) {
    if (!process.env.PRODUCTION) console.log(message)
}
