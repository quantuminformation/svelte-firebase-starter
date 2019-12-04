<script>
    import { register, authUserStore, PENDING_VERIFICATION } from "../userStore";

    let password = ""
    let email = ""


</script>
<h1>Register</h1>
<input placeholder="email" bind:value={email}>
<input placeholder="password" type="password" bind:value={password}>
<button on:click={()=>register(email,password)}>Register</button>

{#if $authUserStore === PENDING_VERIFICATION}
    <h2>Please check your email to verify and then login</h2>
{/if}