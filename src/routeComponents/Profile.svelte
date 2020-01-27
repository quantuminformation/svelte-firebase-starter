<script>
    import { get } from "../api"

    import User from "../components/User.svelte"
    import { onMount } from "svelte"
    import Authenticated from "./Authenticated.svelte"

    export let user
    export let isFollowing

    const follow = uid => {}

    onMount(async () => {
        user = await getUserProfile.then(res => {
            user = res
            console.log(user)
        })
    })
</script>

<Authenticated>

    <div>
        <h1>{user.displayName}</h1>
        <input type="checkbox" />

        {#if isFollowing}
            <button on:click={follow(user.uid)}>UnFollow</button>
        {:else}
            <button>UnFollow</button>
        {/if}

    </div>
</Authenticated>
