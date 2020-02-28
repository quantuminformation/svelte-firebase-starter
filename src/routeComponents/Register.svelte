<script>
    import { register } from "../stores/userStore"
    import DefaultSpinner from "../components/DefaultSpinner.svelte"
    import { navigate } from "svelte-routing"
    import { authUserStore } from "../stores/userStore"
    import { siteBaseURL } from "../../sharedCode/constants"
   // import { profileURL } from "../../sharedCode/utils"

    if ($authUserStore) {
        navigate("/", { replace: true })
    }

    let password = ""
    let email = ""
    let displayName = ""
    let username = ""

    let showSuccessMessage = false
    let pendingApiCall = false

    export function submit(event) {
        pendingApiCall = true
        register(email, password,username, displayName)
            .then(newUser => {
                showSuccessMessage = true
                pendingApiCall = false
            })
            .catch(e => {
                pendingApiCall = false
            })
    }
</script>

<div>

    <div>
        <h1>Register</h1>
        <h2>Account Settings</h2>
        <form on:submit|preventDefault={submit}>
            <input type="email" required placeholder="Email" bind:value={email} />
            <input type="password" required placeholder="Your password" bind:value={password} />

            <br />
            <input required placeholder="Username" bind:value={username} />
            <br />
            {#if username}
                <p>Your profile url will be at {`${siteBaseURL}${username}`}</p>
            {/if}
            <hr>
        <h2>Personal settings</h2>
            <input required placeholder="Display Name" bind:value={displayName} />

            <button>Register</button>
            {#if pendingApiCall}
                <DefaultSpinner />
            {/if}
        </form>
        {#if showSuccessMessage}
            <p>Please check your email to verify and then login</p>
        {/if}

    </div>
</div>
