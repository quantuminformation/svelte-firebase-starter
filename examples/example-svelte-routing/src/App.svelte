<script>
	import { Router, Route, link } from "svelte-routing";
	import Signin from "./components/Signin";
	import Home from "./components/Home";

	export let name;
</script>

<Router>
	<h1>Svetle routing example</h1>
	<Nav>The amazing nav</Nav>
	<a href="/login">Login</a>
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