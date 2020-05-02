<script>
    import { get } from "../api"

    import DefaultSpinner from "../components/DefaultSpinner.svelte"
    import UserMini from "../components/UserMini.svelte"

    let users

    let promise = get("listUsers").then(res => {
        return res
        console.log(users)
    })
</script>

<div>
    <h1>List of Users</h1>

    {#await promise}
        <DefaultSpinner />
    {:then users}
        {#if users}
            {#each users as user}
                <UserMini {user} />
            {/each}
        {:else}
            <p>No users yet!</p>
        {/if}
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}

</div>
