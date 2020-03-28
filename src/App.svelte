<script>
    import { Router, Route, link } from "svelte-routing"
    import Register from "./routeComponents/Register.svelte"
    import Recover from "./routeComponents/Recover.svelte"
    import Signin from "./routeComponents/Signin.svelte"
    import Users from "./routeComponents/Users.svelte"
    import Settings from "./routeComponents/Settings.svelte"
    import Home from "./routeComponents/Home.svelte"
    import Profile from "./routeComponents/Profile.svelte"
    import { authUserStore, logout } from "./stores/userStore"

    console.log($authUserStore)
</script>

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

<Router>
    <h1>Svetle Fullstack Starter</h1>
    {#if $authUserStore}
        <p>Logged in as {$authUserStore.displayName || $authUserStore.email}</p>
    {:else}
        <p>Not logged in</p>
    {/if}
    <div>
        <a href="/" use:link>Home</a>
        {#if !$authUserStore}
            <a href="/register" use:link>Register</a>
            <a href="/signin" use:link>Signin</a>
        {:else}
            <a href="/profile" use:link>profile</a>
            <a href="/settings" use:link>Settings</a>
            <button on:click={logout}>Logout</button>
        {/if}
        <a href="/users" use:link>Users</a>

        <hr />

        <div>

            <Route path="register" component={Register} />
            <Route path="recover" component={Recover} />
            <Route path="signin" component={Signin} />
            <Route path="settings" component={Settings} />
            <Route path="users" component={Users} />
            <Route path="profile/:username" component={Profile} />
            <Route path="profile" component={Profile} />
            <Route path="/" component={Home} />
        </div>
    </div>
</Router>
