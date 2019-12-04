<script>
    import GoTrue from 'gotrue-js';
    import { authUserStore, signin } from "../userStore";

    let password = ""
    let email = ""

    const url = 'http://mentorcv.com/'
    const goTrueInstance =
            new GoTrue({
                APIUrl: `${url}/.netlify/identity`,
                setCookie: true,
            })

</script>
<h1>Signin</h1>

<input placeholder="email">
<input placeholder="password" type="password">
<button on:click={()=>signin(email,password,true)}>Signin</button>
