<script>
    import { navigate } from "svelte-routing"

    import { authUserStore } from "../stores/userStore"

    $: if (!$authUserStore) {
        navigate("/", { replace: true })
    }
</script>

{#if $authUserStore}
    <slot />
{/if}
