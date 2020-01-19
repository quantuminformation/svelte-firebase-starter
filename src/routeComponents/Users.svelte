<script>
    import { get } from "../api"

    import User from "../components/User.svelte"
    import { onMount } from "svelte"

    let users

    onMount(() => {
        get("listUsers").then(res => {
            users = res
            console.log(users)
        })
    })
</script>

<div>
    <h1>List of Users</h1>

    {#if users}
        {#each users as user}
            <User {user} />
        {/each}
    {:else}
        <p>No users yet</p>
    {/if}
</div>
