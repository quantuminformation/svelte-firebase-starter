<script>
    import { Router, Route, link } from "svelte-routing";
    import Signin from "./components/Signin.svelte";
    import Home from "./components/Home.svelte";

</script>

<Router>
    <h1>Svetle auth example</h1>
    <a href="/" use:link>Home</a>
    <a href="/signin" use:link>Signin</a>
    <hr>

    <div>
        <Route path="signin" component="{Signin}"/>
        <Route path="/" component="{Home}"/>
    </div>
</Router>


<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>