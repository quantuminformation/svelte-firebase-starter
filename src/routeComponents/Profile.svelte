<script>
    import User from "../components/UserMini.svelte"
    import { getUserDataAndStore } from "../firebaseBackend"
    import { log } from "../util/logging"
    import DefaultSpinner from "../components/DefaultSpinner.svelte"
    import { userDataStore } from "../stores/userDataStore"

    export let user
    export let isFollowing
    export let username // comes from the route
    let promise
    if ($userDataStore.username === username) {
        promise = Promise.resolve($userDataStore)
        log(`Profile page for logged in user ${username}, skipping data retrieval`)
    } else {
        log(`loading profile data for username ${username}`)
        let promise = getUserDataAndStore(username).then((res) => {
            user = res
            console.log(user)
        })
    }

    const follow = (uid) => {}
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
