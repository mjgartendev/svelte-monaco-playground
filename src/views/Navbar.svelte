<header>
  <section>
    {title}
  </section>
  <section>
  <nav>
    {#each links as link}
      <a href={link.to}>{link.name}</a>
    {/each}
  <slot><button>Login</button></slot>
  </nav>
  </section>
</header>

<script>
  export let links;
  export let title = "AppTitle";
</script>
<style>
  header{
    display: flex;
    align-items: center;
    background: #1e1f26;
    grid-area: top;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 .5rem;
  }
  nav{
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0;
  }
  a, ::slotted(button){
    padding: .5rem 1rem;
    color: var(--primary, mediumseagreen);
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
  }
  a:active{
    background: var(--light, #f1f1f1);
  }
  ::slotted(button){
    background: var(--primary, mediumseagreen);
    color: var(--light, #f1f1f1);
  }
</style>
