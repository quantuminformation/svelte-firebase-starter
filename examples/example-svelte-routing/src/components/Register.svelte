<script>
    import GoTrue, { User, Settings } from 'gotrue-js';
    import { authUser } from '../userStore';

    let password= ""
    let email=""
    const url = 'http://mentorcv.com/'
    const goTrueInstance =
            new GoTrue({
                APIUrl: `${url}/.netlify/identity`,
                setCookie: true,
            })
    const user = goTrueInstance.currentUser() || undefined


</script>
<h1>Register</h1>
<form>
    <input placeholder="email" bind:value={authUser.email}>
    <input placeholder="password" type="password" bind:value={authUser.email}>
    <button on:click={register()}></button>
</form>