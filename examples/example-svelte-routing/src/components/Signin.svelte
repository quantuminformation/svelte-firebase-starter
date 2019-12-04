<script>
    import GoTrue from 'gotrue-js';
    import { authUserStore, signin } from "../userStore";

    let password = "123"
    let email = "nkatsikanis@gmail.com"

    const url = 'http://mentorcv.com/'
    const goTrueInstance =
            new GoTrue({
                APIUrl: `${url}/.netlify/identity`,
                setCookie: true,
            })

</script>
<h1>Signin</h1>

<input placeholder="email" bind:value={email}>
<input placeholder="password" type="password" bind:value={password}>
<button on:click={()=>signin(email,password,true)}>Signin</button>
