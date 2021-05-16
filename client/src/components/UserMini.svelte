<script>
    import { link } from "svelte-routing"

    //since this is in the authenticated HOC $userDataStore is guaranteed to be there

    export let user
</script>

<div style="border: 1px solid black;padding: 1em;margin-bottom: 1em">
    User:
    <a  href={user.username}>
        <span>{user.displayName || user.username || user.uid}</span>
    </a>
</div>
