<script>
    import { Router, Route, link } from "svelte-routing";
    import Register from "./components/Register.svelte";
    import Signin from "./components/Signin.svelte";
    import Home from "./components/Home.svelte";
    import { authUserStore, confirm, logout } from './userStore';

    console.log($authUserStore)
    // check for user confirmation token
    var hash = window.location.hash.substr(1);
    var result = hash.split('&').reduce(function (result, item) {
        var parts = item.split('=');
        result[parts[0]] = parts[1];
        return result;
    }, {});
    if (result.confirmation_token) {
        confirm(result.confirmation_token)
    }

</script>

<Router>
    <h1>Svetle auth example</h1>
    {#if $authUserStore}
    <p>Logged in as {$authUserStore.toString()}</p>
    <button on:click={logout}>Logout</button>
    {:else}
        <p>Not logged in</p>
    {/if}
    <a href="/" use:link>Home</a>
    <a href="/register" use:link>Register</a>
    <a href="/signin" use:link>Signin</a>
    <hr>

    <div>
        <Route path="register" component="{Register}"/>
        <Route path="signin" component="{Signin}"/>
        <Route path="/" component="{Home}"/>
    </div>
</Router>


<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>