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
