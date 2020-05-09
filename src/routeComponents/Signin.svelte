<script>
    import DefaultSpinner from "../components/DefaultSpinner.svelte"
    import { navigate, link } from "svelte-routing"
    import { signin} from "../firebaseBackend"


    if ($authUserStore) {
        navigate("/", { replace: true })
    }

    let password = ""
    let email = ""
    let pendingApiCall = false

    export function submit(event) {
        pendingApiCall = true
        signin(email, password).catch(e => {
            pendingApiCall = false
        })
    }
</script>

<div>

    <div>
        <h1>Login Details</h1>
        <form on:submit|preventDefault={submit} id="main-form">

            <input
                id="inline-full-name"
                type="email"
                required
                placeholder="Email"
                bind:value={email} />
            <input
                id="inline-username"
                type="password"
                required
                placeholder="Your password"
                bind:value={password} />

            <button>Signin</button>
            {#if pendingApiCall}
                <DefaultSpinner />
            {/if}
        </form>
        <p>
            Forgot password? Click
            <a use:link href="/recover">Here to reset it.</a>
        </p>

    </div>
</div>
