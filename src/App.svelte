<script>
    import { Router, Route, link } from "svelte-routing";
    import Register from "./components/Register.svelte";
    import Recover from "./components/Recover.svelte";
    import Signin from "./components/Signin.svelte";
    import Settings from "./components/Settings.svelte";
    import Home from "./components/Home.svelte";
    import { authUserStore, logout } from './stores/userStore';

    console.log($authUserStore)

</script>

<Router>
    <h1>Svetle Fullstack Starter</h1>
    {#if $authUserStore}
        <p>Logged in as {$authUserStore.email}</p>
    {:else}
        <p>Not logged in</p>
    {/if}
    <div>
        <a href="/" use:link>Home</a>
        {#if !$authUserStore}

            <a href="/register" use:link>Register</a>
            <a href="/signin" use:link>Signin</a>
        {:else}
            <a href="/settings" use:link>Settings</a>
            <button on:click={logout}>Logout</button>
        {/if}
        <hr>

        <div>
            <Route path="register" component="{Register}"/>
            <Route path="recover" component="{Recover}"/>
            <Route path="signin" component="{Signin}"/>
            <Route path="settings" component="{Settings}"/>
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
