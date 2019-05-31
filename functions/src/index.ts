import * as functions from 'firebase-functions';
const svelte = require('svelte/compiler');
require('svelte/register');

const App = require('../../src/Tabs.svelte').default;

export const render = functions.https.onRequest((request, response) => {
  response.send(App.render());
})

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

const source = (`
  <h1>Hello {name}!</h1>
  <input bind:value={name} />
  <style>
    h1 {
      color: mediumseagreen;
    }
  </style>
  <script>
    export let name = "Svelte";
  </script>
`)

export const compile = functions.https.onRequest((request, response) =>
{
  
  const result = svelte.compile(source);
  response.send(result);
})
