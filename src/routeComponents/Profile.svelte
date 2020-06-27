<script>
    import User from "../components/UserMini.svelte"
    import { getUserDataAndStore } from "../firebaseBackend"
    import DefaultSpinner from "../components/DefaultSpinner.svelte"

    export let user
    export let isFollowing
    export let username // comes from the route


    console.log(username)
    const follow = (uid) => {}

    let promise = getUserDataAndStore(username).then((res) => {
        user = res
        console.log(user)
    })
</script>

<h1>User Profile</h1>
<!--    <div>
        <h1>{user.displayName}</h1>
        <input type="checkbox" />

        {#if isFollowing}
            <button on:click={follow(user.uid)}>UnFollow</button>
        {:else}
            <button>UnFollow</button>
        {/if}

    </div>-->

{#await promise}
    <DefaultSpinner />
{:then user}
    <h1>{user.displayName}</h1>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
