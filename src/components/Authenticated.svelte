<script>

    import { authUserStore, updateUserEmail, updateUserPassword, updateUserCustomSettings } from '../stores/userStore';

    $: if (!$authUserStore) {
        navigate('/', { replace: true });
    }
</script>
{#if $authUserStore}
    <slot authUser={$authUserStore}></slot>
{/if}
