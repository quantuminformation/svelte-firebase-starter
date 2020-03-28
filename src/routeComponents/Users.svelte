<script>
    import { get } from "../api"

    import User from "../components/User.svelte"
    import { onMount } from "svelte"
    import DefaultSpinner from "../components/DefaultSpinner.svelte"

    let users

    /*    onMount(() => {
        get("listUsers").then(res => {
            users = res
            console.log(users)
        })
    })*/

    let promise = get("listUsers").then(res => {
        users = res
        console.log(users)
    })
</script>

<div>
    <h1>List of Users</h1>

    {#await promise}
        <DefaultSpinner />
    {:then user}
        {#if users}
            {#each users as user}
                <User {user} />
            {/each}
        {:else}
            <p>No users yet!</p>
        {/if}
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}

</div>
