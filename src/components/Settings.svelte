<script>


    import DefaultSpinner from '../components/DefaultSpinner.svelte'
    import { navigate } from "svelte-routing";
    import { authUserStore, updateUserSecuritySettings, updateUserCustomSettings } from '../stores/userStore';


    if (!$authUserStore) {
        navigate("/", { replace: true });
    }

    let password = ""
    let confirmPassword = ""
    let email = $authUserStore.email

    let fullname = $authUserStore.fullname

    let showSuccessMessage1 = false
    let pendingApiCall1 = false
    let showSuccessMessage2 = false
    let pendingApiCall2 = false

    function submit1 (event) {
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
        } else {
            alert('Your passwords do not match')
        }
    }

    function submit2 (event) {
        /*
                if (password === confirmPassword) {
        */
        pendingApiCall2 = true
        updateUserCustomSettings(fullname).then(newUser => {
            showSuccessMessage2 = true
            pendingApiCall2 = false
        }).catch(e => {
            pendingApiCall2 = false
            console.log(e)
            alert(e.message)
        });
        /*   }
           else{
               alert('Your passwords do not match')
           }*/
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

    <hr>

    <h1>Custom Settings</h1>
    <form on:submit|preventDefault={submit2}>
        <input
                required placeholder="Fullname" bind:value="{fullname}"><br>

        <br>
        <button>Update Custom Settings</button>
        {#if pendingApiCall2}
            <DefaultSpinner></DefaultSpinner>
        {/if}
    </form>
    {#if showSuccessMessage2}
        <p>Your Custom Settings have been updated.</p>
    {/if}


</div>
