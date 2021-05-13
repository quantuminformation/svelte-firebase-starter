import preprocess from 'svelte-preprocess';
import firebaseAdapter from 'svelte-adapter-firebase';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: firebaseAdapter({ firebaseJson: '../firebase.json' }),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};

export default config;
