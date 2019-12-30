<script>


    import DefaultSpinner from '../components/DefaultSpinner.svelte'
    import { getUsers } from '../stores/userStore';
    import Authenticated from './Authenticated.svelte'
    import User from './User.svelte'
    import { onMount } from 'svelte';
    import { authUserStore } from '../stores/userStore';


    onMount(() => {
        getUsers()
    });


</script>


<div>
    <h1>List of Users</h1>

    {#if $authUserStore && $authUserStore.users}
        {#each $authUserStore.users as user}
            <User user/>
        {/each}
    {:else}
        <p>No users yet</p>
    {/if}
</div>
