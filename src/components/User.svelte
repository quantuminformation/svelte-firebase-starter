<script>


    //since this is in the authenticated HOC $authUserStore is guaranteed to be there
    export let user
    </script>
<div>
   <p>{user.email}</p>
</div>
