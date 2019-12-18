<script>


    import DefaultSpinner from '../components/DefaultSpinner.svelte'
    import { navigate } from "svelte-routing";
    import { authUserStore, updateUserSecuritySettings } from '../stores/userStore';


    if (!$authUserStore) {
        navigate("/", { replace: true });
    }

    let password = ""
    let confirmPassword = ""
    let email = $authUserStore.email
    let showSuccessMessage1 = false
    let pendingApiCall1 = false

    export function submit1 (event) {
        if (password === confirmPassword) {
            pendingApiCall1 = true
            updateUserSecuritySettings(email, password).then(newUser => {
                showSuccessMessage1 = true
                pendingApiCall1 = false
            }).catch(e => {
                pendingApiCall1 = false
                console.log(e)
                alert(e.message)
            });
        }
        else{
            alert('Your passwords do not match')
        }
    }

</script>


<div>
    <h1>Security Settings</h1>
    <form on:submit|preventDefault={submit1}>
        <input
                type="email" required placeholder="Email" bind:value="{email}"><br>
        <input type="password" required placeholder="New password" bind:value="{password}"> <br>
        <input id="password-confirm" type="password" required placeholder="Confirm new password"
               bind:value="{confirmPassword}">
        <br>
        <button
        >Update Security Settings
        </button>
        {#if pendingApiCall1}
            <DefaultSpinner></DefaultSpinner>
        {/if}
    </form>
    {#if showSuccessMessage1}
        <p>Your Security Settings have been updated.</p>
    {/if}

</div>
