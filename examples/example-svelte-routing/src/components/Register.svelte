<script>
    import { register, authUserStore, PENDING_VERIFICATION } from "../userStore";
    import Spinner from 'svelte-spinner';

    let password = ""
    let email = ""
    let pendingVerification = false
    let pendingRegistration = false

    export function registerHandler (email, password) {
        pendingRegistration = true
        register(email, password).then(newUser => {
            pendingVerification = true
            pendingRegistration = false
        }).catch(e => {
            pendingRegistration = false
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
{:else if pendingRegistration}
    <Spinner></Spinner>
{/if}