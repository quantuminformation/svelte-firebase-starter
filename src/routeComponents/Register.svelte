<script>
    import { register } from "../firebaseBackend"
    import DefaultSpinner from "../components/DefaultSpinner.svelte"
    import { navigate } from "svelte-routing"
    import { authUserStore } from "../firebaseBackend"
    import { siteBaseURL } from "../../sharedCode/constants"
    // import { profileURL } from "../../sharedCode/utils"
    import { fly } from 'svelte/transition';


    if ($authUserStore) {
        navigate("/", { replace: true })
    }

    let password = ""
    let email = ""

    let showSuccessMessage = false
    let pendingApiCall = false

    let isUsernameFreeR = false

    export function submit(event) {
      /*  if (!usernameIsFree) {
            alert("Your username is not available, please try another")
        }*/
        pendingApiCall = true
        register(email, password)
            .then((newUser) => {
                showSuccessMessage = true
                pendingApiCall = false
            })
            .catch((e) => {
                pendingApiCall = false
            })
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


            <button>Create Account</button>

        </form>
        {#if pendingApiCall}
            <DefaultSpinner />
        {/if}
        {#if showSuccessMessage}
            <p transition:fly="{{ y: 100, duration: 700 }}">
                Well done! Your new account has been successfully created 🌱 Please check your email
                to verify your email and then you will be able to login.
            </p>
        {/if}

    </div>
</div>
