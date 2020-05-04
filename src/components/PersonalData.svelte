<script>
    import DefaultSpinner from "./DefaultSpinner.svelte"

    import { getUserProfile,updatePersonalData,        updateUserUsername,
    } from "../stores/userStore"
    import { siteBaseURL } from "../../sharedCode/constants"

    let personalDataClone // for comparing changes
    let personalData
let pendingApiCall
    let showSuccessMessage
    let showSuccessMessage2 = false
    let pendingApiCall2 = false

    let personalDataPromise = async () => {
        try {
             personalData = await getUserProfile()
            personalDataClone = {...personalData}
            return personalData
        } catch (e) {
            console.log(e)
        }
    }

    function submitPersonalSettings (event) {
        pendingApiCall = true
        updatePersonalData(personalDataClone)
                .then(() => {
                    showSuccessMessage = true
                    pendingApiCall = false
                })
                .catch(e => {
                    pendingApiCall = false
                    console.log(e)
                    alert(e.message)
                })
    }

    function submitUsername(event) {
        pendingApiCall2 = true
        updateUserUsername(personalDataClone.username)
                .then(() => {
                    showSuccessMessage2 = true
                    pendingApiCall2 = false
                })
                .catch((e) => {
                    pendingApiCall2 = false
                    console.log(e)
                    alert(e.message)
                })
    }
</script>

<h1>Personal Settings</h1>
{#await personalDataPromise()}
    <DefaultSpinner />
{:then personalData}

    <form on:submit|preventDefault={submitPersonalSettings}>
        <input required placeholder="Display Name" bind:value={personalDataClone.displayName }  />
        <br />

        <button>Update Personal Settings</button>
        {#if pendingApiCall}
            <DefaultSpinner />
        {/if}
    </form>
    {#if showSuccessMessage}
        <p>Your Personal Data Settings have been updated.</p>
    {/if}
    <form on:submit|preventDefault="{submitUsername}">

        <input required placeholder="Username" bind:value="{personalDataClone.username}" />
        <br />
        {#if personalDataClone.username}
            <p>Your profile url will be at {`${siteBaseURL}${personalDataClone.username}`}</p>
        {/if}
        <button>Update Username</button>
        {#if pendingApiCall2}
            <DefaultSpinner />
        {/if}
        {#if showSuccessMessage2}
            <p>Your Username has been updated.</p>
        {/if}
    </form>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
