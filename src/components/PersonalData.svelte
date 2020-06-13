<script>
    import DefaultSpinner from "./DefaultSpinner.svelte"

    import { getUserProfile, updatePersonalData, updateUserUsername } from "../firebaseBackend"
    import { siteBaseURL } from "../../sharedCode/constants"

    let personalDataClone // for comparing changes
    let personalData
    let pendingApiCall
    let showSuccessMessage

    let personalDataPromise = async () => {
        try {
            personalData = await getUserProfile()
            personalDataClone = { ...personalData }
            return personalData
        } catch (e) {
            console.log(e)
        }
    }

    function submitPersonalSettings(event) {
        pendingApiCall = true
        updatePersonalData(personalDataClone)
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

</script>

<h1>Personal Settings</h1>
{#await personalDataPromise()}
    <DefaultSpinner />
{:then personalData}

    <form on:submit|preventDefault="{submitPersonalSettings}">
        <input required placeholder="Display Name" bind:value="{personalDataClone.displayName}" />
        <br />

        <button>Update Personal Settings</button>
        {#if pendingApiCall}
            <DefaultSpinner />
        {/if}
    </form>
    {#if showSuccessMessage}
        <p>Your Personal Data Settings have been updated.</p>
    {/if}
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
