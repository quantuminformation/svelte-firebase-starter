<script>
    import DefaultSpinner from "./DefaultSpinner.svelte"
    import { userDataStore } from "../stores/userDataStore"

    import { updatePersonalData } from "../firebaseBackend"

    let personalData
    let pendingApiCall
    let showSuccessMessage
    let userDataClone = { ...$userDataStore }

    function submitPersonalSettings(event) {
        pendingApiCall = true
        updatePersonalData(userDataClone)
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

<form on:submit|preventDefault="{submitPersonalSettings}">
    <input required placeholder="Display Name" bind:value="{userDataClone.displayName}" />
    <br />

    <button>Update Personal Settings</button>
    {#if pendingApiCall}
        <DefaultSpinner />
    {/if}
</form>
{#if showSuccessMessage}
    <p>Your Personal Data Settings have been updated.</p>
{/if}
