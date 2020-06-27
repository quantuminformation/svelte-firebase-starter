<script>
    import DefaultSpinner from "./DefaultSpinner.svelte"

    import { getUserDataAndStore, updateUserUsername, isUsernameFree } from "../firebaseBackend"
    import { siteBaseURL } from "../../sharedCode/constants"

    let personalDataClone // for comparing changes
    let personalData
    let pendingApiCall
    let showSuccessMessage
    let usernameDirty
    let usernameCheckPending

    let usernameIsFree
    let personalDataPromise = async () => {
        try {
            personalData = await getUserDataAndStore()
            personalDataClone = { ...personalData }
            return personalData
        } catch (e) {
            console.log(e)
        }
    }

    function submitUsername(event) {
        pendingApiCall = true
        updateUserUsername(personalDataClone.username)
            .then(() => {
                showSuccessMessage = true
                pendingApiCall = false
            })
            .catch((e) => {
                pendingApiCall = false
                console.log(e)
                alert(e.message)
            })
    }

    const onkeyup = async () => {
        if (!personalDataClone.username) {
            usernameDirty = false
            return
        }
        usernameCheckPending = true
        usernameDirty = true
        let usernameResult = await isUsernameFree(personalDataClone.username)
        usernameCheckPending = false
        if (usernameResult) {
            usernameIsFree = false
        } else {
            usernameIsFree = true
        }
    }
</script>

<hr />
<h1>Username</h1>
{#await personalDataPromise()}
    <DefaultSpinner />
{:then personalData}
    <form on:submit|preventDefault="{submitUsername}">

        <div>
            <input
                required
                placeholder="Username"
                on:keyup="{onkeyup}"
                bind:value="{personalDataClone.username}" />
        </div>
        {#if usernameDirty}
            {#if usernameCheckPending}
                <DefaultSpinner />
            {:else if usernameIsFree}
                <span>✅ Username is available</span>
            {:else}
                <span>❌ Username {personalDataClone.username} is not available.</span>
            {/if}
        {/if}
        <br />
        {#if personalDataClone.username}
            <p>Your profile url will be at {`${siteBaseURL}${personalDataClone.username}`}</p>
        {/if}
        <button disabled={!usernameIsFree}>Update Username</button>
        {#if pendingApiCall}
            <DefaultSpinner />
        {/if}
        {#if showSuccessMessage}
            <p>Your Username has been updated.</p>
        {/if}
    </form>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
