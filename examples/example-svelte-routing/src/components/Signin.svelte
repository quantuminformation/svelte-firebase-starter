<script>
    import { signin } from "../stores/netlifyUserStore";

    let password = ""
    let email = ""
</script>
<h1>Signin</h1>

<input placeholder="email" bind:value={email}>
<input placeholder="password" type="password" bind:value={password}>
<button on:click={()=>signin(email,password,true)}>Signin</button>
