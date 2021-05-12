<script>
    import { getDBUserByUsername, followUser, amIFollowing, unFollowUser } from "../firebaseBackend"
    import { log } from "../util/logging"
    import DefaultSpinner from "../components/DefaultSpinner.svelte"
    import { userDataStore } from "../stores/userDataStore"

    let isOwnProfile = false
    export let user
    export let isFollowing = false
    export let username // comes from the route
    let promise

    // check if user is current user, if so just resolve the promise with the local data, or get it from the db
    if ($userDataStore && $userDataStore.username === username) {
        isOwnProfile = true
        user = $userDataStore
        promise = Promise.resolve($userDataStore)
        log(`Profile page for logged in user ${username}, skipping data retrieval`)
    } else {
        log(`loading profile data for username ${username}`)
        async function promiseWrap() {
            user = await getDBUserByUsername(username)
            if ($userDataStore) {
                isFollowing = await amIFollowing(user.uid)
            }
            //todo what to return here?
            return true
        }
        promise = promiseWrap()
    }
    const follow = async (event) => {
        let result = await followUser(user)
        if (result) {
            isFollowing = true
        }
    }
    const unFollow = async (event) => {
        let result = await unFollowUser(user)
        if (result) {
            isFollowing = false
        }
    }
</script>

<h1>User Profile</h1>

{#await promise}
    <DefaultSpinner />
    <!--todo can we get rid of result here as its no used?-->
{:then result}
    <h1>{user.username || 'User has not set a display name'}</h1>
    {#if isOwnProfile}
        <span>It's you!</span>
    {/if}

    {#if $userDataStore && !isOwnProfile}
        {#if isFollowing}
            <button on:click="{unFollow}">UnFollow</button>
        {:else}
            <button on:click="{follow}">Follow</button>
        {/if}
    {/if}
{:catch error}
    <p style="color: red">error: {error}</p>
{/await}
