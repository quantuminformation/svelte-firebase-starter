<script>
    //since this is in the authenticated HOC $authUserStore is guaranteed to be there
    export let user
</script>

<div>
    <span>{user.displayName || user.uid}</span>
</div>
