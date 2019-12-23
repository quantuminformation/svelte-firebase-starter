<script>

    import { register } from "../stores/userStore";
    import DefaultSpinner from './DefaultSpinner.svelte'
    import { navigate } from "svelte-routing";
    import {  authUserStore } from "../stores/userStore";

    if ($authUserStore) {
        navigate("/", { replace: true });
    }

    let password = ""
    let email = ""
    let showSuccessMessage = false
    let pendingApiCall = false


    export function submit (event) {
        pendingApiCall = true
        register(email, password).then(newUser => {
            showSuccessMessage = true
            pendingApiCall = false
        }).catch(e => {
            pendingApiCall = false
        });
    }

</script>


<div>

    <div>
        <h1>Register</h1>
        <form on:submit|preventDefault={submit}>
            <input type="email" required placeholder="Email" bind:value="{email}">
            <input type="password" required placeholder="Your password" bind:value="{password}">

            <button>Register
            </button>
            {#if pendingApiCall}
                <DefaultSpinner></DefaultSpinner>
            {/if}
        </form>
        {#if showSuccessMessage}
            <p>Please check your email to verify and then login</p>
        {/if}

    </div>
</div>
