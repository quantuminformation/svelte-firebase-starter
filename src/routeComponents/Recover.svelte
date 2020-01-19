<script>
    import { requestPasswordRecovery } from "../stores/userStore"
    import DefaultSpinner from "../components/DefaultSpinner.svelte"
    import { navigate } from "svelte-routing"
    import { authUserStore } from "../stores/userStore"

    if ($authUserStore) {
        navigate("/", { replace: true })
    }

    let email = ""
    let showSuccessMessage = false
    let pendingApiCall = false

    export function submit(event) {
        pendingApiCall = true
        requestPasswordRecovery(email)
            .then(newUser => {
                showSuccessMessage = true
                pendingApiCall = false
            })
            .catch(e => {
                pendingApiCall = false
                console.log(e)
                alert(e.message)
            })
    }
</script>

<div>
    <h1>Request Account Recovery</h1>
    <form on:submit|preventDefault={submit}>
        <input id="inline-full-name" type="email" required placeholder="Email" bind:value={email} />

        <button>Recover Account</button>
        {#if pendingApiCall}
            <DefaultSpinner />
        {/if}
    </form>
    {#if showSuccessMessage}
        <p>
            An email has been sent if that account exists to allow you to log in one time. You will
            need to set your password immediately in order to log in again.
        </p>
    {/if}

</div>
