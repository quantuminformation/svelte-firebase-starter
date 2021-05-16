<script>
	import '../app.css';
    import { userDataStore } from "./stores/userDataStore"
    import { logout } from "./firebaseBackend"

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

<section>

<!--    <a href="/" >Home</a>
    {#if !$userDataStore}
        <a href="/register" >Register</a>
        <a href="/signin" >Signin</a>
    {:else}
        <a href="{$userDataStore.username}" >Profile</a>

        <a href="/settings" >Settings</a>
        <button on:click="{logout}">Logout</button>
    {/if}
    <a href="/users" >Users</a>

    <hr />-->


<!--
    <div>

        <Route path="recover" component="{Recover}" />
        <Route path="settings" component="{Settings}" />
        <Route path="users" component="{Users}" />
        <Route path=":username" component="{Profile}" />

        <Route path="/" component="{Home}" />
    </div>
-->

</section>

<slot />
