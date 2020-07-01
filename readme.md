# Why

An SPA example for people to quickly start churning out fullstack apps in Svelte with firebase. 
The Svelte app uses JavaScript while the firebase functions use TypeScript

# Videos!
Best way to get up to speed is to watch these videos: 

<a href="https://www.youtube.com/watch?v=76tkAx2NVcw&list=PLCrwuqjmVebJeMDrAPQDrJmnwXWDw3CJW" target="_blank"><img src="http://img.youtube.com/vi/76tkAx2NVcw/0.jpg" 
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>



# svelte app

This is a project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*


## Get started

Install the dependencies...

```bash
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.


## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).

## Running emulators

Assuming you have firebase emulation for Realtime DB and Cloud functions you can pass this env variable in to run `EMULATION="true" npm run dev`

And your production data will not be touched

You can also get chrome to open up with no security as there are some cars issues with local emulation or functions with `npm run chrome`. You can then test the local app with the new Chrome window