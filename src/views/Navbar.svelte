<header>
  <div>
    <img src="logo-192.png" height="40" alt="svelte logo" />
  </div>
  <h1>svelte-repl-monaco</h1>
  <div>
    <nav>
      {#each links as link}
      <a href={link.to}>{link.name}</a>
    {/each}
  <Login/>
  </nav>
  </div>
</header>

<script>
  import Login from '../components/Login.svelte';
  export let links;
</script>
<style>
  header{
    height: 40px;
    display: flex;
    align-items: center;
    background: var(--surface);
    color: var(--primary);
    grid-area: top;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: .25rem 2rem;
  }
  nav{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 .5rem;
  }
  a, i, ::slotted(button){
    padding: .5rem 1rem;
    color: var(--primary, mediumseagreen);
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
  }
  h1 {
    color: var(--light);
    font-size: 1.3rem;
  }
  a:hover{
    background: var(--white, white);
  }
  a:active, .active{
    background: var(--light, #f1f1f1);
  }
  ::slotted(button){
    background: var(--primary, mediumseagreen);
    color: var(--light, #f1f1f1);
  }
  *, *::before, *::after{box-sizing: border-box}
</style>