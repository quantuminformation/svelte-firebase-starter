<script>
    import { register } from "../firebaseBackend"
    import DefaultSpinner from "../components/DefaultSpinner.svelte"
    import { navigate } from "svelte-routing"
    import { authUserStore, isUsernameFree } from "../firebaseBackend"
    import { siteBaseURL } from "../../sharedCode/constants"
    // import { profileURL } from "../../sharedCode/utils"

    if ($authUserStore) {
        navigate("/", { replace: true })
    }

    let password = ""
    let email = ""
    let displayName = ""

    let username = ""
    let usernameDirty = false
    let usernameCheckPending = false
    let usernameIsFree = false

    let showSuccessMessage = false
    let pendingApiCall = false

    let isUsernameFreeR = false

    export function submit(event) {
        if (!usernameIsFree) {
            alert("Your username is not available, please try another")
        }
        pendingApiCall = true
        register(email, password, username, displayName)
            .then((newUser) => {
                showSuccessMessage = true
                pendingApiCall = false
            })
            .catch((e) => {
                pendingApiCall = false
            })
    }

    const handler = async () => {
        if (!username) {
            usernameDirty = false
            return
        }
        usernameCheckPending = true
        usernameDirty = true
        let usernameResult = await isUsernameFree(username)
        usernameCheckPending = false
        if (usernameResult) {
            usernameIsFree = false
        } else {
            usernameIsFree = true
        }
    }
</script>

<div>

    <div>
        <h1>Register</h1>
        <h2>Account Settings</h2>
        <form on:submit|preventDefault="{submit}">
            <input type="email" required placeholder="Email" bind:value="{email}" />
            <input type="password" required placeholder="Your password" bind:value="{password}" />

            <br />
            <div>
                <input
                    required
                    placeholder="Username"
                    bind:value="{username}"
                    on:keyup="{handler}" />
            </div>
            {#if usernameDirty}
                {#if usernameCheckPending}
                    <DefaultSpinner />
                {:else if usernameIsFree}
                    <span>✅ Username is available</span>
                {:else}
                    <span>❌ Username {username} is not available.</span>
                {/if}
            {/if}
            <br />
            {#if username}
                <p>Your profile url will be at {`${siteBaseURL}${username}`}</p>
            {/if}
            <hr />
            <h2>Personal settings</h2>
            <input required placeholder="Display Name" bind:value="{displayName}" />
            <button>Create Account</button>

            <!--     {#if pendingApiCall}
                <DefaultSpinner />
            {/if}-->
        </form>
        {#if showSuccessMessage}
            <p>
                Well done! Your new account has been successfully created 🌱 Please check your email
                to verify your email and then you will be able to login.
            </p>
        {/if}

    </div>
</div>
