<script>
    import DefaultSpinner from "./DefaultSpinner.svelte"

    import { getUserProfile, updateUserUsername, isUsernameFree } from "../firebaseBackend"
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
            personalData = await getUserProfile()
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
<hr>
<h1>Username</h1>
{#await personalDataPromise()}
    <DefaultSpinner />
{:then personalData}
    <form on:submit|preventDefault="{submitUsername}">

        <div>
            <input required placeholder="Username" bind:value="{personalDataClone.username}" />
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
        {#if personalDataClone.username}
            <p>Your profile url will be at {`${siteBaseURL}${personalDataClone.username}`}</p>
        {/if}
        <button>Update Username</button>
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
