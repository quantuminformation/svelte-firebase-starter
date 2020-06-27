<script>
    import { navigate } from "svelte-routing"

    import { userDataStore } from "../stores/userDataStore"

    $: if (!$userDataStore) {
        navigate("/", { replace: true })
    }
</script>

{#if $userDataStore}
    <slot />
{/if}
