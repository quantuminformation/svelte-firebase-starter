<script>
    import { register, authUserStore, PENDING_VERIFICATION } from "../userStore";

    let password = ""
    let email = ""
    let pendingVerification = false

    export function registerHandler (email, password) {
        register(email, password).then(newUser => {
            pendingVerification = true
        }).catch(e => {
            console.log(e)
            alert(e.message)
        });
    }

</script>
<h1>Register</h1>
<input placeholder="email" bind:value={email}>
<input placeholder="password" type="password" bind:value={password}>
<button on:click={()=>registerHandler(email,password)}>Register</button>

{#if pendingVerification}
    <h2>Please check your email to verify and then login</h2>
{/if}