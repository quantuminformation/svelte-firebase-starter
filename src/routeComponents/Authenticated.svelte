<script>
    import { navigate } from "svelte-routing"

    import { authUserStore } from "../firebaseBackend"

    $: if (!$authUserStore) {
        navigate("/", { replace: true })
    }
</script>

{#if $authUserStore}
    <slot />
{/if}
