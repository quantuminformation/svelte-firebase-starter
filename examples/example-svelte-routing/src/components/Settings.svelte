<script>
    import { updateUserSecuritySettings, authUserStore, updateUserSettings } from "../userStore";
    import Spinner from 'svelte-spinner';
    import { navigate } from "svelte-routing";

    if (!$authUserStore) {
        navigate("/", { replace: true });
    }
    const clonedUser = Object.assign({}, $authUserStore);
    let pendingUpdateUserSettings = false
    let successUpdateUserSettings = false

    let successUpdateUserCustomSettings = false
    let pendingUpdateUserCustomSettings = false

    console.log($authUserStore)

    export function handlerSecurity (email, password) {
        pendingUpdateUserSettings = true
        updateUserSecuritySettings(email, password).then(newUser => {
            successUpdateUserSettings = true
            pendingUpdateUserSettings = false
        }).catch(e => {
            pendingUpdateUserSettings = false
        });
    }

    /*    export function handlerCustomData (name) {
            pendingApiCall = true
            (email, password).then(newUser => {
                pendingVerification = true
                pendingApiCall = false
            }).catch(e => {
                pendingApiCall = false
                console.log(e)
                alert(e.message)
            });
        }*/

</script>
<!--<h1>Your custom settings</h1>

<input placeholder="name" bind:value={$authUserStore.name}>
<button on:click={()=>handlerCustomData($authUserStore.email,$authUserStore.password)}>Update Settings</button>
{#if successUpdateUserCustomSettings}
    <h2>You have successfully updated your settings</h2>
{:else if pendingUpdateUserCustomSettings}
    <Spinner></Spinner>
{/if}-->

<hr>
<h2>Security</h2>
<input placeholder="email" bind:value={clonedUser.email}>
<input placeholder="password" type="password" bind:value={clonedUser.password}>
<button on:click={()=>handlerSecurity(clonedUser.email,clonedUser.password)}>Update Security Settings</button>

{#if successUpdateUserSettings}
    <h2>You have successfully updated your settings</h2>
{:else if pendingUpdateUserSettings}
    <Spinner></Spinner>
{/if}