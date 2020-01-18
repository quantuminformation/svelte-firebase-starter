# Why

An SPA example for people to quickly start churning out fullstack apps in Svelte with various backends. In order to reduce clutter I have tried to group related
backend files in there own folders as much as possble, however some files live at the root as it just makes things easier with the cli for eg netlify and firebase.

The Svelte app and Netlify stuff uses JavaScript while the firebase functions use TypeScript

# Videos!
Best way to get up to speed is to watch these videos: 

<a href="https://www.youtube.com/watch?v=76tkAx2NVcw&list=PLCrwuqjmVebJeMDrAPQDrJmnwXWDw3CJW" target="_blank"><img src="http://img.youtube.com/vi/76tkAx2NVcw/0.jpg" 
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>


# inspiration for netlify stuff
https://github.com/sw-yx/react-netlify-identity

# Netlify demo
This uses the Gotrue-js lib which hooks in with Netlify's user auth system (called Identity)
[Demo](https://svelte-netlify-identity.netlify.com)

# firebase stuff WIP
Two files live at the root .firebaserc and firebase.json and some others are grouped in /firebase_specific to try an keep things tidy
[Demo](https://svelte-fullstack-starter.firebaseapp.com/)


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

