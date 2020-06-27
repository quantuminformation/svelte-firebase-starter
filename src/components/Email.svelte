<script>
    import { updateUserEmail } from "../firebaseBackend"

    let emailClone = firebase.auth().currentUser.email
    let showSuccessMessage = false
    let pendingApiCall = false
    function submit(event) {
        if (emailClone !== firebase.auth().currentUser.email) {
            pendingApiCall1 = true
            updateUserEmail(emailClone)
                .then((newUser) => {
                    showSuccessMessage1 = true
                    pendingApiCall1 = false
                })
                .catch((e) => {
                    pendingApiCall1 = false
                })
        } else {
            alert("Your Email is the same as it was before, operation ignored,")
        }
    }
</script>

<form on:submit|preventDefault="{submit}">
    <input type="email" required placeholder="Email" bind:value="{emailClone}" />
    <br />

    <button>Update Email</button>
    {#if pendingApiCall}
        <DefaultSpinner />
    {/if}
</form>
{#if showSuccessMessage}
    <p>Your Email has been updated.</p>
{/if}
<br />
