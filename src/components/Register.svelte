<script>
    import { register } from "../stores/netlifyUserStore";
    import Spinner from 'svelte-spinner';

    let password = ""
    let email = ""
    let pendingVerification = false
    let pendingApiCall = false

    export function registerHandler (email, password) {
        pendingApiCall = true
        register(email, password).then(newUser => {
            pendingVerification = true
            pendingApiCall = false
        }).catch(e => {
            pendingApiCall = false
            console.log(e)
            alert(e.message)
        });
    }

</script>
<h1>Register</h1>
<input placeholder="email" bind:value={email}>
<input placeholder="password" type="password" bind:value={password}>
<button on:click={()=>registerHandler(email,password)}>Register</button>

{#if pendingVerification}
    <h2>Please check your email to verify and then login</h2>
{:else if pendingApiCall}
    <Spinner></Spinner>
{/if}
