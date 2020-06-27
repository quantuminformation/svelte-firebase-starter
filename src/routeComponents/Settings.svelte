<script>
    import DefaultSpinner from "../components/DefaultSpinner.svelte"
    import { navigate } from "svelte-routing"

    import { updateUserPassword } from "../firebaseBackend"
    import Authenticated from "./Authenticated.svelte"
    import PersonalData from "../components/PersonalData.svelte"
    import Username from "../components/Username.svelte"
    import { userDataStore } from "../stores/userDataStore"
    import Email from "../components/Email.svelte"

    let userSettings
    let personalDataClone // for comparing changes

    let password = ""
    let confirmPassword = ""

    let showSuccessMessage2 = false
    let pendingApiCall2 = false
    let showSuccessMessage3 = false
    let pendingApiCall3 = false

    function submit2(event) {
        if (password === confirmPassword) {
            pendingApiCall2 = true
            updateUserPassword(password)
                .then((newUser) => {
                    showSuccessMessage2 = true
                    pendingApiCall2 = false
                })
                .catch((e) => {
                    pendingApiCall2 = false
                })
        } else {
            alert("Your passwords do not match")
        }
    }
</script>

<Authenticated>

    <div>

        <PersonalData />
        <Username />

        <hr />
        <h1>Security Settings / Danger Zone</h1>

        <Email />

        <form on:submit|preventDefault="{submit2}">
            <input type="password" required placeholder="New password" bind:value="{password}" />
            <br />
            <input
                id="password-confirm"
                type="password"
                required
                placeholder="Confirm new password"
                bind:value="{confirmPassword}" />
            <br />
            <button>Update Password</button>
            {#if pendingApiCall2}
                <DefaultSpinner />
            {/if}
        </form>
        {#if showSuccessMessage2}
            <p>Your Password has been updated.</p>
        {/if}

    </div>
</Authenticated>
