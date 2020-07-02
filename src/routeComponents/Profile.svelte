<script>
    import User from "../components/UserMini.svelte"
    import { getDBUserByUsername, followUser } from "../firebaseBackend"
    import { log } from "../util/logging"
    import DefaultSpinner from "../components/DefaultSpinner.svelte"
    import { userDataStore } from "../stores/userDataStore"

    let isOwnProfile = false
    export let user
    export let isFollowing = false
    export let username // comes from the route
    let promise

    // check if user is current user, if so just resolve the promise with the local data, or get it from the db
    if ($userDataStore.username === username) {
        isOwnProfile = true
        promise = Promise.resolve($userDataStore)
        log(`Profile page for logged in user ${username}, skipping data retrieval`)
    } else {
        log(`loading profile data for username ${username}`)
        promise = async () => {
            await getDBUserByUsername(username).then((res) => {
                user = res
            })
        }
    }

    const follow = async (event) => {
        let result = await followUser(user)
        if (result) {
            isFollowing = true
        }
    }
    const unFollow = async (event) => {
        let result = await followUser(user)
        if (result) {
            isFollowing = true
        }
    }
</script>

<h1>User Profile</h1>

{#await promise}
    <DefaultSpinner />
{:then user}
    <h1>{user.username || 'User has not set a display name'}</h1>

    {#if !isOwnProfile}

        {#if isFollowing}
            <button on:click="{unFollow}">UnFollow</button>
        {:else}
            <button on:click="{follow}">Follow</button>
        {/if}
    {/if}
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
