<header>
  <section>
    {title}
  </section>
  <section>
    <img width="200" src="./logo-white.png">
  </section>
  <section>
  <nav>
    {#each links as link}
      <a href={link.to}>{link.name}</a>
    {/each}
  <slot><button>Login</button></slot>
  <i class="fas fa-ellipsis-v"></i>
  </nav>
  </section>
</header>

<script>
  export let links;
  export let title = "AppTitle";
</script>
<style>
  header{
    height: 50px;
    display: flex;
    align-items: center;
    background: var(--secondary, #1e1f26);
    grid-area: top;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 .5rem;
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
