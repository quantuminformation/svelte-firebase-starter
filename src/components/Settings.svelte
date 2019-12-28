<script>


    import DefaultSpinner from '../components/DefaultSpinner.svelte'
    import { navigate } from "svelte-routing";
    import { authUserStore, updateUserEmail, updateUserPassword, updateUserCustomSettings } from '../stores/userStore';
    import Authenticated from './Authenticated.svelte'


    //since this is in the authenticated HOC $authUserStore is guaranteed to be there
    let storeClone = { ...$authUserStore }
    let confirmPassword = ""

    let showSuccessMessage1 = false
    let pendingApiCall1 = false
    let showSuccessMessage2 = false
    let pendingApiCall2 = false
    let showSuccessMessage3 = false
    let pendingApiCall3 = false

    function submit1 (event) {

        if (storeClone.email !== $authUserStore.email) {
            pendingApiCall1 = true
            updateUserEmail(storeClone.email).then(newUser => {
                showSuccessMessage1 = true
                pendingApiCall1 = false
            }).catch(e => {
                pendingApiCall1 = false
            });
        } else {
            alert('Your Email is the same as it was before, operation ignored,')
        }
    }

    /*    function submit2 (event) {
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

        function submit3 (event) {
            /!*
                    if (password === confirmPassword) {
            *!/
            pendingApiCall3 = true
            updateUserCustomSettings(authUser.fullname).then(newUser => {
                showSuccessMessage3 = true
                pendingApiCall3 = false
            }).catch(e => {
                pendingApiCall3 = false
                console.log(e)
                alert(e.message)
            });
            /!*   }
               else{
                   alert('Your passwords do not match')
               }*!/
        }*/

</script>

<Authenticated>

    <div>
        <h1>Security Settings / Danger Zone</h1>
        <form on:submit|preventDefault={submit1}>
            <input
                    type="email" required placeholder="Email" bind:value="{storeClone.email}"><br>

            <button
            >Update Email
            </button>
            {#if pendingApiCall1}
                <DefaultSpinner></DefaultSpinner>
            {/if}
        </form>
        {#if showSuccessMessage1}
        <!--todo this coudl change depending onthe backend-->
            <p>Your Email has been updated.</p>
        {/if}
        <br>
        <!--       <form on:submit|preventDefault={submit2}>
                   <input type="password" required placeholder="New password" bind:value="{password}"> <br>
                   <input id="password-confirm" type="password" required placeholder="Confirm new password"
                          bind:value="{confirmPassword}">
                   <br>
                   <button
                   >Update Password
                   </button>
                   {#if pendingApiCall1}
                       <DefaultSpinner></DefaultSpinner>
                   {/if}
               </form>
               <hr>-->

        <!--       <h1>Custom Settings</h1>
               <form on:submit|preventDefault={submit3}>
                   <input
                           required placeholder="Fullname" bind:value="{authUser.fullname}"><br>

                   <br>
                   <button>Update Custom Settings</button>
                   {#if pendingApiCall3}
                       <DefaultSpinner></DefaultSpinner>
                   {/if}
               </form>
               {#if showSuccessMessage3}
                   <p>Your Custom Settings have been updated.</p>
               {/if}
       -->

    </div>
</Authenticated>
