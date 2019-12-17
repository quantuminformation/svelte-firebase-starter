<script>

    import { requestPasswordRecovery } from "../stores/userStore";
    import DefaultSpinner from './DefaultSpinner.svelte'
    import { navigate } from "svelte-routing";
    import {  authUserStore } from "../stores/userStore";

    if ($authUserStore) {
        navigate("/", { replace: true });
    }

    let email = ""
    let showSuccessMessage = false
    let pendingApiCall = false


    export function submit (event) {
        pendingApiCall = true
        requestPasswordRecovery(email).then(newUser => {
            showSuccessMessage = true
            pendingApiCall = false
        }).catch(e => {
            pendingApiCall = false
            console.log(e)
            alert(e.message)
        });
    }

</script>

<div>
    <h1>Request Password Recovery</h1>
    <form on:submit|preventDefault={submit}>
        <input
                id="inline-full-name" type="email" required placeholder="Email" bind:value="{email}">

        <button
        >Reset Password
        </button>
        {#if pendingApiCall}
            <DefaultSpinner></DefaultSpinner>
        {/if}
    </form>
    {#if showSuccessMessage}
        <p>An email has been sent if that account exists to reset your password.</p>
    {/if}

</div>
