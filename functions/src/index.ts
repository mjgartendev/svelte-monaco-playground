import * as functions from 'firebase-functions';
const svelte = require('svelte/compiler');
require('svelte/reigster')
const Component = require('./NewSnippet.js').default ;
const source = (`
  <h1>hello {fullName}</h1>
  <label>First: <input bind:value={firstName} /></label>
  <label>Last: <input bind:value={lastName} /></label>
  <button on:click={logName}>Log Name</button>
  <style>
  button {
    background: var(--primary);
    color: var(--secondary);
    border: 1px solid currentColor;
  }
  h1 {
    color: tomato;
  }
  label 
  {
    margin-bottom: 1rem;
    font-weight: bold;
  }
  </style>
  <script>
  function logName() {
    console.log(fullName)
  }
  export let firstName = '';
  export let lastName = '';
  $: fullName = firstName + ' ' + lastName;
  </script>
`);
export const render = functions.https.onRequest((request, response) => {
  response.send(Component.render({
    firstName: "Rich",
    lastName: "Harris"
  }));
})

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

export const compile = functions.https.onRequest((request, response) => {
  const result = svelte.compile(source);
  response.send(result);
})
