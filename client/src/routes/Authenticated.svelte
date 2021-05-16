<script>
    import { navigate } from "svelte-routing"

    import { userDataStore } from "../stores/userDataStore"
    import { log } from "../util/logging"

    log("Arrived at Authenticated route, is user authenticated?")
    log($userDataStore)
    $: if (!$userDataStore) {
        navigate("/", { replace: true })
    }
</script>

{#if $userDataStore}
    <slot />
{/if}
