import App from './App.svelte';

export const NETLIFY_IDENTITY = 'NETLIFY_IDENTITY'
const app = new App({
    target: document.body,
    props: {
        //to use this to switch backend
        backend: NETLIFY_IDENTITY
    }
});

export default app;
